"use client"

import {
  Button,
  Checkbox,
  Field,
  FieldControl,
  FieldDescription,
  FieldError,
  FieldItem,
  FieldLabel,
  Form,
} from "@boyernick/standard-ui-react"
import { DocBand } from "@/components/doc-band"

const BAND = "max-w-sm"

export const FieldExamples = () => (
  <div>
    <DocBand
      first
      id="default"
      title="Default"
      description="A label and its control, with a note underneath."
      contentClassName={BAND}
    >
      <Field name="email">
        <FieldLabel>Email</FieldLabel>
        <FieldControl type="email" placeholder="you@example.com" />
        <FieldDescription>We never share your email.</FieldDescription>
      </Field>
    </DocBand>

    <DocBand
      id="validation"
      title="Validation"
      description="Errors resolve against the control's own validity state."
      contentClassName={BAND}
    >
      {/* Inside a Form, so submitting an empty field actually surfaces the
          message rather than leaving the band to describe something unseen. */}
      <Form onFormSubmit={() => {}} className="w-full">
        <Field name="work-email">
          <FieldLabel>Work email</FieldLabel>
          <FieldControl type="email" placeholder="you@company.com" required />
          <FieldError match="valueMissing">Email is required.</FieldError>
          <FieldError match="typeMismatch">Enter a valid email.</FieldError>
        </Field>
        <Button type="submit" size="sm" className="self-start">
          Submit
        </Button>
      </Form>
    </DocBand>

    <DocBand
      id="inline"
      title="Inline control"
      description="A control that sits beside its label rather than under it."
      contentClassName={BAND}
    >
      <Field name="terms">
        <FieldItem>
          <Checkbox />
          <FieldLabel>Accept the terms</FieldLabel>
        </FieldItem>
        <FieldDescription>You can withdraw consent later.</FieldDescription>
      </Field>
    </DocBand>

    <DocBand
      id="disabled"
      title="Disabled"
      description="The label and description dim with the control."
      contentClassName={BAND}
    >
      <Field name="workspace" disabled>
        <FieldLabel>Workspace</FieldLabel>
        <FieldControl defaultValue="Acme" />
        <FieldDescription>Set once when the account is created.</FieldDescription>
      </Field>
    </DocBand>
  </div>
)
