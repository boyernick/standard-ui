import type { Metadata } from "next"
import { DocPage } from "@/components/doc-page"
import { MaterialMotion } from "@/components/material-motion"
import { MaterialTokens } from "@/components/material-tokens"

export const metadata: Metadata = {
  title: "Materials",
}

export default function MaterialsPage() {
  return (
    <DocPage
      title="Materials"
      description="Shape, depth, and movement for interface surfaces."
      heading={null}
      bleed
    >
      <MaterialTokens />
      <MaterialMotion />
    </DocPage>
  )
}
