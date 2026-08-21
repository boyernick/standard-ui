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
      description="Lightbox for expanding thumbnails into a focused image view with caption and close control."
    >
      <ImageModalExamples />
    </DocPage>
  )
}
