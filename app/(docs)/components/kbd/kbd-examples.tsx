import { Kbd, KbdGroup } from "@boyernick/standard-ui-react"
import { DocBand } from "@/components/doc-band"

export const KbdExamples = () => (
  <div>
    <DocBand
      first
      id="default"
      title="Default"
      description="A single keycap."
    >
      <Kbd>K</Kbd>
    </DocBand>

    <DocBand
      id="shortcut"
      title="Shortcut"
      description="Several caps on one line, grouped at a fixed gap."
    >
      <KbdGroup>
        <Kbd>⌘</Kbd>
        <Kbd>K</Kbd>
      </KbdGroup>
    </DocBand>

    <DocBand
      id="sizes"
      title="Sizes"
      description="Two heights: 16 and 20 pixels."
    >
      <div className="flex items-center gap-4">
        <KbdGroup>
          <Kbd size="sm">⇧</Kbd>
          <Kbd size="sm">↵</Kbd>
        </KbdGroup>
        <KbdGroup>
          <Kbd>⇧</Kbd>
          <Kbd>↵</Kbd>
        </KbdGroup>
      </div>
    </DocBand>

    <DocBand
      id="inverted"
      title="Inverted"
      description="For dark surfaces, where the default fill would disappear."
    >
      {/* Shown on the inverted surface it is built for — a tooltip is the
          usual home for a keycap on dark. */}
      <div className="text-sm flex w-full max-w-xs items-center justify-between gap-4 rounded-md bg-surface-inverted px-4 py-2 text-fg-inverted">
        Change model
        <KbdGroup>
          <Kbd variant="inverted">⌘</Kbd>
          <Kbd variant="inverted">\</Kbd>
        </KbdGroup>
      </div>
    </DocBand>
  </div>
)
