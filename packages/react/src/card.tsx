import { cva, type VariantProps } from "class-variance-authority"
import type { HTMLAttributes } from "react"
import { cn } from "./lib/cn"

const cardVariants = cva("flex flex-col rounded-xl bg-surface text-fg-primary", {
  variants: {
    variant: {
      elevated: "shadow-lg",
      outline: "border border-border-primary",
      ghost: "",
    },
    padding: {
      md: "gap-6 py-6",
      none: "",
    },
  },
  defaultVariants: {
    variant: "elevated",
    padding: "md",
  },
})

export type CardProps = HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof cardVariants>
export type CardHeaderProps = HTMLAttributes<HTMLDivElement>
export type CardTitleProps = HTMLAttributes<HTMLHeadingElement>
export type CardDescriptionProps = HTMLAttributes<HTMLParagraphElement>
export type CardActionProps = HTMLAttributes<HTMLDivElement>
export type CardContentProps = HTMLAttributes<HTMLDivElement>
export type CardFooterProps = HTMLAttributes<HTMLDivElement>

export const Card = ({ className, variant, padding, ...props }: CardProps) => (
  <div
    {...props}
    data-slot="card"
    className={cn(cardVariants({ variant, padding }), className)}
  />
)

export const CardHeader = ({ className, ...props }: CardHeaderProps) => (
  <div
    {...props}
    data-slot="card-header"
    className={cn(
      "grid auto-rows-min items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto]",
      className,
    )}
  />
)

export const CardTitle = ({ className, ...props }: CardTitleProps) => (
  <h3
    {...props}
    data-slot="card-title"
    className={cn("text-sm-strong leading-none text-fg-primary", className)}
  />
)

export const CardDescription = ({
  className,
  ...props
}: CardDescriptionProps) => (
  <p
    {...props}
    data-slot="card-description"
    className={cn("text-sm text-fg-secondary", className)}
  />
)

export const CardAction = ({ className, ...props }: CardActionProps) => (
  <div
    {...props}
    data-slot="card-action"
    className={cn(
      "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
      className,
    )}
  />
)

export const CardContent = ({ className, ...props }: CardContentProps) => (
  <div
    {...props}
    data-slot="card-content"
    className={cn("px-6", className)}
  />
)

export const CardFooter = ({ className, ...props }: CardFooterProps) => (
  <div
    {...props}
    data-slot="card-footer"
    className={cn("flex items-center gap-2 px-6", className)}
  />
)

export { cardVariants }
