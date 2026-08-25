"use client"

import { Toolbar as BaseToolbar } from "@base-ui/react/toolbar"
import type { ComponentProps } from "react"
import { cn } from "./lib/cn"
import { focusRing, focusRingBorder } from "./lib/focus"
import { motion } from "./lib/motion"

export type ToolbarProps = ComponentProps<typeof BaseToolbar.Root>
export type ToolbarGroupProps = ComponentProps<typeof BaseToolbar.Group>
export type ToolbarButtonProps = ComponentProps<typeof BaseToolbar.Button>
export type ToolbarLinkProps = ComponentProps<typeof BaseToolbar.Link>
export type ToolbarInputProps = ComponentProps<typeof BaseToolbar.Input>
export type ToolbarSeparatorProps = ComponentProps<typeof BaseToolbar.Separator>

export const Toolbar = ({ className, ...props }: ToolbarProps) => (
  <BaseToolbar.Root
    className={cn(
      "inline-flex items-center gap-0.5 rounded-lg py-0.5 pr-1.5 pl-0.5 shadow-lg",
      className,
    )}
    {...props}
  />
)

export const ToolbarGroup = ({ className, ...props }: ToolbarGroupProps) => (
  <BaseToolbar.Group
    className={cn("flex items-center gap-0.5", className)}
    {...props}
  />
)

export const ToolbarButton = ({ className, ...props }: ToolbarButtonProps) => (
  <BaseToolbar.Button
    className={cn(
      "inline-flex h-8 cursor-pointer items-center justify-center gap-1.5 rounded-md px-2.5 text-sm text-fg-secondary",
      focusRingBorder,
      motion.colors,
      focusRing,
      "hover:bg-background-tertiary hover:text-fg-primary data-disabled:cursor-not-allowed data-disabled:opacity-50 data-pressed:bg-background-tertiary data-pressed:text-fg-primary",
      className,
    )}
    {...props}
  />
)

export const ToolbarLink = ({ className, ...props }: ToolbarLinkProps) => (
  <BaseToolbar.Link
    className={cn(
      "inline-flex h-8 cursor-pointer items-center justify-center gap-1.5 rounded-md px-2.5 text-sm text-fg-secondary",
      focusRingBorder,
      motion.colors,
      focusRing,
      "hover:bg-background-tertiary hover:text-fg-primary",
      className,
    )}
    {...props}
  />
)

export const ToolbarInput = ({ className, ...props }: ToolbarInputProps) => (
  <BaseToolbar.Input
    className={cn(
      "h-8 min-w-28 cursor-text rounded-md border border-border-secondary bg-surface px-2.5 text-sm text-fg-primary placeholder:text-fg-quaternary",
      focusRing,
      className,
    )}
    {...props}
  />
)

export const ToolbarSeparator = ({
  className,
  ...props
}: ToolbarSeparatorProps) => (
  <BaseToolbar.Separator
    className={cn("mx-0.5 h-5 w-px bg-border-primary", className)}
    {...props}
  />
)
