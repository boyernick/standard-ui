import type { Metadata } from "next"
import { DocPage } from "@/components/doc-page"
import { SliderExamples } from "./slider-examples"

export const metadata: Metadata = {
  title: "Slider",
}

export default function SliderPage() {
  return (
    <DocPage
      title="Slider"
      description="Choose a value along a continuous range."
    >
      <SliderExamples />
    </DocPage>
  )
}
