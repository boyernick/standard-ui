import {
  Badge,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@boyernick/standard-ui-react"
import { DocBand } from "@/components/doc-band"

const BAND = "max-w-2xl"

const invoices = [
  { id: "INV-001", status: "Paid", total: "$250.00" },
  { id: "INV-002", status: "Pending", total: "$150.00" },
  { id: "INV-003", status: "Overdue", total: "$80.00" },
] as const

const statusVariant = {
  Paid: "success",
  Pending: "warning",
  Overdue: "critical",
} as const

const Head = () => (
  <TableHeader>
    <TableRow>
      <TableHead>Invoice</TableHead>
      <TableHead>Status</TableHead>
      <TableHead className="text-right">Total</TableHead>
    </TableRow>
  </TableHeader>
)

/** Rows shared by every specimen. Status reads as a badge rather than bare
 *  text, so the column scans at a glance. */
const Rows = () => (
  <TableBody>
    {invoices.map(({ id, status, total }) => (
      <TableRow key={id}>
        <TableCell>{id}</TableCell>
        <TableCell>
          <Badge size="xs" variant={statusVariant[status]}>
            {status}
          </Badge>
        </TableCell>
        <TableCell className="text-right tabular-nums">{total}</TableCell>
      </TableRow>
    ))}
  </TableBody>
)

export const TableExamples = () => (
  <div>
    <DocBand
      first
      id="default"
      title="Default"
      description="A header above rows, each column aligned to its content."
      contentClassName={BAND}
    >
      <Table>
        <Head />
        <Rows />
      </Table>
    </DocBand>

    <DocBand
      id="totals"
      title="Totals"
      description="A footer row sits apart from the body and carries the sum."
      contentClassName={BAND}
    >
      <Table>
        <Head />
        <Rows />
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell className="text-right tabular-nums">$480.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </DocBand>

    <DocBand
      id="caption"
      title="Caption"
      description="A caption names the table and renders beneath it."
      contentClassName={BAND}
    >
      <Table>
        <TableCaption>Invoices issued this month</TableCaption>
        <Head />
        <Rows />
      </Table>
    </DocBand>
  </div>
)
