import type { Metadata } from "next"
import { DocPage } from "@/components/doc-page"
import { NumberFieldExamples } from "./number-field-examples"

export const metadata: Metadata = {
  title: "Number field",
}

export default function NumberFieldPage() {
  return (
    <DocPage
      title="Number field"
      description="Enter, format, and step through numeric values."
      heading={null}
      bleed
    >
      <NumberFieldExamples />
    </DocPage>
  )
}
