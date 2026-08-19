import type { Metadata } from "next"
import { CodeBlock } from "@/components/code-block"
import { DocCell, DocTable, Token } from "@/components/doc-table"
import { PageHeader } from "@/components/page-header"
import { ProgressExamples } from "./progress-examples"

export const metadata: Metadata = {
  title: "Progress",
}

export default function ProgressPage() {
  return (
    <div className="w-full">
      <PageHeader
        title="Progress"
        description="Visualize completion for uploads, sync, and multi-step work. Pair a label with a live value when the percentage matters."
      />

      <section className="mt-2">
        <h2 className="heading-sm text-fg-primary">Examples</h2>
        <ProgressExamples />
      </section>

      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">Overview</h2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Progress shows how far a task has gone. Compose label, value, track,
          and indicator under a root that holds the numeric{" "}
          <Token>value</Token>. Built on Base UI for accessible progress
          semantics.
        </p>
        <CodeBlock
          className="mt-4"
          code={`import {
  Progress,
  ProgressLabel,
  ProgressValue,
  ProgressTrack,
  ProgressIndicator,
} from "@boyernick/standard-ui-react"

<Progress value={60}>
  <ProgressLabel>Uploading</ProgressLabel>
  <ProgressValue />
  <ProgressTrack>
    <ProgressIndicator />
  </ProgressTrack>
</Progress>`}
        />
      </section>

      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">Usage</h2>

        <h3 className="heading-xs mt-8 text-fg-primary">Value</h3>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Pass a number from <Token>0</Token> to <Token>100</Token> (or your
          custom max). Update it as work progresses so the indicator width and{" "}
          <Token>ProgressValue</Token> stay in sync.
        </p>
        <CodeBlock
          className="mt-4"
          size="sm"
          code={`<Progress value={uploadPercent}>
  <ProgressLabel>Uploading</ProgressLabel>
  <ProgressValue />
  <ProgressTrack>
    <ProgressIndicator />
  </ProgressTrack>
</Progress>`}
        />

        <h3 className="heading-xs mt-10 text-fg-primary">Label and value</h3>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Use <Token>ProgressLabel</Token> for the task name and{" "}
          <Token>ProgressValue</Token> for the formatted percentage. The root
          lays them out in a two-column grid above the track.
        </p>
        <CodeBlock
          className="mt-4"
          size="sm"
          code={`<ProgressLabel>Syncing</ProgressLabel>
<ProgressValue />`}
        />
      </section>

      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">API</h2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Parts mirror Base UI Progress. The root accepts value and related
          props.
        </p>
        <DocTable headers={["Part", "Role"]}>
          <tr>
            <DocCell mono>Progress</DocCell>
            <DocCell>Root state and numeric value.</DocCell>
          </tr>
          <tr>
            <DocCell mono>ProgressLabel</DocCell>
            <DocCell>Accessible name for the task.</DocCell>
          </tr>
          <tr>
            <DocCell mono>ProgressValue</DocCell>
            <DocCell>Formatted current value (e.g. percentage).</DocCell>
          </tr>
          <tr>
            <DocCell mono>ProgressTrack</DocCell>
            <DocCell>Background bar that spans the full width.</DocCell>
          </tr>
          <tr>
            <DocCell mono>ProgressIndicator</DocCell>
            <DocCell>Filled portion reflecting the current value.</DocCell>
          </tr>
        </DocTable>
        <DocTable headers={["Prop", "Type", "Default", "Description"]}>
          <tr>
            <DocCell mono>value</DocCell>
            <DocCell mono>number | null</DocCell>
            <DocCell mono>—</DocCell>
            <DocCell>Current progress value.</DocCell>
          </tr>
          <tr>
            <DocCell mono>max</DocCell>
            <DocCell mono>number</DocCell>
            <DocCell mono>100</DocCell>
            <DocCell>Maximum value for a complete bar.</DocCell>
          </tr>
        </DocTable>
      </section>

      <section className="mt-14 mb-8">
        <h2 className="heading-sm text-fg-primary">Guidelines</h2>

        <h3 className="heading-xs mt-8 text-fg-primary">Do</h3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>Label the task so users know what is in progress</li>
          <li>Update value as work advances — avoid a stuck bar</li>
          <li>
            Prefer determinate progress when you can estimate completion
          </li>
        </ul>

        <h3 className="heading-xs mt-8 text-fg-primary">Don't</h3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>
            Don&apos;t use progress for instant actions that finish in under a
            second
          </li>
          <li>
            Don&apos;t omit a label when multiple progress bars appear together
          </li>
          <li>
            Don&apos;t animate wildly — keep transitions short and ease-out
          </li>
        </ul>
      </section>
    </div>
  )
}
