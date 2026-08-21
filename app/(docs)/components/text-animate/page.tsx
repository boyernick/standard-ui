import type { Metadata } from "next"
import { DocPage } from "@/components/doc-page"
import { TextAnimateExamples } from "./text-animate-examples"

export const metadata: Metadata = {
  title: "Text animate",
}

export default function TextAnimatePage() {
  return (
    <DocPage
      title="Text animate"
      description="Reveals for headlines and empty-state copy."
      heading={null}
      bleed
    >
      <TextAnimateExamples />
    </DocPage>
  )
}
