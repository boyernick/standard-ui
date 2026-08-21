import { Toggle, ToggleGroup } from "@boyernick/standard-ui-react"
import { DocBand } from "@/components/doc-band"

const BAND = "max-w-md"

export const ToggleExamples = () => (
  <div>
    <DocBand
      first
      id="single"
      title="Single"
      description="One control that stays pressed until it is pressed again."
      contentClassName={BAND}
    >
      <Toggle defaultPressed>Notifications</Toggle>
    </DocBand>

    <DocBand
      id="group"
      title="Group"
      description="Exclusive options sharing one enclosure, like an alignment picker."
      contentClassName={BAND}
    >
      <ToggleGroup aria-label="Text alignment" defaultValue={["center"]}>
        <Toggle value="left">Left</Toggle>
        <Toggle value="center">Center</Toggle>
        <Toggle value="right">Right</Toggle>
      </ToggleGroup>
    </DocBand>

    <DocBand
      id="multiple"
      title="Multiple"
      description="With multiple, any number of options can be pressed at once."
      contentClassName={BAND}
    >
      <ToggleGroup multiple aria-label="Text style" defaultValue={["bold"]}>
        <Toggle value="bold">Bold</Toggle>
        <Toggle value="italic">Italic</Toggle>
        <Toggle value="underline">Underline</Toggle>
      </ToggleGroup>
    </DocBand>

    <DocBand
      id="disabled"
      title="Disabled"
      description="A pressed toggle keeps its fill once interaction is withdrawn."
      contentClassName={BAND}
    >
      <div className="flex items-center gap-2">
        <Toggle defaultPressed disabled>
          Pressed
        </Toggle>
        <Toggle disabled>Unpressed</Toggle>
      </div>
    </DocBand>
  </div>
)
