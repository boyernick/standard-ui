"use client"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Menu,
  MenuLinkItem,
  MenuPopup,
  MenuPortal,
  MenuPositioner,
  MenuTrigger,
} from "@boyernick/standard-ui-react"
import { DocBand } from "@/components/doc-band"

const categoryMenuCollision = {
  side: "none",
  align: "shift",
  fallbackAxisSide: "none",
} as const

const menuTriggerBase =
  "-mx-1.5 rounded-sm px-1.5 py-0.5 outline-none focus-visible:ring-[3px] focus-visible:ring-ring/20 data-popup-open:bg-background-tertiary data-popup-open:ring-1 data-popup-open:ring-border-secondary"

export const BreadcrumbExamples = () => (
  <div>
    <DocBand
      first
      id="category-menu"
      title="Category menu"
      description="A category can open its sibling pages without leaving the breadcrumb trail."
    >
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <Menu>
              <MenuTrigger
                openOnHover
                className={`${menuTriggerBase} text-fg-secondary hover:text-fg-primary data-popup-open:text-fg-primary`}
              >
                Components
              </MenuTrigger>
              <MenuPortal>
                <MenuPositioner
                  side="bottom"
                  align="start"
                  collisionAvoidance={categoryMenuCollision}
                >
                  <MenuPopup aria-label="Component pages" className="min-w-56">
                    <MenuLinkItem href="/components/accordion">
                      Accordion
                    </MenuLinkItem>
                    <MenuLinkItem href="/components/alert-dialog">
                      Alert dialog
                    </MenuLinkItem>
                    <MenuLinkItem href="/components/autocomplete">
                      Autocomplete
                    </MenuLinkItem>
                    <MenuLinkItem href="/components/avatar">Avatar</MenuLinkItem>
                    <MenuLinkItem href="/components/badge">Badge</MenuLinkItem>
                    <MenuLinkItem
                      href="/components/breadcrumb"
                      aria-current="page"
                      className="font-medium"
                    >
                      Breadcrumb
                    </MenuLinkItem>
                  </MenuPopup>
                </MenuPositioner>
              </MenuPortal>
            </Menu>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </DocBand>

    <DocBand
      id="two-levels"
      title="Two levels"
      description="A short trail that ends on the current page."
    >
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <Menu>
              <MenuTrigger
                openOnHover
                className={`${menuTriggerBase} font-medium text-fg-primary hover:text-fg-primary`}
              >
                Components
              </MenuTrigger>
              <MenuPortal>
                <MenuPositioner
                  side="bottom"
                  align="start"
                  collisionAvoidance={categoryMenuCollision}
                >
                  <MenuPopup aria-label="Component pages" className="min-w-56">
                    <MenuLinkItem
                      href="/components"
                      aria-current="page"
                      className="font-medium"
                    >
                      Components
                    </MenuLinkItem>
                    <MenuLinkItem href="/components/accordion">
                      Accordion
                    </MenuLinkItem>
                    <MenuLinkItem href="/components/alert-dialog">
                      Alert dialog
                    </MenuLinkItem>
                    <MenuLinkItem href="/components/autocomplete">
                      Autocomplete
                    </MenuLinkItem>
                    <MenuLinkItem href="/components/avatar">Avatar</MenuLinkItem>
                    <MenuLinkItem href="/components/badge">Badge</MenuLinkItem>
                    <MenuLinkItem href="/components/breadcrumb">
                      Breadcrumb
                    </MenuLinkItem>
                  </MenuPopup>
                </MenuPositioner>
              </MenuPortal>
            </Menu>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </DocBand>
  </div>
)
