"use client"

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@boyernick/standard-ui-react"
import type { ReactNode } from "react"
import { DocBand } from "@/components/doc-band"

const Bar = ({ children }: { children: ReactNode }) => (
  <Pagination>
    <PaginationContent>{children}</PaginationContent>
  </Pagination>
)

/** One numbered page. */
const Page = ({ n, active }: { n: number; active?: boolean }) => (
  <PaginationItem>
    <PaginationLink active={active}>{n}</PaginationLink>
  </PaginationItem>
)

const Gap = () => (
  <PaginationItem>
    <PaginationEllipsis />
  </PaginationItem>
)

export const PaginationExamples = () => (
  <div>
    <DocBand
      first
      id="default"
      title="Default"
      description="On the first page, so there is nowhere back to go."
    >
      <Bar>
        <PaginationItem>
          <PaginationPrevious disabled />
        </PaginationItem>
        <Page n={1} active />
        <Page n={2} />
        <Page n={3} />
        <Gap />
        <PaginationItem>
          <PaginationNext />
        </PaginationItem>
      </Bar>
    </DocBand>

    <DocBand
      id="mid-range"
      title="Mid-range"
      description="Deep in a long list, with the ends folded away on both sides."
    >
      <Bar>
        <PaginationItem>
          <PaginationPrevious />
        </PaginationItem>
        <Page n={1} />
        <Gap />
        <Page n={7} />
        <Page n={8} active />
        <Page n={9} />
        <Gap />
        <Page n={24} />
        <PaginationItem>
          <PaginationNext />
        </PaginationItem>
      </Bar>
    </DocBand>

    <DocBand
      id="compact"
      title="Compact"
      description="Only the two directions, where a page number means nothing."
    >
      {/* An infinite or unbounded list has no last page to number, so the
          arrows are the whole control. */}
      <Bar>
        <PaginationItem>
          <PaginationPrevious />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext />
        </PaginationItem>
      </Bar>
    </DocBand>
  </div>
)
