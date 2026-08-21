import type { Metadata } from "next"
import { DocPage } from "@/components/doc-page"
import { SwitchExamples } from "./switch-examples"

export const metadata: Metadata = {
  title: "Switch",
}

export default function SwitchPage() {
  return (
    <DocPage
      title="Switch"
      description="Binary on/off control for settings and preferences."
      heading={null}
      bleed
    >
      <SwitchExamples />
    </DocPage>
  )
}
