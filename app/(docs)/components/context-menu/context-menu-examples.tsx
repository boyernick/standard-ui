"use client"

import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuCheckboxItemIndicator,
  ContextMenuGroup,
  ContextMenuGroupLabel,
  ContextMenuItem,
  ContextMenuPopup,
  ContextMenuPortal,
  ContextMenuPositioner,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuRadioItemIndicator,
  ContextMenuSeparator,
  ContextMenuSubmenuRoot,
  ContextMenuSubmenuTrigger,
  ContextMenuTrigger,
} from "@boyernick/standard-ui-react"
import type { ReactNode } from "react"
import { useState } from "react"
import { DocBand } from "@/components/doc-band"

/** The right-click target every specimen shares. */
const Region = ({ label, children }: { label: string; children: ReactNode }) => (
  <ContextMenu>
    <ContextMenuTrigger className="flex h-32 w-full cursor-default items-center justify-center rounded-xl border border-dashed border-border-primary bg-background-secondary text-sm text-fg-secondary">
      {label}
    </ContextMenuTrigger>
    <ContextMenuPortal>
      <ContextMenuPositioner>
        <ContextMenuPopup>{children}</ContextMenuPopup>
      </ContextMenuPositioner>
    </ContextMenuPortal>
  </ContextMenu>
)

export const ContextMenuExamples = () => {
  const [showGrid, setShowGrid] = useState(true)
  const [view, setView] = useState("list")

  return (
    <div>
      <DocBand
        first
        id="default"
        title="Default"
        description="Actions for the region under the pointer."
        contentClassName="max-w-sm"
      >
        <Region label="Right-click here">
          <ContextMenuItem>Cut</ContextMenuItem>
          <ContextMenuItem>Copy</ContextMenuItem>
          <ContextMenuItem>Paste</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem>Delete</ContextMenuItem>
        </Region>
      </DocBand>

      <DocBand
        id="checkbox-radio"
        title="Checkbox and radio"
        description="Items that carry state, toggled or chosen in place."
        contentClassName="max-w-sm"
      >
        <Region label="Right-click for options">
          <ContextMenuGroup>
            <ContextMenuGroupLabel>Display</ContextMenuGroupLabel>
            <ContextMenuCheckboxItem
              checked={showGrid}
              onCheckedChange={setShowGrid}
            >
              <ContextMenuCheckboxItemIndicator />
              Show grid
            </ContextMenuCheckboxItem>
          </ContextMenuGroup>
          <ContextMenuSeparator />
          <ContextMenuRadioGroup value={view} onValueChange={setView}>
            <ContextMenuRadioItem value="list">
              <ContextMenuRadioItemIndicator />
              List
            </ContextMenuRadioItem>
            <ContextMenuRadioItem value="grid">
              <ContextMenuRadioItemIndicator />
              Grid
            </ContextMenuRadioItem>
          </ContextMenuRadioGroup>
        </Region>
      </DocBand>

      <DocBand
        id="submenu"
        title="Submenu"
        description="A nested menu that opens beside its parent."
        contentClassName="max-w-sm"
      >
        <Region label="Right-click to share">
          <ContextMenuItem>Rename</ContextMenuItem>
          <ContextMenuSubmenuRoot>
            <ContextMenuSubmenuTrigger>Share</ContextMenuSubmenuTrigger>
            <ContextMenuPortal>
              <ContextMenuPositioner>
                <ContextMenuPopup>
                  <ContextMenuItem>Email</ContextMenuItem>
                  <ContextMenuItem>Link</ContextMenuItem>
                </ContextMenuPopup>
              </ContextMenuPositioner>
            </ContextMenuPortal>
          </ContextMenuSubmenuRoot>
        </Region>
      </DocBand>
    </div>
  )
}
