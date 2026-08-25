"use client"

import {
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
} from "react"
import { Button } from "./button"
import {
  Dialog,
  DialogBackdrop,
  DialogClose,
  DialogDescription,
  DialogHeader,
  DialogPopup,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "./dialog"
import {
  Field,
  FieldControl,
  FieldError,
  FieldLabel,
} from "./field"
import { Form } from "./form"
import { cn } from "./lib/cn"

export type PasswordProtectionVerify = (
  password: string,
) => boolean | Promise<boolean>

type PasswordProtectionSharedProps = {
  /** Returns true when the entered password unlocks access. */
  verify: PasswordProtectionVerify
  title?: ReactNode
  description?: ReactNode
  submitLabel?: string
  cancelLabel?: string
  passwordLabel?: string
  passwordPlaceholder?: string
  /** Shown when `verify` returns false. */
  errorMessage?: string
  onUnlock?: () => void
  className?: string
}

export type PasswordProtectionProps = PasswordProtectionSharedProps & {
  children: ReactNode
  /** Controlled unlocked state. */
  unlocked?: boolean
  defaultUnlocked?: boolean
  onUnlockedChange?: (unlocked: boolean) => void
  /** Show a cancel action that dismisses without unlocking. @default true */
  cancelable?: boolean
  /** Called when the visitor dismisses without unlocking. */
  onCancel?: () => void
}

export type PasswordProtectionDialogProps = PasswordProtectionSharedProps & {
  /** Element rendered as the dialog trigger (`render` target). */
  trigger: ReactElement
  /** Label rendered inside the trigger. */
  children: ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  /** Show a cancel action that closes without unlocking. @default true */
  cancelable?: boolean
}

const DEFAULT_TITLE = "This content is protected"
const DEFAULT_DESCRIPTION = "Enter password to continue"
const DEFAULT_SUBMIT = "Continue"
const DEFAULT_CANCEL = "Cancel"
const DEFAULT_PASSWORD_LABEL = "Password"
const DEFAULT_ERROR = "Incorrect password"
const DEFAULT_EMPTY = "Enter a password."

const passwordBackdropClassName = "bg-black/55 dark:bg-black/75"
const passwordPopupClassName = "gap-4"

type PasswordFormProps = Omit<PasswordProtectionSharedProps, "onUnlock"> & {
  onSuccess: () => void
  cancelable?: boolean
  /** Prefer this over DialogClose when the dialog is force-open (gate). */
  onCancel?: () => void
}

const PasswordForm = ({
  verify,
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  submitLabel = DEFAULT_SUBMIT,
  cancelLabel = DEFAULT_CANCEL,
  passwordLabel = DEFAULT_PASSWORD_LABEL,
  passwordPlaceholder,
  errorMessage = DEFAULT_ERROR,
  onSuccess,
  cancelable = false,
  onCancel,
  className,
}: PasswordFormProps) => {
  const [errors, setErrors] = useState<Record<string, string | string[]>>({})
  const [pending, setPending] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (values: Record<string, unknown>) => {
    const password = String(values.password ?? "")
    setErrors({})

    if (!password.trim()) {
      setErrors({ password: DEFAULT_EMPTY })
      queueMicrotask(() => inputRef.current?.focus())
      return
    }

    setPending(true)

    const finish = (ok: boolean) => {
      if (!ok) {
        setErrors({ password: errorMessage })
        setPending(false)
        queueMicrotask(() => inputRef.current?.select())
        return
      }
      setPending(false)
      onSuccess()
    }

    try {
      const result = verify(password)
      if (result instanceof Promise) {
        void result.then(finish).catch(() => finish(false))
        return
      }
      finish(result)
    } catch {
      finish(false)
    }
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        {description ? (
          <DialogDescription>{description}</DialogDescription>
        ) : null}
      </DialogHeader>
      <Form
        errors={errors}
        onFormSubmit={handleSubmit}
        className={cn("gap-4", className)}
      >
        <Field name="password">
          <FieldLabel>{passwordLabel}</FieldLabel>
          <FieldControl
            ref={inputRef}
            type="password"
            name="password"
            autoComplete="current-password"
            autoFocus
            placeholder={passwordPlaceholder}
            disabled={pending}
            aria-invalid={errors.password ? true : undefined}
          />
          <FieldError />
        </Field>
        <div className="flex justify-end gap-2">
          {cancelable ? (
            onCancel ? (
              <Button
                type="button"
                variant="outline"
                disabled={pending}
                onClick={onCancel}
              >
                {cancelLabel}
              </Button>
            ) : (
              <DialogClose
                render={
                  <Button type="button" variant="outline" disabled={pending} />
                }
              >
                {cancelLabel}
              </DialogClose>
            )
          ) : null}
          <Button type="submit" disabled={pending}>
            {pending ? "Checking…" : submitLabel}
          </Button>
        </div>
      </Form>
    </>
  )
}

/**
 * Gates children behind a password dialog. The dialog stays open until
 * `verify` succeeds — soft client-side protection for private links and pages.
 */
export const PasswordProtection = ({
  verify,
  children,
  unlocked: unlockedProp,
  defaultUnlocked = false,
  onUnlockedChange,
  onUnlock,
  onCancel,
  cancelable = true,
  title,
  description,
  submitLabel,
  cancelLabel,
  passwordLabel,
  passwordPlaceholder,
  errorMessage,
  className,
}: PasswordProtectionProps) => {
  const [unlockedState, setUnlockedState] = useState(defaultUnlocked)
  const [dismissed, setDismissed] = useState(false)
  const unlocked = unlockedProp ?? unlockedState

  const setUnlocked = (next: boolean) => {
    if (unlockedProp === undefined) setUnlockedState(next)
    onUnlockedChange?.(next)
  }

  const handleSuccess = () => {
    setDismissed(false)
    setUnlocked(true)
    onUnlock?.()
  }

  const handleCancel = () => {
    setDismissed(true)
    onCancel?.()
  }

  if (unlocked) return <>{children}</>
  if (dismissed) return null

  return (
    <Dialog
      open
      disablePointerDismissal={!cancelable}
      onOpenChange={(open) => {
        if (open) return
        if (!cancelable) return
        handleCancel()
      }}
    >
      <DialogPortal>
        <DialogBackdrop className={passwordBackdropClassName} />
        <DialogPopup
          data-slot="password-protection"
          className={cn(passwordPopupClassName, className)}
        >
          <PasswordForm
            verify={verify}
            title={title}
            description={description}
            submitLabel={submitLabel}
            cancelLabel={cancelLabel}
            passwordLabel={passwordLabel}
            passwordPlaceholder={passwordPlaceholder}
            errorMessage={errorMessage}
            cancelable={cancelable}
            onCancel={cancelable ? handleCancel : undefined}
            onSuccess={handleSuccess}
          />
        </DialogPopup>
      </DialogPortal>
    </Dialog>
  )
}

/**
 * Opens a password dialog from a trigger — for gated links that unlock a
 * navigation or reveal after a successful check.
 */
export const PasswordProtectionDialog = ({
  verify,
  trigger,
  children,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  onUnlock,
  title,
  description,
  submitLabel,
  cancelLabel,
  passwordLabel,
  passwordPlaceholder,
  errorMessage,
  cancelable = true,
  className,
}: PasswordProtectionDialogProps) => {
  const [openState, setOpenState] = useState(defaultOpen)
  const open = openProp ?? openState

  const setOpen = (next: boolean) => {
    if (openProp === undefined) setOpenState(next)
    onOpenChange?.(next)
  }

  const handleSuccess = () => {
    setOpen(false)
    onUnlock?.()
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
      disablePointerDismissal={!cancelable}
    >
      <DialogTrigger render={trigger}>{children}</DialogTrigger>
      <DialogPortal>
        <DialogBackdrop className={passwordBackdropClassName} />
        <DialogPopup
          data-slot="password-protection-dialog"
          className={cn(passwordPopupClassName, className)}
        >
          <PasswordForm
            verify={verify}
            title={title}
            description={description}
            submitLabel={submitLabel}
            cancelLabel={cancelLabel}
            passwordLabel={passwordLabel}
            passwordPlaceholder={passwordPlaceholder}
            errorMessage={errorMessage}
            cancelable={cancelable}
            onSuccess={handleSuccess}
          />
        </DialogPopup>
      </DialogPortal>
    </Dialog>
  )
}
