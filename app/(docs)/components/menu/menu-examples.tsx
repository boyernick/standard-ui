"use client"

import {
  Button,
  Menu,
  MenuCheckboxItem,
  MenuCheckboxItemIndicator,
  MenuGroup,
  MenuGroupLabel,
  MenuItem,
  MenuPopup,
  MenuPortal,
  MenuPositioner,
  MenuRadioGroup,
  MenuRadioItem,
  MenuRadioItemIndicator,
  MenuSeparator,
  MenuSubmenuRoot,
  MenuSubmenuTrigger,
  MenuTrigger,
} from "@boyernick/standard-ui-react"
import { useState } from "react"
import { ComponentCanvas } from "@/components/component-canvas"

export const MenuExamples = () => {
  const [notifications, setNotifications] = useState(true)
  const [density, setDensity] = useState("comfortable")

  return (
    <div className="mt-6 flex flex-col gap-8">
      <ComponentCanvas
        label="Basic"
        code={`<Menu>
  <MenuTrigger render={<Button variant="outline" />}>
    Open menu
  </MenuTrigger>
  <MenuPortal>
    <MenuPositioner>
      <MenuPopup>
        <MenuItem>Profile</MenuItem>
        <MenuItem>Billing</MenuItem>
        <MenuSeparator />
        <MenuItem>Sign out</MenuItem>
      </MenuPopup>
    </MenuPositioner>
  </MenuPortal>
</Menu>`}
      >
        <Menu>
          <MenuTrigger render={<Button variant="outline" />}>
            Open menu
          </MenuTrigger>
          <MenuPortal>
            <MenuPositioner>
              <MenuPopup>
                <MenuItem>Profile</MenuItem>
                <MenuItem>Billing</MenuItem>
                <MenuSeparator />
                <MenuItem>Sign out</MenuItem>
              </MenuPopup>
            </MenuPositioner>
          </MenuPortal>
        </Menu>
      </ComponentCanvas>

      <ComponentCanvas
        label="Checkbox and radio"
        code={`<Menu>
  <MenuTrigger render={<Button variant="outline" />}>
    View
  </MenuTrigger>
  <MenuPortal>
    <MenuPositioner>
      <MenuPopup>
        <MenuGroup>
          <MenuGroupLabel>Preferences</MenuGroupLabel>
          <MenuCheckboxItem
            checked={notifications}
            onCheckedChange={setNotifications}
          >
            <MenuCheckboxItemIndicator />
            Notifications
          </MenuCheckboxItem>
        </MenuGroup>
        <MenuSeparator />
        <MenuRadioGroup value={density} onValueChange={setDensity}>
          <MenuGroupLabel>Density</MenuGroupLabel>
          <MenuRadioItem value="compact">
            <MenuRadioItemIndicator />
            Compact
          </MenuRadioItem>
          <MenuRadioItem value="comfortable">
            <MenuRadioItemIndicator />
            Comfortable
          </MenuRadioItem>
        </MenuRadioGroup>
      </MenuPopup>
    </MenuPositioner>
  </MenuPortal>
</Menu>`}
      >
        <Menu>
          <MenuTrigger render={<Button variant="outline" />}>View</MenuTrigger>
          <MenuPortal>
            <MenuPositioner>
              <MenuPopup>
                <MenuGroup>
                  <MenuGroupLabel>Preferences</MenuGroupLabel>
                  <MenuCheckboxItem
                    checked={notifications}
                    onCheckedChange={setNotifications}
                  >
                    <MenuCheckboxItemIndicator />
                    Notifications
                  </MenuCheckboxItem>
                </MenuGroup>
                <MenuSeparator />
                <MenuRadioGroup value={density} onValueChange={setDensity}>
                  <MenuGroupLabel>Density</MenuGroupLabel>
                  <MenuRadioItem value="compact">
                    <MenuRadioItemIndicator />
                    Compact
                  </MenuRadioItem>
                  <MenuRadioItem value="comfortable">
                    <MenuRadioItemIndicator />
                    Comfortable
                  </MenuRadioItem>
                </MenuRadioGroup>
              </MenuPopup>
            </MenuPositioner>
          </MenuPortal>
        </Menu>
      </ComponentCanvas>

      <ComponentCanvas
        label="Submenu"
        code={`<Menu>
  <MenuTrigger render={<Button variant="outline" />}>
    Share
  </MenuTrigger>
  <MenuPortal>
    <MenuPositioner>
      <MenuPopup>
        <MenuItem>Copy link</MenuItem>
        <MenuSubmenuRoot>
          <MenuSubmenuTrigger>Share to</MenuSubmenuTrigger>
          <MenuPortal>
            <MenuPositioner>
              <MenuPopup>
                <MenuItem>Email</MenuItem>
                <MenuItem>Messages</MenuItem>
                <MenuItem>Slack</MenuItem>
              </MenuPopup>
            </MenuPositioner>
          </MenuPortal>
        </MenuSubmenuRoot>
      </MenuPopup>
    </MenuPositioner>
  </MenuPortal>
</Menu>`}
      >
        <Menu>
          <MenuTrigger render={<Button variant="outline" />}>Share</MenuTrigger>
          <MenuPortal>
            <MenuPositioner>
              <MenuPopup>
                <MenuItem>Copy link</MenuItem>
                <MenuSubmenuRoot>
                  <MenuSubmenuTrigger>Share to</MenuSubmenuTrigger>
                  <MenuPortal>
                    <MenuPositioner>
                      <MenuPopup>
                        <MenuItem>Email</MenuItem>
                        <MenuItem>Messages</MenuItem>
                        <MenuItem>Slack</MenuItem>
                      </MenuPopup>
                    </MenuPositioner>
                  </MenuPortal>
                </MenuSubmenuRoot>
              </MenuPopup>
            </MenuPositioner>
          </MenuPortal>
        </Menu>
      </ComponentCanvas>
    </div>
  )
}
