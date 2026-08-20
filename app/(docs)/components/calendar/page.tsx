import type { Metadata } from "next"
import { CodeBlock } from "@/components/code-block"
import { DocCell, DocTable, Token } from "@/components/doc-table"
import { PageHeader } from "@/components/page-header"
import { CalendarExamples } from "./calendar-examples"
import { H2, H3 } from "@/components/prose"

export const metadata: Metadata = {
  title: "Calendar",
}

export default function CalendarPage() {
  return (
    <div className="w-full">
      <PageHeader
        title="Calendar"
        description="Month grid for picking a single date. Built on react-day-picker with StandardUI styling."
      />

      <section className="mt-2">
        <H2>Examples</H2>
        <CalendarExamples />
      </section>

      <section className="mt-14">
        <H2>Overview</H2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Calendar renders a navigable month with selectable days. Defaults to
          single-date mode. Use controlled <Token>selected</Token> /{" "}
          <Token>onSelect</Token> when the chosen date drives other UI.
        </p>
        <CodeBlock
          className="mt-4"
          code={`import { Calendar } from "@boyernick/standard-ui-react"

<Calendar />`}
        />
      </section>

      <section className="mt-14">
        <H2>Usage</H2>

        <H3>Controlled value</H3>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Lift selection into state when you need to show the date elsewhere or
          submit it with a form.
        </p>
        <CodeBlock
          className="mt-4"
          size="sm"
          code={`const [selected, setSelected] = useState<Date>()

<Calendar
  mode="single"
  selected={selected}
  onSelect={setSelected}
/>`}
        />

        <H3 className="mt-10">Outside days</H3>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Outside days from adjacent months show by default. Pass{" "}
          <Token>showOutsideDays=&#123;false&#125;</Token> for a tighter grid.
        </p>
        <CodeBlock
          className="mt-4"
          size="sm"
          code={`<Calendar showOutsideDays={false} />`}
        />
      </section>

      <section className="mt-14">
        <H2>API</H2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Calendar accepts react-day-picker <Token>DayPicker</Token> props.
          Single mode is the default for this wrapper.
        </p>
        <DocTable headers={["Prop", "Type", "Default", "Description"]}>
          <tr>
            <DocCell mono>mode</DocCell>
            <DocCell mono>&quot;single&quot;</DocCell>
            <DocCell mono>&quot;single&quot;</DocCell>
            <DocCell>Selection mode for the day picker.</DocCell>
          </tr>
          <tr>
            <DocCell mono>selected</DocCell>
            <DocCell mono>Date | undefined</DocCell>
            <DocCell mono>—</DocCell>
            <DocCell>Controlled selected date.</DocCell>
          </tr>
          <tr>
            <DocCell mono>onSelect</DocCell>
            <DocCell mono>
              (date: Date | undefined) =&gt; void
            </DocCell>
            <DocCell mono>—</DocCell>
            <DocCell>Called when the user picks a day.</DocCell>
          </tr>
          <tr>
            <DocCell mono>defaultMonth</DocCell>
            <DocCell mono>Date</DocCell>
            <DocCell mono>—</DocCell>
            <DocCell>Initial month shown in the grid.</DocCell>
          </tr>
          <tr>
            <DocCell mono>showOutsideDays</DocCell>
            <DocCell mono>boolean</DocCell>
            <DocCell mono>true</DocCell>
            <DocCell>Show days from adjacent months.</DocCell>
          </tr>
          <tr>
            <DocCell mono>disabled</DocCell>
            <DocCell mono>Matcher | Matcher[]</DocCell>
            <DocCell mono>—</DocCell>
            <DocCell>Disable specific dates or ranges.</DocCell>
          </tr>
        </DocTable>
      </section>

      <section className="mt-14 mb-8">
        <H2>Guidelines</H2>

        <H3>Do</H3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>Pair with a text field or label that shows the chosen date</li>
          <li>Disable past or unavailable dates when the domain requires it</li>
          <li>Keep the calendar near the field that opens it</li>
        </ul>

        <H3>Don&rsquo;t</H3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>
            Don&apos;t rely on the grid alone without a readable selected value
          </li>
          <li>
            Don&apos;t use a full calendar for relative presets only — offer
            Today / Tomorrow shortcuts when those dominate
          </li>
          <li>
            Don&apos;t leave disabled ranges unexplained
          </li>
        </ul>
      </section>
    </div>
  )
}
