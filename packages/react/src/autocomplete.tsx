"use client"

import { Autocomplete as BaseAutocomplete } from "@base-ui/react/autocomplete"
import type { ComponentProps, ReactElement } from "react"
import { IconChevronDownSmall, IconCrossSmall } from "./icons"
import { cn } from "./lib/cn"
import { focusRingWithin, focusRingInvalidWithin } from "./lib/focus"
import { motion } from "./lib/motion"
import { popupInset, popupItem, popupLabel, popupMessage, popupSurface } from "./lib/popup"

export type AutocompleteProps = ComponentProps<typeof BaseAutocomplete.Root>
export type AutocompleteValueProps = ComponentProps<typeof BaseAutocomplete.Value>
export type AutocompleteTriggerProps = ComponentProps<
  typeof BaseAutocomplete.Trigger
>
export type AutocompleteInputProps = ComponentProps<typeof BaseAutocomplete.Input>
export type AutocompleteInputGroupProps = ComponentProps<
  typeof BaseAutocomplete.InputGroup
>
export type AutocompleteIconProps = ComponentProps<typeof BaseAutocomplete.Icon>
export type AutocompleteClearProps = ComponentProps<typeof BaseAutocomplete.Clear>
export type AutocompleteListProps = ComponentProps<typeof BaseAutocomplete.List>
export type AutocompleteStatusProps = ComponentProps<
  typeof BaseAutocomplete.Status
>
export type AutocompletePortalProps = ComponentProps<
  typeof BaseAutocomplete.Portal
>
export type AutocompleteBackdropProps = ComponentProps<
  typeof BaseAutocomplete.Backdrop
>
export type AutocompletePositionerProps = ComponentProps<
  typeof BaseAutocomplete.Positioner
>
export type AutocompletePopupProps = ComponentProps<typeof BaseAutocomplete.Popup>
export type AutocompleteArrowProps = ComponentProps<typeof BaseAutocomplete.Arrow>
export type AutocompleteGroupProps = ComponentProps<typeof BaseAutocomplete.Group>
export type AutocompleteGroupLabelProps = ComponentProps<
  typeof BaseAutocomplete.GroupLabel
>
export type AutocompleteItemProps = ComponentProps<typeof BaseAutocomplete.Item>
export type AutocompleteRowProps = ComponentProps<typeof BaseAutocomplete.Row>
export type AutocompleteCollectionProps = ComponentProps<
  typeof BaseAutocomplete.Collection
>
export type AutocompleteEmptyProps = ComponentProps<typeof BaseAutocomplete.Empty>
export type AutocompleteSeparatorProps = ComponentProps<
  typeof BaseAutocomplete.Separator
>

export const Autocomplete = (props: AutocompleteProps): ReactElement => (
  <BaseAutocomplete.Root {...props} />
)

export const AutocompleteValue = (props: AutocompleteValueProps) => (
  <BaseAutocomplete.Value {...props} />
)

const inputGroupAccessoryClassName = cn(
  "inline-flex size-9 shrink-0 cursor-pointer items-center justify-center text-fg-tertiary outline-none",
  motion.colors,
  "hover:text-fg-primary focus-visible:bg-background-tertiary focus-visible:text-fg-primary focus-visible:outline-none data-disabled:cursor-not-allowed",
)

export const AutocompleteInputGroup = ({
  className,
  ...props
}: AutocompleteInputGroupProps) => (
  <BaseAutocomplete.InputGroup
    className={cn(
      "relative flex min-h-9 w-full items-center rounded-xl border border-border-secondary bg-surface inset-shadow-outline-top transition-[color,box-shadow]",
      focusRingWithin,
      focusRingInvalidWithin,
      "has-[[aria-invalid=true]]:border-destructive has-[[aria-invalid=true]]:focus-within:border-destructive has-[[aria-invalid=true]]:focus-within:ring-destructive/20",
      "has-[:disabled]:opacity-50",
      className,
    )}
    {...props}
  />
)

export const AutocompleteInput = ({
  className,
  ...props
}: AutocompleteInputProps) => (
  <BaseAutocomplete.Input
    className={cn(
      "h-9 min-w-0 flex-1 cursor-text rounded-xl bg-transparent px-3 text-sm text-fg-primary outline-none placeholder:text-fg-quaternary focus-visible:ring-0",
      className,
    )}
    {...props}
  />
)

export const AutocompleteTrigger = ({
  className,
  children,
  ...props
}: AutocompleteTriggerProps) => (
  <BaseAutocomplete.Trigger
    className={cn(inputGroupAccessoryClassName, className)}
    {...props}
  >
    {children ?? <AutocompleteIcon />}
  </BaseAutocomplete.Trigger>
)

export const AutocompleteIcon = ({
  className,
  children,
  ...props
}: AutocompleteIconProps) => (
  <BaseAutocomplete.Icon
    className={cn(
      "flex shrink-0 text-fg-tertiary",
      motion.transform,
      "data-popup-open:rotate-180",
      className,
    )}
    {...props}
  >
    {children ?? (
      <IconChevronDownSmall size={16} className="size-4" aria-hidden />
    )}
  </BaseAutocomplete.Icon>
)

export const AutocompleteClear = ({
  className,
  children,
  ...props
}: AutocompleteClearProps) => (
  <BaseAutocomplete.Clear
    className={cn(inputGroupAccessoryClassName, className)}
    {...props}
  >
    {children ?? (
      <IconCrossSmall size={16} className="size-4" aria-hidden />
    )}
  </BaseAutocomplete.Clear>
)

export const AutocompletePortal = (props: AutocompletePortalProps) => (
  <BaseAutocomplete.Portal {...props} />
)

export const AutocompleteBackdrop = ({
  className,
  ...props
}: AutocompleteBackdropProps) => (
  <BaseAutocomplete.Backdrop className={cn(className)} {...props} />
)

export const AutocompletePositioner = ({
  sideOffset = 6,
  className,
  ...props
}: AutocompletePositionerProps) => (
  <BaseAutocomplete.Positioner
    sideOffset={sideOffset}
    className={cn("z-50 outline-none", className)}
    {...props}
  />
)

export const AutocompletePopup = ({
  className,
  ...props
}: AutocompletePopupProps) => (
  <BaseAutocomplete.Popup
    className={cn(
      "z-50 max-h-[min(24rem,var(--available-height))] w-[var(--anchor-width)] overflow-hidden",
      popupSurface,
      motion.popupAnchor,
      className,
    )}
    {...props}
  />
)

export const AutocompleteArrow = ({
  className,
  ...props
}: AutocompleteArrowProps) => (
  <BaseAutocomplete.Arrow
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

export const AutocompleteList = ({
  className,
  ...props
}: AutocompleteListProps) => (
  <BaseAutocomplete.List
    className={cn("max-h-[inherit] overflow-y-auto outline-none", popupInset, className)}
    {...props}
  />
)

export const AutocompleteItem = ({
  className,
  ...props
}: AutocompleteItemProps) => (
  <BaseAutocomplete.Item
    className={cn(
      popupItem,
      motion.colors,
      "data-disabled:cursor-not-allowed data-disabled:opacity-50 data-highlighted:bg-background-tertiary data-highlighted:text-fg-primary",
      className,
    )}
    {...props}
  />
)

export const AutocompleteEmpty = ({
  className,
  ...props
}: AutocompleteEmptyProps) => (
  <BaseAutocomplete.Empty
    className={cn(cn(popupMessage, "empty:hidden"), className)}
    {...props}
  />
)

export const AutocompleteStatus = ({
  className,
  ...props
}: AutocompleteStatusProps) => (
  <BaseAutocomplete.Status
    className={cn(popupMessage, className)}
    {...props}
  />
)

export const AutocompleteGroup = ({
  className,
  ...props
}: AutocompleteGroupProps) => (
  <BaseAutocomplete.Group className={cn(className)} {...props} />
)

export const AutocompleteGroupLabel = ({
  className,
  ...props
}: AutocompleteGroupLabelProps) => (
  <BaseAutocomplete.GroupLabel
    className={cn(popupLabel, className)}
    {...props}
  />
)

export const AutocompleteSeparator = ({
  className,
  ...props
}: AutocompleteSeparatorProps) => (
  <BaseAutocomplete.Separator
    className={cn("mx-3 my-1 h-px bg-border-primary", className)}
    {...props}
  />
)

export const AutocompleteCollection = (props: AutocompleteCollectionProps) => (
  <BaseAutocomplete.Collection {...props} />
)

export const AutocompleteRow = ({
  className,
  ...props
}: AutocompleteRowProps) => (
  <BaseAutocomplete.Row className={cn(className)} {...props} />
)

export const useAutocompleteFilter = BaseAutocomplete.useFilter
export const useAutocompleteFilteredItems = BaseAutocomplete.useFilteredItems
