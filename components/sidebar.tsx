"use client"

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
        <Link href="/" className="type-small-strong tracking-tight text-fg-primary">
          standardUI
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 pb-8">
        <p className="type-tiny-strong px-2 pt-2 pb-1 text-fg-tertiary">
          Foundations
        </p>
        <ul className="flex flex-col gap-0.5">
          {foundations.map((item) => {
            const active = isActive(pathname, item.href)
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`type-small block rounded-md px-2 py-1.5 transition-colors ${
                    active
                      ? "bg-background-tertiary font-medium text-fg-primary"
                      : "text-fg-tertiary hover:bg-background-tertiary hover:text-fg-primary"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>

        <p className="type-tiny-strong mt-6 px-2 pt-2 pb-1 text-fg-tertiary">
          Components
        </p>
        <ul className="flex flex-col gap-0.5">
          {components.map((item) => {
            const active = isActive(pathname, item.href)
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`type-small block rounded-md px-2 py-1.5 transition-colors ${
                    active
                      ? "bg-background-tertiary font-medium text-fg-primary"
                      : "text-fg-tertiary hover:bg-background-tertiary hover:text-fg-primary"
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
              className="type-small rounded-md px-2 py-1.5 text-fg-quaternary"
            >
              {name}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
