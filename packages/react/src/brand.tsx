import type { SVGProps } from "react"
import { cn } from "./lib/cn"

export type BrandMarkProps = SVGProps<SVGSVGElement> & {
  size?: number
  title?: string
}

/** Solid disk — canonical StandardUI mark. Color via currentColor / parent text. */
export const BrandMark = ({
  size = 24,
  className,
  title = "StandardUI",
  ...props
}: BrandMarkProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 128 128"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn("shrink-0 text-current", className)}
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
  /** Dense chrome: mark + “UI” only. Default lockup is mark + “StandardUI”. */
  compact?: boolean
  /** Chrome lockups use sm; marketing uses md */
  size?: "sm" | "md"
}

/** Disk + StandardUI — matches the canonical lockup. Inherits color for light/dark. */
export const BrandWordmark = ({
  className,
  markSize,
  compact = false,
  size = "md",
}: BrandWordmarkProps) => {
  const resolvedMarkSize = markSize ?? (size === "sm" ? 16 : 32)

  return (
    <span
      className={cn(
        "inline-flex items-center",
        size === "sm" ? "gap-1.5" : "gap-2",
        className,
      )}
      aria-label="StandardUI"
    >
      <BrandMark size={resolvedMarkSize} title="" aria-hidden />
      <span
        className={cn(
          "tracking-tight",
          size === "sm" ? "text-sm-strong" : "heading-lg-sans",
        )}
      >
        {compact ? "UI" : "StandardUI"}
      </span>
    </span>
  )
}
