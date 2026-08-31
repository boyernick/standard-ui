"use client"

import {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
  NumberFieldPrefix,
  NumberFieldScrubArea,
  NumberFieldStepper,
  NumberFieldSuffix,
  type NumberFieldProps,
} from "@boyernick/standard-ui-react"
import type { ReactNode } from "react"
import { DocBand } from "@/components/doc-band"

const FIELD_WIDTH = "max-w-56"

const FieldLabel = ({ children }: { children: ReactNode }) => (
  <span className="text-sm text-fg-primary">{children}</span>
)

const SplitStepper = ({
  label,
  ...props
}: { label: string } & NumberFieldProps) => (
  <NumberField {...props} className="w-full">
    <FieldLabel>{label}</FieldLabel>
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
      description="Type a value, use the arrow keys, or step with the buttons."
      contentClassName={FIELD_WIDTH}
    >
      <SplitStepper label="Quantity" defaultValue={1} min={0} max={99} />
    </DocBand>

    <DocBand
      id="affixes"
      title="Affixes"
      description="Units stay visible without joining the value."
      contentClassName={FIELD_WIDTH}
    >
      <NumberField defaultValue={125} min={0} className="w-full">
        <FieldLabel>Hourly rate</FieldLabel>
        <NumberFieldGroup>
          <NumberFieldPrefix>$</NumberFieldPrefix>
          <NumberFieldInput aria-label="Hourly rate" align="end" />
          <NumberFieldSuffix>USD</NumberFieldSuffix>
        </NumberFieldGroup>
      </NumberField>
    </DocBand>

    <DocBand
      id="stacked"
      title="Stacked controls"
      description="A vertical stepper leaves room for the value."
      contentClassName={FIELD_WIDTH}
    >
      <NumberField defaultValue={24} min={8} max={96} step={2} className="w-full">
        <FieldLabel>Spacing</FieldLabel>
        <NumberFieldGroup>
          <NumberFieldInput aria-label="Spacing" align="end" />
          <NumberFieldSuffix>px</NumberFieldSuffix>
          <NumberFieldStepper>
            <NumberFieldIncrement />
            <NumberFieldDecrement />
          </NumberFieldStepper>
        </NumberFieldGroup>
      </NumberField>
    </DocBand>

    <DocBand
      id="sizes"
      title="Sizes"
      description="Control and type scale together."
      contentClassName={FIELD_WIDTH}
    >
      <div className="flex flex-col gap-3">
        <SplitStepper
          label="Small"
          size="sm"
          defaultValue={8}
          min={0}
          max={20}
        />
        <SplitStepper
          label="Medium"
          defaultValue={12}
          min={0}
          max={20}
        />
        <SplitStepper
          label="Large"
          size="lg"
          defaultValue={16}
          min={0}
          max={20}
        />
      </div>
    </DocBand>

    <DocBand
      id="format"
      title="Formatted value"
      description="Formatting is applied while the underlying value stays numeric."
      contentClassName={FIELD_WIDTH}
    >
      <SplitStepper
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
      contentClassName={FIELD_WIDTH}
    >
      <NumberField defaultValue={16} min={8} max={72} className="w-full">
        <NumberFieldScrubArea className="w-fit text-sm text-fg-primary">
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
      id="states"
      title="States"
      description="Read-only, invalid, and disabled stay distinct."
      contentClassName="max-w-3xl"
    >
      <div className="grid gap-4 sm:grid-cols-3">
        <SplitStepper label="Read only" defaultValue={12} readOnly />
        <NumberField defaultValue={-4} className="w-full">
          <FieldLabel>Invalid</FieldLabel>
          <NumberFieldGroup aria-invalid>
            <NumberFieldDecrement />
            <NumberFieldInput aria-label="Invalid value" aria-invalid />
            <NumberFieldIncrement />
          </NumberFieldGroup>
        </NumberField>
        <SplitStepper label="Disabled" defaultValue={5} disabled />
      </div>
    </DocBand>
  </div>
)
