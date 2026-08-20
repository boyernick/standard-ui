import type { Metadata } from "next";
import { CodeBlock } from "@/components/code-block";
import { DocCell, DocTable, Token } from "@/components/doc-table";
import { PageHeader } from "@/components/page-header";
import { SkeletonExamples } from "./skeleton-examples";
import { H2, H3 } from "@/components/prose"

export const metadata: Metadata = { title: "Skeleton" };

export default function SkeletonPage() {
  return (
    <div className="w-full">
      <PageHeader
        title="Skeleton"
        description="Shape-preserving placeholders that reduce layout shift while content loads."
      />
      <section className="mt-2">
        <H2>Examples</H2>
        <SkeletonExamples />
      </section>
      <section className="mt-14">
        <H2>Overview</H2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Combine <Token>block</Token>, <Token>text</Token>, and{" "}
          <Token>circle</Token> variants to approximate the final content
          structure.
        </p>
        <CodeBlock
          className="mt-4"
          code={`import { Skeleton } from "@boyernick/standard-ui-react"\n\n<Skeleton variant="text" className="w-48" />`}
        />
      </section>
      <section className="mt-14">
        <H2>API</H2>
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
        <H2>Guidelines</H2>
        <H3>Do</H3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>Match the dimensions of expected content</li>
        </ul>
        <H3>Don&apos;t</H3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>Don&apos;t use skeletons for immediate actions</li>
        </ul>
      </section>
    </div>
  );
}
