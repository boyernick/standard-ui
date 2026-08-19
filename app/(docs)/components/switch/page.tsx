import type { Metadata } from "next"
import { CodeBlock } from "@/components/code-block"
import { DocCell, DocTable, Token } from "@/components/doc-table"
import { PageHeader } from "@/components/page-header"
import { SwitchExamples } from "./switch-examples"

export const metadata: Metadata = {
  title: "Switch",
}

export default function SwitchPage() {
  return (
    <div className="w-full">
      <PageHeader
        title="Switch"
        description="Binary on/off control for settings and preferences. Use when the change takes effect immediately."
      />

      <section className="mt-2">
        <h2 className="heading-sm text-fg-primary">Examples</h2>
        <SwitchExamples />
      </section>

      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">Overview</h2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Switch toggles a single setting between on and off. The checked track
          uses <Token>brand-primary</Token>. Built on Base UI for accessible
          keyboard and pointer behavior.
        </p>
        <CodeBlock
          className="mt-4"
          code={`import { Switch } from "@boyernick/standard-ui-react"

<label className="flex items-center gap-2">
  <Switch defaultChecked />
  Airplane mode
</label>`}
        />
      </section>

      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">Usage</h2>

        <h3 className="heading-xs mt-8 text-fg-primary">Labeling</h3>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Wrap the switch in a <Token>label</Token>, or pair it with{" "}
          <Token>htmlFor</Token> / <Token>id</Token>, so the control has an
          accessible name.
        </p>
        <CodeBlock
          className="mt-4"
          size="sm"
          code={`<label className="flex items-center gap-2">
  <Switch />
  Notifications
</label>`}
        />

        <h3 className="heading-xs mt-10 text-fg-primary">Disabled</h3>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Disabled switches use reduced opacity and{" "}
          <Token>cursor-not-allowed</Token>. Prefer explaining why a setting is
          unavailable.
        </p>
        <CodeBlock
          className="mt-4"
          size="sm"
          code={`<Switch disabled defaultChecked />`}
        />
      </section>

      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">API</h2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Switch accepts Base UI Switch root props, including controlled and
          uncontrolled checked state.
        </p>
        <DocTable headers={["Prop", "Type", "Default", "Description"]}>
          <tr>
            <DocCell mono>defaultChecked</DocCell>
            <DocCell mono>boolean</DocCell>
            <DocCell mono>—</DocCell>
            <DocCell>Uncontrolled initial checked state.</DocCell>
          </tr>
          <tr>
            <DocCell mono>checked</DocCell>
            <DocCell mono>boolean</DocCell>
            <DocCell mono>—</DocCell>
            <DocCell>Controlled checked state.</DocCell>
          </tr>
          <tr>
            <DocCell mono>onCheckedChange</DocCell>
            <DocCell mono>
              (checked: boolean, event) =&gt; void
            </DocCell>
            <DocCell mono>—</DocCell>
            <DocCell>Called when the checked state changes.</DocCell>
          </tr>
          <tr>
            <DocCell mono>disabled</DocCell>
            <DocCell mono>boolean</DocCell>
            <DocCell mono>false</DocCell>
            <DocCell>Disables the switch.</DocCell>
          </tr>
        </DocTable>
      </section>

      <section className="mt-14 mb-8">
        <h2 className="heading-sm text-fg-primary">Guidelines</h2>

        <h3 className="heading-xs mt-8 text-fg-primary">Do</h3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>
            Use a switch when toggling takes effect immediately (no separate
            Save)
          </li>
          <li>Label the setting clearly — name the preference, not “On/Off”</li>
          <li>
            Prefer a checkbox for multi-select lists or form fields that submit
            later
          </li>
        </ul>

        <h3 className="heading-xs mt-8 text-fg-primary">Don't</h3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>
            Don&apos;t use a switch for actions that need confirmation — use a
            button
          </li>
          <li>
            Don&apos;t leave switches unlabeled
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
