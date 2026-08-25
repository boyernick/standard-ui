"use client"

import { Select as BaseSelect } from "@base-ui/react/select"
import type { ComponentProps } from "react"
import { IconChevronDownSmall } from "./icons"
import { cn } from "./lib/cn"
import { focusRing, focusRingInvalid } from "./lib/focus"
import { motion } from "./lib/motion"
import { popupInset, popupItem, popupLabel, popupSurface } from "./lib/popup"

export type SelectProps = ComponentProps<typeof BaseSelect.Root>
export type SelectTriggerProps = ComponentProps<typeof BaseSelect.Trigger>
export type SelectValueProps = ComponentProps<typeof BaseSelect.Value>
export type SelectIconProps = ComponentProps<typeof BaseSelect.Icon>
export type SelectPortalProps = ComponentProps<typeof BaseSelect.Portal>
export type SelectPositionerProps = ComponentProps<typeof BaseSelect.Positioner>
export type SelectPopupProps = ComponentProps<typeof BaseSelect.Popup>
export type SelectListProps = ComponentProps<typeof BaseSelect.List>
export type SelectItemProps = ComponentProps<typeof BaseSelect.Item>
export type SelectItemTextProps = ComponentProps<typeof BaseSelect.ItemText>
export type SelectItemIndicatorProps = ComponentProps<
  typeof BaseSelect.ItemIndicator
>
export type SelectGroupProps = ComponentProps<typeof BaseSelect.Group>
export type SelectGroupLabelProps = ComponentProps<typeof BaseSelect.GroupLabel>
export type SelectSeparatorProps = ComponentProps<typeof BaseSelect.Separator>

export const Select = (props: SelectProps) => <BaseSelect.Root {...props} />

export const SelectTrigger = ({
  className,
  ...props
}: SelectTriggerProps) => (
  <BaseSelect.Trigger
    className={cn(
      "flex h-9 w-full cursor-pointer items-center justify-between gap-2 rounded-md border border-border-secondary bg-surface px-3 text-sm text-fg-primary inset-shadow-outline-top",
      motion.all,
      focusRing,
      focusRingInvalid,
      "data-disabled:cursor-not-allowed data-disabled:opacity-50 data-placeholder:text-fg-quaternary data-popup-open:border-border-secondary",
      className,
    )}
    {...props}
  />
)

export const SelectValue = ({ className, ...props }: SelectValueProps) => (
  <BaseSelect.Value
    className={cn("flex-1 truncate text-left", className)}
    {...props}
  />
)

export const SelectIcon = ({
  className,
  children,
  ...props
}: SelectIconProps) => (
  <BaseSelect.Icon
    className={cn(
      "flex shrink-0 text-fg-tertiary",
      motion.transform,
      "data-popup-open:rotate-180",
      className,
    )}
    {...props}
  >
    {children ?? <IconChevronDownSmall size={16} className="size-4" aria-hidden />}
  </BaseSelect.Icon>
)

export const SelectPortal = (props: SelectPortalProps) => (
  <BaseSelect.Portal {...props} />
)

export const SelectPositioner = ({
  alignItemWithTrigger = false,
  sideOffset = 6,
  className,
  ...props
}: SelectPositionerProps) => (
  <BaseSelect.Positioner
    alignItemWithTrigger={alignItemWithTrigger}
    sideOffset={sideOffset}
    className={cn("z-50 outline-none", className)}
    {...props}
  />
)

export const SelectPopup = ({ className, ...props }: SelectPopupProps) => (
  <BaseSelect.Popup
    className={cn(
      "z-50 max-h-[min(24rem,var(--available-height))] w-[var(--anchor-width)] overflow-hidden",
      popupSurface,
      motion.popupAnchor,
      className,
    )}
    {...props}
  />
)

export const SelectList = ({ className, ...props }: SelectListProps) => (
  <BaseSelect.List
    className={cn("max-h-[inherit] overflow-y-auto outline-none", popupInset, className)}
    {...props}
  />
)

export const SelectItem = ({ className, ...props }: SelectItemProps) => (
  <BaseSelect.Item
    className={cn(
      popupItem,
      motion.colors,
      "data-disabled:cursor-not-allowed data-disabled:opacity-50 data-highlighted:bg-background-tertiary data-selected:text-fg-primary",
      className,
    )}
    {...props}
  />
)

export const SelectItemText = ({
  className,
  ...props
}: SelectItemTextProps) => (
  <BaseSelect.ItemText
    className={cn("flex-1 truncate", className)}
    {...props}
  />
)

export const SelectItemIndicator = ({
  className,
  ...props
}: SelectItemIndicatorProps) => (
  <BaseSelect.ItemIndicator
    className={cn(
      "ml-auto flex size-4 shrink-0 items-center justify-center text-fg-primary data-unchecked:hidden",
      className,
    )}
    {...props}
  />
)

export const SelectGroup = ({ className, ...props }: SelectGroupProps) => (
  <BaseSelect.Group className={cn(className)} {...props} />
)

export const SelectGroupLabel = ({
  className,
  ...props
}: SelectGroupLabelProps) => (
  <BaseSelect.GroupLabel
    className={cn(popupLabel, className)}
    {...props}
  />
)

export const SelectSeparator = ({
  className,
  ...props
}: SelectSeparatorProps) => (
  <BaseSelect.Separator
    className={cn("my-1 h-px bg-border-primary", className)}
    {...props}
  />
)
