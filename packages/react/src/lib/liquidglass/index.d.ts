/**
 * Type surface for the vendored @ybouane/liquidglass 1.0.3 renderer.
 * Source: https://github.com/ybouane/liquidglass
 * License: MIT
 */

export interface GlassConfig {
  blurAmount: number;
  refraction: number;
  chromAberration: number;
  edgeHighlight: number;
  specular: number;
  fresnel: number;
  distortion: number;
  cornerRadius: number;
  zRadius: number;
  opacity: number;
  saturation: number;
  tintStrength: number;
  brightness: number;
  shadowOpacity: number;
  shadowSpread: number;
  shadowOffsetY: number;
  floating: boolean;
  button: boolean;
  bevelMode: number;
}

export interface LiquidGlassOptions {
  root: HTMLElement;
  glassElements?: NodeListOf<HTMLElement> | HTMLElement[];
  defaults?: Partial<GlassConfig>;
}

export declare class LiquidGlass {
  static init(options: LiquidGlassOptions): Promise<LiquidGlass>;
  readonly root: HTMLElement;
  readonly defaults: GlassConfig;
  fps: number;
  destroy(): void;
  markChanged(element?: HTMLElement): void;
}

export declare const DEFAULTS: GlassConfig;
export declare function invalidateFontEmbedCache(): void;
