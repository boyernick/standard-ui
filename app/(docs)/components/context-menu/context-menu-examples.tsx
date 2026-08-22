import {
  ContextMenu,
  ContextMenuItem,
  ContextMenuPopup,
  ContextMenuPortal,
  ContextMenuPositioner,
  ContextMenuSeparator,
  ContextMenuSubmenuRoot,
  ContextMenuSubmenuTrigger,
  ContextMenuTrigger,
} from "@boyernick/standard-ui-react"
import type { ReactNode } from "react"
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

export const ContextMenuExamples = () => (
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
