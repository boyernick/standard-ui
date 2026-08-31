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
      description="Monochrome drawings, coloured from theme tokens."
      heading={null}
      bleed
    >
      <IllustrationsDemo />
    </DocPage>
  )
}
