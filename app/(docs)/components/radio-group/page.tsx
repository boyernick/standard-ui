import type { Metadata } from "next"
import { DocPage } from "@/components/doc-page"
import { RadioGroupExamples } from "./radio-group-examples"

export const metadata: Metadata = {
  title: "Radio group",
}

export default function RadioGroupPage() {
  return (
    <DocPage
      title="Radio group"
      description="Single choice from a short list of options."
      heading={null}
      bleed
    >
      <RadioGroupExamples />
    </DocPage>
  )
}
