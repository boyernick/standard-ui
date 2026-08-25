"use client"

import {
  Gallery,
  GalleryTrigger,
  Modal,
  ModalContent,
  ModalTrigger,
} from "@boyernick/standard-ui-react"
import { DocBand } from "@/components/doc-band"

const shots = [
  {
    src: "/gallery/mountains.jpg",
    alt: "Snow-covered mountain peaks above mist",
    label: "Ridges",
    caption: "Ridges cutting through cloud on a winter ridge.",
  },
  {
    src: "/gallery/coast.jpg",
    alt: "Mossy sea arch over a narrow coastal channel",
    label: "Arch",
    caption: "A rock bridge holding green between two cliffs.",
  },
  {
    src: "/gallery/sandbar.jpg",
    alt: "Aerial view of a white sandbar in turquoise water",
  },
  {
    src: "/gallery/waterfall.jpg",
    alt: "Water cascading over a mossy cliff",
    label: "Falls",
    caption: "Soft falls over dark stone and bright moss.",
  },
  {
    src: "/gallery/moon.jpg",
    alt: "Full moon rising behind a silhouetted treeline",
  },
  {
    src: "/gallery/cliff.jpg",
    alt: "Layered cliff face with a pale hanging branch",
    label: "Cliff",
    caption: "Strata and a bleached branch in deep shadow.",
  },
  {
    src: "/gallery/cascade.jpg",
    alt: "Forest waterfall into a green pool",
  },
  {
    src: "/gallery/shore.jpg",
    alt: "Aerial tropical shore with palms and reef",
    label: "Shore",
    caption: "Palm canopy meeting pale sand and shallow reef.",
  },
  {
    src: "/gallery/dunes.jpg",
    alt: "Wind-rippled white sand dunes from above",
  },
  {
    src: "/gallery/ice.jpg",
    alt: "Abstract teal glacial ice textures",
    label: "Ice",
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

/** A media card that opens its own lightbox. */
const Shot = ({
  src,
  alt,
  label,
  caption,
  variant = "default",
}: {
  src: string
  alt: string
  label?: string
  caption?: string
  variant?: "default" | "caption"
}) => (
  <Modal>
    <ModalTrigger
      aria-label={label ? `Open ${label}` : `Open image: ${alt}`}
      className="block w-full cursor-pointer rounded-2xl bg-background-secondary transition-opacity hover:opacity-95"
    >
      <figure className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-border-primary shadow-lg">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className="size-full object-cover"
          draggable={false}
        />
        {label ? (
          <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-linear-to-t from-black/55 to-transparent px-4 pt-10 pb-3 text-left text-sm text-white">
            {label}
          </figcaption>
        ) : null}
      </figure>
    </ModalTrigger>
    <ModalContent
      src={src}
      alt={alt}
      caption={caption}
      variant={variant}
    />
  </Modal>
)

export const ImagesExamples = () => (
  <div>
    <DocBand
      first
      id="default"
      title="Default"
      description="A media card that opens into the full image."
      contentClassName="w-full max-w-xl"
    >
      <Shot
        src={shots[0].src}
        alt={shots[0].alt}
      />
    </DocBand>

    <DocBand
      id="caption"
      title="With caption"
      description="Label on the card, supporting caption in the lightbox."
      contentClassName="w-full max-w-xl"
    >
      <Shot
        src={shots[1].src}
        alt={shots[1].alt}
        label={shots[1].label}
        caption={shots[1].caption}
        variant="caption"
      />
    </DocBand>

    <DocBand
      id="gallery"
      title="Gallery"
      description="Open any image, then use the controls, arrow keys, touch, or a horizontal trackpad gesture."
      contentClassName="w-full max-w-none"
    >
      <Gallery images={[...shots]} variant="caption">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
          {shots.map((shot, index) => (
            <GalleryTrigger
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
            </GalleryTrigger>
          ))}
        </div>
      </Gallery>
    </DocBand>
  </div>
)
