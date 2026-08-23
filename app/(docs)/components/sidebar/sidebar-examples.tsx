"use client"

import {
  IconBell,
  IconHome,
  IconPeople,
  IconSettingsGear1,
  IconSquareBehindSquare6,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarNav,
  SidebarNavBadge,
  SidebarNavItem,
  SidebarNavItemLabel,
  type SidebarNavItemProps,
  type SidebarProps,
} from "@boyernick/standard-ui-react"
import type { ReactNode } from "react"
import { useState } from "react"
import { DocBand } from "@/components/doc-band"

const BAND = "max-w-xs"

const primary = [
  { key: "overview", label: "Overview", icon: IconHome },
  { key: "projects", label: "Projects", icon: IconSquareBehindSquare6 },
  { key: "team", label: "Team", icon: IconPeople },
]

type PanelProps = Pick<SidebarProps, "variant" | "size"> & {
  children: ReactNode
  height?: "short" | "default"
}

/** The panel is `h-full`, so a specimen needs a height to fill. */
const Panel = ({
  children,
  variant,
  size,
  height = "default",
}: PanelProps) => (
  <div className={height === "short" ? "h-64" : "h-80"}>
    <Sidebar variant={variant} size={size}>
      {children}
    </Sidebar>
  </div>
)

const Navigation = ({
  active,
  variant = "default",
  size = "md",
}: {
  active: string
  variant?: NonNullable<SidebarNavItemProps["variant"]>
  size?: NonNullable<SidebarNavItemProps["size"]>
}) => (
  <SidebarNav>
    {primary.map(({ key, label, icon: Icon }) => (
      <SidebarNavItem
        key={key}
        active={active === key}
        variant={variant}
        size={size}
      >
        <Icon />
        <SidebarNavItemLabel>{label}</SidebarNavItemLabel>
        {key === "projects" && <SidebarNavBadge>6</SidebarNavBadge>}
      </SidebarNavItem>
    ))}
  </SidebarNav>
)

const DefaultSidebar = () => {
  const [active, setActive] = useState("overview")

  return (
    <Panel>
      <SidebarHeader>
        <p className="text-sm-strong text-fg-primary">Atlas workspace</p>
        <p className="mt-0.5 text-xs text-fg-tertiary">Design team</p>
      </SidebarHeader>
      <SidebarContent>
        <SidebarNav>
          {primary.map(({ key, label, icon: Icon }) => (
            <SidebarNavItem
              key={key}
              active={active === key}
              onClick={() => setActive(key)}
            >
              <Icon />
              <SidebarNavItemLabel>{label}</SidebarNavItemLabel>
              {key === "projects" && <SidebarNavBadge>6</SidebarNavBadge>}
            </SidebarNavItem>
          ))}
        </SidebarNav>
      </SidebarContent>
      <SidebarFooter className="text-xs text-fg-tertiary">
        StandardUI
      </SidebarFooter>
    </Panel>
  )
}

const SurfaceSidebar = ({
  variant,
}: {
  variant: "inset" | "floating"
}) => (
  <Panel variant={variant} size="sm" height="short">
    <SidebarHeader className="text-sm-strong">Workspace</SidebarHeader>
    <SidebarContent>
      <Navigation active="projects" size="sm" />
    </SidebarContent>
    <SidebarFooter className="text-xs text-fg-tertiary">
      nick@example.com
    </SidebarFooter>
  </Panel>
)

export const SidebarExamples = () => (
  <div>
    <DocBand
      first
      id="default"
      title="Default"
      description="A structured panel with interactive navigation and compact metadata."
      contentClassName={BAND}
    >
      <DefaultSidebar />
    </DocBand>

    <DocBand
      id="surfaces"
      title="Surfaces"
      description="Inset and floating treatments fit embedded layouts and detached app shells."
      contentClassName="max-w-xl"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <p className="mb-3 text-xs-strong text-fg-tertiary">Inset</p>
          <SurfaceSidebar variant="inset" />
        </div>
        <div>
          <p className="mb-3 text-xs-strong text-fg-tertiary">Floating</p>
          <SurfaceSidebar variant="floating" />
        </div>
      </div>
    </DocBand>

    <DocBand
      id="navigation-treatments"
      title="Navigation treatments"
      description="Pill and indicator states offer distinct emphasis without changing structure."
      contentClassName="max-w-xl"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <p className="mb-3 text-xs-strong text-fg-tertiary">Pill</p>
          <Panel variant="inset" size="sm" height="short">
            <SidebarContent>
              <Navigation active="overview" variant="pill" />
            </SidebarContent>
          </Panel>
        </div>
        <div>
          <p className="mb-3 text-xs-strong text-fg-tertiary">Indicator</p>
          <Panel variant="floating" size="sm" height="short">
            <SidebarContent>
              <Navigation active="projects" variant="indicator" />
            </SidebarContent>
          </Panel>
        </div>
      </div>
    </DocBand>

    <DocBand
      id="grouped"
      title="Grouped"
      description="Labelled groups separate one area of the product from another."
      contentClassName={BAND}
    >
      <Panel size="lg">
        <SidebarHeader className="text-sm-strong text-fg-primary">
          Workspace
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>General</SidebarGroupLabel>
            <SidebarNav>
              <SidebarNavItem active variant="indicator">
                <IconHome />
                <SidebarNavItemLabel>Overview</SidebarNavItemLabel>
              </SidebarNavItem>
              <SidebarNavItem variant="indicator">
                <IconSquareBehindSquare6 />
                <SidebarNavItemLabel>Projects</SidebarNavItemLabel>
                <SidebarNavBadge>6</SidebarNavBadge>
              </SidebarNavItem>
            </SidebarNav>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>Account</SidebarGroupLabel>
            <SidebarNav>
              <SidebarNavItem variant="indicator">
                <IconBell />
                <SidebarNavItemLabel>Notifications</SidebarNavItemLabel>
                <SidebarNavBadge>3</SidebarNavBadge>
              </SidebarNavItem>
              <SidebarNavItem variant="indicator">
                <IconSettingsGear1 />
                <SidebarNavItemLabel>Settings</SidebarNavItemLabel>
              </SidebarNavItem>
            </SidebarNav>
          </SidebarGroup>
        </SidebarContent>
      </Panel>
    </DocBand>

    <DocBand
      id="sizes"
      title="Compact"
      description="A smaller width and row height preserve space in dense utility layouts."
      contentClassName="max-w-xs"
    >
      <Panel variant="floating" size="sm" height="short">
        <SidebarContent>
          <Navigation active="team" size="sm" />
        </SidebarContent>
      </Panel>
    </DocBand>
  </div>
)
