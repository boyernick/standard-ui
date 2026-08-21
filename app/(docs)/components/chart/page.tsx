import type { Metadata } from "next"
import { DocPage } from "@/components/doc-page"
import { ChartExamples } from "./chart-examples"

export const metadata: Metadata = {
  title: "Chart",
}

export default function ChartPage() {
  return (
    <DocPage
      title="Chart"
      description="Responsive chart shells for area, bar, and line series."
      heading={null}
      bleed
    >
      <ChartExamples />
    </DocPage>
  )
}
