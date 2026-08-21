import type { Metadata } from "next"
import { DocPage } from "@/components/doc-page"
import { ToolbarExamples } from "./toolbar-examples"

export const metadata: Metadata = {
  title: "Toolbar",
}

export default function ToolbarPage() {
  return (
    <DocPage
      title="Toolbar"
      description="Grouped controls with arrow-key navigation."
    >
      <ToolbarExamples />
    </DocPage>
  )
}
