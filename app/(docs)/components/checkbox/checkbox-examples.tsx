"use client"

import { Checkbox } from "@boyernick/standard-ui-react"
import { ComponentCanvas } from "@/components/component-canvas"

export const CheckboxExamples = () => (
  <div className="mt-6 flex flex-col gap-8">
    <ComponentCanvas
      label="States"
      contentClassName="flex-col items-start"
    >
      <label className="text-sm flex items-center gap-2 text-fg-primary">
        <Checkbox defaultChecked />
        Subscribe to updates
      </label>
      <label className="text-sm flex items-center gap-2 text-fg-primary">
        <Checkbox indeterminate />
        Partially selected
      </label>
      <label className="text-sm flex items-center gap-2 text-fg-primary">
        <Checkbox />
        Remember this device
      </label>
      <label className="text-sm flex items-center gap-2 text-fg-tertiary">
        <Checkbox disabled />
        Unavailable
      </label>
    </ComponentCanvas>
  </div>
)
