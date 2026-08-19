"use client"

import { Button, Spinner } from "@standard-ui/react"
import { ComponentCanvas } from "@/components/component-canvas"

export const SpinnerExamples = () => (
  <div className="mt-6 flex flex-col gap-8">
    <ComponentCanvas
      label="Sizes"
      code={`<Spinner size="sm" />
<Spinner size="md" />
<Spinner size="lg" />`}
    >
      <div className="flex items-center gap-6 text-fg-primary">
        <Spinner size="sm" />
        <Spinner size="md" />
        <Spinner size="lg" />
      </div>
    </ComponentCanvas>

    <ComponentCanvas
      label="In a button"
      code={`<Button loading>Saving</Button>
<Button variant="outline" loading>Syncing</Button>`}
    >
      <div className="flex flex-wrap items-center gap-3">
        <Button loading>Saving</Button>
        <Button variant="outline" loading>
          Syncing
        </Button>
        <Button variant="ghost" loading iconOnly aria-label="Loading" />
      </div>
    </ComponentCanvas>

    <ComponentCanvas
      label="Inline status"
      contentClassName="flex-col items-start gap-2"
      code={`<p className="inline-flex items-center gap-2 text-sm text-fg-secondary">
  <Spinner size="sm" />
  Fetching updates…
</p>`}
    >
      <p className="text-sm inline-flex items-center gap-2 text-fg-secondary">
        <Spinner size="sm" />
        Fetching updates…
      </p>
    </ComponentCanvas>
  </div>
)
