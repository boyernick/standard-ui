"use client"

import { Menubar as BaseMenubar } from "@base-ui/react/menubar"
import type { ComponentProps } from "react"
import { cn } from "./lib/cn"

export type MenubarProps = ComponentProps<typeof BaseMenubar>

export const Menubar = ({ className, ...props }: MenubarProps) => (
  <BaseMenubar
    className={cn(
      "inline-flex items-center gap-0.5 rounded-lg border border-border-primary bg-background-secondary p-0.5",
      // Base UI sets data-orientation and handles the arrow keys, but the
      // layout is ours: without this a vertical menubar still renders as a
      // row, so the prop looks supported and does nothing.
      "data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-stretch",
      "data-[orientation=vertical]:[&_button]:justify-start",
      "[&_button]:inline-flex [&_button]:h-8 [&_button]:cursor-pointer [&_button]:items-center [&_button]:justify-center [&_button]:gap-1.5 [&_button]:rounded-md [&_button]:px-2.5 [&_button]:text-sm [&_button]:text-fg-secondary",
      // focusRingBorder + focusRing, scoped to child Menu triggers
      "[&_button]:border [&_button]:border-transparent",
      "[&_button]:outline-none [&_button]:focus-visible:border-ring [&_button]:focus-visible:ring-[3px] [&_button]:focus-visible:ring-offset-1 [&_button]:focus-visible:ring-offset-background-primary [&_button]:focus-visible:ring-ring/20",
      "[&_button]:hover:bg-background-tertiary [&_button]:hover:text-fg-primary",
      "[&_button]:data-popup-open:bg-background-tertiary [&_button]:data-popup-open:text-fg-primary",
      "[&_button]:data-disabled:cursor-not-allowed [&_button]:data-disabled:opacity-50",
      className,
    )}
    {...props}
  />
)
