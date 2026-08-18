"use client"

import { Checkbox } from "@standard-ui/react"
import { ComponentCanvas } from "@/components/component-canvas"

export const CheckboxExamples = () => (
  <div className="mt-6 flex flex-col gap-8">
    <ComponentCanvas
      label="States"
      contentClassName="flex-col items-start"
      code={`<label className="flex items-center gap-2">
  <Checkbox defaultChecked />
  Subscribe to updates
</label>
<label className="flex items-center gap-2">
  <Checkbox indeterminate />
  Partially selected
</label>
<label className="flex items-center gap-2">
  <Checkbox />
  Remember this device
</label>
<label className="flex items-center gap-2">
  <Checkbox disabled />
  Unavailable
</label>`}
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
