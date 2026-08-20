"use client"

import {
  Command,
  CommandActions,
  CommandBackdrop,
  CommandClear,
  CommandClose,
  CommandContent,
  CommandDialogTitle,
  CommandDivider,
  CommandEmpty,
  CommandFilter,
  CommandFilters,
  CommandInput,
  CommandItem,
  CommandList,
  CommandPopup,
  CommandPortal,
  CommandTitle,
  CommandToolbar,
  CommandTrigger,
  IconMagnifyingGlass,
} from "@boyernick/standard-ui-react"
import { useRouter } from "next/navigation"
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react"

type Heading = { text: string; slug: string; level: "h2" | "h3" }

type PageRecord = {
  path: string
  title: string
  description: string
  headings: Heading[]
  keywords: string[]
}

type Result = {
  key: string
  href: string
  title: string
  context: string
  section: string
  score: number
}

const FILTERS = ["All", "Foundations", "Components"] as const
type Filter = (typeof FILTERS)[number]

const sectionFor = (path: string) =>
  path.startsWith("/components/") ? "Components" : "Foundations"

/**
 * Scored substring match. Ranked so an exact title beats a title prefix, which
 * beats a title hit, which beats a heading, which beats description/keyword
 * text — otherwise "button" surfaces every page that merely mentions buttons
 * above the Button page itself.
 */
const scoreRecord = (record: PageRecord, query: string): Result | null => {
  const title = record.title.toLowerCase()
  const section = sectionFor(record.path)

  if (title === query) {
    return {
      key: record.path,
      href: record.path,
      title: record.title,
      context: record.description,
      section,
      score: 100,
    }
  }
  if (title.startsWith(query)) {
    return {
      key: record.path,
      href: record.path,
      title: record.title,
      context: record.description,
      section,
      score: 80,
    }
  }
  if (title.includes(query)) {
    return {
      key: record.path,
      href: record.path,
      title: record.title,
      context: record.description,
      section,
      score: 60,
    }
  }

  const heading = record.headings.find((item) =>
    item.text.toLowerCase().includes(query),
  )
  if (heading) {
    return {
      key: `${record.path}#${heading.slug}`,
      href: `${record.path}#${heading.slug}`,
      title: `${record.title} › ${heading.text}`,
      context: record.description,
      section,
      score: 40,
    }
  }

  const keyword = record.keywords.find((item) =>
    item.toLowerCase().includes(query),
  )
  if (keyword) {
    return {
      key: `${record.path}?k=${keyword}`,
      href: record.path,
      title: `${record.title} › ${keyword}`,
      context: record.description,
      section,
      score: 30,
    }
  }

  if (record.description.toLowerCase().includes(query)) {
    return {
      key: record.path,
      href: record.path,
      title: record.title,
      context: record.description,
      section,
      score: 20,
    }
  }

  return null
}

export const SearchDialog = ({ trigger }: { trigger?: ReactNode }) => {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [filter, setFilter] = useState<Filter>("All")
  const [activeIndex, setActiveIndex] = useState(-1)
  const [index, setIndex] = useState<PageRecord[] | null>(null)
  const optionPrefix = useId()
  const loadStarted = useRef(false)

  // Fetched on first open rather than imported, so the index stays out of every
  // route bundle. Module-level ref guards against a second request.
  const loadIndex = useCallback(() => {
    if (loadStarted.current) return
    loadStarted.current = true
    void fetch("/search-index.json")
      .then((response) => (response.ok ? response.json() : []))
      .then((data: PageRecord[]) => setIndex(data))
      .catch(() => setIndex([]))
  }, [])

  useEffect(() => {
    const handleGlobalKeyDown = (event: globalThis.KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault()
        loadIndex()
        setOpen((current) => !current)
      }
    }

    window.addEventListener("keydown", handleGlobalKeyDown)
    return () => window.removeEventListener("keydown", handleGlobalKeyDown)
  }, [loadIndex])

  const results = useMemo(() => {
    if (!index) return []
    const normalized = query.trim().toLowerCase()
    const scoped =
      filter === "All"
        ? index
        : index.filter((record) => sectionFor(record.path) === filter)

    // With no query the palette is a browsable index, not an empty box.
    if (!normalized) {
      return scoped.slice(0, 12).map((record) => ({
        key: record.path,
        href: record.path,
        title: record.title,
        context: record.description,
        section: sectionFor(record.path),
        score: 0,
      }))
    }

    return scoped
      .map((record) => scoreRecord(record, normalized))
      .filter((result): result is Result => result !== null)
      .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))
      .slice(0, 20)
  }, [filter, index, query])

  const highlightedIndex =
    activeIndex >= 0 && results.length > 0
      ? Math.min(activeIndex, results.length - 1)
      : -1

  const activeOptionId =
    highlightedIndex >= 0
      ? `${optionPrefix}-${highlightedIndex}`
      : undefined

  const handleOpenChange = (nextOpen: boolean) => {
    if (nextOpen) loadIndex()
    setOpen(nextOpen)
    if (!nextOpen) {
      setQuery("")
      setFilter("All")
      setActiveIndex(-1)
    }
  }

  const go = (href: string) => {
    handleOpenChange(false)
    router.push(href)
  }

  const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault()
      if (results.length === 0) return
      setActiveIndex((current) =>
        current < 0 ? 0 : Math.min(current + 1, results.length - 1),
      )
      return
    }

    if (event.key === "ArrowUp") {
      event.preventDefault()
      if (results.length === 0) return
      setActiveIndex((current) =>
        current <= 0 ? results.length - 1 : current - 1,
      )
      return
    }

    if (event.key === "Enter" && highlightedIndex >= 0) {
      event.preventDefault()
      const target = results[highlightedIndex]
      if (target) go(target.href)
    }
  }

  return (
    <Command
      open={open}
      onOpenChange={handleOpenChange}
      activeOptionId={activeOptionId}
    >
      <CommandTrigger
        render={
          trigger ? (
            (trigger as React.ReactElement)
          ) : (
            <button
              type="button"
              onMouseEnter={loadIndex}
              className="text-sm flex h-8 w-full cursor-pointer items-center gap-2 rounded-md border border-border-primary bg-background-secondary px-2.5 text-fg-tertiary outline-none transition-colors hover:bg-background-tertiary hover:text-fg-secondary focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-offset-1 focus-visible:ring-offset-background-primary focus-visible:ring-ring/20"
            />
          )
        }
      >
        <IconMagnifyingGlass size={16} aria-hidden />
        <span className="flex-1 text-left">Search…</span>
        <kbd className="text-2xs rounded-xs border border-border-primary bg-surface px-1.5 py-0.5 text-fg-tertiary">
          ⌘K
        </kbd>
      </CommandTrigger>
      <CommandPortal>
        <CommandBackdrop />
        <CommandPopup>
          <CommandDialogTitle>Search documentation</CommandDialogTitle>
          <CommandToolbar>
            <CommandInput
              placeholder="Search components, foundations, sections…"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value)
                setActiveIndex(-1)
              }}
              onKeyDown={handleInputKeyDown}
            />
            <CommandActions>
              {query ? (
                <>
                  <CommandClear
                    data-active="true"
                    onClick={() => {
                      setQuery("")
                      setActiveIndex(-1)
                    }}
                  />
                  <CommandDivider />
                </>
              ) : null}
              <CommandClose />
            </CommandActions>
          </CommandToolbar>
          <CommandContent>
            <CommandFilters aria-label="Filter results">
              {FILTERS.map((option) => (
                <CommandFilter
                  key={option}
                  selected={filter === option}
                  onClick={() => {
                    setFilter(option)
                    setActiveIndex(-1)
                  }}
                >
                  {option}
                </CommandFilter>
              ))}
            </CommandFilters>
            {results.length === 0 ? (
              <CommandEmpty>
                {index === null ? "Loading…" : "No results"}
              </CommandEmpty>
            ) : (
              <CommandList aria-label="Search results">
                {results.map((result, resultIndex) => (
                  <CommandItem
                    key={result.key}
                    id={`${optionPrefix}-${resultIndex}`}
                    selected={resultIndex === highlightedIndex}
                    onMouseEnter={() => setActiveIndex(resultIndex)}
                    onClick={() => go(result.href)}
                  >
                    <CommandTitle>{result.title}</CommandTitle>
                    <span className="text-xs shrink-0 text-fg-tertiary">
                      {result.section}
                    </span>
                  </CommandItem>
                ))}
              </CommandList>
            )}
          </CommandContent>
        </CommandPopup>
      </CommandPortal>
    </Command>
  )
}
