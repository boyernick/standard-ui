"use client"

import {
  IconChainLink3,
  Kbd,
  KbdGroup,
  Menu,
  MenuItem,
  MenuPopup,
  MenuPortal,
  MenuPositioner,
  MenuTrigger,
  Toolbar,
  ToolbarButton,
  ToolbarGroup,
  ToolbarSeparator,
} from "@boyernick/standard-ui-react"
import type { ReactNode } from "react"
import { DocBand } from "@/components/doc-band"

const BAND = "max-w-lg"

const Shortcut = ({ keys }: { keys: string[] }) => (
  <KbdGroup className="ml-auto">
    {keys.map((key) => (
      <Kbd key={key} size="sm">
        {key}
      </Kbd>
    ))}
  </KbdGroup>
)

const StyleItem = ({
  label,
  keys,
  labelClassName,
}: {
  label: ReactNode
  keys: string[]
  labelClassName?: string
}) => (
  <MenuItem className="gap-4">
    <span className={labelClassName}>{label}</span>
    <Shortcut keys={keys} />
  </MenuItem>
)

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
          <ToolbarButton aria-label="Link">
            <IconChainLink3 size={14} className="size-3.5" aria-hidden />
          </ToolbarButton>
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
        <Menu>
          <MenuTrigger render={<ToolbarButton />}>Text</MenuTrigger>
          <MenuPortal>
            <MenuPositioner align="start">
              <MenuPopup>
                <StyleItem label="Text" keys={["⌥", "⌘", "0"]} />
                <StyleItem
                  label="Heading 1"
                  labelClassName="text-[15px] leading-5 font-semibold"
                  keys={["⌥", "⌘", "1"]}
                />
                <StyleItem
                  label="Heading 2"
                  labelClassName="text-sm font-semibold"
                  keys={["⌥", "⌘", "2"]}
                />
                <StyleItem
                  label="Heading 3"
                  labelClassName="text-[13px] leading-4 font-semibold"
                  keys={["⌥", "⌘", "3"]}
                />
                <StyleItem label="Numbered list" keys={["⌥", "⌘", "4"]} />
                <StyleItem label="Ordered list" keys={["⌥", "⌘", "5"]} />
                <StyleItem label="Checklist" keys={["⌥", "⌘", "6"]} />
                <StyleItem label="Divider" keys={["⌥", "⌘", "7"]} />
              </MenuPopup>
            </MenuPositioner>
          </MenuPortal>
        </Menu>
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
