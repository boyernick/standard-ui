"use client"

import {
  BrandWordmark,
  IconMagnifyingGlass,
  Input,
} from "@standard-ui/react"
import Link from "next/link"
import { useEffect, useRef, useState, type ChangeEvent, type KeyboardEvent } from "react"
import { MobileNav } from "./mobile-nav"
import { ThemeToggle } from "./theme-toggle"

export function TopBar() {
  const [query, setQuery] = useState("")
  const [focused, setFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleGlobalKeyDown = (event: globalThis.KeyboardEvent) => {
      const target = event.target as HTMLElement | null
      if (target?.closest("input, textarea, select, [contenteditable=true]")) {
        return
      }
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault()
        inputRef.current?.focus()
        inputRef.current?.select()
      }
    }

    window.addEventListener("keydown", handleGlobalKeyDown)
    return () => {
      window.removeEventListener("keydown", handleGlobalKeyDown)
    }
  }, [])

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      if (query) {
        setQuery("")
        return
      }
      inputRef.current?.blur()
    }
  }

  const handleFocus = () => {
    setFocused(true)
  }

  const handleBlur = () => {
    setFocused(false)
  }

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
      <div className="relative min-w-0 flex-1">
        <span className="pointer-events-none absolute top-1/2 left-3 z-10 -translate-y-1/2 text-fg-tertiary">
          <IconMagnifyingGlass size={16} aria-hidden />
        </span>
        <Input
          ref={inputRef}
          type="text"
          inputMode="search"
          enterKeyHint="search"
          name="q"
          role="searchbox"
          variant="ghost"
          value={query}
          onChange={handleQueryChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="Search…"
          aria-label="Search"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          className="rounded-lg bg-background-secondary pr-16 pl-9"
        />
        {!focused && !query ? (
          <kbd className="text-xs pointer-events-none absolute top-1/2 right-2.5 inline-flex -translate-y-1/2 items-center gap-1 rounded-md border border-border-primary bg-background-tertiary px-1.5 py-0.5 text-fg-tertiary">
            <span aria-hidden>⌘</span>
            <span>K</span>
          </kbd>
        ) : null}
      </div>
      <ThemeToggle />
    </header>
  )
}
