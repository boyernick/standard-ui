"use client"

import {
  Meter,
  MeterIndicator,
  MeterLabel,
  MeterTrack,
  MeterValue,
} from "@boyernick/standard-ui-react"
import type { ComponentProps } from "react"
import { DocBand } from "@/components/doc-band"

const BAND = "max-w-sm"

/** Label and readout over a track — the shape every specimen shares. */
const Gauge = ({
  label,
  ...root
}: { label: string } & ComponentProps<typeof Meter>) => (
  <Meter {...root}>
    <MeterLabel>{label}</MeterLabel>
    <MeterValue />
    <MeterTrack>
      <MeterIndicator />
    </MeterTrack>
  </Meter>
)

export const MeterExamples = () => (
  <div>
    <DocBand
      first
      id="default"
      title="Default"
      description="A value read against a scale of 0 to 100."
      contentClassName={BAND}
    >
      <div className="flex flex-col gap-5">
        <Gauge label="Storage used" value={24} />
        <Gauge label="Storage used" value={72} />
        <Gauge label="Storage used" value={96} />
      </div>
    </DocBand>

    <DocBand
      id="range"
      title="Custom range"
      description="min and max set the ends of the scale."
      contentClassName={BAND}
    >
      {/* The readout defaults to a percentage of the range, so without a
          format this renders "70%" and looks no different from a default
          meter at 70. A bare format surfaces the raw 7 instead, which is the
          only thing that makes the custom scale visible. */}
      <Gauge
        label="Review score"
        value={7}
        min={0}
        max={10}
        format={{ maximumFractionDigits: 0 }}
      />
    </DocBand>

    <DocBand
      id="format"
      title="Formatted value"
      description="The readout runs through Intl.NumberFormat."
      contentClassName={BAND}
    >
      <div className="flex flex-col gap-5">
        <Gauge
          label="Bandwidth"
          value={3.2}
          min={0}
          max={5}
          format={{ style: "unit", unit: "gigabyte", maximumFractionDigits: 1 }}
        />
        <Gauge
          label="Budget spent"
          value={1840}
          min={0}
          max={5000}
          format={{ style: "currency", currency: "USD", maximumFractionDigits: 0 }}
        />
      </div>
    </DocBand>
  </div>
)
