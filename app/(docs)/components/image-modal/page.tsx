import type { Metadata } from "next"
import { DocPage } from "@/components/doc-page"
import { ImageModalExamples } from "./image-modal-examples"

export const metadata: Metadata = {
  title: "Image modal",
}

export default function ImageModalPage() {
  return (
    <DocPage
      title="Image modal"
      description="Immersive lightbox for single images and swipeable galleries."
      heading={null}
      bleed
    >
      <ImageModalExamples />
    </DocPage>
  )
}
