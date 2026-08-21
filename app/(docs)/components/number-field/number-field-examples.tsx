"use client"

import {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
  NumberFieldScrubArea,
} from "@boyernick/standard-ui-react"
import type { ComponentProps } from "react"
import { DocBand } from "@/components/doc-band"

// A stepper is two 36px buttons and a short number, so it does not want the
// measure a text input does — at max-w-xs the value floats in dead space.
const BAND = "max-w-52"

/** Label over steppers — the shape every specimen shares. */
const Stepper = ({
  label,
  ...root
}: { label: string } & ComponentProps<typeof NumberField>) => (
  <NumberField {...root} className="w-full">
    <label className="text-sm mb-1.5 block text-fg-primary">{label}</label>
    <NumberFieldGroup>
      <NumberFieldDecrement />
      <NumberFieldInput aria-label={label} />
      <NumberFieldIncrement />
    </NumberFieldGroup>
  </NumberField>
)

export const NumberFieldExamples = () => (
  <div>
    <DocBand
      first
      id="default"
      title="Default"
      description="Type a number, or step it with the buttons."
      contentClassName={BAND}
    >
      <Stepper label="Quantity" defaultValue={1} min={0} max={99} />
    </DocBand>

    <DocBand
      id="format"
      title="Formatted value"
      description="The field reads and writes through Intl.NumberFormat."
      contentClassName={BAND}
    >
      <Stepper
        label="Budget"
        defaultValue={2500}
        min={0}
        max={10000}
        step={100}
        format={{ style: "currency", currency: "USD", maximumFractionDigits: 0 }}
      />
    </DocBand>

    <DocBand
      id="scrub"
      title="Scrub area"
      description="Drag across the label to change the value without typing."
      contentClassName={BAND}
    >
      <NumberField defaultValue={16} min={8} max={72} className="w-full">
        {/* The scrub area replaces the label — dragging it is the point, so it
            has to be the thing the pointer lands on. */}
        <NumberFieldScrubArea className="text-sm mb-1.5 block w-fit text-fg-primary">
          Font size
        </NumberFieldScrubArea>
        <NumberFieldGroup>
          <NumberFieldDecrement />
          <NumberFieldInput aria-label="Font size" />
          <NumberFieldIncrement />
        </NumberFieldGroup>
      </NumberField>
    </DocBand>

    <DocBand
      id="disabled"
      title="Disabled"
      description="Neither the input nor its steppers accept a change."
      contentClassName={BAND}
    >
      <Stepper label="Seats" defaultValue={5} disabled />
    </DocBand>
  </div>
)
