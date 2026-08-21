"use client"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuPopup,
  NavigationMenuPortal,
  NavigationMenuPositioner,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerClassName,
} from "@boyernick/standard-ui-react"
import type { ReactNode } from "react"
import { DocBand } from "@/components/doc-band"

/** Every nav ends with the same portal chain; only the list differs. */
const Nav = ({ children }: { children: ReactNode }) => (
  <NavigationMenu>
    <NavigationMenuList>{children}</NavigationMenuList>
    <NavigationMenuPortal>
      <NavigationMenuPositioner>
        <NavigationMenuPopup>
          <NavigationMenuViewport />
        </NavigationMenuPopup>
      </NavigationMenuPositioner>
    </NavigationMenuPortal>
  </NavigationMenu>
)

const resources = ["Docs", "Changelog", "GitHub", "Community"]

const product = [
  { title: "Overview", blurb: "What StandardUI includes" },
  { title: "Components", blurb: "Primitives and patterns" },
  { title: "Tokens", blurb: "Colour, type, and materials" },
  { title: "Motion", blurb: "Curves and durations" },
]

export const NavigationMenuExamples = () => (
  <div>
    <DocBand
      first
      id="default"
      title="Default"
      description="A bar of links, some of which open a panel."
      contentClassName="max-w-xl"
    >
      <Nav>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-56 gap-1">
              {resources.map((item) => (
                <li key={item}>
                  <NavigationMenuLink href="#">{item}</NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        {/* No panel — the trigger class makes a plain link sit flush with
            the ones that do open something. */}
        <NavigationMenuItem>
          <NavigationMenuLink href="#" className={navigationMenuTriggerClassName}>
            Pricing
          </NavigationMenuLink>
        </NavigationMenuItem>
      </Nav>
    </DocBand>

    <DocBand
      id="rich-panel"
      title="Rich panel"
      description="A panel holds arbitrary content, not only a list of links."
      contentClassName="max-w-xl"
    >
      <Nav>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Product</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[26rem] grid-cols-2 gap-1">
              {product.map((item) => (
                <li key={item.title}>
                  <NavigationMenuLink href="#">
                    <span className="font-medium">{item.title}</span>
                    <span className="text-xs text-fg-tertiary">
                      {item.blurb}
                    </span>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </Nav>
    </DocBand>
  </div>
)
