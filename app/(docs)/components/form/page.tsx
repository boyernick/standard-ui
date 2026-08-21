import type { Metadata } from "next"
import { DocPage } from "@/components/doc-page"
import { FormExamples } from "./form-examples"

export const metadata: Metadata = {
  title: "Form",
}

export default function FormPage() {
  return (
    <DocPage
      title="Form"
      description="Native form with consolidated Field validation and optional server error maps."
    >
      <FormExamples />
    </DocPage>
  )
}
