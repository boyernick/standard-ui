"use client"

import {
  Avatar,
  AvatarFallback,
  PreviewCard,
  PreviewCardPopup,
  PreviewCardPortal,
  PreviewCardPositioner,
  PreviewCardTrigger,
} from "@boyernick/standard-ui-react"
import type { ReactNode } from "react"
import { DocBand } from "@/components/doc-band"

/** Trigger and the card it reveals — the shape every specimen shares. */
const Preview = ({
  trigger,
  children,
}: {
  trigger: ReactNode
  children: ReactNode
}) => (
  <PreviewCard>
    {trigger}
    <PreviewCardPortal>
      <PreviewCardPositioner>
        <PreviewCardPopup>{children}</PreviewCardPopup>
      </PreviewCardPositioner>
    </PreviewCardPortal>
  </PreviewCard>
)

const mentionClassName =
  "cursor-pointer text-sm text-fg-primary underline-offset-4 hover:underline"

export const PreviewCardExamples = () => (
  <div>
    <DocBand
      first
      id="default"
      title="Default"
      description="A link that shows what it points at before you follow it."
    >
      <p className="text-sm text-fg-secondary">
        Built on{" "}
        <Preview
          trigger={
            <PreviewCardTrigger
              render={<a href="https://base-ui.com" className={mentionClassName} />}
            >
              @base-ui
            </PreviewCardTrigger>
          }
        >
          <p className="text-sm-strong text-fg-primary">Base UI</p>
          <p className="mt-1 text-sm text-fg-secondary">
            Unstyled React components for building accessible design systems.
          </p>
        </Preview>{" "}
        for behaviour.
      </p>
    </DocBand>

    <DocBand
      id="profile"
      title="Profile"
      description="A mention that opens into who it refers to."
    >
      <p className="text-sm text-fg-secondary">
        Reviewed by{" "}
        <Preview
          trigger={
            <PreviewCardTrigger
              render={<button type="button" className={mentionClassName} />}
            >
              Maya Chen
            </PreviewCardTrigger>
          }
        >
          <div className="flex items-start gap-3">
            {/* The real Avatar rather than a hand-rolled circle — the docs
                should use what the library ships. */}
            <Avatar>
              <AvatarFallback>MC</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm-strong text-fg-primary">Maya Chen</p>
              <p className="text-sm text-fg-secondary">Product design</p>
              <p className="mt-2 text-sm text-fg-tertiary">
                Working on structure and materials for StandardUI.
              </p>
            </div>
          </div>
        </Preview>{" "}
        last Tuesday.
      </p>
    </DocBand>
  </div>
)
