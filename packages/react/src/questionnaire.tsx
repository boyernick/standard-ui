"use client"

import { Questionnaire as BaseQuestionnaire } from "@shadcn/react/questionnaire"
import type { VariantProps } from "class-variance-authority"
import type { ComponentProps } from "react"
import { buttonVariants } from "./button"
import { inputVariants } from "./input"
import { cn } from "./lib/cn"

type StyledProps<T> = Omit<T, "className"> & { className?: string }

export type QuestionnaireProps = StyledProps<
  ComponentProps<typeof BaseQuestionnaire.Root>
>
export type QuestionnaireProgressProps = StyledProps<
  ComponentProps<typeof BaseQuestionnaire.Progress>
>
export type QuestionnaireItemProps = StyledProps<
  ComponentProps<typeof BaseQuestionnaire.Item>
>
export type QuestionnaireTitleProps = StyledProps<
  ComponentProps<typeof BaseQuestionnaire.Title>
>
export type QuestionnaireDescriptionProps = StyledProps<
  ComponentProps<typeof BaseQuestionnaire.Description>
>
export type QuestionnaireChoicesProps = StyledProps<
  ComponentProps<typeof BaseQuestionnaire.Choices>
>
export type QuestionnaireChoiceInputProps = StyledProps<
  ComponentProps<typeof BaseQuestionnaire.ChoiceInput>
>
export type QuestionnaireChoiceLabelProps = StyledProps<
  ComponentProps<typeof BaseQuestionnaire.ChoiceLabel>
>
export type QuestionnaireChoiceShortcutProps = StyledProps<
  ComponentProps<typeof BaseQuestionnaire.ChoiceShortcut>
>
export type QuestionnaireChoiceProps = StyledProps<
  ComponentProps<typeof BaseQuestionnaire.Choice>
> & {
  inputProps?: QuestionnaireChoiceInputProps
  labelProps?: QuestionnaireChoiceLabelProps
  shortcutProps?: QuestionnaireChoiceShortcutProps
}
export type QuestionnaireInputProps = StyledProps<
  Omit<ComponentProps<typeof BaseQuestionnaire.Input>, "size">
> &
  VariantProps<typeof inputVariants>
export type QuestionnaireErrorProps = StyledProps<
  ComponentProps<typeof BaseQuestionnaire.Error>
>
export type QuestionnaireActionsProps = ComponentProps<"div">

type QuestionnaireNavigationProps<T> = StyledProps<
  Omit<T, "size" | "variant">
> &
  VariantProps<typeof buttonVariants>

export type QuestionnairePreviousProps = QuestionnaireNavigationProps<
  ComponentProps<typeof BaseQuestionnaire.Previous>
>
export type QuestionnaireSkipProps = QuestionnaireNavigationProps<
  ComponentProps<typeof BaseQuestionnaire.Skip>
>
export type QuestionnaireNextProps = QuestionnaireNavigationProps<
  ComponentProps<typeof BaseQuestionnaire.Next>
>
export type QuestionnaireSubmitProps = QuestionnaireNavigationProps<
  ComponentProps<typeof BaseQuestionnaire.Submit>
>

export const Questionnaire = ({ className, ...props }: QuestionnaireProps) => (
  <BaseQuestionnaire.Root
    className={cn("flex w-full flex-col gap-6", className)}
    {...props}
  />
)

export const QuestionnaireProgress = ({
  className,
  ...props
}: QuestionnaireProgressProps) => (
  <BaseQuestionnaire.Progress
    className={cn("text-sm text-fg-secondary tabular-nums", className)}
    {...props}
  />
)

export const QuestionnaireItem = ({
  className,
  ...props
}: QuestionnaireItemProps) => (
  <BaseQuestionnaire.Item
    className={cn(
      "m-0 min-w-0 border-0 p-0 outline-none focus-visible:ring-[3px] focus-visible:ring-ring/20",
      className,
    )}
    {...props}
  />
)

export const QuestionnaireTitle = ({
  className,
  ...props
}: QuestionnaireTitleProps) => (
  <BaseQuestionnaire.Title
    className={cn("heading-sm text-fg-primary", className)}
    {...props}
  />
)

export const QuestionnaireDescription = ({
  className,
  ...props
}: QuestionnaireDescriptionProps) => (
  <BaseQuestionnaire.Description
    className={cn("text-sm mt-1 text-fg-secondary", className)}
    {...props}
  />
)

export const QuestionnaireChoices = ({
  className,
  ...props
}: QuestionnaireChoicesProps) => (
  <BaseQuestionnaire.Choices
    className={cn("mt-5 grid gap-2", className)}
    {...props}
  />
)

export const QuestionnaireChoiceInput = ({
  className,
  ...props
}: QuestionnaireChoiceInputProps) => (
  <BaseQuestionnaire.ChoiceInput
    className={cn(
      "mt-0.5 size-4 shrink-0 cursor-pointer accent-brand-primary outline-none focus-visible:ring-[3px] focus-visible:ring-ring/20 disabled:cursor-not-allowed",
      className,
    )}
    {...props}
  />
)

export const QuestionnaireChoiceLabel = ({
  className,
  ...props
}: QuestionnaireChoiceLabelProps) => (
  <BaseQuestionnaire.ChoiceLabel
    className={cn("text-sm min-w-0 text-fg-primary", className)}
    {...props}
  />
)

export const QuestionnaireChoiceShortcut = ({
  className,
  ...props
}: QuestionnaireChoiceShortcutProps) => (
  <BaseQuestionnaire.ChoiceShortcut
    className={cn(
      "text-xs flex min-w-5 items-center justify-center rounded border border-border-secondary bg-background-secondary px-1 py-0.5 text-fg-tertiary",
      className,
    )}
    {...props}
  />
)

export const QuestionnaireChoice = ({
  className,
  children,
  inputProps,
  labelProps,
  shortcutProps,
  ...props
}: QuestionnaireChoiceProps) => (
  <BaseQuestionnaire.Choice
    className={cn(
      "group grid cursor-pointer grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-3 rounded-lg border border-border-secondary bg-surface px-3.5 py-3 text-fg-primary outline-none transition-[background-color,border-color,box-shadow] duration-[var(--duration-sm)] ease-enter hover:bg-background-secondary has-[:focus-visible]:border-ring has-[:focus-visible]:ring-[3px] has-[:focus-visible]:ring-ring/20 data-checked:border-brand-primary data-checked:bg-background-secondary data-disabled:cursor-not-allowed data-disabled:opacity-50",
      className,
    )}
    {...props}
  >
    <QuestionnaireChoiceInput {...inputProps} />
    <QuestionnaireChoiceLabel {...labelProps}>
      {children}
    </QuestionnaireChoiceLabel>
    <QuestionnaireChoiceShortcut {...shortcutProps} />
  </BaseQuestionnaire.Choice>
)

export const QuestionnaireInput = ({
  className,
  variant,
  size,
  invalid,
  ...props
}: QuestionnaireInputProps) => (
  <BaseQuestionnaire.Input
    className={cn(inputVariants({ variant, size, invalid }), "mt-5", className)}
    {...props}
  />
)

export const QuestionnaireError = ({
  className,
  ...props
}: QuestionnaireErrorProps) => (
  <BaseQuestionnaire.Error
    className={cn("text-sm mt-2 text-destructive", className)}
    {...props}
  />
)

export const QuestionnaireActions = ({
  className,
  ...props
}: QuestionnaireActionsProps) => (
  <div
    className={cn("flex min-h-9 items-center justify-end gap-2", className)}
    {...props}
  />
)

export const QuestionnairePrevious = ({
  className,
  variant = "outline",
  size,
  ...props
}: QuestionnairePreviousProps) => (
  <BaseQuestionnaire.Previous
    className={cn(buttonVariants({ variant, size }), "mr-auto", className)}
    {...props}
  />
)

export const QuestionnaireSkip = ({
  className,
  variant = "ghost",
  size,
  ...props
}: QuestionnaireSkipProps) => (
  <BaseQuestionnaire.Skip
    className={cn(buttonVariants({ variant, size }), className)}
    {...props}
  />
)

export const QuestionnaireNext = ({
  className,
  variant = "primary",
  size,
  ...props
}: QuestionnaireNextProps) => (
  <BaseQuestionnaire.Next
    className={cn(buttonVariants({ variant, size }), className)}
    {...props}
  />
)

export const QuestionnaireSubmit = ({
  className,
  variant = "primary",
  size,
  ...props
}: QuestionnaireSubmitProps) => (
  <BaseQuestionnaire.Submit
    className={cn(buttonVariants({ variant, size }), className)}
    {...props}
  />
)

export type {
  QuestionnaireChoiceDefinition,
  QuestionnaireInputType,
  QuestionnaireItemDefinition,
  QuestionnaireItemStatus,
  QuestionnaireShortcutMode,
} from "@shadcn/react/questionnaire"
