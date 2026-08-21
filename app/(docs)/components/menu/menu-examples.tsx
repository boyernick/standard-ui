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
import type { ReactNode } from "react"
import { useState } from "react"
import { DocBand } from "@/components/doc-band"

/** Trigger and popup — the shape every specimen shares. */
const Anchored = ({
  trigger,
  children,
}: {
  trigger: string
  children: ReactNode
}) => (
  <Menu>
    <MenuTrigger render={<Button variant="outline" />}>{trigger}</MenuTrigger>
    <MenuPortal>
      <MenuPositioner>
        <MenuPopup>{children}</MenuPopup>
      </MenuPositioner>
    </MenuPortal>
  </Menu>
)

export const MenuExamples = () => {
  const [notifications, setNotifications] = useState(true)
  const [density, setDensity] = useState("comfortable")

  return (
    <div>
      <DocBand
        first
        id="default"
        title="Default"
        description="Actions under a trigger, split by a rule."
      >
        <Anchored trigger="Open menu">
          <MenuItem>Profile</MenuItem>
          <MenuItem>Billing</MenuItem>
          {/* A disabled item stays in place rather than disappearing, so the
              list does not reshuffle between visits. */}
          <MenuItem disabled>Transfer ownership</MenuItem>
          <MenuSeparator />
          <MenuItem>Sign out</MenuItem>
        </Anchored>
      </DocBand>

      <DocBand
        id="checkbox-radio"
        title="Checkbox and radio"
        description="Items that carry state, toggled or chosen in place."
      >
        <Anchored trigger="View">
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
        </Anchored>
      </DocBand>

      <DocBand
        id="submenu"
        title="Submenu"
        description="A nested menu that opens beside its parent."
      >
        <Anchored trigger="Share">
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
        </Anchored>
      </DocBand>
    </div>
  )
}
