import type { Metadata } from "next"
import { DocPage } from "@/components/doc-page"
import { CollapsibleExamples } from "./collapsible-examples"

export const metadata: Metadata = {
  title: "Collapsible",
}

export default function CollapsiblePage() {
  return (
    <DocPage
      title="Collapsible"
      description="Show and hide a related panel of content."
      heading={null}
      bleed
    >
      <CollapsibleExamples />
    </DocPage>
  )
}
