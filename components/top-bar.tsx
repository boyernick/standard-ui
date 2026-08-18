"use client"

import {
  IconMagnifyingGlass,
  Input,
} from "@standard-ui/react"
import { IconFormCircle } from "@central-icons-react/round-outlined-radius-2-stroke-2/IconFormCircle"
import Link from "next/link"
import { useEffect, useRef, useState, type ChangeEvent, type KeyboardEvent } from "react"
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
