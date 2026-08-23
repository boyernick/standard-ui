"use client"

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationFirst,
  PaginationItem,
  PaginationLast,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationRange,
  PaginationStatus,
  Select,
  SelectItem,
  SelectItemText,
  SelectList,
  SelectPopup,
  SelectPortal,
  SelectPositioner,
  SelectTrigger,
  SelectValue,
  type PaginationSize,
} from "@boyernick/standard-ui-react"
import type { ReactNode } from "react"
import { DocBand } from "@/components/doc-band"

const Bar = ({ children }: { children: ReactNode }) => (
  <Pagination>
    <PaginationContent>{children}</PaginationContent>
  </Pagination>
)

const Page = ({
  n,
  active,
  size,
}: {
  n: number
  active?: boolean
  size?: PaginationSize
}) => (
  <PaginationItem>
    <PaginationLink href={`?page=${n}`} active={active} size={size}>
      {n}
    </PaginationLink>
  </PaginationItem>
)

const Gap = () => (
  <PaginationItem>
    <PaginationEllipsis />
  </PaginationItem>
)

const DirectionItem = ({ children }: { children: ReactNode }) => (
  <PaginationItem>{children}</PaginationItem>
)

const RowsPerPage = () => (
  <Select
    items={{ "10": "10", "20": "20", "50": "50" }}
    defaultValue="20"
  >
    <SelectTrigger aria-label="Rows per page" className="h-8 w-20">
      <SelectValue />
    </SelectTrigger>
    <SelectPortal>
      <SelectPositioner>
        <SelectPopup>
          <SelectList>
            {["10", "20", "50"].map((value) => (
              <SelectItem key={value} value={value}>
                <SelectItemText>{value}</SelectItemText>
              </SelectItem>
            ))}
          </SelectList>
        </SelectPopup>
      </SelectPositioner>
    </SelectPortal>
  </Select>
)

const NumberedPages = () => (
  <>
    <DirectionItem>
      <PaginationPrevious />
    </DirectionItem>
    <Page n={1} />
    <Gap />
    <Page n={7} />
    <Page n={8} active />
    <Page n={9} />
    <Gap />
    <Page n={24} />
    <DirectionItem>
      <PaginationNext />
    </DirectionItem>
  </>
)

const SizeExample = ({ size }: { size: PaginationSize }) => (
  <Pagination className="w-auto">
    <PaginationContent>
      <Page n={1} size={size} />
      <Page n={2} active size={size} />
      <Page n={3} size={size} />
      <DirectionItem>
        <PaginationNext iconOnly size={size} />
      </DirectionItem>
    </PaginationContent>
  </Pagination>
)

export const PaginationExamples = () => (
  <div>
    <DocBand
      first
      id="default"
      title="Default"
      description="Numbered links keep each page addressable while the unavailable direction stays visible."
    >
      <Bar>
        <DirectionItem>
          <PaginationPrevious disabled />
        </DirectionItem>
        <Page n={1} active />
        <Page n={2} />
        <Page n={3} />
        <Gap />
        <DirectionItem>
          <PaginationNext />
        </DirectionItem>
      </Bar>
    </DocBand>

    <DocBand
      id="mid-range"
      title="Mid-range"
      description="Deep in a long list, with the ends folded away on both sides."
    >
      <Bar>
        <NumberedPages />
      </Bar>
    </DocBand>

    <DocBand
      id="status"
      title="Page status"
      description="A concise readout replaces individual page links when the exact destination matters less."
    >
      <Bar>
        <DirectionItem>
          <PaginationPrevious />
        </DirectionItem>
        <PaginationItem className="px-3">
          <PaginationStatus page={8} totalPages={24} />
        </PaginationItem>
        <DirectionItem>
          <PaginationNext />
        </DirectionItem>
      </Bar>
    </DocBand>

    <DocBand
      id="table"
      title="Data table"
      description="Range, page size, and full navigation share one compact toolbar."
      contentClassName="max-w-2xl"
    >
      <div className="flex flex-wrap items-center gap-4 rounded-lg border border-border-primary bg-surface p-3">
        <div className="flex items-center gap-2">
          <span className="text-sm text-fg-secondary">Rows per page</span>
          <RowsPerPage />
        </div>
        <div className="ml-auto flex items-center gap-3">
          <PaginationRange start={21} end={40} total={240} />
          <Pagination aria-label="Table pagination" className="w-auto">
            <PaginationContent>
              <DirectionItem>
                <PaginationFirst iconOnly size="sm" />
              </DirectionItem>
              <DirectionItem>
                <PaginationPrevious iconOnly size="sm" />
              </DirectionItem>
              <DirectionItem>
                <PaginationNext iconOnly size="sm" />
              </DirectionItem>
              <DirectionItem>
                <PaginationLast iconOnly size="sm" />
              </DirectionItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </DocBand>

    <DocBand
      id="icon-only"
      title="Icon-only"
      description="First, previous, next, and last controls fit narrow toolbars without losing accessible names."
    >
      <Bar>
        <DirectionItem>
          <PaginationFirst iconOnly />
        </DirectionItem>
        <DirectionItem>
          <PaginationPrevious iconOnly />
        </DirectionItem>
        <DirectionItem>
          <PaginationNext iconOnly />
        </DirectionItem>
        <DirectionItem>
          <PaginationLast iconOnly />
        </DirectionItem>
      </Bar>
    </DocBand>

    <DocBand
      id="responsive"
      title="Responsive"
      description="Numbered links yield to a status readout on narrow screens."
    >
      <Pagination>
        <PaginationContent className="sm:hidden">
          <DirectionItem>
            <PaginationPrevious iconOnly />
          </DirectionItem>
          <PaginationItem className="px-3">
            <PaginationStatus page={8} totalPages={24} />
          </PaginationItem>
          <DirectionItem>
            <PaginationNext iconOnly />
          </DirectionItem>
        </PaginationContent>
        <PaginationContent className="hidden sm:flex">
          <NumberedPages />
        </PaginationContent>
      </Pagination>
    </DocBand>

    <DocBand
      id="sizes"
      title="Sizes"
      description="Small, medium, and large controls align pagination with its surrounding density."
    >
      <div className="flex flex-col items-center gap-5">
        <SizeExample size="sm" />
        <SizeExample size="md" />
        <SizeExample size="lg" />
      </div>
    </DocBand>

    <DocBand
      id="last-page"
      title="Last page"
      description="The forward controls remain legible while clearly leaving the interaction."
    >
      <Bar>
        <DirectionItem>
          <PaginationPrevious />
        </DirectionItem>
        <Page n={22} />
        <Page n={23} />
        <Page n={24} active />
        <DirectionItem>
          <PaginationNext disabled />
        </DirectionItem>
      </Bar>
    </DocBand>
  </div>
)
