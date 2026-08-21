"use client"

import {
  Meter,
  MeterIndicator,
  MeterLabel,
  MeterTrack,
  MeterValue,
} from "@boyernick/standard-ui-react"
import { ComponentCanvas } from "@/components/component-canvas"

export const MeterExamples = () => (
  <div className="mt-6 flex flex-col gap-8">
    <ComponentCanvas
      label="Storage"
      contentClassName="w-full max-w-sm flex-col items-stretch"
    >
      <Meter value={72}>
        <MeterLabel>Storage used</MeterLabel>
        <MeterValue />
        <MeterTrack>
          <MeterIndicator />
        </MeterTrack>
      </Meter>
    </ComponentCanvas>

    <ComponentCanvas
      label="Custom format"
      contentClassName="w-full max-w-sm flex-col items-stretch"
    >
      <Meter
        value={3.2}
        min={0}
        max={5}
        format={{ style: "unit", unit: "gigabyte", maximumFractionDigits: 1 }}
      >
        <MeterLabel>Bandwidth</MeterLabel>
        <MeterValue />
        <MeterTrack>
          <MeterIndicator />
        </MeterTrack>
      </Meter>
    </ComponentCanvas>
  </div>
)
