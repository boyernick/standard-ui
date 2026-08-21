import { Switch } from "@boyernick/standard-ui-react"
import type { ComponentProps, ReactNode } from "react"
import { DocBand } from "@/components/doc-band"

const BAND = "max-w-sm"

/** Label and control on one line. The text dims off the switch's own
 *  `data-disabled` so the pair always agrees. */
const Option = ({
  children,
  ...props
}: { children: ReactNode } & ComponentProps<typeof Switch>) => (
  <label className="text-sm flex items-center gap-2 text-fg-primary has-[[data-disabled]]:text-fg-tertiary">
    <Switch {...props} />
    {children}
  </label>
)

/** A settings row: the switch sits at the far edge, away from its description. */
const Setting = ({
  title,
  description,
  ...props
}: { title: string; description: string } & ComponentProps<typeof Switch>) => (
  <label className="flex items-start justify-between gap-6">
    <span>
      <span className="text-sm block text-fg-primary">{title}</span>
      <span className="text-sm block text-fg-tertiary">{description}</span>
    </span>
    <Switch className="mt-0.5" {...props} />
  </label>
)

export const SwitchExamples = () => (
  <div>
    <DocBand
      first
      id="default"
      title="Default"
      description="A setting that takes effect the moment it is flipped."
      contentClassName={BAND}
    >
      <Option defaultChecked>Notifications</Option>
    </DocBand>

    <DocBand
      id="states"
      title="States"
      description="On and off, and the same pair once interaction is withdrawn."
      contentClassName={BAND}
    >
      <div className="flex flex-col gap-3">
        <Option defaultChecked>On</Option>
        <Option>Off</Option>
        <Option defaultChecked disabled>
          On, disabled
        </Option>
        <Option disabled>Off, disabled</Option>
      </div>
    </DocBand>

    <DocBand
      id="settings"
      title="In a settings list"
      description="Given a description the control moves to the far edge of the row."
      contentClassName={BAND}
    >
      <div className="flex flex-col gap-5">
        <Setting
          title="Weekly digest"
          description="A summary every Monday morning."
          defaultChecked
        />
        <Setting
          title="Mentions"
          description="Only when someone names you directly."
        />
      </div>
    </DocBand>
  </div>
)
