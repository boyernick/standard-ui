"use client"

import {
  ImageModal,
  ImageModalContent,
  ImageModalTrigger,
} from "@boyernick/standard-ui-react"
import { DocBand } from "@/components/doc-band"

const unsplash = (id: string, width = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=80`

const shots = [
  { id: "photo-1618005182384-a83a8bd57fbe", alt: "Abstract gradient study" },
  { id: "photo-1557682250-33bd709cbe85", alt: "Purple and blue wash" },
  { id: "photo-1554189097-ffe88e998a2b", alt: "Soft orange gradient" },
]

/** A thumbnail that opens its own lightbox. */
const Shot = ({
  id,
  alt,
  caption,
  className = "w-full max-w-sm",
}: {
  id: string
  alt: string
  caption?: string
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
    <ImageModalContent src={unsplash(id)} alt={alt} caption={caption} />
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
        caption="Shot on a grey morning, colour graded afterwards."
      />
    </DocBand>

    <DocBand
      id="no-caption"
      title="Without a caption"
      description="Omit the caption and the modal is only the image."
      contentClassName="max-w-sm"
    >
      <Shot id={shots[1].id} alt={shots[1].alt} />
    </DocBand>

    <DocBand
      id="gallery"
      title="Gallery"
      description="Each thumbnail carries its own modal."
      contentClassName="max-w-2xl"
    >
      <div className="grid grid-cols-3 gap-3">
        {shots.map((shot) => (
          <Shot
            key={shot.id}
            id={shot.id}
            alt={shot.alt}
            caption={shot.alt}
            className="w-full"
          />
        ))}
      </div>
    </DocBand>
  </div>
)
