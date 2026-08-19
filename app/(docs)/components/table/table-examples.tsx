"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@boyernick/standard-ui-react";
import { ComponentCanvas } from "@/components/component-canvas";

export const TableExamples = () => (
  <div className="mt-6">
    <ComponentCanvas
      label="Invoices"
      contentClassName="w-full"
      code={`<Table>\n  <TableHeader><TableRow><TableHead>Invoice</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>\n  <TableBody><TableRow><TableCell>INV-001</TableCell><TableCell>Paid</TableCell></TableRow></TableBody>\n</Table>`}
    >
      <Table>
        <TableCaption>Recent invoices</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>INV-001</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>INV-002</TableCell>
            <TableCell>Pending</TableCell>
            <TableCell className="text-right">$150.00</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </ComponentCanvas>
  </div>
);
