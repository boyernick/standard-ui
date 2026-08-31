import type { Metadata } from "next"
import { DocPage } from "@/components/doc-page"
import { MinimapExamples } from "./minimap-examples"

export const metadata: Metadata = {
  title: "Minimap",
}

export default function MinimapPage() {
  return (
    <DocPage
      title="Minimap"
      description="A compact map of page sections."
      heading={null}
      bleed
    >
      <MinimapExamples />
    </DocPage>
  )
}
