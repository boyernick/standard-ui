import type { SVGProps } from "react"

type IconProps = SVGProps<SVGSVGElement>

const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true as const,
}

export const LifelineFilmIcon = ({
  strokeWidth = 1.75,
  ...props
}: IconProps) => (
  <svg {...iconProps} strokeWidth={strokeWidth} {...props}>
    <rect width="18" height="18" x="3" y="3" rx="2" />
    <path d="M7 3v18" />
    <path d="M3 7.5h4" />
    <path d="M3 12h18" />
    <path d="M3 16.5h4" />
    <path d="M17 3v18" />
    <path d="M17 7.5h4" />
    <path d="M17 16.5h4" />
  </svg>
)

export const LifelineImageIcon = ({
  strokeWidth = 1.75,
  ...props
}: IconProps) => (
  <svg {...iconProps} strokeWidth={strokeWidth} {...props}>
    <rect width="18" height="18" x="3" y="3" rx="2" />
    <circle cx="9" cy="9" r="2" />
    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
  </svg>
)
