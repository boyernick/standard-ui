/**
 * The media pages ship no photography or footage — every specimen stands on a
 * flat, light grey surface so the component chrome is what reads.
 *
 * This is an inline SVG rather than a token class because the media components
 * take an image *source*: the same placeholder has to fill the card, the
 * lightbox, the blurred lightbox backdrop and the gallery filmstrip. Like a real
 * photo it keeps one value in both themes; the grey matches `--gray-75`.
 */
const PLACEHOLDER_FILL = "%23f3f3f3"

/**
 * Sized rather than fixed, because intrinsic dimensions are what give the
 * lightbox its shape: the grid thumbnails crop with `object-cover`, but the
 * full view contains the image, so a portrait source reads as a portrait there.
 */
export const placeholderSrc = (width: number, height: number) =>
  `data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='${width}'%20height='${height}'%3E%3Crect%20width='${width}'%20height='${height}'%20fill='${PLACEHOLDER_FILL}'/%3E%3C/svg%3E`

/** The default 16:10 landscape, for specimens that only need one image. */
export const PLACEHOLDER_SRC = placeholderSrc(1600, 1000)

export const PLACEHOLDER_ALT = "Placeholder image"

/** Matching flat grey clip, so the player has something real to play. */
export const PLACEHOLDER_VIDEO_SRC = "/video/placeholder.mp4"

/**
 * The scrim behind a caption laid over media.
 *
 * Written out as a smootherstep ramp rather than `from-…/via-…/to-…` because a
 * two- or three-stop gradient is a run of straight segments, and the eye reads
 * every slope change between them as a seam (Mach banding). Photographic detail
 * hides that; a flat placeholder does not. These stops sample 0.55 → 0 along
 * `6t⁵ − 15t⁴ + 10t³`, which leaves the curve flat at both ends: no edge where
 * the scrim starts, no corner where it lands on full strength behind the text.
 */
export const CAPTION_SCRIM =
  "bg-[linear-gradient(to_top,rgba(0,0,0,0.55)_0%,rgba(0,0,0,0.54)_12.5%,rgba(0,0,0,0.49)_25%,rgba(0,0,0,0.40)_37.5%,rgba(0,0,0,0.28)_50%,rgba(0,0,0,0.15)_62.5%,rgba(0,0,0,0.06)_75%,rgba(0,0,0,0.01)_87.5%,transparent_100%)]"
