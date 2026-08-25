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
      description="Events arranged along a continuous passage of time."
      heading={null}
      bleed
    >
      <TimelineExamples />
    </DocPage>
  )
}
