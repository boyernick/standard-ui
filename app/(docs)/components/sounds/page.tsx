import type { Metadata } from "next"
import { DocPage } from "@/components/doc-page"
import { SoundsExamples } from "./sounds-examples"

export const metadata: Metadata = {
  title: "Sounds",
}

export default function SoundsPage() {
  return (
    <DocPage
      title="Sounds"
      description="Short interface cues generated in the browser."
      heading={null}
      bleed
    >
      <SoundsExamples />
    </DocPage>
  )
}
