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
import { useState } from "react"
import { DocBand } from "@/components/doc-band"

const BAND = "max-w-sm"

/** Names the server has already got. */
const taken = ["ada", "grace", "alan"]

export const FormExamples = () => {
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSubmit = (values: Record<string, unknown>) => {
    const username = String(values.username ?? "").toLowerCase()
    setErrors(
      taken.includes(username) ? { username: "That name is taken." } : {},
    )
  }

  return (
    <div>
      <DocBand
        first
        id="default"
        title="Default"
        description="Fields validate on submit, then re-validate as they change."
        contentClassName={BAND}
      >
        <Form onFormSubmit={() => {}} className="w-full">
          <Field name="username">
            <FieldLabel>Username</FieldLabel>
            <FieldControl required minLength={3} placeholder="ada" />
            <FieldError match="valueMissing">Required.</FieldError>
            <FieldError match="tooShort">At least 3 characters.</FieldError>
          </Field>
          <Button type="submit" size="sm" className="self-start">
            Continue
          </Button>
        </Form>
      </DocBand>

      <DocBand
        id="server-errors"
        title="Server errors"
        description="Errors the browser cannot know, handed back keyed by field name."
        contentClassName={BAND}
      >
        {/* The browser can check that a name was typed; only the server knows
            whether it is already spoken for. Submitting "ada" shows the map. */}
        <Form errors={errors} onFormSubmit={handleSubmit} className="w-full">
          <Field name="username">
            <FieldLabel>Choose a username</FieldLabel>
            {/* No `required` here. A bare FieldError shows whatever error the
                field carries, native ones included, so pairing it with client
                validation stacks two messages under the control. This band is
                about the server's answer, so that is the only error it can
                raise — the Default band covers the client side. */}
            <FieldControl placeholder="ada" />
            <FieldDescription>Try “ada” to see it rejected.</FieldDescription>
            <FieldError />
          </Field>
          <Button type="submit" size="sm" className="self-start">
            Claim it
          </Button>
        </Form>
      </DocBand>

      <DocBand
        id="on-blur"
        title="Validate on blur"
        description="Each field checks itself as it loses focus, before any submit."
        contentClassName={BAND}
      >
        <Form validationMode="onBlur" onFormSubmit={() => {}} className="w-full">
          <Field name="email">
            <FieldLabel>Email</FieldLabel>
            <FieldControl type="email" required placeholder="you@example.com" />
            <FieldError match="valueMissing">Required.</FieldError>
            <FieldError match="typeMismatch">Enter a valid email.</FieldError>
          </Field>
          <Button type="submit" size="sm" className="self-start">
            Continue
          </Button>
        </Form>
      </DocBand>
    </div>
  )
}
