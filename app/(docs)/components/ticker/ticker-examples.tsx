import { Badge, Ticker, TickerItem } from "@boyernick/standard-ui-react"
import { DocBand } from "@/components/doc-band"

const components = [
  "Carousel",
  "Sounds",
  "Videos",
  "Images",
  "Ticker",
]

export const TickerExamples = () => (
  <div>
    <DocBand
      first
      id="default"
      title="Default"
      description="A line that scrolls on forever, pausing under the pointer."
      contentClassName="max-w-2xl"
    >
      <Ticker>
        <TickerItem>
          <Badge size="xs">Update</Badge>
          New components shipping weekly
        </TickerItem>
        <TickerItem>Soft focus rings, offset by a pixel</TickerItem>
        <TickerItem>Prefer package components in app chrome</TickerItem>
        <TickerItem>Sentence case for interface copy</TickerItem>
      </Ticker>
    </DocBand>

    <DocBand
      id="reverse"
      title="Reverse"
      description="The same loop running the other way, and faster."
      contentClassName="max-w-2xl"
    >
      <Ticker duration={16} reverse>
        {components.map((name) => (
          <TickerItem key={name}>{name}</TickerItem>
        ))}
      </Ticker>
    </DocBand>

    <DocBand
      id="continuous"
      title="Without pause"
      description="Turning off pauseOnHover keeps it moving under the pointer."
      contentClassName="max-w-2xl"
    >
      <Ticker pauseOnHover={false}>
        {components.map((name) => (
          <TickerItem key={name}>{name}</TickerItem>
        ))}
      </Ticker>
    </DocBand>
  </div>
)
