import type { Metadata } from "next"
import { DocPage } from "@/components/doc-page"
import { SeparatorExamples } from "./separator-examples"

export const metadata: Metadata = {
  title: "Separator",
}

export default function SeparatorPage() {
  return (
    <DocPage
      title="Separator"
      description="Visual divider for sections and inline groups."
      heading={null}
      bleed
    >
      <SeparatorExamples />
    </DocPage>
  )
}
