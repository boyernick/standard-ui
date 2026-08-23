import {
  Tabs,
  TabsIndicator,
  TabsList,
  TabsPanel,
  TabsTab,
  type TabsSize,
} from "@boyernick/standard-ui-react"
import { DocBand } from "@/components/doc-band"

const BAND = "max-w-xl"

const SizeExample = ({ size }: { size: TabsSize }) => (
  <Tabs defaultValue="all" variant="segmented" size={size}>
    <TabsList>
      <TabsTab value="all">All</TabsTab>
      <TabsTab value="active">Active</TabsTab>
      <TabsTab value="archived">Archived</TabsTab>
      <TabsIndicator />
    </TabsList>
    <TabsPanel value="all">Showing every project.</TabsPanel>
    <TabsPanel value="active">Showing active projects.</TabsPanel>
    <TabsPanel value="archived">Showing archived projects.</TabsPanel>
  </Tabs>
)

export const TabsExamples = () => (
  <div>
    <DocBand
      first
      id="underline"
      title="Underline"
      description="The default treatment suits page-level navigation and wide content regions."
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
      id="segmented"
      title="Segmented"
      description="A compact inset surface groups a small set of peer views."
      contentClassName={BAND}
    >
      <Tabs defaultValue="all" variant="segmented">
        <TabsList>
          <TabsTab value="all">All</TabsTab>
          <TabsTab value="active">Active</TabsTab>
          <TabsTab value="archived">Archived</TabsTab>
          <TabsIndicator />
        </TabsList>
        <TabsPanel value="all">Showing every project.</TabsPanel>
        <TabsPanel value="active">Showing active projects.</TabsPanel>
        <TabsPanel value="archived">Showing archived projects.</TabsPanel>
      </Tabs>
    </DocBand>

    <DocBand
      id="pill"
      title="Pill"
      description="Detached rounded options work well for switching between statuses, queues, and saved views."
      contentClassName={BAND}
    >
      <Tabs defaultValue="open" variant="pill">
        <TabsList>
          <TabsTab value="open">
            Open
            <span className="rounded-full bg-background-quaternary px-1.5 text-xs tabular-nums">
              8
            </span>
          </TabsTab>
          <TabsTab value="closed">
            Closed
            <span className="rounded-full bg-background-quaternary px-1.5 text-xs tabular-nums">
              142
            </span>
          </TabsTab>
          <TabsTab value="drafts">
            Drafts
            <span className="rounded-full bg-background-quaternary px-1.5 text-xs tabular-nums">
              3
            </span>
          </TabsTab>
          <TabsIndicator />
        </TabsList>
        <TabsPanel value="open">8 requests need attention.</TabsPanel>
        <TabsPanel value="closed">142 requests have been resolved.</TabsPanel>
        <TabsPanel value="drafts">3 requests are still drafts.</TabsPanel>
      </Tabs>
    </DocBand>

    <DocBand
      id="sizes"
      title="Sizes"
      description="Small, medium, and large share the same spacing rhythm across every variant."
      contentClassName={BAND}
    >
      <div className="flex flex-col items-start gap-6">
        <SizeExample size="sm" />
        <SizeExample size="md" />
        <SizeExample size="lg" />
      </div>
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
      description="Orientation moves the list, panels, and indicator onto a shared horizontal axis."
      contentClassName={BAND}
    >
      <Tabs defaultValue="general" orientation="vertical">
        <TabsList>
          <TabsTab value="general">General</TabsTab>
          <TabsTab value="members">Members</TabsTab>
          <TabsTab value="access">Access</TabsTab>
          <TabsIndicator />
        </TabsList>
        <div className="flex-1">
          <TabsPanel value="general">
            Workspace name and default settings.
          </TabsPanel>
          <TabsPanel value="members">
            Who belongs to this workspace.
          </TabsPanel>
          <TabsPanel value="access">Roles and permissions.</TabsPanel>
        </div>
      </Tabs>
    </DocBand>
  </div>
)
