import type { Metadata } from "next"
import { DocPage } from "@/components/doc-page"
import { AutocompleteExamples } from "./autocomplete-examples"

export const metadata: Metadata = {
  title: "Autocomplete",
}

export default function AutocompletePage() {
  return (
    <DocPage
      title="Autocomplete"
      description="Text field with filtered suggestions for freeform input."
      heading={null}
      bleed
    >
      <AutocompleteExamples />
    </DocPage>
  )
}
