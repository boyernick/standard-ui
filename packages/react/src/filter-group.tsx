"use client"

import { Toggle as BaseToggle } from "@base-ui/react/toggle"
import { ToggleGroup as BaseToggleGroup } from "@base-ui/react/toggle-group"
import { cva, type VariantProps } from "class-variance-authority"
import { createContext, type ComponentProps, useContext } from "react"
import { cn } from "./lib/cn"
import { focusRing } from "./lib/focus"
import { motion } from "./lib/motion"

const filterGroupVariants = cva("flex w-fit items-center", {
  variants: {
    variant: {
      pill: "flex-wrap gap-1",
      segmented: "gap-0.5 rounded-lg bg-background-tertiary p-0.5",
    },
  },
  defaultVariants: {
    variant: "pill",
  },
})

const filterItemVariants = cva(
  cn(
    "group/filter-item inline-flex shrink-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap border border-transparent text-fg-tertiary hover:text-fg-primary data-disabled:cursor-not-allowed data-disabled:opacity-50 data-pressed:text-fg-primary",
    focusRing,
  ),
  {
    variants: {
      variant: {
        pill: "rounded-full hover:bg-background-tertiary data-pressed:bg-background-tertiary",
        segmented:
          "rounded-md hover:bg-background-quaternary data-pressed:bg-surface-raised data-pressed:shadow-hairline",
      },
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-sm",
      },
    },
    compoundVariants: [
      { variant: "pill", size: "sm", class: "h-8 px-3" },
      { variant: "pill", size: "md", class: "h-9 px-4" },
      { variant: "pill", size: "lg", class: "h-10 px-5" },
      { variant: "segmented", size: "sm", class: "h-7 px-2.5" },
      { variant: "segmented", size: "md", class: "h-8 px-3" },
      { variant: "segmented", size: "lg", class: "h-9 px-3.5" },
    ],
    defaultVariants: {
      variant: "pill",
      size: "md",
    },
  },
)

export type FilterGroupVariant = NonNullable<
  VariantProps<typeof filterGroupVariants>["variant"]
>
export type FilterGroupSize = NonNullable<
  VariantProps<typeof filterItemVariants>["size"]
>

type FilterGroupStyleContextValue = {
  variant: FilterGroupVariant
  size: FilterGroupSize
}

const FilterGroupStyleContext = createContext<FilterGroupStyleContextValue>({
  variant: "pill",
  size: "md",
})

export type FilterGroupProps = ComponentProps<typeof BaseToggleGroup> &
  VariantProps<typeof filterGroupVariants> & {
    /** Whether pressing the active item can clear a single-select group. */
    allowEmpty?: boolean
    size?: FilterGroupSize
  }
export type FilterItemProps = ComponentProps<typeof BaseToggle> &
  VariantProps<typeof filterItemVariants>
export type FilterCountProps = ComponentProps<"span">

export const FilterGroup = ({
  className,
  variant = "pill",
  size = "md",
  allowEmpty = false,
  multiple = false,
  onValueChange,
  ...props
}: FilterGroupProps) => (
  <FilterGroupStyleContext.Provider value={{ variant: variant ?? "pill", size }}>
    <BaseToggleGroup
      className={cn(filterGroupVariants({ variant }), className)}
      multiple={multiple}
      onValueChange={(value, eventDetails) => {
        if (!multiple && !allowEmpty && value.length === 0) {
          eventDetails.cancel()
          return
        }
        onValueChange?.(value, eventDetails)
      }}
      {...props}
    />
  </FilterGroupStyleContext.Provider>
)

export const FilterItem = ({
  className,
  variant,
  size,
  type = "button",
  ...props
}: FilterItemProps) => {
  const styles = useContext(FilterGroupStyleContext)

  return (
    <BaseToggle
      type={type}
      className={cn(
        filterItemVariants({
          variant: variant ?? styles.variant,
          size: size ?? styles.size,
        }),
        motion.colors,
        className,
      )}
      {...props}
    />
  )
}

export const FilterCount = ({ className, ...props }: FilterCountProps) => (
  <span
    className={cn(
      "text-2xs-strong inline-flex min-w-4 items-center justify-center rounded-full bg-background-quaternary px-1 py-0.5 text-fg-secondary tabular-nums group-data-pressed/filter-item:bg-surface",
      className,
    )}
    {...props}
  />
)

export { filterGroupVariants, filterItemVariants }
