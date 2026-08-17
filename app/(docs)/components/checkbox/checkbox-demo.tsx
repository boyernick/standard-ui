"use client"

import { Checkbox } from "@standard-ui/react"
import { ComponentDemo, ComponentMeta } from "@/components/component-demo"

export const CheckboxDemo = () => (
  <section className="space-y-3">
    <h2 className="type-title-5 text-fg-primary">States</h2>
    <ComponentDemo className="flex-col items-start">
      <label className="type-small flex items-center gap-2 text-fg-primary">
        <Checkbox defaultChecked />
        Subscribe to updates
      </label>
      <label className="type-small flex items-center gap-2 text-fg-primary">
        <Checkbox />
        Remember this device
      </label>
      <label className="type-small flex items-center gap-2 text-fg-tertiary">
        <Checkbox disabled />
        Unavailable
      </label>
    </ComponentDemo>
    <ComponentMeta
      importLine={`import { Checkbox } from "@standard-ui/react"`}
      note="Prefer wrapping labels so the control has an accessible name."
    />
  </section>
)
