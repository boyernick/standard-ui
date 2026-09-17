import { VideoPlayer } from "@boyernick/standard-ui-react"
import { DocBand } from "@/components/doc-band"

export const VideosExamples = () => (
  <div>
    <DocBand
      first
      id="default"
      title="Default"
      description="Play, mute, seek, picture in picture and fullscreen."
      contentClassName="max-w-2xl"
    >
      <VideoPlayer
        src="/video/forest-rain.mp4"
        poster="/video/forest-rain-poster.jpg"
        title="Forest rain"
      />
    </DocBand>
  </div>
)
