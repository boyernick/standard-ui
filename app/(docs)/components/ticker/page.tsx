import type { Metadata } from "next"
import { CodeBlock } from "@/components/code-block"
import { DocCell, DocTable, Token } from "@/components/doc-table"
import { PageHeader } from "@/components/page-header"
import { TickerExamples } from "./ticker-examples"
import { H2, H3 } from "@/components/prose"

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
        <H2>Examples</H2>
        <TickerExamples />
      </section>

      <section className="mt-14">
        <H2>Overview</H2>
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
        <H2>API</H2>
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
        <H2>Guidelines</H2>
        <H3>Do</H3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>Keep items short and scannable</li>
          <li>Pause on hover for readability</li>
        </ul>
        <H3>Don&apos;t</H3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>Don&apos;t put critical instructions only in a ticker</li>
          <li>Don&apos;t animate faster than users can read</li>
        </ul>
      </section>
    </div>
  )
}
