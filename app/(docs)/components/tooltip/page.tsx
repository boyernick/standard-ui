import type { Metadata } from "next"
import { DocPage } from "@/components/doc-page"
import { TooltipExamples } from "./tooltip-examples"

export const metadata: Metadata = {
  title: "Tooltip",
}

export default function TooltipPage() {
  return (
    <DocPage
      title="Tooltip"
      description="Short hint shown on hover or focus."
      heading={null}
      bleed
    >
      <TooltipExamples />
    </DocPage>
  )
}
