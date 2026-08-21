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
      description="Completion of a job that is under way."
      heading={null}
      bleed
    >
      <ProgressExamples />
    </DocPage>
  )
}
