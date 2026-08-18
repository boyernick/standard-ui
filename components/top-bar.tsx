"use client"

import { IconFormCircle } from "@central-icons-react/round-outlined-radius-2-stroke-2/IconFormCircle"
import { IconMagnifyingGlass } from "@central-icons-react/round-outlined-radius-2-stroke-2/IconMagnifyingGlass"
import Link from "next/link"
import { ThemeToggle } from "./theme-toggle"

export function TopBar() {
  return (
    <header className="flex h-14 items-center gap-3 border-b border-border-primary bg-background-primary px-4 md:px-6">
      <Link
        href="/"
        className="text-sm-strong inline-flex shrink-0 items-center gap-1 text-fg-primary md:hidden"
        aria-label="UI"
      >
        <IconFormCircle size={16} mode="raw" aria-hidden />
        UI
      </Link>
      <div className="relative min-w-0 flex-1">
        <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-fg-tertiary">
          <IconMagnifyingGlass size={16} aria-hidden />
        </span>
        <input
          type="search"
          readOnly
          placeholder="Search…"
          aria-label="Search"
          className="text-sm h-9 w-full rounded-lg border border-border-primary bg-surface pr-16 pl-9 text-fg-primary placeholder:text-fg-quaternary"
        />
        <kbd className="text-xs pointer-events-none absolute top-1/2 right-2.5 -translate-y-1/2 rounded-md border border-border-primary bg-background-tertiary px-1.5 py-0.5 text-fg-tertiary">
          ⌘K
        </kbd>
      </div>
      <ThemeToggle />
    </header>
  )
}
