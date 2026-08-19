"use client"

import {
  Collapsible,
  CollapsiblePanel,
  CollapsibleTrigger,
} from "@standard-ui/react"
import { ComponentCanvas } from "@/components/component-canvas"

export const CollapsibleExamples = () => (
  <div className="mt-6 flex flex-col gap-8">
    <ComponentCanvas
      label="Basic"
      contentClassName="mx-auto w-full max-w-md"
      minHeightClass="min-h-40"
      code={`<Collapsible>
  <CollapsibleTrigger>Recovery keys</CollapsibleTrigger>
  <CollapsiblePanel>
    Store these keys somewhere safe. Each key can be used once to
    regain access if you lose your authenticator.

    A3F9-K2LM-8PQR · B7NX-4HWD-9CJT · E1QS-6YVB-2MZK
  </CollapsiblePanel>
</Collapsible>`}
    >
      <Collapsible className="w-full">
        <CollapsibleTrigger>Recovery keys</CollapsibleTrigger>
        <CollapsiblePanel>
          <p>
            Store these keys somewhere safe. Each key can be used once to
            regain access if you lose your authenticator.
          </p>
          <p className="mt-2 font-mono text-xs text-fg-tertiary">
            A3F9-K2LM-8PQR · B7NX-4HWD-9CJT · E1QS-6YVB-2MZK
          </p>
        </CollapsiblePanel>
      </Collapsible>
    </ComponentCanvas>
  </div>
)
