import type { Metadata } from "next"
import { CodeBlock } from "@/components/code-block"
import { DocCell, DocTable, Token } from "@/components/doc-table"
import { PageHeader } from "@/components/page-header"
import { ChartExamples } from "./chart-examples"

export const metadata: Metadata = {
  title: "Chart",
}

export default function ChartPage() {
  return (
    <div className="w-full">
      <PageHeader
        title="Chart"
        description="Responsive chart shells built on Recharts. Use ChartContainer for themed colors, then compose area, bar, or line series."
      />

      <section className="mt-2">
        <h2 className="heading-sm text-fg-primary">Examples</h2>
        <ChartExamples />
      </section>

      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">Overview</h2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          ChartContainer injects chart color CSS variables and wraps a
          ResponsiveContainer. Pass Recharts chart roots as children — AreaChart,
          BarChart, or LineChart — and style series with{" "}
          <Token>var(--color-chart-1)</Token> through{" "}
          <Token>var(--color-chart-5)</Token>, or gray tokens like{" "}
          <Token>var(--gray-1000)</Token> and <Token>var(--gray-150)</Token>.
        </p>
        <CodeBlock
          className="mt-4"
          code={`import {
  Area,
  AreaChart,
  CartesianGrid,
  ChartContainer,
  ChartTooltip,
  XAxis,
  YAxis,
} from "@boyernick/standard-ui-react"

<ChartContainer className="h-64">
  <AreaChart data={monthlyData}>
    <CartesianGrid vertical={false} />
    <XAxis dataKey="month" />
    <YAxis />
    <ChartTooltip />
    <Area
      dataKey="value"
      stroke="var(--color-chart-1)"
      fill="var(--color-chart-1)"
    />
  </AreaChart>
</ChartContainer>`}
        />
      </section>

      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">Usage</h2>

        <h3 className="heading-xs mt-8 text-fg-primary">Sizing</h3>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Give ChartContainer an explicit height class such as{" "}
          <Token>h-64</Token>. Width fills the parent by default.
        </p>
        <CodeBlock
          className="mt-4"
          size="sm"
          code={`<ChartContainer className="h-64">
  <AreaChart data={monthlyData}>{/* … */}</AreaChart>
</ChartContainer>`}
        />

        <h3 className="heading-xs mt-10 text-fg-primary">Series colors</h3>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          Prefer chart tokens for categorical series. Use gray tokens when the
          chart should stay neutral against the surface.
        </p>
        <CodeBlock
          className="mt-4"
          size="sm"
          code={`<Area
  dataKey="value"
  stroke="var(--color-chart-1)"
  fill="var(--color-chart-1)"
  fillOpacity={0.2}
/>
{/* or neutral */}
<Area
  dataKey="value"
  stroke="var(--gray-1000)"
  fill="var(--gray-150)"
/>`}
        />
      </section>

      <section className="mt-14">
        <h2 className="heading-sm text-fg-primary">API</h2>
        <p className="text-md mt-0.5 max-w-3xl text-fg-secondary">
          ChartContainer is a themed wrapper. ChartTooltip defaults to
          ChartTooltipContent. Recharts primitives are re-exported for
          convenience.
        </p>
        <DocTable headers={["Export", "Role"]}>
          <tr>
            <DocCell mono>ChartContainer</DocCell>
            <DocCell>
              Themed shell with ResponsiveContainer and chart color vars.
            </DocCell>
          </tr>
          <tr>
            <DocCell mono>ChartTooltip</DocCell>
            <DocCell>Recharts tooltip with StandardUI content by default.</DocCell>
          </tr>
          <tr>
            <DocCell mono>ChartTooltipContent</DocCell>
            <DocCell>Default tooltip panel for payload rows.</DocCell>
          </tr>
          <tr>
            <DocCell mono>ChartLegend</DocCell>
            <DocCell>Legend with StandardUI content by default.</DocCell>
          </tr>
          <tr>
            <DocCell mono>AreaChart / Area</DocCell>
            <DocCell>Area chart root and series.</DocCell>
          </tr>
          <tr>
            <DocCell mono>BarChart / Bar</DocCell>
            <DocCell>Bar chart root and series.</DocCell>
          </tr>
          <tr>
            <DocCell mono>LineChart / Line</DocCell>
            <DocCell>Line chart root and series.</DocCell>
          </tr>
          <tr>
            <DocCell mono>XAxis / YAxis</DocCell>
            <DocCell>Cartesian axes.</DocCell>
          </tr>
          <tr>
            <DocCell mono>CartesianGrid</DocCell>
            <DocCell>Grid lines behind the plot.</DocCell>
          </tr>
        </DocTable>
      </section>

      <section className="mt-14 mb-8">
        <h2 className="heading-sm text-fg-primary">Guidelines</h2>

        <h3 className="heading-xs mt-8 text-fg-primary">Do</h3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>
            Set an explicit height on <Token>ChartContainer</Token>
          </li>
          <li>
            Use <Token>var(--color-chart-*)</Token> so series track the theme
          </li>
          <li>Keep tooltips short — label and value only</li>
        </ul>

        <h3 className="heading-xs mt-8 text-fg-primary">Don't</h3>
        <ul className="text-md mt-3 list-disc space-y-2 pl-5 text-fg-secondary">
          <li>
            Don&apos;t nest another ResponsiveContainer inside ChartContainer
          </li>
          <li>
            Don&apos;t hard-code hex colors when a chart or gray token exists
          </li>
          <li>
            Don&apos;t crowd one plot with more series than the eye can track
          </li>
        </ul>
      </section>
    </div>
  )
}
