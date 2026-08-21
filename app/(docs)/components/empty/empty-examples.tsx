"use client"

import {
  Button,
  Empty,
  EmptyActions,
  EmptyDescription,
  EmptyIcon,
  EmptyTitle,
  IconMagnifyingGlass,
  IllustrationEmpty,
  IllustrationError,
  IllustrationSearch,
} from "@boyernick/standard-ui-react"
import { ComponentCanvas } from "@/components/component-canvas"

export const EmptyExamples = () => (
  <div className="mt-6 flex flex-col gap-8">
    <ComponentCanvas
      label="No results"
      contentClassName="w-full"
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

    <ComponentCanvas
      label="With illustration"
      contentClassName="w-full"
    >
      <Empty className="w-full">
        <IllustrationEmpty className="mx-auto h-32 w-auto" />
        <EmptyTitle>No projects yet</EmptyTitle>
        <EmptyDescription>
          Create a project to start shipping with StandardUI.
        </EmptyDescription>
        <EmptyActions>
          <Button size="sm">New project</Button>
          <Button size="sm" variant="ghost">
            Learn more
          </Button>
        </EmptyActions>
      </Empty>
    </ComponentCanvas>

    <ComponentCanvas
      label="Error and search"
      contentClassName="w-full flex-col gap-8"
    >
      <Empty className="w-full">
        <IllustrationError className="mx-auto h-28 w-auto" />
        <EmptyTitle>Something went wrong</EmptyTitle>
        <EmptyDescription>Refresh the page and try again.</EmptyDescription>
        <EmptyActions>
          <Button size="sm" variant="outline">
            Retry
          </Button>
        </EmptyActions>
      </Empty>
      <Empty className="w-full">
        <IllustrationSearch className="mx-auto h-28 w-auto" />
        <EmptyTitle>Start searching</EmptyTitle>
        <EmptyDescription>
          Results will appear here when you type a query.
        </EmptyDescription>
      </Empty>
    </ComponentCanvas>
  </div>
)
