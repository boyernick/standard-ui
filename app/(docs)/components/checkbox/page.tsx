import type { Metadata } from "next"
import { DocPage } from "@/components/doc-page"
import { CheckboxExamples } from "./checkbox-examples"

export const metadata: Metadata = {
  title: "Checkbox",
}

export default function CheckboxPage() {
  return (
    <DocPage
      title="Checkbox"
      description="Boolean selection for forms and filters."
    >
      <CheckboxExamples />
    </DocPage>
  )
}
