import type { Metadata } from "next"
import { DocPage } from "@/components/doc-page"
import { ImagesExamples } from "./images-examples"

export const metadata: Metadata = {
  title: "Images",
}

export default function ImagesPage() {
  return (
    <DocPage
      title="Images"
      description="Immersive lightbox for single images and swipeable galleries."
      heading={null}
      bleed
    >
      <ImagesExamples />
    </DocPage>
  )
}
