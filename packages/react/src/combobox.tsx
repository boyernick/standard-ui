"use client"

import { Combobox as BaseCombobox } from "@base-ui/react/combobox"
import type { ComponentProps, ReactElement } from "react"
import { IconChevronDownSmall, IconCrossSmall } from "./icons"
import { cn } from "./lib/cn"
import { motion } from "./lib/motion"

export type ComboboxProps<
  Value,
  Multiple extends boolean | undefined = false,
> = ComponentProps<typeof BaseCombobox.Root<Value, Multiple>>
export type ComboboxLabelProps = ComponentProps<typeof BaseCombobox.Label>
export type ComboboxInputProps = ComponentProps<typeof BaseCombobox.Input>
export type ComboboxInputGroupProps = ComponentProps<
  typeof BaseCombobox.InputGroup
>
export type ComboboxTriggerProps = ComponentProps<typeof BaseCombobox.Trigger>
export type ComboboxIconProps = ComponentProps<typeof BaseCombobox.Icon>
export type ComboboxClearProps = ComponentProps<typeof BaseCombobox.Clear>
export type ComboboxValueProps = ComponentProps<typeof BaseCombobox.Value>
export type ComboboxPortalProps = ComponentProps<typeof BaseCombobox.Portal>
export type ComboboxBackdropProps = ComponentProps<typeof BaseCombobox.Backdrop>
export type ComboboxPositionerProps = ComponentProps<
  typeof BaseCombobox.Positioner
>
export type ComboboxPopupProps = ComponentProps<typeof BaseCombobox.Popup>
export type ComboboxArrowProps = ComponentProps<typeof BaseCombobox.Arrow>
export type ComboboxListProps = ComponentProps<typeof BaseCombobox.List>
export type ComboboxItemProps = ComponentProps<typeof BaseCombobox.Item>
export type ComboboxItemIndicatorProps = ComponentProps<
  typeof BaseCombobox.ItemIndicator
>
export type ComboboxEmptyProps = ComponentProps<typeof BaseCombobox.Empty>
export type ComboboxStatusProps = ComponentProps<typeof BaseCombobox.Status>
export type ComboboxGroupProps = ComponentProps<typeof BaseCombobox.Group>
export type ComboboxGroupLabelProps = ComponentProps<
  typeof BaseCombobox.GroupLabel
>
export type ComboboxSeparatorProps = ComponentProps<
  typeof BaseCombobox.Separator
>
export type ComboboxCollectionProps = ComponentProps<
  typeof BaseCombobox.Collection
>
export type ComboboxChipsProps = ComponentProps<typeof BaseCombobox.Chips>
export type ComboboxChipProps = ComponentProps<typeof BaseCombobox.Chip>
export type ComboboxChipRemoveProps = ComponentProps<
  typeof BaseCombobox.ChipRemove
>
export type ComboboxRowProps = ComponentProps<typeof BaseCombobox.Row>

export const Combobox = <
  Value,
  Multiple extends boolean | undefined = false,
>(
  props: ComboboxProps<Value, Multiple>,
): ReactElement => <BaseCombobox.Root {...props} />

export const ComboboxLabel = ({ className, ...props }: ComboboxLabelProps) => (
  <BaseCombobox.Label
    className={cn("mb-1.5 block text-sm text-fg-primary", className)}
    {...props}
  />
)

const inputGroupAccessoryClassName = cn(
  "inline-flex size-9 shrink-0 cursor-pointer items-center justify-center text-fg-tertiary outline-none",
  motion.colors,
  "hover:text-fg-primary focus-visible:bg-background-tertiary focus-visible:text-fg-primary focus-visible:outline-none data-disabled:cursor-not-allowed",
)

export const ComboboxInputGroup = ({
  className,
  ...props
}: ComboboxInputGroupProps) => (
  <BaseCombobox.InputGroup
    className={cn(
      "relative flex min-h-9 w-full items-center rounded-md border border-border-secondary bg-surface inset-shadow-outline-top outline-none transition-[color,box-shadow]",
      "has-[[data-popup-open]]:bg-background-tertiary/60",
      "focus-within:border-ring focus-within:ring-[3px] focus-within:ring-offset-1 focus-within:ring-offset-background-primary focus-within:ring-ring/20",
      "aria-invalid:border-destructive aria-invalid:focus-within:border-destructive aria-invalid:focus-within:ring-destructive/20",
      "has-[[aria-invalid=true]]:border-destructive has-[[aria-invalid=true]]:focus-within:border-destructive has-[[aria-invalid=true]]:focus-within:ring-destructive/20",
      "has-[:disabled]:opacity-50",
      className,
    )}
    {...props}
  />
)

export const ComboboxInput = ({ className, ...props }: ComboboxInputProps) => (
  <BaseCombobox.Input
    className={cn(
      "h-9 min-w-0 flex-1 cursor-text rounded-md bg-transparent px-3 text-sm text-fg-primary outline-none placeholder:text-fg-quaternary focus-visible:ring-0",
      className,
    )}
    {...props}
  />
)

export const ComboboxTrigger = ({
  className,
  children,
  ...props
}: ComboboxTriggerProps) => (
  <BaseCombobox.Trigger
    className={cn(inputGroupAccessoryClassName, className)}
    {...props}
  >
    {children ?? <ComboboxIcon />}
  </BaseCombobox.Trigger>
)

export const ComboboxIcon = ({
  className,
  children,
  ...props
}: ComboboxIconProps) => (
  <BaseCombobox.Icon
    className={cn(
      "flex shrink-0 text-fg-tertiary",
      motion.transform,
      "data-popup-open:rotate-180",
      className,
    )}
    {...props}
  >
    {children ?? <IconChevronDownSmall size={16} className="size-4" aria-hidden />}
  </BaseCombobox.Icon>
)

export const ComboboxClear = ({
  className,
  children,
  ...props
}: ComboboxClearProps) => (
  <BaseCombobox.Clear
    className={cn(inputGroupAccessoryClassName, className)}
    {...props}
  >
    {children ?? (
      <IconCrossSmall size={14} className="size-3.5" aria-hidden />
    )}
  </BaseCombobox.Clear>
)

export const ComboboxValue = (props: ComboboxValueProps) => (
  <BaseCombobox.Value {...props} />
)

export const ComboboxPortal = (props: ComboboxPortalProps) => (
  <BaseCombobox.Portal {...props} />
)

export const ComboboxBackdrop = ({
  className,
  ...props
}: ComboboxBackdropProps) => (
  <BaseCombobox.Backdrop className={cn(className)} {...props} />
)

export const ComboboxPositioner = ({
  sideOffset = 4,
  className,
  ...props
}: ComboboxPositionerProps) => (
  <BaseCombobox.Positioner
    sideOffset={sideOffset}
    className={cn("z-50 outline-none", className)}
    {...props}
  />
)

export const ComboboxPopup = ({ className, ...props }: ComboboxPopupProps) => (
  <BaseCombobox.Popup
    className={cn(
      "z-50 max-h-[min(24rem,var(--available-height))] w-[var(--anchor-width)] overflow-hidden rounded-md border border-border-primary bg-surface shadow-md outline-none",
      motion.popupAnchor,
      className,
    )}
    {...props}
  />
)

export const ComboboxArrow = ({ className, ...props }: ComboboxArrowProps) => (
  <BaseCombobox.Arrow
    className={cn(
      "data-[side=bottom]:top-[-6px] data-[side=left]:right-[-6px] data-[side=right]:left-[-6px] data-[side=top]:bottom-[-6px]",
      "size-2.5 rotate-45 border border-border-primary bg-surface",
      "data-[side=bottom]:border-r-0 data-[side=bottom]:border-b-0",
      "data-[side=top]:border-t-0 data-[side=top]:border-l-0",
      "data-[side=left]:border-b-0 data-[side=left]:border-l-0",
      "data-[side=right]:border-t-0 data-[side=right]:border-r-0",
      className,
    )}
    {...props}
  />
)

export const ComboboxList = ({ className, ...props }: ComboboxListProps) => (
  <BaseCombobox.List
    className={cn("max-h-[inherit] overflow-y-auto p-1 outline-none", className)}
    {...props}
  />
)

export const ComboboxItem = ({ className, ...props }: ComboboxItemProps) => (
  <BaseCombobox.Item
    className={cn(
      "flex min-h-8 cursor-default items-center gap-2 rounded-xs px-2.5 py-1.5 text-sm text-fg-primary outline-none select-none",
      motion.colors,
      "data-disabled:cursor-not-allowed data-disabled:opacity-50 data-highlighted:bg-background-tertiary data-highlighted:text-fg-primary",
      className,
    )}
    {...props}
  />
)

export const ComboboxItemIndicator = ({
  className,
  children,
  ...props
}: ComboboxItemIndicatorProps) => {
  if (children == null) return null

  return (
    <BaseCombobox.ItemIndicator
      className={cn(
        "ml-auto flex size-4 shrink-0 items-center justify-center text-fg-primary data-unchecked:hidden",
        className,
      )}
      {...props}
    >
      {children}
    </BaseCombobox.ItemIndicator>
  )
}

export const ComboboxEmpty = ({ className, ...props }: ComboboxEmptyProps) => (
  <BaseCombobox.Empty
    className={cn("px-2.5 py-2 text-sm text-fg-tertiary empty:hidden", className)}
    {...props}
  />
)

export const ComboboxStatus = ({ className, ...props }: ComboboxStatusProps) => (
  <BaseCombobox.Status
    className={cn("px-2.5 py-2 text-sm text-fg-tertiary", className)}
    {...props}
  />
)

export const ComboboxGroup = ({ className, ...props }: ComboboxGroupProps) => (
  <BaseCombobox.Group className={cn(className)} {...props} />
)

export const ComboboxGroupLabel = ({
  className,
  ...props
}: ComboboxGroupLabelProps) => (
  <BaseCombobox.GroupLabel
    className={cn("px-2.5 py-1.5 text-xs text-fg-tertiary", className)}
    {...props}
  />
)

export const ComboboxSeparator = ({
  className,
  ...props
}: ComboboxSeparatorProps) => (
  <BaseCombobox.Separator
    className={cn("my-1 h-px bg-border-primary", className)}
    {...props}
  />
)

export const ComboboxCollection = (props: ComboboxCollectionProps) => (
  <BaseCombobox.Collection {...props} />
)

export const ComboboxChips = ({ className, ...props }: ComboboxChipsProps) => (
  <BaseCombobox.Chips
    className={cn(
      "flex min-w-0 flex-1 flex-wrap items-center gap-1 py-1 pl-2",
      className,
    )}
    {...props}
  />
)

export const ComboboxChip = ({ className, ...props }: ComboboxChipProps) => (
  <BaseCombobox.Chip
    className={cn(
      "inline-flex h-6 items-center gap-1 rounded-xs bg-background-tertiary px-1.5 text-xs text-fg-primary",
      className,
    )}
    {...props}
  />
)

export const ComboboxChipRemove = ({
  className,
  children,
  ...props
}: ComboboxChipRemoveProps) => (
  <BaseCombobox.ChipRemove
    className={cn(
      "inline-flex size-3.5 cursor-pointer items-center justify-center text-fg-tertiary outline-none hover:text-fg-primary focus-visible:outline-none",
      className,
    )}
    {...props}
  >
    {children ?? (
      <IconCrossSmall size={12} className="size-3" aria-hidden />
    )}
  </BaseCombobox.ChipRemove>
)

export const ComboboxRow = ({ className, ...props }: ComboboxRowProps) => (
  <BaseCombobox.Row className={cn(className)} {...props} />
)

export const useComboboxFilter = BaseCombobox.useFilter
export const useFilteredItems = BaseCombobox.useFilteredItems
