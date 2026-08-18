"use client"

import { OTPField as BaseOTPField } from "@base-ui/react/otp-field"
import type { ComponentProps } from "react"
import { cn } from "./lib/cn"
import { motion } from "./lib/motion"

export type OTPFieldProps = ComponentProps<typeof BaseOTPField.Root>
export type OTPFieldInputProps = ComponentProps<typeof BaseOTPField.Input>
export type OTPFieldSeparatorProps = ComponentProps<typeof BaseOTPField.Separator>

export const OTPField = ({ className, ...props }: OTPFieldProps) => (
  <BaseOTPField.Root
    className={cn("flex items-center gap-2", className)}
    {...props}
  />
)

export const OTPFieldInput = ({ className, ...props }: OTPFieldInputProps) => (
  <BaseOTPField.Input
    className={cn(
      "size-10 rounded-md border border-border-secondary bg-surface text-center text-sm tabular-nums text-fg-primary inset-shadow-outline-top outline-none",
      motion.colors,
      "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-offset-1 focus-visible:ring-offset-background-primary focus-visible:ring-ring/20",
      "aria-invalid:border-destructive aria-invalid:focus-visible:border-destructive aria-invalid:focus-visible:ring-destructive/20",
      "data-disabled:cursor-not-allowed data-disabled:opacity-50",
      "data-filled:border-border-secondary",
      className,
    )}
    {...props}
  />
)

export const OTPFieldSeparator = ({
  className,
  ...props
}: OTPFieldSeparatorProps) => (
  <BaseOTPField.Separator
    className={cn(
      "mx-0.5 h-px w-3 shrink-0 self-center bg-border-secondary",
      className,
    )}
    {...props}
  />
)
