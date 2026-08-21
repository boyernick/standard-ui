"use client"

import { IconCrossMedium } from "@central-icons-react/round-outlined-radius-2-stroke-2/IconCrossMedium"
import {
  Button,
  Input,
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@boyernick/standard-ui-react"
import {
  useDeferredValue,
  useMemo,
  useState,
  type ChangeEvent,
} from "react"
import {
  ALL_ICONS_CATEGORY,
  filterGalleryIcons,
  galleryCategories,
  galleryIcons,
  GALLERY_PAGE_SIZE,
  type GalleryIcon,
} from "@/lib/central-icons-gallery"
import { PAGE_INNER } from "@/lib/chrome"

/** A cell grid rather than the table used elsewhere: icons are picked by eye,
 *  so density and a scannable glyph matter more than aligned columns.
 *  Hairlines come from the container's top/left plus each cell's right/bottom,
 *  which closes the grid at any column count. */
const GRID =
  "mt-6 grid grid-cols-2 border-t border-l border-border-primary-solid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"

const IconGlyph = ({ svg }: { svg: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className="size-6 shrink-0 text-fg-primary"
    aria-hidden
    dangerouslySetInnerHTML={{ __html: svg }}
  />
)

const IconCell = ({ icon }: { icon: GalleryIcon }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(icon.name)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1200)
    } catch {
      // Clipboard unavailable — nothing useful to show.
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      title={`Copy ${icon.name}`}
      className="flex h-28 cursor-copy flex-col items-center justify-center gap-3 border-r border-b border-border-primary-solid px-2 outline-none transition-colors hover:bg-background-secondary focus-visible:bg-background-secondary focus-visible:ring-[3px] focus-visible:ring-inset focus-visible:ring-ring/20"
    >
      <IconGlyph svg={icon.svg} />
      {/* Wrap rather than truncate: names are camelCase with no break
          opportunities, and the ellipsis would eat the suffix that separates
          near-identical icons (ArrowsRepeatRightLeft vs …Off). */}
      <span className="text-xs line-clamp-2 max-w-full text-center break-all text-fg-secondary">
        {copied ? "Copied" : icon.displayName}
      </span>
      <span className="sr-only">{copied ? "Copied" : icon.name}</span>
    </button>
  )
}

export const IconsDemo = () => {
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState<string>(ALL_ICONS_CATEGORY)
  const [page, setPage] = useState(1)
  const deferredQuery = useDeferredValue(query)
  const filterKey = `${deferredQuery}|${category}`
  const [lastFilterKey, setLastFilterKey] = useState(filterKey)

  const categoryTabs = useMemo(
    () => [ALL_ICONS_CATEGORY, ...galleryCategories],
    [],
  )

  /** Sorted by category so the visible slice groups into whole bands. */
  const filtered = useMemo(() => {
    const matches = filterGalleryIcons(galleryIcons, deferredQuery, category)
    return [...matches].sort(
      (a, b) => a.category.localeCompare(b.category) || 0,
    )
  }, [deferredQuery, category])

  const pageCount = Math.max(1, Math.ceil(filtered.length / GALLERY_PAGE_SIZE))
  const current = Math.min(page, pageCount)
  const start = (current - 1) * GALLERY_PAGE_SIZE
  const visible = useMemo(
    () => filtered.slice(start, start + GALLERY_PAGE_SIZE),
    [filtered, start],
  )

  /** Group the visible slice into category bands. */
  const bands = useMemo(() => {
    const map = new Map<string, GalleryIcon[]>()
    for (const icon of visible) {
      const list = map.get(icon.category)
      if (list) list.push(icon)
      else map.set(icon.category, [icon])
    }
    return [...map.entries()]
  }, [visible])

  // Adjusting state during render rather than in an effect — a new filter
  // returns to page one, and React re-renders before painting.
  if (filterKey !== lastFilterKey) {
    setLastFilterKey(filterKey)
    setPage(1)
  }

  const goTo = (next: number) => {
    setPage(Math.min(Math.max(next, 1), pageCount))
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  /** First, last, and a window around the current page. */
  const pageItems = useMemo(() => {
    const window_ = new Set([1, pageCount, current, current - 1, current + 1])
    const pages = [...window_]
      .filter((n) => n >= 1 && n <= pageCount)
      .sort((a, b) => a - b)
    const items: (number | "gap")[] = []
    pages.forEach((n, i) => {
      if (i > 0 && n - pages[i - 1] > 1) items.push("gap")
      items.push(n)
    })
    return items
  }, [current, pageCount])

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  const trimmed = deferredQuery.trim()
  const emptyLabel = trimmed
    ? `No icons found for "${trimmed}"`
    : category === ALL_ICONS_CATEGORY
      ? "No icons found"
      : `No icons found in ${category}`

  return (
    <div>
      <div className="border-b border-border-primary">
        {/* A flex row, not absolute positioning: the clear button then lands on
            the content edge alongside the theme toggle at every breakpoint,
            instead of mirroring the padding scale and drifting when it grows. */}
        <div className={`${PAGE_INNER} flex items-center gap-2`}>
          <label className="sr-only" htmlFor="icon-search">
            Search icons
          </label>
          <Input
            id="icon-search"
            type="search"
            variant="ghost"
            value={query}
            onChange={handleQueryChange}
            placeholder="Search icons…"
            autoComplete="off"
            className="h-auto min-w-0 flex-1 rounded-none !px-0 py-4 [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden"
          />
          {query ? (
            <Button
              type="button"
              variant="ghost"
              size="md"
              iconOnly
              rounded
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="shrink-0 text-fg-tertiary hover:text-fg-primary"
            >
              <IconCrossMedium size={16} mode="raw" aria-hidden />
            </Button>
          ) : null}
        </div>
      </div>

      <div className="border-b border-border-primary">
      <div
        role="tablist"
        aria-label="Icon categories"
        className={`${PAGE_INNER} flex gap-2 overflow-x-auto py-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden`}
      >
        {categoryTabs.map((tab) => {
          const active = tab === category
          return (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setCategory(tab)}
              className={`text-sm shrink-0 rounded-full px-3 py-1.5 whitespace-nowrap transition-colors outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-offset-1 focus-visible:ring-offset-background-primary focus-visible:ring-ring/20 ${
                active
                  ? "bg-background-tertiary text-fg-primary"
                  : "text-fg-tertiary hover:text-fg-secondary"
              }`}
            >
              {tab}
            </button>
          )
        })}
      </div>
      </div>

      {filtered.length === 0 ? (
        <p className={`${PAGE_INNER} text-sm py-16 text-center text-fg-tertiary`}>
          {emptyLabel}
        </p>
      ) : (
        bands.map(([name, icons], index) => (
          <section
            key={name}
            aria-labelledby={`icons-${name.replace(/\W+/g, "-").toLowerCase()}`}
            className={index === 0 ? "" : "border-t border-border-primary"}
          >
            <div className={`${PAGE_INNER} py-10`}>
              <h2
                id={`icons-${name.replace(/\W+/g, "-").toLowerCase()}`}
                className="heading-sm text-fg-primary"
              >
                {name}
              </h2>
              <p className="text-sm mt-1 text-fg-secondary">
                {icons.length} {icons.length === 1 ? "icon" : "icons"}
              </p>

              <div className={GRID}>
                {icons.map((icon) => (
                  <IconCell key={icon.name} icon={icon} />
                ))}
              </div>
            </div>
          </section>
        ))
      )}

      {pageCount > 1 ? (
        <div className="border-t border-border-primary">
          <div className={`${PAGE_INNER} py-8`}>
            <Pagination aria-label="Icon pages">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    disabled={current === 1}
                    onClick={() => goTo(current - 1)}
                  />
                </PaginationItem>
                {pageItems.map((item, index) =>
                  item === "gap" ? (
                    <PaginationItem key={`gap-${index}`}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  ) : (
                    <PaginationItem key={item}>
                      <PaginationLink
                        active={item === current}
                        aria-current={item === current ? "page" : undefined}
                        onClick={() => goTo(item)}
                      >
                        {item}
                      </PaginationLink>
                    </PaginationItem>
                  ),
                )}
                <PaginationItem>
                  <PaginationNext
                    disabled={current === pageCount}
                    onClick={() => goTo(current + 1)}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      ) : null}
    </div>
  )
}
