"use client"

import {
  IconChainLink3,
  IconHighlight,
  IconStrikeThrough,
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
  Tooltip,
  TooltipPopup,
  TooltipPortal,
  TooltipPositioner,
  TooltipProvider,
  TooltipTrigger,
} from "@boyernick/standard-ui-react"
import type { ReactElement, ReactNode } from "react"
import { DocBand } from "@/components/doc-band"

const BAND = "max-w-lg"

const Shortcut = ({
  keys,
  inverted,
  className = "ml-auto",
}: {
  keys: string[]
  inverted?: boolean
  className?: string
}) => (
  <KbdGroup className={className}>
    {keys.map((key) => (
      <Kbd key={key} size="sm" variant={inverted ? "inverted" : "default"}>
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

const FormatTip = ({
  label,
  keys,
  children,
}: {
  label: string
  keys: string[]
  children: ReactElement
}) => (
  <Tooltip>
    <TooltipTrigger render={children} />
    <TooltipPortal>
      <TooltipPositioner>
        <TooltipPopup variant="inverted">
          {label}
          <Shortcut keys={keys} inverted className="ml-1.5" />
        </TooltipPopup>
      </TooltipPositioner>
    </TooltipPortal>
  </Tooltip>
)

export const ToolbarExamples = () => (
  <TooltipProvider delay={200}>
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
            <FormatTip label="Link" keys={["⌘", "K"]}>
              <ToolbarButton aria-label="Link">
                <IconChainLink3 size={14} className="size-3.5" aria-hidden />
              </ToolbarButton>
            </FormatTip>
            <FormatTip label="Bold" keys={["⌘", "B"]}>
              <ToolbarButton aria-label="Bold" className="font-semibold">
                B
              </ToolbarButton>
            </FormatTip>
            <FormatTip label="Italic" keys={["⌘", "I"]}>
              <ToolbarButton aria-label="Italic" className="italic">
                I
              </ToolbarButton>
            </FormatTip>
            <FormatTip label="Underline" keys={["⌘", "U"]}>
              <ToolbarButton aria-label="Underline" className="underline">
                U
              </ToolbarButton>
            </FormatTip>
            <FormatTip label="Strikethrough" keys={["⇧", "⌘", "X"]}>
              <ToolbarButton aria-label="Strikethrough">
                <IconStrikeThrough size={14} className="size-3.5" aria-hidden />
              </ToolbarButton>
            </FormatTip>
            <FormatTip label="Highlight" keys={["⇧", "⌘", "H"]}>
              <ToolbarButton aria-label="Highlight">
                <IconHighlight size={14} className="size-3.5" aria-hidden />
              </ToolbarButton>
            </FormatTip>
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
  </TooltipProvider>
)
