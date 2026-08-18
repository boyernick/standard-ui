"use client"

import { Accordion as BaseAccordion } from "@base-ui/react/accordion"
import type { ComponentProps } from "react"
import { IconChevronBottom } from "./icons"
import { cn } from "./lib/cn"
import { motion } from "./lib/motion"

export type AccordionProps = ComponentProps<typeof BaseAccordion.Root>
export type AccordionItemProps = ComponentProps<typeof BaseAccordion.Item>
export type AccordionHeaderProps = ComponentProps<typeof BaseAccordion.Header>
export type AccordionTriggerProps = ComponentProps<typeof BaseAccordion.Trigger>
export type AccordionPanelProps = ComponentProps<typeof BaseAccordion.Panel>

export const Accordion = ({ className, ...props }: AccordionProps) => (
  <BaseAccordion.Root
    className={cn(
      "flex w-full flex-col overflow-hidden rounded-xl border border-border-primary bg-surface",
      className,
    )}
    {...props}
  />
)

export const AccordionItem = ({ className, ...props }: AccordionItemProps) => (
  <BaseAccordion.Item
    className={cn(
      "flex flex-col border-b border-border-primary last:border-b-0",
      className,
    )}
    {...props}
  />
)

export const AccordionHeader = ({
  className,
  ...props
}: AccordionHeaderProps) => (
  <BaseAccordion.Header className={cn("m-0", className)} {...props} />
)

export const AccordionTrigger = ({
  className,
  children,
  ...props
}: AccordionTriggerProps) => (
  <BaseAccordion.Trigger
    className={cn(
      "group flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left text-sm text-fg-primary outline-none",
      motion.colors,
      "hover:bg-background-tertiary focus-visible:relative focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background-primary data-disabled:cursor-not-allowed data-disabled:opacity-50",
      className,
    )}
    {...props}
  >
    <span className="min-w-0 flex-1">{children}</span>
    <IconChevronBottom
      size={16}
      className={cn(
        "size-4 shrink-0 text-fg-tertiary",
        motion.transform,
        "group-data-panel-open:rotate-180",
      )}
      aria-hidden
    />
  </BaseAccordion.Trigger>
)

export const AccordionPanel = ({
  className,
  children,
  ...props
}: AccordionPanelProps) => (
  <BaseAccordion.Panel
    className={cn(
      "h-[var(--accordion-panel-height)] overflow-hidden text-sm text-fg-secondary",
      motion.accordionPanel,
      className,
    )}
    {...props}
  >
    <div className="px-4 pt-0 pb-4 leading-relaxed">{children}</div>
  </BaseAccordion.Panel>
)
