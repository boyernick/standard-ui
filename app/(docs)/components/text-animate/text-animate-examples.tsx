"use client"

import { Button, TextAnimate } from "@boyernick/standard-ui-react"
import type { ComponentProps } from "react"
import { useState } from "react"
import { DocBand } from "@/components/doc-band"

const BAND = "max-w-lg"

/** A pangram, so every specimen exercises the whole alphabet rather than
 *  whichever letters a slogan happened to contain. */
const PANGRAM = "The quick brown fox jumps over the lazy dog"

/** A specimen and the control that restarts it. Remounting is what replays a
 *  reveal, so the counter is the key — and it lives here rather than on the
 *  page so each band replays on its own instead of setting every effect off. */
const Specimen = (props: ComponentProps<typeof TextAnimate>) => {
  const [run, setRun] = useState(0)

  return (
    <div className="flex flex-col items-start gap-4">
      <TextAnimate key={run} {...props} />
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => setRun((value) => value + 1)}
      >
        Replay
      </Button>
    </div>
  )
}

export const TextAnimateExamples = () => (
  <div>
    <DocBand
      first
      id="typewriter"
      title="Typewriter"
      description="Characters arrive one at a time, at the given speed."
      contentClassName={BAND}
    >
      <Specimen
        text={PANGRAM}
        effect="typewriter"
        className="heading-md"
      />
    </DocBand>

    <DocBand
      id="decode"
      title="Decode"
      description="Each slot cycles through glyphs before settling on its letter."
      contentClassName={BAND}
    >
      <Specimen
        text={PANGRAM}
        effect="decode"
        className="heading-md"
      />
    </DocBand>

    <DocBand
      id="shimmer"
      title="Shimmer"
      description="A band of contrast travels continuously across the text."
      contentClassName={BAND}
    >
      <Specimen text={PANGRAM} effect="shimmer" className="heading-md" />
    </DocBand>

    <DocBand
      id="fade"
      title="Fade"
      description="The whole line rises into place rather than typing out."
      contentClassName={BAND}
    >
      <Specimen text={PANGRAM} effect="fade" className="heading-md" />
    </DocBand>

    <DocBand
      id="blur"
      title="Blur"
      description="The same reveal, sharpening as it arrives, after a short delay."
      contentClassName={BAND}
    >
      <Specimen
        text={PANGRAM}
        effect="blur"
        delay={120}
        className="heading-md"
      />
    </DocBand>
  </div>
)
