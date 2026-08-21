import type { Metadata } from "next"
import { DocPage } from "@/components/doc-page"
import { TickerExamples } from "./ticker-examples"

export const metadata: Metadata = {
  title: "Ticker",
}

export default function TickerPage() {
  return (
    <DocPage
      title="Ticker"
      description="Continuous marquee for short status lines and announcements."
    >
      <TickerExamples />
    </DocPage>
  )
}
