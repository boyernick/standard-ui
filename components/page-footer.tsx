"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { PAGE_INNER } from "@/lib/chrome"
import { adjacentPages } from "@/lib/nav"

export const PageFooter = () => {
  const pathname = usePathname()
  const { previous, next } = adjacentPages(pathname)

  if (!previous && !next) return null

  return (
    <nav
      aria-label="Pagination"
      className="mt-4 border-t border-border-primary"
    >
      <div className={`${PAGE_INNER} flex items-stretch justify-between gap-3 py-8`}>
      {previous ? (
        <Link
          href={previous.href}
          className="group flex cursor-pointer flex-col items-start gap-0.5 rounded-md px-2 py-1.5 outline-none focus-visible:ring-[3px] focus-visible:ring-offset-1 focus-visible:ring-offset-background-primary focus-visible:ring-ring/20"
        >
          <span className="text-xs text-fg-tertiary">Previous</span>
          <span className="text-sm text-fg-secondary group-hover:text-fg-primary">
            {previous.label}
          </span>
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link
          href={next.href}
          className="group flex cursor-pointer flex-col items-end gap-0.5 rounded-md px-2 py-1.5 outline-none focus-visible:ring-[3px] focus-visible:ring-offset-1 focus-visible:ring-offset-background-primary focus-visible:ring-ring/20"
        >
          <span className="text-xs text-fg-tertiary">Next</span>
          <span className="text-sm text-fg-secondary group-hover:text-fg-primary">
            {next.label}
          </span>
        </Link>
      ) : (
        <span />
      )}
      </div>
    </nav>
  )
}
