"use client"

import { Dialog as BaseDialog } from "@base-ui/react/dialog"
import {
  createContext,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  type ButtonHTMLAttributes,
  type ComponentProps,
  type HTMLAttributes,
  type InputHTMLAttributes,
  type ReactNode,
} from "react"
import { IconCrossSmall, IconMagnifyingGlass } from "./icons"
import { filterGroupVariants, filterItemVariants } from "./filter-group"
import { cn } from "./lib/cn"
import { focusRing } from "./lib/focus"
import { motion } from "./lib/motion"

type CommandContextValue = {
  listboxId: string
  activeOptionId?: string
}

const CommandContext = createContext<CommandContextValue | null>(null)

const useCommandContext = () => {
  const context = useContext(CommandContext)
  if (!context) {
    throw new Error("Command parts must be used within Command.")
  }
  return context
}

export type CommandProps = ComponentProps<typeof BaseDialog.Root> & {
  activeOptionId?: string
}

export type CommandTriggerProps = ComponentProps<typeof BaseDialog.Trigger>
export type CommandPortalProps = ComponentProps<typeof BaseDialog.Portal>
export type CommandBackdropProps = ComponentProps<typeof BaseDialog.Backdrop>
export type CommandPopupProps = ComponentProps<typeof BaseDialog.Popup>
export type CommandToolbarProps = HTMLAttributes<HTMLDivElement>
export type CommandInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
>
export type CommandActionsProps = HTMLAttributes<HTMLDivElement>
export type CommandClearProps = ButtonHTMLAttributes<HTMLButtonElement>
export type CommandCloseProps = ComponentProps<typeof BaseDialog.Close>
export type CommandDividerProps = HTMLAttributes<HTMLDivElement>
export type CommandContentProps = HTMLAttributes<HTMLDivElement>
/** @deprecated Use FilterGroup for new filter controls. */
export type CommandFiltersProps = HTMLAttributes<HTMLUListElement>
/** @deprecated Use FilterItem for new filter controls. */
export type CommandFilterProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  selected?: boolean
}
export type CommandListProps = HTMLAttributes<HTMLUListElement>
export type CommandItemProps = HTMLAttributes<HTMLElement> & {
  selected?: boolean
  disabled?: boolean
  href?: string
}
export type CommandEmptyProps = HTMLAttributes<HTMLDivElement>
export type CommandDialogTitleProps = ComponentProps<typeof BaseDialog.Title>

export const Command = ({
  activeOptionId,
  children,
  ...props
}: CommandProps) => {
  const listboxId = useId()
  const value = useMemo(
    () => ({ listboxId, activeOptionId }),
    [activeOptionId, listboxId],
  )

  return (
    <CommandContext.Provider value={value}>
      <BaseDialog.Root {...props}>{children}</BaseDialog.Root>
    </CommandContext.Provider>
  )
}

export const CommandTrigger = ({
  className,
  ...props
}: CommandTriggerProps) => (
  <BaseDialog.Trigger className={cn("cursor-pointer", className)} {...props} />
)

export const CommandPortal = (props: CommandPortalProps) => (
  <BaseDialog.Portal {...props} />
)

export const CommandBackdrop = ({
  className,
  ...props
}: CommandBackdropProps) => (
  <BaseDialog.Backdrop
    className={cn(
      "fixed inset-0 z-50 bg-black/[0.04] dark:bg-black/40",
      motion.backdrop,
      className,
    )}
    {...props}
  />
)

export const CommandPopup = ({ className, ...props }: CommandPopupProps) => (
  <BaseDialog.Popup
    className={cn(
      "fixed top-1/2 left-1/2 z-50 flex h-[min(80vh,32rem)] w-[calc(100vw-2rem)] max-w-3xl -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-2xl bg-surface-raised shadow-ambient outline-none",
      motion.popupCenter,
      className,
    )}
    {...props}
  />
)

export const CommandToolbar = ({
  className,
  ...props
}: CommandToolbarProps) => (
  <div
    className={cn("flex shrink-0 items-center gap-3 p-4", className)}
    {...props}
  />
)

export const CommandInput = ({
  className,
  id,
  ...props
}: CommandInputProps) => {
  const { listboxId, activeOptionId } = useCommandContext()
  const fallbackId = useId()

  return (
    <input
      id={id ?? fallbackId}
      type="search"
      role="combobox"
      autoComplete="off"
      spellCheck={false}
      aria-autocomplete="list"
      aria-controls={listboxId}
      aria-expanded="true"
      aria-activedescendant={activeOptionId}
      className={cn(
        "h-9 min-w-0 flex-1 cursor-text rounded-md bg-transparent px-2.5 text-base text-fg-primary outline-none placeholder:text-fg-quaternary",
        "[&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none",
        className,
      )}
      {...props}
    />
  )
}

export const CommandActions = ({
  className,
  ...props
}: CommandActionsProps) => (
  <div
    className={cn("flex shrink-0 items-center gap-1.5", className)}
    {...props}
  />
)

export const CommandClear = ({
  className,
  children = "Clear",
  ...props
}: CommandClearProps) => (
  <button
    type="button"
    className={cn(
      "inline-flex h-8 cursor-pointer items-center rounded-full border border-transparent px-3 text-sm text-fg-quaternary",
      motion.colors,
      focusRing,
      "hover:bg-background-tertiary hover:text-fg-primary data-[active=true]:text-fg-primary",
      className,
    )}
    {...props}
  >
    {children}
  </button>
)

export const CommandDivider = ({
  className,
  ...props
}: CommandDividerProps) => (
  <div
    aria-hidden
    className={cn("h-6 w-px shrink-0 rounded-full bg-border-primary", className)}
    {...props}
  />
)

export const CommandClose = ({
  className,
  children,
  ...props
}: CommandCloseProps) => (
  <BaseDialog.Close
    className={cn(
      "inline-flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full border border-transparent text-fg-primary",
      motion.colors,
      focusRing,
      "hover:bg-background-tertiary",
      className,
    )}
    aria-label={props["aria-label"] ?? "Close"}
    {...props}
  >
    {children ?? (
      <IconCrossSmall size={20} className="size-5" aria-hidden />
    )}
  </BaseDialog.Close>
)

export const CommandContent = ({
  className,
  ...props
}: CommandContentProps) => (
  <div
    className={cn(
      "flex min-h-0 flex-1 flex-col gap-3 overflow-hidden px-4 pt-1 pb-5",
      className,
    )}
    {...props}
  />
)

export const CommandFilters = ({
  className,
  ...props
}: CommandFiltersProps) => (
  <ul
    role="list"
    className={cn(
      filterGroupVariants({ variant: "pill" }),
      "w-full shrink-0 justify-start py-1.5",
      className,
    )}
    {...props}
  />
)

export const CommandFilter = ({
  className,
  selected = false,
  children,
  ...props
}: CommandFilterProps) => (
  <li role="presentation" className="contents">
    <button
      type="button"
      aria-pressed={selected}
      data-selected={selected || undefined}
      data-pressed={selected || undefined}
      className={cn(
        filterItemVariants({ variant: "pill", size: "md" }),
        motion.colors,
        className,
      )}
      {...props}
    >
      {children}
    </button>
  </li>
)

export const CommandList = ({ className, ...props }: CommandListProps) => {
  const { listboxId } = useCommandContext()

  return (
    <ul
      id={listboxId}
      role="listbox"
      className={cn(
        "grid min-h-0 flex-1 content-start gap-0 overflow-y-auto overscroll-contain p-1",
        className,
      )}
      {...props}
    />
  )
}

export const CommandItem = ({
  className,
  selected = false,
  disabled = false,
  href,
  children,
  id,
  onClick,
  ...props
}: CommandItemProps) => {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null)

  // Keyboard selection moves the highlight without moving focus, so nothing
  // scrolls the list on its own. `nearest` only acts when the row is actually
  // out of view, which leaves hover-driven selection alone.
  useEffect(() => {
    if (selected) ref.current?.scrollIntoView({ block: "nearest" })
  }, [selected])

  const itemClassName = cn(
    "flex h-15 min-h-15 w-full cursor-pointer items-center justify-between gap-4 rounded-lg border border-transparent px-4 text-left text-sm font-medium text-fg-primary select-none",
    motion.colors,
    "hover:bg-background-tertiary data-selected:bg-background-tertiary",
    "data-disabled:cursor-not-allowed data-disabled:opacity-50",
    focusRing,
    className,
  )

  return (
    <li role="presentation" className="m-0">
      {href ? (
        <a
          ref={ref}
          id={id}
          href={disabled ? undefined : href}
          role="option"
          aria-selected={selected}
          aria-disabled={disabled || undefined}
          data-selected={selected || undefined}
          data-disabled={disabled || undefined}
          className={itemClassName}
          onClick={onClick as never}
          {...(props as HTMLAttributes<HTMLAnchorElement>)}
        >
          {children}
        </a>
      ) : (
        <button
          ref={ref}
          id={id}
          type="button"
          role="option"
          aria-selected={selected}
          disabled={disabled}
          data-selected={selected || undefined}
          data-disabled={disabled || undefined}
          className={itemClassName}
          onClick={onClick as never}
          {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
        >
          {children}
        </button>
      )}
    </li>
  )
}

export const CommandEmpty = ({
  className,
  children,
  ...props
}: CommandEmptyProps) => (
  <div
    role="presentation"
    className={cn(
      "flex flex-1 items-center justify-center gap-2 px-4 py-6 text-sm font-medium text-fg-quaternary",
      className,
    )}
    aria-live="polite"
    {...props}
  >
    <IconMagnifyingGlass size={20} className="size-5 shrink-0" aria-hidden />
    <span>{children ?? "No results"}</span>
  </div>
)

export type CommandTitleProps = {
  children: ReactNode
  className?: string
}

export const CommandTitle = ({ className, children }: CommandTitleProps) => (
  <span className={cn("min-w-0 truncate", className)}>{children}</span>
)

export type CommandMetaProps = HTMLAttributes<HTMLSpanElement>

export const CommandMeta = ({ className, ...props }: CommandMetaProps) => (
  <span
    className={cn("shrink-0 text-xs font-normal text-fg-tertiary", className)}
    {...props}
  />
)

export const CommandDialogTitle = ({
  className,
  ...props
}: CommandDialogTitleProps) => (
  <BaseDialog.Title className={cn("sr-only", className)} {...props} />
)
