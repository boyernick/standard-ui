"use client"

import { Toast as BaseToast } from "@base-ui/react/toast"
import { cva, type VariantProps } from "class-variance-authority"
import {
  createContext,
  useContext,
  type ComponentProps,
} from "react"
import {
  IconCircleCheck,
  IconCircleInfo,
  IconCrossSmall,
  IconExclamationCircle,
  IconExclamationTriangle,
} from "./icons"
import { Spinner } from "./spinner"
import { cn } from "./lib/cn"
import { focusRing, focusRingBorder } from "./lib/focus"
import { motion } from "./lib/motion"

export type ToastPlacement = "top-center" | "bottom-right"

const ToastPlacementContext = createContext<ToastPlacement>("top-center")

export type ToastProviderProps = ComponentProps<typeof BaseToast.Provider>
export type ToastPortalProps = ComponentProps<typeof BaseToast.Portal>
export type ToastViewportProps = ComponentProps<typeof BaseToast.Viewport> &
  VariantProps<typeof toastViewportVariants>
export type ToastRootProps = ComponentProps<typeof BaseToast.Root> &
  VariantProps<typeof toastRootVariants>
export type ToastContentProps = ComponentProps<typeof BaseToast.Content>
export type ToastTitleProps = ComponentProps<typeof BaseToast.Title>
export type ToastDescriptionProps = ComponentProps<typeof BaseToast.Description>
export type ToastActionProps = ComponentProps<typeof BaseToast.Action>
export type ToastCloseProps = ComponentProps<typeof BaseToast.Close>
export type ToastPositionerProps = ComponentProps<typeof BaseToast.Positioner>
export type ToastArrowProps = ComponentProps<typeof BaseToast.Arrow>

/** The types that carry a glyph. Anything else renders no icon. */
export type ToastType = "success" | "error" | "warning" | "info" | "loading"
export type ToastIconProps = ComponentProps<"span"> & { type?: string }

export const ToastProvider = (props: ToastProviderProps) => (
  <BaseToast.Provider {...props} />
)

export const ToastPortal = (props: ToastPortalProps) => (
  <BaseToast.Portal {...props} />
)

export const toastViewportVariants = cva(
  // No flex column: the toasts inside are absolutely positioned so they pile
  // up as a stack. In flow they would march down past the edge.
  "fixed z-[100] w-[min(100vw-2rem,28rem)] outline-none",
  {
    variants: {
      placement: {
        "top-center": "top-8 left-1/2 -translate-x-1/2",
        "bottom-right": "right-4 bottom-4 sm:right-8 sm:bottom-8",
      },
    },
    defaultVariants: { placement: "top-center" },
  },
)

export const ToastViewport = ({
  className,
  placement = "top-center",
  children,
  ...props
}: ToastViewportProps) => (
  <ToastPlacementContext.Provider value={placement ?? "top-center"}>
    <BaseToast.Viewport
      data-placement={placement}
      className={cn(toastViewportVariants({ placement }), className)}
      {...props}
    >
      {children}
    </BaseToast.Viewport>
  </ToastPlacementContext.Provider>
)

/** Shared chrome. Placement owns where the stack anchors and how cards move. */
const toastRootVariants = cva(
  cn(
    "absolute right-0 left-0 z-[calc(1000-var(--toast-index))] box-border w-full",
    "[--gap:0.625rem] [--peek:0.875rem]",
    "[--scale:calc(max(0,1-(var(--toast-index)*0.05)))]",
    "[--height:var(--toast-frontmost-height,var(--toast-height))]",
    // A row, not an overlay: the action and the close sit inline at the right,
    // so the close cannot be absolutely positioned over reserved padding.
    "flex items-start gap-2 rounded-xl border py-2.5 pr-2 pl-4 shadow-lg outline-none select-none",
    "h-[var(--height)] data-expanded:h-[var(--toast-height)]",
    // Bridges the gap between cards so crossing it does not collapse the fan.
    "after:absolute after:top-full after:left-0 after:h-[calc(var(--gap)+1px)] after:w-full after:content-['']",
    "transition-[transform,opacity,height] duration-[var(--duration-md)] ease-enter motion-reduce:transition-none",
    "data-ending-style:opacity-0 data-limited:opacity-0",
  ),
  {
    variants: {
      variant: {
        // The page's own surface. The border stays transparent so the edge is
        // `shadow-lg`'s hairline, the same one every dropdown carries.
        default: "border-transparent bg-surface text-fg-primary",
        // Flipped against the page. Here the hairline is invisible — a black
        // line on a near-black card — so the edge is drawn with the inverted
        // foreground, which flips with the theme alongside the surface.
        inverted: "border-fg-inverted/10 bg-surface-inverted text-fg-inverted",
      },
      placement: {
        /** Pinned to the top of the viewport; behind cards peek below. */
        "top-center": cn(
          "top-0 origin-top",
          "[--offset-y:calc(var(--toast-offset-y)+calc(var(--toast-index)*var(--gap))+var(--toast-swipe-movement-y,0px))]",
          "[transform:translateX(var(--toast-swipe-movement-x,0px))_translateY(calc(var(--toast-swipe-movement-y,0px)+(var(--toast-index)*var(--peek))))_scale(var(--scale))]",
          "data-expanded:[transform:translateX(var(--toast-swipe-movement-x,0px))_translateY(var(--offset-y))]",
          "data-starting-style:[transform:translateY(-150%)]",
          "[&[data-ending-style]:not([data-limited]):not([data-swipe-direction])]:[transform:translateY(-150%)]",
        ),
        /** Pinned to the bottom-right; behind cards peek above. */
        "bottom-right": cn(
          "bottom-0 origin-bottom",
          "[--shrink:calc(1-var(--scale))]",
          "[--offset-y:calc(var(--toast-offset-y)*-1+calc(var(--toast-index)*var(--gap)*-1)+var(--toast-swipe-movement-y,0px))]",
          "[transform:translateX(var(--toast-swipe-movement-x,0px))_translateY(calc(var(--toast-swipe-movement-y,0px)-(var(--toast-index)*var(--peek))-(var(--shrink)*var(--height))))_scale(var(--scale))]",
          "data-expanded:[transform:translateX(var(--toast-swipe-movement-x,0px))_translateY(var(--offset-y))]",
          "data-starting-style:[transform:translateY(150%)]",
          "[&[data-ending-style]:not([data-limited]):not([data-swipe-direction])]:[transform:translateY(150%)]",
        ),
      },
    },
    defaultVariants: { variant: "default", placement: "top-center" },
  },
)

/** The variant is published as `data-variant` rather than passed down: the
 *  title, description, action, close and icon all have to follow the surface,
 *  and a data attribute lets each one carry its own pair of rules instead of
 *  every caller threading a prop through five components.
 *
 *  Placement defaults from the nearest `ToastViewport` so the stack and the
 *  corner stay in sync without repeating the prop on every root. */
export const ToastRoot = ({
  className,
  variant = "default",
  placement: placementProp,
  ...props
}: ToastRootProps) => {
  const placementFromViewport = useContext(ToastPlacementContext)
  const placement = placementProp ?? placementFromViewport

  return (
    <BaseToast.Root
      data-variant={variant}
      data-placement={placement}
      className={cn(
        "group/toast",
        toastRootVariants({ variant, placement }),
        className,
      )}
      {...props}
    />
  )
}

export { toastRootVariants }

const toastGlyphs = {
  success: {
    Icon: IconCircleCheck,
    tone: `text-status-success group-data-[variant=inverted]/toast:text-status-success-inverted`,
  },
  error: {
    Icon: IconExclamationCircle,
    tone: `text-status-critical group-data-[variant=inverted]/toast:text-status-critical-inverted`,
  },
  warning: {
    Icon: IconExclamationTriangle,
    tone: `text-status-warning group-data-[variant=inverted]/toast:text-status-warning-inverted`,
  },
  info: {
    Icon: IconCircleInfo,
    tone: `text-status-info group-data-[variant=inverted]/toast:text-status-info-inverted`,
  },
} as const

/** The glyph tracks the title, not the block. The row is `items-start` so the
 *  glyph and the content column measure from the same top edge, and `mt-0.5`
 *  is the half-leading above a 14px title in a 20px line — which centres the
 *  16px glyph on the title whether or not a description follows it.
 *
 *  The margin is on both axes, not just the top. Every item beside the content
 *  column is collapsed to a 20px outer box — the height of the title's line —
 *  so it centres on that line while contributing nothing extra to the row. A
 *  top-only offset lines the item up but leaves its full height in the box, and
 *  the tallest control then stretches the toast downward and everything reads
 *  high. Hit areas are untouched: the boxes overflow, they do not shrink. */
const ICON_ALIGN = "my-0.5 flex shrink-0"

/** The glyph for a toast's type. Each tone carries both surfaces: the plain
 *  status tokens are tuned for the page, and the `-inverted` pair for a card
 *  that flips against it. Pass `toast.type` from the render loop — Base UI
 *  gives no way to read the toast from inside the root. */
export const ToastIcon = ({ type, className, ...props }: ToastIconProps) => {
  if (type === "loading") {
    return (
      <span className={cn(ICON_ALIGN, className)} {...props}>
        <Spinner size="sm" />
      </span>
    )
  }

  const glyph = toastGlyphs[type as keyof typeof toastGlyphs]
  if (!glyph) return null

  return (
    <span className={cn(ICON_ALIGN, glyph.tone, className)} {...props}>
      <glyph.Icon size={16} className="size-4" aria-hidden />
    </span>
  )
}

export const ToastContent = ({ className, ...props }: ToastContentProps) => (
  <BaseToast.Content
    className={cn(
      "flex min-w-0 flex-1 flex-col gap-0.5 overflow-hidden transition-opacity duration-[var(--duration-sm)]",
      "data-behind:pointer-events-none data-behind:opacity-0 data-expanded:data-behind:opacity-100",
      className,
    )}
    {...props}
  />
)

export const ToastTitle = ({ className, ...props }: ToastTitleProps) => (
  <BaseToast.Title
    className={cn(
      "text-sm-strong text-fg-primary group-data-[variant=inverted]/toast:text-fg-inverted",
      className,
    )}
    {...props}
  />
)

export const ToastDescription = ({
  className,
  ...props
}: ToastDescriptionProps) => (
  <BaseToast.Description
    className={cn(
      "text-sm text-fg-secondary group-data-[variant=inverted]/toast:text-fg-inverted-secondary",
      className,
    )}
    {...props}
  />
)

export const ToastAction = ({ className, ...props }: ToastActionProps) => (
  <BaseToast.Action
    className={cn(
      "text-xs -my-1 inline-flex h-7 shrink-0 cursor-pointer items-center justify-center rounded-md border border-border-secondary px-2.5 text-fg-primary",
      motion.colors,
      focusRing,
      "hover:bg-background-tertiary",
      "group-data-[variant=inverted]/toast:border-fg-inverted/15 group-data-[variant=inverted]/toast:text-fg-inverted group-data-[variant=inverted]/toast:hover:bg-fg-inverted/10 group-data-[variant=inverted]/toast:focus-visible:border-fg-inverted/50 group-data-[variant=inverted]/toast:focus-visible:ring-fg-inverted/50",
      className,
    )}
    {...props}
  />
)

export const ToastClose = ({
  className,
  children,
  ...props
}: ToastCloseProps) => (
  <BaseToast.Close
    className={cn(
      "-my-0.5 inline-flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-md text-fg-tertiary",
      focusRingBorder,
      motion.colors,
      focusRing,
      "hover:bg-background-tertiary hover:text-fg-primary",
      "group-data-[variant=inverted]/toast:text-fg-inverted/50 group-data-[variant=inverted]/toast:hover:bg-fg-inverted/10 group-data-[variant=inverted]/toast:hover:text-fg-inverted group-data-[variant=inverted]/toast:focus-visible:border-fg-inverted/50 group-data-[variant=inverted]/toast:focus-visible:ring-fg-inverted/50",
      className,
    )}
    {...props}
  >
    {children ?? (
      <IconCrossSmall size={18} className="size-4.5" aria-hidden />
    )}
  </BaseToast.Close>
)

export const ToastPositioner = ({
  className,
  ...props
}: ToastPositionerProps) => (
  <BaseToast.Positioner
    className={cn("z-[100] outline-none", className)}
    {...props}
  />
)

export const ToastArrow = ({ className, ...props }: ToastArrowProps) => (
  <BaseToast.Arrow
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

export const useToastManager = BaseToast.useToastManager
export const createToastManager = BaseToast.createToastManager
