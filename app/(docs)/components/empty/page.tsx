import type { Metadata } from "next";
import { CodeBlock } from "@/components/code-block";
import { DocCell, DocTable } from "@/components/doc-table";
import { PageHeader } from "@/components/page-header";
import { EmptyExamples } from "./empty-examples";

export const metadata: Metadata = { title: "Empty" };

export default function EmptyPage() {
  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader
        title="Empty"
        description="Composed empty states for missing content, first-run guidance, and zero results."
      />
      <section className="mt-2">
        <h2 className="heading-sm text-fg-primary">Examples</h2>
        <EmptyExamples />
      </section>
      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">Overview</h2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Compose an icon, concise title, supporting description, and an
          optional recovery action.
        </p>
        <CodeBlock
          className="mt-4"
          code={`import { Empty, EmptyTitle, EmptyDescription } from "@standard-ui/react"\n\n<Empty>\n  <EmptyTitle>No projects</EmptyTitle>\n  <EmptyDescription>Create a project to get started.</EmptyDescription>\n</Empty>`}
        />
      </section>
      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">API</h2>
        <DocTable headers={["Part", "Role"]}>
          <tr>
            <DocCell mono>Empty</DocCell>
            <DocCell>Centered state container.</DocCell>
          </tr>
          <tr>
            <DocCell mono>EmptyIcon</DocCell>
            <DocCell>Visual context.</DocCell>
          </tr>
          <tr>
            <DocCell mono>EmptyActions</DocCell>
            <DocCell>Primary and secondary actions.</DocCell>
          </tr>
        </DocTable>
      </section>
      <section className="mt-14 mb-8">
        <h2 className="heading-sm text-fg-primary">Guidelines</h2>
        <h3 className="heading-xs mt-8 text-fg-primary">Do</h3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>Explain why the area is empty</li>
          <li>Offer one clear next step</li>
        </ul>
        <h3 className="heading-xs mt-8 text-fg-primary">Don&apos;t</h3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>Don&apos;t blame the user</li>
        </ul>
      </section>
    </div>
  );
}
