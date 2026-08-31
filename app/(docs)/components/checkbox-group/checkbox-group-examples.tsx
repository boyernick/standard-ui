"use client"

import { Checkbox, CheckboxGroup } from "@boyernick/standard-ui-react"
import type { ComponentProps, ReactNode } from "react"
import { DocBand } from "@/components/doc-band"

const apples = ["fuji", "gala", "granny-smith"] as const

/** A labelled box. The label dims off the control's own `data-disabled`, which
 *  Base UI sets whether the box or the whole group was disabled. */
const Option = ({
  children,
  ...props
}: { children: ReactNode } & ComponentProps<typeof Checkbox>) => (
  <label className="text-sm flex items-center gap-2 text-fg-primary has-[[data-disabled]]:text-fg-tertiary">
    <Checkbox {...props} />
    {children}
  </label>
)

/** Dims with its group, so a disabled set reads as one unavailable block
 *  rather than a live heading over dead controls. */
const GroupLabel = ({ id, children }: { id: string; children: ReactNode }) => (
  <div
    id={id}
    className="text-sm text-fg-primary group-data-disabled:text-fg-tertiary"
  >
    {children}
  </div>
)

export const CheckboxGroupExamples = () => (
  <div>
    <DocBand
      first
      id="default"
      title="Default"
      description="Checkboxes that share one value list."
    >
      <CheckboxGroup
        defaultValue={["https"]}
        aria-labelledby="protocols-label"
        className="group gap-3"
      >
        <GroupLabel id="protocols-label">Protocols</GroupLabel>
        <Option value="http">HTTP</Option>
        <Option value="https">HTTPS</Option>
        <Option value="ssh">SSH</Option>
      </CheckboxGroup>
    </DocBand>

    <DocBand
      id="parent"
      title="Parent"
      description="A parent box that reflects and sets its children."
    >
      <CheckboxGroup
        allValues={[...apples]}
        defaultValue={["fuji"]}
        aria-labelledby="apples-label"
        className="group gap-3"
      >
        {/* The parent is the group's label, so it names what it selects. */}
        <label
          id="apples-label"
          className="text-sm flex items-center gap-2 text-fg-primary"
        >
          <Checkbox parent />
          Apples
        </label>
        <div className="ml-6 flex flex-col gap-2">
          <Option value="fuji">Fuji</Option>
          <Option value="gala">Gala</Option>
          <Option value="granny-smith">Granny Smith</Option>
        </div>
      </CheckboxGroup>
    </DocBand>

    <DocBand
      id="disabled"
      title="Disabled"
      description="Disabling the group disables every box in it."
    >
      <CheckboxGroup
        disabled
        defaultValue={["email"]}
        aria-labelledby="notifications-label"
        className="group gap-3"
      >
        <GroupLabel id="notifications-label">Notifications</GroupLabel>
        <Option value="email">Email</Option>
        <Option value="sms">SMS</Option>
      </CheckboxGroup>
    </DocBand>
  </div>
)
