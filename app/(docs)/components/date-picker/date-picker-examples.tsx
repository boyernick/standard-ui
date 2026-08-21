"use client"

import { useState } from "react"
import {
  DatePicker,
  type DateRange,
} from "@boyernick/standard-ui-react"
import { DocBand } from "@/components/doc-band"

const exampleMonth = new Date(2026, 5, 1)

export const DatePickerExamples = () => {
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [availableDate, setAvailableDate] = useState<Date | undefined>(undefined)
  const [range, setRange] = useState<DateRange | undefined>(() => ({
    from: new Date(2026, 5, 10),
    to: new Date(2026, 5, 17),
  }))

  return (
    <div>
      <DocBand
        first
        id="single-date"
        title="Single date"
        description="Open a calendar from a compact field and close it after choosing a date."
      >
        <DatePicker
          selected={date}
          onSelect={setDate}
          calendarProps={{ defaultMonth: exampleMonth }}
        />
      </DocBand>

      <DocBand
        id="date-range"
        title="Date range"
        description="Choose a start and end date from the same connected range calendar."
      >
        <DatePicker
          mode="range"
          selected={range}
          onSelect={setRange}
          calendarProps={{ defaultMonth: exampleMonth }}
        />
      </DocBand>

      <DocBand
        id="disabled-dates"
        title="Disabled dates"
        description="Pass calendar matchers through to prevent unavailable dates from being selected."
      >
        <DatePicker
          placeholder="Choose an available date"
          selected={availableDate}
          onSelect={setAvailableDate}
          calendarProps={{
            defaultMonth: exampleMonth,
            disabled: [
              { before: new Date(2026, 5, 10) },
              { dayOfWeek: [0, 6] },
            ],
          }}
        />
      </DocBand>
    </div>
  )
}
