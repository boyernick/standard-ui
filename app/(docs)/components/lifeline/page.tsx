import type { Metadata } from "next"
import { DocPage } from "@/components/doc-page"
import { LifelineExamples } from "./lifeline-examples"

export const metadata: Metadata = {
  title: "Lifeline",
}

export default function LifelinePage() {
  return (
    <DocPage
      title="Lifeline"
      description="A year-axis for stories, with people along the rail."
      heading={null}
      bleed
    >
      <LifelineExamples />
    </DocPage>
  )
}
