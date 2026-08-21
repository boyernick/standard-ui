import type { Metadata } from "next"
import { DocPage } from "@/components/doc-page"
import { MeterExamples } from "./meter-examples"

export const metadata: Metadata = {
  title: "Meter",
}

export default function MeterPage() {
  return (
    <DocPage
      title="Meter"
      description="Read-only gauge for a value within a range."
    >
      <MeterExamples />
    </DocPage>
  )
}
