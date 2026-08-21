import type { Metadata } from "next"
import { DocPage } from "@/components/doc-page"
import { TableExamples } from "./table-examples"

export const metadata: Metadata = {
  title: "Table",
}

export default function TablePage() {
  return (
    <DocPage
      title="Table"
      description="Rows and columns of structured data."
      heading={null}
      bleed
    >
      <TableExamples />
    </DocPage>
  )
}
