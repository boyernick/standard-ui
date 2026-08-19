import type { Metadata } from "next"
import { CodeBlock } from "@/components/code-block"
import { DocCell, DocTable, Token } from "@/components/doc-table"
import { PageHeader } from "@/components/page-header"
import { TabsExamples } from "./tabs-examples"

export const metadata: Metadata = {
  title: "Tabs",
}

export default function TabsPage() {
  return (
    <div className="w-full">
      <PageHeader
        title="Tabs"
        description="Switch between related views in the same context. Keep tab labels short and panels self-contained."
      />

      <section className="mt-2">
        <h2 className="heading-sm text-fg-primary">Examples</h2>
        <TabsExamples />
      </section>

      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">Overview</h2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Tabs pair a list of tabs with matching panels. Place{" "}
          <Token>TabsIndicator</Token> inside the list for the animated
          underline under the active tab. Built on Base UI for keyboard and
          focus behavior.
        </p>
        <CodeBlock
          className="mt-4"
          code={`import {
  Tabs,
  TabsList,
  TabsTab,
  TabsIndicator,
  TabsPanel,
} from "@boyernick/standard-ui-react"

<Tabs defaultValue="overview">
  <TabsList>
    <TabsTab value="overview">Overview</TabsTab>
    <TabsTab value="projects">Projects</TabsTab>
    <TabsTab value="account">Account</TabsTab>
    <TabsIndicator />
  </TabsList>
  <TabsPanel value="overview">…</TabsPanel>
</Tabs>`}
        />
      </section>

      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">Usage</h2>

        <h3 className="heading-xs mt-8 text-fg-primary">Values</h3>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Each tab and panel share a <Token>value</Token>. Set{" "}
          <Token>defaultValue</Token> (or controlled <Token>value</Token>) on
          the root to the first tab you want active.
        </p>
        <CodeBlock
          className="mt-4"
          size="sm"
          code={`<Tabs defaultValue="overview">
  <TabsList>
    <TabsTab value="overview">Overview</TabsTab>
    <TabsTab value="projects">Projects</TabsTab>
  </TabsList>
  <TabsPanel value="overview">…</TabsPanel>
  <TabsPanel value="projects">…</TabsPanel>
</Tabs>`}
        />

        <h3 className="heading-xs mt-10 text-fg-primary">Indicator</h3>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Render <Token>TabsIndicator</Token> as a sibling of the tabs inside{" "}
          <Token>TabsList</Token>. It tracks the active tab width and offset.
        </p>
        <CodeBlock
          className="mt-4"
          size="sm"
          code={`<TabsList>
  <TabsTab value="overview">Overview</TabsTab>
  <TabsTab value="projects">Projects</TabsTab>
  <TabsIndicator />
</TabsList>`}
        />
      </section>

      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">API</h2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Root accepts Base UI Tabs props. Parts:
        </p>
        <DocTable headers={["Prop / part", "Type", "Default", "Description"]}>
          <tr>
            <DocCell mono>defaultValue</DocCell>
            <DocCell mono>string | number | null</DocCell>
            <DocCell mono>—</DocCell>
            <DocCell>Uncontrolled initially active tab.</DocCell>
          </tr>
          <tr>
            <DocCell mono>value</DocCell>
            <DocCell mono>string | number | null</DocCell>
            <DocCell mono>—</DocCell>
            <DocCell>Controlled active tab.</DocCell>
          </tr>
          <tr>
            <DocCell mono>onValueChange</DocCell>
            <DocCell mono>
              (value, event) =&gt; void
            </DocCell>
            <DocCell mono>—</DocCell>
            <DocCell>Called when the active tab changes.</DocCell>
          </tr>
          <tr>
            <DocCell mono>TabsList</DocCell>
            <DocCell mono>—</DocCell>
            <DocCell mono>—</DocCell>
            <DocCell>Container for tabs and the indicator.</DocCell>
          </tr>
          <tr>
            <DocCell mono>TabsTab</DocCell>
            <DocCell mono>—</DocCell>
            <DocCell mono>—</DocCell>
            <DocCell>
              Tab control. Requires a <Token>value</Token>.
            </DocCell>
          </tr>
          <tr>
            <DocCell mono>TabsIndicator</DocCell>
            <DocCell mono>—</DocCell>
            <DocCell mono>—</DocCell>
            <DocCell>Animated underline under the active tab.</DocCell>
          </tr>
          <tr>
            <DocCell mono>TabsPanel</DocCell>
            <DocCell mono>—</DocCell>
            <DocCell mono>—</DocCell>
            <DocCell>
              Panel content for a matching <Token>value</Token>.
            </DocCell>
          </tr>
        </DocTable>
      </section>

      <section className="mt-14 mb-8">
        <h2 className="heading-sm text-fg-primary">Guidelines</h2>

        <h3 className="heading-xs mt-8 text-fg-primary">Do</h3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>Use sentence-case labels — Overview, not OVERVIEW</li>
          <li>Keep panels related — same object, different facets</li>
          <li>
            Include <Token>TabsIndicator</Token> for clear selection affordance
          </li>
        </ul>

        <h3 className="heading-xs mt-8 text-fg-primary">Don&rsquo;t</h3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>
            Don&apos;t use tabs for primary app navigation across routes
          </li>
          <li>
            Don&apos;t put more than five or six tabs in one list
          </li>
          <li>
            Don&apos;t mismatch tab and panel <Token>value</Token>s
          </li>
        </ul>
      </section>
    </div>
  )
}
