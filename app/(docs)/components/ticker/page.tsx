import type { Metadata } from "next"
import { CodeBlock } from "@/components/code-block"
import { DocCell, DocTable, Token } from "@/components/doc-table"
import { PageHeader } from "@/components/page-header"
import { TickerExamples } from "./ticker-examples"

export const metadata: Metadata = {
  title: "Ticker",
}

export default function TickerPage() {
  return (
    <div className="w-full">
      <PageHeader
        title="Ticker"
        description="Continuous marquee for short status lines and announcements. Pauses on hover and respects reduced motion."
      />

      <section className="mt-2">
        <h2 className="heading-sm text-fg-primary">Examples</h2>
        <TickerExamples />
      </section>

      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">Overview</h2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Compose <Token>Ticker</Token> with one or more <Token>TickerItem</Token>{" "}
          children. Content is duplicated for a seamless loop.
        </p>
        <CodeBlock
          className="mt-4"
          code={`import { Ticker, TickerItem } from "@boyernick/standard-ui-react"

<Ticker duration={24}>
  <TickerItem>Shipping Friday</TickerItem>
  <TickerItem>Docs live on ui.nickboyer.com</TickerItem>
</Ticker>`}
        />
      </section>

      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">API</h2>
        <DocTable headers={["Prop", "Type", "Default"]}>
          <tr>
            <DocCell mono>duration</DocCell>
            <DocCell mono>number</DocCell>
            <DocCell mono>28</DocCell>
          </tr>
          <tr>
            <DocCell mono>pauseOnHover</DocCell>
            <DocCell mono>boolean</DocCell>
            <DocCell mono>true</DocCell>
          </tr>
          <tr>
            <DocCell mono>reverse</DocCell>
            <DocCell mono>boolean</DocCell>
            <DocCell mono>false</DocCell>
          </tr>
        </DocTable>
      </section>

      <section className="mt-14 mb-8">
        <h2 className="heading-sm text-fg-primary">Guidelines</h2>
        <h3 className="heading-xs mt-8 text-fg-primary">Do</h3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>Keep items short and scannable</li>
          <li>Pause on hover for readability</li>
        </ul>
        <h3 className="heading-xs mt-8 text-fg-primary">Don&apos;t</h3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>Don&apos;t put critical instructions only in a ticker</li>
          <li>Don&apos;t animate faster than users can read</li>
        </ul>
      </section>
    </div>
  )
}
