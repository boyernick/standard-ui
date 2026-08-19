"use client"

import {
  Area,
  AreaChart,
  CartesianGrid,
  ChartContainer,
  ChartTooltip,
  XAxis,
  YAxis,
} from "@boyernick/standard-ui-react"
import { ComponentCanvas } from "@/components/component-canvas"

const monthlyData = [
  { month: "Jan", value: 186 },
  { month: "Feb", value: 305 },
  { month: "Mar", value: 237 },
  { month: "Apr", value: 273 },
  { month: "May", value: 209 },
  { month: "Jun", value: 314 },
]

export const ChartExamples = () => (
  <div className="mt-6 flex flex-col gap-8">
    <ComponentCanvas
      label="Area chart"
      contentClassName="w-full"
      minHeightClass="min-h-72"
      code={`const monthlyData = [
  { month: "Jan", value: 186 },
  { month: "Feb", value: 305 },
  { month: "Mar", value: 237 },
  { month: "Apr", value: 273 },
  { month: "May", value: 209 },
  { month: "Jun", value: 314 },
]

<ChartContainer className="h-64">
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
      dataKey="value"
      stroke="var(--color-chart-1)"
      fill="var(--color-chart-1)"
      fillOpacity={0.18}
      strokeWidth={2}
      animationDuration={600}
      animationEasing="ease-out"
    />
  </AreaChart>
</ChartContainer>`}
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
            dataKey="value"
            stroke="var(--color-chart-1)"
            fill="var(--color-chart-1)"
            fillOpacity={0.18}
            strokeWidth={2}
            animationDuration={600}
            animationEasing="ease-out"
          />
        </AreaChart>
      </ChartContainer>
    </ComponentCanvas>
  </div>
)
