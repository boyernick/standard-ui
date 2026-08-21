import type { Metadata } from "next"
import { DocPage } from "@/components/doc-page"
import { ScrollAreaExamples } from "./scroll-area-examples"

export const metadata: Metadata = {
  title: "Scroll area",
}

export default function ScrollAreaPage() {
  return (
    <DocPage
      title="Scroll area"
      description="Custom scrollable region with a styled scrollbar."
      heading={null}
      bleed
    >
      <ScrollAreaExamples />
    </DocPage>
  )
}
