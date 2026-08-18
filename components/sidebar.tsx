"use client"

import { IconFormCircle } from "@central-icons-react/round-outlined-radius-2-stroke-2/IconFormCircle"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { EdgeFade } from "@/components/edge-fade"
import { components, foundations, upcomingComponents } from "@/lib/nav"

const isActive = (pathname: string, href: string) => {
  if (href === "/") return pathname === "/"
  return pathname === href || pathname.startsWith(`${href}/`)
}

export const Sidebar = () => {
  const pathname = usePathname()

  return (
    <aside className="relative flex h-full w-60 shrink-0 flex-col border-r border-border-primary bg-surface">
      <div className="min-h-0 flex-1 overflow-y-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="sticky top-0 z-10">
          <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[calc(100%+0.75rem)]">
            <EdgeFade edge="top" tone="surface" />
          </div>
          <div className="relative px-5 pt-5 pb-4">
            <Link
              href="/"
              className="text-sm-strong inline-flex items-center gap-1 text-fg-primary"
              aria-label="UI"
            >
              <IconFormCircle size={16} mode="raw" aria-hidden />
              UI
            </Link>
          </div>
        </div>

        <nav className="px-3 pb-14">
          <p className="text-xs px-2 pt-2 pb-2 text-fg-tertiary">
            Foundations
          </p>
          <ul className="flex flex-col gap-0.5">
            {foundations.map((item) => {
              const active = isActive(pathname, item.href)
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`block rounded-md px-2 py-1.5 transition-colors ${
                      active
                        ? "text-sm bg-background-tertiary text-fg-primary"
                        : "text-sm text-fg-tertiary hover:bg-background-tertiary hover:text-fg-primary"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>

          <p className="text-xs mt-6 px-2 pt-2 pb-2 text-fg-tertiary">
            Components
          </p>
          <ul className="flex flex-col gap-0.5">
            {components.map((item) => {
              const active = isActive(pathname, item.href)
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`block rounded-md px-2 py-1.5 transition-colors ${
                      active
                        ? "text-sm bg-background-tertiary text-fg-primary"
                        : "text-sm text-fg-tertiary hover:bg-background-tertiary hover:text-fg-primary"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
            {upcomingComponents.map((name) => (
              <li
                key={name}
                className="text-sm rounded-md px-2 py-1.5 text-fg-quaternary"
              >
                {name}
              </li>
            ))}
          </ul>
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
