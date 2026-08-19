"use client"

import { Switch } from "@boyernick/standard-ui-react"
import { ComponentCanvas } from "@/components/component-canvas"

export const SwitchExamples = () => (
  <div className="mt-6 flex flex-col gap-8">
    <ComponentCanvas
      label="States"
      code={`<label className="flex items-center gap-2">
  <Switch defaultChecked />
  Enabled
</label>
<label className="flex items-center gap-2">
  <Switch />
  Off
</label>
<label className="flex items-center gap-2">
  <Switch disabled />
  Disabled
</label>`}
    >
      <label className="text-sm flex items-center gap-2 text-fg-primary">
        <Switch defaultChecked />
        Enabled
      </label>
      <label className="text-sm flex items-center gap-2 text-fg-primary">
        <Switch />
        Off
      </label>
      <label className="text-sm flex items-center gap-2 text-fg-tertiary">
        <Switch disabled />
        Disabled
      </label>
    </ComponentCanvas>
  </div>
)
