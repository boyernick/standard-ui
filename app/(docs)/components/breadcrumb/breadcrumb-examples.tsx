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

export const BreadcrumbExamples = () => (
  <div>
    <DocBand
      first
      id="default"
      title="Default"
      description="A page trail that links each parent level and marks the current page."
    >
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/components">Components</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </DocBand>

    <DocBand
      id="slash"
      title="Slash separator"
      description="A quieter typographic separator for editorial and compact navigation."
    >
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator variant="slash" />
          <BreadcrumbItem>
            <BreadcrumbLink href="/components">Components</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator variant="slash" />
          <BreadcrumbItem>
            <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </DocBand>

    <DocBand
      id="category-menu"
      title="Category menu"
      description="A category can open its sibling pages without leaving the breadcrumb trail."
    >
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator variant="slash" />
          <BreadcrumbItem>
            <Menu>
              <MenuTrigger
                openOnHover
                className="-mx-1 rounded-sm px-1 py-0.5 text-fg-secondary outline-none hover:text-fg-primary focus-visible:ring-[3px] focus-visible:ring-ring/20 data-popup-open:bg-background-tertiary data-popup-open:text-fg-primary data-popup-open:ring-1 data-popup-open:ring-border-secondary"
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
          <BreadcrumbSeparator variant="slash" />
          <BreadcrumbItem>
            <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </DocBand>
  </div>
)
