import type { Metadata } from "next"
import { DocPage } from "@/components/doc-page"
import { CarouselExamples } from "./carousel-examples"

export const metadata: Metadata = {
  title: "Carousel",
}

export default function CarouselPage() {
  return (
    <DocPage
      title="Carousel"
      description="A free-scrolling strip; click a card to open it."
      heading={null}
      bleed
    >
      <CarouselExamples />
    </DocPage>
  )
}
