"use client"

import {
  BrandWordmark,
  Button,
  Drawer,
  DrawerBackdrop,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerPopup,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
  DrawerViewport,
} from "@boyernick/standard-ui-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { navGroups, rootPages } from "@/lib/nav"

const isActive = (pathname: string, href: string) => {
  if (href === "/") return pathname === "/"
  return pathname === href || pathname.startsWith(`${href}/`)
}

const MenuIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    aria-hidden
  >
    <path
      d="M5 7h14M5 12h14M5 17h14"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
)

export const MobileNav = () => {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [navigatedFrom, setNavigatedFrom] = useState(pathname)

  // Close on navigation. Adjusting state during render is React's documented
  // alternative to an effect here: it re-renders before the browser paints, so
  // the drawer is never shown open on the new route.
  if (pathname !== navigatedFrom) {
    setNavigatedFrom(pathname)
    setOpen(false)
  }

  return (
    <Drawer
      open={open}
      onOpenChange={setOpen}
      swipeDirection="left"
    >
      <DrawerTrigger
        render={
          <Button
            type="button"
            variant="ghost"
            iconOnly
            rounded
            aria-label="Open navigation"
            className="shrink-0 md:hidden"
          />
        }
      >
        <MenuIcon className="size-4" />
      </DrawerTrigger>
      <DrawerPortal>
        <DrawerBackdrop />
        <DrawerViewport>
          <DrawerPopup>
            <DrawerContent className="gap-4 p-0">
              <DrawerHeader className="flex flex-row items-center justify-between border-b border-border-primary px-4 py-3">
                <DrawerTitle className="sr-only">Navigation</DrawerTitle>
                <BrandWordmark size="sm" className="text-fg-primary" />
                <DrawerClose
                  render={
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      iconOnly
                      rounded
                      aria-label="Close navigation"
                    />
                  }
                >
                  <svg viewBox="0 0 24 24" fill="none" className="size-4" aria-hidden>
                    <path
                      d="M7 7l10 10M17 7 7 17"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </DrawerClose>
              </DrawerHeader>
              <nav className="overflow-y-auto px-3 pb-8">
                <ul className="flex flex-col gap-0.5 pt-4">
                  {rootPages.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={`block cursor-pointer rounded-md px-2 py-1.5 outline-none transition-colors focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-offset-1 focus-visible:ring-offset-background-primary focus-visible:ring-ring/20 ${
                          isActive(pathname, item.href)
                            ? "text-sm bg-background-tertiary text-fg-primary"
                            : "text-sm text-fg-tertiary hover:bg-background-tertiary hover:text-fg-primary"
                        }`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                {navGroups.map((group) => (
                  <div key={group.label}>
                    <p
                      className="text-xs mt-6 px-2 pt-2 pb-2 text-fg-secondary"
                    >
                      {group.label}
                    </p>
                    <ul className="flex flex-col gap-0.5">
                      {group.items.map((item) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            className={`block cursor-pointer rounded-md px-2 py-1.5 outline-none transition-colors focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-offset-1 focus-visible:ring-offset-background-primary focus-visible:ring-ring/20 ${
                              isActive(pathname, item.href)
                                ? "text-sm bg-background-tertiary text-fg-primary"
                                : "text-sm text-fg-tertiary hover:bg-background-tertiary hover:text-fg-primary"
                            }`}
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </nav>
            </DrawerContent>
          </DrawerPopup>
        </DrawerViewport>
      </DrawerPortal>
    </Drawer>
  )
}
