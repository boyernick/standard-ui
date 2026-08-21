import type { Metadata } from "next"
import { DocPage } from "@/components/doc-page"
import { KbdExamples } from "./kbd-examples"

export const metadata: Metadata = {
  title: "Kbd",
}

export default function KbdPage() {
  return (
    <DocPage
      title="Kbd"
      description="Keycaps for the shortcuts a control answers to."
      heading={null}
      bleed
    >
      <KbdExamples />
    </DocPage>
  )
}
