"use client"

import {
  Button,
  Command,
  CommandActions,
  CommandBackdrop,
  CommandClear,
  CommandClose,
  CommandContent,
  CommandDialogTitle,
  CommandDivider,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
  CommandMeta,
  CommandPopup,
  CommandPortal,
  CommandTitle,
  CommandToolbar,
  CommandTrigger,
  FilterGroup,
  FilterItem,
  IconMagnifyingGlass,
  Kbd,
  KbdGroup,
} from "@boyernick/standard-ui-react"
import { useRouter } from "next/navigation"
import {
  useEffect,
  useId,
  useMemo,
  useState,
  type KeyboardEvent,
} from "react"
import { allPages, pageSection, sectionLabels } from "@/lib/nav"

const filters = ["All", ...sectionLabels]

export const SiteSearch = () => {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [filter, setFilter] = useState("All")
  const [activeIndex, setActiveIndex] = useState(-1)
  const optionPrefix = useId()

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    const scoped =
      filter === "All"
        ? allPages
        : allPages.filter((page) => pageSection(page.href) === filter)

    if (!normalized) return scoped
    return scoped.filter((page) =>
      page.label.toLowerCase().includes(normalized),
    )
  }, [filter, query])

  const highlightedIndex =
    activeIndex >= 0 && results.length > 0
      ? Math.min(activeIndex, results.length - 1)
      : -1

  const activeOptionId =
    highlightedIndex >= 0
      ? `${optionPrefix}${results[highlightedIndex]?.href}`
      : undefined

  useEffect(() => {
    const handleGlobalKeyDown = (event: globalThis.KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault()
        setOpen((current) => !current)
      }
    }

    window.addEventListener("keydown", handleGlobalKeyDown)
    return () => window.removeEventListener("keydown", handleGlobalKeyDown)
  }, [])

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen)
    if (!nextOpen) {
      setQuery("")
      setFilter("All")
      setActiveIndex(-1)
    }
  }

  const goTo = (href: string) => {
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
      const page = results[highlightedIndex]
      if (page) goTo(page.href)
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
          <Button
            type="button"
            variant="ghost"
            size="md"
            iconOnly
            rounded
            aria-label="Search"
            className="group md:hidden"
          />
        }
      >
        <IconMagnifyingGlass
          size={16}
          aria-hidden
          className="text-fg-tertiary transition-colors duration-[var(--duration-sm)] ease-enter group-hover:text-fg-primary group-focus-visible:text-fg-primary motion-reduce:transition-none"
        />
      </CommandTrigger>
      <CommandTrigger
        render={<button type="button" />}
        className="text-sm hidden h-9 w-full max-w-md cursor-pointer items-center gap-2 rounded-lg pr-3 text-fg-tertiary outline-none transition-colors hover:text-fg-secondary focus-visible:ring-[3px] focus-visible:ring-offset-1 focus-visible:ring-offset-background-primary focus-visible:ring-ring/20 md:flex"
      >
        <span className="flex-1 text-left">Search…</span>
        <KbdGroup className="pointer-events-none">
          <Kbd aria-hidden>⌘</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
      </CommandTrigger>
      <CommandPortal>
        <CommandBackdrop />
        <CommandPopup>
          <CommandDialogTitle>Search StandardUI</CommandDialogTitle>
          <CommandToolbar>
            <CommandInput
              placeholder="Search…"
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
            <FilterGroup
              aria-label="Filter pages"
              value={[filter]}
              onValueChange={(value) => {
                const nextFilter = value[0]
                if (!nextFilter) return
                setFilter(nextFilter)
                setActiveIndex(-1)
              }}
            >
              {filters.map((option) => (
                <FilterItem
                  key={option}
                  value={option}
                >
                  {option}
                </FilterItem>
              ))}
            </FilterGroup>
            {results.length === 0 ? (
              <CommandEmpty>No results</CommandEmpty>
            ) : (
              <CommandList aria-label="Pages">
                {results.map((page, index) => (
                  <CommandItem
                    key={page.href}
                    id={`${optionPrefix}${page.href}`}
                    selected={index === highlightedIndex}
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={() => goTo(page.href)}
                  >
                    <CommandTitle>{page.label}</CommandTitle>
                    <CommandMeta>{pageSection(page.href)}</CommandMeta>
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
