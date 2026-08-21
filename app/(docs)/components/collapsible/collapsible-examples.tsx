"use client"

import {
  Collapsible,
  CollapsiblePanel,
  CollapsibleTrigger,
} from "@boyernick/standard-ui-react"
import type { ComponentProps, ReactNode } from "react"
import { DocBand } from "@/components/doc-band"

/** Trigger over panel — the shape every specimen shares. */
const Section = ({
  label,
  children,
  ...root
}: {
  label: string
  children: ReactNode
} & Omit<ComponentProps<typeof Collapsible>, "children">) => (
  <Collapsible className="w-full" {...root}>
    <CollapsibleTrigger>{label}</CollapsibleTrigger>
    <CollapsiblePanel>{children}</CollapsiblePanel>
  </Collapsible>
)

export const CollapsibleExamples = () => (
  <div>
    <DocBand
      first
      id="default"
      title="Default"
      description="Closed until the trigger opens it."
    >
      <Section label="Recovery keys">
        <p>
          Store these keys somewhere safe. Each one can be used once to regain
          access if you lose your authenticator.
        </p>
        <p className="mt-2 font-mono text-xs text-fg-tertiary">
          A3F9-K2LM-8PQR · B7NX-4HWD-9CJT · E1QS-6YVB-2MZK
        </p>
      </Section>
    </DocBand>

    <DocBand
      id="open"
      title="Open by default"
      description="The panel starts expanded."
    >
      <Section label="What's included" defaultOpen>
        <p>
          Unlimited projects, 50GB of storage, and priority support on weekdays.
        </p>
      </Section>
    </DocBand>

    <DocBand
      id="disabled"
      title="Disabled"
      description="A disabled collapsible cannot be opened."
    >
      <Section label="Audit log" disabled>
        <p>Available on Enterprise plans.</p>
      </Section>
    </DocBand>
  </div>
)
