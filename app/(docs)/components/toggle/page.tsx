import type { Metadata } from "next"
import { CodeBlock } from "@/components/code-block"
import { DocCell, DocTable, Token } from "@/components/doc-table"
import { PageHeader } from "@/components/page-header"
import { ToggleExamples } from "./toggle-examples"

export const metadata: Metadata = {
  title: "Toggle",
}

export default function TogglePage() {
  return (
    <div className="w-full">
      <PageHeader
        title="Toggle"
        description="Pressed or unpressed control for formatting and view options. Group toggles when choices share a context."
      />

      <section className="mt-2">
        <h2 className="heading-sm text-fg-primary">Examples</h2>
        <ToggleExamples />
      </section>

      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">Overview</h2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Toggle is a two-state button. Use alone for a single option, or wrap
          several in <Token>ToggleGroup</Token> for alignment and formatting
          toolbars. Groups default to single selection; set{" "}
          <Token>multiple</Token> when more than one can stay pressed.
        </p>
        <CodeBlock
          className="mt-4"
          code={`import { Toggle, ToggleGroup } from "@boyernick/standard-ui-react"

<Toggle defaultPressed>Bold</Toggle>

<ToggleGroup defaultValue={["center"]}>
  <Toggle value="left">Left</Toggle>
  <Toggle value="center">Center</Toggle>
  <Toggle value="right">Right</Toggle>
</ToggleGroup>`}
        />
      </section>

      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">Usage</h2>

        <h3 className="heading-xs mt-8 text-fg-primary">Single toggle</h3>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Use <Token>defaultPressed</Token> or controlled{" "}
          <Token>pressed</Token> / <Token>onPressedChange</Token>. Provide an
          accessible name with visible text or <Token>aria-label</Token>.
        </p>
        <CodeBlock
          className="mt-4"
          size="sm"
          code={`<Toggle aria-label="Bold" defaultPressed>
  Bold
</Toggle>`}
        />

        <h3 className="heading-xs mt-10 text-fg-primary">Toggle group</h3>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Each child <Token>Toggle</Token> needs a <Token>value</Token>. The
          group tracks pressed values as an array via{" "}
          <Token>defaultValue</Token> or <Token>value</Token>.
        </p>
        <CodeBlock
          className="mt-4"
          size="sm"
          code={`<ToggleGroup
  aria-label="Text alignment"
  defaultValue={["left"]}
>
  <Toggle value="left">Left</Toggle>
  <Toggle value="center">Center</Toggle>
  <Toggle value="right">Right</Toggle>
</ToggleGroup>`}
        />

        <h3 className="heading-xs mt-10 text-fg-primary">Multiple</h3>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Pass <Token>multiple</Token> so several toggles can stay pressed —
          useful for Bold / Italic / Underline. Without it, pressing one clears
          the others.
        </p>
        <CodeBlock
          className="mt-4"
          size="sm"
          code={`<ToggleGroup multiple defaultValue={["bold"]}>
  <Toggle value="bold">Bold</Toggle>
  <Toggle value="italic">Italic</Toggle>
</ToggleGroup>`}
        />
      </section>

      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">API</h2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Toggle and ToggleGroup accept Base UI props for pressed state and
          group selection.
        </p>

        <h3 className="heading-xs mt-8 text-fg-primary">Toggle</h3>
        <DocTable headers={["Prop", "Type", "Default", "Description"]}>
          <tr>
            <DocCell mono>defaultPressed</DocCell>
            <DocCell mono>boolean</DocCell>
            <DocCell mono>false</DocCell>
            <DocCell>Uncontrolled initial pressed state.</DocCell>
          </tr>
          <tr>
            <DocCell mono>pressed</DocCell>
            <DocCell mono>boolean</DocCell>
            <DocCell mono>—</DocCell>
            <DocCell>Controlled pressed state.</DocCell>
          </tr>
          <tr>
            <DocCell mono>onPressedChange</DocCell>
            <DocCell mono>
              (pressed: boolean, event) =&gt; void
            </DocCell>
            <DocCell mono>—</DocCell>
            <DocCell>Called when pressed state changes.</DocCell>
          </tr>
          <tr>
            <DocCell mono>value</DocCell>
            <DocCell mono>string</DocCell>
            <DocCell mono>—</DocCell>
            <DocCell>Identifies the toggle inside a group.</DocCell>
          </tr>
          <tr>
            <DocCell mono>disabled</DocCell>
            <DocCell mono>boolean</DocCell>
            <DocCell mono>false</DocCell>
            <DocCell>Disables the toggle.</DocCell>
          </tr>
        </DocTable>

        <h3 className="heading-xs mt-10 text-fg-primary">ToggleGroup</h3>
        <DocTable headers={["Prop", "Type", "Default", "Description"]}>
          <tr>
            <DocCell mono>defaultValue</DocCell>
            <DocCell mono>string[]</DocCell>
            <DocCell mono>—</DocCell>
            <DocCell>Uncontrolled pressed values.</DocCell>
          </tr>
          <tr>
            <DocCell mono>value</DocCell>
            <DocCell mono>string[]</DocCell>
            <DocCell mono>—</DocCell>
            <DocCell>Controlled pressed values.</DocCell>
          </tr>
          <tr>
            <DocCell mono>onValueChange</DocCell>
            <DocCell mono>
              (value: string[], event) =&gt; void
            </DocCell>
            <DocCell mono>—</DocCell>
            <DocCell>Called when group selection changes.</DocCell>
          </tr>
          <tr>
            <DocCell mono>multiple</DocCell>
            <DocCell mono>boolean</DocCell>
            <DocCell mono>false</DocCell>
            <DocCell>Allow more than one toggle pressed.</DocCell>
          </tr>
          <tr>
            <DocCell mono>disabled</DocCell>
            <DocCell mono>boolean</DocCell>
            <DocCell mono>false</DocCell>
            <DocCell>Disables the entire group.</DocCell>
          </tr>
        </DocTable>
      </section>

      <section className="mt-14 mb-8">
        <h2 className="heading-sm text-fg-primary">Guidelines</h2>

        <h3 className="heading-xs mt-8 text-fg-primary">Do</h3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>
            Use toggles for formatting and view options that stay pressed
          </li>
          <li>
            Use <Token>multiple</Token> only when several options can apply at
            once
          </li>
          <li>
            Prefer a switch for a single on/off setting that takes effect
            immediately
          </li>
        </ul>

        <h3 className="heading-xs mt-8 text-fg-primary">Don't</h3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>
            Don&apos;t use toggles for navigation — use links or tabs
          </li>
          <li>
            Don&apos;t omit <Token>value</Token> on toggles inside a group
          </li>
          <li>
            Don&apos;t force <Token>cursor-pointer</Token> — keep the platform
            default for controls
          </li>
        </ul>
      </section>
    </div>
  )
}
