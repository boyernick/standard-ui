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
} from "@standard-ui/react"
import { ComponentCanvas } from "@/components/component-canvas"

export const DrawerExamples = () => (
  <div className="mt-6 flex flex-col gap-8">
    <ComponentCanvas
      label="Right"
      code={`<Drawer swipeDirection="right">
  <DrawerTrigger render={<Button />}>
    Open drawer
  </DrawerTrigger>
  <DrawerPortal>
    <DrawerBackdrop />
    <DrawerViewport>
      <DrawerPopup>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Account</DrawerTitle>
            <DrawerDescription>
              Manage profile details and preferences.
            </DrawerDescription>
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
</Drawer>`}
    >
      <Drawer swipeDirection="right">
        <DrawerTrigger render={<Button />}>Open drawer</DrawerTrigger>
        <DrawerPortal>
          <DrawerBackdrop />
          <DrawerViewport>
            <DrawerPopup>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Account</DrawerTitle>
                  <DrawerDescription>
                    Manage profile details and preferences.
                  </DrawerDescription>
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
    </ComponentCanvas>

    <ComponentCanvas
      label="Bottom"
      code={`<Drawer swipeDirection="down">
  <DrawerTrigger render={<Button variant="outline" />}>
    Open sheet
  </DrawerTrigger>
  <DrawerPortal>
    <DrawerBackdrop />
    <DrawerViewport>
      <DrawerPopup>
        <DrawerContent className="pt-3">
          <div
            aria-hidden
            className="mx-auto mb-3 h-1 w-10 rounded-full bg-border-secondary"
          />
          <DrawerHeader>
            <DrawerTitle>Filters</DrawerTitle>
            <DrawerDescription>
              Adjust filters, then swipe down or close.
            </DrawerDescription>
          </DrawerHeader>
          <div className="flex justify-end">
            <DrawerClose render={<Button variant="outline" />}>
              Done
            </DrawerClose>
          </div>
        </DrawerContent>
      </DrawerPopup>
    </DrawerViewport>
  </DrawerPortal>
</Drawer>`}
    >
      <Drawer swipeDirection="down">
        <DrawerTrigger render={<Button variant="outline" />}>
          Open sheet
        </DrawerTrigger>
        <DrawerPortal>
          <DrawerBackdrop />
          <DrawerViewport>
            <DrawerPopup>
              <DrawerContent className="pt-3">
                <div
                  aria-hidden
                  className="mx-auto mb-3 h-1 w-10 rounded-full bg-border-secondary"
                />
                <DrawerHeader>
                  <DrawerTitle>Filters</DrawerTitle>
                  <DrawerDescription>
                    Adjust filters, then swipe down or close.
                  </DrawerDescription>
                </DrawerHeader>
                <div className="flex justify-end">
                  <DrawerClose render={<Button variant="outline" />}>
                    Done
                  </DrawerClose>
                </div>
              </DrawerContent>
            </DrawerPopup>
          </DrawerViewport>
        </DrawerPortal>
      </Drawer>
    </ComponentCanvas>
  </div>
)
