import {
  Badge,
  Timeline,
  TimelineContent,
  TimelineDescription,
  TimelineItem,
  TimelineMarker,
  TimelineMedia,
  TimelineTime,
  TimelineTitle,
  TimelineTrack,
} from "@boyernick/standard-ui-react"
import { DocBand } from "@/components/doc-band"

const history = [
  {
    year: "2022",
    dateTime: "2022",
    title: "The first sketch",
    description: "A small set of interface rules becomes a shared visual language.",
    tone: "neutral",
  },
  {
    year: "2023",
    dateTime: "2023",
    title: "Tokens take shape",
    description: "Color, type, spacing, and motion move into a common foundation.",
    tone: "info",
  },
  {
    year: "2024",
    dateTime: "2024",
    title: "Components arrive",
    description: "The foundation becomes a practical React component library.",
    tone: "success",
  },
  {
    year: "2025",
    dateTime: "2025",
    title: "First release",
    description: "StandardUI starts serving interfaces outside its own documentation.",
    tone: "accent",
  },
  {
    year: "2026",
    dateTime: "2026",
    title: "Still in motion",
    description: "The system grows through use, review, and deliberate refinement.",
    tone: "warning",
  },
] as const

const releases = [
  {
    date: "Aug 24",
    dateTime: "2026-08-24",
    title: "Timeline",
    description: "Horizontal and vertical histories with semantic markers.",
    tone: "accent",
  },
  {
    date: "Aug 18",
    dateTime: "2026-08-18",
    title: "Image modal",
    description: "A lighter gallery with keyboard and trackpad navigation.",
    tone: "success",
  },
  {
    date: "Aug 12",
    dateTime: "2026-08-12",
    title: "Minimap",
    description: "Page landmarks stay visible without competing with content.",
    tone: "info",
  },
] as const

export const TimelineExamples = () => (
  <div>
    <DocBand
      first
      id="horizontal"
      title="Horizontal"
      description="A scrollable lifeline for years, eras, and long-running stories. Use the arrow keys when the timeline is focused."
      contentClassName="max-w-4xl"
    >
      <Timeline orientation="horizontal" aria-label="StandardUI history">
        <TimelineTrack>
          {history.map((event) => (
            <TimelineItem key={event.year}>
              <TimelineMarker tone={event.tone} />
              <TimelineTime dateTime={event.dateTime}>{event.year}</TimelineTime>
              <TimelineContent>
                <TimelineTitle>{event.title}</TimelineTitle>
                <TimelineDescription>{event.description}</TimelineDescription>
              </TimelineContent>
            </TimelineItem>
          ))}
        </TimelineTrack>
      </Timeline>
    </DocBand>

    <DocBand
      id="vertical"
      title="Vertical"
      description="A compact reading direction for release notes and activity streams."
      contentClassName="max-w-lg"
    >
      <Timeline aria-label="Recent releases">
        <TimelineTrack>
          {releases.map((release) => (
            <TimelineItem key={release.dateTime}>
              <TimelineMarker tone={release.tone} />
              <TimelineTime dateTime={release.dateTime}>
                {release.date}
              </TimelineTime>
              <TimelineContent>
                <TimelineTitle>{release.title}</TimelineTitle>
                <TimelineDescription>{release.description}</TimelineDescription>
              </TimelineContent>
            </TimelineItem>
          ))}
        </TimelineTrack>
      </Timeline>
    </DocBand>

    <DocBand
      id="media"
      title="With media"
      description="A media surface can sit with an event without changing the timeline structure."
      contentClassName="max-w-sm"
    >
      <Timeline aria-label="Project milestone">
        <TimelineTrack>
          <TimelineItem>
            <TimelineMarker tone="success" />
            <TimelineTime dateTime="2026-08-24">Today</TimelineTime>
            <TimelineContent>
              <div className="flex items-center gap-2">
                <TimelineTitle>Documentation published</TimelineTitle>
                <Badge size="xs" variant="success">
                  Live
                </Badge>
              </div>
              <TimelineDescription>
                The component joins the StandardUI library and its documentation.
              </TimelineDescription>
              <TimelineMedia className="p-4">
                <div className="grid aspect-4/3 place-items-center rounded-lg border border-border-primary bg-surface-raised">
                  <div className="flex items-center gap-2 text-sm-strong text-fg-primary">
                    <span className="size-3 rounded-full bg-brand-primary" />
                    StandardUI
                  </div>
                </div>
              </TimelineMedia>
            </TimelineContent>
          </TimelineItem>
        </TimelineTrack>
      </Timeline>
    </DocBand>
  </div>
)
