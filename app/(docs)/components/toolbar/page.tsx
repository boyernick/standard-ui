import type { Metadata } from "next"
import { CodeBlock } from "@/components/code-block"
import { DocCell, DocTable, Token } from "@/components/doc-table"
import { PageHeader } from "@/components/page-header"
import { ToolbarExamples } from "./toolbar-examples"

export const metadata: Metadata = {
  title: "Toolbar",
}

export default function ToolbarPage() {
  return (
    <div className="w-full">
      <PageHeader
        title="Toolbar"
        description="Grouped controls with arrow-key navigation. Use for formatting bars, inspector tools, and compact action strips."
      />

      <section className="mt-2">
        <h2 className="heading-sm text-fg-primary">Examples</h2>
        <ToolbarExamples />
      </section>

      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">Overview</h2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Toolbar is a focusable group of buttons, links, and inputs. Separators
          and groups organize related actions. Compose Menu or Tooltip with{" "}
          <Token>render</Token> when a control opens a popup.
        </p>
        <CodeBlock
          className="mt-4"
          code={`import {
  Toolbar,
  ToolbarGroup,
  ToolbarButton,
  ToolbarSeparator,
  ToolbarLink,
} from "@boyernick/standard-ui-react"

<Toolbar aria-label="Formatting">
  <ToolbarGroup>
    <ToolbarButton aria-label="Bold">B</ToolbarButton>
    <ToolbarButton aria-label="Italic">I</ToolbarButton>
  </ToolbarGroup>
  <ToolbarSeparator />
  <ToolbarLink href="#">Docs</ToolbarLink>
</Toolbar>`}
        />
      </section>

      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">Usage</h2>

        <h3 className="heading-xs mt-8 text-fg-primary">Input placement</h3>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          In a horizontal toolbar, use at most one input and place it last —
          arrow keys also move the caret inside inputs.
        </p>
        <CodeBlock
          className="mt-4"
          size="sm"
          code={`<Toolbar aria-label="Search tools">
  <ToolbarButton aria-label="Home">…</ToolbarButton>
  <ToolbarSeparator />
  <ToolbarInput placeholder="Filter…" aria-label="Filter" />
</Toolbar>`}
        />

        <h3 className="heading-xs mt-10 text-fg-primary">Anatomy</h3>
        <CodeBlock
          className="mt-4"
          size="sm"
          code={`Toolbar
  ToolbarGroup
    ToolbarButton
  ToolbarSeparator
  ToolbarLink
  ToolbarInput`}
        />
      </section>

      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">API</h2>
        <DocTable headers={["Part", "Role"]}>
          <tr>
            <DocCell mono>Toolbar</DocCell>
            <DocCell>Root toolbar with orientation and focus loop.</DocCell>
          </tr>
          <tr>
            <DocCell mono>ToolbarGroup</DocCell>
            <DocCell>Groups related controls.</DocCell>
          </tr>
          <tr>
            <DocCell mono>ToolbarButton</DocCell>
            <DocCell>Action or popup trigger inside the toolbar.</DocCell>
          </tr>
          <tr>
            <DocCell mono>ToolbarLink</DocCell>
            <DocCell>Navigational item rendered as an anchor.</DocCell>
          </tr>
          <tr>
            <DocCell mono>ToolbarInput</DocCell>
            <DocCell>Native input integrated with toolbar focus.</DocCell>
          </tr>
          <tr>
            <DocCell mono>ToolbarSeparator</DocCell>
            <DocCell>Visual and semantic divider between groups.</DocCell>
          </tr>
        </DocTable>
      </section>

      <section className="mt-14 mb-8">
        <h2 className="heading-sm text-fg-primary">Guidelines</h2>

        <h3 className="heading-xs mt-8 text-fg-primary">Do</h3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>Label the toolbar with aria-label for screen readers</li>
          <li>Group related actions and separate with separators</li>
          <li>Prefer icon-only buttons with clear aria-labels</li>
        </ul>

        <h3 className="heading-xs mt-8 text-fg-primary">Don&apos;t</h3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>Don&apos;t pack multiple inputs into a horizontal toolbar</li>
          <li>Don&apos;t use Toolbar for page-level navigation — use nav</li>
          <li>Don&apos;t omit labels on icon-only controls</li>
        </ul>
      </section>
    </div>
  )
}
