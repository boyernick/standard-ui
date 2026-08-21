import {
  Tabs,
  TabsIndicator,
  TabsList,
  TabsPanel,
  TabsTab,
} from "@boyernick/standard-ui-react"
import { DocBand } from "@/components/doc-band"

const BAND = "max-w-md"

export const TabsExamples = () => (
  <div>
    <DocBand
      first
      id="default"
      title="Default"
      description="One panel at a time, with the indicator tracking the active tab."
      contentClassName={BAND}
    >
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTab value="overview">Overview</TabsTab>
          <TabsTab value="projects">Projects</TabsTab>
          <TabsTab value="account">Account</TabsTab>
          <TabsIndicator />
        </TabsList>
        <TabsPanel value="overview">
          Summary of activity and recent updates.
        </TabsPanel>
        <TabsPanel value="projects">Active projects and ownership.</TabsPanel>
        <TabsPanel value="account">
          Profile, email, and security settings.
        </TabsPanel>
      </Tabs>
    </DocBand>

    <DocBand
      id="disabled"
      title="Disabled"
      description="A tab can be withdrawn while its neighbours stay reachable."
      contentClassName={BAND}
    >
      <Tabs defaultValue="details">
        <TabsList>
          <TabsTab value="details">Details</TabsTab>
          <TabsTab value="history">History</TabsTab>
          <TabsTab value="billing" disabled>
            Billing
          </TabsTab>
          <TabsIndicator />
        </TabsList>
        <TabsPanel value="details">Name, description and owner.</TabsPanel>
        <TabsPanel value="history">Every change, most recent first.</TabsPanel>
        <TabsPanel value="billing">Plan and payment method.</TabsPanel>
      </Tabs>
    </DocBand>

    <DocBand
      id="vertical"
      title="Vertical"
      description="Set upright the list runs down the side and the rule moves with it."
      contentClassName={BAND}
    >
      {/* The indicator is positioned for a horizontal list, so a vertical
          orientation restyles it to ride the right-hand edge. */}
      <Tabs defaultValue="general" orientation="vertical" className="flex-row gap-6">
        <TabsList className="flex-col border-r border-b-0">
          <TabsTab value="general" className="text-left">
            General
          </TabsTab>
          <TabsTab value="members" className="text-left">
            Members
          </TabsTab>
          <TabsTab value="access" className="text-left">
            Access
          </TabsTab>
          <TabsIndicator className="top-0 right-0 left-auto h-(--active-tab-height) w-0.5 translate-x-0 translate-y-(--active-tab-top)" />
        </TabsList>
        <div className="flex-1">
          <TabsPanel value="general" className="pt-0">
            Workspace name and default settings.
          </TabsPanel>
          <TabsPanel value="members" className="pt-0">
            Who belongs to this workspace.
          </TabsPanel>
          <TabsPanel value="access" className="pt-0">
            Roles and permissions.
          </TabsPanel>
        </div>
      </Tabs>
    </DocBand>
  </div>
)
