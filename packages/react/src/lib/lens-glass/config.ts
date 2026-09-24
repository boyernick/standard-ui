/**
 * The StandardUI glass material: a lens with a refracting bezel, colour
 * dispersion, a lit rim, frost and grain, over a dimmed ground.
 *
 * Every length is in CSS pixels. Unset values scale with the pane, so the
 * same material reads on a 36px icon button and a 400px panel.
 */
export interface GlassConfig {
  /** Width of the refracting band inside the edge. Default: 30% of the short side, at most 48. */
  bezel?: number;
  /** How far the bezel bends the ground, at the rim. Default: ¾ of the bezel. */
  bend?: number;
  /** Red channel's share of the bend (colour dispersion). Default 1.2. */
  dispersionRed?: number;
  /** Blue channel's share of the bend. Default 0.8. */
  dispersionBlue?: number;
  /** Rim light intensity. Default 0.5. */
  rim?: number;
  /** Rim light width. Default 3.5, less on small panes. */
  rimWidth?: number;
  /** Specular sheen on the lit side of the bezel. Default 0.35. */
  specular?: number;
  /** Frost blur, as a Gaussian sigma. Default 3. */
  frost?: number;
  /** Film grain. Default 0.07. */
  grain?: number;
  /**
   * Multiplier on the ground seen through the glass (1 = undimmed). Default
   * 0.8 over a dark ground, 1 over a light one: dimming a white page only
   * turned the glass a flat mid-grey.
   */
  dim?: number;
  /** Fraction of the height where the glass starts fading out. Default 1 (no fade). */
  fadeStart?: number;
  /** Fraction of the height where the glass has faded out. Default 1 (no fade). */
  fadeEnd?: number;
  /** Contact shadow under the pane. Default 0.18. */
  shadow?: number;
  /**
   * Corner radius. Default: the element's computed border radius.
   */
  cornerRadius?: number;
  /**
   * Corner shape: 2 is a circular arc, ~4.2 a continuous "squircle" corner.
   * Fully rounded panes (circles and pills) are always circular. Default 4.2.
   */
  cornerPower?: number;
  /** Hover brightens the rim; pressing flattens the bend. Default false. */
  button?: boolean;

  /** @deprecated LiquidGlass option, ignored by the lens material. */
  blurAmount?: number;
  /** @deprecated LiquidGlass option, ignored by the lens material. */
  refraction?: number;
  /** @deprecated LiquidGlass option, ignored by the lens material. */
  chromAberration?: number;
  /** @deprecated LiquidGlass option, ignored by the lens material. */
  edgeHighlight?: number;
  /** @deprecated LiquidGlass option, ignored by the lens material. */
  fresnel?: number;
  /** @deprecated LiquidGlass option, ignored by the lens material. */
  distortion?: number;
  /** @deprecated LiquidGlass option, ignored by the lens material. */
  zRadius?: number;
  /** @deprecated LiquidGlass option, ignored by the lens material. */
  opacity?: number;
  /** @deprecated LiquidGlass option, ignored by the lens material. */
  saturation?: number;
  /** @deprecated LiquidGlass option, ignored by the lens material. */
  tintStrength?: number;
  /** @deprecated LiquidGlass option, ignored by the lens material. */
  brightness?: number;
  /** @deprecated LiquidGlass option, ignored by the lens material. */
  shadowOpacity?: number;
  /** @deprecated LiquidGlass option, ignored by the lens material. */
  shadowSpread?: number;
  /** @deprecated LiquidGlass option, ignored by the lens material. */
  shadowOffsetY?: number;
  /** @deprecated LiquidGlass option, ignored by the lens material. */
  floating?: boolean;
  /** @deprecated LiquidGlass option, ignored by the lens material. */
  bevelMode?: number;
}

/** Everything the shader needs for one pane, fully resolved. */
export interface ResolvedGlass {
  width: number;
  height: number;
  radius: number;
  power: number;
  bezel: number;
  bend: number;
  dispersionRed: number;
  dispersionBlue: number;
  rim: number;
  rimWidth: number;
  specular: number;
  frost: number;
  grain: number;
  dim: number;
  fadeStart: number;
  fadeEnd: number;
  shadow: number;
  button: boolean;
}

/** How far outside the pane the ground must be sampled. */
export function samplePadding(glass: ResolvedGlass) {
  return Math.ceil(glass.bend * Math.max(glass.dispersionRed, 1) + glass.frost * 2 + 2);
}

const finite = (value: unknown): value is number =>
  typeof value === "number" && Number.isFinite(value);

const pick = (value: unknown, fallback: number, min: number, max: number) =>
  finite(value) ? Math.min(max, Math.max(min, value)) : fallback;

/**
 * Resolve a pane's configuration against its size and computed radius.
 * Unset lengths scale with the short side, so small controls keep the
 * material's proportions rather than a 48px bezel that swallows them.
 */
export function resolveGlass(
  config: GlassConfig,
  width: number,
  height: number,
  cssRadius: number,
  options?: { lightGround?: boolean },
): ResolvedGlass {
  const short = Math.max(1, Math.min(width, height));
  const radius = pick(config.cornerRadius, cssRadius, 0, short / 2);
  // A pane rounded all the way is a circle or a pill: keep it one.
  const fullyRounded = radius >= short / 2 - 0.5;
  const power = fullyRounded ? 2 : pick(config.cornerPower, 4.2, 2, 8);
  const bezel = pick(config.bezel, Math.min(48, short * 0.3), 0, short / 2);
  return {
    width,
    height,
    radius: fullyRounded ? short / 2 : radius,
    power,
    bezel,
    bend: pick(config.bend, bezel * 0.75, 0, 96),
    dispersionRed: pick(config.dispersionRed, 1.2, 1, 2),
    dispersionBlue: pick(config.dispersionBlue, 0.8, 0, 1),
    rim: pick(config.rim, 0.5, 0, 2),
    rimWidth: pick(config.rimWidth, Math.min(3.5, Math.max(1.25, short * 0.04)), 0.5, 12),
    specular: pick(config.specular, 0.35, 0, 2),
    frost: pick(config.frost, 3, 0, 16),
    grain: pick(config.grain, 0.07, 0, 0.5),
    dim: pick(config.dim, options?.lightGround ? 1 : 0.8, 0, 1.5),
    fadeStart: pick(config.fadeStart, 1, 0, 1),
    fadeEnd: pick(config.fadeEnd, 1, 0, 1),
    shadow: pick(config.shadow, 0.18, 0, 1),
    button: config.button === true,
  };
}

/** Parse a `data-config` attribute; anything but a JSON object is ignored. */
export function parseConfig(value: string | null | undefined): GlassConfig {
  if (!value) return {};
  try {
    const parsed: unknown = JSON.parse(value);
    return parsed && typeof parsed === "object" && !Array.isArray(parsed)
      ? (parsed as GlassConfig)
      : {};
  } catch {
    return {};
  }
}

export interface Box {
  x: number;
  y: number;
  width: number;
  height: number;
}

export function intersect(a: Box, b: Box): Box | null {
  const x = Math.max(a.x, b.x);
  const y = Math.max(a.y, b.y);
  const right = Math.min(a.x + a.width, b.x + b.width);
  const bottom = Math.min(a.y + a.height, b.y + b.height);
  return right > x && bottom > y ? { x, y, width: right - x, height: bottom - y } : null;
}

/** A CSS `object-position` component: a percentage, a length, or a keyword. */
function position(value: string | undefined, free: number) {
  const token = (value ?? "50%").trim();
  if (token === "left" || token === "top") return 0;
  if (token === "right" || token === "bottom") return free;
  if (token === "center") return free / 2;
  if (token.endsWith("%")) return (parseFloat(token) / 100) * free;
  const px = parseFloat(token);
  return Number.isFinite(px) ? px : free / 2;
}

/**
 * Where a replaced element's content is painted inside its box, per CSS
 * `object-fit` and `object-position`. Returns the content rectangle in the
 * box's coordinate space (it may overflow the box; callers clip).
 */
export function objectFitRect(
  box: { width: number; height: number },
  natural: { width: number; height: number },
  fit: string,
  objectPosition: string,
): Box {
  const { width: bw, height: bh } = box;
  const nw = natural.width || bw;
  const nh = natural.height || bh;
  let width = bw;
  let height = bh;
  if (fit === "contain" || fit === "cover" || fit === "scale-down") {
    const scale =
      fit === "cover" ? Math.max(bw / nw, bh / nh) : Math.min(bw / nw, bh / nh);
    const clamped = fit === "scale-down" ? Math.min(1, scale) : scale;
    width = nw * clamped;
    height = nh * clamped;
  } else if (fit === "none") {
    width = nw;
    height = nh;
  }
  const [px, py] = objectPosition.split(/\s+/);
  return {
    x: position(px, bw - width),
    y: position(py, bh - height),
    width,
    height,
  };
}
