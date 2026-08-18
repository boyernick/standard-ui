import type { HTMLAttributes } from "react"
import { cn } from "./lib/cn"

export type CardProps = HTMLAttributes<HTMLDivElement>
export type CardHeaderProps = HTMLAttributes<HTMLDivElement>
export type CardTitleProps = HTMLAttributes<HTMLHeadingElement>
export type CardDescriptionProps = HTMLAttributes<HTMLParagraphElement>
export type CardContentProps = HTMLAttributes<HTMLDivElement>
export type CardFooterProps = HTMLAttributes<HTMLDivElement>

export const Card = ({ className, ...props }: CardProps) => (
  <div
    className={cn(
      "flex flex-col overflow-hidden rounded-xl border border-border-primary bg-surface",
      className,
    )}
    {...props}
  />
)

export const CardHeader = ({ className, ...props }: CardHeaderProps) => (
  <div
    className={cn("flex flex-col gap-1 px-5 pt-5 pb-3", className)}
    {...props}
  />
)

export const CardTitle = ({ className, ...props }: CardTitleProps) => (
  <h3 className={cn("text-sm-strong text-fg-primary", className)} {...props} />
)

export const CardDescription = ({
  className,
  ...props
}: CardDescriptionProps) => (
  <p
    className={cn("text-sm leading-relaxed text-fg-secondary", className)}
    {...props}
  />
)

export const CardContent = ({ className, ...props }: CardContentProps) => (
  <div className={cn("px-5 pb-5", className)} {...props} />
)

export const CardFooter = ({ className, ...props }: CardFooterProps) => (
  <div
    className={cn(
      "flex items-center gap-2 border-t border-border-primary px-5 py-4",
      className,
    )}
    {...props}
  />
)
