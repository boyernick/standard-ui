"use client"

import {
  Button,
  Slider,
  SliderControl,
  SliderIndicator,
  SliderThumb,
  SliderTrack,
  Sound,
  SoundToggle,
  SoundsProvider,
  useSounds,
  type SoundId,
} from "@boyernick/standard-ui-react"
import { DocBand } from "@/components/doc-band"

const BAND = "max-w-md"

const triggers: { id: SoundId; label: string; variant: "primary" | "secondary" | "destructive" | "outline" }[] = [
  { id: "click", label: "Click", variant: "primary" },
  { id: "success", label: "Success", variant: "secondary" },
  { id: "error", label: "Error", variant: "destructive" },
  { id: "notify", label: "Notify", variant: "outline" },
]

const Catalog = () => (
  <div className="flex flex-col gap-3">
    <Sound id="click" />
    <Sound id="success" />
    <Sound id="error" />
    <Sound id="notify" />
  </div>
)

const Triggers = () => {
  const { play } = useSounds()

  return (
    <div className="flex flex-wrap gap-2">
      {triggers.map(({ id, label, variant }) => (
        <Button
          key={id}
          type="button"
          size="sm"
          variant={variant}
          onClick={() => play(id)}
        >
          {label}
        </Button>
      ))}
    </div>
  )
}

/** Volume rides the same context as playback, so the slider changes what the
 *  buttons above sound like. */
const Volume = () => {
  const { volume, setVolume, play } = useSounds()

  return (
    <div className="flex flex-col gap-2">
      <div className="text-sm flex items-center justify-between">
        <span className="text-fg-primary">Volume</span>
        <span className="tabular-nums text-fg-secondary">
          {Math.round(volume * 100)}
        </span>
      </div>
      <Slider
        value={volume * 100}
        onValueChange={(value) => {
          const next = Array.isArray(value) ? value[0] : value
          setVolume((next ?? 0) / 100)
        }}
        onValueCommitted={() => play("click")}
      >
        <SliderControl>
          <SliderTrack>
            <SliderIndicator />
            <SliderThumb aria-label="Volume" />
          </SliderTrack>
        </SliderControl>
      </Slider>
    </div>
  )
}

export const SoundsExamples = () => (
  <SoundsProvider>
    <div>
      <DocBand
        first
        id="catalog"
        title="Catalog"
        description="The four cues, each playable on its own."
        contentClassName={BAND}
      >
        <Catalog />
      </DocBand>

      <DocBand
        id="triggers"
        title="Triggered by an action"
        description="Calling play from an event ties a cue to what caused it."
        contentClassName={BAND}
      >
        <Triggers />
      </DocBand>

      <DocBand
        id="volume"
        title="Volume"
        description="One level applies to every cue the provider plays."
        contentClassName="max-w-sm"
      >
        <Volume />
      </DocBand>

      <DocBand
        id="mute"
        title="Mute"
        description="Silences playback without unmounting anything."
        contentClassName={BAND}
      >
        <SoundToggle />
      </DocBand>
    </div>
  </SoundsProvider>
)
