import type { Metadata } from "next";
import { CodeBlock } from "@/components/code-block";
import { DocCell, DocTable } from "@/components/doc-table";
import { PageHeader } from "@/components/page-header";
import { TableExamples } from "./table-examples";
import { H2, H3 } from "@/components/prose"

export const metadata: Metadata = { title: "Table" };

export default function TablePage() {
  return (
    <div className="w-full">
      <PageHeader
        title="Table"
        description="Semantic data tables with consistent headers, rows, cells, captions, and totals."
      />
      <section className="mt-2">
        <H2>Examples</H2>
        <TableExamples />
      </section>
      <section className="mt-14">
        <H2>Overview</H2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Use semantic table parts to present comparable values in rows and
          columns. The root provides a responsive overflow container.
        </p>
        <CodeBlock
          className="mt-4"
          code={`import { Table, TableBody, TableCell, TableRow } from "@boyernick/standard-ui-react"\n\n<Table>\n  <TableBody>\n    <TableRow><TableCell>INV-001</TableCell></TableRow>\n  </TableBody>\n</Table>`}
        />
      </section>
      <section className="mt-14">
        <H2>API</H2>
        <DocTable headers={["Part", "Element"]}>
          <tr>
            <DocCell mono>Table</DocCell>
            <DocCell mono>table</DocCell>
          </tr>
          <tr>
            <DocCell mono>TableHead</DocCell>
            <DocCell mono>th</DocCell>
          </tr>
          <tr>
            <DocCell mono>TableCell</DocCell>
            <DocCell mono>td</DocCell>
          </tr>
        </DocTable>
      </section>
      <section className="mt-14 mb-8">
        <H2>Guidelines</H2>
        <H3>Do</H3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>Use clear, concise column headings</li>
          <li>Align numeric data consistently</li>
        </ul>
        <H3>Don&apos;t</H3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>Don&apos;t use a table for unrelated content</li>
        </ul>
      </section>
    </div>
  );
}
