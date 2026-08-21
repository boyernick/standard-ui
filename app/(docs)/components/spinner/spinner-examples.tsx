import { Button, Spinner } from "@boyernick/standard-ui-react"
import type { ReactNode } from "react"
import { DocBand } from "@/components/doc-band"

const BAND = "max-w-md"

/** A specimen with its size named underneath. */
const Size = ({ name, children }: { name: string; children: ReactNode }) => (
  <div className="flex flex-col items-center gap-2 text-fg-primary">
    {children}
    <span className="text-xs text-fg-tertiary">{name}</span>
  </div>
)

export const SpinnerExamples = () => (
  <div>
    <DocBand
      first
      id="sizes"
      title="Sizes"
      description="Three sizes, each matching the text or control beside it."
      contentClassName={BAND}
    >
      <div className="flex items-end gap-6">
        <Size name="sm">
          <Spinner size="sm" />
        </Size>
        <Size name="md">
          <Spinner size="md" />
        </Size>
        <Size name="lg">
          <Spinner size="lg" />
        </Size>
      </div>
    </DocBand>

    <DocBand
      id="button"
      title="In a button"
      description="The loading prop fills the icon slot and disables the press."
      contentClassName={BAND}
    >
      <div className="flex flex-wrap items-center gap-3">
        <Button loading>Saving</Button>
        <Button variant="outline" loading>
          Syncing
        </Button>
        <Button variant="ghost" loading iconOnly aria-label="Loading" />
      </div>
    </DocBand>

    <DocBand
      id="inline"
      title="Inline"
      description="Set in a line of text it takes the colour it inherits."
      contentClassName={BAND}
    >
      <p className="text-sm inline-flex items-center gap-2 text-fg-secondary">
        <Spinner size="sm" />
        Fetching updates…
      </p>
    </DocBand>
  </div>
)
