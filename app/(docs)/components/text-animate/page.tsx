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
      description="Typewriter, decode, fade, and blur reveals for headlines and empty-state copy."
    >
      <TextAnimateExamples />
    </DocPage>
  )
}
