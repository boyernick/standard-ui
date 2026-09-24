import {
  intersect,
  objectFitRect,
  parseConfig,
  resolveGlass,
  samplePadding,
  type Box,
  type GlassConfig,
  type ResolvedGlass,
} from "./config";
import { FRAGMENT_SHADER, VERTEX_SHADER } from "./shader";

/**
 * Renders StandardUI's glass material onto panes (see ./config).
 *
 * The ground each pane refracts is drawn from what is actually behind it
 * inside the root: images, video frames and canvases at their current
 * positions and crops, over the backgrounds of the root's direct children,
 * over a ground colour (`--glass-ground`, else the nearest opaque ancestor
 * background). There is no DOM-to-image capture, so nothing goes stale: a
 * slide that moves or a video that plays is simply drawn where it is now.
 * Text and other non-media content behind a pane contributes its box's
 * background colour only.
 *
 * All panes on the page share one WebGL context — browsers cap how many a
 * page may hold — and each pane shows its frame in its own 2D canvas.
 */

const OVERFLOW = 12;
const MAX_SCENE_PIXELS = 1600 * 1600;

type Shared = {
  canvas: HTMLCanvasElement;
  gl: WebGLRenderingContext;
  program: WebGLProgram;
  texture: WebGLTexture;
  uniforms: Map<string, WebGLUniformLocation | null>;
};

let shared: Shared | null = null;
let lost = false;

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) throw new Error("Glass: could not create a shader.");
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw new Error(`Glass: shader failed to compile: ${gl.getShaderInfoLog(shader)}`);
  }
  return shader;
}

function getShared(): Shared {
  if (shared && !lost) return shared;
  const canvas = shared?.canvas ?? document.createElement("canvas");
  const gl = canvas.getContext("webgl", {
    alpha: true,
    premultipliedAlpha: false,
    antialias: false,
    preserveDrawingBuffer: false,
  });
  if (!gl) throw new Error("Glass: WebGL is unavailable.");
  if (!shared) {
    canvas.addEventListener("webglcontextlost", (event) => {
      event.preventDefault();
      lost = true;
    });
    canvas.addEventListener("webglcontextrestored", () => {
      lost = false;
      shared = null;
      for (const instance of instances) instance.markChanged();
    });
  }

  const program = gl.createProgram();
  if (!program) throw new Error("Glass: could not create a program.");
  gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERTEX_SHADER));
  gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER));
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    throw new Error(`Glass: program failed to link: ${gl.getProgramInfoLog(program)}`);
  }
  gl.useProgram(program);

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  const position = gl.getAttribLocation(program, "a_position");
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

  const texture = gl.createTexture();
  if (!texture) throw new Error("Glass: could not create a texture.");
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

  shared = { canvas, gl, program, texture, uniforms: new Map() };
  lost = false;
  return shared;
}

function uniform(s: Shared, name: string) {
  if (!s.uniforms.has(name)) s.uniforms.set(name, s.gl.getUniformLocation(s.program, name));
  return s.uniforms.get(name) ?? null;
}

const instances = new Set<{ markChanged(): void }>();

// ────────────────────────────────────────────────────────────────
// Reading what is behind a pane
// ────────────────────────────────────────────────────────────────

const toBox = (rect: DOMRect): Box => ({
  x: rect.left,
  y: rect.top,
  width: rect.width,
  height: rect.height,
});

const transparent = (color: string) =>
  !color || color === "transparent" || /rgba?\([^)]*,\s*0(\.0+)?\)$/.test(color);

/** Media whose pixels a canvas cannot read without tainting it. */
const tainted = new WeakSet<Element>();

function crossOrigin(element: HTMLImageElement | HTMLVideoElement) {
  if (element.crossOrigin) return false;
  const source = element.currentSrc || element.getAttribute("src") || "";
  if (!source || source.startsWith("data:") || source.startsWith("blob:")) return false;
  try {
    return new URL(source, location.href).origin !== location.origin;
  } catch {
    return true;
  }
}

function drawable(element: Element): element is HTMLImageElement | HTMLVideoElement | HTMLCanvasElement {
  if (tainted.has(element)) return false;
  if (element instanceof HTMLImageElement) {
    return element.complete && element.naturalWidth > 0 && !crossOrigin(element);
  }
  if (element instanceof HTMLVideoElement) {
    return element.readyState >= 2 && element.videoWidth > 0 && !crossOrigin(element);
  }
  return element instanceof HTMLCanvasElement && element.width > 0 && element.height > 0;
}

/** Whether drawing this source would taint a canvas (its pixels are cross-origin). */
function unreadable(source: CanvasImageSource) {
  const probe = document.createElement("canvas");
  probe.width = probe.height = 1;
  const context = probe.getContext("2d");
  if (!context) return true;
  try {
    context.drawImage(source, 0, 0, 1, 1);
    context.getImageData(0, 0, 1, 1);
    return false;
  } catch {
    return true;
  }
}

function naturalSize(element: HTMLImageElement | HTMLVideoElement | HTMLCanvasElement) {
  if (element instanceof HTMLImageElement) return { width: element.naturalWidth, height: element.naturalHeight };
  if (element instanceof HTMLVideoElement) return { width: element.videoWidth, height: element.videoHeight };
  return { width: element.width, height: element.height };
}

/**
 * The box a media element is visible through, after every clipping ancestor
 * up to the root, and its opacity after every ancestor's. Null if hidden.
 */
function visibility(element: Element, root: Element) {
  let clip: Box | null = toBox(element.getBoundingClientRect());
  let opacity = 1;
  for (let node: Element | null = element; node && node !== root; node = node.parentElement) {
    const style = getComputedStyle(node);
    if (style.display === "none" || style.visibility === "hidden") return null;
    opacity *= Number(style.opacity) || 0;
    if (opacity <= 0.01) return null;
    if (node !== element && (style.overflowX !== "visible" || style.overflowY !== "visible")) {
      clip = clip && intersect(clip, toBox(node.getBoundingClientRect()));
      if (!clip) return null;
    }
  }
  return clip ? { clip, opacity } : null;
}

/** The clip every clipping ancestor imposes, not counting the element's own box. */
function clipOf(element: Element): Box {
  let clip: Box = { x: -1e6, y: -1e6, width: 2e6, height: 2e6 };
  for (let node = element.parentElement; node; node = node.parentElement) {
    const style = getComputedStyle(node);
    if (style.overflowX !== "visible" || style.overflowY !== "visible") {
      clip = intersect(clip, toBox(node.getBoundingClientRect())) ?? { x: 0, y: 0, width: 0, height: 0 };
    }
    if (node.dataset?.slot === "glass-root") break;
  }
  return clip;
}

// ────────────────────────────────────────────────────────────────
// Instances
// ────────────────────────────────────────────────────────────────

type Pane = {
  element: HTMLElement;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  restorePosition: string | null;
  hover: number;
  press: number;
  hoverTarget: number;
  pressTarget: number;
  signature: string;
  cleanup: () => void;
};

export interface LensGlassOptions {
  root: HTMLElement;
  glassElements: HTMLElement[];
  defaults?: GlassConfig;
}

export interface LensGlass {
  markChanged(): void;
  destroy(): void;
}

export function createLensGlass({ root, glassElements, defaults = {} }: LensGlassOptions): LensGlass {
  getShared(); // throws if WebGL is unavailable, so the root can fall back

  const scene = document.createElement("canvas");
  const maybeSceneContext = scene.getContext("2d");
  if (!maybeSceneContext) throw new Error("Glass: 2D canvas is unavailable.");
  const sceneContext: CanvasRenderingContext2D = maybeSceneContext;

  // If anything below throws, take back what was already added to the DOM so
  // a failed start leaves the panes as they were.
  const injected: Array<{ canvas: HTMLCanvasElement; element: HTMLElement; position: string | null }> = [];
  const undo = () => {
    for (const { canvas, element, position } of injected) {
      canvas.remove();
      if (position !== null) element.style.position = position;
    }
  };
  let panes: Pane[];
  try {
  panes = glassElements.map((element) => {
    const canvas = document.createElement("canvas");
    canvas.setAttribute("aria-hidden", "true");
    canvas.dataset.glassCanvas = "";
    Object.assign(canvas.style, {
      position: "absolute",
      pointerEvents: "none",
      zIndex: "-1",
    });
    element.prepend(canvas);
    const record = { canvas, element, position: null as string | null };
    injected.push(record);
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Glass: 2D canvas is unavailable.");

    let restorePosition: string | null = null;
    if (getComputedStyle(element).position === "static") {
      restorePosition = element.style.position;
      element.style.position = "relative";
      record.position = restorePosition;
    }

    const pane: Pane = {
      element, canvas, context, restorePosition,
      hover: 0, press: 0, hoverTarget: 0, pressTarget: 0, signature: "", cleanup: () => {},
    };
    const enter = () => { pane.hoverTarget = 1; wake(); };
    const leave = () => { pane.hoverTarget = 0; pane.pressTarget = 0; wake(); };
    const down = () => { pane.pressTarget = 1; wake(); };
    const up = () => { pane.pressTarget = 0; wake(); };
    element.addEventListener("pointerenter", enter);
    element.addEventListener("pointerleave", leave);
    element.addEventListener("pointerdown", down);
    element.addEventListener("pointerup", up);
    element.addEventListener("pointercancel", up);
    pane.cleanup = () => {
      element.removeEventListener("pointerenter", enter);
      element.removeEventListener("pointerleave", leave);
      element.removeEventListener("pointerdown", down);
      element.removeEventListener("pointerup", up);
      element.removeEventListener("pointercancel", up);
    };
    return pane;
  });
  } catch (error) {
    undo();
    throw error;
  }

  const paneSet = new Set(glassElements);
  const insidePane = (node: Element) => {
    for (let n: Element | null = node; n && n !== root; n = n.parentElement) {
      if (paneSet.has(n as HTMLElement)) return true;
    }
    return false;
  };

  // Everything that can paint behind a pane, in document order (a close
  // enough stand-in for paint order): media, and boxes with a background.
  let paintList: Element[] = [];
  let media: Element[] = [];
  const collectMedia = () => {
    paintList = Array.from(root.querySelectorAll("*")).filter((element) => {
      if (paneSet.has(element as HTMLElement) || insidePane(element)) return false;
      if ((element as HTMLElement).dataset?.glassCanvas !== undefined) return false;
      if (element instanceof HTMLImageElement || element instanceof HTMLVideoElement || element instanceof HTMLCanvasElement) return true;
      return !transparent(getComputedStyle(element).backgroundColor);
    });
    media = paintList.filter((element) => !(element instanceof HTMLElement) || element.matches("img, video, canvas"));
  };
  collectMedia();

  const groundColor = () => {
    const custom = getComputedStyle(root).getPropertyValue("--glass-ground").trim();
    if (custom) return custom;
    for (let node: Element | null = root; node; node = node.parentElement) {
      const color = getComputedStyle(node).backgroundColor;
      if (!transparent(color)) return color;
    }
    return getComputedStyle(document.documentElement).backgroundColor || "#000";
  };

  let forced = true;
  let visible = true;
  let frame = 0;
  let destroyed = false;

  const intersection = new IntersectionObserver((entries) => {
    visible = entries.some((entry) => entry.isIntersecting);
    if (visible) wake();
  });
  intersection.observe(root);

  const mutations = new MutationObserver((records) => {
    // Our own canvases change on every frame we draw; they are not the ground.
    const relevant = records.filter(
      (record) => (record.target as HTMLElement).dataset?.glassCanvas === undefined,
    );
    if (!relevant.length) return;
    // Inline style changes (a carousel's transform while dragging) move
    // things, which the per-frame position check already sees; only a change
    // in what exists or how it is styled means re-listing what paints.
    if (relevant.some((record) => record.type === "childList" || record.attributeName !== "style")) {
      collectMedia();
    }
    forced = true;
    wake();
  });
  mutations.observe(root, { childList: true, subtree: true, attributes: true, attributeFilter: ["src", "data-config", "class", "style"] });

  // Media keeps changing on its own while it plays or loads.
  const onMediaEvent = () => { forced = true; wake(); };
  root.addEventListener("load", onMediaEvent, true);
  root.addEventListener("loadeddata", onMediaEvent, true);
  root.addEventListener("seeked", onMediaEvent, true);
  window.addEventListener("resize", onMediaEvent);
  // A root that started in a background tab draws when the tab is shown.
  document.addEventListener("visibilitychange", onMediaEvent);

  function wake() {
    if (!frame && !destroyed) frame = requestAnimationFrame(tick);
  }

  function tick() {
    frame = 0;
    // Hidden tabs get no animation frames anyway; no need to check here.
    if (destroyed || !visible) return;
    let animating = false;
    const ground = groundColor();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const playing = media.some(
      (element) => element instanceof HTMLVideoElement && !element.paused && !element.ended,
    );

    for (const pane of panes) {
      pane.hover += (pane.hoverTarget - pane.hover) * 0.25;
      pane.press += (pane.pressTarget - pane.press) * 0.35;
      if (Math.abs(pane.hoverTarget - pane.hover) < 0.01) pane.hover = pane.hoverTarget;
      if (Math.abs(pane.pressTarget - pane.press) < 0.01) pane.press = pane.pressTarget;
      if (pane.hover !== pane.hoverTarget || pane.press !== pane.pressTarget) animating = true;
      renderPane(pane, ground, dpr, forced || playing);
    }
    forced = false;
    // Keep polling positions while anything could be moving: transforms and
    // scroll offsets inside the root change without a DOM mutation.
    if (animating || playing || media.length > 0) frame = requestAnimationFrame(tick);
  }

  function renderPane(pane: Pane, ground: string, dpr: number, force: boolean) {
    const { element } = pane;
    const rect = element.getBoundingClientRect();
    if (rect.width < 1 || rect.height < 1) return;
    const style = getComputedStyle(element);
    const config = { ...defaults, ...parseConfig(element.dataset.config) };
    const cssRadius = parseFloat(style.borderTopLeftRadius) || 0;
    const glass = resolveGlass(config, rect.width, rect.height, cssRadius);

    const pad = samplePadding(glass) + OVERFLOW;
    const region: Box = {
      x: rect.left - pad,
      y: rect.top - pad,
      width: rect.width + pad * 2,
      height: rect.height + pad * 2,
    };

    // What is behind the pane now, cheaply: a changed position, crop,
    // opacity or video frame changes this string.
    type Layer = { element: Element; clip: Box; opacity: number; filter: string; color: string | null };
    const drawn: Layer[] = [];
    for (const item of paintList) {
      const isMedia = item instanceof HTMLImageElement || item instanceof HTMLVideoElement || item instanceof HTMLCanvasElement;
      if (isMedia && !drawable(item)) continue;
      if (!intersect(toBox(item.getBoundingClientRect()), region)) continue;
      const seen = visibility(item, root);
      if (!seen) continue;
      const clip = intersect(seen.clip, region);
      if (!clip) continue;
      const itemStyle = getComputedStyle(item);
      const color = isMedia ? null : itemStyle.backgroundColor;
      if (color !== null && transparent(color)) continue;
      drawn.push({
        element: item,
        clip,
        opacity: seen.opacity,
        filter: itemStyle.filter && itemStyle.filter !== "none" ? itemStyle.filter : "none",
        color,
      });
    }

    const signature = [
      region.x.toFixed(1), region.y.toFixed(1), region.width.toFixed(1), region.height.toFixed(1),
      dpr, ground, element.dataset.config ?? "", pane.hover.toFixed(2), pane.press.toFixed(2),
      ...drawn.map(({ element: item, clip, opacity, filter, color }) => {
        const r = item.getBoundingClientRect();
        const frameKey = item instanceof HTMLVideoElement ? item.currentTime.toFixed(3)
          : item instanceof HTMLImageElement ? item.currentSrc : "";
        return `${r.x.toFixed(1)},${r.y.toFixed(1)},${r.width.toFixed(1)},${r.height.toFixed(1)}|${clip.x.toFixed(1)},${clip.y.toFixed(1)},${clip.width.toFixed(1)},${clip.height.toFixed(1)}|${opacity.toFixed(2)}|${filter}|${color ?? ""}|${frameKey}`;
      }),
    ].join(";");
    if (!force && signature === pane.signature) return;
    pane.signature = signature;

    // The ground, in scene space (CSS px, origin at the region's top-left).
    let scale = dpr;
    if (region.width * region.height * scale * scale > MAX_SCENE_PIXELS) {
      scale = Math.sqrt(MAX_SCENE_PIXELS / (region.width * region.height));
    }
    scene.width = Math.max(1, Math.round(region.width * scale));
    scene.height = Math.max(1, Math.round(region.height * scale));
    sceneContext.setTransform(scale, 0, 0, scale, -region.x * scale, -region.y * scale);
    sceneContext.globalAlpha = 1;
    sceneContext.fillStyle = ground;
    sceneContext.fillRect(region.x, region.y, region.width, region.height);
    for (const { element: item, clip, opacity, filter, color } of drawn) {
      sceneContext.save();
      sceneContext.globalAlpha = opacity;
      if (color !== null) {
        const box = toBox(item.getBoundingClientRect());
        const visible = intersect(box, clip);
        if (visible) {
          sceneContext.fillStyle = color;
          sceneContext.fillRect(visible.x, visible.y, visible.width, visible.height);
        }
        sceneContext.restore();
        continue;
      }
      const source = item as HTMLImageElement | HTMLVideoElement | HTMLCanvasElement;
      const box = source.getBoundingClientRect();
      const itemStyle = getComputedStyle(source);
      const content = source instanceof HTMLCanvasElement
        ? { x: 0, y: 0, width: box.width, height: box.height }
        : objectFitRect(box, naturalSize(source), itemStyle.objectFit, itemStyle.objectPosition);
      // A filtered image (the lightbox's blurred copy) bleeds past its box;
      // clip to its clipping ancestors only, not to the box itself.
      const bleed = filter === "none" ? clip : intersect(region, clipOf(source)) ?? clip;
      sceneContext.beginPath();
      sceneContext.rect(bleed.x, bleed.y, bleed.width, bleed.height);
      sceneContext.clip();
      // Canvas understands CSS filter functions (blur, brightness, …) as is.
      if (filter !== "none") sceneContext.filter = filter;
      try {
        sceneContext.drawImage(source, box.left + content.x, box.top + content.y, content.width, content.height);
      } catch {
        tainted.add(source);
      }
      sceneContext.restore();
    }

    const s = getShared();
    const { gl } = s;
    gl.bindTexture(gl.TEXTURE_2D, s.texture);
    try {
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, scene);
    } catch {
      // Something we drew was cross-origin after all — a canvas, or media
      // behind a same-origin address that redirects elsewhere (a video served
      // through a signed-link redirect). Find it and leave it out from now on.
      const media = drawn.filter(({ element: item }) => item instanceof HTMLImageElement || item instanceof HTMLVideoElement || item instanceof HTMLCanvasElement);
      const culprits = media.filter(({ element: item }) => unreadable(item as CanvasImageSource));
      for (const { element: item } of culprits.length ? culprits : media) tainted.add(item);
      pane.signature = "";
      forced = true;
      return;
    }

    // Output: the pane plus room for its shadow, at device resolution.
    const out: Box = {
      x: rect.left - OVERFLOW,
      y: rect.top - OVERFLOW,
      width: rect.width + OVERFLOW * 2,
      height: rect.height + OVERFLOW * 2,
    };
    const width = Math.max(1, Math.round(out.width * dpr));
    const height = Math.max(1, Math.round(out.height * dpr));
    if (s.canvas.width !== width || s.canvas.height !== height) {
      s.canvas.width = width;
      s.canvas.height = height;
    }
    gl.viewport(0, 0, width, height);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    const set1 = (name: string, value: number) => gl.uniform1f(uniform(s, name), value);
    const set2 = (name: string, a: number, b: number) => gl.uniform2f(uniform(s, name), a, b);
    set2("u_sceneSize", region.width, region.height);
    set2("u_origin", out.x - region.x, out.y - region.y);
    set2("u_outSize", out.width, out.height);
    set2("u_center", rect.left + rect.width / 2 - region.x, rect.top + rect.height / 2 - region.y);
    set2("u_half", rect.width / 2, rect.height / 2);
    set1("u_dpr", dpr);
    const values: Array<[string, number]> = [
      ["u_radius", glass.radius], ["u_power", glass.power], ["u_bezel", glass.bezel],
      ["u_bend", glass.bend], ["u_dispersionRed", glass.dispersionRed],
      ["u_dispersionBlue", glass.dispersionBlue], ["u_rim", glass.rim],
      ["u_rimWidth", glass.rimWidth], ["u_specular", glass.specular], ["u_frost", glass.frost],
      ["u_grain", glass.grain], ["u_dim", glass.dim], ["u_fadeStart", glass.fadeStart],
      ["u_fadeEnd", glass.fadeEnd], ["u_shadow", glass.shadow],
      ["u_hover", glass.button ? pane.hover : 0], ["u_press", glass.button ? pane.press : 0],
    ];
    for (const [name, value] of values) set1(name, value);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

    // Place the pane's canvas over its box, past its border, with room for
    // the shadow, and copy the frame in before the drawing buffer is cleared.
    const borderLeft = parseFloat(style.borderLeftWidth) || 0;
    const borderTop = parseFloat(style.borderTopWidth) || 0;
    const { canvas, context } = pane;
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }
    const place = {
      left: `${-OVERFLOW - borderLeft}px`,
      top: `${-OVERFLOW - borderTop}px`,
      width: `${out.width}px`,
      height: `${out.height}px`,
    };
    for (const [key, value] of Object.entries(place) as Array<[keyof typeof place, string]>) {
      if (canvas.style[key] !== value) canvas.style[key] = value;
    }
    context.clearRect(0, 0, width, height);
    context.drawImage(s.canvas, 0, 0);
  }

  const instance: LensGlass = {
    markChanged() {
      forced = true;
      wake();
    },
    destroy() {
      destroyed = true;
      if (frame) cancelAnimationFrame(frame);
      intersection.disconnect();
      mutations.disconnect();
      root.removeEventListener("load", onMediaEvent, true);
      root.removeEventListener("loadeddata", onMediaEvent, true);
      root.removeEventListener("seeked", onMediaEvent, true);
      window.removeEventListener("resize", onMediaEvent);
      document.removeEventListener("visibilitychange", onMediaEvent);
      for (const pane of panes) {
        pane.cleanup();
        pane.canvas.remove();
        if (pane.restorePosition !== null) pane.element.style.position = pane.restorePosition;
      }
      instances.delete(instance);
    },
  };
  instances.add(instance);
  wake();
  return instance;
}

export type { GlassConfig, ResolvedGlass };
