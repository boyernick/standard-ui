"use client"

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type HTMLAttributes,
  type PointerEvent as ReactPointerEvent,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  type ReactElement,
  type ReactNode,
} from "react"
import { Checkbox } from "./checkbox"
import { IconChainLink3, IconDotGrid2x3, IconHighlight, IconStrikeThrough } from "./icons"
import { Kbd, KbdGroup } from "./kbd"
import { cn } from "./lib/cn"
import { motion } from "./lib/motion"
import { popupInset, popupItem, popupSurface } from "./lib/popup"
import {
  Menu,
  MenuItem,
  MenuPopup,
  MenuPortal,
  MenuPositioner,
  MenuTrigger,
} from "./menu"
import {
  Toolbar,
  ToolbarButton,
  ToolbarGroup,
  ToolbarSeparator,
} from "./toolbar"
import {
  Tooltip,
  TooltipPopup,
  TooltipPortal,
  TooltipPositioner,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip"

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
  {
    type: "checklist",
    label: "Checklist",
    description: "To-do with a checkbox",
    keywords: ["checklist", "todo", "task", "checkbox"],
  },
  {
    type: "divider",
    label: "Divider",
    description: "Horizontal rule",
    keywords: ["divider", "separator", "line", "hr", "rule"],
  },
]

/** Pixels of vertical travel before a handle press becomes a drag. */
const DRAG_THRESHOLD = 4

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
    content: "Heading 1",
  },
  {
    id: "demo-h2",
    type: "heading2",
    content: "Heading 2",
  },
  {
    id: "demo-h3",
    type: "heading3",
    content: "Heading 3",
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
  heading1: "heading-2xl-sans text-fg-primary",
  heading2: "heading-xl-sans text-fg-primary",
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
      return "Write or type / for commands..."
  }
}

const isBlankHtml = (html: string) => {
  const text = html
    .replace(/<br\s*\/?>/gi, "")
    .replace(/&nbsp;/gi, " ")
    .replace(/<[^>]+>/g, "")
    .replace(/\u00A0/g, " ")
    .trim()
  return text.length === 0
}

const isSlashOnlyHtml = (html: string) => {
  const text = html
    .replace(/<br\s*\/?>/gi, "")
    .replace(/&nbsp;/gi, " ")
    .replace(/<[^>]+>/g, "")
    .replace(/\u00A0/g, " ")
    .trim()
  return /^\/[^\n]*$/.test(text)
}

const fieldPlainText = (field: HTMLElement) =>
  (field.textContent ?? "").replace(/\u00A0/g, " ")

const placeCaretAtEnd = (field: HTMLElement) => {
  const selection = window.getSelection()
  if (!selection) return
  const range = document.createRange()
  range.selectNodeContents(field)
  range.collapse(false)
  selection.removeAllRanges()
  selection.addRange(range)
}

const textBeforeCaret = (field: HTMLElement) => {
  const selection = window.getSelection()
  if (!selection || selection.rangeCount === 0) return fieldPlainText(field)
  if (!field.contains(selection.anchorNode)) return fieldPlainText(field)
  const range = selection.getRangeAt(0).cloneRange()
  range.selectNodeContents(field)
  range.setEnd(selection.getRangeAt(0).endContainer, selection.getRangeAt(0).endOffset)
  return range.toString().replace(/\u00A0/g, " ")
}

const isCaretAtStart = (field: HTMLElement) => {
  const selection = window.getSelection()
  if (!selection || !selection.isCollapsed || selection.rangeCount === 0) {
    return false
  }
  if (!field.contains(selection.anchorNode)) return false
  const range = selection.getRangeAt(0).cloneRange()
  range.selectNodeContents(field)
  range.setEnd(selection.anchorNode as Node, selection.anchorOffset)
  return range.toString().length === 0
}

const isCaretAtEnd = (field: HTMLElement) => {
  const selection = window.getSelection()
  if (!selection || !selection.isCollapsed || selection.rangeCount === 0) {
    return false
  }
  if (!field.contains(selection.anchorNode)) return false
  const range = selection.getRangeAt(0).cloneRange()
  range.selectNodeContents(field)
  range.setStart(selection.anchorNode as Node, selection.anchorOffset)
  return range.toString().length === 0
}

const selectionIsExpandedIn = (field: HTMLElement) => {
  const selection = window.getSelection()
  if (!selection || selection.isCollapsed || selection.rangeCount === 0) {
    return false
  }
  return field.contains(selection.anchorNode) && field.contains(selection.focusNode)
}

const highlightSelection = () => {
  const selection = window.getSelection()
  if (!selection || selection.isCollapsed || selection.rangeCount === 0) return

  const range = selection.getRangeAt(0)
  const existing = range.commonAncestorContainer.parentElement?.closest("mark")
  if (existing && existing.isContentEditable !== false) {
    const parent = existing.parentNode
    if (!parent) return
    while (existing.firstChild) parent.insertBefore(existing.firstChild, existing)
    parent.removeChild(existing)
    parent.normalize()
    return
  }

  const mark = document.createElement("mark")
  mark.className = "rounded-2xs bg-status-warning-background text-inherit"
  mark.appendChild(range.extractContents())
  range.insertNode(mark)
  selection.removeAllRanges()
  const next = document.createRange()
  next.selectNodeContents(mark)
  selection.addRange(next)
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

const blockTypeLabel = (type: BlockEditorBlockType) => {
  switch (type) {
    case "heading1":
      return "Heading 1"
    case "heading2":
      return "Heading 2"
    case "heading3":
      return "Heading 3"
    case "numbered":
      return "Numbered list"
    case "bulleted":
      return "Ordered list"
    case "checklist":
      return "Checklist"
    case "divider":
      return "Divider"
    default:
      return "Text"
  }
}

const blockTypeTriggerClassName = (type: BlockEditorBlockType) => {
  switch (type) {
    case "heading1":
      return "text-[15px] leading-5 font-semibold"
    case "heading2":
      return "font-semibold"
    case "heading3":
      return "text-[13px] leading-4 font-semibold"
    default:
      return undefined
  }
}

const Shortcut = ({
  keys,
  inverted,
  className = "ml-auto",
}: {
  keys: string[]
  inverted?: boolean
  className?: string
}) => (
  <KbdGroup className={className}>
    {keys.map((key) => (
      <Kbd key={key} size="sm" variant={inverted ? "inverted" : "default"}>
        {key}
      </Kbd>
    ))}
  </KbdGroup>
)

const StyleItem = ({
  label,
  keys,
  labelClassName,
  onClick,
}: {
  label: ReactNode
  keys: string[]
  labelClassName?: string
  onClick?: () => void
}) => (
  <MenuItem className="gap-3" onClick={onClick}>
    <span className={labelClassName}>{label}</span>
    <Shortcut keys={keys} />
  </MenuItem>
)

const SLASH_MENU_ITEMS: {
  type: BlockEditorBlockType
  label: string
  keys: string[]
  labelClassName?: string
}[] = [
  {
    type: "heading1",
    label: "Heading 1",
    keys: ["⌥", "⌘", "1"],
    labelClassName: "text-[15px] leading-5 font-semibold",
  },
  {
    type: "heading2",
    label: "Heading 2",
    keys: ["⌥", "⌘", "2"],
    labelClassName: "text-sm font-semibold",
  },
  {
    type: "heading3",
    label: "Heading 3",
    keys: ["⌥", "⌘", "3"],
    labelClassName: "text-[13px] leading-4 font-semibold",
  },
  { type: "numbered", label: "Numbered list", keys: ["⌥", "⌘", "4"] },
  { type: "bulleted", label: "Ordered list", keys: ["⌥", "⌘", "5"] },
  { type: "checklist", label: "Checklist", keys: ["⌥", "⌘", "6"] },
  { type: "divider", label: "Divider", keys: ["⌥", "⌘", "7"] },
]

const BLOCK_TYPE_SHORTCUTS: Record<string, BlockEditorBlockType> = {
  Digit0: "text",
  Digit1: "heading1",
  Digit2: "heading2",
  Digit3: "heading3",
  Digit4: "numbered",
  Digit5: "bulleted",
  Digit6: "checklist",
  Digit7: "divider",
}

const FormatTip = ({
  label,
  keys,
  children,
}: {
  label: string
  keys: string[]
  children: ReactElement
}) => (
  <Tooltip>
    <TooltipTrigger render={children} />
    <TooltipPortal>
      <TooltipPositioner>
        <TooltipPopup variant="inverted">
          {label}
          <Shortcut keys={keys} inverted className="ml-1.5" />
        </TooltipPopup>
      </TooltipPositioner>
    </TooltipPortal>
  </Tooltip>
)

const AutoGrowField = ({
  value,
  onValueChange,
  onKeyDown,
  onFocus,
  onBlur,
  onSelect,
  className,
  placeholder,
  slashPlaceholder = false,
  id,
}: {
  id: string
  value: string
  onValueChange: (value: string) => void
  onKeyDown: (event: ReactKeyboardEvent<HTMLDivElement>) => void
  onFocus: () => void
  onBlur?: () => void
  onSelect?: (field: HTMLDivElement) => void
  className?: string
  placeholder?: string
  slashPlaceholder?: boolean
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const lastHtml = useRef<string | null>(null)
  const empty = isBlankHtml(value)
  const showSlashHint = slashPlaceholder && empty
  const showPlaceholder = !slashPlaceholder && empty

  useLayoutEffect(() => {
    const node = ref.current
    if (!node) return
    if (lastHtml.current === null || value !== lastHtml.current) {
      const wasExternal =
        lastHtml.current !== null && value !== lastHtml.current
      node.innerHTML = value
      lastHtml.current = value
      if (wasExternal && document.activeElement === node) {
        placeCaretAtEnd(node)
      }
    }
    node.style.height = "0px"
    const lineHeight = Number.parseFloat(getComputedStyle(node).lineHeight)
    node.style.height = `${Math.max(
      node.scrollHeight,
      Number.isFinite(lineHeight) ? lineHeight : 28,
    )}px`
  }, [value, className])

  const emitValue = () => {
    const node = ref.current
    if (!node) return
    const html = isBlankHtml(node.innerHTML) ? "" : node.innerHTML
    lastHtml.current = html
    onValueChange(html)
  }

  return (
    <div className="relative min-w-0 grow">
      {showSlashHint ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 flex items-center gap-1 text-base leading-7 text-fg-quaternary"
        >
          <span>Write or type</span>
          <Kbd size="sm">/</Kbd>
          <span>for commands...</span>
        </div>
      ) : null}
      {showPlaceholder ? (
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-0 flex items-center",
            className,
          )}
          style={{
            color:
              "color-mix(in oklab, var(--text-quaternary) 55%, transparent)",
          }}
        >
          {placeholder}
        </div>
      ) : null}
      <div
        ref={ref}
        id={id}
        role="textbox"
        aria-multiline="true"
        aria-label={placeholder}
        contentEditable
        suppressContentEditableWarning
        className={cn(
          "min-h-7 w-full grow cursor-text bg-transparent outline-none break-words whitespace-pre-wrap",
          "[&_a]:underline [&_a]:underline-offset-2",
          className,
        )}
        onInput={emitValue}
        onKeyDown={onKeyDown}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyUp={(event) => onSelect?.(event.currentTarget)}
        onMouseUp={(event) => onSelect?.(event.currentTarget)}
      />
    </div>
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
  const [, setActiveId] = useState<string | null>(
    defaultBlocks[0]?.id ?? null,
  )
  const [slash, setSlash] = useState<{
    blockId: string
    query: string
    index: number
    top: number
    left: number
  } | null>(null)
  const [formatting, setFormatting] = useState<{
    blockId: string
    top: number
    left: number
  } | null>(null)
  const [dragId, setDragId] = useState<string | null>(null)
  const [dropInsertIndex, setDropInsertIndex] = useState<number | null>(null)
  const dragIdRef = useRef<string | null>(null)
  const dropInsertIndexRef = useRef<number | null>(null)
  /** Pointer press that has not yet cleared the movement threshold. */
  const pendingDragRef = useRef<{
    blockId: string
    index: number
    pointerId: number
    startY: number
    handle: HTMLElement
  } | null>(null)
  const editorRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  const setBlocks = useCallback(
    (
      next:
        | BlockEditorBlock[]
        | ((current: BlockEditorBlock[]) => BlockEditorBlock[]),
    ) => {
      if (controlledBlocks !== undefined) {
        const resolved =
          typeof next === "function" ? next(controlledBlocks) : next
        onBlocksChange?.(resolved)
        return
      }
      setUncontrolledBlocks((current) => {
        const resolved = typeof next === "function" ? next(current) : next
        onBlocksChange?.(resolved)
        return resolved
      })
    },
    [controlledBlocks, onBlocksChange],
  )

  const measureFieldPosition = useCallback(
    (blockId: string, edge: "top" | "bottom") => {
      const editor = editorRef.current
      const field = editor?.querySelector<HTMLElement>(
        `#block-${CSS.escape(blockId)}`,
      )
      if (!editor || !field) return { top: 40, left: 0 }
      const editorRect = editor.getBoundingClientRect()
      const fieldRect = field.getBoundingClientRect()
      return {
        top:
          (edge === "top" ? fieldRect.top : fieldRect.bottom) -
          editorRect.top +
          editor.scrollTop,
        left: Math.max(0, fieldRect.left - editorRect.left),
      }
    },
    [],
  )

  const openSlashMenu = useCallback(
    (blockId: string, query: string) => {
      const position = measureFieldPosition(blockId, "bottom")
      setFormatting(null)
      setSlash((current) => ({
        blockId,
        query,
        index:
          current?.blockId === blockId
            ? Math.min(
                current.index,
                Math.max(0, filterCommands(query).length - 1),
              )
            : 0,
        ...position,
      }))
      requestAnimationFrame(() => {
        const node = editorRef.current?.querySelector<HTMLElement>(
          `#block-${CSS.escape(blockId)}`,
        )
        if (!node) return
        node.focus()
        placeCaretAtEnd(node)
      })
    },
    [measureFieldPosition],
  )

  const syncFormattingToolbar = useCallback(
    (blockId: string, field: HTMLElement) => {
      if (slash?.blockId === blockId) {
        setFormatting(null)
        return
      }
      if (!selectionIsExpandedIn(field)) {
        setFormatting(null)
        return
      }
      setFormatting({
        blockId,
        ...measureFieldPosition(blockId, "top"),
      })
    },
    [measureFieldPosition, slash?.blockId],
  )

  const focusBlock = useCallback((id: string) => {
    requestAnimationFrame(() => {
      const node = editorRef.current?.querySelector<HTMLElement>(
        `#block-${CSS.escape(id)}`,
      )
      if (!node) return
      node.focus()
      placeCaretAtEnd(node)
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

  const moveBlockToIndex = useCallback(
    (fromId: string, insertIndex: number) => {
      setBlocks((current) => {
        const fromIndex = current.findIndex((block) => block.id === fromId)
        if (fromIndex === -1) return current

        let target = insertIndex
        if (fromIndex < target) target -= 1
        if (fromIndex === target) return current

        const next = [...current]
        const [moved] = next.splice(fromIndex, 1)
        if (!moved) return current
        next.splice(target, 0, moved)
        return next
      })
      setActiveId(fromId)
    },
    [setBlocks],
  )

  const resolveInsertIndexFromY = useCallback((clientY: number) => {
    const list = listRef.current
    const fromId = dragIdRef.current
    if (!list || !fromId) return null

    const els = [
      ...list.querySelectorAll<HTMLElement>("[data-slot=block-editor-block]"),
    ]
    const fromIndex = els.findIndex((el) => el.dataset.blockId === fromId)
    if (fromIndex === -1) return null

    let insertIndex = els.length
    for (let i = 0; i < els.length; i += 1) {
      const rect = els[i]!.getBoundingClientRect()
      if (clientY < rect.top + rect.height / 2) {
        insertIndex = i
        break
      }
    }

    // Already in this slot (before or after self).
    if (insertIndex === fromIndex || insertIndex === fromIndex + 1) {
      return fromIndex
    }
    return insertIndex
  }, [])

  const setDropIndex = useCallback((insertIndex: number) => {
    dropInsertIndexRef.current = insertIndex
    setDropInsertIndex((current) =>
      current === insertIndex ? current : insertIndex,
    )
  }, [])

  /**
   * Reordering runs on pointer events, not HTML5 drag-and-drop.
   *
   * Blocks sit next to `contenteditable` fields, and Chromium will happily
   * start its own text drag from those instead of firing `dragstart` on the
   * handle. Pointer capture sidesteps that entirely: the handle owns the
   * pointer for the whole gesture, so moves keep arriving even when the
   * cursor leaves the list, and touch works for free.
   */
  const endBlockDrag = useCallback(
    (commit: boolean) => {
      const fromId = dragIdRef.current
      const insertIndex = dropInsertIndexRef.current

      pendingDragRef.current = null
      dragIdRef.current = null
      dropInsertIndexRef.current = null
      setDragId(null)
      setDropInsertIndex(null)
      document.body.style.removeProperty("cursor")

      if (commit && fromId && insertIndex != null) {
        moveBlockToIndex(fromId, insertIndex)
      }
    },
    [moveBlockToIndex],
  )

  const handleHandlePointerDown = useCallback(
    (event: ReactPointerEvent<HTMLElement>, blockId: string, index: number) => {
      if (event.button !== 0) return
      // Stop the press from moving the caret or selecting text mid-drag.
      event.preventDefault()
      const handle = event.currentTarget
      pendingDragRef.current = {
        blockId,
        index,
        pointerId: event.pointerId,
        startY: event.clientY,
        handle,
      }
      // Capture can throw if the pointer is already gone; the drag still works
      // off the handle's own move events, so treat it as best-effort.
      try {
        handle.setPointerCapture(event.pointerId)
      } catch {
        /* no-op */
      }
    },
    [],
  )

  const handleHandlePointerMove = useCallback(
    (event: ReactPointerEvent<HTMLElement>) => {
      const pending = pendingDragRef.current

      // Arm the drag only once the pointer has actually travelled, so a plain
      // click on the handle stays a click.
      if (
        pending &&
        pending.pointerId === event.pointerId &&
        !dragIdRef.current
      ) {
        if (Math.abs(event.clientY - pending.startY) < DRAG_THRESHOLD) return
        dragIdRef.current = pending.blockId
        dropInsertIndexRef.current = pending.index
        setDragId(pending.blockId)
        setDropInsertIndex(pending.index)
        document.body.style.cursor = "grabbing"
      }

      if (!dragIdRef.current) return
      const insertIndex = resolveInsertIndexFromY(event.clientY)
      if (insertIndex != null) setDropIndex(insertIndex)
    },
    [resolveInsertIndexFromY, setDropIndex],
  )

  const handleHandlePointerUp = useCallback(() => {
    endBlockDrag(dragIdRef.current != null)
  }, [endBlockDrag])

  const moveBlockByStep = useCallback(
    (index: number, direction: -1 | 1) => {
      const block = blocks[index]
      if (!block) return
      const target = direction === -1 ? index - 1 : index + 2
      if (target < 0 || target > blocks.length) return
      moveBlockToIndex(block.id, target)
    },
    [blocks, moveBlockToIndex],
  )

  const applySlashCommand = useCallback(
    (blockId: string, type: BlockEditorBlockType, query: string) => {
      const block = blocks.find((item) => item.id === blockId)
      if (!block) return

      const field = editorRef.current?.querySelector<HTMLElement>(
        `#block-${CSS.escape(blockId)}`,
      )
      const plain = field ? fieldPlainText(field) : block.content
      const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
      const contentWithoutSlash = plain
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
        if (field) {
          field.innerHTML = contentWithoutSlash
        }
        updateBlock(blockId, {
          type,
          content: contentWithoutSlash,
          checked: type === "checklist" ? false : undefined,
        })
        focusBlock(blockId)
      }

      setSlash(null)
      setFormatting(null)
    },
    [blocks, focusBlock, setBlocks, updateBlock],
  )

  const applyBlockType = useCallback(
    (blockId: string, type: BlockEditorBlockType) => {
      if (type === "divider") {
        applySlashCommand(blockId, type, "")
        return
      }
      updateBlock(blockId, {
        type,
        checked: type === "checklist" ? false : undefined,
      })
      setFormatting(null)
      focusBlock(blockId)
    },
    [applySlashCommand, focusBlock, updateBlock],
  )

  const applyInlineFormat = useCallback(
    (
      blockId: string,
      format:
        | "bold"
        | "italic"
        | "underline"
        | "strikethrough"
        | "highlight"
        | "link",
    ) => {
      const field = editorRef.current?.querySelector<HTMLElement>(
        `#block-${CSS.escape(blockId)}`,
      )
      if (!field || !selectionIsExpandedIn(field)) return

      field.focus()

      if (format === "highlight") {
        highlightSelection()
      } else if (format === "link") {
        const url = window.prompt("Enter URL", "https://")
        if (url == null || url.trim() === "") return
        document.execCommand("createLink", false, url.trim())
      } else {
        document.execCommand("styleWithCSS", false, "true")
        const command = {
          bold: "bold",
          italic: "italic",
          underline: "underline",
          strikethrough: "strikeThrough",
        }[format]
        document.execCommand(command)
      }

      const html = isBlankHtml(field.innerHTML) ? "" : field.innerHTML
      updateBlock(blockId, { content: html })
      requestAnimationFrame(() => {
        syncFormattingToolbar(blockId, field)
      })
    },
    [syncFormattingToolbar, updateBlock],
  )

  const openCommands = slash ? filterCommands(slash.query) : []

  useEffect(() => {
    if (!slash) return
    const handlePointer = (event: MouseEvent) => {
      if (!(event.target instanceof Node)) return
      if (editorRef.current?.contains(event.target)) return
      if (
        event.target instanceof Element &&
        event.target.closest("[data-slot=menu-popup], [role=menu]")
      ) {
        return
      }
      setSlash(null)
    }
    document.addEventListener("mousedown", handlePointer)
    return () => document.removeEventListener("mousedown", handlePointer)
  }, [slash])

  const handleBlockInput = (block: BlockEditorBlock, html: string) => {
    updateBlock(block.id, { content: html })

    const field = editorRef.current?.querySelector<HTMLElement>(
      `#block-${CSS.escape(block.id)}`,
    )
    const plain = field ? fieldPlainText(field) : html.replace(/<[^>]+>/g, "")
    const slashMatch = plain.match(/(?:^|[\s\u00A0])\/([^\n]*)$/)
    if (slashMatch) {
      openSlashMenu(block.id, slashMatch[1] ?? "")
      return
    }

    if (slash?.blockId === block.id) setSlash(null)
  }

  const handleBlockKeyDown = (
    event: ReactKeyboardEvent<HTMLDivElement>,
    block: BlockEditorBlock,
    index: number,
  ) => {
    const field = event.currentTarget

    if (event.key === "/" && !event.metaKey && !event.ctrlKey && !event.altKey) {
      const before = textBeforeCaret(field)
      const atSlashStart = before === "" || /[\s\u00A0]$/.test(before)
      if (atSlashStart) {
        requestAnimationFrame(() => {
          const plain = fieldPlainText(field)
          const match = plain.match(/(?:^|[\s\u00A0])\/([^\n]*)$/)
          if (match) openSlashMenu(block.id, match[1] ?? "")
        })
      }
    }

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

    const mod = event.metaKey || event.ctrlKey
    if (mod && event.altKey && !event.shiftKey) {
      const type = BLOCK_TYPE_SHORTCUTS[event.code]
      if (type) {
        event.preventDefault()
        setSlash(null)
        applyBlockType(block.id, type)
        return
      }
    }

    if (mod && !event.altKey) {
      const key = event.key.toLowerCase()
      if (key === "b") {
        event.preventDefault()
        applyInlineFormat(block.id, "bold")
        return
      }
      if (key === "i") {
        event.preventDefault()
        applyInlineFormat(block.id, "italic")
        return
      }
      if (key === "u") {
        event.preventDefault()
        applyInlineFormat(block.id, "underline")
        return
      }
      if (key === "k") {
        event.preventDefault()
        applyInlineFormat(block.id, "link")
        return
      }
      if (event.shiftKey && key === "x") {
        event.preventDefault()
        applyInlineFormat(block.id, "strikethrough")
        return
      }
      if (event.shiftKey && key === "h") {
        event.preventDefault()
        applyInlineFormat(block.id, "highlight")
        return
      }
    }

    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault()
      if (slash) setSlash(null)
      const isList =
        block.type === "checklist" ||
        block.type === "numbered" ||
        block.type === "bulleted"
      if (isList && isBlankHtml(field.innerHTML)) {
        updateBlock(block.id, { type: "text", checked: undefined })
        return
      }
      insertBlockAfter(block.id, isList ? block.type : "text")
      return
    }

    if (event.key === "Tab" && !event.metaKey && !event.ctrlKey) {
      if (slash?.blockId === block.id) return
      event.preventDefault()
      const isList =
        block.type === "checklist" ||
        block.type === "numbered" ||
        block.type === "bulleted"
      if (!isList) return
      if (isBlankHtml(field.innerHTML)) {
        updateBlock(block.id, { type: "text", checked: undefined })
        return
      }
      insertBlockAfter(block.id, block.type)
      return
    }

    if (
      (event.key === "Backspace" || event.key === "Delete") &&
      isBlankHtml(field.innerHTML)
    ) {
      if (block.type !== "text") {
        event.preventDefault()
        setSlash(null)
        setFormatting(null)
        updateBlock(block.id, { type: "text", checked: undefined })
        return
      }
      if (blocks.length > 1) {
        event.preventDefault()
        removeBlock(block.id)
        return
      }
    }

    if (event.key === "ArrowUp" && index > 0 && !slash && isCaretAtStart(field)) {
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
      isCaretAtEnd(field)
    ) {
      const next = blocks[index + 1]
      if (next && next.type !== "divider") {
        event.preventDefault()
        setActiveId(next.id)
        focusBlock(next.id)
      }
    }
  }

  const handleEditorClick = (event: ReactMouseEvent<HTMLDivElement>) => {
    const target = event.target
    if (!(target instanceof Element)) return
    if (
      target.closest("[data-slot=block-editor-block]") ||
      target.closest("[data-slot=block-editor-handle]") ||
      target.closest("[data-slot=menu-popup]") ||
      target.closest('[role="toolbar"]') ||
      target.closest("[role=listbox]") ||
      target.closest("[role=menu]") ||
      target.closest("[contenteditable=true]")
    ) {
      return
    }

    const trailingEmpty: BlockEditorBlock[] = []
    for (let index = blocks.length - 1; index >= 0; index -= 1) {
      const block = blocks[index]
      if (!block || block.type === "divider") break
      if (!isBlankHtml(block.content)) break
      trailingEmpty.push(block)
    }

    if (trailingEmpty.length > 0) {
      const keep = trailingEmpty[trailingEmpty.length - 1]!
      const removeIds = new Set(
        trailingEmpty.filter((block) => block.id !== keep.id).map((block) => block.id),
      )
      if (removeIds.size > 0 || keep.type !== "text") {
        setBlocks((current) =>
          current
            .filter((block) => !removeIds.has(block.id))
            .map((block) =>
              block.id === keep.id
                ? { ...block, type: "text" as const, checked: undefined }
                : block,
            ),
        )
      }
      setActiveId(keep.id)
      focusBlock(keep.id)
      return
    }

    const last = blocks[blocks.length - 1]
    if (last) {
      insertBlockAfter(last.id, "text")
      return
    }

    const next = createBlockEditorBlock("text")
    setBlocks([next])
    setActiveId(next.id)
    focusBlock(next.id)
  }

  return (
    <div
      ref={editorRef}
      data-slot="block-editor"
      className={cn(
        "relative overflow-visible cursor-text bg-surface",
        className,
      )}
      onClick={handleEditorClick}
      {...props}
    >
      <div
        ref={listRef}
        className={cn(
          "relative flex w-full max-w-[720px] flex-col gap-0.5 overflow-visible",
          // Pointer capture keeps the gesture on the handle; this just stops
          // the surrounding copy from highlighting as the cursor sweeps it.
          dragId && "select-none",
        )}
      >
        {(() => {
          const dragFromIndex = dragId
            ? blocks.findIndex((item) => item.id === dragId)
            : -1
          const dropLineAt = (() => {
            if (dropInsertIndex == null || blocks.length === 0) return null
            if (dropInsertIndex >= blocks.length) {
              return {
                blockId: blocks[blocks.length - 1]!.id,
                edge: "after" as const,
              }
            }
            if (
              dragFromIndex >= 0 &&
              dropInsertIndex === dragFromIndex &&
              dropInsertIndex > 0
            ) {
              return {
                blockId: blocks[dropInsertIndex - 1]!.id,
                edge: "after" as const,
              }
            }
            return {
              blockId: blocks[dropInsertIndex]!.id,
              edge: "before" as const,
            }
          })()

          return blocks.map((block, index) => {
          const showBlockChrome =
            !isBlankHtml(block.content) && !isSlashOnlyHtml(block.content)
          const isListBlock =
            block.type === "checklist" ||
            block.type === "numbered" ||
            block.type === "bulleted"
          const isDragging = dragId === block.id

          const dropLine =
            dropLineAt?.blockId === block.id ? (
              <div
                aria-hidden
                className={cn(
                  "pointer-events-none absolute right-0 left-0 z-20 h-0.5 rounded-full bg-fg-primary",
                  dropLineAt.edge === "before" ? "-top-px" : "-bottom-px",
                )}
              />
            ) : null

          const dragHandle = (
            <button
              type="button"
              data-slot="block-editor-handle"
              aria-label={`Reorder ${blockTypeLabel(block.type)}`}
              title="Drag to reorder"
              className={cn(
                "absolute right-full z-10 mr-1 flex h-7 cursor-grab items-center justify-center rounded-sm px-1 text-fg-quaternary",
                // Widen the grab target without moving the dots.
                "before:absolute before:-inset-y-1 before:-inset-x-1 before:content-['']",
                block.type === "text"
                  ? "top-0.5"
                  : "top-1/2 -translate-y-1/2",
                "opacity-0 transition-opacity duration-[var(--duration-sm)] ease-enter group-hover:opacity-100",
                "hover:bg-background-tertiary hover:text-fg-secondary",
                "touch-none active:cursor-grabbing",
                "focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/20",
                isDragging && "cursor-grabbing opacity-100",
              )}
              onClick={(event) => event.stopPropagation()}
              onPointerDown={(event) => {
                event.stopPropagation()
                handleHandlePointerDown(event, block.id, index)
              }}
              onPointerMove={handleHandlePointerMove}
              onPointerUp={handleHandlePointerUp}
              onPointerCancel={handleHandlePointerUp}
              onKeyDown={(event) => {
                if (event.key !== "ArrowUp" && event.key !== "ArrowDown") return
                event.preventDefault()
                moveBlockByStep(index, event.key === "ArrowUp" ? -1 : 1)
              }}
            >
              <IconDotGrid2x3 size={16} className="size-4" aria-hidden />
            </button>
          )

          if (block.type === "divider") {
            return (
              <div
                key={block.id}
                data-slot="block-editor-block"
                data-block-id={block.id}
                data-type="divider"
                className={cn(
                  "group relative -mx-3 my-3 flex cursor-pointer items-center rounded-md px-3 py-2 outline-none",
                  "[&:not(:focus-within):hover]:bg-background-quaternary/20",
                  isDragging && "opacity-40",
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
                {dropLine}
                {dragHandle}
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
              />
            ) : block.type === "numbered" ? (
              <span className="tabular-nums text-fg-primary">
                {numberedIndex(blocks, index)}.
              </span>
            ) : block.type === "bulleted" ? (
              <span
                className="text-[1.25rem] leading-none text-fg-primary"
                aria-hidden
              >
                •
              </span>
            ) : null

          const previous = index > 0 ? blocks[index - 1] : null
          const sameListAsPrevious =
            previous != null && isListBlock && previous.type === block.type

          return (
            <div
              key={block.id}
              data-slot="block-editor-block"
              data-block-id={block.id}
              data-type={block.type}
              className={cn(
                "group relative -mx-3 items-center rounded-md px-3",
                isListBlock ? "py-0" : "py-0.5",
                showBlockChrome &&
                  "[&:not(:focus-within):hover]:bg-background-quaternary/20",
                isDragging && "opacity-40",
                sameListAsPrevious && "-mt-0.5",
                previous &&
                  previous.type !== block.type &&
                  previous.type !== "divider" &&
                  "mt-3",
                prefix
                  ? "grid grid-cols-[1.25rem_minmax(0,1fr)] gap-x-2"
                  : "flex",
              )}
            >
              {dropLine}
              {dragHandle}
              {prefix ? (
                <div className="flex h-7 items-center justify-start">{prefix}</div>
              ) : null}
              <AutoGrowField
                id={`block-${block.id}`}
                value={block.content}
                placeholder={placeholderFor(block.type)}
                slashPlaceholder={block.type === "text"}
                className={cn(
                  blockTextClassName[block.type],
                  block.checked && "text-fg-tertiary line-through",
                )}
                onFocus={() => setActiveId(block.id)}
                onBlur={() => {
                  window.setTimeout(() => {
                    const active = document.activeElement
                    if (
                      active instanceof Element &&
                      (active.closest('[role="toolbar"]') ||
                        active.closest("[role=menu]"))
                    ) {
                      return
                    }
                    setFormatting((current) =>
                      current?.blockId === block.id ? null : current,
                    )
                  }, 0)
                }}
                onSelect={(field) => syncFormattingToolbar(block.id, field)}
                onValueChange={(value) => handleBlockInput(block, value)}
                onKeyDown={(event) => handleBlockKeyDown(event, block, index)}
              />
            </div>
          )
        })
        })()}
      </div>

      {/* Toolbar format handlers only run on click; react-hooks/refs is overly
          strict about onClick closures that close over editorRef. */}
      {/* eslint-disable react-hooks/refs */}
      {formatting && !slash
        ? (() => {
            const formattingType =
              blocks.find((block) => block.id === formatting.blockId)?.type ??
              "text"
            return (
        <TooltipProvider delay={200}>
        <Toolbar
          aria-label="Formatting"
          style={{ top: formatting.top, left: formatting.left }}
          className={cn(
            "absolute z-20 -translate-y-[calc(100%+0.5rem)] border border-border-primary bg-surface",
            motion.popupCenter,
          )}
          onMouseDown={(event) => event.preventDefault()}
        >
          <ToolbarGroup>
            <FormatTip label="Link" keys={["⌘", "K"]}>
              <ToolbarButton
                aria-label="Link"
                onClick={() => applyInlineFormat(formatting.blockId, "link")}
              >
                <IconChainLink3 size={14} className="size-3.5" aria-hidden />
              </ToolbarButton>
            </FormatTip>
            <FormatTip label="Bold" keys={["⌘", "B"]}>
              <ToolbarButton
                aria-label="Bold"
                className="font-semibold"
                onClick={() => applyInlineFormat(formatting.blockId, "bold")}
              >
                B
              </ToolbarButton>
            </FormatTip>
            <FormatTip label="Italic" keys={["⌘", "I"]}>
              <ToolbarButton
                aria-label="Italic"
                className="italic"
                onClick={() => applyInlineFormat(formatting.blockId, "italic")}
              >
                I
              </ToolbarButton>
            </FormatTip>
            <FormatTip label="Underline" keys={["⌘", "U"]}>
              <ToolbarButton
                aria-label="Underline"
                className="underline"
                onClick={() =>
                  applyInlineFormat(formatting.blockId, "underline")
                }
              >
                U
              </ToolbarButton>
            </FormatTip>
            <FormatTip label="Strikethrough" keys={["⇧", "⌘", "X"]}>
              <ToolbarButton
                aria-label="Strikethrough"
                onClick={() =>
                  applyInlineFormat(formatting.blockId, "strikethrough")
                }
              >
                <IconStrikeThrough size={14} className="size-3.5" aria-hidden />
              </ToolbarButton>
            </FormatTip>
            <FormatTip label="Highlight" keys={["⇧", "⌘", "H"]}>
              <ToolbarButton
                aria-label="Highlight"
                onClick={() =>
                  applyInlineFormat(formatting.blockId, "highlight")
                }
              >
                <IconHighlight size={14} className="size-3.5" aria-hidden />
              </ToolbarButton>
            </FormatTip>
          </ToolbarGroup>
          <ToolbarSeparator />
          <Menu>
            <MenuTrigger
              render={
                <ToolbarButton
                  className={blockTypeTriggerClassName(formattingType)}
                />
              }
            >
              {blockTypeLabel(formattingType)}
            </MenuTrigger>
            <MenuPortal>
              <MenuPositioner align="start">
                <MenuPopup>
                  <StyleItem
                    label="Text"
                    keys={["⌥", "⌘", "0"]}
                    onClick={() => applyBlockType(formatting.blockId, "text")}
                  />
                  <StyleItem
                    label="Heading 1"
                    labelClassName="text-[15px] leading-5 font-semibold"
                    keys={["⌥", "⌘", "1"]}
                    onClick={() =>
                      applyBlockType(formatting.blockId, "heading1")
                    }
                  />
                  <StyleItem
                    label="Heading 2"
                    labelClassName="text-sm font-semibold"
                    keys={["⌥", "⌘", "2"]}
                    onClick={() =>
                      applyBlockType(formatting.blockId, "heading2")
                    }
                  />
                  <StyleItem
                    label="Heading 3"
                    labelClassName="text-[13px] leading-4 font-semibold"
                    keys={["⌥", "⌘", "3"]}
                    onClick={() =>
                      applyBlockType(formatting.blockId, "heading3")
                    }
                  />
                  <StyleItem
                    label="Numbered list"
                    keys={["⌥", "⌘", "4"]}
                    onClick={() =>
                      applyBlockType(formatting.blockId, "numbered")
                    }
                  />
                  <StyleItem
                    label="Ordered list"
                    keys={["⌥", "⌘", "5"]}
                    onClick={() =>
                      applyBlockType(formatting.blockId, "bulleted")
                    }
                  />
                  <StyleItem
                    label="Checklist"
                    keys={["⌥", "⌘", "6"]}
                    onClick={() =>
                      applyBlockType(formatting.blockId, "checklist")
                    }
                  />
                </MenuPopup>
              </MenuPositioner>
            </MenuPortal>
          </Menu>
        </Toolbar>
        </TooltipProvider>
            )
          })()
        : null}
      {/* eslint-enable react-hooks/refs */}

      {slash ? (
        <div
          role="listbox"
          aria-label="Insert block"
          style={{ top: slash.top + 8, left: slash.left }}
          className={cn(
            "absolute z-50 min-w-48 overflow-hidden",
            popupSurface,
            popupInset,
            motion.popupAnchor,
          )}
        >
          {SLASH_MENU_ITEMS.filter((item) =>
            openCommands.some((command) => command.type === item.type),
          ).map((item, commandIndex) => {
            const selected = commandIndex === slash.index
            return (
              <button
                key={item.type}
                type="button"
                role="option"
                aria-selected={selected}
                className={cn(
                  popupItem,
                  "w-full gap-3",
                  motion.colors,
                  selected && "bg-background-tertiary",
                )}
                onMouseDown={(event) => event.preventDefault()}
                onMouseEnter={() =>
                  setSlash((current) =>
                    current ? { ...current, index: commandIndex } : current,
                  )
                }
                onClick={() =>
                  applySlashCommand(slash.blockId, item.type, slash.query)
                }
              >
                <span className={item.labelClassName}>{item.label}</span>
                <Shortcut keys={item.keys} />
              </button>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}
