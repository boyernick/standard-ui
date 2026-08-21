import { VideoPlayer } from "@boyernick/standard-ui-react"
import { DocBand } from "@/components/doc-band"

const SAMPLE = "https://mdn.github.io/shared-assets/videos/flower.webm"
const POSTER = "https://mdn.github.io/shared-assets/images/examples/flowers.jpg"

export const VideoPlayerExamples = () => (
  <div>
    <DocBand
      first
      id="default"
      title="Default"
      description="Play, seek, mute and fullscreen over the video surface."
      contentClassName="max-w-2xl"
    >
      <VideoPlayer src={SAMPLE} title="Flower (sample)" />
    </DocBand>

    <DocBand
      id="poster"
      title="Poster"
      description="A still holds the frame until the first play."
      contentClassName="max-w-2xl"
    >
      <VideoPlayer src={SAMPLE} poster={POSTER} title="Flower (with a poster)" />
    </DocBand>
  </div>
)
