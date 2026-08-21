import type { Metadata } from "next"
import { DocPage } from "@/components/doc-page"
import { CheckboxGroupExamples } from "./checkbox-group-examples"

export const metadata: Metadata = {
  title: "Checkbox group",
}

export default function CheckboxGroupPage() {
  return (
    <DocPage
      title="Checkbox group"
      description="Shared state for a set of related checkboxes."
      heading={null}
      bleed
    >
      <CheckboxGroupExamples />
    </DocPage>
  )
}
