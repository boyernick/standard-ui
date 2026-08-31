"use client"

import {
  Button,
  Drawer,
  DrawerBackdrop,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerPopup,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
  DrawerViewport,
} from "@boyernick/standard-ui-react"
import type { ComponentProps, ReactNode } from "react"
import { DocBand } from "@/components/doc-band"

/** The panel every specimen shares — only the edge it enters from differs. */
const Panel = ({
  trigger,
  title,
  description,
  grabBar,
  ...root
}: {
  trigger: string
  title: string
  description: string
  /** Bottom sheets get a grab bar, since they are the ones you drag. */
  grabBar?: boolean
} & Omit<ComponentProps<typeof Drawer>, "children">) => (
  <Drawer {...root}>
    <DrawerTrigger render={<Button variant="outline" />}>
      {trigger}
    </DrawerTrigger>
    <DrawerPortal>
      <DrawerBackdrop />
      <DrawerViewport>
        <DrawerPopup>
          <DrawerContent className={grabBar ? "pt-3" : undefined}>
            {grabBar ? (
              <div
                aria-hidden
                className="mx-auto mb-3 h-1 w-10 rounded-full bg-border-secondary"
              />
            ) : null}
            <DrawerHeader>
              <DrawerTitle>{title}</DrawerTitle>
              <DrawerDescription>{description}</DrawerDescription>
            </DrawerHeader>
            <div className="mt-auto flex justify-end">
              <DrawerClose render={<Button variant="outline" />}>
                Close
              </DrawerClose>
            </div>
          </DrawerContent>
        </DrawerPopup>
      </DrawerViewport>
    </DrawerPortal>
  </Drawer>
)

const Row = ({ children }: { children: ReactNode }) => (
  <div className="flex flex-wrap items-center gap-3">{children}</div>
)

export const DrawerExamples = () => (
  <div>
    <DocBand
      first
      id="side"
      title="Side panel"
      description="Full height against the left or right edge."
    >
      <Row>
        <Panel
          swipeDirection="right"
          trigger="From the right"
          title="Account"
          description="Manage profile details and preferences."
        />
        <Panel
          swipeDirection="left"
          trigger="From the left"
          title="Navigation"
          description="Jump to any section of the app."
        />
      </Row>
    </DocBand>

    <DocBand
      id="sheet"
      title="Sheet"
      description="Rises from the bottom or drops from the top."
    >
      <Row>
        <Panel
          swipeDirection="down"
          grabBar
          trigger="From the bottom"
          title="Filters"
          description="Adjust filters, then swipe down or close."
        />
        <Panel
          swipeDirection="up"
          trigger="From the top"
          title="Notifications"
          description="Everything from the last seven days."
        />
      </Row>
    </DocBand>
  </div>
)
