"use client"

import { Checkbox as BaseCheckbox } from "@base-ui/react/checkbox"
import type { ComponentProps } from "react"
import { cn } from "./lib/cn"

export type CheckboxProps = ComponentProps<typeof BaseCheckbox.Root>

export const Checkbox = ({ className, ...props }: CheckboxProps) => (
  <BaseCheckbox.Root
    className={cn(
      "flex size-4 shrink-0 items-center justify-center rounded-sm border border-border-secondary bg-surface transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background-primary data-checked:border-brand-primary data-checked:bg-brand-primary data-disabled:cursor-not-allowed data-disabled:opacity-50",
      className,
    )}
    {...props}
  >
    <BaseCheckbox.Indicator className="flex text-brand-foreground data-unchecked:hidden">
      <svg viewBox="0 0 12 12" className="size-3" aria-hidden>
        <path
          d="M2.5 6.2 4.8 8.5 9.5 3.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </BaseCheckbox.Indicator>
  </BaseCheckbox.Root>
)
