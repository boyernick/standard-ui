import type { Metadata } from "next";
import { CodeBlock } from "@/components/code-block";
import { DocCell, DocTable, Token } from "@/components/doc-table";
import { PageHeader } from "@/components/page-header";
import { PaginationExamples } from "./pagination-examples";
import { H2, H3 } from "@/components/prose"

export const metadata: Metadata = { title: "Pagination" };

export default function PaginationPage() {
  return (
    <div className="w-full">
      <PageHeader
        title="Pagination"
        description="Page controls for moving through a bounded collection of results."
      />
      <section className="mt-2">
        <H2>Examples</H2>
        <PaginationExamples />
      </section>
      <section className="mt-14">
        <H2>Overview</H2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Compose previous, numbered, ellipsis, and next controls. Set{" "}
          <Token>active</Token> on the current page and disable unavailable
          directions.
        </p>
        <CodeBlock
          className="mt-4"
          code={`import { Pagination, PaginationContent, PaginationLink } from "@boyernick/standard-ui-react"\n\n<Pagination>\n  <PaginationContent>\n    <PaginationLink active>1</PaginationLink>\n  </PaginationContent>\n</Pagination>`}
        />
      </section>
      <section className="mt-14">
        <H2>API</H2>
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
        <H2>Guidelines</H2>
        <H3>Do</H3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>Preserve the current page during navigation</li>
        </ul>
        <H3>Don&apos;t</H3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>Don&apos;t show every page in a large collection</li>
        </ul>
      </section>
    </div>
  );
}
