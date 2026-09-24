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

/**
 * Layout does not change within a frame (the renderer only moves its own
 * absolutely positioned canvases), so each element is measured once per frame
 * however many panes look at it.
 */
let frameRects: Map<Element, DOMRect> | null = null;

function rectOf(element: Element) {
  if (!frameRects) return element.getBoundingClientRect();
  let rect = frameRects.get(element);
  if (!rect) {
    rect = element.getBoundingClientRect();
    frameRects.set(element, rect);
  }
  return rect;
}

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

const originChecks = new WeakMap<Element, { source: string; cross: boolean }>();

function crossOrigin(element: HTMLImageElement | HTMLVideoElement) {
  if (element.crossOrigin) return false;
  const source = element.currentSrc || element.getAttribute("src") || "";
  const known = originChecks.get(element);
  if (known && known.source === source) return known.cross;
  let cross: boolean;
  if (!source || source.startsWith("data:") || source.startsWith("blob:")) cross = false;
  else {
    try {
      cross = new URL(source, location.href).origin !== location.origin;
    } catch {
      cross = true;
    }
  }
  originChecks.set(element, { source, cross });
  return cross;
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

/**
 * Images are drawn from a downsized copy decoded off the main thread. Drawing
 * a full-size <img> the first time decodes it synchronously — a Retina
 * screenshot behind a carousel arrow held a frame for 380ms — and the glass
 * frosts what it shows anyway, so it never needs more than this.
 */
const MAX_BITMAP_EDGE = 960;

type ImageCopy = { src: string; bitmap?: ImageBitmap; pending?: boolean; failed?: boolean };
const imageCopies = new WeakMap<HTMLImageElement, ImageCopy>();

/**
 * The drawable copy of an image: a ready bitmap, the image itself where
 * bitmaps are unavailable, or null while the copy is still decoding (it is
 * left out until `ready` is called).
 */
function imageCopy(image: HTMLImageElement, ready: () => void): CanvasImageSource | null {
  if (typeof createImageBitmap !== "function") return image;
  const src = image.currentSrc || image.src;
  let copy = imageCopies.get(image);
  if (!copy || copy.src !== src) {
    copy?.bitmap?.close();
    copy = { src };
    imageCopies.set(image, copy);
  }
  if (copy.bitmap) return copy.bitmap;
  if (copy.failed) return image;
  if (!copy.pending) {
    const target = copy;
    target.pending = true;
    const longEdge = Math.max(image.naturalWidth, image.naturalHeight);
    const scale = Math.min(1, MAX_BITMAP_EDGE / Math.max(1, longEdge));
    const options: ImageBitmapOptions | undefined = scale < 1
      ? {
          resizeWidth: Math.max(1, Math.round(image.naturalWidth * scale)),
          resizeHeight: Math.max(1, Math.round(image.naturalHeight * scale)),
          resizeQuality: "medium",
        }
      : undefined;
    // Decode from the file's bytes (the HTTP cache has them): a Blob decodes
    // entirely off the main thread, where an <img> source can still decode on
    // it. SVG and anything else a Blob cannot decode falls back to the element.
    const fromBytes = fetch(src, { mode: "cors", credentials: "same-origin", cache: "force-cache" })
      .then((response) => {
        if (!response.ok) throw new Error(`Glass: image fetch ${response.status}`);
        return response.blob();
      })
      .then((blob) => createImageBitmap(blob, options));
    fromBytes
      .catch(() => createImageBitmap(image, options))
      .then((bitmap) => {
        if (imageCopies.get(image) === target) target.bitmap = bitmap;
        else bitmap.close();
      })
      .catch(() => {
        target.failed = true;
      })
      .finally(() => {
        target.pending = false;
        ready();
      });
  }
  return null;
}

/** Whether a CSS colour is light (relative luminance over one half), cached per colour. */
const groundLightness = new Map<string, boolean>();
let lightnessProbe: CanvasRenderingContext2D | null = null;

function isLightGround(color: string) {
  const known = groundLightness.get(color);
  if (known !== undefined) return known;
  lightnessProbe ??= Object.assign(document.createElement("canvas"), { width: 1, height: 1 })
    .getContext("2d", { willReadFrequently: true });
  let light = false;
  if (lightnessProbe) {
    // The canvas parses any CSS colour the page can use, oklab and all.
    lightnessProbe.clearRect(0, 0, 1, 1);
    lightnessProbe.fillStyle = "#000";
    lightnessProbe.fillStyle = color;
    lightnessProbe.fillRect(0, 0, 1, 1);
    const [r, g, b] = lightnessProbe.getImageData(0, 0, 1, 1).data;
    const linear = (value: number) => {
      const c = value / 255;
      return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
    };
    light = 0.2126 * linear(r) + 0.7152 * linear(g) + 0.0722 * linear(b) > 0.5;
  }
  groundLightness.set(color, light);
  return light;
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
  let clip: Box | null = toBox(rectOf(element));
  let opacity = 1;
  for (let node: Element | null = element; node && node !== root; node = node.parentElement) {
    const style = getComputedStyle(node);
    if (style.display === "none" || style.visibility === "hidden") return null;
    opacity *= Number(style.opacity) || 0;
    if (opacity <= 0.01) return null;
    if (node !== element && (style.overflowX !== "visible" || style.overflowY !== "visible")) {
      clip = clip && intersect(clip, toBox(rectOf(node)));
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
      clip = intersect(clip, toBox(rectOf(node))) ?? { x: 0, y: 0, width: 0, height: 0 };
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
  /** This pane's own ground canvas, kept between frames rather than resized. */
  scene: HTMLCanvasElement;
  sceneContext: CanvasRenderingContext2D;
  /** When a playing video behind it last redrew this pane. */
  lastVideoFrame: number;
  /** Whether the pane was drawable last time it was checked. */
  shown: boolean;
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
    const scene = document.createElement("canvas");
    const sceneContext = scene.getContext("2d");
    if (!sceneContext) throw new Error("Glass: 2D canvas is unavailable.");

    let restorePosition: string | null = null;
    if (getComputedStyle(element).position === "static") {
      restorePosition = element.style.position;
      element.style.position = "relative";
      record.position = restorePosition;
    }

    const pane: Pane = {
      element, canvas, context, scene, sceneContext, lastVideoFrame: 0, shown: false, restorePosition,
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

  // `forced`: something may have changed, so check every pane this frame.
  // `redraw`: draw every pane even if nothing it depends on looks different
  // (markChanged, a restored WebGL context).
  let forced = true;
  let redraw = true;
  let visible = true;
  let frame = 0;
  let destroyed = false;
  // Frames since anything last moved or changed; the loop stops a few frames
  // after the page settles and waits for an event to wake it.
  let quietFrames = 0;
  let lastLayout = "";
  let transitions = 0;

  const intersection = new IntersectionObserver((entries) => {
    visible = entries.some((entry) => entry.isIntersecting);
    if (visible) wake();
  });
  intersection.observe(root);

  const mutations = new MutationObserver((records) => {
    // Our own canvases change on every frame we draw; they are not the ground.
    // A pane's own contents (a progress bar, a label) are drawn over the glass,
    // not refracted by it; only its configuration matters.
    const relevant = records.filter((record) => {
      const target = record.target as HTMLElement;
      if (target.dataset?.glassCanvas !== undefined) return false;
      if (record.attributeName === "data-config") return true;
      return !(target instanceof Element && !paneSet.has(target as HTMLElement) && insidePane(target));
    });
    if (!relevant.length) return;
    // Inline style changes (a carousel's transform while dragging) only move
    // things, which the position check sees; a change in what exists or how
    // it is styled means re-listing what paints.
    if (relevant.some((record) => record.type === "childList" || record.attributeName !== "style")) {
      collectMedia();
    }
    // An inline style can change opacity or clipping without moving anything.
    forced = true;
    wake();
  });
  mutations.observe(root, { childList: true, subtree: true, attributes: true, attributeFilter: ["src", "data-config", "class", "style"] });

  // Everything else that can change what a pane shows arrives as an event.
  const onChange = () => { forced = true; wake(); };
  const onMove = () => wake();
  const onTransitionStart = () => { transitions += 1; forced = true; wake(); };
  const onTransitionEnd = () => { transitions = Math.max(0, transitions - 1); forced = true; wake(); };
  const rootEvents: Array<[string, EventListener]> = [
    ["load", onChange], ["loadeddata", onChange], ["seeked", onChange], ["play", onChange],
    ["pause", onChange], ["ended", onChange],
    ["transitionrun", onTransitionStart], ["transitionend", onTransitionEnd], ["transitioncancel", onTransitionEnd],
    ["animationstart", onTransitionStart], ["animationend", onTransitionEnd], ["animationcancel", onTransitionEnd],
    ["pointerover", onChange], ["pointerout", onChange], ["pointermove", onMove], ["pointerdown", onMove],
  ];
  for (const [type, listener] of rootEvents) root.addEventListener(type, listener, true);
  window.addEventListener("resize", onChange);
  window.addEventListener("scroll", onMove, { capture: true, passive: true });
  // A root that started in a background tab draws when the tab is shown.
  document.addEventListener("visibilitychange", onChange);

  function wake() {
    quietFrames = 0;
    if (!frame && !destroyed) frame = requestAnimationFrame(tick);
  }

  const rectKey = (element: Element) => {
    const r = rectOf(element);
    return `${r.x.toFixed(1)},${r.y.toFixed(1)},${r.width.toFixed(1)},${r.height.toFixed(1)}`;
  };

  /** Whether a pane can be seen at all: not faded out, hidden or clipped away. */
  function paneShown(pane: Pane) {
    const seen = visibility(pane.element, root);
    if (!seen || seen.opacity < 0.02) return false;
    return Boolean(intersect(seen.clip, { x: 0, y: 0, width: innerWidth, height: innerHeight }));
  }

  function tick(now: number) {
    frame = 0;
    // Hidden tabs get no animation frames anyway; no need to check here.
    if (destroyed || !visible) return;
    frameRects = new Map();
    try {
      step(now);
    } finally {
      frameRects = null;
    }
  }

  function step(now: number) {

    // Cheap: where the panes and media are. Anything else that matters
    // arrives as an event and sets `forced`.
    const layout = panes.map((pane) => rectKey(pane.element)).join(";") + "|" + media.map(rectKey).join(";");
    const moved = layout !== lastLayout || transitions > 0;
    lastLayout = layout;
    const check = forced || moved;

    const ground = check ? groundColor() : "";
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const playing = media.filter(
      (element): element is HTMLVideoElement =>
        element instanceof HTMLVideoElement && !element.paused && !element.ended,
    );
    let animating = false;
    let videoBehindShownPane = false;

    for (const pane of panes) {
      pane.hover += (pane.hoverTarget - pane.hover) * 0.25;
      pane.press += (pane.pressTarget - pane.press) * 0.35;
      if (Math.abs(pane.hoverTarget - pane.hover) < 0.01) pane.hover = pane.hoverTarget;
      if (Math.abs(pane.pressTarget - pane.press) < 0.01) pane.press = pane.pressTarget;
      const paneAnimating = pane.hover !== pane.hoverTarget || pane.press !== pane.pressTarget;
      if (paneAnimating) animating = true;

      if (check || paneAnimating) pane.shown = paneShown(pane);
      if (!pane.shown) {
        // Draw afresh when it next appears.
        pane.signature = "";
        continue;
      }

      // A playing video behind a shown pane changes every frame; follow it
      // at up to 30fps.
      const paneBox = toBox(rectOf(pane.element));
      const overVideo = playing.some((video) => intersect(toBox(rectOf(video)), paneBox));
      let videoFrame = false;
      if (overVideo) {
        videoBehindShownPane = true;
        if (now - pane.lastVideoFrame >= 33) {
          pane.lastVideoFrame = now;
          videoFrame = true;
        }
      }

      if (!check && !paneAnimating && !videoFrame) continue;
      renderPane(pane, ground || groundColor(), dpr, redraw);
    }
    forced = false;
    redraw = false;
    quietFrames = moved || animating ? 0 : quietFrames + 1;
    if (animating || videoBehindShownPane || quietFrames < 12) frame = requestAnimationFrame(tick);
  }

  function renderPane(pane: Pane, ground: string, dpr: number, force: boolean) {
    const { element } = pane;
    const rect = rectOf(element);
    if (rect.width < 1 || rect.height < 1) return;
    const style = getComputedStyle(element);
    const config = { ...defaults, ...parseConfig(element.dataset.config) };
    const cssRadius = parseFloat(style.borderTopLeftRadius) || 0;
    const glass = resolveGlass(config, rect.width, rect.height, cssRadius, {
      lightGround: isLightGround(ground),
    });

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
      if (!intersect(toBox(rectOf(item)), region)) continue;
      if (isMedia && !drawable(item)) continue;
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

    // Relative to the pane: a pane that moves together with what is behind it
    // (a video player's controls as its slide pages) shows the same thing, and
    // its canvas moves with it, so it needs no redraw.
    const ox = rect.left;
    const oy = rect.top;
    const px = (value: number) => value.toFixed(1);
    const signature = [
      px(region.width), px(region.height),
      dpr, ground, element.dataset.config ?? "", pane.hover.toFixed(2), pane.press.toFixed(2),
      ...drawn.map(({ element: item, clip, opacity, filter, color }) => {
        const r = rectOf(item);
        const frameKey = item instanceof HTMLVideoElement ? item.currentTime.toFixed(3)
          : item instanceof HTMLImageElement ? item.currentSrc : "";
        return `${px(r.x - ox)},${px(r.y - oy)},${px(r.width)},${px(r.height)}|${px(clip.x - ox)},${px(clip.y - oy)},${px(clip.width)},${px(clip.height)}|${opacity.toFixed(2)}|${filter}|${color ?? ""}|${frameKey}`;
      }),
    ].join(";");
    if (!force && signature === pane.signature) return;
    pane.signature = signature;

    // The ground, in scene space (CSS px, origin at the region's top-left).
    let scale = dpr;
    if (region.width * region.height * scale * scale > MAX_SCENE_PIXELS) {
      scale = Math.sqrt(MAX_SCENE_PIXELS / (region.width * region.height));
    }
    const { scene, sceneContext } = pane;
    const sceneWidth = Math.max(1, Math.round(region.width * scale));
    const sceneHeight = Math.max(1, Math.round(region.height * scale));
    // Resizing a canvas reallocates it; only do so when the size changes.
    if (scene.width !== sceneWidth || scene.height !== sceneHeight) {
      scene.width = sceneWidth;
      scene.height = sceneHeight;
    }
    sceneContext.setTransform(1, 0, 0, 1, 0, 0);
    sceneContext.clearRect(0, 0, sceneWidth, sceneHeight);
    sceneContext.setTransform(scale, 0, 0, scale, -region.x * scale, -region.y * scale);
    sceneContext.globalAlpha = 1;
    sceneContext.fillStyle = ground;
    sceneContext.fillRect(region.x, region.y, region.width, region.height);
    for (const { element: item, clip, opacity, filter, color } of drawn) {
      sceneContext.save();
      sceneContext.globalAlpha = opacity;
      if (color !== null) {
        const box = toBox(rectOf(item));
        const visible = intersect(box, clip);
        if (visible) {
          sceneContext.fillStyle = color;
          sceneContext.fillRect(visible.x, visible.y, visible.width, visible.height);
        }
        sceneContext.restore();
        continue;
      }
      const source = item as HTMLImageElement | HTMLVideoElement | HTMLCanvasElement;
      const box = rectOf(source);
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
      const picture = source instanceof HTMLImageElement ? imageCopy(source, instance.markChanged) : source;
      try {
        if (picture) {
          sceneContext.drawImage(picture, box.left + content.x, box.top + content.y, content.width, content.height);
        }
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
      redraw = true;
      wake();
    },
    destroy() {
      destroyed = true;
      if (frame) cancelAnimationFrame(frame);
      intersection.disconnect();
      mutations.disconnect();
      for (const [type, listener] of rootEvents) root.removeEventListener(type, listener, true);
      window.removeEventListener("resize", onChange);
      window.removeEventListener("scroll", onMove, { capture: true });
      document.removeEventListener("visibilitychange", onChange);
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
