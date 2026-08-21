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
      description="Modal surface for focused tasks — forms, details, and short flows."
    >
      <DialogExamples />
    </DocPage>
  )
}
