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
} from "@standard-ui/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { components, foundations } from "@/lib/nav"

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

  useEffect(() => {
    setOpen(false)
  }, [pathname])

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
                <p className="text-xs px-2 pt-2 pb-2 text-fg-secondary">
                  Foundations
                </p>
                <ul className="flex flex-col gap-0.5">
                  {foundations.map((item) => {
                    const active = isActive(pathname, item.href)
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className={`block cursor-pointer rounded-md px-2 py-1.5 outline-none transition-colors focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-offset-1 focus-visible:ring-offset-background-primary focus-visible:ring-ring/20 ${
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
                <p className="text-xs mt-6 px-2 pt-2 pb-2 text-fg-secondary">
                  Components
                </p>
                <ul className="flex flex-col gap-0.5">
                  {components.map((item) => {
                    const active = isActive(pathname, item.href)
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className={`block cursor-pointer rounded-md px-2 py-1.5 outline-none transition-colors focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-offset-1 focus-visible:ring-offset-background-primary focus-visible:ring-ring/20 ${
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
              </nav>
            </DrawerContent>
          </DrawerPopup>
        </DrawerViewport>
      </DrawerPortal>
    </Drawer>
  )
}
