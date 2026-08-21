import type { Metadata } from "next"
import { DocPage } from "@/components/doc-page"
import { VideoPlayerExamples } from "./video-player-examples"

export const metadata: Metadata = {
  title: "Video player",
}

export default function VideoPlayerPage() {
  return (
    <DocPage
      title="Video player"
      description="Video surface with play, seek, mute and fullscreen controls."
      heading={null}
      bleed
    >
      <VideoPlayerExamples />
    </DocPage>
  )
}
