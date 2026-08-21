import type { Metadata } from "next"
import { DocPage } from "@/components/doc-page"
import { InputExamples } from "./input-examples"

export const metadata: Metadata = {
  title: "Input",
}

export default function InputPage() {
  return (
    <DocPage
      title="Input"
      description="Single-line text field for forms and filters."
      heading={null}
      bleed
    >
      <InputExamples />
    </DocPage>
  )
}
