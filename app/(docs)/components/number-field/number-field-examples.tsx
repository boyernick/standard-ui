"use client"

import {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
  NumberFieldScrubArea,
} from "@standard-ui/react"
import { ComponentCanvas } from "@/components/component-canvas"

export const NumberFieldExamples = () => (
  <div className="mt-6 flex flex-col gap-8">
    <ComponentCanvas
      label="Quantity"
      contentClassName="w-full max-w-xs"
      code={`<div className="flex w-full flex-col gap-1.5">
  <label htmlFor="quantity" className="text-sm text-fg-primary">
    Quantity
  </label>
  <NumberField defaultValue={1} min={0} max={99} id="quantity">
    <NumberFieldGroup>
      <NumberFieldDecrement />
      <NumberFieldInput />
      <NumberFieldIncrement />
    </NumberFieldGroup>
  </NumberField>
</div>`}
    >
      <div className="flex w-full max-w-xs flex-col gap-1.5">
        <label htmlFor="quantity" className="text-sm text-fg-primary">
          Quantity
        </label>
        <NumberField defaultValue={1} min={0} max={99} id="quantity">
          <NumberFieldGroup>
            <NumberFieldDecrement />
            <NumberFieldInput />
            <NumberFieldIncrement />
          </NumberFieldGroup>
        </NumberField>
      </div>
    </ComponentCanvas>

    <ComponentCanvas
      label="With scrub"
      contentClassName="w-full max-w-xs"
      code={`<NumberField defaultValue={16} min={8} max={72}>
  <NumberFieldScrubArea className="w-fit">
    Font size
  </NumberFieldScrubArea>
  <NumberFieldGroup>
    <NumberFieldDecrement />
    <NumberFieldInput aria-label="Font size" />
    <NumberFieldIncrement />
  </NumberFieldGroup>
</NumberField>`}
    >
      <NumberField
        defaultValue={16}
        min={8}
        max={72}
        className="w-full max-w-xs"
      >
        <NumberFieldScrubArea className="w-fit">Font size</NumberFieldScrubArea>
        <NumberFieldGroup>
          <NumberFieldDecrement />
          <NumberFieldInput aria-label="Font size" />
          <NumberFieldIncrement />
        </NumberFieldGroup>
      </NumberField>
    </ComponentCanvas>
  </div>
)
