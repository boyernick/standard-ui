"use client"

import {
  Menu,
  MenuItem,
  MenuPortal,
  MenuPositioner,
  MenuPopup,
  MenuSeparator,
  MenuTrigger,
  Menubar,
} from "@boyernick/standard-ui-react"
import { ComponentCanvas } from "@/components/component-canvas"

export const MenubarExamples = () => (
  <div className="mt-6 flex flex-col gap-8">
    <ComponentCanvas
      label="Application"
      code={`<Menubar>
  <Menu>
    <MenuTrigger>File</MenuTrigger>
    <MenuPortal>
      <MenuPositioner>
        <MenuPopup>
          <MenuItem>New</MenuItem>
          <MenuItem>Open…</MenuItem>
          <MenuSeparator />
          <MenuItem>Save</MenuItem>
        </MenuPopup>
      </MenuPositioner>
    </MenuPortal>
  </Menu>
  <Menu>
    <MenuTrigger>Edit</MenuTrigger>
    …
  </Menu>
</Menubar>`}
    >
      <Menubar>
        <Menu>
          <MenuTrigger>File</MenuTrigger>
          <MenuPortal>
            <MenuPositioner>
              <MenuPopup>
                <MenuItem>New</MenuItem>
                <MenuItem>Open…</MenuItem>
                <MenuSeparator />
                <MenuItem>Save</MenuItem>
              </MenuPopup>
            </MenuPositioner>
          </MenuPortal>
        </Menu>
        <Menu>
          <MenuTrigger>Edit</MenuTrigger>
          <MenuPortal>
            <MenuPositioner>
              <MenuPopup>
                <MenuItem>Undo</MenuItem>
                <MenuItem>Redo</MenuItem>
                <MenuSeparator />
                <MenuItem>Cut</MenuItem>
                <MenuItem>Copy</MenuItem>
                <MenuItem>Paste</MenuItem>
              </MenuPopup>
            </MenuPositioner>
          </MenuPortal>
        </Menu>
        <Menu>
          <MenuTrigger>View</MenuTrigger>
          <MenuPortal>
            <MenuPositioner>
              <MenuPopup>
                <MenuItem>Zoom in</MenuItem>
                <MenuItem>Zoom out</MenuItem>
                <MenuSeparator />
                <MenuItem>Fullscreen</MenuItem>
              </MenuPopup>
            </MenuPositioner>
          </MenuPortal>
        </Menu>
      </Menubar>
    </ComponentCanvas>
  </div>
)
