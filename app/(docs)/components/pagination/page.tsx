import type { Metadata } from "next";
import { CodeBlock } from "@/components/code-block";
import { DocCell, DocTable, Token } from "@/components/doc-table";
import { PageHeader } from "@/components/page-header";
import { PaginationExamples } from "./pagination-examples";

export const metadata: Metadata = { title: "Pagination" };

export default function PaginationPage() {
  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader
        title="Pagination"
        description="Page controls for moving through a bounded collection of results."
      />
      <section className="mt-2">
        <h2 className="heading-sm text-fg-primary">Examples</h2>
        <PaginationExamples />
      </section>
      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">Overview</h2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Compose previous, numbered, ellipsis, and next controls. Set{" "}
          <Token>active</Token> on the current page and disable unavailable
          directions.
        </p>
        <CodeBlock
          className="mt-4"
          code={`import { Pagination, PaginationContent, PaginationLink } from "@standard-ui/react"\n\n<Pagination>\n  <PaginationContent>\n    <PaginationLink active>1</PaginationLink>\n  </PaginationContent>\n</Pagination>`}
        />
      </section>
      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">API</h2>
        <DocTable headers={["Part", "Role"]}>
          <tr>
            <DocCell mono>Pagination</DocCell>
            <DocCell>Navigation landmark.</DocCell>
          </tr>
          <tr>
            <DocCell mono>PaginationLink</DocCell>
            <DocCell>Page button with current state.</DocCell>
          </tr>
          <tr>
            <DocCell mono>PaginationEllipsis</DocCell>
            <DocCell>Omitted range indicator.</DocCell>
          </tr>
        </DocTable>
      </section>
      <section className="mt-14 mb-8">
        <h2 className="heading-sm text-fg-primary">Guidelines</h2>
        <h3 className="heading-xs mt-8 text-fg-primary">Do</h3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>Preserve the current page during navigation</li>
        </ul>
        <h3 className="heading-xs mt-8 text-fg-primary">Don&apos;t</h3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>Don&apos;t show every page in a large collection</li>
        </ul>
      </section>
    </div>
  );
}
