"use client"

import { Checkbox, CheckboxGroup } from "@standard-ui/react"
import { ComponentCanvas } from "@/components/component-canvas"

const fruits = ["fuji", "gala", "granny-smith"] as const

export const CheckboxGroupExamples = () => (
  <div className="mt-6 flex flex-col gap-8">
    <ComponentCanvas
      label="Basic"
      contentClassName="flex-col items-start"
      code={`<CheckboxGroup defaultValue={["https"]} aria-labelledby="protocols-label">
  <div id="protocols-label" className="text-sm text-fg-primary">
    Protocols
  </div>
  <label className="flex items-center gap-2">
    <Checkbox value="http" />
    HTTP
  </label>
  …
</CheckboxGroup>`}
    >
      <CheckboxGroup
        defaultValue={["https"]}
        aria-labelledby="protocols-label"
        className="gap-3"
      >
        <div id="protocols-label" className="text-sm text-fg-primary">
          Protocols
        </div>
        <label className="text-sm flex items-center gap-2 text-fg-primary">
          <Checkbox value="http" />
          HTTP
        </label>
        <label className="text-sm flex items-center gap-2 text-fg-primary">
          <Checkbox value="https" />
          HTTPS
        </label>
        <label className="text-sm flex items-center gap-2 text-fg-primary">
          <Checkbox value="ssh" />
          SSH
        </label>
      </CheckboxGroup>
    </ComponentCanvas>

    <ComponentCanvas
      label="Parent"
      contentClassName="flex-col items-start"
      code={`<CheckboxGroup allValues={["fuji", "gala", "granny-smith"]} defaultValue={["fuji"]}>
  <label className="flex items-center gap-2">
    <Checkbox parent />
    Apples
  </label>
  <div className="ml-6 flex flex-col gap-2">
    <label className="flex items-center gap-2">
      <Checkbox value="fuji" />
      Fuji
    </label>
    …
  </div>
</CheckboxGroup>`}
    >
      <CheckboxGroup
        allValues={[...fruits]}
        defaultValue={["fuji"]}
        aria-labelledby="apples-label"
        className="gap-3"
      >
        <label
          id="apples-label"
          className="text-sm flex items-center gap-2 text-fg-primary"
        >
          <Checkbox parent />
          Apples
        </label>
        <div className="ml-6 flex flex-col gap-2">
          <label className="text-sm flex items-center gap-2 text-fg-primary">
            <Checkbox value="fuji" />
            Fuji
          </label>
          <label className="text-sm flex items-center gap-2 text-fg-primary">
            <Checkbox value="gala" />
            Gala
          </label>
          <label className="text-sm flex items-center gap-2 text-fg-primary">
            <Checkbox value="granny-smith" />
            Granny Smith
          </label>
        </div>
      </CheckboxGroup>
    </ComponentCanvas>
  </div>
)
