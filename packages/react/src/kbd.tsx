import { cva, type VariantProps } from "class-variance-authority"
import type { ComponentProps } from "react"
import { cn } from "./lib/cn"

const kbdVariants = cva(
  // `text-xs` carries the size, line-height and tracking; the weight is set
  // separately because 600 sits above the 400/500 the type scale defines, so
  // there is no `-strong` utility to reach for.
  // The border is bottom-only on purpose: it reads as the lip of a physical
  // key without boxing the glyph in on all four sides, which at 12px turns a
  // keycap into a cramped badge.
  "inline-flex shrink-0 items-center justify-center border-b px-1 font-sans text-xs font-semibold whitespace-nowrap select-none",
  {
    variants: {
      variant: {
        default: "border-border-primary bg-background-tertiary text-fg-secondary",
        // The default fill is a light grey that vanishes on a dark surface, so
        // an inverted keycap tints with the inverted foreground instead. It has
        // to be that token rather than a literal `white`: the grey ramp flips
        // under `.dark`, so a hardcoded white wash would sit invisibly on the
        // now-light inverted surface.
        inverted: "border-fg-inverted/10 bg-fg-inverted/10 text-fg-inverted",
      },
      size: {
        sm: "h-4 min-w-3.5 rounded-2xs",
        md: "h-5 min-w-4 rounded-xs",
      },
    },
    defaultVariants: { variant: "default", size: "md" },
  },
)

export type KbdProps = ComponentProps<"kbd"> & VariantProps<typeof kbdVariants>
export type KbdGroupProps = ComponentProps<"span">

/** A single keycap. Presentational — map "cmd" to ⌘ before it gets here. */
export const Kbd = ({ className, variant, size, ...props }: KbdProps) => (
  <kbd className={cn(kbdVariants({ variant, size }), className)} {...props} />
)

/** A full shortcut. Keeps the caps on one line at a consistent gap. */
export const KbdGroup = ({ className, ...props }: KbdGroupProps) => (
  <span
    className={cn("inline-flex items-center gap-1 align-middle", className)}
    {...props}
  />
)

export { kbdVariants }
