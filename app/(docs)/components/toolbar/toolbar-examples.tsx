import {
  IconHome,
  IconMinus,
  IconPlus,
  IconSettingsGear1,
  Toolbar,
  ToolbarButton,
  ToolbarGroup,
  ToolbarInput,
  ToolbarLink,
  ToolbarSeparator,
} from "@boyernick/standard-ui-react"
import { DocBand } from "@/components/doc-band"

const BAND = "max-w-lg"

export const ToolbarExamples = () => (
  <div>
    <DocBand
      first
      id="default"
      title="Default"
      description="Controls gathered into one enclosure, walked with the arrow keys."
      contentClassName={BAND}
    >
      <Toolbar aria-label="Formatting">
        <ToolbarGroup>
          <ToolbarButton aria-label="Bold" className="font-semibold">
            B
          </ToolbarButton>
          <ToolbarButton aria-label="Italic" className="italic">
            I
          </ToolbarButton>
          <ToolbarButton aria-label="Underline" className="underline">
            U
          </ToolbarButton>
        </ToolbarGroup>
        <ToolbarSeparator />
        <ToolbarGroup>
          <ToolbarButton aria-label="Decrease">
            <IconMinus size={14} className="size-3.5" aria-hidden />
          </ToolbarButton>
          <ToolbarButton aria-label="Increase">
            <IconPlus size={14} className="size-3.5" aria-hidden />
          </ToolbarButton>
        </ToolbarGroup>
        <ToolbarSeparator />
        <ToolbarLink href="#">Docs</ToolbarLink>
      </Toolbar>
    </DocBand>

    <DocBand
      id="input"
      title="With an input"
      description="A field joins the same roving focus as the buttons around it."
      contentClassName={BAND}
    >
      <Toolbar aria-label="Search tools">
        <ToolbarButton aria-label="Home">
          <IconHome size={16} className="size-4" aria-hidden />
        </ToolbarButton>
        <ToolbarButton aria-label="Settings">
          <IconSettingsGear1 size={16} className="size-4" aria-hidden />
        </ToolbarButton>
        <ToolbarSeparator />
        <ToolbarInput placeholder="Filter…" aria-label="Filter" />
      </Toolbar>
    </DocBand>

    <DocBand
      id="disabled"
      title="Disabled"
      description="A single control can be withdrawn while the rest stay reachable."
      contentClassName={BAND}
    >
      <Toolbar aria-label="History">
        <ToolbarButton>Undo</ToolbarButton>
        <ToolbarButton disabled>Redo</ToolbarButton>
        <ToolbarSeparator />
        <ToolbarButton>Reset</ToolbarButton>
      </Toolbar>
    </DocBand>
  </div>
)
