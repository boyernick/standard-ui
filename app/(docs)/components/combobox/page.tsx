import type { Metadata } from "next"
import { DocPage } from "@/components/doc-page"
import { ComboboxExamples } from "./combobox-examples"

export const metadata: Metadata = {
  title: "Combobox",
}

export default function ComboboxPage() {
  return (
    <DocPage
      title="Combobox"
      description="Searchable list for picking from known options."
      heading={null}
      bleed
    >
      <ComboboxExamples />
    </DocPage>
  )
}
