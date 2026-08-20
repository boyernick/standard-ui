"use client"

import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

type Entry = { id: string; text: string; level: 2 | 3 }

/**
 * Which heading is "current" given each heading's distance from the top of the
 * viewport, in document order.
 *
 * Pure so it can be reasoned about and tested without a browser: the DOM part
 * is just measuring, and this is the part with the edge cases.
 *
 * Deliberately not IntersectionObserver. The obvious version — highlight
 * whichever heading intersects a band near the top — goes stale as soon as you
 * are reading inside a section taller than the band, because nothing intersects
 * at all and the highlight is left wherever it last was.
 */
export const pickActiveIndex = (
  tops: number[],
  { mark = 120, atBottom = false }: { mark?: number; atBottom?: boolean } = {},
) => {
  if (tops.length === 0) return -1
  // A page scrolled to its end should highlight its final section even if that
  // heading never climbs above the mark.
  if (atBottom) return tops.length - 1
  let index = 0
  for (let i = 0; i < tops.length; i += 1) {
    if (tops[i]! <= mark) index = i
    else break
  }
  return index
}

/**
 * "On this page", read from the rendered DOM rather than from per-page data.
 *
 * These are TSX pages with no frontmatter, so there is no manifest of headings
 * to plumb through — but components/prose.tsx already gives every h2/h3 an id,
 * so the document itself is the source of truth. That also means a page cannot
 * forget to update its TOC.
 */
export const TableOfContents = () => {
  const pathname = usePathname()
  const [entries, setEntries] = useState<Entry[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    // Everything the TOC needs is measured from the rendered document, so the
    // work happens in one sync() that both the initial pass and the scroll
    // listener call. Reading the DOM rather than a per-page manifest means a
    // page cannot forget to update its own contents list.
    let frame = 0

    const sync = () => {
      frame = 0
      const headings = Array.from(
        document.querySelectorAll<HTMLHeadingElement>("main h2[id], main h3[id]"),
      )

      setEntries((previous) => {
        const next = headings.map((heading) => ({
          id: heading.id,
          // The anchor link is a child of the heading; strip it from the label.
          text: (heading.textContent ?? "").replace(/#$/, "").trim(),
          level: (heading.tagName === "H2" ? 2 : 3) as 2 | 3,
        }))
        const unchanged =
          previous.length === next.length &&
          previous.every((entry, i) => entry.id === next[i]?.id)
        return unchanged ? previous : next
      })

      if (headings.length === 0) return
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2
      const index = pickActiveIndex(
        headings.map((heading) => heading.getBoundingClientRect().top),
        { atBottom },
      )
      const current = headings[index]
      if (current) setActiveId(current.id)
    }

    const schedule = () => {
      if (frame) return
      frame = window.requestAnimationFrame(sync)
    }

    schedule()
    window.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", schedule)
    return () => {
      window.removeEventListener("scroll", schedule)
      window.removeEventListener("resize", schedule)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [pathname])

  if (entries.length < 2) return null

  return (
    <nav aria-labelledby="toc-heading" className="w-56 shrink-0">
      <p
        id="toc-heading"
        className="text-xs-strong px-2 pb-2 text-fg-quaternary"
      >
        On this page
      </p>
      <ul className="flex flex-col gap-0.5 border-l border-border-primary">
        {entries.map((entry) => {
          const active = entry.id === activeId
          return (
            <li key={entry.id}>
              <a
                href={`#${entry.id}`}
                aria-current={active ? "location" : undefined}
                className={`-ml-px block cursor-pointer border-l py-1 pr-2 outline-none transition-colors focus-visible:ring-[3px] focus-visible:ring-offset-1 focus-visible:ring-offset-background-primary focus-visible:ring-ring/20 ${
                  entry.level === 3 ? "pl-5 text-xs" : "pl-3 text-sm"
                } ${
                  active
                    ? "border-fg-primary text-fg-primary"
                    : "border-transparent text-fg-tertiary hover:text-fg-secondary"
                }`}
              >
                {entry.text}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
