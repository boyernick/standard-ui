import type { Metadata } from "next"
import { DocPage } from "@/components/doc-page"
import { MotionExamples } from "./motion-examples"

export const metadata: Metadata = {
  title: "Motion",
}

export default function MotionPage() {
  return (
    <DocPage
      title="Motion"
      description="Shared transition classes for overlays, indicators, and color changes."
      heading={null}
      bleed
    >
      <MotionExamples />
    </DocPage>
  )
}
