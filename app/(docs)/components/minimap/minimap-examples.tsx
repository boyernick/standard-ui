"use client"

import {
  Minimap,
  type MinimapSection,
} from "@boyernick/standard-ui-react"
import { useState } from "react"
import { DocBand } from "@/components/doc-band"

const articleSections = [
  {
    id: "minimap-article-overview",
    label: "Overview",
    title: "Overview",
    copy: "A minimap compresses a long document into a small set of addressable landmarks.",
  },
  {
    id: "minimap-article-principles",
    label: "Principles",
    title: "Principles",
    copy: "Each tick carries an accessible name while its label stays out of the reading flow until hover or focus.",
  },
  {
    id: "minimap-article-planning",
    label: "Planning",
    title: "Planning",
    copy: "The order of the marks mirrors the order of the sections, preserving a quick sense of progress.",
  },
  {
    id: "minimap-article-focus",
    label: "Focus",
    title: "Focus",
    copy: "Selecting a mark moves the nearest scroll region and updates the current location for assistive technology.",
  },
  {
    id: "minimap-article-review",
    label: "Review",
    title: "Review",
    copy: "Arrow keys move between marks, while reduced-motion preferences replace smooth movement with an immediate jump.",
  },
] as const

const minimapSections: readonly MinimapSection[] = articleSections.map(
  ({ id, label }) => ({ id, label }),
)

const pageSections: readonly MinimapSection[] = [
  { id: "scroll-region", label: "Scroll region" },
  { id: "page-navigation", label: "Page navigation" },
]

const ScrollRegionExample = () => {
  const [root, setRoot] = useState<HTMLDivElement | null>(null)
  const [activeId, setActiveId] = useState(minimapSections[0]?.id ?? null)
  const activeLabel =
    minimapSections.find((section) => section.id === activeId)?.label ??
    "Overview"

  return (
    <div>
      <div className="grid h-96 grid-cols-[64px_minmax(0,1fr)] overflow-hidden rounded-xl border border-border-primary bg-surface">
        <div className="flex items-center justify-center border-r border-border-primary bg-background-secondary">
          <Minimap
            aria-label="Article sections"
            activeId={activeId}
            onActiveChange={setActiveId}
            position="inline"
            root={root}
            sections={minimapSections}
          />
        </div>
        <div ref={setRoot} className="overflow-y-auto px-7 py-6">
          {articleSections.map((section, index) => (
            <section
              key={section.id}
              id={section.id}
              className="min-h-64 scroll-mt-6 border-b border-border-primary py-2 last:min-h-80 last:border-0"
            >
              <span className="text-xs text-fg-tertiary">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="heading-sm mt-2 text-fg-primary">
                {section.title}
              </h3>
              <p className="text-sm mt-2 max-w-md text-fg-secondary">
                {section.copy}
              </p>
            </section>
          ))}
        </div>
      </div>
      <p className="text-xs mt-3 text-fg-tertiary" aria-live="polite">
        Current section: <span className="text-fg-secondary">{activeLabel}</span>
      </p>
    </div>
  )
}

export const MinimapExamples = () => (
  <div>
    <DocBand
      first
      id="scroll-region"
      title="Scroll region"
      description="Ticks mirror the sections and scroll to them."
      contentClassName="max-w-2xl"
    >
      <ScrollRegionExample />
    </DocBand>

    <DocBand
      id="page-navigation"
      title="Page navigation"
      description="Inline for composed surfaces, fixed for the viewport."
      contentClassName="max-w-lg"
    >
      <div className="flex items-center gap-6 rounded-xl border border-border-primary bg-surface p-5">
        <div className="flex h-28 w-14 shrink-0 items-center justify-center rounded-lg bg-background-secondary">
          <Minimap
            aria-label="Example sections"
            position="inline"
            sections={pageSections}
          />
        </div>
        <div>
          <p className="text-sm-strong text-fg-primary">Two placements</p>
          <p className="text-sm mt-1 text-fg-secondary">
            Use <code className="font-mono text-xs">inline</code> inside a
            scroll region, or keep the default fixed placement for long pages.
          </p>
        </div>
      </div>
    </DocBand>
  </div>
)
