"use client"

import {
  Slider,
  SliderControl,
  SliderIndicator,
  SliderThumb,
  SliderTicks,
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
  ticks,
  ...root
}: { children: ReactNode; ticks?: number } & ComponentProps<typeof Slider>) => (
  <Slider {...root}>
    <SliderControl>
      <SliderTrack>
        <SliderIndicator />
        {ticks ? <SliderTicks count={ticks} /> : null}
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
      id="sizes"
      title="Sizes"
      description="Track and thumb scale together."
      contentClassName={BAND}
    >
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-[2.5rem_1fr] items-center gap-3">
          <span className="text-xs text-fg-tertiary">sm</span>
          <Rail size="sm" defaultValue={30}>
            <SliderThumb aria-label="Small slider" />
          </Rail>
        </div>
        <div className="grid grid-cols-[2.5rem_1fr] items-center gap-3">
          <span className="text-xs text-fg-tertiary">md</span>
          <Rail size="md" defaultValue={50}>
            <SliderThumb aria-label="Medium slider" />
          </Rail>
        </div>
        <div className="grid grid-cols-[2.5rem_1fr] items-center gap-3">
          <span className="text-xs text-fg-tertiary">lg</span>
          <Rail size="lg" defaultValue={70}>
            <SliderThumb aria-label="Large slider" />
          </Rail>
        </div>
      </div>
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
      id="vertical"
      title="Vertical"
      description="The track and keyboard turn onto a vertical axis."
      contentClassName={BAND}
    >
      <div className="flex items-end gap-8">
        <Rail orientation="vertical" defaultValue={25}>
          <SliderThumb aria-label="Low vertical value" />
        </Rail>
        <Rail orientation="vertical" defaultValue={60}>
          <SliderThumb aria-label="Medium vertical value" />
        </Rail>
        <Rail orientation="vertical" defaultValue={85}>
          <SliderThumb aria-label="High vertical value" />
        </Rail>
      </div>
    </DocBand>

    <DocBand
      id="steps"
      title="Steps and ticks"
      description="Ticks show the intervals the thumb snaps to."
      contentClassName={BAND}
    >
      <div className="flex flex-col gap-1">
        <Rail ticks={6} defaultValue={60} min={0} max={100} step={20}>
          <SliderThumb aria-label="Quality" />
        </Rail>
        <div className="text-xs flex justify-between px-0.5 text-fg-tertiary tabular-nums">
          <span>0</span>
          <span>20</span>
          <span>40</span>
          <span>60</span>
          <span>80</span>
          <span>100</span>
        </div>
      </div>
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
