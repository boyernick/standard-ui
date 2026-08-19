"use client"

import {
  Slider,
  SliderControl,
  SliderIndicator,
  SliderThumb,
  SliderTrack,
} from "@boyernick/standard-ui-react"
import { useState } from "react"
import { ComponentCanvas } from "@/components/component-canvas"

export const SliderExamples = () => {
  const [volume, setVolume] = useState(40)

  return (
    <div className="mt-6 flex flex-col gap-8">
      <ComponentCanvas
        label="Basic"
        contentClassName="w-full max-w-sm flex-col items-stretch"
        code={`<Slider defaultValue={40}>
  <SliderControl>
    <SliderTrack>
      <SliderIndicator />
      <SliderThumb aria-label="Volume" />
    </SliderTrack>
  </SliderControl>
</Slider>`}
      >
        <Slider defaultValue={40}>
          <SliderControl>
            <SliderTrack>
              <SliderIndicator />
              <SliderThumb aria-label="Volume" />
            </SliderTrack>
          </SliderControl>
        </Slider>
      </ComponentCanvas>

      <ComponentCanvas
        label="With value"
        contentClassName="w-full max-w-sm flex-col items-stretch"
        code={`const [volume, setVolume] = useState(40)

<div className="flex items-center justify-between text-sm">
  <span className="text-fg-primary">Volume</span>
  <span className="tabular-nums text-fg-secondary">{volume}</span>
</div>
<Slider value={volume} onValueChange={(value) => setVolume(value as number)}>
  <SliderControl>
    <SliderTrack>
      <SliderIndicator />
      <SliderThumb aria-label="Volume" />
    </SliderTrack>
  </SliderControl>
</Slider>`}
      >
        <div className="flex w-full flex-col gap-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-fg-primary">Volume</span>
            <span className="tabular-nums text-fg-secondary">{volume}</span>
          </div>
          <Slider
            value={volume}
            onValueChange={(value) => {
              const next = Array.isArray(value) ? value[0] : value
              setVolume(next ?? 0)
            }}
          >
            <SliderControl>
              <SliderTrack>
                <SliderIndicator />
                <SliderThumb aria-label="Volume" />
              </SliderTrack>
            </SliderControl>
          </Slider>
        </div>
      </ComponentCanvas>

      <ComponentCanvas
        label="Disabled"
        contentClassName="w-full max-w-sm flex-col items-stretch"
        code={`<Slider defaultValue={25} disabled>
  <SliderControl>
    <SliderTrack>
      <SliderIndicator />
      <SliderThumb aria-label="Disabled volume" />
    </SliderTrack>
  </SliderControl>
</Slider>`}
      >
        <Slider defaultValue={25} disabled>
          <SliderControl>
            <SliderTrack>
              <SliderIndicator />
              <SliderThumb aria-label="Disabled volume" />
            </SliderTrack>
          </SliderControl>
        </Slider>
      </ComponentCanvas>
    </div>
  )
}
