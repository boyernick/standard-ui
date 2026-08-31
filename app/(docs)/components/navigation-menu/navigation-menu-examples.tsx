"use client"

import {
  IconCircleInfo,
  IconHome,
  IconPeople,
  IconSettingsGear1,
  IconSquareBehindSquare6,
  IconStar,
  NavigationMenu,
  NavigationMenuArrow,
  NavigationMenuBarLink,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuLinkDescription,
  NavigationMenuLinkIcon,
  NavigationMenuLinkTitle,
  NavigationMenuList,
  NavigationMenuPopup,
  NavigationMenuPortal,
  NavigationMenuPositioner,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  type NavigationMenuPositionerProps,
  type NavigationMenuProps,
} from "@boyernick/standard-ui-react"
import type { ReactNode } from "react"
import { DocBand } from "@/components/doc-band"

type NavProps = Pick<
  NavigationMenuProps,
  "orientation" | "size" | "variant"
> & {
  align?: NavigationMenuPositionerProps["align"]
  children: ReactNode
  side?: NavigationMenuPositionerProps["side"]
}

const Nav = ({
  align = "center",
  children,
  orientation,
  side = "bottom",
  size,
  variant,
}: NavProps) => (
  <NavigationMenu orientation={orientation} size={size} variant={variant}>
    <NavigationMenuList>{children}</NavigationMenuList>
    <NavigationMenuPortal>
      <NavigationMenuPositioner side={side} align={align}>
        <NavigationMenuPopup>
          <NavigationMenuArrow />
          <NavigationMenuViewport />
        </NavigationMenuPopup>
      </NavigationMenuPositioner>
    </NavigationMenuPortal>
  </NavigationMenu>
)

const resources = [
  { title: "Documentation", description: "Setup, patterns, and API reference" },
  { title: "Changelog", description: "What changed in each release" },
  { title: "Community", description: "Examples from other teams" },
]

const product = [
  {
    title: "Components",
    description: "Accessible primitives and patterns",
    Icon: IconSquareBehindSquare6,
  },
  {
    title: "Foundations",
    description: "Colour, typography, and motion",
    Icon: IconStar,
  },
  {
    title: "Guidelines",
    description: "Decisions for consistent interfaces",
    Icon: IconCircleInfo,
  },
  {
    title: "Community",
    description: "Resources from teams using the system",
    Icon: IconPeople,
  },
]

export const NavigationMenuExamples = () => (
  <div>
    <DocBand
      first
      id="default"
      title="Default"
      description="Links and flyouts on one rhythm."
      contentClassName="max-w-2xl"
    >
      <Nav>
        <NavigationMenuItem>
          <NavigationMenuBarLink href="#default" active>
            Overview
          </NavigationMenuBarLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-72 gap-1">
              {resources.map((item) => (
                <li key={item.title}>
                  <NavigationMenuLink href="#">
                    <NavigationMenuLinkTitle>
                      {item.title}
                    </NavigationMenuLinkTitle>
                    <NavigationMenuLinkDescription>
                      {item.description}
                    </NavigationMenuLinkDescription>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuBarLink href="#">Pricing</NavigationMenuBarLink>
        </NavigationMenuItem>
      </Nav>
    </DocBand>

    <DocBand
      id="pill"
      title="Pill"
      description="A contained treatment works well in compact product headers."
      contentClassName="max-w-2xl"
    >
      <Nav variant="pill" size="sm">
        <NavigationMenuItem>
          <NavigationMenuBarLink href="#" active>
            Home
          </NavigationMenuBarLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger showIcon={false}>Workspace</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-56 gap-1">
              <li>
                <NavigationMenuLink href="#">Projects</NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink href="#">Members</NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink href="#">Settings</NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuBarLink href="#">Activity</NavigationMenuBarLink>
        </NavigationMenuItem>
      </Nav>
    </DocBand>

    <DocBand
      id="rich-panel"
      title="Rich panel"
      description="Featured and descriptive links in one flyout."
      contentClassName="max-w-2xl"
    >
      <Nav variant="underline">
        <NavigationMenuItem>
          <NavigationMenuBarLink href="#" active>
            Product
          </NavigationMenuBarLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Explore</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[min(34rem,calc(100vw-2rem))] grid-cols-1 gap-1 sm:grid-cols-[1.05fr_1fr_1fr]">
              <li className="sm:row-span-2">
                <NavigationMenuLink href="#" variant="featured" size="lg">
                  <NavigationMenuLinkIcon>
                    <IconHome aria-hidden />
                  </NavigationMenuLinkIcon>
                  <NavigationMenuLinkTitle>StandardUI</NavigationMenuLinkTitle>
                  <NavigationMenuLinkDescription>
                    A practical foundation for polished product interfaces.
                  </NavigationMenuLinkDescription>
                </NavigationMenuLink>
              </li>
              {product.map(({ title, description, Icon }) => (
                <li key={title}>
                  <NavigationMenuLink href="#">
                    <NavigationMenuLinkIcon>
                      <Icon aria-hidden />
                    </NavigationMenuLinkIcon>
                    <NavigationMenuLinkTitle>{title}</NavigationMenuLinkTitle>
                    <NavigationMenuLinkDescription>
                      {description}
                    </NavigationMenuLinkDescription>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuBarLink href="#">Pricing</NavigationMenuBarLink>
        </NavigationMenuItem>
      </Nav>
    </DocBand>

    <DocBand
      id="vertical"
      title="Vertical"
      description="Orientation turns the triggers and the keyboard flow."
      contentClassName="max-w-2xl"
    >
      <Nav orientation="vertical" side="right" align="start">
        <NavigationMenuItem>
          <NavigationMenuBarLink href="#" active>
            Dashboard
          </NavigationMenuBarLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger showIcon={false}>Teams</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-60 gap-1">
              <li>
                <NavigationMenuLink href="#">Design</NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink href="#">Engineering</NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink href="#">Operations</NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuBarLink href="#">
            <IconSettingsGear1 className="size-4" aria-hidden />
            Settings
          </NavigationMenuBarLink>
        </NavigationMenuItem>
      </Nav>
    </DocBand>
  </div>
)
