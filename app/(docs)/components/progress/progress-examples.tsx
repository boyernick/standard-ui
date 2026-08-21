"use client"

import {
  Progress,
  ProgressIndicator,
  ProgressLabel,
  ProgressTrack,
  ProgressValue,
} from "@boyernick/standard-ui-react"
import type { ComponentProps } from "react"
import { useEffect, useState } from "react"
import { DocBand } from "@/components/doc-band"

const BAND = "max-w-sm"

/** Label and readout over a track — the shape every specimen shares. */
const Bar = ({
  label,
  ...root
}: { label: string } & ComponentProps<typeof Progress>) => (
  <Progress {...root}>
    <ProgressLabel>{label}</ProgressLabel>
    <ProgressValue />
    <ProgressTrack>
      <ProgressIndicator />
    </ProgressTrack>
  </Progress>
)

export const ProgressExamples = () => {
  const [value, setValue] = useState(20)

  useEffect(() => {
    const id = window.setInterval(() => {
      setValue((prev) => (prev >= 100 ? 20 : prev + 10))
    }, 900)
    return () => window.clearInterval(id)
  }, [])

  return (
    <div>
      <DocBand
        first
        id="default"
        title="Default"
        description="How much of a known job is done."
        contentClassName={BAND}
      >
        <Bar label="Uploading" value={60} />
      </DocBand>

      <DocBand
        id="progressing"
        title="Progressing"
        description="The fill eases between values as the work advances."
        contentClassName={BAND}
      >
        <Bar label="Syncing" value={value} />
      </DocBand>

      <DocBand
        id="indeterminate"
        title="Indeterminate"
        description="A null value, for work with no measurable end."
        contentClassName={BAND}
      >
        <Bar label="Connecting" value={null} />
      </DocBand>

      <DocBand
        id="complete"
        title="Complete"
        description="At the maximum the bar fills and the status settles."
        contentClassName={BAND}
      >
        <Bar label="Uploaded" value={100} />
      </DocBand>
    </div>
  )
}
