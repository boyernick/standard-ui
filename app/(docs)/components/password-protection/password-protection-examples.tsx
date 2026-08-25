"use client"

import {
  Button,
  PasswordProtection,
  PasswordProtectionDialog,
} from "@boyernick/standard-ui-react"
import { useState } from "react"
import { DocBand } from "@/components/doc-band"

const DEMO_PASSWORD = "standard"

const verifyDemo = (password: string) =>
  password.trim().toLowerCase() === DEMO_PASSWORD

const DialogSpecimen = () => {
  const [revealed, setRevealed] = useState(false)

  return (
    <div className="flex flex-col items-start gap-4">
      <PasswordProtectionDialog
        verify={verifyDemo}
        title="Private project"
        description="Enter password to continue"
        onUnlock={() => setRevealed(true)}
        trigger={<Button />}
      >
        View case study
      </PasswordProtectionDialog>
      {revealed ? (
        <p className="text-sm text-fg-secondary">
          Unlocked. On a live site this would navigate or reveal the link
          target.
        </p>
      ) : null}
    </div>
  )
}

const GateSpecimen = () => {
  const [unlocked, setUnlocked] = useState(false)
  const [started, setStarted] = useState(false)

  if (unlocked) {
    return (
      <div className="flex flex-col items-start gap-3 rounded-xl border border-border-primary bg-surface p-5">
        <p className="text-sm text-fg-primary">
          Unlocked content for the private page.
        </p>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => {
            setUnlocked(false)
            setStarted(false)
          }}
        >
          Lock again
        </Button>
      </div>
    )
  }

  if (!started) {
    return (
      <div className="flex flex-col items-start gap-3">
        <Button type="button" onClick={() => setStarted(true)}>
          Try gate
        </Button>
      </div>
    )
  }

  return (
    <PasswordProtection
      verify={verifyDemo}
      title="Private page"
      description="Enter password to continue"
      onUnlock={() => setUnlocked(true)}
      onCancel={() => setStarted(false)}
    >
      {null}
    </PasswordProtection>
  )
}

export const PasswordProtectionExamples = () => (
  <div>
    <DocBand
      first
      id="dialog"
      title="Dialog"
      description={`Open from a link or button, then continue after a successful check. Demo password: ${DEMO_PASSWORD}.`}
    >
      <DialogSpecimen />
    </DocBand>

    <DocBand
      id="gate"
      title="Gate"
      description={`Keep the page locked until the password is accepted. Demo password: ${DEMO_PASSWORD}.`}
    >
      <GateSpecimen />
    </DocBand>
  </div>
)
