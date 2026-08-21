"use client"

import { OTPField, OTPFieldInput, OTPFieldSeparator } from "@boyernick/standard-ui-react"
import { ComponentCanvas } from "@/components/component-canvas"

export const OTPFieldExamples = () => (
  <div className="mt-6 flex flex-col gap-8">
    <ComponentCanvas label="Verification code">
      <div className="flex flex-col gap-2">
        <label
          htmlFor="verification-code"
          className="text-sm text-fg-primary"
        >
          Verification code
        </label>
        <OTPField id="verification-code" length={6}>
          <OTPFieldInput />
          <OTPFieldInput aria-label="Character 2 of 6" />
          <OTPFieldInput aria-label="Character 3 of 6" />
          <OTPFieldSeparator />
          <OTPFieldInput aria-label="Character 4 of 6" />
          <OTPFieldInput aria-label="Character 5 of 6" />
          <OTPFieldInput aria-label="Character 6 of 6" />
        </OTPField>
      </div>
    </ComponentCanvas>

    <ComponentCanvas label="Masked">
      <div className="flex flex-col gap-2">
        <label htmlFor="secure-code" className="text-sm text-fg-primary">
          Secure code
        </label>
        <OTPField id="secure-code" length={4} mask>
          <OTPFieldInput />
          <OTPFieldInput aria-label="Character 2 of 4" />
          <OTPFieldInput aria-label="Character 3 of 4" />
          <OTPFieldInput aria-label="Character 4 of 4" />
        </OTPField>
      </div>
    </ComponentCanvas>
  </div>
)
