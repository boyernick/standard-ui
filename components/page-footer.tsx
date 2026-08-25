"use client"

import { cn, focusRing, focusRingBorder } from "@boyernick/standard-ui-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect } from "react"
import { PAGE_INNER } from "@/lib/chrome"
import { adjacentPages } from "@/lib/nav"

const INTERACTIVE_SELECTOR = [
  "a",
  "button",
  "input",
  "select",
  "textarea",
  "[contenteditable]:not([contenteditable='false'])",
  "[role='button']",
  "[role='combobox']",
  "[role='dialog']",
  "[role='link']",
  "[role='listbox']",
  "[role='menu']",
  "[role='menuitem']",
  "[role='option']",
  "[role='slider']",
  "[role='tab']",
  "[role='textbox']",
].join(",")

const blocksArrowPagination = (event: KeyboardEvent) => {
  if (
    event.defaultPrevented ||
    event.repeat ||
    event.altKey ||
    event.ctrlKey ||
    event.metaKey ||
    event.shiftKey
  ) {
    return true
  }

  const selection = window.getSelection()
  if (selection && !selection.isCollapsed) return true

  return (
    event.target instanceof Element &&
    event.target.closest(INTERACTIVE_SELECTOR) !== null
  )
}

export const PageFooter = () => {
  const pathname = usePathname()
  const router = useRouter()
  const { previous, next } = adjacentPages(pathname)
  const previousHref = previous?.href
  const nextHref = next?.href

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        (event.key !== "ArrowLeft" && event.key !== "ArrowRight") ||
        blocksArrowPagination(event)
      ) {
        return
      }

      const destination =
        event.key === "ArrowLeft" ? previousHref : nextHref
      if (!destination) return

      event.preventDefault()
      router.push(destination)
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [nextHref, previousHref, router])

  if (!previous && !next) return null

  return (
    <nav
      aria-label="Pagination"
      className="fixed inset-x-0 bottom-0 z-30 h-28 border-t border-border-primary bg-background-primary md:left-60"
    >
      <div
        className={`${PAGE_INNER} flex h-full items-stretch justify-between gap-3 py-8`}
      >
        {previous ? (
          <Link
            href={previous.href}
            aria-keyshortcuts="ArrowLeft"
            title="Previous page (Left arrow)"
            className={cn(
              "group flex cursor-pointer flex-col items-start gap-0.5 rounded-md px-2 py-1.5",
              focusRingBorder,
              focusRing,
            )}
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
            aria-keyshortcuts="ArrowRight"
            title="Next page (Right arrow)"
            className={cn(
              "group flex cursor-pointer flex-col items-end gap-0.5 rounded-md px-2 py-1.5",
              focusRingBorder,
              focusRing,
            )}
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
