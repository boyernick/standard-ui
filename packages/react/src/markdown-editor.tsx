"use client"

import {
  createContext,
  forwardRef,
  useContext,
  useRef,
  useState,
  type ChangeEvent,
  type ComponentPropsWithoutRef,
  type HTMLAttributes,
  type ReactNode,
  type Ref,
  type TextareaHTMLAttributes,
} from "react"
import { cn } from "./lib/cn"
import { textareaVariants } from "./textarea"
import { Toggle } from "./toggle"
import { Toolbar } from "./toolbar"

type MarkdownEditorContextValue = {
  value: string
  setValue: (value: string) => void
  inputRef: React.RefObject<HTMLTextAreaElement | null>
  selection: { start: number; end: number }
  setSelection: (selection: { start: number; end: number }) => void
}

const MarkdownEditorContext = createContext<MarkdownEditorContextValue | null>(
  null,
)

const useMarkdownEditor = () => {
  const context = useContext(MarkdownEditorContext)

  if (!context) {
    throw new Error(
      "MarkdownEditor parts must be rendered inside MarkdownEditor",
    )
  }

  return context
}

const assignRef = <Value,>(ref: Ref<Value> | undefined, value: Value) => {
  if (typeof ref === "function") {
    ref(value)
    return
  }

  if (ref) ref.current = value
}

export type MarkdownEditorProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  "onChange"
> & {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
}

export const MarkdownEditor = ({
  value: controlledValue,
  defaultValue = "",
  onValueChange,
  className,
  children,
  ...props
}: MarkdownEditorProps) => {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue)
  const [selection, setSelection] = useState({ start: 0, end: 0 })
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const value = controlledValue ?? uncontrolledValue

  const setValue = (nextValue: string) => {
    if (controlledValue === undefined) setUncontrolledValue(nextValue)
    onValueChange?.(nextValue)
  }

  return (
    <MarkdownEditorContext.Provider
      value={{
        value,
        setValue,
        inputRef,
        selection,
        setSelection,
      }}
    >
      <div
        className={cn(
          "overflow-hidden rounded-xl border border-border-primary bg-surface",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </MarkdownEditorContext.Provider>
  )
}

type Format = {
  label: string
  marker: "*" | "**" | "`"
  className?: string
}

const formats: Format[] = [
  { label: "Bold", marker: "**", className: "font-medium" },
  { label: "Italic", marker: "*", className: "italic" },
  { label: "Code", marker: "`", className: "font-mono" },
]

export type MarkdownEditorToolbarProps = ComponentPropsWithoutRef<
  typeof Toolbar
>

export const MarkdownEditorToolbar = ({
  className,
  children,
  ...props
}: MarkdownEditorToolbarProps) => {
  const { value, setValue, inputRef, selection, setSelection } =
    useMarkdownEditor()

  const isFormatActive = (marker: Format["marker"]) => {
    const { start, end } = selection
    return (
      value.slice(start - marker.length, start) === marker &&
      value.slice(end, end + marker.length) === marker
    )
  }

  const handleFormat = (marker: Format["marker"]) => {
    const input = inputRef.current

    if (!input) return

    const start = input.selectionStart
    const end = input.selectionEnd
    const selectedText = value.slice(start, end)
    const isWrapped =
      value.slice(start - marker.length, start) === marker &&
      value.slice(end, end + marker.length) === marker

    if (isWrapped) {
      const nextValue =
        value.slice(0, start - marker.length) +
        selectedText +
        value.slice(end + marker.length)

      setValue(nextValue)
      requestAnimationFrame(() => {
        input.focus()
        input.setSelectionRange(start - marker.length, end - marker.length)
        setSelection({
          start: start - marker.length,
          end: end - marker.length,
        })
      })
      return
    }

    const nextValue =
      value.slice(0, start) +
      marker +
      selectedText +
      marker +
      value.slice(end)

    setValue(nextValue)
    requestAnimationFrame(() => {
      const selectionStart = start + marker.length
      input.focus()
      input.setSelectionRange(selectionStart, selectionStart + selectedText.length)
      setSelection({
        start: selectionStart,
        end: selectionStart + selectedText.length,
      })
    })
  }

  return (
    <Toolbar
      aria-label="Text formatting"
      className={cn(
        "flex w-full rounded-none border-0 border-b border-border-primary px-2 py-1",
        className,
      )}
      {...props}
    >
      {children ??
        formats.map((format) => (
          <Toggle
            key={format.label}
            aria-label={format.label}
            pressed={isFormatActive(format.marker)}
            onPressedChange={() => handleFormat(format.marker)}
            className={format.className}
          >
            {format.label}
          </Toggle>
        ))}
    </Toolbar>
  )
}

export type MarkdownEditorInputProps = TextareaHTMLAttributes<HTMLTextAreaElement>

export const MarkdownEditorInput = forwardRef<
  HTMLTextAreaElement,
  MarkdownEditorInputProps
>(({ className, onChange, onSelect, ...props }, forwardedRef) => {
  const { value, setValue, inputRef, setSelection } = useMarkdownEditor()

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value)
    onChange?.(event)
  }

  return (
    <textarea
      ref={(node) => {
        inputRef.current = node
        assignRef(forwardedRef, node)
      }}
      value={value}
      className={cn(
        textareaVariants({ variant: "ghost" }),
        "min-h-56 resize-y rounded-none border-0 p-4 font-mono text-sm focus-visible:ring-0",
        className,
      )}
      onChange={handleChange}
      onSelect={(event) => {
        setSelection({
          start: event.currentTarget.selectionStart,
          end: event.currentTarget.selectionEnd,
        })
        onSelect?.(event)
      }}
      {...props}
    />
  )
})

MarkdownEditorInput.displayName = "MarkdownEditorInput"

const renderBasicMarkdown = (value: string): ReactNode[] =>
  value
    .split(/(\*\*[^*\n]+\*\*|`[^`\n]+`|\*[^*\n]+\*)/g)
    .map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={index}>{part.slice(2, -2)}</strong>
      }

      if (part.startsWith("`") && part.endsWith("`")) {
        return (
          <code
            key={index}
            className="rounded-xs bg-background-tertiary px-1 py-0.5 font-mono text-sm"
          >
            {part.slice(1, -1)}
          </code>
        )
      }

      if (part.startsWith("*") && part.endsWith("*")) {
        return <em key={index}>{part.slice(1, -1)}</em>
      }

      return part
    })

export type MarkdownEditorPreviewProps = HTMLAttributes<HTMLDivElement> & {
  emptyText?: string
}

export const MarkdownEditorPreview = ({
  className,
  emptyText = "Nothing to preview",
  ...props
}: MarkdownEditorPreviewProps) => {
  const { value } = useMarkdownEditor()

  return (
    <div
      className={cn(
        "min-h-56 whitespace-pre-wrap border-t border-border-primary p-4 text-sm text-fg-primary",
        className,
      )}
      {...props}
    >
      {value ? (
        renderBasicMarkdown(value)
      ) : (
        <span className="text-fg-quaternary">{emptyText}</span>
      )}
    </div>
  )
}
