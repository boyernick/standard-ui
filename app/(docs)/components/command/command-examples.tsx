"use client"

import {
  useEffect,
  useId,
  useMemo,
  useState,
  type KeyboardEvent,
} from "react"
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
  CommandFilter,
  CommandFilters,
  CommandInput,
  CommandItem,
  CommandList,
  CommandPortal,
  CommandPopup,
  CommandTitle,
  CommandToolbar,
  CommandTrigger,
  IconMagnifyingGlass,
} from "@boyernick/standard-ui-react"
import { ComponentCanvas } from "@/components/component-canvas"

type Article = {
  slug: string
  title: string
  category: string
}

const articles: Article[] = [
  {
    slug: "first-principles",
    title: "First principles",
    category: "Mental models",
  },
  {
    slug: "doing-less-is-more",
    title: "Doing less is more",
    category: "Productivity",
  },
  { slug: "lexicon", title: "Lexicon", category: "Notes" },
]

const filters = [
  "All",
  ...Array.from(new Set(articles.map((article) => article.category))).sort(),
]

export const CommandExamples = () => {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [filter, setFilter] = useState("All")
  const [activeIndex, setActiveIndex] = useState(-1)
  const optionPrefix = useId()

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    const categoryFiltered =
      filter === "All"
        ? articles
        : articles.filter((article) => article.category === filter)

    if (!normalized) return categoryFiltered

    return categoryFiltered.filter((article) => {
      const haystack =
        `${article.title} ${article.category}`.toLowerCase()
      return haystack.includes(normalized)
    })
  }, [filter, query])

  const highlightedIndex =
    activeIndex >= 0 && results.length > 0
      ? Math.min(activeIndex, results.length - 1)
      : -1

  const activeOptionId =
    highlightedIndex >= 0
      ? `${optionPrefix}-${results[highlightedIndex]?.slug}`
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
      handleOpenChange(false)
    }
  }

  return (
    <div className="mt-6 flex flex-col gap-8">
      <ComponentCanvas label="Search">
        <Command
          open={open}
          onOpenChange={handleOpenChange}
          activeOptionId={activeOptionId}
        >
          <CommandTrigger
            render={
              <Button
                variant="outline"
                prefix={<IconMagnifyingGlass size={16} aria-hidden />}
              />
            }
          >
            Search…
            <kbd className="text-xs ml-2 rounded-xs border border-border-primary bg-background-secondary px-1.5 py-0.5 text-fg-tertiary">
              ⌘K
            </kbd>
          </CommandTrigger>
          <CommandPortal>
            <CommandBackdrop />
            <CommandPopup>
              <CommandDialogTitle>Search articles</CommandDialogTitle>
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
                <CommandFilters aria-label="Filter articles">
                  {filters.map((option) => (
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
                  <CommandEmpty>No results</CommandEmpty>
                ) : (
                  <CommandList aria-label="Articles">
                    {results.map((article, index) => (
                      <CommandItem
                        key={article.slug}
                        id={`${optionPrefix}-${article.slug}`}
                        selected={index === highlightedIndex}
                        onMouseEnter={() => setActiveIndex(index)}
                        onClick={() => handleOpenChange(false)}
                      >
                        <CommandTitle>{article.title}</CommandTitle>
                      </CommandItem>
                    ))}
                  </CommandList>
                )}
              </CommandContent>
            </CommandPopup>
          </CommandPortal>
        </Command>
      </ComponentCanvas>
    </div>
  )
}
