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
} from "@standard-ui/react"
import { useState } from "react"
import { ComponentCanvas } from "@/components/component-canvas"

export const ContextMenuExamples = () => {
  const [showGrid, setShowGrid] = useState(true)
  const [view, setView] = useState("list")

  return (
    <div className="mt-6 flex flex-col gap-8">
      <ComponentCanvas
        label="Basic"
        code={`<ContextMenu>
  <ContextMenuTrigger className="…">
    Right-click here
  </ContextMenuTrigger>
  <ContextMenuPortal>
    <ContextMenuPositioner>
      <ContextMenuPopup>
        <ContextMenuItem>Cut</ContextMenuItem>
        <ContextMenuItem>Copy</ContextMenuItem>
        <ContextMenuItem>Paste</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>Delete</ContextMenuItem>
      </ContextMenuPopup>
    </ContextMenuPositioner>
  </ContextMenuPortal>
</ContextMenu>`}
      >
        <ContextMenu>
          <ContextMenuTrigger className="flex h-32 w-full max-w-sm cursor-default items-center justify-center rounded-xl border border-dashed border-border-primary bg-background-secondary text-sm text-fg-secondary">
            Right-click here
          </ContextMenuTrigger>
          <ContextMenuPortal>
            <ContextMenuPositioner>
              <ContextMenuPopup>
                <ContextMenuItem>Cut</ContextMenuItem>
                <ContextMenuItem>Copy</ContextMenuItem>
                <ContextMenuItem>Paste</ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuItem>Delete</ContextMenuItem>
              </ContextMenuPopup>
            </ContextMenuPositioner>
          </ContextMenuPortal>
        </ContextMenu>
      </ComponentCanvas>

      <ComponentCanvas
        label="Checkbox, radio, submenu"
        code={`<ContextMenu>
  <ContextMenuTrigger>…</ContextMenuTrigger>
  <ContextMenuPortal>
    <ContextMenuPositioner>
      <ContextMenuPopup>
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
        <ContextMenuSeparator />
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
      </ContextMenuPopup>
    </ContextMenuPositioner>
  </ContextMenuPortal>
</ContextMenu>`}
      >
        <ContextMenu>
          <ContextMenuTrigger className="flex h-32 w-full max-w-sm cursor-default items-center justify-center rounded-xl border border-dashed border-border-primary bg-background-secondary text-sm text-fg-secondary">
            Right-click for options
          </ContextMenuTrigger>
          <ContextMenuPortal>
            <ContextMenuPositioner>
              <ContextMenuPopup>
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
                <ContextMenuSeparator />
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
              </ContextMenuPopup>
            </ContextMenuPositioner>
          </ContextMenuPortal>
        </ContextMenu>
      </ComponentCanvas>
    </div>
  )
}
