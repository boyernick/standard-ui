"use client";

import {
  Button,
  Empty,
  EmptyActions,
  EmptyDescription,
  EmptyIcon,
  EmptyTitle,
  IconMagnifyingGlass,
} from "@standard-ui/react";
import { ComponentCanvas } from "@/components/component-canvas";

export const EmptyExamples = () => (
  <div className="mt-6">
    <ComponentCanvas
      label="No results"
      contentClassName="w-full"
      code={`<Empty>\n  <EmptyIcon><IconMagnifyingGlass /></EmptyIcon>\n  <EmptyTitle>No results</EmptyTitle>\n  <EmptyDescription>Try another search.</EmptyDescription>\n  <EmptyActions><Button>Clear search</Button></EmptyActions>\n</Empty>`}
    >
      <Empty className="w-full">
        <EmptyIcon>
          <IconMagnifyingGlass />
        </EmptyIcon>
        <EmptyTitle>No results</EmptyTitle>
        <EmptyDescription>
          Try another search or clear your filters.
        </EmptyDescription>
        <EmptyActions>
          <Button size="sm">Clear search</Button>
        </EmptyActions>
      </Empty>
    </ComponentCanvas>
  </div>
);
