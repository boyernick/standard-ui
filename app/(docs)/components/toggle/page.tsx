import type { Metadata } from "next"
import { DocPage } from "@/components/doc-page"
import { ToggleExamples } from "./toggle-examples"

export const metadata: Metadata = {
  title: "Toggle",
}

export default function TogglePage() {
  return (
    <DocPage
      title="Toggle"
      description="Pressed or unpressed control for formatting and view options."
      heading={null}
      bleed
    >
      <ToggleExamples />
    </DocPage>
  )
}
