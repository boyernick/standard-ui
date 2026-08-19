import type { Metadata } from "next"
import { CodeBlock } from "@/components/code-block"
import { DocCell, DocTable, Token } from "@/components/doc-table"
import { PageHeader } from "@/components/page-header"
import { MeterExamples } from "./meter-examples"

export const metadata: Metadata = {
  title: "Meter",
}

export default function MeterPage() {
  return (
    <div className="w-full">
      <PageHeader
        title="Meter"
        description="Read-only gauge for a value within a range — storage, quotas, scores. Prefer Progress for task completion."
      />

      <section className="mt-2">
        <h2 className="heading-sm text-fg-primary">Examples</h2>
        <MeterExamples />
      </section>

      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">Overview</h2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Meter shows where a number sits between <Token>min</Token> and{" "}
          <Token>max</Token>. Compose label, value, track, and indicator under
          the root. Built on Base UI for accessible meter semantics.
        </p>
        <CodeBlock
          className="mt-4"
          code={`import {
  Meter,
  MeterLabel,
  MeterValue,
  MeterTrack,
  MeterIndicator,
} from "@standard-ui/react"

<Meter value={72}>
  <MeterLabel>Storage used</MeterLabel>
  <MeterValue />
  <MeterTrack>
    <MeterIndicator />
  </MeterTrack>
</Meter>`}
        />
      </section>

      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">Usage</h2>

        <h3 className="heading-xs mt-8 text-fg-primary">Range</h3>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Pass <Token>value</Token> with optional <Token>min</Token> /{" "}
          <Token>max</Token>. Format via Intl options when units matter.
        </p>
        <CodeBlock
          className="mt-4"
          size="sm"
          code={`<Meter
  value={3.2}
  min={0}
  max={5}
  format={{ style: "unit", unit: "gigabyte" }}
>`}
        />

        <h3 className="heading-xs mt-10 text-fg-primary">Meter vs progress</h3>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Use Meter for static measurements (quota filled). Use Progress when
          work is advancing toward completion.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">API</h2>
        <DocTable headers={["Part", "Role"]}>
          <tr>
            <DocCell mono>Meter</DocCell>
            <DocCell>Root value, min, max, and format.</DocCell>
          </tr>
          <tr>
            <DocCell mono>MeterLabel</DocCell>
            <DocCell>Accessible name for the measurement.</DocCell>
          </tr>
          <tr>
            <DocCell mono>MeterValue</DocCell>
            <DocCell>Formatted current value.</DocCell>
          </tr>
          <tr>
            <DocCell mono>MeterTrack</DocCell>
            <DocCell>Background bar for the full range.</DocCell>
          </tr>
          <tr>
            <DocCell mono>MeterIndicator</DocCell>
            <DocCell>Filled portion reflecting the value.</DocCell>
          </tr>
        </DocTable>
        <DocTable headers={["Prop", "Type", "Default", "Description"]}>
          <tr>
            <DocCell mono>value</DocCell>
            <DocCell mono>number</DocCell>
            <DocCell mono>—</DocCell>
            <DocCell>Current measurement.</DocCell>
          </tr>
          <tr>
            <DocCell mono>min</DocCell>
            <DocCell mono>number</DocCell>
            <DocCell mono>0</DocCell>
            <DocCell>Lower bound of the range.</DocCell>
          </tr>
          <tr>
            <DocCell mono>max</DocCell>
            <DocCell mono>number</DocCell>
            <DocCell mono>100</DocCell>
            <DocCell>Upper bound of the range.</DocCell>
          </tr>
        </DocTable>
      </section>

      <section className="mt-14 mb-8">
        <h2 className="heading-sm text-fg-primary">Guidelines</h2>

        <h3 className="heading-xs mt-8 text-fg-primary">Do</h3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>Label what is being measured</li>
          <li>Show the numeric value when the exact figure matters</li>
          <li>Pick min/max that match the real domain</li>
        </ul>

        <h3 className="heading-xs mt-8 text-fg-primary">Don&apos;t</h3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>Don&apos;t use Meter for indeterminate loading</li>
          <li>Don&apos;t animate as if work is progressing — use Progress</li>
          <li>Don&apos;t omit units when the scale is not obvious</li>
        </ul>
      </section>
    </div>
  )
}
