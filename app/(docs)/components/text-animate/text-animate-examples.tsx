"use client"

import { useState } from "react"
import { Button, TextAnimate } from "@boyernick/standard-ui-react"
import { ComponentCanvas } from "@/components/component-canvas"

export const TextAnimateExamples = () => {
  const [key, setKey] = useState(0)

  const handleReplay = () => {
    setKey((value) => value + 1)
  }

  return (
    <div className="mt-6 flex flex-col gap-8">
      <ComponentCanvas
        label="Typewriter"
        contentClassName="flex-col items-start gap-4"
        code={`<TextAnimate text="Build once. Ship the standard." effect="typewriter" />`}
      >
        <TextAnimate
          key={`type-${key}`}
          text="Build once. Ship the standard."
          effect="typewriter"
          className="heading-md"
        />
        <Button type="button" variant="outline" size="sm" onClick={handleReplay}>
          Replay
        </Button>
      </ComponentCanvas>

      <ComponentCanvas
        label="Decode"
        contentClassName="flex-col items-start gap-4"
        code={`<TextAnimate text="StandardUI" effect="decode" speed={28} />`}
      >
        <TextAnimate
          key={`decode-${key}`}
          text="StandardUI"
          effect="decode"
          speed={28}
          className="heading-lg-serif"
        />
      </ComponentCanvas>

      <ComponentCanvas
        label="Fade and blur"
        contentClassName="flex-col items-start gap-6"
        code={`<TextAnimate text="Fade in" effect="fade" />
<TextAnimate text="Blur in" effect="blur" delay={120} />`}
      >
        <TextAnimate
          key={`fade-${key}`}
          text="Fade in from below"
          effect="fade"
          className="heading-md"
        />
        <TextAnimate
          key={`blur-${key}`}
          text="Blur into focus"
          effect="blur"
          delay={120}
          className="heading-md"
        />
      </ComponentCanvas>
    </div>
  )
}
