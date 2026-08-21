"use client"

import { Checkbox as BaseCheckbox } from "@base-ui/react/checkbox"
import type { ComponentProps } from "react"
import { IconCheckmark1, IconMinus } from "./icons"
import { cn } from "./lib/cn"
import { motion } from "./lib/motion"

export type CheckboxProps = ComponentProps<typeof BaseCheckbox.Root>

export const Checkbox = ({ className, ...props }: CheckboxProps) => (
  <BaseCheckbox.Root
    className={cn(
      "group flex size-4 shrink-0 items-center justify-center rounded-sm border border-border-secondary bg-surface outline-none",
      // motion.all, not motion.colors: the filled state brings a box shadow
      // with it, which has to fade in alongside the background.
      motion.all,
      "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-offset-1 focus-visible:ring-offset-background-primary focus-visible:ring-ring/20",
      // Ticked and mixed are both filled controls, so they carry the primary
      // button's treatment: brand fill, the border token that pairs with it,
      // and the top-edge highlight that makes a solid control read as raised.
      "data-checked:border-brand-primary-border data-checked:bg-brand-primary data-checked:inset-shadow-solid-top",
      "data-indeterminate:border-brand-primary-border data-indeterminate:bg-brand-primary data-indeterminate:inset-shadow-solid-top",
      "data-checked:hover:bg-brand-primary-hover data-indeterminate:hover:bg-brand-primary-hover",
      "data-checked:active:bg-brand-primary-active data-indeterminate:active:bg-brand-primary-active",
      "data-disabled:cursor-not-allowed data-disabled:opacity-50",
      className,
    )}
    {...props}
  >
    {/* Only the active glyph is mounted. Central Icons give every instance of
        an icon the same mask id, so a CSS-hidden twin would claim that id for
        the whole document; a `display: none` subtree renders no mask, leaving
        the visible instance to paint its backing rect unmasked as a solid
        block. Mounting one icon keeps every id in the document resolvable. */}
    {/* No `data-unchecked:hidden` here. Base UI keeps the indicator mounted
        through its exit and flags it with both `data-unchecked` and
        `data-ending-style`; hiding on the former would cut the latter's
        transition short and the mark would vanish instantly. */}
    <BaseCheckbox.Indicator
      className={cn("flex text-brand-foreground", motion.checkIndicator)}
      render={(props, state) => (
        <span {...props}>
          {state.indeterminate ? (
            <IconMinus size={12} className="size-3" aria-hidden />
          ) : (
            <IconCheckmark1 size={12} className="size-3" aria-hidden />
          )}
        </span>
      )}
    />
  </BaseCheckbox.Root>
)
