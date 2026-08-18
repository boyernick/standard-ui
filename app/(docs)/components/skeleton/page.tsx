import type { Metadata } from "next";
import { CodeBlock } from "@/components/code-block";
import { DocCell, DocTable, Token } from "@/components/doc-table";
import { PageHeader } from "@/components/page-header";
import { SkeletonExamples } from "./skeleton-examples";

export const metadata: Metadata = { title: "Skeleton" };

export default function SkeletonPage() {
  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader
        title="Skeleton"
        description="Shape-preserving placeholders that reduce layout shift while content loads."
      />
      <section className="mt-2">
        <h2 className="heading-sm text-fg-primary">Examples</h2>
        <SkeletonExamples />
      </section>
      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">Overview</h2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Combine <Token>block</Token>, <Token>text</Token>, and{" "}
          <Token>circle</Token> variants to approximate the final content
          structure.
        </p>
        <CodeBlock
          className="mt-4"
          code={`import { Skeleton } from "@standard-ui/react"\n\n<Skeleton variant="text" className="w-48" />`}
        />
      </section>
      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">API</h2>
        <DocTable headers={["Prop", "Type", "Default", "Description"]}>
          <tr>
            <DocCell mono>variant</DocCell>
            <DocCell mono>
              &quot;block&quot; | &quot;text&quot; | &quot;circle&quot;
            </DocCell>
            <DocCell mono>block</DocCell>
            <DocCell>Placeholder shape.</DocCell>
          </tr>
        </DocTable>
      </section>
      <section className="mt-14 mb-8">
        <h2 className="heading-sm text-fg-primary">Guidelines</h2>
        <h3 className="heading-xs mt-8 text-fg-primary">Do</h3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>Match the dimensions of expected content</li>
        </ul>
        <h3 className="heading-xs mt-8 text-fg-primary">Don&apos;t</h3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>Don&apos;t use skeletons for immediate actions</li>
        </ul>
      </section>
    </div>
  );
}
