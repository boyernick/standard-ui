"use client"

import { Switch } from "@standard-ui/react"
import { ComponentDemo, ComponentMeta } from "@/components/component-demo"

export const SwitchDemo = () => (
  <section className="space-y-3">
    <h2 className="type-title-5 text-fg-primary">States</h2>
    <ComponentDemo>
      <label className="type-small flex items-center gap-2 text-fg-primary">
        <Switch defaultChecked />
        Enabled
      </label>
      <label className="type-small flex items-center gap-2 text-fg-primary">
        <Switch />
        Off
      </label>
      <label className="type-small flex items-center gap-2 text-fg-tertiary">
        <Switch disabled />
        Disabled
      </label>
    </ComponentDemo>
    <ComponentMeta
      importLine={`import { Switch } from "@standard-ui/react"`}
      note="Wrap with a label or use htmlFor / id for an accessible name."
    />
  </section>
)
