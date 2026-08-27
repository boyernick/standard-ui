"use client"

import {
  useEffect,
  useId,
  useMemo,
  useState,
  type KeyboardEvent,
  type ReactNode,
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
  CommandInput,
  CommandItem,
  CommandList,
  CommandMeta,
  CommandPortal,
  CommandPopup,
  CommandTitle,
  CommandToolbar,
  CommandTrigger,
  FilterGroup,
  FilterItem,
  IconMagnifyingGlass,
  Kbd,
  KbdGroup,
} from "@boyernick/standard-ui-react"
import { DocBand } from "@/components/doc-band"
import { navGroups } from "@/lib/nav"

type Entry = {
  slug: string
  title: string
  category: string
}

/** Every page in the sidebar, so the specimen can't drift out of sync with
 *  the real navigation the way a hand-listed subset would. */
const entries: Entry[] = navGroups.flatMap((group) =>
  group.items.map((item) => ({
    // Hrefs carry slashes, which are awkward inside an element id.
    slug: item.href.split("/").filter(Boolean).join("-") || "introduction",
    title: item.label,
    category: group.label,
  })),
)

const filters = [
  "All",
  ...Array.from(new Set(entries.map((entry) => entry.category))).sort(),
]

/** The whole menu, minus the control that opens it — so each band can show
 *  a different trigger against an otherwise identical specimen. */
const SearchCommand = ({ trigger }: { trigger: ReactNode }) => {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [filter, setFilter] = useState("All")
  const [activeIndex, setActiveIndex] = useState(-1)
  const optionPrefix = useId()

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    const categoryFiltered =
      filter === "All"
        ? entries
        : entries.filter((entry) => entry.category === filter)

    if (!normalized) return categoryFiltered

    return categoryFiltered.filter((entry) => {
      const haystack =
        `${entry.title} ${entry.category}`.toLowerCase()
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
    <Command
      open={open}
      onOpenChange={handleOpenChange}
      activeOptionId={activeOptionId}
    >
      {trigger}
          <CommandPortal>
            <CommandBackdrop />
            <CommandPopup>
              <CommandDialogTitle>Search the system</CommandDialogTitle>
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
                  aria-label="Filter by section"
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
                    {results.map((entry, index) => (
                      <CommandItem
                        key={entry.slug}
                        id={`${optionPrefix}-${entry.slug}`}
                        selected={index === highlightedIndex}
                        onMouseEnter={() => setActiveIndex(index)}
                        onClick={() => handleOpenChange(false)}
                      >
                        <CommandTitle>{entry.title}</CommandTitle>
                        <CommandMeta>{entry.category}</CommandMeta>
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

export const CommandExamples = () => (
  <div>
    <DocBand
      first
      id="default"
      title="Default"
      description="Opens on ⌘K, filters by category, and moves with the arrow keys."
      contentClassName="max-w-sm"
    >
      <SearchCommand
        trigger={
          <CommandTrigger
            render={
              <Button variant="outline" className="w-full justify-between pr-2.5" />
            }
          >
            Search…
            <KbdGroup>
              <Kbd aria-hidden>⌘</Kbd>
              <Kbd>K</Kbd>
            </KbdGroup>
          </CommandTrigger>
        }
      />
    </DocBand>

    <DocBand
      id="icon"
      title="Icon trigger"
      description="A compact opener for a toolbar, where a full field would not fit."
    >
      <SearchCommand
        trigger={
          <CommandTrigger
            render={<Button variant="outline" iconOnly aria-label="Search" />}
          >
            <IconMagnifyingGlass size={16} aria-hidden />
          </CommandTrigger>
        }
      />
    </DocBand>
  </div>
)
