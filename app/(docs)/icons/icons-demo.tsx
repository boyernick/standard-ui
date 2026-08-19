"use client"

import { IconCrossMedium } from "@central-icons-react/round-outlined-radius-2-stroke-2/IconCrossMedium"
import { Button, Input } from "@boyernick/standard-ui-react"
import {
  useDeferredValue,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ChangeEvent,
} from "react"
import { ComponentMeta } from "@/components/component-demo"
import {
  ALL_ICONS_CATEGORY,
  filterGalleryIcons,
  galleryCategories,
  galleryIcons,
  GALLERY_PAGE_SIZE,
  type GalleryIcon,
} from "@/lib/central-icons-gallery"

const IconGlyph = ({ svg }: { svg: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className="size-7 shrink-0 text-fg-primary"
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
      setCopied(false)
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? "Copied" : `Copy ${icon.name}`}
      title={copied ? "Copied" : `Copy ${icon.name}`}
      className="flex h-32 w-full cursor-copy flex-col items-center justify-center gap-3 border-b border-r border-border-primary px-2 transition-colors hover:bg-background-tertiary focus-visible:bg-background-tertiary outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-offset-1 focus-visible:ring-offset-background-primary focus-visible:ring-ring/20 sm:h-40 [&:nth-child(2n)]:border-r-0 sm:[&:nth-child(2n)]:border-r sm:[&:nth-child(4n)]:border-r-0"
    >
      <IconGlyph svg={icon.svg} />
      <span className="text-xs max-w-full truncate px-1 text-center text-fg-secondary">
        {copied ? "Copied" : icon.displayName}
      </span>
    </button>
  )
}

const categoryTabs = [ALL_ICONS_CATEGORY, ...galleryCategories]

export const IconsDemo = () => {
  const [query, setQuery] = useState("")
  const deferredQuery = useDeferredValue(query)
  const [category, setCategory] = useState(ALL_ICONS_CATEGORY)
  const [loaded, setLoaded] = useState({
    query: "",
    category: ALL_ICONS_CATEGORY,
    count: GALLERY_PAGE_SIZE,
  })
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [tableHeight, setTableHeight] = useState<number | null>(null)
  const shellRef = useRef<HTMLDivElement>(null)
  const scrollRootRef = useRef<HTMLDivElement>(null)
  const loadMoreRef = useRef<HTMLDivElement>(null)

  const filtered = filterGalleryIcons(galleryIcons, deferredQuery, category)
  const filterKey = `${deferredQuery}::${category}`
  const loadedKey = `${loaded.query}::${loaded.category}`
  const visibleCount =
    loadedKey === filterKey ? loaded.count : GALLERY_PAGE_SIZE
  const visible = filtered.slice(0, visibleCount)
  const hasMore = visibleCount < filtered.length

  const handleIncreaseVisible = () => {
    setLoaded({
      query: deferredQuery,
      category,
      count: Math.min(visibleCount + GALLERY_PAGE_SIZE, filtered.length),
    })
  }

  const handleScrollTop = () => {
    scrollRootRef.current?.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleCategorySelect = (next: string) => {
    setCategory(next)
    scrollRootRef.current?.scrollTo({ top: 0 })
  }

  useLayoutEffect(() => {
    const updateHeight = () => {
      const shell = shellRef.current
      if (!shell) return

      const page = shell.closest("[data-icons-page]")
      const title = page?.querySelector("h1")
      if (!title) return

      // Use document-space positions so page scroll doesn't resize the table.
      const shellTop = shell.getBoundingClientRect().top + window.scrollY
      const titleBottom = title.getBoundingClientRect().bottom + window.scrollY
      const gap = Math.max(0, shellTop - titleBottom)
      const next = Math.floor(window.innerHeight - shellTop - gap)
      setTableHeight(Math.max(320, next))
    }

    updateHeight()
    window.addEventListener("resize", updateHeight)
    return () => {
      window.removeEventListener("resize", updateHeight)
    }
  }, [])

  useEffect(() => {
    const root = scrollRootRef.current
    if (!root) return

    const handleScroll = () => {
      setShowScrollTop(root.scrollTop > 160)
    }

    handleScroll()
    root.addEventListener("scroll", handleScroll, { passive: true })
    return () => root.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const node = loadMoreRef.current
    const root = scrollRootRef.current
    if (!node || !root || !hasMore) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return
        setLoaded((prev) => {
          const prevKey = `${prev.query}::${prev.category}`
          const currentCount =
            prevKey === filterKey ? prev.count : GALLERY_PAGE_SIZE
          if (currentCount >= filtered.length) return prev
          return {
            query: deferredQuery,
            category,
            count: Math.min(
              currentCount + GALLERY_PAGE_SIZE,
              filtered.length,
            ),
          }
        })
      },
      { root, rootMargin: "240px" },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [
    hasMore,
    filtered.length,
    deferredQuery,
    category,
    filterKey,
    visible.length,
  ])

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  const handleClearQuery = () => {
    setQuery("")
  }

  const emptyLabel = deferredQuery.trim()
    ? `No icons found for "${deferredQuery.trim()}"`
    : category === ALL_ICONS_CATEGORY
      ? "No icons found"
      : `No icons found in ${category}`

  return (
    <div>
      <section>
        <div
          ref={shellRef}
          className="relative flex flex-col overflow-hidden rounded-xl border border-border-primary bg-surface"
          style={tableHeight ? { height: tableHeight } : { maxHeight: "80vh" }}
        >
          <div className="sticky top-0 z-10 shrink-0 border-b border-border-primary bg-surface">
            <div className="relative">
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
                className="h-auto rounded-none !px-5 !pr-14 py-4 [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden"
              />
              {query ? (
                <Button
                  type="button"
                  variant="ghost"
                  size="md"
                  iconOnly
                  rounded
                  onClick={handleClearQuery}
                  aria-label="Clear search"
                  className="absolute top-1/2 right-5 -translate-y-1/2 justify-end text-fg-tertiary hover:text-fg-primary"
                >
                  <IconCrossMedium size={16} mode="raw" aria-hidden />
                </Button>
              ) : null}
            </div>
            <div
              role="tablist"
              aria-label="Icon categories"
              className="flex gap-2 overflow-x-auto border-t border-border-primary px-5 py-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {categoryTabs.map((tab) => {
                const active = tab === category
                return (
                  <button
                    key={tab}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => handleCategorySelect(tab)}
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

          <div
            ref={scrollRootRef}
            className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {filtered.length === 0 ? (
              <p className="text-sm py-16 text-center text-fg-tertiary">
                {emptyLabel}
              </p>
            ) : (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-4">
                  {visible.map((icon) => (
                    <IconCell key={icon.name} icon={icon} />
                  ))}
                </div>
                {hasMore ? (
                  <div
                    ref={loadMoreRef}
                    className="flex justify-center border-t border-border-primary py-6"
                  >
                    <button
                      type="button"
                      onClick={handleIncreaseVisible}
                      className="text-sm rounded-lg border border-border-primary px-4 py-2 text-fg-secondary transition-colors hover:bg-background-tertiary hover:text-fg-primary focus-visible:bg-background-tertiary outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-offset-1 focus-visible:ring-offset-background-primary focus-visible:ring-ring/20"
                    >
                      Load more
                    </button>
                  </div>
                ) : null}
              </>
            )}
          </div>

          {showScrollTop ? (
            <button
              type="button"
              onClick={handleScrollTop}
              className="text-sm absolute bottom-4 left-1/2 z-20 inline-flex -translate-x-1/2 cursor-pointer items-center rounded-full border border-border-primary bg-surface/40 px-3.5 py-2 text-fg-secondary shadow-sm backdrop-blur-xl transition-colors hover:bg-surface/60 hover:text-fg-primary focus-visible:bg-surface/60 focus-visible:text-fg-primary outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-offset-1 focus-visible:ring-offset-background-primary focus-visible:ring-ring/20"
            >
              Scroll to top
            </button>
          ) : null}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="heading-sm text-fg-primary">Usage</h2>
        <ComponentMeta
          importLine={`import { IconHome } from "@boyernick/standard-ui-react"`}
        />
      </section>
    </div>
  )
}
