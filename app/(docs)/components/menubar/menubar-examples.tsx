"use client"

import {
  Menu,
  MenuItem,
  MenuPopup,
  MenuPortal,
  MenuPositioner,
  MenuSeparator,
  MenuTrigger,
  Menubar,
} from "@boyernick/standard-ui-react"
import type { ComponentProps } from "react"
import { DocBand } from "@/components/doc-band"

const menus = [
  { label: "File", items: ["New", "Open…", null, "Save"] },
  { label: "Edit", items: ["Undo", "Redo", null, "Cut", "Copy", "Paste"] },
  { label: "View", items: ["Zoom in", "Zoom out", null, "Fullscreen"] },
]

/** The same three menus every specimen shares. */
const Bar = (props: Omit<ComponentProps<typeof Menubar>, "children">) => (
  <Menubar {...props}>
    {menus.map((menu) => (
      <Menu key={menu.label}>
        <MenuTrigger>{menu.label}</MenuTrigger>
        <MenuPortal>
          <MenuPositioner>
            <MenuPopup>
              {menu.items.map((item, index) =>
                item === null ? (
                  <MenuSeparator key={`sep-${index}`} />
                ) : (
                  <MenuItem key={item}>{item}</MenuItem>
                ),
              )}
            </MenuPopup>
          </MenuPositioner>
        </MenuPortal>
      </Menu>
    ))}
  </Menubar>
)

export const MenubarExamples = () => (
  <div>
    <DocBand
      first
      id="default"
      title="Default"
      description="Top-level menus that hand off to each other as you move across."
    >
      <Bar />
    </DocBand>

    <DocBand
      id="vertical"
      title="Vertical"
      description="The same bar stacked, for a rail down the side."
    >
      <Bar orientation="vertical" className="w-40" />
    </DocBand>

    <DocBand
      id="disabled"
      title="Disabled"
      description="Disabling the bar disables every menu on it."
    >
      <Bar disabled />
    </DocBand>
  </div>
)
