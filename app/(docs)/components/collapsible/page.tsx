import type { Metadata } from "next"
import { CodeBlock } from "@/components/code-block"
import { DocCell, DocTable, Token } from "@/components/doc-table"
import { PageHeader } from "@/components/page-header"
import { CollapsibleExamples } from "./collapsible-examples"

export const metadata: Metadata = {
  title: "Collapsible",
}

export default function CollapsiblePage() {
  return (
    <div className="w-full">
      <PageHeader
        title="Collapsible"
        description="Show and hide a related panel of content. Use for optional details, recovery info, and progressive disclosure."
      />

      <section className="mt-2">
        <h2 className="heading-sm text-fg-primary">Examples</h2>
        <CollapsibleExamples />
      </section>

      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">Overview</h2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Collapsible pairs a trigger with a panel that expands and collapses.
          The trigger includes a chevron that rotates when open. Built on Base
          UI for accessible expand/collapse behavior.
        </p>
        <CodeBlock
          className="mt-4"
          code={`import {
  Collapsible,
  CollapsibleTrigger,
  CollapsiblePanel,
} from "@boyernick/standard-ui-react"

<Collapsible>
  <CollapsibleTrigger>Recovery keys</CollapsibleTrigger>
  <CollapsiblePanel>
    Store these keys somewhere safe.
  </CollapsiblePanel>
</Collapsible>`}
        />
      </section>

      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">Usage</h2>

        <h3 className="heading-xs mt-8 text-fg-primary">Composition</h3>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Wrap <Token>CollapsibleTrigger</Token> and{" "}
          <Token>CollapsiblePanel</Token> in <Token>Collapsible</Token>. Keep
          trigger labels short and descriptive of the hidden content.
        </p>
        <CodeBlock
          className="mt-4"
          size="sm"
          code={`<Collapsible defaultOpen>
  <CollapsibleTrigger>Advanced options</CollapsibleTrigger>
  <CollapsiblePanel>
    {/* optional details */}
  </CollapsiblePanel>
</Collapsible>`}
        />

        <h3 className="heading-xs mt-10 text-fg-primary">Open state</h3>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Use <Token>defaultOpen</Token> for uncontrolled, or{" "}
          <Token>open</Token> with <Token>onOpenChange</Token> when the page
          needs to react to expand/collapse.
        </p>
        <CodeBlock
          className="mt-4"
          size="sm"
          code={`<Collapsible open={open} onOpenChange={setOpen}>
  <CollapsibleTrigger>Details</CollapsibleTrigger>
  <CollapsiblePanel>…</CollapsiblePanel>
</Collapsible>`}
        />
      </section>

      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">API</h2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Parts mirror Base UI Collapsible. Root owns open state; trigger and
          panel render the control and content.
        </p>
        <DocTable headers={["Part", "Role"]}>
          <tr>
            <DocCell mono>Collapsible</DocCell>
            <DocCell>Root state and open control.</DocCell>
          </tr>
          <tr>
            <DocCell mono>CollapsibleTrigger</DocCell>
            <DocCell>Toggles the panel. Includes a chevron affordance.</DocCell>
          </tr>
          <tr>
            <DocCell mono>CollapsiblePanel</DocCell>
            <DocCell>Expandable content region.</DocCell>
          </tr>
        </DocTable>

        <h3 className="heading-xs mt-10 text-fg-primary">Collapsible</h3>
        <DocTable headers={["Prop", "Type", "Default", "Description"]}>
          <tr>
            <DocCell mono>defaultOpen</DocCell>
            <DocCell mono>boolean</DocCell>
            <DocCell mono>false</DocCell>
            <DocCell>Uncontrolled initial open state.</DocCell>
          </tr>
          <tr>
            <DocCell mono>open</DocCell>
            <DocCell mono>boolean</DocCell>
            <DocCell mono>—</DocCell>
            <DocCell>Controlled open state.</DocCell>
          </tr>
          <tr>
            <DocCell mono>onOpenChange</DocCell>
            <DocCell mono>
              (open: boolean, event) =&gt; void
            </DocCell>
            <DocCell mono>—</DocCell>
            <DocCell>Called when the panel opens or closes.</DocCell>
          </tr>
          <tr>
            <DocCell mono>disabled</DocCell>
            <DocCell mono>boolean</DocCell>
            <DocCell mono>false</DocCell>
            <DocCell>Disables the collapsible.</DocCell>
          </tr>
        </DocTable>
      </section>

      <section className="mt-14 mb-8">
        <h2 className="heading-sm text-fg-primary">Guidelines</h2>

        <h3 className="heading-xs mt-8 text-fg-primary">Do</h3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>
            Use for optional or secondary content that most users can skip
          </li>
          <li>Label the trigger with what will be revealed</li>
          <li>
            Prefer accordion when several related sections share one list
          </li>
        </ul>

        <h3 className="heading-xs mt-8 text-fg-primary">Don&rsquo;t</h3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>
            Don&apos;t hide required form fields behind a collapsible
          </li>
          <li>
            Don&apos;t nest many collapsibles — prefer a clearer page structure
          </li>
          <li>
            Don&apos;t use a collapsible for a single short sentence of text
          </li>
        </ul>
      </section>
    </div>
  )
}
