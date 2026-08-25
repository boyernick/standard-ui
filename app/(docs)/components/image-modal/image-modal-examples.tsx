"use client"

import {
  ImageModal,
  ImageModalContent,
  ImageModalGallery,
  ImageModalGalleryTrigger,
  ImageModalTrigger,
} from "@boyernick/standard-ui-react"
import { DocBand } from "@/components/doc-band"

const shots = [
  {
    src: "/gallery/mountains.jpg",
    alt: "Snow-covered mountain peaks above mist",
    caption: "Ridges cutting through cloud on a winter ridge.",
  },
  {
    src: "/gallery/coast.jpg",
    alt: "Mossy sea arch over a narrow coastal channel",
    caption: "A rock bridge holding green between two cliffs.",
  },
  {
    src: "/gallery/sandbar.jpg",
    alt: "Aerial view of a white sandbar in turquoise water",
  },
  {
    src: "/gallery/waterfall.jpg",
    alt: "Water cascading over a mossy cliff",
    caption: "Soft falls over dark stone and bright moss.",
  },
  {
    src: "/gallery/moon.jpg",
    alt: "Full moon rising behind a silhouetted treeline",
  },
  {
    src: "/gallery/cliff.jpg",
    alt: "Layered cliff face with a pale hanging branch",
    caption: "Strata and a bleached branch in deep shadow.",
  },
  {
    src: "/gallery/cascade.jpg",
    alt: "Forest waterfall into a green pool",
  },
  {
    src: "/gallery/shore.jpg",
    alt: "Aerial tropical shore with palms and reef",
    caption: "Palm canopy meeting pale sand and shallow reef.",
  },
  {
    src: "/gallery/dunes.jpg",
    alt: "Wind-rippled white sand dunes from above",
  },
  {
    src: "/gallery/ice.jpg",
    alt: "Abstract teal glacial ice textures",
    caption: "Teal ice folded into dark crevasses.",
  },
  {
    src: "/gallery/clouds.jpg",
    alt: "Bright cumulus framed by dark storm clouds",
  },
  {
    src: "/gallery/forest.jpg",
    alt: "Misty evergreen forest with a dirt path",
  },
] as const

/** A thumbnail that opens its own lightbox. */
const Shot = ({
  src,
  alt,
  caption,
  variant = "default",
  className = "w-full max-w-sm",
}: {
  src: string
  alt: string
  caption?: string
  variant?: "default" | "caption"
  className?: string
}) => (
  <ImageModal>
    <ImageModalTrigger
      className={`block cursor-pointer overflow-hidden rounded-xl border border-border-primary shadow-lg ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="aspect-[4/3] w-full object-cover transition-opacity hover:opacity-90"
      />
    </ImageModalTrigger>
    <ImageModalContent
      src={src}
      alt={alt}
      caption={caption}
      variant={variant}
    />
  </ImageModal>
)

export const ImageModalExamples = () => (
  <div>
    <DocBand
      first
      id="default"
      title="Default"
      description="A thumbnail that opens into the full image."
      contentClassName="max-w-sm"
    >
      <Shot src={shots[0].src} alt={shots[0].alt} />
    </DocBand>

    <DocBand
      id="caption"
      title="With caption"
      description="The caption variant adds supporting context below the image."
      contentClassName="max-w-sm"
    >
      <Shot
        src={shots[1].src}
        alt={shots[1].alt}
        caption={shots[1].caption}
        variant="caption"
      />
    </DocBand>

    <DocBand
      id="gallery"
      title="Gallery"
      description="Open any image, then use the controls, arrow keys, touch, or a horizontal trackpad gesture."
      contentClassName="max-w-2xl"
    >
      <ImageModalGallery images={[...shots]} variant="caption">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {shots.map((shot, index) => (
            <ImageModalGalleryTrigger
              key={shot.src}
              index={index}
              className="block w-full overflow-hidden rounded-lg border border-border-primary"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={shot.src}
                alt={shot.alt}
                className="aspect-[4/3] w-full object-cover transition-opacity hover:opacity-90"
              />
            </ImageModalGalleryTrigger>
          ))}
        </div>
      </ImageModalGallery>
    </DocBand>
  </div>
)
