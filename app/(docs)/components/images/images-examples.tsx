"use client"

import {
  Gallery,
  GalleryTrigger,
  Modal,
  ModalContent,
  ModalTrigger,
} from "@boyernick/standard-ui-react"
import { DocBand } from "@/components/doc-band"
import {
  CAPTION_SCRIM,
  placeholderSrc,
  PLACEHOLDER_ALT,
  PLACEHOLDER_SRC,
  PLACEHOLDER_SURFACE,
} from "@/lib/media-placeholder"

/** Mixed shapes — landscape, portrait, square — as real photos would be. */
const sizes = [
  [1600, 1000],
  [1000, 1500],
  [1400, 1400],
  [1920, 1080],
  [1200, 1600],
  [1500, 1000],
  [1080, 1350],
  [1600, 900],
  [1400, 1050],
  [1000, 1000],
  [1800, 1000],
  [1200, 1500],
]

const shots = sizes.map(([width, height], index) => ({
  src: placeholderSrc(width, height),
  alt: PLACEHOLDER_ALT,
  caption: `Image ${index + 1}`,
}))

/** A media card that opens its own lightbox. */
const Shot = ({
  label,
  caption,
  variant = "default",
}: {
  label?: string
  caption?: string
  variant?: "default" | "caption"
}) => (
  <Modal>
    <ModalTrigger
      aria-label={label ? `Open ${label}` : `Open image: ${PLACEHOLDER_ALT}`}
      className="block w-full cursor-pointer rounded-2xl bg-background-secondary transition-opacity hover:opacity-95"
    >
      <figure
        className={`relative aspect-[16/10] overflow-hidden rounded-2xl ${PLACEHOLDER_SURFACE} shadow-lg`}
      >
        {label ? (
          <figcaption className={`pointer-events-none absolute inset-x-0 bottom-0 ${CAPTION_SCRIM} px-4 pt-16 pb-3 text-left text-sm text-white`}>
            {label}
          </figcaption>
        ) : null}
      </figure>
    </ModalTrigger>
    <ModalContent
      src={PLACEHOLDER_SRC}
      alt={PLACEHOLDER_ALT}
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
      <Shot />
    </DocBand>

    <DocBand
      id="caption"
      title="With caption"
      description="Label on the card, supporting caption in the lightbox."
      contentClassName="w-full max-w-xl"
    >
      <Shot
        label="Label"
        caption="A supporting caption sits beneath the image."
        variant="caption"
      />
    </DocBand>

    <DocBand
      id="gallery"
      title="Gallery"
      description="Open any image, then use the controls, arrow keys, touch, or a horizontal trackpad gesture."
      contentClassName="w-full max-w-none"
    >
      <Gallery images={shots} variant="caption">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
          {shots.map((shot, index) => (
            <GalleryTrigger
              key={shot.caption}
              index={index}
              // `border-secondary`, not `primary`: at `alpha-05` the primary
              // border resolves lighter than the tile it surrounds and does
              // not read as an edge at all.
              className="block w-full overflow-hidden rounded-lg border border-border-secondary"
            >
              <span
                className={`block aspect-[4/3] w-full ${PLACEHOLDER_SURFACE} transition-opacity hover:opacity-90`}
              />
            </GalleryTrigger>
          ))}
        </div>
      </Gallery>
    </DocBand>
  </div>
)
