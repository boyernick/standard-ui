import type { Metadata } from "next"
import { DocPage } from "@/components/doc-page"
import { DatePickerExamples } from "./date-picker-examples"

export const metadata: Metadata = {
  title: "Date picker",
}

export default function DatePickerPage() {
  return (
    <DocPage
      title="Date picker"
      description="Popover field for selecting a single date or date range."
      heading={null}
      bleed
    >
      <DatePickerExamples />
    </DocPage>
  )
}
