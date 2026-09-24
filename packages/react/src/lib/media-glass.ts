import type { GlassConfig } from "./lens-glass/config";

/**
 * Shared material for controls over images and video. Their icons are white
 * (`text-fg-scrim`), so the ground is dimmed further than the default to keep
 * them legible over a bright frame, and frosted a little more.
 */
export const mediaGlass: GlassConfig = {
  dim: 0.62,
  frost: 4,
  shadow: 0.2,
}
