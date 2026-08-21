"use client"

import {
  ImageModal,
  ImageModalContent,
  ImageModalTrigger,
} from "@boyernick/standard-ui-react"
import { ComponentCanvas } from "@/components/component-canvas"

const SAMPLE =
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=80"

export const ImageModalExamples = () => (
  <div className="mt-6 flex flex-col gap-8">
    <ComponentCanvas
      label="Lightbox"
      contentClassName="w-full"
    >
      <ImageModal>
        <ImageModalTrigger className="block w-full max-w-sm overflow-hidden rounded-xl border border-border-primary">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={SAMPLE}
            alt="Abstract gradient study"
            className="aspect-[4/3] w-full object-cover transition-opacity hover:opacity-90"
          />
        </ImageModalTrigger>
        <ImageModalContent
          src={SAMPLE}
          alt="Abstract gradient study"
          caption="Open the thumbnail to view the full image."
        />
      </ImageModal>
    </ComponentCanvas>
  </div>
)
