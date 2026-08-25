import { BrandWordmark, cn, focusRing, focusRingBorder } from "@boyernick/standard-ui-react"
import Link from "next/link"
import { CHROME_BAR_HEIGHT, PAGE_INNER } from "@/lib/chrome"
import { MobileNav } from "./mobile-nav"
import { SiteSearch } from "./site-search"
import { ThemeToggle } from "./theme-toggle"

export function TopBar() {
  return (
    <header className="border-b border-border-primary bg-background-primary">
      {/* Same padding as every page block, so the search lines up with the
          content below it. */}
      <div
        className={`flex ${CHROME_BAR_HEIGHT} w-full items-center gap-2 sm:gap-3 ${PAGE_INNER}`}
      >
        <div className="md:hidden">
          <MobileNav />
        </div>
        <Link
          href="/"
          className={cn(
            "inline-flex shrink-0 cursor-pointer text-fg-primary focus-visible:rounded-md md:hidden",
            focusRingBorder,
            focusRing,
          )}
          aria-label="StandardUI"
        >
          <BrandWordmark size="sm" />
        </Link>
        <div className="flex min-w-0 flex-1 justify-end md:justify-start">
          <SiteSearch />
        </div>
        <ThemeToggle />
      </div>
    </header>
  )
}
