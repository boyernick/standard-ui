import { VideoPlayer } from "@boyernick/standard-ui-react"
import { DocBand } from "@/components/doc-band"

/** Mixkit “Heavy rain deep in a forest” + forest rain loop (muxed for the demo). */
const SAMPLE = "/video/forest-rain.mp4"
const POSTER = "/video/forest-rain-poster.jpg"

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
        src={SAMPLE}
        poster={POSTER}
        title="Pacific Northwest rain"
      />
    </DocBand>
  </div>
)
