"use client"

import { Collapsible as BaseCollapsible } from "@base-ui/react/collapsible"
import type { ComponentProps } from "react"
import { IconChevronDownSmall } from "./icons"
import { cn } from "./lib/cn"
import { focusRing } from "./lib/focus"
import { motion } from "./lib/motion"

export type CollapsibleProps = ComponentProps<typeof BaseCollapsible.Root>
export type CollapsibleTriggerProps = ComponentProps<
  typeof BaseCollapsible.Trigger
>
export type CollapsiblePanelProps = ComponentProps<typeof BaseCollapsible.Panel>

export const Collapsible = (props: CollapsibleProps) => (
  <BaseCollapsible.Root {...props} />
)

export const CollapsibleTrigger = ({
  className,
  children,
  ...props
}: CollapsibleTriggerProps) => (
  <BaseCollapsible.Trigger
    className={cn(
      "group flex h-9 w-full cursor-pointer items-center justify-between gap-2 rounded-md border border-border-secondary bg-surface px-3 text-sm text-fg-primary inset-shadow-outline-top",
      motion.colors,
      focusRing,
      "data-disabled:cursor-not-allowed data-disabled:opacity-50",
      className,
    )}
    {...props}
  >
    <span className="min-w-0 flex-1 text-left">{children}</span>
    <IconChevronDownSmall
      size={16}
      className={cn(
        "size-4 shrink-0 text-fg-tertiary",
        motion.transform,
        "group-data-panel-open:rotate-180",
      )}
      aria-hidden
    />
  </BaseCollapsible.Trigger>
)

export const CollapsiblePanel = ({
  className,
  children,
  ...props
}: CollapsiblePanelProps) => (
  <BaseCollapsible.Panel
    className={cn(
      "h-[var(--collapsible-panel-height)] overflow-hidden text-sm text-fg-secondary",
      motion.accordionPanel,
      className,
    )}
    {...props}
  >
    {/* px-3 matches the trigger's own padding, so the panel copy lines up
        under the trigger's label instead of starting at the panel edge. */}
    <div className="px-3 pt-2 leading-relaxed">{children}</div>
  </BaseCollapsible.Panel>
)
