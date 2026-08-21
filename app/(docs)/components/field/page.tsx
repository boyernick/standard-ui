import type { Metadata } from "next"
import { DocPage } from "@/components/doc-page"
import { FieldExamples } from "./field-examples"

export const metadata: Metadata = {
  title: "Field",
}

export default function FieldPage() {
  return (
    <DocPage
      title="Field"
      description="Label, control, and validation for one form control."
      heading={null}
      bleed
    >
      <FieldExamples />
    </DocPage>
  )
}
