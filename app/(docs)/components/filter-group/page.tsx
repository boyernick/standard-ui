import type { Metadata } from "next"
import { DocPage } from "@/components/doc-page"
import { FilterGroupExamples } from "./filter-group-examples"

export const metadata: Metadata = {
  title: "Filter group",
}

export default function FilterGroupPage() {
  return (
    <DocPage
      title="Filter group"
      description="Single or multiple choices that refine the current result set."
      heading={null}
      bleed
    >
      <FilterGroupExamples />
    </DocPage>
  )
}
