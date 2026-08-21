import type { Metadata } from "next"
import { DocPage } from "@/components/doc-page"
import { PopoverExamples } from "./popover-examples"

export const metadata: Metadata = {
  title: "Popover",
}

export default function PopoverPage() {
  return (
    <DocPage
      title="Popover"
      description="Anchored surface for light content next to a control."
    >
      <PopoverExamples />
    </DocPage>
  )
}
