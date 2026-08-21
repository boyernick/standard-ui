"use client"

import {
  Button,
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

const terms = [
  "You keep ownership of everything you upload.",
  "We store your work until you delete it, then for thirty more days in backups.",
  "Exports are available at any time in CSV and JSON.",
  "Seats are billed monthly and downgrades apply at the next cycle.",
  "Support responds within one working day on Team plans.",
  "We never sell your data or use it to train anything.",
  "You can close your account from Settings without contacting us.",
  "Breaking changes to the API are announced ninety days ahead.",
]

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
      <Modal
        trigger="Read terms"
        title="Terms of service"
        description="The short version, in full."
        close="Accept"
      >
        <ul className="text-sm flex flex-col gap-3 text-fg-secondary">
          {terms.map((term) => (
            <li key={term}>{term}</li>
          ))}
        </ul>
      </Modal>
    </DocBand>
  </div>
)
