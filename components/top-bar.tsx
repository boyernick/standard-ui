"use client"

import { BrandWordmark } from "@boyernick/standard-ui-react"
import Link from "next/link"
import { MobileNav } from "./mobile-nav"
import { SearchDialog } from "./search-dialog"
import { ThemeToggle } from "./theme-toggle"

/**
 * Mobile header. Search used to be an Input here that tracked a query in local
 * state and filtered nothing — the ⌘K handler only focused it. Both the field
 * and the shortcut now belong to SearchDialog, which is also mounted in the
 * sidebar so the desktop layout is not left without search or a theme toggle.
 */
export function TopBar() {
  return (
    <header className="flex h-14 items-center gap-2 border-b border-border-primary bg-background-primary px-3 sm:gap-3 sm:px-4">
      <MobileNav />
      <Link
        href="/"
        className="inline-flex shrink-0 cursor-pointer text-fg-primary outline-none focus-visible:rounded-md focus-visible:ring-[3px] focus-visible:ring-offset-1 focus-visible:ring-offset-background-primary focus-visible:ring-ring/20"
        aria-label="StandardUI"
      >
        <BrandWordmark size="sm" />
      </Link>
      <div className="min-w-0 flex-1">
        <SearchDialog />
      </div>
      <ThemeToggle />
    </header>
  )
}
