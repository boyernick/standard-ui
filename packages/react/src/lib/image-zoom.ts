/**
 * Magnify an image in place and pan it under the pointer.
 *
 * The image scales from its top-left corner and moves with `translate`, so
 * the zoom can ease while panning stays instant. Crossing the frame maps to
 * the image's whole travel: the pointer reaches every edge at any size, and
 * the image never parks with an edge out of reach.
 */

export const IMAGE_ZOOM = 2

export interface ZoomAxis {
  /** Pointer position, in client pixels. */
  cursor: number
  /** Start and size of the frame the image is seen through. */
  frameStart: number
  frameSize: number
  /** Where the unmoved image starts, in client pixels. */
  layoutStart: number
  /** The magnified image's size, in client pixels. */
  rendered: number
  /** Client pixels per image pixel from ancestors (an opening dialog's scale). */
  ancestor: number
}

/** The translate, in the image's own pixels, for one axis. */
export function zoomTranslate({
  cursor,
  frameStart,
  frameSize,
  layoutStart,
  rendered,
  ancestor,
}: ZoomAxis) {
  const unit = ancestor || 1
  // Smaller than the frame: centre it, nothing to pan.
  if (rendered <= frameSize) {
    return (frameStart + frameSize / 2 - layoutStart - rendered / 2) / unit
  }
  const atStart = (frameStart - layoutStart) / unit
  const atEnd = (frameStart + frameSize - rendered - layoutStart) / unit
  const progress = Math.max(0, Math.min(1, (cursor - frameStart) / frameSize))
  return atStart + (atEnd - atStart) * progress
}

/** The presented scale and translate, including an in-flight transition. */
function presented(image: HTMLElement) {
  const style = getComputedStyle(image)
  const scale = Number.parseFloat(style.scale) || 1
  const [x = 0, y = 0] = (style.translate || "").split(" ").map(Number.parseFloat)
  return { scale, x: Number.isFinite(x) ? x : 0, y: Number.isFinite(y) ? y : 0 }
}

/** Move a magnified image so the point under the pointer comes into view. */
export function panZoomedImage(
  image: HTMLElement,
  frame: DOMRect,
  clientX: number,
  clientY: number,
  scale = IMAGE_ZOOM,
) {
  const width = image.offsetWidth
  const height = image.offsetHeight
  if (!width || !height) return

  const applied = presented(image)
  const rect = image.getBoundingClientRect()
  const ancestor = rect.width / (applied.scale * width) || 1
  const x = zoomTranslate({
    cursor: clientX,
    frameStart: frame.left,
    frameSize: frame.width,
    layoutStart: rect.left - ancestor * applied.x,
    rendered: ancestor * scale * width,
    ancestor,
  })
  const y = zoomTranslate({
    cursor: clientY,
    frameStart: frame.top,
    frameSize: frame.height,
    layoutStart: rect.top - ancestor * applied.y,
    rendered: ancestor * scale * height,
    ancestor,
  })
  image.style.translate = `${x}px ${y}px`
}
