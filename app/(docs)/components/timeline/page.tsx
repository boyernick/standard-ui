import type { Metadata } from "next"
import { DocPage } from "@/components/doc-page"
import { TimelineExamples } from "./timeline-examples"

export const metadata: Metadata = {
  title: "Timeline",
}

export default function TimelinePage() {
  return (
    <DocPage
      title="Timeline"
      description="A composable rail of events, horizontal or vertical."
      heading={null}
      bleed
    >
      <TimelineExamples />
    </DocPage>
  )
}
