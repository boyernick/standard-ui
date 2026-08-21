"use client"

import { Button, TextAnimate } from "@boyernick/standard-ui-react"
import { useState } from "react"
import { DocBand } from "@/components/doc-band"

const BAND = "max-w-lg"

export const TextAnimateExamples = () => {
  // Remounting is what restarts a reveal, so every specimen is keyed off one
  // counter and the Replay button bumps it.
  const [run, setRun] = useState(0)

  return (
    <div>
      <DocBand
        first
        id="typewriter"
        title="Typewriter"
        description="Characters arrive one at a time, at the given speed."
        contentClassName={BAND}
      >
        <div className="flex flex-col items-start gap-4">
          <TextAnimate
            key={`type-${run}`}
            text="Build once. Ship the standard."
            effect="typewriter"
            className="heading-md"
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setRun((value) => value + 1)}
          >
            Replay
          </Button>
        </div>
      </DocBand>

      <DocBand
        id="decode"
        title="Decode"
        description="Each slot cycles through glyphs before settling on its letter."
        contentClassName={BAND}
      >
        <TextAnimate
          key={`decode-${run}`}
          text="StandardUI"
          effect="decode"
          speed={28}
          className="heading-lg-serif"
        />
      </DocBand>

      <DocBand
        id="fade"
        title="Fade"
        description="The whole line rises into place rather than typing out."
        contentClassName={BAND}
      >
        <TextAnimate
          key={`fade-${run}`}
          text="Fade in from below"
          effect="fade"
          className="heading-md"
        />
      </DocBand>

      <DocBand
        id="blur"
        title="Blur"
        description="The same reveal, sharpening as it arrives, after a short delay."
        contentClassName={BAND}
      >
        <TextAnimate
          key={`blur-${run}`}
          text="Blur into focus"
          effect="blur"
          delay={120}
          className="heading-md"
        />
      </DocBand>
    </div>
  )
}
