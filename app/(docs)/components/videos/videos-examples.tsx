import { VideoPlayer } from "@boyernick/standard-ui-react"
import { DocBand } from "@/components/doc-band"
import { PLACEHOLDER_VIDEO_SRC } from "@/lib/media-placeholder"

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
        src={PLACEHOLDER_VIDEO_SRC}
        title="Placeholder video"
      />
    </DocBand>
  </div>
)
