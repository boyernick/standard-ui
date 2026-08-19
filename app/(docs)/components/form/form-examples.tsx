"use client"

import {
  Button,
  Field,
  FieldControl,
  FieldError,
  FieldLabel,
  Form,
} from "@boyernick/standard-ui-react"
import { ComponentCanvas } from "@/components/component-canvas"

export const FormExamples = () => (
  <div className="mt-6 flex flex-col gap-8">
    <ComponentCanvas
      label="Submit"
      contentClassName="w-full max-w-sm flex-col items-stretch"
      code={`<Form onFormSubmit={(values) => console.log(values)}>
  <Field name="username">
    <FieldLabel>Username</FieldLabel>
    <FieldControl required minLength={3} />
    <FieldError match="valueMissing">Required.</FieldError>
    <FieldError match="tooShort">At least 3 characters.</FieldError>
  </Field>
  <Button type="submit">Continue</Button>
</Form>`}
    >
      <Form onFormSubmit={() => {}} className="w-full">
        <Field name="username">
          <FieldLabel>Username</FieldLabel>
          <FieldControl required minLength={3} placeholder="ada" />
          <FieldError match="valueMissing">Required.</FieldError>
          <FieldError match="tooShort">At least 3 characters.</FieldError>
        </Field>
        <Button type="submit" className="self-start">
          Continue
        </Button>
      </Form>
    </ComponentCanvas>
  </div>
)
