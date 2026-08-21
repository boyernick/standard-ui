import type { Metadata } from "next"
import { DocPage } from "@/components/doc-page"
import { PreviewCardExamples } from "./preview-card-examples"

export const metadata: Metadata = {
  title: "Preview card",
}

export default function PreviewCardPage() {
  return (
    <DocPage
      title="Preview card"
      description="Hover or focus card for links and mentions."
    >
      <PreviewCardExamples />
    </DocPage>
  )
}
