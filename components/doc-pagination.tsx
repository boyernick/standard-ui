"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { getAdjacentPages } from "@/lib/nav"

/**
 * Previous/next in reading order. Pages were dead ends before this — every
 * reference system this one is measured against lets you walk the docs without
 * returning to the sidebar.
 *
 * Order comes from lib/nav.ts, the same arrays the sidebar renders, so the two
 * cannot disagree.
 */
export const DocPagination = () => {
  const pathname = usePathname()
  const { previous, next } = getAdjacentPages(pathname)

  if (!previous && !next) return null

  const linkClass =
    "group flex min-w-0 flex-1 cursor-pointer flex-col gap-1 rounded-lg border border-border-primary px-4 py-3 outline-none transition-colors hover:bg-background-tertiary focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-offset-1 focus-visible:ring-offset-background-primary focus-visible:ring-ring/20"

  return (
    <nav
      aria-label="Pagination"
      className="mt-16 flex gap-3 border-t border-border-primary pt-8"
    >
      {previous ? (
        <Link href={previous.href} className={linkClass}>
          <span className="text-xs text-fg-quaternary">Previous</span>
          <span className="text-sm-strong truncate text-fg-primary">
            {previous.label}
          </span>
        </Link>
      ) : (
        <span className="flex-1" />
      )}
      {next ? (
        <Link href={next.href} className={`${linkClass} text-right`}>
          <span className="text-xs text-fg-quaternary">Next</span>
          <span className="text-sm-strong truncate text-fg-primary">
            {next.label}
          </span>
        </Link>
      ) : (
        <span className="flex-1" />
      )}
    </nav>
  )
}
