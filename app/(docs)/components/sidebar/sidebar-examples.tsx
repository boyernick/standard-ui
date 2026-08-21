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
  SidebarNavItem,
} from "@boyernick/standard-ui-react"
import type { ReactNode } from "react"
import { useState } from "react"
import { DocBand } from "@/components/doc-band"

const BAND = "max-w-xs"

/** The panel is `h-full`, so a specimen needs a height to fill. */
const Panel = ({ children }: { children: ReactNode }) => (
  <div className="h-80">
    <Sidebar>{children}</Sidebar>
  </div>
)

const primary = [
  { key: "overview", label: "Overview", icon: IconHome },
  { key: "projects", label: "Projects", icon: IconSquareBehindSquare6 },
  { key: "team", label: "Team", icon: IconPeople },
]

const DefaultSidebar = () => {
  const [active, setActive] = useState("overview")

  return (
    <Panel>
      <SidebarHeader className="text-sm-strong text-fg-primary">
        Workspace
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
              {label}
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

export const SidebarExamples = () => (
  <div>
    <DocBand
      first
      id="default"
      title="Default"
      description="Header, navigation and footer stacked into one panel."
      contentClassName={BAND}
    >
      <DefaultSidebar />
    </DocBand>

    <DocBand
      id="grouped"
      title="Grouped"
      description="Labelled groups separate one area of the product from another."
      contentClassName={BAND}
    >
      <Panel>
        <SidebarHeader className="text-sm-strong text-fg-primary">
          Workspace
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>General</SidebarGroupLabel>
            <SidebarNav>
              <SidebarNavItem active>
                <IconHome />
                Overview
              </SidebarNavItem>
              <SidebarNavItem>
                <IconSquareBehindSquare6 />
                Projects
              </SidebarNavItem>
            </SidebarNav>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>Account</SidebarGroupLabel>
            <SidebarNav>
              <SidebarNavItem>
                <IconBell />
                Notifications
              </SidebarNavItem>
              <SidebarNavItem>
                <IconSettingsGear1 />
                Settings
              </SidebarNavItem>
            </SidebarNav>
          </SidebarGroup>
        </SidebarContent>
      </Panel>
    </DocBand>

    <DocBand
      id="bare"
      title="Navigation only"
      description="Header and footer are optional; the content region carries the list."
      contentClassName={BAND}
    >
      <Panel>
        <SidebarContent>
          <SidebarNav>
            {primary.map(({ key, label, icon: Icon }) => (
              <SidebarNavItem key={key} active={key === "projects"}>
                <Icon />
                {label}
              </SidebarNavItem>
            ))}
          </SidebarNav>
        </SidebarContent>
      </Panel>
    </DocBand>
  </div>
)
