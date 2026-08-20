"use client"

import { useEffect, useState, type ReactNode } from "react"
import { breakpoints, spacingSteps } from "@/lib/layout"
import { useCopy } from "@/lib/use-copy"

const CopyRow = ({
  copyValue,
  children,
}: {
  copyValue: string
  children: ReactNode
}) => {
  const { copied, copy } = useCopy()

  const handleCopy = () => copy(copyValue)

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? "Copied" : `Copy ${copyValue}`}
      title={copied ? "Copied" : `Copy ${copyValue}`}
      className="group flex w-full cursor-copy items-center gap-4 border-b border-border-primary px-4 py-4 text-left transition-colors last:border-b-0 hover:bg-background-tertiary focus-visible:bg-background-tertiary outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-offset-1 focus-visible:ring-offset-background-primary focus-visible:ring-ring/20 sm:px-5"
    >
      {children}
      <span className="sr-only">{copied ? "Copied" : copyValue}</span>
    </button>
  )
}

export const SpacingPreviewList = () => (
  <div className="overflow-hidden rounded-xl border border-border-primary bg-surface">
    <div className="flex items-center gap-4 border-b border-border-primary px-4 py-3 sm:px-5">
      <p className="text-xs-strong w-[7.5rem] shrink-0 text-fg-tertiary sm:w-[140px]">
        Preview
      </p>
      <p className="text-xs-strong w-24 shrink-0 text-fg-tertiary sm:w-28">
        Step
      </p>
      <p className="text-xs-strong min-w-0 flex-1 text-fg-tertiary">Usage</p>
    </div>
    {spacingSteps.map((step) => {
      const className = `p-${step.token}`
      const barWidth = Number.parseFloat(step.px)

      return (
        <CopyRow key={step.token} copyValue={className}>
          <div className="flex h-10 w-[7.5rem] shrink-0 items-center sm:w-[140px]">
            <div
              className="h-3 rounded-sm bg-fg-primary"
              style={{ width: Math.max(barWidth, 2) }}
              aria-hidden
            />
          </div>
          <div className="flex w-24 shrink-0 flex-col gap-0.5 sm:w-28">
            <p className="text-sm text-fg-secondary">{step.token}</p>
            <p className="text-xs font-mono text-fg-quaternary">
              {step.px} · {step.rem}
            </p>
          </div>
          <p className="text-sm min-w-0 flex-1 text-fg-tertiary">{step.usage}</p>
        </CopyRow>
      )
    })}
  </div>
)

export const GridPreview = () => (
  <div className="overflow-hidden rounded-xl border border-border-primary bg-surface p-4 sm:p-5">
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="flex h-14 items-center justify-center rounded-lg bg-background-tertiary"
        >
          <span className="text-2xs font-mono text-fg-quaternary">
            {index + 1}
          </span>
        </div>
      ))}
    </div>
    <p className="text-xs mt-3 font-mono text-fg-quaternary">
      grid grid-cols-2 gap-3 sm:grid-cols-4
    </p>
  </div>
)

const resolveActiveBreakpoint = (width: number) => {
  let active = "base"
  for (const bp of breakpoints) {
    if (width >= Number.parseInt(bp.px, 10)) {
      active = bp.name
    }
  }
  return active
}

export const BreakpointsPreview = () => {
  const [width, setWidth] = useState<number | null>(null)
  const active = width === null ? null : resolveActiveBreakpoint(width)

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth)
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div className="overflow-hidden rounded-xl border border-border-primary bg-surface">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border-primary px-4 py-3 sm:px-5">
        <p className="text-sm text-fg-secondary">
          Active viewport
          {width !== null ? (
            <span className="ml-2 font-mono text-fg-primary">
              {width}px · {active}
            </span>
          ) : (
            <span className="ml-2 font-mono text-fg-quaternary">…</span>
          )}
        </p>
        <p className="text-xs font-mono text-fg-quaternary">min-width scale</p>
      </div>
      <div className="flex flex-col gap-2 p-4 sm:p-5">
        {breakpoints.map((bp) => {
          const isActive = active === bp.name
          const widthPct =
            (Number.parseInt(bp.px, 10) / 1536) * 100

          return (
            <div key={bp.name} className="flex items-center gap-3">
              <p
                className={`text-xs w-10 shrink-0 font-mono ${
                  isActive ? "text-fg-primary" : "text-fg-quaternary"
                }`}
              >
                {bp.name}
              </p>
              <div className="h-2 min-w-0 flex-1 rounded-full bg-background-tertiary">
                <div
                  className={`h-full rounded-full transition-colors ${
                    isActive ? "bg-fg-primary" : "bg-background-quaternary"
                  }`}
                  style={{ width: `${Math.min(widthPct, 100)}%` }}
                />
              </div>
              <p className="text-xs w-16 shrink-0 text-right font-mono text-fg-quaternary">
                {bp.px}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
