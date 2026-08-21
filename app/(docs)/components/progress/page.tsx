import type { Metadata } from "next"
import { DocPage } from "@/components/doc-page"
import { ProgressExamples } from "./progress-examples"

export const metadata: Metadata = {
  title: "Progress",
}

export default function ProgressPage() {
  return (
    <DocPage
      title="Progress"
      description="Visualize completion for uploads, sync, and multi-step work."
    >
      <ProgressExamples />
    </DocPage>
  )
}
