import type { Metadata } from "next";
import { CodeBlock } from "@/components/code-block";
import { DocCell, DocTable, Token } from "@/components/doc-table";
import { PageHeader } from "@/components/page-header";
import { SpinnerExamples } from "./spinner-examples";

export const metadata: Metadata = { title: "Spinner" };

export default function SpinnerPage() {
  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader
        title="Spinner"
        description="Compact indeterminate progress indicator for controls and inline loading states."
      />
      <section className="mt-2">
        <h2 className="heading-sm text-fg-primary">Examples</h2>
        <SpinnerExamples />
      </section>
      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">Overview</h2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Spinner announces a loading status and inherits the surrounding text
          color. Choose a <Token>size</Token> that matches its container.
        </p>
        <CodeBlock
          className="mt-4"
          code={`import { Spinner } from "@standard-ui/react"\n\n<Spinner size="md" />`}
        />
      </section>
      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">API</h2>
        <DocTable headers={["Prop", "Type", "Default", "Description"]}>
          <tr>
            <DocCell mono>size</DocCell>
            <DocCell mono>
              &quot;sm&quot; | &quot;md&quot; | &quot;lg&quot;
            </DocCell>
            <DocCell mono>md</DocCell>
            <DocCell>Indicator dimensions.</DocCell>
          </tr>
        </DocTable>
      </section>
      <section className="mt-14 mb-8">
        <h2 className="heading-sm text-fg-primary">Guidelines</h2>
        <h3 className="heading-xs mt-8 text-fg-primary">Do</h3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>Use for work with an unknown duration</li>
          <li>Keep it close to the affected content</li>
        </ul>
        <h3 className="heading-xs mt-8 text-fg-primary">Don&apos;t</h3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>Don&apos;t use it when measurable progress is available</li>
        </ul>
      </section>
    </div>
  );
}
