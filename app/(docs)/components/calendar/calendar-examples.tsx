"use client"

import { useState } from "react"
import { Calendar } from "@standard-ui/react"
import { ComponentCanvas } from "@/components/component-canvas"

export const CalendarExamples = () => {
  const [selected, setSelected] = useState<Date | undefined>(undefined)

  const selectedLabel = selected
    ? selected.toLocaleDateString(undefined, {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "None"

  return (
    <div className="mt-6 flex flex-col gap-8">
      <ComponentCanvas
        label="Single select"
        contentClassName="flex-col"
        minHeightClass="min-h-72"
        code={`<Calendar />`}
      >
        <Calendar />
      </ComponentCanvas>

      <ComponentCanvas
        label="Controlled"
        contentClassName="flex-col gap-4"
        minHeightClass="min-h-80"
        code={`const [selected, setSelected] = useState<Date>()

<>
  <p className="text-sm text-fg-secondary">
    Selected: {selected?.toLocaleDateString() ?? "None"}
  </p>
  <Calendar
    mode="single"
    selected={selected}
    onSelect={setSelected}
  />
</>`}
      >
        <p className="text-sm text-fg-secondary">Selected: {selectedLabel}</p>
        <Calendar
          mode="single"
          selected={selected}
          onSelect={setSelected}
        />
      </ComponentCanvas>
    </div>
  )
}
