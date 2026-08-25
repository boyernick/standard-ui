"use client"

import { DayPicker, type ChevronProps, type DayPickerProps } from "react-day-picker"
import { IconChevronBottom } from "./icons"
import { cn } from "./lib/cn"
import { focusRing } from "./lib/focus"
import { motion } from "./lib/motion"

export type CalendarProps = DayPickerProps

const navButtonClassName = cn(
  "inline-flex size-6 items-center justify-center rounded-md border border-transparent text-fg-tertiary",
  motion.colors,
  focusRing,
  "hover:bg-background-tertiary hover:text-fg-primary focus-visible:bg-background-tertiary focus-visible:text-fg-primary disabled:cursor-not-allowed disabled:opacity-50",
)

const CalendarChevron = ({
  className,
  orientation,
  size = 16,
}: ChevronProps) => {
  const rotation =
    orientation === "left"
      ? "rotate-90"
      : orientation === "right"
        ? "-rotate-90"
        : orientation === "up"
          ? "rotate-180"
          : undefined

  return (
    <IconChevronBottom
      size={size}
      className={cn("text-fg-tertiary", rotation, className)}
      aria-hidden
    />
  )
}

export const Calendar = ({
  className,
  classNames,
  showOutsideDays = true,
  weekStartsOn = 1,
  components,
  ...props
}: CalendarProps) => (
  <DayPicker
    showOutsideDays={showOutsideDays}
    weekStartsOn={weekStartsOn}
    className={cn(
      "w-64 rounded-xl border border-border-primary bg-surface p-3",
      className,
    )}
    classNames={{
      months: "relative flex flex-col gap-4 sm:flex-row",
      month: "flex w-full flex-col",
      month_caption: "flex h-8 items-start justify-start",
      caption_label: "text-sm-strong text-fg-primary",
      nav: "absolute top-0 right-0 flex items-center",
      button_previous: navButtonClassName,
      button_next: navButtonClassName,
      month_grid: "w-full border-collapse",
      weekdays: "flex",
      weekday:
        "flex w-8 items-center justify-center pb-1 text-xs font-normal text-fg-tertiary select-none",
      weeks: "flex flex-col gap-1",
      week: "flex w-full",
      day: "relative p-0 text-center",
      day_button: cn(
        "inline-flex size-8 items-center justify-center rounded-lg border border-transparent text-sm text-fg-primary tabular-nums",
        motion.colors,
        focusRing,
        "hover:bg-background-tertiary focus-visible:z-10 disabled:cursor-not-allowed disabled:opacity-50 aria-selected:opacity-100",
      ),
      selected:
        "[&>button]:bg-brand-primary [&>button]:text-brand-foreground [&>button]:ring-0 [&>button]:hover:bg-brand-primary-hover [&>button]:hover:text-brand-foreground",
      range_start:
        "rounded-l-lg bg-brand-primary/10 last:rounded-r-lg [&>button]:relative [&>button]:z-[1]",
      range_middle:
        "bg-brand-primary/10 first:rounded-l-lg last:rounded-r-lg [&>button]:!rounded-none [&>button]:!bg-transparent [&>button]:!text-fg-primary [&>button]:hover:!bg-brand-primary/15",
      range_end:
        "rounded-r-lg bg-brand-primary/10 first:rounded-l-lg [&>button]:relative [&>button]:z-[1]",
      today:
        "[&>button]:font-medium [&>button]:ring-1 [&>button]:ring-inset [&>button]:ring-border-secondary",
      outside: "[&>button]:text-fg-quaternary",
      disabled: "[&>button]:opacity-40",
      hidden: "invisible",
      ...classNames,
    }}
    components={{
      Chevron: CalendarChevron,
      ...components,
    }}
    {...({ mode: "single", ...props } as DayPickerProps)}
  />
)
