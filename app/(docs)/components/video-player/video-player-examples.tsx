"use client"

import { VideoPlayer } from "@boyernick/standard-ui-react"
import { ComponentCanvas } from "@/components/component-canvas"

const SAMPLE =
  "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm"

export const VideoPlayerExamples = () => (
  <div className="mt-6 flex flex-col gap-8">
    <ComponentCanvas
      label="Default"
      contentClassName="w-full"
      code={`<VideoPlayer
  src="/demo.webm"
  title="Product walkthrough"
  poster="/poster.jpg"
/>`}
    >
      <VideoPlayer
        className="w-full max-w-2xl"
        src={SAMPLE}
        title="Flower (sample)"
      />
    </ComponentCanvas>
  </div>
)
