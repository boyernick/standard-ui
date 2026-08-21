import type { Metadata } from "next"
import { DocPage } from "@/components/doc-page"
import { SelectExamples } from "./select-examples"

export const metadata: Metadata = {
  title: "Select",
}

export default function SelectPage() {
  return (
    <DocPage
      title="Select"
      description="Single-choice menu for forms and filters."
    >
      <SelectExamples />
    </DocPage>
  )
}
