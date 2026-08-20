import type { Metadata } from "next"
import { CodeBlock } from "@/components/code-block"
import { DocCell, DocTable, Token } from "@/components/doc-table"
import { PageHeader } from "@/components/page-header"
import { ToolbarExamples } from "./toolbar-examples"
import { H2, H3 } from "@/components/prose"
import { PropsTable, StylingPropsNote, type GeneratedFamily } from "@/components/api-table"
import toolbarApi from "@/lib/generated/api/toolbar.json"

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
        <H2>Examples</H2>
        <ToolbarExamples />
      </section>

      <section className="mt-14">
        <H2>Overview</H2>
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
        <H2>Usage</H2>

        <H3>Input placement</H3>
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

        <H3 className="mt-10">Anatomy</H3>
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
        <H2>API</H2>
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
        <H3>Toolbar props</H3>
        <PropsTable family={toolbarApi as GeneratedFamily} part="Toolbar" />
        <StylingPropsNote />

        <H2>Guidelines</H2>

        <H3>Do</H3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>Label the toolbar with aria-label for screen readers</li>
          <li>Group related actions and separate with separators</li>
          <li>Prefer icon-only buttons with clear aria-labels</li>
        </ul>

        <H3>Don&apos;t</H3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>Don&apos;t pack multiple inputs into a horizontal toolbar</li>
          <li>Don&apos;t use Toolbar for page-level navigation — use nav</li>
          <li>Don&apos;t omit labels on icon-only controls</li>
        </ul>
      </section>
    </div>
  )
}
