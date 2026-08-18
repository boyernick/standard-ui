"use client"

import { DayPicker, type ChevronProps, type DayPickerProps } from "react-day-picker"
import { IconChevronBottom } from "./icons"
import { cn } from "./lib/cn"
import { motion } from "./lib/motion"

export type CalendarProps = DayPickerProps

const navButtonClassName = cn(
  "inline-flex size-8 items-center justify-center rounded-md text-fg-tertiary",
  motion.colors,
  "hover:bg-background-tertiary hover:text-fg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background-primary disabled:cursor-not-allowed disabled:opacity-50",
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
  components,
  ...props
}: CalendarProps) => (
  <DayPicker
    showOutsideDays={showOutsideDays}
    className={cn("w-fit p-3", className)}
    classNames={{
      months: "relative flex flex-col gap-4 sm:flex-row",
      month: "flex w-full flex-col gap-3",
      month_caption: "relative flex h-8 items-center justify-center px-8",
      caption_label: "text-sm-strong text-fg-primary",
      nav: "absolute inset-x-0 top-0 flex items-center justify-between",
      button_previous: navButtonClassName,
      button_next: navButtonClassName,
      month_grid: "w-full border-collapse",
      weekdays: "flex",
      weekday:
        "flex size-8 items-center justify-center text-xs font-normal text-fg-tertiary",
      weeks: "flex flex-col",
      week: "mt-0.5 flex w-full",
      day: "relative p-0 text-center",
      day_button: cn(
        "inline-flex size-8 items-center justify-center rounded-md text-sm text-fg-primary",
        motion.colors,
        "hover:bg-background-tertiary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background-primary disabled:cursor-not-allowed disabled:opacity-50 aria-selected:opacity-100",
      ),
      selected:
        "[&>button]:bg-brand-primary [&>button]:text-brand-foreground [&>button]:ring-0 [&>button]:hover:bg-brand-primary-hover [&>button]:hover:text-brand-foreground",
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
