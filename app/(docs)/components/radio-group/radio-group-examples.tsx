"use client"

import { Radio, RadioGroup, RadioIndicator } from "@boyernick/standard-ui-react"
import { ComponentCanvas } from "@/components/component-canvas"

export const RadioGroupExamples = () => (
  <div className="mt-6 flex flex-col gap-8">
    <ComponentCanvas
      label="Basic"
      contentClassName="flex-col items-start"
    >
      <RadioGroup
        defaultValue="comfortable"
        aria-label="Density"
        className="text-sm text-fg-primary"
      >
        <label className="flex items-center gap-2">
          <Radio value="compact">
            <RadioIndicator />
          </Radio>
          Compact
        </label>
        <label className="flex items-center gap-2">
          <Radio value="comfortable">
            <RadioIndicator />
          </Radio>
          Comfortable
        </label>
        <label className="flex items-center gap-2">
          <Radio value="spacious">
            <RadioIndicator />
          </Radio>
          Spacious
        </label>
      </RadioGroup>
    </ComponentCanvas>

    <ComponentCanvas
      label="Horizontal"
      contentClassName="flex-col items-start"
    >
      <RadioGroup
        defaultValue="day"
        aria-label="Schedule"
        className="flex-row gap-4 text-sm text-fg-primary"
      >
        <label className="flex items-center gap-2">
          <Radio value="day">
            <RadioIndicator />
          </Radio>
          Day
        </label>
        <label className="flex items-center gap-2">
          <Radio value="week">
            <RadioIndicator />
          </Radio>
          Week
        </label>
        <label className="flex items-center gap-2">
          <Radio value="month">
            <RadioIndicator />
          </Radio>
          Month
        </label>
      </RadioGroup>
    </ComponentCanvas>

    <ComponentCanvas
      label="Disabled"
      contentClassName="flex-col items-start"
    >
      <RadioGroup
        defaultValue="pro"
        aria-label="Plan"
        disabled
        className="text-sm text-fg-primary"
      >
        <label className="flex items-center gap-2">
          <Radio value="free">
            <RadioIndicator />
          </Radio>
          Free
        </label>
        <label className="flex items-center gap-2">
          <Radio value="pro">
            <RadioIndicator />
          </Radio>
          Pro
        </label>
      </RadioGroup>
    </ComponentCanvas>
  </div>
)
