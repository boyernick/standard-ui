import type { Metadata } from "next"
import { Separator } from "@boyernick/standard-ui-react"
import { CodeBlock } from "@/components/code-block"
import { ComponentCanvas } from "@/components/component-canvas"
import { DocCell, DocTable, Token } from "@/components/doc-table"
import { PageHeader } from "@/components/page-header"
import { H2, H3 } from "@/components/prose"

export const metadata: Metadata = {
  title: "Separator",
}

export default function SeparatorPage() {
  return (
    <div className="w-full">
      <PageHeader
        title="Separator"
        description="Visual divider for sections and inline groups. Prefer horizontal in stacks; use vertical between related actions."
      />

      <section className="mt-2">
        <H2>Examples</H2>

        <div className="mt-6 flex flex-col gap-8">
          <ComponentCanvas
            label="Horizontal"
            contentClassName="w-full max-w-xs flex-col items-stretch"
            code={`<div className="flex flex-col gap-3">
  <p>Profile</p>
  <Separator />
  <p>Billing</p>
  <Separator />
  <p>Team</p>
</div>`}
          >
            <div className="text-sm flex w-full flex-col gap-3 text-fg-primary">
              <p>Profile</p>
              <Separator />
              <p>Billing</p>
              <Separator />
              <p>Team</p>
            </div>
          </ComponentCanvas>

          <ComponentCanvas
            label="Vertical"
            contentClassName="h-6 items-center"
            code={`<div className="flex h-6 items-center gap-3">
  <a href="#">Home</a>
  <Separator orientation="vertical" />
  <a href="#">Docs</a>
  <Separator orientation="vertical" />
  <a href="#">Support</a>
</div>`}
          >
            <div className="text-sm flex h-6 items-center gap-3 text-fg-primary">
              <a href="#" className="cursor-pointer hover:text-fg-secondary">
                Home
              </a>
              <Separator orientation="vertical" />
              <a href="#" className="cursor-pointer hover:text-fg-secondary">
                Docs
              </a>
              <Separator orientation="vertical" />
              <a href="#" className="cursor-pointer hover:text-fg-secondary">
                Support
              </a>
            </div>
          </ComponentCanvas>
        </div>
      </section>

      <section className="mt-14">
        <H2>Overview</H2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Separator draws a thin rule between content. Default orientation is
          horizontal. Set <Token>orientation=&quot;vertical&quot;</Token> when
          dividing items in a row. Built on Base UI for correct semantics.
        </p>
        <CodeBlock
          className="mt-4"
          code={`import { Separator } from "@boyernick/standard-ui-react"

<Separator />
<Separator orientation="vertical" />`}
        />
      </section>

      <section className="mt-14">
        <H2>Usage</H2>

        <H3>Horizontal</H3>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Place between stacked sections or list groups. The separator spans
          the full width of its container by default.
        </p>
        <CodeBlock
          className="mt-4"
          size="sm"
          code={`<div className="flex flex-col gap-3">
  <p>Profile</p>
  <Separator />
  <p>Billing</p>
</div>`}
        />

        <H3 className="mt-10">Vertical</H3>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Use in a flex row with a fixed height so the vertical rule has room
          to stretch. Common between nav links or toolbar actions.
        </p>
        <CodeBlock
          className="mt-4"
          size="sm"
          code={`<div className="flex h-6 items-center gap-3">
  <a href="#">Home</a>
  <Separator orientation="vertical" />
  <a href="#">Docs</a>
</div>`}
        />
      </section>

      <section className="mt-14">
        <H2>API</H2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Separator accepts Base UI Separator props.
        </p>
        <DocTable headers={["Prop", "Type", "Default", "Description"]}>
          <tr>
            <DocCell mono>orientation</DocCell>
            <DocCell mono>
              &quot;horizontal&quot; | &quot;vertical&quot;
            </DocCell>
            <DocCell mono>&quot;horizontal&quot;</DocCell>
            <DocCell>Direction of the divider.</DocCell>
          </tr>
          <tr>
            <DocCell mono>decorative</DocCell>
            <DocCell mono>boolean</DocCell>
            <DocCell mono>true</DocCell>
            <DocCell>
              When true, treated as presentational for assistive tech.
            </DocCell>
          </tr>
        </DocTable>
      </section>

      <section className="mt-14 mb-8">
        <H2>Guidelines</H2>

        <H3>Do</H3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>Use separators to group related content, not every row</li>
          <li>
            Give vertical separators a sized parent so they have height
          </li>
          <li>Keep spacing consistent around the rule</li>
        </ul>

        <H3>Don&rsquo;t</H3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>
            Don&apos;t stack many separators — prefer whitespace when possible
          </li>
          <li>
            Don&apos;t use separators as a substitute for clear headings
          </li>
          <li>
            Don&apos;t place vertical separators without a height constraint
          </li>
        </ul>
      </section>
    </div>
  )
}
