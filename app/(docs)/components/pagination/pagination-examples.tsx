"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@standard-ui/react";
import { ComponentCanvas } from "@/components/component-canvas";

export const PaginationExamples = () => (
  <div className="mt-6">
    <ComponentCanvas
      label="Pages"
      code={`<Pagination>\n  <PaginationContent>\n    <PaginationItem><PaginationPrevious /></PaginationItem>\n    <PaginationItem><PaginationLink active>1</PaginationLink></PaginationItem>\n    <PaginationItem><PaginationNext /></PaginationItem>\n  </PaginationContent>\n</Pagination>`}
    >
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious disabled />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink active>1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink>2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink>3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </ComponentCanvas>
  </div>
);
