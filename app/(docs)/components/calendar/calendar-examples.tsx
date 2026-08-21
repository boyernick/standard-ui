"use client"

import { useState } from "react"
import { Calendar } from "@boyernick/standard-ui-react"
import type { DateRange } from "react-day-picker"
import { DocBand } from "@/components/doc-band"

const exampleMonth = new Date(2026, 5, 1)
const exampleDate = new Date(2026, 5, 17)

export const CalendarExamples = () => {
  const [singleSelected, setSingleSelected] =
    useState<Date | undefined>(exampleDate)
  const [controlledSelected, setControlledSelected] =
    useState<Date | undefined>(undefined)
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>(
    () => ({
      from: new Date(2026, 5, 10),
      to: new Date(2026, 5, 17),
    }),
  )

  const selectedLabel = controlledSelected
    ? controlledSelected.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "None"

  const rangeLabel = selectedRange?.from
    ? `${selectedRange.from.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })} – ${
        selectedRange.to
          ? selectedRange.to.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })
          : "Select end date"
      }`
    : "None"

  return (
    <div>
      <DocBand
        first
        id="single-select"
        title="Single select"
        description="A compact month grid for choosing one date."
      >
        <Calendar
          defaultMonth={exampleMonth}
          selected={singleSelected}
          onSelect={setSingleSelected}
        />
      </DocBand>

      <DocBand
        id="controlled"
        title="Controlled"
        description="Keep the selected date in application state when other interface elements depend on it."
      >
        <div className="flex flex-col items-start gap-4">
          <p className="text-sm text-fg-secondary">
            Selected: <span className="text-fg-primary">{selectedLabel}</span>
          </p>
          <Calendar
            defaultMonth={exampleMonth}
            selected={controlledSelected}
            onSelect={setControlledSelected}
          />
        </div>
      </DocBand>

      <DocBand
        id="date-range"
        title="Date range"
        description="Select a start and end date as one continuous interval."
      >
        <div className="flex flex-col items-start gap-4">
          <p className="text-sm text-fg-secondary">
            Selected: <span className="text-fg-primary">{rangeLabel}</span>
          </p>
          <Calendar
            mode="range"
            defaultMonth={exampleMonth}
            selected={selectedRange}
            onSelect={setSelectedRange}
          />
        </div>
      </DocBand>
    </div>
  )
}
