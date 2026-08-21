"use client"

import { Radio, RadioGroup, RadioIndicator } from "@boyernick/standard-ui-react"
import type { ComponentProps, ReactNode } from "react"
import { DocBand } from "@/components/doc-band"

/** A labelled radio. The label dims off the control's own `data-disabled`,
 *  which Base UI sets whether the radio or the whole group was disabled. */
const Option = ({
  children,
  ...props
}: { children: ReactNode } & ComponentProps<typeof Radio>) => (
  <label className="text-sm flex items-center gap-2 text-fg-primary has-[[data-disabled]]:text-fg-tertiary">
    <Radio {...props}>
      <RadioIndicator />
    </Radio>
    {children}
  </label>
)

export const RadioGroupExamples = () => (
  <div>
    <DocBand
      first
      id="default"
      title="Default"
      description="One choice from a short list, stacked."
      contentClassName="max-w-sm"
    >
      <RadioGroup defaultValue="comfortable" aria-label="Density">
        <Option value="compact">Compact</Option>
        <Option value="comfortable">Comfortable</Option>
        <Option value="spacious">Spacious</Option>
        {/* One option out of reach while the rest stay live. */}
        <Option value="custom" disabled>
          Custom
        </Option>
      </RadioGroup>
    </DocBand>

    <DocBand
      id="horizontal"
      title="Horizontal"
      description="Laid out in a row where the options are short."
      contentClassName="max-w-sm"
    >
      <RadioGroup
        defaultValue="day"
        aria-label="Schedule"
        className="flex-row gap-4"
      >
        <Option value="day">Day</Option>
        <Option value="week">Week</Option>
        <Option value="month">Month</Option>
      </RadioGroup>
    </DocBand>

    <DocBand
      id="disabled"
      title="Disabled"
      description="Disabling the group disables every option in it."
      contentClassName="max-w-sm"
    >
      <RadioGroup defaultValue="pro" aria-label="Plan" disabled>
        <Option value="free">Free</Option>
        <Option value="pro">Pro</Option>
      </RadioGroup>
    </DocBand>
  </div>
)
