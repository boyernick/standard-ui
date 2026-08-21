import type { Metadata } from "next"
import { DocPage } from "@/components/doc-page"
import { MaterialTokens } from "@/components/material-tokens"

export const metadata: Metadata = {
  title: "Materials",
}

export default function MaterialsPage() {
  return (
    <DocPage
      title="Materials"
      description="Shadows and radii that give the interface depth."
      heading={null}
      bleed
    >
      <MaterialTokens />
    </DocPage>
  )
}
