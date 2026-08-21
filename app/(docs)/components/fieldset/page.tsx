import type { Metadata } from "next"
import { DocPage } from "@/components/doc-page"
import { FieldsetExamples } from "./fieldset-examples"

export const metadata: Metadata = {
  title: "Fieldset",
}

export default function FieldsetPage() {
  return (
    <DocPage
      title="Fieldset"
      description="Semantic grouping for related fields, under a legend."
      heading={null}
      bleed
    >
      <FieldsetExamples />
    </DocPage>
  )
}
