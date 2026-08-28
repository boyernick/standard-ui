"use client"

import { useState, type ReactNode } from "react"
import { radii, shadows } from "@/lib/tokens"
import { PAGE_INNER } from "@/lib/chrome"

/** Rogo's comparison-table spacing, matching Colors and Typography: columns
 *  share the width proportionally and the trailing value column right-aligns,
 *  so leftover width reads as column rhythm rather than a void. The band owns
 *  the tracks and each row is a subgrid, so widths stay in sync per band. */
const BAND =
  "mt-6 sm:grid sm:grid-cols-[4rem_minmax(max-content,2fr)_minmax(max-content,2fr)_minmax(max-content,1fr)] sm:gap-x-6"

const SUBGRID = "sm:col-span-4 sm:grid sm:grid-cols-subgrid sm:gap-x-6"

const ROW = `grid grid-cols-[4rem_1fr] items-center gap-4 ${SUBGRID} sm:items-center w-full cursor-copy border-b border-border-primary-solid py-5 text-left outline-none transition-colors last:border-b-0 hover:bg-background-secondary focus-visible:bg-background-secondary focus-visible:ring-[3px] focus-visible:ring-inset focus-visible:ring-ring/20`

const HEAD = "text-xs-strong text-fg-tertiary"

const METRIC =
  "text-xs hidden font-mono text-fg-secondary tabular-nums sm:block sm:text-right"

const TokenRow = ({ row }: { row: MaterialRow }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(row.className)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1200)
    } catch {
      // Clipboard unavailable — nothing useful to show.
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      title={`Copy ${row.className}`}
      className={ROW}
    >
      {row.preview}
      <span className="text-sm min-w-0 truncate font-mono text-fg-primary">
        {row.className}
      </span>
      <span className="text-sm hidden min-w-0 text-fg-secondary sm:block">
        {copied ? "Copied" : row.usage}
      </span>
      <span className={METRIC}>{row.value}</span>
      <span className="sr-only">{copied ? "Copied" : row.className}</span>
    </button>
  )
}

export type MaterialRow = {
  className: string
  usage: string
  value: string
  preview: ReactNode
}

export const MaterialBand = ({
  id,
  title,
  description,
  valueLabel,
  rows,
  first,
}: {
  id: string
  title: string
  description: string
  valueLabel: string
  rows: MaterialRow[]
  first?: boolean
}) => (
  <section
    aria-labelledby={id}
    className={first ? "" : "border-t border-border-primary"}
  >
    <div className={`${PAGE_INNER} py-10`}>
      <h2 id={id} className="heading-sm text-fg-primary">
        {title}
      </h2>
      <p className="text-sm mt-1 max-w-2xl text-fg-secondary">{description}</p>

      <div className={BAND}>
        <div
          className={`${SUBGRID} hidden border-b border-border-primary pb-2 sm:grid`}
        >
          <span className={HEAD}>Preview</span>
          <span className={HEAD}>Class</span>
          <span className={HEAD}>Usage</span>
          <span className={`${HEAD} sm:text-right`}>{valueLabel}</span>
        </div>
        {rows.map((row) => (
          <TokenRow key={row.className} row={row} />
        ))}
      </div>
    </div>
  </section>
)

export const MaterialTokens = () => (
  <div>
    <MaterialBand
      id="shadows"
      title="Shadows"
      description="Elevation from a hairline edge up to high-focus overlays."
      valueLabel="Level"
      rows={shadows.map((shadow) => ({
        className: shadow.className,
        usage: shadow.usage,
        value: shadow.level,
        preview: (
          <span
            aria-hidden
            className={`size-12 rounded-xl bg-surface ${shadow.className}`}
          />
        ),
      }))}
    />
    <MaterialBand
      id="radius"
      title="Radius"
      description="Corner rounding from tight chips to full pills."
      valueLabel="Size"
      rows={radii.map((radius) => ({
        className: radius.className,
        usage: radius.usage.replace(/\.$/, ""),
        value: radius.px,
        preview: (
          <span
            aria-hidden
            className={`size-12 border border-border-primary bg-background-tertiary ${radius.className}`}
          />
        ),
      }))}
    />
  </div>
)
