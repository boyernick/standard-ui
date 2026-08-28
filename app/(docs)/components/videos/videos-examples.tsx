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
      {/* The clip is a single flat grey, so dimming it is identical to having
          encoded a darker one — and unlike swapping the `src` on the theme, it
          costs no second asset and cannot flash the light version on load while
          the provider works out which theme it is. Real footage would never
          take a filter like this. */}
      <VideoPlayer
        src={PLACEHOLDER_VIDEO_SRC}
        title="Placeholder video"
        className="dark:[&_video]:brightness-[0.13]"
      />
    </DocBand>
  </div>
)
