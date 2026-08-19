"use client"

import { Checkbox as BaseCheckbox } from "@base-ui/react/checkbox"
import type { ComponentProps } from "react"
import { IconCheckmark1, IconMinus } from "./icons"
import { cn } from "./lib/cn"

export type CheckboxProps = ComponentProps<typeof BaseCheckbox.Root>

export const Checkbox = ({ className, ...props }: CheckboxProps) => (
  <BaseCheckbox.Root
    className={cn(
      "group flex size-4 shrink-0 items-center justify-center rounded-sm border border-border-secondary bg-surface transition-colors duration-150 ease-out motion-reduce:transition-none outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-offset-1 focus-visible:ring-offset-background-primary focus-visible:ring-ring/20 data-checked:border-brand-primary data-checked:bg-brand-primary data-indeterminate:border-brand-primary data-indeterminate:bg-brand-primary data-disabled:cursor-not-allowed data-disabled:opacity-50",
      className,
    )}
    {...props}
  >
    <BaseCheckbox.Indicator className="flex text-brand-foreground data-unchecked:hidden">
      <IconCheckmark1
        size={12}
        className="size-3 group-data-indeterminate:hidden"
        aria-hidden
      />
      <IconMinus
        size={12}
        className="hidden size-3 group-data-indeterminate:block"
        aria-hidden
      />
    </BaseCheckbox.Indicator>
  </BaseCheckbox.Root>
)
