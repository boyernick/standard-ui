"use client";

import {
  IconHome,
  IconSettingsGear1,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarNav,
  SidebarNavItem,
} from "@boyernick/standard-ui-react";
import { ComponentCanvas } from "@/components/component-canvas";

export const SidebarExamples = () => (
  <div className="mt-6">
    <ComponentCanvas
      label="Application navigation"
      contentClassName="h-96 items-stretch p-0"
    >
      <Sidebar className="h-full">
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
                <IconSettingsGear1 />
                Settings
              </SidebarNavItem>
            </SidebarNav>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="text-xs text-fg-tertiary">
          StandardUI
        </SidebarFooter>
      </Sidebar>
    </ComponentCanvas>
  </div>
);
