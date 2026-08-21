"use client"

import { useEffect, useState } from "react"
import {
  semanticColorGroups,
  type ColorPrefix,
  type ColorToken,
} from "@/lib/semantic-colors"
import { PAGE_INNER } from "@/lib/chrome"

/** Shared column template so the header and every row line up.
 *  Tracks are fixed rather than `auto`: the header and the rows are separate
 *  grids, so an `auto` track resolves to a different width in each and the
 *  column titles drift off their content. Each is sized to its widest value,
 *  with the slack collected in a trailing 1fr so it sits outside the table
 *  instead of opening gaps between the columns. */
// The 1fr sits in the middle so the left cluster stays tight while Value and
// Alpha stay flush to the right edge — a trailing 1fr pushes them inward.
/** Rogo's comparison-table spacing: columns share the width proportionally
 *  rather than hugging their content, and the value columns right-align so
 *  content sits on the column edges — the leftover width then reads as even
 *  column rhythm instead of a void in the middle of the row. The band owns the
 *  tracks and each row is a subgrid, so widths stay in sync per band. */
const BAND =
  "mt-6 sm:grid sm:grid-cols-[3rem_minmax(max-content,2fr)_minmax(max-content,2fr)_minmax(max-content,1fr)_minmax(max-content,1fr)] sm:gap-x-6"

/** Header and rows span the band and inherit its tracks. */
const SUBGRID = "sm:col-span-5 sm:grid sm:grid-cols-subgrid sm:gap-x-6"

/** Values read as one group: tighter internal gaps than the column gap. */
const VALUE_GROUP =
  "hidden sm:col-start-4 sm:col-span-2 sm:grid sm:grid-cols-subgrid sm:gap-x-6"

const COLUMNS = `grid grid-cols-[3rem_1fr] items-center gap-4 ${SUBGRID} sm:items-center`

const HEADER_COLUMNS = `grid grid-cols-[3rem_1fr] gap-4 ${SUBGRID}`

const METRIC = "text-xs font-mono text-fg-secondary tabular-nums sm:text-right"

type TokenValue = { value: string; alpha?: string }

const expandHex = (raw: string) => {
  const hex = /^#([0-9a-f]{3,8})$/i.exec(raw)
  if (!hex) return null
  const digits = hex[1]
  const full =
    digits.length === 3 || digits.length === 4
      ? digits
          .split("")
          .map((d) => d + d)
          .join("")
      : digits
  return `#${full.toUpperCase()}`
}

/** `#fff` → `#FFFFFF`; color-mix alphas split into a hex and its opacity. */
const parseValue = (raw: string): TokenValue => {
  const value = raw.trim()

  const mix = /color-mix\([^,]+,\s*(#[0-9a-f]{3,8})\s+([\d.]+)%/i.exec(value)
  if (mix) {
    return { value: expandHex(mix[1]) ?? mix[1], alpha: `${mix[2]}%` }
  }

  return { value: expandHex(value) ?? value }
}

/** Reads the live value of each token, re-reading when the theme flips. */
const useTokenValues = () => {
  const [values, setValues] = useState<Record<string, TokenValue>>({})

  useEffect(() => {
    const read = () => {
      const styles = getComputedStyle(document.documentElement)
      const next: Record<string, TokenValue> = {}
      for (const group of semanticColorGroups) {
        for (const token of group.tokens) {
          next[token.name] = parseValue(styles.getPropertyValue(token.cssVar))
        }
      }
      setValues(next)
    }

    read()
    const observer = new MutationObserver(read)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })
    return () => observer.disconnect()
  }, [])

  return values
}

const Swatch = ({
  token,
  prefix,
}: {
  token: ColorToken
  prefix: ColorPrefix
}) =>
  prefix === "border" ? (
    <span
      aria-hidden
      className="size-12 rounded-lg border-2 bg-surface"
      style={{ borderColor: `var(${token.cssVar})` }}
    />
  ) : (
    <span
      aria-hidden
      className="size-12 rounded-lg border border-border-primary"
      style={{ backgroundColor: `var(${token.cssVar})` }}
    />
  )

const TokenRow = ({
  token,
  prefix,
  value,
}: {
  token: ColorToken
  prefix: ColorPrefix
  value?: TokenValue
}) => {
  const [copied, setCopied] = useState(false)
  const className = `${prefix}-${token.name}`

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(className)
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
      title={`Copy ${className}`}
      className={`${COLUMNS} w-full cursor-copy border-b border-border-primary-solid py-3 last:border-b-0 text-left outline-none transition-colors hover:bg-background-secondary focus-visible:bg-background-secondary focus-visible:ring-[3px] focus-visible:ring-inset focus-visible:ring-ring/20`}
    >
      <Swatch token={token} prefix={prefix} />
      <span className="text-sm min-w-0 truncate font-mono text-fg-primary">
        {className}
      </span>
      <span className="text-sm hidden min-w-0 text-fg-secondary sm:block">
        {copied ? "Copied" : token.usage}
      </span>
      <div className={VALUE_GROUP}>
        <code className={METRIC}>{value?.value ?? "—"}</code>
        {value?.alpha ? (
          <code className={METRIC}>{value.alpha}</code>
        ) : (
          <span className={METRIC}>—</span>
        )}
      </div>
      <span className="sr-only">{copied ? "Copied" : className}</span>
    </button>
  )
}

export const ColorTokens = () => {
  const values = useTokenValues()

  return (
    <div>
      {semanticColorGroups.map((group, index) => (
        <section
          key={group.id}
          aria-labelledby={group.id}
          className={index === 0 ? "pt-0" : "border-t border-border-primary"}
        >
          <div className={`${PAGE_INNER} py-10`}>
            <h2 id={group.id} className="heading-sm text-fg-primary">
              {group.title}
            </h2>
            <p className="text-sm mt-1 max-w-2xl text-fg-secondary">
              {group.description}
            </p>

            <div className={BAND}>
              <div
                className={`${HEADER_COLUMNS} border-b border-border-primary pb-2`}
              >
                <span className="text-xs-strong text-fg-tertiary">Color</span>
                <span className="text-xs-strong text-fg-tertiary">
                  Class
                </span>
                <span className="text-xs-strong hidden text-fg-tertiary sm:block">
                  Usage
                </span>
                <div className={VALUE_GROUP}>
                  <span className="text-xs-strong text-fg-tertiary sm:text-right">
                    Value
                  </span>
                  <span className="text-xs-strong text-fg-tertiary sm:text-right">
                    Alpha
                  </span>
                </div>
              </div>
              {group.tokens.map((token) => (
                <TokenRow
                  key={token.name}
                  token={token}
                  prefix={token.prefix ?? group.prefix}
                  value={values[token.name]}
                />
              ))}
            </div>
          </div>
        </section>
      ))}
    </div>
  )
}
