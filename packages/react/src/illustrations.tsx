import type { SVGProps } from "react"
import { cn } from "./lib/cn"

export type IllustrationProps = SVGProps<SVGSVGElement>

const illustrationProps = {
  viewBox: "0 0 240 160",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
} as const

export const IllustrationEmpty = ({
  className,
  ...props
}: IllustrationProps) => (
  <svg
    {...illustrationProps}
    className={cn("text-fg-tertiary", className)}
    aria-hidden
    {...props}
  >
    <path
      d="M52 65 79 40h82l27 25v55H52V65Z"
      className="fill-background-secondary"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M52 65h45l8 13h30l8-13h45"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path
      d="M97 31h46"
      className="text-brand-primary"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
    />
    <circle cx="120" cy="104" r="4" className="fill-brand-primary" />
  </svg>
)

export const IllustrationError = ({
  className,
  ...props
}: IllustrationProps) => (
  <svg
    {...illustrationProps}
    className={cn("text-fg-tertiary", className)}
    aria-hidden
    {...props}
  >
    <rect
      x="47"
      y="28"
      width="146"
      height="104"
      rx="16"
      className="fill-background-secondary"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M47 54h146"
      stroke="currentColor"
      strokeWidth="2"
    />
    <circle cx="63" cy="41" r="3" className="fill-brand-primary" />
    <circle cx="74" cy="41" r="3" fill="currentColor" opacity=".45" />
    <circle cx="85" cy="41" r="3" fill="currentColor" opacity=".25" />
    <path
      d="m103 78 34 34m0-34-34 34"
      className="text-brand-primary"
      stroke="currentColor"
      strokeWidth="5"
      strokeLinecap="round"
    />
  </svg>
)

export const IllustrationSuccess = ({
  className,
  ...props
}: IllustrationProps) => (
  <svg
    {...illustrationProps}
    className={cn("text-fg-tertiary", className)}
    aria-hidden
    {...props}
  >
    <circle
      cx="120"
      cy="80"
      r="53"
      className="fill-background-secondary"
      stroke="currentColor"
      strokeWidth="2"
    />
    <circle
      cx="120"
      cy="80"
      r="37"
      className="fill-brand-primary text-brand-primary"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="m99 80 14 14 29-31"
      className="text-brand-foreground"
      stroke="currentColor"
      strokeWidth="6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M63 42h13M69.5 35.5v13M168 118h13m-6.5-6.5v13"
      className="text-brand-primary"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
)

export const IllustrationSearch = ({
  className,
  ...props
}: IllustrationProps) => (
  <svg
    {...illustrationProps}
    className={cn("text-fg-tertiary", className)}
    aria-hidden
    {...props}
  >
    <path
      d="M42 38h113a12 12 0 0 1 12 12v69H42V38Z"
      className="fill-background-secondary"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path d="M42 58h125" stroke="currentColor" strokeWidth="2" />
    <path
      d="M59 76h48M59 89h34M59 102h53"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      opacity=".5"
    />
    <circle
      cx="155"
      cy="91"
      r="27"
      className="fill-surface text-brand-primary"
      stroke="currentColor"
      strokeWidth="5"
    />
    <path
      d="m174 111 22 22"
      className="text-brand-primary"
      stroke="currentColor"
      strokeWidth="7"
      strokeLinecap="round"
    />
  </svg>
)
