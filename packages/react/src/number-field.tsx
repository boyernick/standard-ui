"use client"

import { NumberField as BaseNumberField } from "@base-ui/react/number-field"
import { cva, type VariantProps } from "class-variance-authority"
import { createContext, useContext, type ComponentProps } from "react"
import { IconMinus, IconPlus } from "./icons"
import { cn } from "./lib/cn"
import {
  focusRingWithin,
  focusRingInvalidWithin,
} from "./lib/focus"
import { motion } from "./lib/motion"

export type NumberFieldSize = "sm" | "md" | "lg"
export type NumberFieldAlign = "start" | "center" | "end"
type NumberFieldControlLayout = "split" | "stacked"

const NumberFieldSizeContext = createContext<NumberFieldSize>("md")
const NumberFieldControlLayoutContext =
  createContext<NumberFieldControlLayout>("split")

const numberFieldGroupVariants = cva(
  cn(
    "flex w-full items-stretch overflow-hidden border border-border-secondary bg-surface inset-shadow-outline-top transition-[background-color,border-color,box-shadow]",
    focusRingWithin,
    focusRingInvalidWithin,
    "has-[[aria-invalid=true]]:border-destructive has-[[aria-invalid=true]]:focus-within:border-destructive has-[[aria-invalid=true]]:focus-within:ring-destructive/20 data-disabled:opacity-50 data-readonly:bg-background-secondary has-[:disabled]:opacity-50",
  ),
  {
    variants: {
      size: {
        sm: "h-8 rounded-md",
        md: "h-9 rounded-md",
        lg: "h-10 rounded-lg",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
)

const numberFieldInputVariants = cva(
  "h-full min-w-0 flex-1 cursor-text bg-transparent tabular-nums text-fg-primary outline-none placeholder:text-fg-quaternary focus-visible:outline-none data-disabled:cursor-not-allowed data-readonly:cursor-default",
  {
    variants: {
      size: {
        sm: "px-2 text-xs",
        md: "px-2.5 text-sm",
        lg: "px-3 text-sm",
      },
      align: {
        start: "text-left",
        center: "text-center",
        end: "text-right",
      },
    },
    defaultVariants: {
      size: "md",
      align: "center",
    },
  },
)

const numberFieldControlVariants = cva(
  cn(
    "inline-flex shrink-0 cursor-pointer items-center justify-center text-fg-tertiary outline-none",
    motion.colors,
    "hover:bg-background-tertiary hover:text-fg-primary focus-visible:bg-background-tertiary focus-visible:text-fg-primary focus-visible:outline-none data-disabled:cursor-not-allowed data-disabled:opacity-50 data-readonly:cursor-default data-readonly:opacity-50",
  ),
  {
    variants: {
      size: {
        sm: "",
        md: "",
        lg: "",
      },
      layout: {
        split: "",
        stacked: "h-1/2 w-full",
      },
    },
    compoundVariants: [
      { size: "sm", layout: "split", className: "size-8" },
      { size: "md", layout: "split", className: "size-9" },
      { size: "lg", layout: "split", className: "size-10" },
    ],
    defaultVariants: {
      size: "md",
      layout: "split",
    },
  },
)

const numberFieldStepperVariants = cva(
  "flex h-full shrink-0 flex-col border-l border-border-primary [&>button+button]:border-t [&>button+button]:border-border-primary",
  {
    variants: {
      size: {
        sm: "w-7",
        md: "w-8",
        lg: "w-9",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
)

const numberFieldAffixVariants = cva(
  "inline-flex h-full shrink-0 items-center text-fg-tertiary select-none",
  {
    variants: {
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-sm",
      },
      side: {
        prefix: "pl-2.5",
        suffix: "pr-2.5",
      },
    },
    defaultVariants: {
      size: "md",
      side: "prefix",
    },
  },
)

export type NumberFieldProps = Omit<
  ComponentProps<typeof BaseNumberField.Root>,
  "size"
> & {
  size?: NumberFieldSize
}
export type NumberFieldGroupProps = Omit<
  ComponentProps<typeof BaseNumberField.Group>,
  "size"
> &
  VariantProps<typeof numberFieldGroupVariants>
export type NumberFieldInputProps = Omit<
  ComponentProps<typeof BaseNumberField.Input>,
  "size"
> &
  VariantProps<typeof numberFieldInputVariants>
export type NumberFieldIncrementProps = Omit<
  ComponentProps<typeof BaseNumberField.Increment>,
  "size"
> &
  VariantProps<typeof numberFieldControlVariants>
export type NumberFieldDecrementProps = Omit<
  ComponentProps<typeof BaseNumberField.Decrement>,
  "size"
> &
  VariantProps<typeof numberFieldControlVariants>
export type NumberFieldStepperProps = Omit<ComponentProps<"div">, "size"> &
  VariantProps<typeof numberFieldStepperVariants>
export type NumberFieldPrefixProps = Omit<ComponentProps<"span">, "size"> &
  Omit<VariantProps<typeof numberFieldAffixVariants>, "side">
export type NumberFieldSuffixProps = NumberFieldPrefixProps
export type NumberFieldScrubAreaProps = ComponentProps<
  typeof BaseNumberField.ScrubArea
>
export type NumberFieldScrubAreaCursorProps = ComponentProps<
  typeof BaseNumberField.ScrubAreaCursor
>

export const NumberField = ({
  className,
  size = "md",
  ...props
}: NumberFieldProps) => (
  <NumberFieldSizeContext.Provider value={size}>
    <BaseNumberField.Root
      className={cn("flex flex-col gap-1.5", className)}
      {...props}
    />
  </NumberFieldSizeContext.Provider>
)

export const NumberFieldGroup = ({
  className,
  size,
  ...props
}: NumberFieldGroupProps) => {
  const inheritedSize = useContext(NumberFieldSizeContext)

  return (
    <BaseNumberField.Group
      className={cn(
        numberFieldGroupVariants({ size: size ?? inheritedSize }),
        className,
      )}
      {...props}
    />
  )
}

export const NumberFieldInput = ({
  className,
  size,
  align,
  ...props
}: NumberFieldInputProps) => {
  const inheritedSize = useContext(NumberFieldSizeContext)

  return (
    <BaseNumberField.Input
      className={cn(
        numberFieldInputVariants({ size: size ?? inheritedSize, align }),
        className,
      )}
      {...props}
    />
  )
}

const controlIconClassNames: Record<NumberFieldSize, string> = {
  sm: "size-3",
  md: "size-3.5",
  lg: "size-4",
}

export const NumberFieldDecrement = ({
  className,
  children,
  size,
  layout,
  "aria-label": ariaLabel = "Decrease",
  ...props
}: NumberFieldDecrementProps) => {
  const inheritedSize = useContext(NumberFieldSizeContext)
  const inheritedLayout = useContext(NumberFieldControlLayoutContext)
  const resolvedSize = size ?? inheritedSize
  const resolvedLayout = layout ?? inheritedLayout

  return (
    <BaseNumberField.Decrement
      aria-label={ariaLabel}
      className={cn(
        numberFieldControlVariants({
          size: resolvedSize,
          layout: resolvedLayout,
        }),
        resolvedLayout === "split" && "border-r border-border-primary",
        className,
      )}
      {...props}
    >
      {children ?? (
        <IconMinus
          size={16}
          className={controlIconClassNames[resolvedSize]}
          aria-hidden
        />
      )}
    </BaseNumberField.Decrement>
  )
}

export const NumberFieldIncrement = ({
  className,
  children,
  size,
  layout,
  "aria-label": ariaLabel = "Increase",
  ...props
}: NumberFieldIncrementProps) => {
  const inheritedSize = useContext(NumberFieldSizeContext)
  const inheritedLayout = useContext(NumberFieldControlLayoutContext)
  const resolvedSize = size ?? inheritedSize
  const resolvedLayout = layout ?? inheritedLayout

  return (
    <BaseNumberField.Increment
      aria-label={ariaLabel}
      className={cn(
        numberFieldControlVariants({
          size: resolvedSize,
          layout: resolvedLayout,
        }),
        resolvedLayout === "split" && "border-l border-border-primary",
        className,
      )}
      {...props}
    >
      {children ?? (
        <IconPlus
          size={16}
          className={controlIconClassNames[resolvedSize]}
          aria-hidden
        />
      )}
    </BaseNumberField.Increment>
  )
}

export const NumberFieldStepper = ({
  className,
  size,
  children,
  ...props
}: NumberFieldStepperProps) => {
  const inheritedSize = useContext(NumberFieldSizeContext)

  return (
    <NumberFieldControlLayoutContext.Provider value="stacked">
      <div
        className={cn(
          numberFieldStepperVariants({ size: size ?? inheritedSize }),
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </NumberFieldControlLayoutContext.Provider>
  )
}

export const NumberFieldPrefix = ({
  className,
  size,
  ...props
}: NumberFieldPrefixProps) => {
  const inheritedSize = useContext(NumberFieldSizeContext)

  return (
    <span
      className={cn(
        numberFieldAffixVariants({
          size: size ?? inheritedSize,
          side: "prefix",
        }),
        className,
      )}
      {...props}
    />
  )
}

export const NumberFieldSuffix = ({
  className,
  size,
  ...props
}: NumberFieldSuffixProps) => {
  const inheritedSize = useContext(NumberFieldSizeContext)

  return (
    <span
      className={cn(
        numberFieldAffixVariants({
          size: size ?? inheritedSize,
          side: "suffix",
        }),
        className,
      )}
      {...props}
    />
  )
}

export const NumberFieldScrubArea = ({
  className,
  ...props
}: NumberFieldScrubAreaProps) => (
  <BaseNumberField.ScrubArea
    className={cn(
      "inline-flex cursor-ew-resize items-center gap-1 text-sm text-fg-secondary select-none data-disabled:cursor-not-allowed data-disabled:opacity-50 data-readonly:cursor-default",
      className,
    )}
    {...props}
  />
)

export const NumberFieldScrubAreaCursor = ({
  className,
  ...props
}: NumberFieldScrubAreaCursorProps) => (
  <BaseNumberField.ScrubAreaCursor
    className={cn(className)}
    {...props}
  />
)

export {
  numberFieldAffixVariants,
  numberFieldControlVariants,
  numberFieldGroupVariants,
  numberFieldInputVariants,
  numberFieldStepperVariants,
}
