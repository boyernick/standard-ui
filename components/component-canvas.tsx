import type { ReactNode } from "react"

type ComponentCanvasProps = {
  children: ReactNode
  /** Caption above the frame (e.g. Variants, Sizes) */
  label?: string
  /** Minimum height of the preview area */
  minHeightClass?: string
  /** Drop the frame for previews that already bring their own surface */
  frame?: boolean
  className?: string
  /** Classes for the inner flex row */
  contentClassName?: string
}

export const ComponentCanvas = ({
  children,
  label,
  minHeightClass = "min-h-0",
  frame = true,
  className = "",
  contentClassName = "",
}: ComponentCanvasProps) => (
  <div className={className}>
    {label ? <p className="text-xs mb-2 text-fg-tertiary">{label}</p> : null}
    {frame ? (
      <div className="rounded-xl border border-border-primary bg-background-secondary">
        <div
          className={`flex flex-wrap items-center justify-center gap-3 overflow-hidden rounded-xl p-8 ${minHeightClass} ${contentClassName}`}
        >
          {children}
        </div>
      </div>
    ) : (
      children
    )}
  </div>
)
