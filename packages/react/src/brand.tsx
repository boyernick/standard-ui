import type { SVGProps } from "react"
import { cn } from "./lib/cn"

export type BrandMarkProps = SVGProps<SVGSVGElement> & {
  size?: number
  title?: string
}

/** Solid disk — same mark as nickboyer.com / the site favicon. */
export const BrandMark = ({
  size = 24,
  className,
  title = "Standard UI",
  ...props
}: BrandMarkProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 128 128"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn("shrink-0 text-fg-primary", className)}
    aria-hidden={title ? undefined : true}
    role={title ? "img" : undefined}
    {...props}
  >
    {title ? <title>{title}</title> : null}
    <circle cx="64" cy="64" r="64" fill="currentColor" />
  </svg>
)

export type BrandWordmarkProps = {
  className?: string
  markSize?: number
  /** Show full “Standard UI” or short “UI” */
  compact?: boolean
  /** Chrome lockups use sm; marketing uses md */
  size?: "sm" | "md"
}

export const BrandWordmark = ({
  className,
  markSize,
  compact = false,
  size = "md",
}: BrandWordmarkProps) => {
  const resolvedMarkSize = markSize ?? (size === "sm" ? 14 : 28)

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-fg-primary",
        className,
      )}
      aria-label="Standard UI"
    >
      <BrandMark size={resolvedMarkSize} title="" aria-hidden />
      {compact ? (
        <span
          className={cn(
            "tracking-tight",
            size === "sm" ? "text-sm-strong" : "heading-lg-serif",
          )}
        >
          UI
        </span>
      ) : (
        <span className="inline-flex items-baseline gap-1.5">
          <span
            className={cn(
              "tracking-tight",
              size === "sm" ? "text-sm-strong font-serif" : "heading-lg-serif",
            )}
          >
            Standard
          </span>
          <span className="text-sm-strong tracking-tight">UI</span>
        </span>
      )}
    </span>
  )
}
