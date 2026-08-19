"use client"

import { Avatar as BaseAvatar } from "@base-ui/react/avatar"
import { cva, type VariantProps } from "class-variance-authority"
import type { ComponentProps } from "react"
import { cn } from "./lib/cn"

const avatarVariants = cva(
  "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-background-tertiary text-fg-primary align-middle shadow-hairline select-none",
  {
    variants: {
      size: {
        sm: "size-8 text-xs",
        md: "size-10 text-xs-strong",
        lg: "size-12 text-sm",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
)

export type AvatarProps = ComponentProps<typeof BaseAvatar.Root> &
  VariantProps<typeof avatarVariants>
export type AvatarImageProps = ComponentProps<typeof BaseAvatar.Image>
export type AvatarFallbackProps = ComponentProps<typeof BaseAvatar.Fallback>

export const Avatar = ({ className, size, ...props }: AvatarProps) => (
  <BaseAvatar.Root
    className={cn(avatarVariants({ size }), className)}
    {...props}
  />
)

export const AvatarImage = ({ className, ...props }: AvatarImageProps) => (
  <BaseAvatar.Image
    className={cn("size-full object-cover", className)}
    {...props}
  />
)

export const AvatarFallback = ({
  className,
  ...props
}: AvatarFallbackProps) => (
  <BaseAvatar.Fallback
    className={cn(
      "flex size-full items-center justify-center bg-background-tertiary tracking-tight text-inherit",
      className,
    )}
    {...props}
  />
)

export { avatarVariants }
