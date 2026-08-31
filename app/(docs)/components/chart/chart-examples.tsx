"use client"

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ChartContainer,
  ChartLegend,
  Line,
  LineChart,
  ChartTooltip,
  XAxis,
  YAxis,
} from "@boyernick/standard-ui-react"
import { DocBand } from "@/components/doc-band"

const monthlyData = [
  { month: "Jan", desktop: 186, mobile: 82 },
  { month: "Feb", desktop: 305, mobile: 118 },
  { month: "Mar", desktop: 237, mobile: 146 },
  { month: "Apr", desktop: 273, mobile: 164 },
  { month: "May", desktop: 209, mobile: 132 },
  { month: "Jun", desktop: 314, mobile: 188 },
]

export const ChartExamples = () => (
  <div>
    <DocBand
      first
      id="area-chart"
      title="Area chart"
      description="Show change over time while emphasizing overall volume."
      contentClassName="max-w-3xl"
    >
      <ChartContainer className="h-64 w-full">
        <AreaChart data={monthlyData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
          />
          <YAxis tickLine={false} axisLine={false} tickMargin={8} />
          <ChartTooltip />
          <Area
            type="monotone"
            dataKey="desktop"
            name="Desktop"
            stroke="var(--color-chart-1)"
            fill="var(--color-chart-1)"
            fillOpacity={0.18}
            strokeWidth={2}
            animationDuration={600}
            animationEasing="ease-out"
          />
        </AreaChart>
      </ChartContainer>
    </DocBand>

    <DocBand
      id="bar-chart"
      title="Bar chart"
      description="Compare multiple values across a set of discrete categories."
      contentClassName="max-w-3xl"
    >
      <ChartContainer className="h-64 w-full">
        <BarChart data={monthlyData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
          />
          <YAxis tickLine={false} axisLine={false} tickMargin={8} />
          <ChartTooltip cursor={false} />
          <ChartLegend />
          <Bar
            dataKey="desktop"
            name="Desktop"
            fill="var(--color-chart-1)"
            radius={[4, 4, 0, 0]}
            animationDuration={600}
            animationEasing="ease-out"
          />
          <Bar
            dataKey="mobile"
            name="Mobile"
            fill="var(--color-chart-2)"
            radius={[4, 4, 0, 0]}
            animationDuration={600}
            animationEasing="ease-out"
          />
        </BarChart>
      </ChartContainer>
    </DocBand>

    <DocBand
      id="line-chart"
      title="Line chart"
      description="Direction and rate of change over a series."
      contentClassName="max-w-3xl"
    >
      <ChartContainer className="h-64 w-full">
        <LineChart data={monthlyData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
          />
          <YAxis tickLine={false} axisLine={false} tickMargin={8} />
          <ChartTooltip />
          <Line
            type="monotone"
            dataKey="desktop"
            name="Desktop"
            stroke="var(--color-chart-1)"
            strokeWidth={2}
            dot={false}
            animationDuration={600}
            animationEasing="ease-out"
          />
        </LineChart>
      </ChartContainer>
    </DocBand>
  </div>
)
