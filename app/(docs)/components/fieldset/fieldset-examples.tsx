"use client"

import { Checkbox, Fieldset, FieldsetLegend } from "@boyernick/standard-ui-react"
import { ComponentCanvas } from "@/components/component-canvas"

export const FieldsetExamples = () => (
  <div className="mt-6 flex flex-col gap-8">
    <ComponentCanvas
      label="Legend"
      contentClassName="w-full max-w-sm flex-col items-stretch"
      code={`<Fieldset>
  <FieldsetLegend>Notifications</FieldsetLegend>
  <label className="flex items-center gap-2">
    <Checkbox defaultChecked />
    Product updates
  </label>
  <label className="flex items-center gap-2">
    <Checkbox />
    Marketing emails
  </label>
</Fieldset>`}
    >
      <Fieldset>
        <FieldsetLegend>Notifications</FieldsetLegend>
        <label className="text-sm flex items-center gap-2 text-fg-primary">
          <Checkbox defaultChecked />
          Product updates
        </label>
        <label className="text-sm flex items-center gap-2 text-fg-primary">
          <Checkbox />
          Marketing emails
        </label>
      </Fieldset>
    </ComponentCanvas>
  </div>
)
