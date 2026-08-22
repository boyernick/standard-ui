import {
  Button,
  IconSettingsGear1,
  Kbd,
  KbdGroup,
  Tooltip,
  TooltipPopup,
  TooltipPortal,
  TooltipPositioner,
  TooltipProvider,
  TooltipTrigger,
} from "@boyernick/standard-ui-react"
import type { ComponentProps, ReactNode } from "react"
import { DocBand } from "@/components/doc-band"

const BAND = "max-w-md"

/** Trigger and popup — the shape every specimen shares. */
const Hint = ({
  label,
  variant,
  children,
  ...positioner
}: {
  label: ReactNode
  variant?: ComponentProps<typeof TooltipPopup>["variant"]
  children: ReactNode
} & ComponentProps<typeof TooltipPositioner>) => (
  <Tooltip>
    <TooltipTrigger render={<Button variant="outline">{children}</Button>} />
    <TooltipPortal>
      <TooltipPositioner {...positioner}>
        <TooltipPopup variant={variant}>{label}</TooltipPopup>
      </TooltipPositioner>
    </TooltipPortal>
  </Tooltip>
)

/** A shortcut reading as caps rather than prose. The keycap variant has to
 *  match the popup it lands on: a default cap is a light grey that vanishes on
 *  the inverted surface, and an inverted cap vanishes on the default one. */
const Shortcut = ({
  keys,
  inverted,
}: {
  keys: string[]
  inverted?: boolean
}) => (
  // `ml-1.5` rather than a gap on the popup: KbdGroup is inline-flex and
  // align-middle so it flows in the label's text, and making the popup a flex
  // container would change layout for every tooltip already in the wild.
  <KbdGroup className="ml-1.5">
    {keys.map((key) => (
      <Kbd key={key} size="sm" variant={inverted ? "inverted" : "default"}>
        {key}
      </Kbd>
    ))}
  </KbdGroup>
)

export const TooltipExamples = () => (
  <TooltipProvider>
    <div>
      <DocBand
        first
        id="default"
        title="Default"
        description="A short hint, shown on hover and on keyboard focus alike."
        contentClassName={BAND}
      >
        <Hint label="Save changes">Save</Hint>
      </DocBand>

      <DocBand
        id="sides"
        title="Sides"
        description="The popup can be anchored to any edge of its trigger."
        contentClassName={BAND}
      >
        <div className="flex flex-wrap gap-2">
          <Hint label="Above" side="top">
            Top
          </Hint>
          <Hint label="To the right" side="right">
            Right
          </Hint>
          <Hint label="Below" side="bottom">
            Bottom
          </Hint>
          <Hint label="To the left" side="left">
            Left
          </Hint>
        </div>
      </DocBand>

      <DocBand
        id="shortcut"
        title="With a shortcut"
        description="A hint can name the keys that do the same thing."
        contentClassName={BAND}
      >
        <div className="flex flex-wrap gap-2">
          <Hint
            label={
              <>
                Save
                <Shortcut keys={["\u2318", "S"]} />
              </>
            }
          >
            Save
          </Hint>
          <Hint
            label={
              <>
                Search
                <Shortcut keys={["\u2318", "K"]} />
              </>
            }
          >
            Search
          </Hint>
        </div>
      </DocBand>

      <DocBand
        id="inverted"
        title="Inverted"
        description="Flipped against the page, for a hint that should read as separate."
        contentClassName={BAND}
      >
        <div className="flex flex-wrap items-center gap-2">
          <Hint variant="inverted" label="Save changes">
            Save
          </Hint>
          <Hint
            variant="inverted"
            label={
              <>
                Search
                <Shortcut keys={["\u2318", "K"]} inverted />
              </>
            }
          >
            Search
          </Hint>
        </div>
      </DocBand>

      <DocBand
        id="icon"
        title="On an icon button"
        description="Where a control carries no label, the hint supplies the words."
        contentClassName={BAND}
      >
        <Tooltip>
          {/* Children belong to the `render` element: Base UI's tooltip
              trigger renders that element's own children, not its own. */}
          <TooltipTrigger
            render={
              <Button variant="ghost" iconOnly aria-label="Settings">
                <IconSettingsGear1 size={16} className="size-4" aria-hidden />
              </Button>
            }
          />
          <TooltipPortal>
            <TooltipPositioner>
              <TooltipPopup>Settings</TooltipPopup>
            </TooltipPositioner>
          </TooltipPortal>
        </Tooltip>
      </DocBand>
    </div>
  </TooltipProvider>
)
