"use client"

import { BrandWordmark, cn, focusRing, focusRingBorder } from "@boyernick/standard-ui-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { EdgeFade } from "@/components/edge-fade"
import { CHROME_BAR_HEIGHT } from "@/lib/chrome"
import { navGroups, rootPages } from "@/lib/nav"

const isActive = (pathname: string, href: string) => {
  if (href === "/") return pathname === "/"
  return pathname === href || pathname.startsWith(`${href}/`)
}

const navLinkClass = (active: boolean) =>
  cn(
    "block cursor-pointer rounded-md px-2 py-1.5 transition-colors",
    focusRingBorder,
    focusRing,
    active
      ? "text-sm-strong bg-background-tertiary text-fg-primary"
      : "text-sm text-fg-tertiary hover:bg-background-tertiary hover:text-fg-primary",
  )

export const Sidebar = () => {
  const pathname = usePathname()

  return (
    <aside className="relative flex h-full w-60 shrink-0 flex-col border-r border-border-primary bg-surface">
      <div className="min-h-0 flex-1 overflow-y-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="sticky top-0 z-10">
          <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[calc(100%+0.75rem)]">
            <EdgeFade edge="top" tone="surface" />
          </div>
          <div className="relative border-b border-border-primary bg-surface">
            <div
              className={`flex ${CHROME_BAR_HEIGHT} items-center px-5`}
            >
              <Link
                href="/"
                className={cn(
                  "inline-flex cursor-pointer text-fg-primary focus-visible:rounded-md",
                  focusRingBorder,
                  focusRing,
                )}
                aria-label="StandardUI"
              >
                <BrandWordmark size="sm" className="text-inherit" />
              </Link>
            </div>
          </div>
        </div>

        <nav className="px-3 pb-14">
          <ul className="flex flex-col gap-0.5 pt-4">
            {rootPages.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={navLinkClass(isActive(pathname, item.href))}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          {navGroups.map((group) => (
            <div key={group.label}>
              <p className="text-xs mt-6 px-2 pt-2 pb-2 text-fg-secondary">
                {group.label}
              </p>
              <ul className="flex flex-col gap-0.5">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={navLinkClass(isActive(pathname, item.href))}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-12"
      >
        <EdgeFade edge="bottom" tone="surface" />
      </div>
    </aside>
  )
}
