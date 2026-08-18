"use client"

import { Tabs as BaseTabs } from "@base-ui/react/tabs"
import type { ComponentProps } from "react"
import { cn } from "./lib/cn"
import { motion } from "./lib/motion"

export type TabsProps = ComponentProps<typeof BaseTabs.Root>
export type TabsListProps = ComponentProps<typeof BaseTabs.List>
export type TabsTabProps = ComponentProps<typeof BaseTabs.Tab>
export type TabsIndicatorProps = ComponentProps<typeof BaseTabs.Indicator>
export type TabsPanelProps = ComponentProps<typeof BaseTabs.Panel>

export const Tabs = ({ className, ...props }: TabsProps) => (
  <BaseTabs.Root className={cn("flex w-full flex-col", className)} {...props} />
)

export const TabsList = ({ className, ...props }: TabsListProps) => (
  <BaseTabs.List
    className={cn(
      "relative flex gap-0.5 border-b border-border-primary",
      className,
    )}
    {...props}
  />
)

export const TabsTab = ({ className, ...props }: TabsTabProps) => (
  <BaseTabs.Tab
    className={cn(
      "relative cursor-pointer px-3 py-2.5 text-sm text-fg-tertiary outline-none select-none",
      motion.colors,
      "hover:text-fg-primary outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-offset-1 focus-visible:ring-offset-background-primary focus-visible:ring-ring/20 data-active:text-fg-primary data-disabled:cursor-not-allowed data-disabled:opacity-50",
      className,
    )}
    {...props}
  />
)

export const TabsIndicator = ({
  className,
  ...props
}: TabsIndicatorProps) => (
  <BaseTabs.Indicator
    className={cn(
      "absolute bottom-0 left-0 z-10 h-0.5 w-(--active-tab-width) translate-x-(--active-tab-left) rounded-full bg-brand-primary",
      motion.tabsIndicator,
      className,
    )}
    {...props}
  />
)

export const TabsPanel = ({ className, ...props }: TabsPanelProps) => (
  <BaseTabs.Panel
    className={cn(
      "pt-4 text-sm leading-relaxed text-fg-secondary outline-none focus-visible:outline-none",
      className,
    )}
    {...props}
  />
)
