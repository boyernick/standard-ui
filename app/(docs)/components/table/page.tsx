import type { Metadata } from "next";
import { CodeBlock } from "@/components/code-block";
import { DocCell, DocTable } from "@/components/doc-table";
import { PageHeader } from "@/components/page-header";
import { TableExamples } from "./table-examples";

export const metadata: Metadata = { title: "Table" };

export default function TablePage() {
  return (
    <div className="w-full">
      <PageHeader
        title="Table"
        description="Semantic data tables with consistent headers, rows, cells, captions, and totals."
      />
      <section className="mt-2">
        <h2 className="heading-sm text-fg-primary">Examples</h2>
        <TableExamples />
      </section>
      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">Overview</h2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Use semantic table parts to present comparable values in rows and
          columns. The root provides a responsive overflow container.
        </p>
        <CodeBlock
          className="mt-4"
          code={`import { Table, TableBody, TableCell, TableRow } from "@standard-ui/react"\n\n<Table>\n  <TableBody>\n    <TableRow><TableCell>INV-001</TableCell></TableRow>\n  </TableBody>\n</Table>`}
        />
      </section>
      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">API</h2>
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
        <h2 className="heading-sm text-fg-primary">Guidelines</h2>
        <h3 className="heading-xs mt-8 text-fg-primary">Do</h3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>Use clear, concise column headings</li>
          <li>Align numeric data consistently</li>
        </ul>
        <h3 className="heading-xs mt-8 text-fg-primary">Don&apos;t</h3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>Don&apos;t use a table for unrelated content</li>
        </ul>
      </section>
    </div>
  );
}
