import { Separator } from "@boyernick/standard-ui-react"
import { DocBand } from "@/components/doc-band"

const linkClassName = "cursor-pointer text-fg-secondary hover:text-fg-primary"

export const SeparatorExamples = () => (
  <div>
    <DocBand
      first
      id="horizontal"
      title="Horizontal"
      description="A rule between stacked sections, running the full measure."
      contentClassName="max-w-xs"
    >
      <div className="text-sm flex flex-col gap-3 text-fg-primary">
        <p>Profile</p>
        <Separator />
        <p>Billing</p>
        <Separator />
        <p>Team</p>
      </div>
    </DocBand>

    <DocBand
      id="vertical"
      title="Vertical"
      description="Set upright it fills its container, so the row defines the height."
      contentClassName="max-w-xs"
    >
      {/* The rule is `h-full` when vertical — without a height on the row it
          would collapse to nothing. */}
      <div className="text-sm flex h-5 items-center gap-3">
        <a href="#" className={linkClassName}>
          Home
        </a>
        <Separator orientation="vertical" />
        <a href="#" className={linkClassName}>
          Docs
        </a>
        <Separator orientation="vertical" />
        <a href="#" className={linkClassName}>
          Support
        </a>
      </div>
    </DocBand>

    <DocBand
      id="labelled"
      title="Labelled"
      description="Two rules either side of a caption, for splitting alternatives."
      contentClassName="max-w-xs"
    >
      <div className="flex items-center gap-3">
        <Separator className="shrink" />
        <span className="text-xs text-fg-tertiary">or</span>
        <Separator className="shrink" />
      </div>
    </DocBand>
  </div>
)
