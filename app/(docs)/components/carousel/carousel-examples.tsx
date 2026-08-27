"use client"

import {
  useRef,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
} from "react"
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  Gallery,
  GalleryTrigger,
} from "@boyernick/standard-ui-react"
import { DocBand } from "@/components/doc-band"
import { PAGE_INNER } from "@/lib/chrome"
import {
  CAPTION_SCRIM,
  PLACEHOLDER_ALT,
  PLACEHOLDER_SRC,
  PLACEHOLDER_SURFACE,
} from "@/lib/media-placeholder"

const gallery = Array.from({ length: 6 }, (_, index) => ({
  src: PLACEHOLDER_SRC,
  alt: PLACEHOLDER_ALT,
  caption: `Slide ${index + 1}`,
}))

const DRAG_CLICK_THRESHOLD = 8

const SlideImage = ({
  alt,
  caption,
  index,
}: {
  alt: string
  caption?: string
  index: number
}) => {
  const pointerStart = useRef<{ x: number; y: number } | null>(null)

  const handlePointerDown = (event: ReactPointerEvent<HTMLButtonElement>) => {
    pointerStart.current = { x: event.clientX, y: event.clientY }
  }

  const handleClick = (event: ReactMouseEvent<HTMLButtonElement>) => {
    const start = pointerStart.current
    pointerStart.current = null
    if (!start) return
    const dx = Math.abs(event.clientX - start.x)
    const dy = Math.abs(event.clientY - start.y)
    if (dx > DRAG_CLICK_THRESHOLD || dy > DRAG_CLICK_THRESHOLD) {
      event.preventDefault()
    }
  }

  return (
    <GalleryTrigger
      index={index}
      aria-label={caption ? `Open ${caption}` : `Open image: ${alt}`}
      className="block w-full cursor-pointer rounded-xl bg-background-secondary transition-opacity hover:opacity-95"
      onPointerDown={handlePointerDown}
      onClick={handleClick}
    >
      <figure
        className={`relative aspect-[16/10] overflow-hidden rounded-xl ${PLACEHOLDER_SURFACE} shadow-md`}
      >
        {caption ? (
          <figcaption className={`pointer-events-none absolute inset-x-0 bottom-0 ${CAPTION_SCRIM} px-4 pt-16 pb-3 text-left text-sm text-white`}>
            {caption}
          </figcaption>
        ) : null}
      </figure>
    </GalleryTrigger>
  )
}

export const CarouselExamples = () => (
  <div>
    <DocBand
      first
      id="gallery"
      title="Gallery"
      description="Free-scroll the strip — click a card to open the gallery."
      bleedContent="full"
      contentClassName="w-full max-w-none"
    >
      <Gallery images={gallery} variant="caption">
        <Carousel className="w-full" aria-label="Placeholder media">
          <CarouselContent viewportClassName={`${PAGE_INNER} py-1`}>
            {gallery.map((shot, index) => (
              <CarouselItem key={shot.caption}>
                <SlideImage {...shot} index={index} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className={PAGE_INNER}>
            <CarouselDots />
          </div>
        </Carousel>
      </Gallery>
    </DocBand>
  </div>
)
