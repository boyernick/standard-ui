"use client"

import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type HTMLAttributes,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react"
import { Checkbox } from "./checkbox"
import { cn } from "./lib/cn"
import { motion } from "./lib/motion"

export type BlockEditorBlockType =
  | "text"
  | "heading1"
  | "heading2"
  | "heading3"
  | "divider"
  | "checklist"
  | "numbered"
  | "bulleted"

export type BlockEditorBlock = {
  id: string
  type: BlockEditorBlockType
  content: string
  checked?: boolean
}

type SlashCommand = {
  type: BlockEditorBlockType
  label: string
  description: string
  keywords: string[]
}

const SLASH_COMMANDS: SlashCommand[] = [
  {
    type: "text",
    label: "Text",
    description: "Plain paragraph",
    keywords: ["text", "paragraph", "body"],
  },
  {
    type: "heading1",
    label: "Heading 1",
    description: "Large section title",
    keywords: ["heading", "h1", "title"],
  },
  {
    type: "heading2",
    label: "Heading 2",
    description: "Medium section title",
    keywords: ["heading", "h2", "subtitle"],
  },
  {
    type: "heading3",
    label: "Heading 3",
    description: "Small section title",
    keywords: ["heading", "h3"],
  },
  {
    type: "divider",
    label: "Divider",
    description: "Horizontal rule",
    keywords: ["divider", "separator", "line", "hr"],
  },
  {
    type: "checklist",
    label: "Checklist",
    description: "To-do with a checkbox",
    keywords: ["checklist", "todo", "task", "checkbox"],
  },
  {
    type: "numbered",
    label: "Numbered list",
    description: "Ordered list item",
    keywords: ["numbered", "ordered", "ol", "list"],
  },
  {
    type: "bulleted",
    label: "Bulleted list",
    description: "Unordered list item",
    keywords: ["bulleted", "bullet", "ul", "list"],
  },
]

const createId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `block-${Math.random().toString(36).slice(2, 10)}`

export const createBlockEditorBlock = (
  type: BlockEditorBlockType = "text",
  content = "",
): BlockEditorBlock => ({
  id: createId(),
  type,
  content,
  checked: type === "checklist" ? false : undefined,
})

export const defaultBlockEditorBlocks: BlockEditorBlock[] = [
  {
    id: "demo-h1",
    type: "heading1",
    content: "Lorem ipsum dolor sit amet",
  },
  {
    id: "demo-h2",
    type: "heading2",
    content: "Consectetur adipiscing elit",
  },
  {
    id: "demo-h3",
    type: "heading3",
    content: "Sed do eiusmod tempor",
  },
  { id: "demo-divider", type: "divider", content: "" },
  {
    id: "demo-p1",
    type: "text",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    id: "demo-p2",
    type: "text",
    content:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    id: "demo-check-1",
    type: "checklist",
    content: "Review the opening section",
    checked: false,
  },
  {
    id: "demo-check-2",
    type: "checklist",
    content: "Tighten the supporting copy",
    checked: false,
  },
  {
    id: "demo-num-1",
    type: "numbered",
    content: "Gather source material",
  },
  {
    id: "demo-num-2",
    type: "numbered",
    content: "Draft the first pass",
  },
  {
    id: "demo-num-3",
    type: "numbered",
    content: "Share for review",
  },
  {
    id: "demo-bullet-1",
    type: "bulleted",
    content: "Keep sentences short",
  },
  {
    id: "demo-bullet-2",
    type: "bulleted",
    content: "Prefer concrete verbs",
  },
  {
    id: "demo-bullet-3",
    type: "bulleted",
    content: "Cut anything that repeats",
  },
]

const blockTextClassName: Record<
  Exclude<BlockEditorBlockType, "divider">,
  string
> = {
  text: "text-base leading-7 text-fg-primary",
  heading1: "heading-2xl-serif text-fg-primary",
  heading2: "heading-xl text-fg-primary",
  heading3: "heading-md text-fg-primary",
  checklist: "text-base leading-7 text-fg-primary",
  numbered: "text-base leading-7 text-fg-primary",
  bulleted: "text-base leading-7 text-fg-primary",
}

const placeholderFor = (type: BlockEditorBlockType) => {
  switch (type) {
    case "heading1":
      return "Heading 1"
    case "heading2":
      return "Heading 2"
    case "heading3":
      return "Heading 3"
    case "checklist":
      return "To-do"
    case "numbered":
    case "bulleted":
      return "List item"
    case "divider":
      return ""
    default:
      return "Type '/' for commands"
  }
}

const filterCommands = (query: string) => {
  const normalized = query.trim().toLowerCase()
  if (!normalized) return SLASH_COMMANDS
  return SLASH_COMMANDS.filter(
    (command) =>
      command.label.toLowerCase().includes(normalized) ||
      command.description.toLowerCase().includes(normalized) ||
      command.keywords.some((keyword) => keyword.includes(normalized)),
  )
}

const numberedIndex = (blocks: BlockEditorBlock[], index: number) => {
  let count = 0
  for (let i = 0; i <= index; i += 1) {
    if (blocks[i]?.type === "numbered") count += 1
    else if (i < index) count = 0
  }
  return count
}

const AutoGrowField = ({
  value,
  onValueChange,
  onKeyDown,
  onFocus,
  className,
  placeholder,
  id,
}: {
  id: string
  value: string
  onValueChange: (value: string) => void
  onKeyDown: (event: ReactKeyboardEvent<HTMLTextAreaElement>) => void
  onFocus: () => void
  className?: string
  placeholder?: string
}) => {
  const ref = useRef<HTMLTextAreaElement>(null)

  useLayoutEffect(() => {
    const node = ref.current
    if (!node) return
    node.style.height = "0px"
    node.style.height = `${Math.max(node.scrollHeight, 28)}px`
  }, [value])

  return (
    <textarea
      ref={ref}
      id={id}
      rows={1}
      value={value}
      placeholder={placeholder}
      aria-label={placeholder}
      className={cn(
        "field-sizing-content w-full grow resize-none bg-transparent outline-none placeholder:text-fg-quaternary",
        className,
      )}
      onChange={(event) => onValueChange(event.target.value)}
      onKeyDown={onKeyDown}
      onFocus={onFocus}
    />
  )
}

export type BlockEditorProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  "children" | "onChange"
> & {
  blocks?: BlockEditorBlock[]
  defaultBlocks?: BlockEditorBlock[]
  onBlocksChange?: (blocks: BlockEditorBlock[]) => void
}

export const BlockEditor = ({
  blocks: controlledBlocks,
  defaultBlocks = defaultBlockEditorBlocks,
  onBlocksChange,
  className,
  ...props
}: BlockEditorProps) => {
  const [uncontrolledBlocks, setUncontrolledBlocks] = useState(defaultBlocks)
  const blocks = controlledBlocks ?? uncontrolledBlocks
  const [activeId, setActiveId] = useState<string | null>(
    defaultBlocks[0]?.id ?? null,
  )
  const [slash, setSlash] = useState<{
    blockId: string
    query: string
    index: number
  } | null>(null)
  const editorRef = useRef<HTMLDivElement>(null)
  const listboxId = useId()

  const setBlocks = useCallback(
    (next: BlockEditorBlock[] | ((current: BlockEditorBlock[]) => BlockEditorBlock[])) => {
      const resolved = typeof next === "function" ? next(blocks) : next
      if (controlledBlocks === undefined) setUncontrolledBlocks(resolved)
      onBlocksChange?.(resolved)
    },
    [blocks, controlledBlocks, onBlocksChange],
  )

  const focusBlock = useCallback((id: string) => {
    requestAnimationFrame(() => {
      const node = editorRef.current?.querySelector<HTMLTextAreaElement>(
        `#block-${CSS.escape(id)}`,
      )
      node?.focus()
      if (node) {
        const length = node.value.length
        node.setSelectionRange(length, length)
      }
    })
  }, [])

  const updateBlock = useCallback(
    (id: string, patch: Partial<BlockEditorBlock>) => {
      setBlocks((current) =>
        current.map((block) =>
          block.id === id ? { ...block, ...patch } : block,
        ),
      )
    },
    [setBlocks],
  )

  const insertBlockAfter = useCallback(
    (id: string, type: BlockEditorBlockType = "text") => {
      const next = createBlockEditorBlock(type)
      setBlocks((current) => {
        const index = current.findIndex((block) => block.id === id)
        if (index === -1) return [...current, next]
        const copy = [...current]
        copy.splice(index + 1, 0, next)
        return copy
      })
      setActiveId(next.id)
      focusBlock(next.id)
      return next.id
    },
    [focusBlock, setBlocks],
  )

  const removeBlock = useCallback(
    (id: string) => {
      setBlocks((current) => {
        if (current.length <= 1) {
          const alone = createBlockEditorBlock("text")
          setActiveId(alone.id)
          focusBlock(alone.id)
          return [alone]
        }
        const index = current.findIndex((block) => block.id === id)
        if (index === -1) return current
        const copy = current.filter((block) => block.id !== id)
        const focusId = copy[Math.max(0, index - 1)]?.id ?? copy[0]?.id
        if (focusId) {
          setActiveId(focusId)
          focusBlock(focusId)
        }
        return copy
      })
    },
    [focusBlock, setBlocks],
  )

  const applySlashCommand = useCallback(
    (blockId: string, type: BlockEditorBlockType, query: string) => {
      const block = blocks.find((item) => item.id === blockId)
      if (!block) return

      const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
      const contentWithoutSlash = block.content
        .replace(new RegExp(`/${escaped}$`), "")
        .trimEnd()

      if (type === "divider") {
        setBlocks((current) => {
          const index = current.findIndex((item) => item.id === blockId)
          if (index === -1) return current
          const copy = [...current]
          copy[index] = {
            ...copy[index]!,
            type: "divider",
            content: "",
            checked: undefined,
          }
          const trailing = createBlockEditorBlock("text")
          copy.splice(index + 1, 0, trailing)
          setActiveId(trailing.id)
          focusBlock(trailing.id)
          return copy
        })
      } else {
        updateBlock(blockId, {
          type,
          content: contentWithoutSlash,
          checked: type === "checklist" ? false : undefined,
        })
        focusBlock(blockId)
      }

      setSlash(null)
    },
    [blocks, focusBlock, setBlocks, updateBlock],
  )

  const openCommands = slash ? filterCommands(slash.query) : []

  useEffect(() => {
    if (!slash) return
    const handlePointer = (event: MouseEvent) => {
      if (!(event.target instanceof Node)) return
      if (editorRef.current?.contains(event.target)) return
      setSlash(null)
    }
    document.addEventListener("mousedown", handlePointer)
    return () => document.removeEventListener("mousedown", handlePointer)
  }, [slash])

  const handleBlockInput = (block: BlockEditorBlock, text: string) => {
    updateBlock(block.id, { content: text })

    const slashMatch = text.match(/(?:^|\s)\/([^\n]*)$/)
    if (slashMatch) {
      setSlash({
        blockId: block.id,
        query: slashMatch[1] ?? "",
        index: 0,
      })
      return
    }

    if (slash?.blockId === block.id) setSlash(null)
  }

  const handleBlockKeyDown = (
    event: ReactKeyboardEvent<HTMLTextAreaElement>,
    block: BlockEditorBlock,
    index: number,
  ) => {
    if (slash?.blockId === block.id && openCommands.length > 0) {
      if (event.key === "ArrowDown") {
        event.preventDefault()
        setSlash((current) =>
          current
            ? {
                ...current,
                index: (current.index + 1) % openCommands.length,
              }
            : current,
        )
        return
      }
      if (event.key === "ArrowUp") {
        event.preventDefault()
        setSlash((current) =>
          current
            ? {
                ...current,
                index:
                  (current.index - 1 + openCommands.length) %
                  openCommands.length,
              }
            : current,
        )
        return
      }
      if (event.key === "Enter" || event.key === "Tab") {
        event.preventDefault()
        const command = openCommands[slash.index] ?? openCommands[0]
        if (command) applySlashCommand(block.id, command.type, slash.query)
        return
      }
      if (event.key === "Escape") {
        event.preventDefault()
        setSlash(null)
        return
      }
    }

    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault()
      if (slash) setSlash(null)
      const nextType =
        block.type === "checklist" ||
        block.type === "numbered" ||
        block.type === "bulleted"
          ? block.type
          : "text"
      insertBlockAfter(block.id, nextType)
      return
    }

    if (
      event.key === "Backspace" &&
      event.currentTarget.value.length === 0 &&
      blocks.length > 1
    ) {
      event.preventDefault()
      removeBlock(block.id)
      return
    }

    if (
      event.key === "ArrowUp" &&
      index > 0 &&
      !slash &&
      event.currentTarget.selectionStart === 0
    ) {
      const previous = blocks[index - 1]
      if (previous && previous.type !== "divider") {
        event.preventDefault()
        setActiveId(previous.id)
        focusBlock(previous.id)
      }
    }

    if (
      event.key === "ArrowDown" &&
      index < blocks.length - 1 &&
      !slash &&
      event.currentTarget.selectionStart === event.currentTarget.value.length
    ) {
      const next = blocks[index + 1]
      if (next && next.type !== "divider") {
        event.preventDefault()
        setActiveId(next.id)
        focusBlock(next.id)
      }
    }
  }

  return (
    <div
      ref={editorRef}
      data-slot="block-editor"
      className={cn(
        "relative overflow-hidden rounded-xl border border-border-primary bg-surface",
        className,
      )}
      {...props}
    >
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-1 px-6 py-10 sm:px-10">
        {blocks.map((block, index) => {
          if (block.type === "divider") {
            return (
              <div
                key={block.id}
                data-slot="block-editor-block"
                data-type="divider"
                className={cn(
                  "group relative my-3 flex cursor-pointer items-center py-2 outline-none",
                  activeId === block.id && "rounded-md bg-background-tertiary/60",
                )}
                onClick={() => setActiveId(block.id)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault()
                    insertBlockAfter(block.id, "text")
                  }
                  if (event.key === "Backspace" || event.key === "Delete") {
                    event.preventDefault()
                    removeBlock(block.id)
                  }
                }}
                tabIndex={0}
                role="separator"
                aria-orientation="horizontal"
              >
                <div className="h-px w-full bg-border-primary" />
              </div>
            )
          }

          const prefix =
            block.type === "checklist" ? (
              <Checkbox
                checked={Boolean(block.checked)}
                onCheckedChange={(checked) =>
                  updateBlock(block.id, { checked: Boolean(checked) })
                }
                aria-label="Toggle checklist item"
                className="mt-1.5"
              />
            ) : block.type === "numbered" ? (
              <span className="mt-1 w-6 shrink-0 tabular-nums text-fg-tertiary">
                {numberedIndex(blocks, index)}.
              </span>
            ) : block.type === "bulleted" ? (
              <span className="mt-1 w-6 shrink-0 text-center text-fg-tertiary">
                •
              </span>
            ) : null

          return (
            <div
              key={block.id}
              data-slot="block-editor-block"
              data-type={block.type}
              className={cn(
                "group relative flex gap-2 rounded-md px-1 py-0.5",
                activeId === block.id && "bg-background-tertiary/40",
              )}
            >
              {prefix}
              <AutoGrowField
                id={`block-${block.id}`}
                value={block.content}
                placeholder={placeholderFor(block.type)}
                className={cn(
                  blockTextClassName[block.type],
                  block.checked && "text-fg-tertiary line-through",
                )}
                onFocus={() => setActiveId(block.id)}
                onValueChange={(value) => handleBlockInput(block, value)}
                onKeyDown={(event) => handleBlockKeyDown(event, block, index)}
              />
            </div>
          )
        })}
      </div>

      {slash && openCommands.length > 0 ? (
        <div
          role="listbox"
          id={listboxId}
          aria-label="Insert block"
          className={cn(
            "absolute top-28 left-1/2 z-20 w-[min(100%-2rem,18rem)] -translate-x-1/2 overflow-hidden rounded-xl border border-border-primary bg-surface p-1.5 shadow-lg sm:left-10 sm:translate-x-0",
            motion.popupCenter,
          )}
        >
          <p className="px-2 py-1.5 text-xs text-fg-tertiary">Insert block</p>
          {openCommands.map((command, commandIndex) => {
            const selected = commandIndex === slash.index
            return (
              <button
                key={command.type}
                type="button"
                role="option"
                aria-selected={selected}
                className={cn(
                  "flex w-full cursor-pointer flex-col rounded-md px-2 py-1.5 text-left outline-none",
                  motion.colors,
                  selected
                    ? "bg-background-tertiary text-fg-primary"
                    : "text-fg-primary hover:bg-background-tertiary",
                )}
                onMouseEnter={() =>
                  setSlash((current) =>
                    current ? { ...current, index: commandIndex } : current,
                  )
                }
                onClick={() =>
                  applySlashCommand(slash.blockId, command.type, slash.query)
                }
              >
                <span
                  className={cn(
                    "text-sm",
                    command.type === "heading1" &&
                      "text-[15px] leading-5 font-semibold",
                    command.type === "heading2" && "font-semibold",
                    command.type === "heading3" &&
                      "text-[13px] leading-4 font-semibold",
                  )}
                >
                  {command.label}
                </span>
                <span className="text-xs text-fg-tertiary">
                  {command.description}
                </span>
              </button>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}
