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
      description="Short hint on hover or focus."
    >
      <TooltipExamples />
    </DocPage>
  )
}
