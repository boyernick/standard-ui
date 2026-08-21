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
      description="Label, control, description, and error for a single form control — wired to Base UI validation."
    >
      <FieldExamples />
    </DocPage>
  )
}
