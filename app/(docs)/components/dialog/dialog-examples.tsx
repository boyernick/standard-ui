"use client"

import {
  Button,
  Checkbox,
  cn,
  Dialog,
  DialogBackdrop,
  DialogClose,
  DialogDescription,
  DialogHeader,
  DialogPopup,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@boyernick/standard-ui-react"
import type { ReactNode } from "react"
import { useState } from "react"
import { DocBand } from "@/components/doc-band"

/** Trigger, header and a closing action — the shape every specimen shares. */
const Modal = ({
  trigger,
  title,
  description,
  children,
  close = "Close",
}: {
  trigger: string
  title: string
  description: string
  children?: ReactNode
  close?: string
}) => (
  <Dialog>
    <DialogTrigger render={<Button />}>{trigger}</DialogTrigger>
    <DialogPortal>
      <DialogBackdrop />
      <DialogPopup>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
        <div className="flex justify-end">
          <DialogClose render={<Button variant="outline" />}>
            {close}
          </DialogClose>
        </div>
      </DialogPopup>
    </DialogPortal>
  </Dialog>
)

/** Long enough to overflow the body on any screen — the band documents the
 *  scroll, so the specimen has to actually reach it. */
const paragraphs = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
  "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.",
  "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.",
  "Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio.",
]

/** A dialog whose body scrolls under a fixed header and footer. The action
 *  stays reachable at the bottom instead of scrolling away with the text, and
 *  it only unlocks once the reader has reached the end and ticked the box. */
const TermsModal = () => {
  const [scrolled, setScrolled] = useState(false)
  const [atBottom, setAtBottom] = useState(false)
  const [accepted, setAccepted] = useState(false)

  return (
    <Dialog
      // Reopening should start the reader at the top again, unaccepted — the
      // state lives out here, so it would otherwise survive the close.
      onOpenChange={(open) => {
        if (open) {
          setScrolled(false)
          setAtBottom(false)
          setAccepted(false)
        }
      }}
    >
      <DialogTrigger render={<Button />}>Read terms</DialogTrigger>
      <DialogPortal>
        <DialogBackdrop />
        {/* A set height rather than a cap, so the scroll is there whatever the
            content. `overflow-y-hidden` overrides the popup's own auto: the
            scroll moves to the body so the footer can stay put. */}
        <DialogPopup className="h-[30rem] gap-0 overflow-y-hidden p-0">
          {/* The rule only earns its place once there is something scrolled
              under it. It is a transparent border the rest of the time rather
              than no border, so appearing cannot shift the body by a pixel. */}
          <DialogHeader
            className={cn(
              "border-b px-5 pt-5 pb-4 transition-colors duration-[var(--duration-sm)] ease-enter motion-reduce:transition-none",
              scrolled ? "border-border-primary" : "border-transparent",
            )}
          >
            <DialogTitle>Terms of service</DialogTitle>
            <DialogDescription>The short version, in full.</DialogDescription>
          </DialogHeader>

          {/* `min-h-0` is what lets a flex child shrink far enough to scroll. */}
          <div
            className="min-h-0 flex-1 overflow-y-auto px-5 pb-5"
            onScroll={(event) => {
              const el = event.currentTarget
              setScrolled(el.scrollTop > 0)
              // Fractional layout heights never sum exactly, so allow a pixel.
              setAtBottom(el.scrollHeight - el.scrollTop - el.clientHeight <= 1)
            }}
          >
            <div className="text-sm flex flex-col gap-4 text-fg-secondary">
              {paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>
            <label className="text-sm mt-6 flex items-center gap-2 text-fg-primary">
              <Checkbox
                checked={accepted}
                onCheckedChange={(checked) => setAccepted(checked === true)}
              />
              I accept the terms of service
            </label>
          </div>

          {/* Cancel is not decoration: until the reader reaches the end and
              ticks the box, Accept is disabled, and without a live sibling the
              footer offers no visible way out at all. Declining terms is also a
              real answer, which a labelled control says and a corner cross
              does not. Pairing matches the alert dialog. */}
          <div className="flex justify-end gap-2 border-t border-border-primary px-5 py-4">
            <DialogClose render={<Button variant="outline" />}>
              Cancel
            </DialogClose>
            <DialogClose render={<Button disabled={!atBottom || !accepted} />}>
              Accept
            </DialogClose>
          </div>
        </DialogPopup>
      </DialogPortal>
    </Dialog>
  )
}

export const DialogExamples = () => (
  <div>
    <DocBand
      first
      id="default"
      title="Default"
      description="A focused task on top of the page."
    >
      <Modal
        trigger="Edit profile"
        title="Edit profile"
        description="Make changes to your profile, then close when you are done."
      />
    </DocBand>

    <DocBand
      id="scrolling"
      title="Scrolling content"
      description="The popup caps at the viewport and scrolls rather than running off it."
    >
<TermsModal />
    </DocBand>
  </div>
)
