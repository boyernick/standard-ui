import type { Metadata } from "next"
import { DocPage } from "@/components/doc-page"
import { DialogExamples } from "./dialog-examples"

export const metadata: Metadata = {
  title: "Dialog",
}

export default function DialogPage() {
  return (
    <DocPage
      title="Dialog"
      description="Modal surface for a focused task."
      heading={null}
      bleed
    >
      <DialogExamples />
    </DocPage>
  )
}
