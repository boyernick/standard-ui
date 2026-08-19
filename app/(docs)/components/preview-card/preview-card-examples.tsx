"use client"

import {
  PreviewCard,
  PreviewCardArrow,
  PreviewCardPopup,
  PreviewCardPortal,
  PreviewCardPositioner,
  PreviewCardTrigger,
} from "@standard-ui/react"
import { ComponentCanvas } from "@/components/component-canvas"

export const PreviewCardExamples = () => (
  <div className="mt-6 flex flex-col gap-8">
    <ComponentCanvas
      label="Link preview"
      code={`<PreviewCard>
  <PreviewCardTrigger
    render={
      <a
        href="https://base-ui.com"
        className="cursor-pointer text-sm text-fg-primary underline-offset-4 hover:underline"
      />
    }
  >
    @base-ui
  </PreviewCardTrigger>
  <PreviewCardPortal>
    <PreviewCardPositioner>
      <PreviewCardPopup>
        <PreviewCardArrow />
        <p className="text-sm-strong text-fg-primary">Base UI</p>
        <p className="mt-1 text-sm text-fg-secondary">
          Unstyled React components for building accessible design systems.
        </p>
      </PreviewCardPopup>
    </PreviewCardPositioner>
  </PreviewCardPortal>
</PreviewCard>`}
    >
      <PreviewCard>
        <PreviewCardTrigger
          render={
            <a
              href="https://base-ui.com"
              className="cursor-pointer text-sm text-fg-primary underline-offset-4 hover:underline"
            />
          }
        >
          @base-ui
        </PreviewCardTrigger>
        <PreviewCardPortal>
          <PreviewCardPositioner>
            <PreviewCardPopup>
              <PreviewCardArrow />
              <p className="text-sm-strong text-fg-primary">Base UI</p>
              <p className="mt-1 text-sm text-fg-secondary">
                Unstyled React components for building accessible design
                systems.
              </p>
            </PreviewCardPopup>
          </PreviewCardPositioner>
        </PreviewCardPortal>
      </PreviewCard>
    </ComponentCanvas>

    <ComponentCanvas
      label="Profile"
      code={`<PreviewCard>
  <PreviewCardTrigger
    render={
      <button
        type="button"
        className="cursor-pointer text-sm text-fg-primary underline-offset-4 hover:underline"
      />
    }
  >
    Maya Chen
  </PreviewCardTrigger>
  <PreviewCardPortal>
    <PreviewCardPositioner>
      <PreviewCardPopup>
        <PreviewCardArrow />
        <div className="flex items-start gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-background-tertiary text-sm text-fg-primary">
            MC
          </div>
          <div>
            <p className="text-sm-strong text-fg-primary">Maya Chen</p>
            <p className="text-sm text-fg-secondary">Product design</p>
            <p className="mt-2 text-sm text-fg-tertiary">
              Working on structure and materials for StandardUI.
            </p>
          </div>
        </div>
      </PreviewCardPopup>
    </PreviewCardPositioner>
  </PreviewCardPortal>
</PreviewCard>`}
    >
      <PreviewCard>
        <PreviewCardTrigger
          render={
            <button
              type="button"
              className="cursor-pointer text-sm text-fg-primary underline-offset-4 hover:underline"
            />
          }
        >
          Maya Chen
        </PreviewCardTrigger>
        <PreviewCardPortal>
          <PreviewCardPositioner>
            <PreviewCardPopup>
              <PreviewCardArrow />
              <div className="flex items-start gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-background-tertiary text-sm text-fg-primary">
                  MC
                </div>
                <div>
                  <p className="text-sm-strong text-fg-primary">Maya Chen</p>
                  <p className="text-sm text-fg-secondary">Product design</p>
                  <p className="mt-2 text-sm text-fg-tertiary">
                    Working on structure and materials for StandardUI.
                  </p>
                </div>
              </div>
            </PreviewCardPopup>
          </PreviewCardPositioner>
        </PreviewCardPortal>
      </PreviewCard>
    </ComponentCanvas>
  </div>
)
