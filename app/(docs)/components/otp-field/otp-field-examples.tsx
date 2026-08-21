"use client"

import {
  OTPField,
  OTPFieldInput,
  OTPFieldSeparator,
} from "@boyernick/standard-ui-react"
import type { ComponentProps, ReactNode } from "react"
import { DocBand } from "@/components/doc-band"

/** Slots, optionally split into groups by a separator. */
const Slots = ({
  label,
  length,
  groupAfter,
  slotPlaceholder,
  ...root
}: {
  label: string
  length: number
  /** Draw a separator after this many slots. */
  groupAfter?: number
  /** Stand-in shown while a slot is empty. */
  slotPlaceholder?: string
} & Omit<ComponentProps<typeof OTPField>, "length" | "children">) => {
  const slots: ReactNode[] = []

  for (let i = 0; i < length; i += 1) {
    if (groupAfter && i === groupAfter) {
      slots.push(<OTPFieldSeparator key="sep" />)
    }
    slots.push(
      <OTPFieldInput
        key={i}
        aria-label={`Character ${i + 1} of ${length}`}
        placeholder={slotPlaceholder}
      />,
    )
  }

  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm text-fg-primary">{label}</span>
      <OTPField length={length} {...root}>
        {slots}
      </OTPField>
    </div>
  )
}

export const OTPFieldExamples = () => (
  <div>
    <DocBand
      first
      id="default"
      title="Default"
      description="One slot per character, split into groups by a separator."
    >
      <Slots label="Verification code" length={6} groupAfter={3} />
    </DocBand>

    <DocBand
      id="filled"
      title="Filled"
      description="Each slot holds one character once the code is entered."
    >
      <Slots
        label="Verification code"
        length={6}
        groupAfter={3}
        defaultValue="482915"
      />
    </DocBand>

    <DocBand
      id="masked"
      title="Masked"
      description="Characters are replaced as they are typed."
    >
      {/* With a value — an empty masked field is indistinguishable from an
          empty plain one, so the mask only shows once there is something to
          hide. */}
      <Slots label="Secure code" length={4} mask defaultValue="7391" />
    </DocBand>

    <DocBand
      id="disabled"
      title="Disabled"
      description="No slot accepts a character."
    >
      {/* Dashes rather than a code: a disabled field holding real digits reads
          as a value you are locked out of, where empty slots read as one that
          is simply unavailable. */}
      <Slots
        label="Verification code"
        length={4}
        disabled
        slotPlaceholder="–"
      />
    </DocBand>
  </div>
)
