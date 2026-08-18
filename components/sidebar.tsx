"use client"

import { IconFormCircle } from "@central-icons-react/round-outlined-radius-2-stroke-2/IconFormCircle"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { components, foundations, upcomingComponents } from "@/lib/nav"

const isActive = (pathname: string, href: string) => {
  if (href === "/") return pathname === "/"
  return pathname === href || pathname.startsWith(`${href}/`)
}

export const Sidebar = () => {
  const pathname = usePathname()

  return (
    <aside className="flex h-full w-60 shrink-0 flex-col border-r border-border-primary bg-surface">
      <div className="px-5 pt-5 pb-4">
        <Link
          href="/"
          className="text-sm-strong inline-flex items-center gap-1 text-fg-primary"
          aria-label="UI"
        >
          <IconFormCircle size={16} mode="raw" aria-hidden />
          UI
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 pb-8">
        <p className="text-xs px-2 pt-2 pb-1 text-fg-tertiary">
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

        <p className="text-xs mt-6 px-2 pt-2 pb-1 text-fg-tertiary">
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
    </aside>
  )
}
