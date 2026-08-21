"use client"

import { Checkbox } from "@boyernick/standard-ui-react"
import type { ComponentProps, ReactNode } from "react"
import { DocBand } from "@/components/doc-band"

/** A labelled box. The label dims off the control's own `data-disabled` rather
 *  than a prop, so it follows a disabled box and a disabled group alike. */
const Option = ({
  children,
  ...props
}: { children: ReactNode } & ComponentProps<typeof Checkbox>) => (
  <label className="text-sm flex items-center gap-2 text-fg-primary has-[[data-disabled]]:text-fg-tertiary">
    <Checkbox {...props} />
    {children}
  </label>
)

const Stack = ({ children }: { children: ReactNode }) => (
  <div className="flex flex-col gap-3">{children}</div>
)

export const CheckboxExamples = () => (
  <div>
    <DocBand
      first
      id="default"
      title="Default"
      description="Boolean choice, on or off."
    >
      <Stack>
        <Option defaultChecked>Subscribe to updates</Option>
        <Option>Remember this device</Option>
      </Stack>
    </DocBand>

    <DocBand
      id="indeterminate"
      title="Indeterminate"
      description="A third state for a selection that is only partly on."
    >
      <Stack>
        <Option indeterminate>Partially selected</Option>
      </Stack>
    </DocBand>

    <DocBand
      id="disabled"
      title="Disabled"
      description="A disabled checkbox stays visible but cannot be toggled."
    >
      <Stack>
        <Option disabled defaultChecked>
          Included in your plan
        </Option>
        <Option disabled>Unavailable</Option>
      </Stack>
    </DocBand>
  </div>
)
