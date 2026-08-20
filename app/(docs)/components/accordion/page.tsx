import type { Metadata } from "next"
import { CodeBlock } from "@/components/code-block"
import { DocCell, DocTable, Token } from "@/components/doc-table"
import { PageHeader } from "@/components/page-header"
import { AccordionExamples } from "./accordion-examples"
import { H2, H3 } from "@/components/prose"

export const metadata: Metadata = {
  title: "Accordion",
}

export default function AccordionPage() {
  return (
    <div className="w-full">
      <PageHeader
        title="Accordion"
        description="Expandable sections for FAQs, settings groups, and progressive disclosure. One item open by default, or allow multiple."
      />

      <section className="mt-2">
        <H2>Examples</H2>
        <AccordionExamples />
      </section>

      <section className="mt-14">
        <H2>Overview</H2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Accordion nests items with a header trigger and a collapsible panel.
          Built on Base UI for keyboard navigation and animated height. Use it
          when related content should stay off the page until requested.
        </p>
        <CodeBlock
          className="mt-4"
          code={`import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionPanel,
} from "@boyernick/standard-ui-react"

<Accordion defaultValue={["item-1"]}>
  <AccordionItem value="item-1">
    <AccordionHeader>
      <AccordionTrigger>Section title</AccordionTrigger>
    </AccordionHeader>
    <AccordionPanel>Hidden until expanded.</AccordionPanel>
  </AccordionItem>
</Accordion>`}
        />
      </section>

      <section className="mt-14">
        <H2>Usage</H2>

        <H3>Structure</H3>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Each item needs a unique <Token>value</Token>. Wrap the trigger in{" "}
          <Token>AccordionHeader</Token>, then put body copy in{" "}
          <Token>AccordionPanel</Token>.
        </p>
        <CodeBlock
          className="mt-4"
          size="sm"
          code={`<AccordionItem value="shipping">
  <AccordionHeader>
    <AccordionTrigger>Shipping</AccordionTrigger>
  </AccordionHeader>
  <AccordionPanel>
    Orders ship within two business days.
  </AccordionPanel>
</AccordionItem>`}
        />

        <H3 className="mt-10">Multiple open</H3>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Pass <Token>multiple</Token> when several panels can stay open at
          once. Values are always arrays — even with a single open item.
        </p>
        <CodeBlock
          className="mt-4"
          size="sm"
          code={`<Accordion multiple defaultValue={["a", "b"]}>
  {/* items */}
</Accordion>`}
        />
      </section>

      <section className="mt-14">
        <H2>API</H2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Parts mirror Base UI Accordion. Root open state uses string arrays;
          each item needs a unique <Token>value</Token>.
        </p>
        <DocTable headers={["Part", "Role"]}>
          <tr>
            <DocCell mono>Accordion</DocCell>
            <DocCell>Root state and open control.</DocCell>
          </tr>
          <tr>
            <DocCell mono>AccordionItem</DocCell>
            <DocCell>
              Single section. Requires a unique <Token>value</Token>.
            </DocCell>
          </tr>
          <tr>
            <DocCell mono>AccordionHeader</DocCell>
            <DocCell>Wraps the trigger for heading semantics.</DocCell>
          </tr>
          <tr>
            <DocCell mono>AccordionTrigger</DocCell>
            <DocCell>Expands and collapses the panel.</DocCell>
          </tr>
          <tr>
            <DocCell mono>AccordionPanel</DocCell>
            <DocCell>Collapsible body content.</DocCell>
          </tr>
        </DocTable>
        <DocTable headers={["Prop", "Type", "Default", "Description"]}>
          <tr>
            <DocCell mono>defaultValue</DocCell>
            <DocCell mono>string[]</DocCell>
            <DocCell mono>[]</DocCell>
            <DocCell>Uncontrolled initially open item values.</DocCell>
          </tr>
          <tr>
            <DocCell mono>value</DocCell>
            <DocCell mono>string[]</DocCell>
            <DocCell mono>—</DocCell>
            <DocCell>Controlled open item values on the root.</DocCell>
          </tr>
          <tr>
            <DocCell mono>onValueChange</DocCell>
            <DocCell mono>
              (value: string[], event) =&gt; void
            </DocCell>
            <DocCell mono>—</DocCell>
            <DocCell>Called when open items change.</DocCell>
          </tr>
          <tr>
            <DocCell mono>multiple</DocCell>
            <DocCell mono>boolean</DocCell>
            <DocCell mono>false</DocCell>
            <DocCell>Allow more than one panel open at once.</DocCell>
          </tr>
        </DocTable>
      </section>

      <section className="mt-14 mb-8">
        <H2>Guidelines</H2>

        <H3>Do</H3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>Use clear, question-style or topic triggers</li>
          <li>
            Keep panel content short — link out for long docs
          </li>
          <li>
            Prefer <Token>defaultValue</Token> for the most common answer
          </li>
        </ul>

        <H3>Don&rsquo;t</H3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>
            Don&apos;t nest interactive forms deep inside every panel by
            default — consider a dedicated page
          </li>
          <li>
            Don&apos;t use accordion for primary navigation
          </li>
          <li>
            Don&apos;t leave items without a stable <Token>value</Token>
          </li>
        </ul>
      </section>
    </div>
  )
}
