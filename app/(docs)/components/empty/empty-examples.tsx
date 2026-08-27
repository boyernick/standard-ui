"use client"

import {
  Button,
  Empty,
  EmptyActions,
  EmptyDescription,
  EmptyTitle,
  IllustrationEmpty,
  IllustrationError,
  IllustrationNoResults,
  IllustrationSearch,
  IllustrationSuccess,
} from "@boyernick/standard-ui-react"
import type { ReactNode } from "react"
import { DocBand } from "@/components/doc-band"

/** Media, then a title and its description, then whatever the reader can do. */
const State = ({
  media,
  title,
  description,
  actions,
}: {
  media: ReactNode
  title: string
  description: string
  actions?: ReactNode
}) => (
  <Empty className="w-full">
    {media}
    <EmptyTitle>{title}</EmptyTitle>
    <EmptyDescription>{description}</EmptyDescription>
    {actions ? <EmptyActions>{actions}</EmptyActions> : null}
  </Empty>
)

export const EmptyExamples = () => (
  <div>
    <DocBand
      first
      id="no-results"
      title="No results"
      description="A filter or query that matched nothing."
      contentClassName="max-w-lg"
    >
      <State
        media={<IllustrationNoResults className="mb-4" />}
        title="No results"
        description="Try another search or clear your filters."
        actions={<Button size="sm">Clear search</Button>}
      />
    </DocBand>

    <DocBand
      id="first-run"
      title="First run"
      description="A surface the reader has not put anything into yet."
      contentClassName="max-w-lg"
    >
      <State
        media={<IllustrationEmpty className="mb-4" />}
        title="No projects yet"
        description="Create a project to start shipping with StandardUI."
        actions={
          <>
            <Button size="sm">New project</Button>
            <Button size="sm" variant="ghost">
              Learn more
            </Button>
          </>
        }
      />
    </DocBand>

    <DocBand
      id="search"
      title="Before searching"
      description="A results pane waiting on a query."
      contentClassName="max-w-lg"
    >
      <State
        media={<IllustrationSearch className="mb-4" />}
        title="Start searching"
        description="Results will appear here when you type a query."
      />
    </DocBand>

    <DocBand
      id="error"
      title="Error"
      description="Nothing to show because the request failed."
      contentClassName="max-w-lg"
    >
      <State
        media={<IllustrationError className="mb-4" />}
        title="Something went wrong"
        description="Refresh the page and try again."
        actions={
          <Button size="sm" variant="outline">
            Retry
          </Button>
        }
      />
    </DocBand>

    <DocBand
      id="done"
      title="All caught up"
      description="Empty because the work is finished, not because it is missing."
      contentClassName="max-w-lg"
    >
      <State
        media={<IllustrationSuccess className="mb-4" />}
        title="Inbox zero"
        description="Nothing needs your attention right now."
      />
    </DocBand>
  </div>
)
