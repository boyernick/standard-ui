import type { Metadata } from "next"
import { DocPage } from "@/components/doc-page"
import { SpinnerExamples } from "./spinner-examples"

export const metadata: Metadata = {
  title: "Spinner",
}

export default function SpinnerPage() {
  return (
    <DocPage
      title="Spinner"
      description="Indeterminate progress for controls and inline loading."
      heading={null}
      bleed
    >
      <SpinnerExamples />
    </DocPage>
  )
}
