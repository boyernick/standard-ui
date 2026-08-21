"use client"

import {
  Slider,
  SliderControl,
  SliderIndicator,
  SliderThumb,
  SliderTrack,
} from "@boyernick/standard-ui-react"
import type { ComponentProps, ReactNode } from "react"
import { useState } from "react"
import { DocBand } from "@/components/doc-band"

const BAND = "max-w-sm"

/** Control, track and indicator — the shape every specimen shares. Thumbs
 *  are passed in because a range needs one per value. */
const Rail = ({
  children,
  ...root
}: { children: ReactNode } & ComponentProps<typeof Slider>) => (
  <Slider {...root}>
    <SliderControl>
      <SliderTrack>
        <SliderIndicator />
        {children}
      </SliderTrack>
    </SliderControl>
  </Slider>
)

const WithValue = () => {
  const [volume, setVolume] = useState(40)

  return (
    <div className="flex flex-col gap-2">
      <div className="text-sm flex items-center justify-between">
        <span className="text-fg-primary">Volume</span>
        <span className="tabular-nums text-fg-secondary">{volume}</span>
      </div>
      <Rail
        value={volume}
        onValueChange={(value) => {
          const next = Array.isArray(value) ? value[0] : value
          setVolume(next ?? 0)
        }}
      >
        <SliderThumb aria-label="Volume" />
      </Rail>
    </div>
  )
}

export const SliderExamples = () => (
  <div>
    <DocBand
      first
      id="default"
      title="Default"
      description="One thumb travelling a continuous range."
      contentClassName={BAND}
    >
      <Rail defaultValue={40}>
        <SliderThumb aria-label="Volume" />
      </Rail>
    </DocBand>

    <DocBand
      id="value"
      title="With value"
      description="A label and live readout above the rail."
      contentClassName={BAND}
    >
      <WithValue />
    </DocBand>

    <DocBand
      id="range"
      title="Range"
      description="An array of values gives a thumb to each end of a span."
      contentClassName={BAND}
    >
      {/* Each thumb declares its `index` so the pair survives a server render. */}
      <Rail defaultValue={[25, 75]}>
        <SliderThumb index={0} aria-label="Minimum" />
        <SliderThumb index={1} aria-label="Maximum" />
      </Rail>
    </DocBand>

    <DocBand
      id="steps"
      title="Steps"
      description="A step size snaps the thumb to fixed intervals."
      contentClassName={BAND}
    >
      <Rail defaultValue={60} min={0} max={100} step={20}>
        <SliderThumb aria-label="Quality" />
      </Rail>
    </DocBand>

    <DocBand
      id="disabled"
      title="Disabled"
      description="The value stays legible but the thumb will not move."
      contentClassName={BAND}
    >
      <Rail defaultValue={25} disabled>
        <SliderThumb aria-label="Volume" />
      </Rail>
    </DocBand>
  </div>
)
