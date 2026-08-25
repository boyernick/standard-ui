import type { Metadata } from "next"
import { DocPage } from "@/components/doc-page"
import { VideosExamples } from "./videos-examples"

export const metadata: Metadata = {
  title: "Videos",
}

export default function VideosPage() {
  return (
    <DocPage
      title="Videos"
      description="Video surface with play, seek, mute and fullscreen controls."
      heading={null}
      bleed
    >
      <VideosExamples />
    </DocPage>
  )
}
