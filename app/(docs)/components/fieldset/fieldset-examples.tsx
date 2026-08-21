"use client"

import {
  Checkbox,
  Field,
  FieldItem,
  FieldLabel,
  Fieldset,
  FieldsetLegend,
} from "@boyernick/standard-ui-react"
import type { ComponentProps, ReactNode } from "react"
import { DocBand } from "@/components/doc-band"

/** A Field, not a bare label: Base UI carries the fieldset's disabled state
 *  down through Field, so a control outside one ignores it entirely. */
const Option = ({
  name,
  children,
  ...props
}: { name: string; children: ReactNode } & ComponentProps<typeof Checkbox>) => (
  <Field name={name}>
    <FieldItem>
      <Checkbox {...props} />
      <FieldLabel>{children}</FieldLabel>
    </FieldItem>
  </Field>
)

export const FieldsetExamples = () => (
  <div>
    <DocBand
      first
      id="default"
      title="Default"
      description="Related controls under a shared legend."
      contentClassName="max-w-sm"
    >
      <Fieldset>
        <FieldsetLegend>Notifications</FieldsetLegend>
        <Option name="product" defaultChecked>
          Product updates
        </Option>
        <Option name="marketing">Marketing emails</Option>
      </Fieldset>
    </DocBand>

    <DocBand
      id="disabled"
      title="Disabled"
      description="Disabling the fieldset disables every control inside it."
      contentClassName="max-w-sm"
    >
      <Fieldset disabled>
        <FieldsetLegend>Billing alerts</FieldsetLegend>
        <Option name="receipts" defaultChecked>
          Invoice receipts
        </Option>
        <Option name="usage">Usage warnings</Option>
      </Fieldset>
    </DocBand>
  </div>
)
