import type { Metadata } from "next"
import { DocPage } from "@/components/doc-page"
import { TextareaExamples } from "./textarea-examples"

export const metadata: Metadata = {
  title: "Textarea",
}

export default function TextareaPage() {
  return (
    <DocPage
      title="Textarea"
      description="Multi-line field for notes and longer input."
      heading={null}
      bleed
    >
      <TextareaExamples />
    </DocPage>
  )
}
