"use client"

import type { ComponentProps, CSSProperties, ReactElement } from "react"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend as RechartsLegend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  XAxis,
  YAxis,
} from "recharts"
import { cn } from "./lib/cn"

const chartColorVars = {
  "--color-chart-1": "rgb(var(--chart-1))",
  "--color-chart-2": "rgb(var(--chart-2))",
  "--color-chart-3": "rgb(var(--chart-3))",
  "--color-chart-4": "rgb(var(--chart-4))",
  "--color-chart-5": "rgb(var(--chart-5))",
  "--color-chart-neutral": "rgb(var(--chart-neutral))",
} as CSSProperties

export type ChartContainerProps = ComponentProps<"div"> & {
  children: ReactElement
}

export const ChartContainer = ({
  className,
  children,
  style,
  ...props
}: ChartContainerProps) => (
  <div
    className={cn(
      "relative flex w-full min-h-[200px] justify-center text-xs text-fg-secondary [&_.recharts-cartesian-axis-tick_text]:fill-fg-tertiary [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border-primary/40 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border-primary [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-background-tertiary/50 [&_.recharts-layer]:outline-none [&_.recharts-surface]:outline-none",
      className,
    )}
    style={{ ...chartColorVars, ...style }}
    {...props}
  >
    <ResponsiveContainer width="100%" height="100%" minHeight={200}>
      {children}
    </ResponsiveContainer>
  </div>
)

type ChartTooltipPayloadItem = {
  name?: string | number
  value?: string | number
  color?: string
  dataKey?: string | number
}

export type ChartTooltipContentProps = {
  active?: boolean
  label?: string | number
  payload?: ChartTooltipPayloadItem[]
  className?: string
  indicator?: "dot" | "line"
}

export const ChartTooltipContent = ({
  active,
  label,
  payload,
  className,
  indicator = "dot",
}: ChartTooltipContentProps) => {
  if (!active || !payload?.length) return null

  return (
    <div
      className={cn(
        "rounded-md border border-border-primary bg-surface px-2.5 py-1.5 shadow-md",
        className,
      )}
    >
      {label != null ? (
        <p className="text-xs mb-1 text-fg-tertiary">{label}</p>
      ) : null}
      <div className="flex flex-col gap-0.5">
        {payload.map((item, index) => (
          <div
            key={`${item.dataKey ?? item.name ?? index}`}
            className="flex items-center gap-2 text-xs text-fg-secondary"
          >
            <span
              className={cn(
                "shrink-0 rounded-full",
                indicator === "line" ? "h-0.5 w-3" : "size-2",
              )}
              style={{ backgroundColor: item.color }}
            />
            <span className="truncate">{item.name}</span>
            <span className="ml-auto tabular-nums text-fg-primary">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export type ChartTooltipProps = ComponentProps<typeof RechartsTooltip>

export const ChartTooltip = ({
  content,
  cursor = { stroke: "var(--border-primary)", strokeWidth: 1 },
  animationDuration = 150,
  ...props
}: ChartTooltipProps) => (
  <RechartsTooltip
    cursor={cursor}
    animationDuration={animationDuration}
    content={content ?? <ChartTooltipContent />}
    {...props}
  />
)

export type ChartLegendContentProps = {
  payload?: Array<{
    value?: string
    color?: string
    dataKey?: string | number
  }>
  className?: string
}

export const ChartLegendContent = ({
  payload,
  className,
}: ChartLegendContentProps) => {
  if (!payload?.length) return null

  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-center gap-3 pt-3",
        className,
      )}
    >
      {payload.map((item, index) => (
        <div
          key={`${item.dataKey ?? item.value ?? index}`}
          className="flex items-center gap-1.5 text-xs text-fg-secondary"
        >
          <span
            className="size-2 shrink-0 rounded-full"
            style={{ backgroundColor: item.color }}
          />
          <span>{item.value}</span>
        </div>
      ))}
    </div>
  )
}

export type ChartLegendProps = ComponentProps<typeof RechartsLegend>

export const ChartLegend = ({
  content,
  ...props
}: ChartLegendProps) => (
  <RechartsLegend content={content ?? <ChartLegendContent />} {...props} />
)

export {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
}
