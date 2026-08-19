"use client"

import { Toggle, ToggleGroup } from "@boyernick/standard-ui-react"
import { ComponentCanvas } from "@/components/component-canvas"

export const ToggleExamples = () => (
  <div className="mt-6 flex flex-col gap-8">
    <ComponentCanvas
      label="Single"
      code={`<Toggle aria-label="Notifications" defaultPressed>
  Notifications
</Toggle>`}
    >
      <Toggle aria-label="Notifications" defaultPressed>
        Notifications
      </Toggle>
    </ComponentCanvas>

    <ComponentCanvas
      label="Group"
      code={`<ToggleGroup
  aria-label="Text alignment"
  defaultValue={["center"]}
>
  <Toggle value="left" aria-label="Align left">
    Left
  </Toggle>
  <Toggle value="center" aria-label="Align center">
    Center
  </Toggle>
  <Toggle value="right" aria-label="Align right">
    Right
  </Toggle>
</ToggleGroup>`}
    >
      <ToggleGroup aria-label="Text alignment" defaultValue={["center"]}>
        <Toggle value="left" aria-label="Align left">
          Left
        </Toggle>
        <Toggle value="center" aria-label="Align center">
          Center
        </Toggle>
        <Toggle value="right" aria-label="Align right">
          Right
        </Toggle>
      </ToggleGroup>
    </ComponentCanvas>

    <ComponentCanvas
      label="Multiple"
      code={`<ToggleGroup
  multiple
  aria-label="Text style"
  defaultValue={["bold"]}
>
  <Toggle value="bold" aria-label="Bold">
    Bold
  </Toggle>
  <Toggle value="italic" aria-label="Italic">
    Italic
  </Toggle>
  <Toggle value="underline" aria-label="Underline">
    Underline
  </Toggle>
</ToggleGroup>`}
    >
      <ToggleGroup
        multiple
        aria-label="Text style"
        defaultValue={["bold"]}
      >
        <Toggle value="bold" aria-label="Bold">
          Bold
        </Toggle>
        <Toggle value="italic" aria-label="Italic">
          Italic
        </Toggle>
        <Toggle value="underline" aria-label="Underline">
          Underline
        </Toggle>
      </ToggleGroup>
    </ComponentCanvas>
  </div>
)
