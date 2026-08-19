"use client"

import {
  Tabs,
  TabsIndicator,
  TabsList,
  TabsPanel,
  TabsTab,
} from "@standard-ui/react"
import { ComponentCanvas } from "@/components/component-canvas"

export const TabsExamples = () => (
  <div className="mt-6 flex flex-col gap-8">
    <ComponentCanvas
      label="Sections"
      contentClassName="w-full max-w-md items-stretch"
      minHeightClass="min-h-48"
      code={`<Tabs defaultValue="overview">
  <TabsList>
    <TabsTab value="overview">Overview</TabsTab>
    <TabsTab value="projects">Projects</TabsTab>
    <TabsTab value="account">Account</TabsTab>
    <TabsIndicator />
  </TabsList>
  <TabsPanel value="overview">
    Summary of activity and recent updates.
  </TabsPanel>
  <TabsPanel value="projects">
    Active projects and ownership.
  </TabsPanel>
  <TabsPanel value="account">
    Profile, email, and security settings.
  </TabsPanel>
</Tabs>`}
    >
      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTab value="overview">Overview</TabsTab>
          <TabsTab value="projects">Projects</TabsTab>
          <TabsTab value="account">Account</TabsTab>
          <TabsIndicator />
        </TabsList>
        <TabsPanel value="overview">
          Summary of activity and recent updates.
        </TabsPanel>
        <TabsPanel value="projects">
          Active projects and ownership.
        </TabsPanel>
        <TabsPanel value="account">
          Profile, email, and security settings.
        </TabsPanel>
      </Tabs>
    </ComponentCanvas>
  </div>
)
