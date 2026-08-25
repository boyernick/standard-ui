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

const shipments = [
  {
    year: "2022",
    dateTime: "2022",
    title: "Sketch",
    description: "Interface rules written down so they can be shared.",
  },
  {
    year: "2023",
    dateTime: "2023",
    title: "Tokens",
    description: "Color, type, spacing, and motion land in one foundation.",
  },
  {
    year: "2024",
    dateTime: "2024",
    title: "Primitives",
    description: "The foundation becomes a practical React library.",
  },
  {
    year: "2025",
    dateTime: "2025",
    title: "Release",
    description: "StandardUI starts showing up outside its own docs.",
  },
  {
    year: "2026",
    dateTime: "2026",
    title: "Refine",
    description: "The system grows through use, review, and cut.",
  },
] as const

const releases = [
  {
    date: "Aug 24",
    dateTime: "2026-08-24",
    title: "Timeline",
    description: "A composable rail for events, with ticks or dots.",
  },
  {
    date: "Aug 18",
    dateTime: "2026-08-18",
    title: "Image modal",
    description: "A lighter gallery with keyboard and trackpad navigation.",
  },
  {
    date: "Aug 12",
    dateTime: "2026-08-12",
    title: "Minimap",
    description: "Page landmarks stay visible without competing with content.",
  },
]

export const TimelineExamples = () => (
  <div>
    <DocBand
      first
      id="horizontal"
      title="Horizontal"
      description="A scrubbable rail of events, with the year sitting above each tick."
      contentClassName="max-w-4xl"
    >
      <Timeline orientation="horizontal" aria-label="StandardUI shipments">
        <TimelineTrack>
          {shipments.map((event) => (
            <TimelineItem key={event.year}>
              <TimelineMarker />
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
      description="The same rail, stacked, for release notes and activity."
      contentClassName="max-w-lg"
    >
      <Timeline aria-label="Recent releases">
        <TimelineTrack>
          {releases.map((release) => (
            <TimelineItem key={release.dateTime}>
              <TimelineMarker />
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
      id="markers"
      title="Markers"
      description="Ticks are the default; dots carry a tone when an event needs weight."
      contentClassName="max-w-lg"
    >
      <Timeline aria-label="Marker shapes">
        <TimelineTrack>
          <TimelineItem>
            <TimelineMarker />
            <TimelineTime dateTime="2026-08">Tick</TimelineTime>
            <TimelineContent>
              <TimelineTitle>Default</TimelineTitle>
              <TimelineDescription>
                A hairline mark on the rail.
              </TimelineDescription>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineMarker shape="dot" tone="accent" />
            <TimelineTime dateTime="2026-08">Dot</TimelineTime>
            <TimelineContent>
              <TimelineTitle>Accent</TimelineTitle>
              <TimelineDescription>
                A filled marker for a highlighted moment.
              </TimelineDescription>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineMarker shape="dot" tone="success" />
            <TimelineTime dateTime="2026-08">Dot</TimelineTime>
            <TimelineContent>
              <TimelineTitle>Success</TimelineTitle>
              <TimelineDescription>
                Status tones map onto the same shape.
              </TimelineDescription>
            </TimelineContent>
          </TimelineItem>
        </TimelineTrack>
      </Timeline>
    </DocBand>

    <DocBand
      id="media"
      title="With media"
      description="A media surface can sit with an event without changing the structure."
      contentClassName="max-w-sm"
    >
      <Timeline aria-label="Project milestone">
        <TimelineTrack>
          <TimelineItem>
            <TimelineMarker shape="dot" tone="success" />
            <TimelineTime dateTime="2026-08-24">Today</TimelineTime>
            <TimelineContent>
              <div className="flex items-center gap-2">
                <TimelineTitle>Documentation published</TimelineTitle>
                <Badge size="xs" variant="success">
                  Live
                </Badge>
              </div>
              <TimelineDescription>
                The component joins the library and its documentation.
              </TimelineDescription>
              <TimelineMedia className="p-2">
                <div className="grid aspect-4/3 place-items-center rounded-xs border border-border-primary bg-surface-raised">
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
