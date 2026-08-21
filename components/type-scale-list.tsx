"use client"

import { useState } from "react"
import { typeScale, type TypeSpecimen } from "@/lib/type-scale"
import { PAGE_INNER } from "@/lib/chrome"

/** Rogo's comparison-table spacing: columns share the width proportionally
 *  rather than hugging their content, and every column after the identity one
 *  right-aligns. Content then sits on the column edges, so the leftover width
 *  reads as even column rhythm instead of a void in the middle of the row.
 *  `minmax(max-content, …fr)` keeps a column from collapsing under its content;
 *  the band owns the tracks and each row is a subgrid, so widths stay in sync
 *  per band without hand-measuring. */
const BAND =
  "mt-6 sm:grid sm:grid-cols-[minmax(max-content,2fr)_minmax(max-content,1.5fr)_repeat(4,minmax(max-content,1fr))] sm:gap-x-6"

/** Header and rows span the band and inherit its tracks. */
const SUBGRID = "sm:col-span-6 sm:grid sm:grid-cols-subgrid sm:gap-x-6"

/** Metrics read as one group: tighter internal gaps than the column gap. */
const METRIC_GROUP =
  "flex flex-wrap gap-3 sm:col-start-3 sm:col-span-4 sm:grid sm:grid-cols-subgrid sm:gap-x-6"

const COLUMNS = `grid grid-cols-1 items-center gap-2 ${SUBGRID} sm:items-center`

const HEADER_COLUMNS = `grid grid-cols-1 gap-2 ${SUBGRID}`

const METRIC_HEAD = "text-xs-strong text-fg-tertiary sm:text-right"

const METRIC = "text-xs font-mono text-fg-secondary tabular-nums sm:text-right"

/** Inline code renders as a chip, the way it appears in running prose. */
const CODE_CHIP =
  "rounded-md border border-border-primary bg-background-secondary px-1.5 py-0.5"

const GROUPS = [
  {
    id: "headings",
    title: "Headings",
    description: "Söhne display type from 2xl to xs.",
    match: (item: TypeSpecimen) =>
      item.group === "heading" && item.family === "Söhne",
  },
  {
    id: "serif-headings",
    title: "Serif headings",
    description: "Signifier at lg and above, where display type earns it.",
    match: (item: TypeSpecimen) =>
      item.group === "heading" && item.family === "Signifier",
  },
  {
    id: "body",
    title: "Body",
    description: "Body copy from lg to xs, each with a strong variant.",
    match: (item: TypeSpecimen) => item.group === "body",
  },
  {
    id: "code",
    title: "Code",
    description: "Inline code for props, identifiers, and snippets.",
    match: (item: TypeSpecimen) => item.group === "code",
  },
]

const styleLabel = (item: TypeSpecimen) => {
  if (item.family === "Signifier") return "Serif"
  if (item.family === "Söhne Mono") return "Mono"
  return "Sans"
}

const SpecimenRow = ({ item }: { item: TypeSpecimen }) => {
  const [copied, setCopied] = useState(false)
  const isCode = item.group === "code"

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(item.token)
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
      title={`Copy ${item.token}`}
      className={`${COLUMNS} w-full cursor-copy border-b border-border-primary-solid py-3 text-left outline-none transition-colors last:border-b-0 hover:bg-background-secondary focus-visible:bg-background-secondary focus-visible:ring-[3px] focus-visible:ring-inset focus-visible:ring-ring/20`}
    >
      {/* `truncate` guards the column horizontally, but its overflow:hidden
          also clips ascenders and descenders — the glyph box runs ~8px past
          the line box at 2xl. Vertical padding gives them room to render. */}
      <span className="min-w-0 truncate py-2 text-fg-primary">
        <span className={`${item.className} ${isCode ? CODE_CHIP : ""}`}>
          {item.sample}
        </span>
      </span>
      <span className="text-sm min-w-0 truncate font-mono text-fg-secondary">
        {copied ? "Copied" : item.token}
      </span>
      <div className={METRIC_GROUP}>
        <span className={METRIC}>{styleLabel(item)}</span>
        <code className={METRIC}>{item.size}</code>
        <code className={METRIC}>{item.weight}</code>
        <code className={METRIC}>{item.lineHeight}</code>
      </div>
      <span className="sr-only">{copied ? "Copied" : item.token}</span>
    </button>
  )
}

export const TypeScaleList = () => (
  <div>
    {GROUPS.map((group, index) => (
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
              className={`${HEADER_COLUMNS} hidden border-b border-border-primary pb-2 sm:grid`}
            >
              <span className="text-xs-strong text-fg-tertiary">Example</span>
              <span className="text-xs-strong text-fg-tertiary">Class</span>
              <div className={METRIC_GROUP}>
                <span className={METRIC_HEAD}>Style</span>
                <span className={METRIC_HEAD}>Size</span>
                <span className={METRIC_HEAD}>Weight</span>
                <span className={METRIC_HEAD}>Line</span>
              </div>
            </div>
            {typeScale.filter(group.match).map((item) => (
              <SpecimenRow key={item.token} item={item} />
            ))}
          </div>
        </div>
      </section>
    ))}

    <section
      aria-labelledby="in-context"
      className="border-t border-border-primary"
    >
      <div className={`${PAGE_INNER} py-10`}>
        <h2 id="in-context" className="heading-sm text-fg-primary">
          In context
        </h2>
        <p className="text-sm mt-1 max-w-2xl text-fg-secondary">
          Inline code flows within prose without breaking the line.
        </p>
        <p className="text-md mt-6 max-w-2xl text-fg-secondary">
          Pass a{" "}
          <code className={`text-sm font-mono ${CODE_CHIP}`}>variant</code> prop
          to <code className={`text-sm font-mono ${CODE_CHIP}`}>Button</code> and
          it resolves{" "}
          <code className={`text-sm font-mono ${CODE_CHIP}`}>
            bg-brand-primary
          </code>{" "}
          without any extra styling.
        </p>
      </div>
    </section>
  </div>
)
