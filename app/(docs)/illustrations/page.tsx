import type { Metadata } from "next"
import { DocPage } from "@/components/doc-page"
import { IllustrationsDemo } from "./illustrations-demo"

export const metadata: Metadata = {
  title: "Illustrations",
}

export default function IllustrationsPage() {
  return (
    <DocPage
      title="Illustrations"
      description="Abstract, monochrome shapes built from theme tokens rather than SVG paths, so they follow the palette into both themes."
      heading={null}
      bleed
    >
      <IllustrationsDemo />
    </DocPage>
  )
}
