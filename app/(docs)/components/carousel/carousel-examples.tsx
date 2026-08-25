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

const gallery = [
  {
    src: "/gallery/mountains.jpg",
    alt: "Snow-covered mountain peaks above mist",
    caption: "Ridges",
  },
  {
    src: "/gallery/coast.jpg",
    alt: "Mossy sea arch over a narrow coastal channel",
    caption: "Arch",
  },
  {
    src: "/gallery/waterfall.jpg",
    alt: "Water cascading over a mossy cliff",
    caption: "Falls",
  },
  {
    src: "/gallery/shore.jpg",
    alt: "Aerial tropical shore with palms and reef",
    caption: "Shore",
  },
  {
    src: "/gallery/dunes.jpg",
    alt: "Wind-rippled white sand dunes from above",
    caption: "Dunes",
  },
  {
    src: "/gallery/forest.jpg",
    alt: "Misty evergreen forest with a dirt path",
    caption: "Forest",
  },
] as const

const DRAG_CLICK_THRESHOLD = 8

const SlideImage = ({
  src,
  alt,
  caption,
  index,
}: {
  src: string
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
      <figure className="relative aspect-[16/10] overflow-hidden rounded-xl border border-border-primary shadow-md">
        {/* eslint-disable-next-line @next/next/no-img-element -- static public gallery assets */}
        <img
          src={src}
          alt={alt}
          className="size-full object-cover"
          draggable={false}
        />
        {caption ? (
          <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-linear-to-t from-black/55 to-transparent px-4 pt-10 pb-3 text-left text-sm text-white">
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
      <Gallery images={[...gallery]} variant="caption">
        <Carousel className="w-full" aria-label="Landscape photos">
          <CarouselContent viewportClassName={`${PAGE_INNER} py-1`}>
            {gallery.map((shot, index) => (
              <CarouselItem key={shot.src}>
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
