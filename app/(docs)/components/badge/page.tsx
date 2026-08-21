import type { Metadata } from "next"
import { Badge } from "@boyernick/standard-ui-react"
import { ComponentCanvas } from "@/components/component-canvas"
import { DocPage } from "@/components/doc-page"

export const metadata: Metadata = {
  title: "Badge",
}

export default function BadgePage() {
  return (
    <DocPage
      title="Badge"
      description="Compact labels for status, category, and metadata."
    >
      <ComponentCanvas label="Variants">
        <Badge>Default</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="destructive">Destructive</Badge>
      </ComponentCanvas>
    </DocPage>
  )
}
