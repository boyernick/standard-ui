"use client"

import {
  ImageModal,
  ImageModalContent,
  ImageModalGallery,
  ImageModalGalleryTrigger,
  ImageModalTrigger,
} from "@boyernick/standard-ui-react"
import { DocBand } from "@/components/doc-band"

const unsplash = (id: string, width = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=80`

const shots = [
  {
    id: "photo-1618005182384-a83a8bd57fbe",
    alt: "Abstract gradient study",
    caption: "A luminous gradient study in violet and blue.",
  },
  {
    id: "photo-1557682250-33bd709cbe85",
    alt: "Purple and blue wash",
    caption: "Layered colour moving from plum into indigo.",
  },
  {
    id: "photo-1554189097-ffe88e998a2b",
    alt: "Soft orange gradient",
    caption: "A warm field fading through coral and amber.",
  },
]

const galleryImages = shots.map((shot) => ({
  src: unsplash(shot.id),
  alt: shot.alt,
  caption: shot.caption,
}))

/** A thumbnail that opens its own lightbox. */
const Shot = ({
  id,
  alt,
  caption,
  variant = "default",
  className = "w-full max-w-sm",
}: {
  id: string
  alt: string
  caption?: string
  variant?: "default" | "caption"
  className?: string
}) => (
  <ImageModal>
    <ImageModalTrigger
      className={`block cursor-pointer overflow-hidden rounded-xl border border-border-primary ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={unsplash(id, 800)}
        alt={alt}
        className="aspect-[4/3] w-full object-cover transition-opacity hover:opacity-90"
      />
    </ImageModalTrigger>
    <ImageModalContent
      src={unsplash(id)}
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
      <Shot
        id={shots[0].id}
        alt={shots[0].alt}
      />
    </DocBand>

    <DocBand
      id="caption"
      title="With caption"
      description="The caption variant adds supporting context below the image."
      contentClassName="max-w-sm"
    >
      <Shot
        id={shots[1].id}
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
      <ImageModalGallery images={galleryImages}>
        <div className="grid grid-cols-3 gap-3">
          {shots.map((shot, index) => (
            <ImageModalGalleryTrigger
              key={shot.id}
              index={index}
              className="block w-full overflow-hidden rounded-xl border border-border-primary"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={unsplash(shot.id, 800)}
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
