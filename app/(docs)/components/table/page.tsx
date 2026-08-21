import type { Metadata } from "next";
import { DocPage } from "@/components/doc-page";
import { TableExamples } from "./table-examples";

export const metadata: Metadata = { title: "Table" };

export default function TablePage() {
  return (
    <DocPage
      title="Table"
      description="Semantic data tables with consistent headers, rows, cells, captions, and totals."
    >
      <TableExamples />
    </DocPage>
  );
}
