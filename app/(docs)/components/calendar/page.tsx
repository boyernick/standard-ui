import type { Metadata } from "next"
import { DocPage } from "@/components/doc-page"
import { CalendarExamples } from "./calendar-examples"

export const metadata: Metadata = {
  title: "Calendar",
}

export default function CalendarPage() {
  return (
    <DocPage
      title="Calendar"
      description="Month grid for picking a single date."
    >
      <CalendarExamples />
    </DocPage>
  )
}
