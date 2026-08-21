"use client"

import { useState, type ReactNode } from "react"
import type { DateRange, PropsBase } from "react-day-picker"
import { Button } from "./button"
import { Calendar } from "./calendar"
import { IconCalendar1 } from "./icons"
import { cn } from "./lib/cn"
import {
  Popover,
  PopoverPopup,
  PopoverPortal,
  PopoverPositioner,
  PopoverTrigger,
} from "./popover"

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
})

const formatDate = (date: Date) => dateFormatter.format(date)

type DatePickerBaseProps = {
  /** Options forwarded to Calendar, excluding its selection mode. */
  calendarProps?: Omit<PropsBase, "mode" | "required">
  /** Classes applied to the trigger button. */
  className?: string
  /** Disables the trigger button. */
  disabled?: boolean
  /** Placeholder shown when no date is selected. */
  placeholder?: string
}

export type DatePickerSingleProps = DatePickerBaseProps & {
  mode?: "single"
  selected?: Date
  onSelect?: (date: Date | undefined) => void
}

export type DatePickerRangeProps = DatePickerBaseProps & {
  mode: "range"
  selected?: DateRange
  onSelect?: (range: DateRange | undefined) => void
}

export type DatePickerProps = DatePickerSingleProps | DatePickerRangeProps

const DatePickerTrigger = ({
  className,
  disabled,
  empty,
  label,
}: {
  className?: string
  disabled?: boolean
  empty: boolean
  label: string
}) => (
  <PopoverTrigger
    render={
      <Button
        type="button"
        // Default md height, so the trigger lines up with every other field
        // in a form rather than sitting 4px short of them.
        size="md"
        variant="outline"
        disabled={disabled}
        prefix={<IconCalendar1 aria-hidden />}
        // The outline button fills on hover, which is right for a button and
        // wrong here: this reads as a field, and fields in the system keep
        // their surface. The border and the popover carry the state.
        className={cn("w-56 justify-start hover:bg-surface", className)}
      />
    }
  >
    <span
      className={cn(
        "min-w-0 flex-1 truncate text-left",
        empty && "text-fg-tertiary",
      )}
    >
      {label}
    </span>
  </PopoverTrigger>
)

const DatePickerPopup = ({ children }: { children: ReactNode }) => (
  <PopoverPortal>
    <PopoverPositioner align="start" sideOffset={6}>
      <PopoverPopup className="w-auto gap-0 p-0">{children}</PopoverPopup>
    </PopoverPositioner>
  </PopoverPortal>
)

const SingleDatePicker = ({
  calendarProps,
  className,
  disabled,
  onSelect,
  placeholder = "Pick a date",
  selected,
}: DatePickerSingleProps) => {
  const [open, setOpen] = useState(false)

  const handleSelect = (date: Date | undefined) => {
    onSelect?.(date)
    if (date) setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <DatePickerTrigger
        className={className}
        disabled={disabled}
        empty={!selected}
        label={selected ? formatDate(selected) : placeholder}
      />
      <DatePickerPopup>
        <Calendar
          {...calendarProps}
          className={cn("border-0", calendarProps?.className)}
          mode="single"
          selected={selected}
          onSelect={handleSelect}
        />
      </DatePickerPopup>
    </Popover>
  )
}

const RangeDatePicker = ({
  calendarProps,
  className,
  disabled,
  onSelect,
  placeholder = "Pick a date range",
  selected,
}: DatePickerRangeProps) => {
  const [open, setOpen] = useState(false)
  const label = selected?.from
    ? selected.to
      ? `${formatDate(selected.from)} – ${formatDate(selected.to)}`
      : `${formatDate(selected.from)} – Select end date`
    : placeholder

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <DatePickerTrigger
        className={className}
        disabled={disabled}
        empty={!selected?.from}
        label={label}
      />
      <DatePickerPopup>
        <Calendar
          {...calendarProps}
          className={cn("border-0", calendarProps?.className)}
          mode="range"
          selected={selected}
          onSelect={onSelect}
        />
      </DatePickerPopup>
    </Popover>
  )
}

export const DatePicker = (props: DatePickerProps) =>
  props.mode === "range" ? (
    <RangeDatePicker {...props} />
  ) : (
    <SingleDatePicker {...props} />
  )
