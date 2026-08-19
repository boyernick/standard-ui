"use client"

import {
  Button,
  Field,
  FieldControl,
  FieldDescription,
  FieldError,
  FieldLabel,
  Form,
} from "@boyernick/standard-ui-react"
import { ComponentCanvas } from "@/components/component-canvas"

export const FieldExamples = () => (
  <div className="mt-6 flex flex-col gap-8">
    <ComponentCanvas
      label="Basic"
      contentClassName="w-full max-w-sm flex-col items-stretch"
      code={`<Field name="email">
  <FieldLabel>Email</FieldLabel>
  <FieldControl type="email" placeholder="you@example.com" required />
  <FieldDescription>We never share your email.</FieldDescription>
  <FieldError match="valueMissing">Email is required.</FieldError>
  <FieldError match="typeMismatch">Enter a valid email.</FieldError>
</Field>`}
    >
      <Field name="email">
        <FieldLabel>Email</FieldLabel>
        <FieldControl type="email" placeholder="you@example.com" required />
        <FieldDescription>We never share your email.</FieldDescription>
        <FieldError match="valueMissing">Email is required.</FieldError>
        <FieldError match="typeMismatch">Enter a valid email.</FieldError>
      </Field>
    </ComponentCanvas>

    <ComponentCanvas
      label="In a form"
      contentClassName="w-full max-w-sm flex-col items-stretch"
      code={`<Form
  onFormSubmit={(values) => {
    console.log(values)
  }}
>
  <Field name="name">
    <FieldLabel>Name</FieldLabel>
    <FieldControl required />
    <FieldError match="valueMissing">Name is required.</FieldError>
  </Field>
  <Button type="submit">Save</Button>
</Form>`}
    >
      <Form
        onFormSubmit={() => {}}
        className="w-full"
      >
        <Field name="name">
          <FieldLabel>Name</FieldLabel>
          <FieldControl required placeholder="Ada Lovelace" />
          <FieldError match="valueMissing">Name is required.</FieldError>
        </Field>
        <Button type="submit" className="self-start">
          Save
        </Button>
      </Form>
    </ComponentCanvas>
  </div>
)
