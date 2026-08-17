"use client"

import { Switch as BaseSwitch } from "@base-ui/react/switch"
import type { ComponentProps } from "react"
import { cn } from "./lib/cn"

export type SwitchProps = ComponentProps<typeof BaseSwitch.Root>

export const Switch = ({ className, ...props }: SwitchProps) => (
  <BaseSwitch.Root
    className={cn(
      "relative inline-flex h-6 w-10 shrink-0 cursor-pointer items-center rounded-full bg-background-quaternary transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring data-checked:bg-brand-primary data-disabled:cursor-not-allowed data-disabled:opacity-50",
      className,
    )}
    {...props}
  >
    <BaseSwitch.Thumb className="pointer-events-none block size-5 translate-x-0.5 rounded-full bg-surface shadow-ring-xs transition-transform data-checked:translate-x-[1.125rem]" />
  </BaseSwitch.Root>
)
