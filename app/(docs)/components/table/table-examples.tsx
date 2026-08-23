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
  { id: "INV-001", customer: "Acme Inc.", status: "Paid", total: "$250.00" },
  { id: "INV-002", customer: "Beacon Co.", status: "Pending", total: "$150.00" },
  { id: "INV-003", customer: "Canvas Labs", status: "Overdue", total: "$80.00" },
] as const

const statusVariant = {
  Paid: "success",
  Pending: "warning",
  Overdue: "critical",
} as const

const projects = [
  { name: "Atlas", owner: "Maya", stage: "Review", budget: "$42,800" },
  { name: "Beacon", owner: "Noah", stage: "Active", budget: "$31,250" },
  { name: "Canvas", owner: "Iris", stage: "Planned", budget: "$18,900" },
  { name: "Delta", owner: "Leo", stage: "Active", budget: "$27,400" },
] as const

const activity = [
  ["09:42", "Invoice paid", "INV-001"],
  ["09:18", "Project updated", "Atlas"],
  ["08:56", "Member invited", "maya@example.com"],
  ["08:31", "Export completed", "August invoices"],
  ["08:04", "Comment added", "Beacon"],
  ["07:48", "Budget changed", "Canvas"],
  ["07:22", "Invoice created", "INV-004"],
  ["06:59", "Status changed", "Delta"],
] as const

const Head = () => (
  <TableHeader>
    <TableRow>
      <TableHead scope="col">Invoice</TableHead>
      <TableHead scope="col">Customer</TableHead>
      <TableHead scope="col">Status</TableHead>
      <TableHead scope="col" className="text-right">
        Total
      </TableHead>
    </TableRow>
  </TableHeader>
)

/** Rows shared by every specimen. Status reads as a badge rather than bare
 *  text, so the column scans at a glance. */
const Rows = () => (
  <TableBody>
    {invoices.map(({ id, customer, status, total }) => (
      <TableRow key={id}>
        <TableCell>{id}</TableCell>
        <TableCell>{customer}</TableCell>
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
      id="grid"
      title="Grid"
      description="Compact cells and full rules create a spreadsheet-style reading surface."
      contentClassName={BAND}
    >
      <Table variant="grid" density="compact" aria-label="Project budgets">
        <TableHeader>
          <TableRow>
            <TableHead scope="col" className="w-10 text-center" aria-label="Row" />
            <TableHead scope="col">Project</TableHead>
            <TableHead scope="col">Owner</TableHead>
            <TableHead scope="col">Stage</TableHead>
            <TableHead scope="col" className="text-right">
              Budget
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map(({ name, owner, stage, budget }, index) => (
            <TableRow key={name} aria-selected={name === "Beacon"}>
              <TableHead
                scope="row"
                className="w-10 bg-background-secondary text-center text-fg-tertiary"
              >
                {index + 1}
              </TableHead>
              <TableCell>{name}</TableCell>
              <TableCell>{owner}</TableCell>
              <TableCell>{stage}</TableCell>
              <TableCell className="text-right tabular-nums">{budget}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </DocBand>

    <DocBand
      id="compact-striped"
      title="Compact and striped"
      description="Reduced row height and alternating surfaces help dense datasets scan horizontally."
      contentClassName={BAND}
    >
      <Table density="compact" striped>
        <Head />
        <Rows />
      </Table>
    </DocBand>

    <DocBand
      id="sticky-header"
      title="Sticky header"
      description="Column names remain visible inside a constrained scrolling region."
      contentClassName={BAND}
    >
      <Table
        density="compact"
        containerClassName="max-h-52"
        aria-label="Recent activity"
      >
        <TableHeader sticky>
          <TableRow>
            <TableHead scope="col">Time</TableHead>
            <TableHead scope="col">Activity</TableHead>
            <TableHead scope="col">Detail</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {activity.map(([time, event, detail]) => (
            <TableRow key={`${time}-${event}`}>
              <TableCell className="text-fg-secondary tabular-nums">{time}</TableCell>
              <TableCell>{event}</TableCell>
              <TableCell className="text-fg-secondary">{detail}</TableCell>
            </TableRow>
          ))}
        </TableBody>
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
            <TableCell colSpan={3}>Total</TableCell>
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
