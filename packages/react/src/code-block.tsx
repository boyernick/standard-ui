"use client"

import { useState } from "react"
import { highlight, type LanguageName } from "sugar-high"
import { Button } from "./button"
import { IconCheckmark1, IconSquareBehindSquare6 } from "./icons"
import { cn } from "./lib/cn"

/** 1-based line number, or an inclusive `[start, end]` range. */
export type CodeBlockHighlightLine = number | readonly [number, number]

export type CodeBlockProps = {
  code: string
  /** Label shown in the header (for example, tsx). TSX uses TypeScript highlighting. */
  lang?: string
  size?: "sm" | "md"
  showHeader?: boolean
  /** Removes border and radius chrome for nesting inside another frame. */
  bare?: boolean
  /** 1-based lines (or ranges) to emphasize inside the block. */
  highlightLines?: readonly CodeBlockHighlightLine[]
  /** 1-based lines added in a review (green). */
  addedLines?: readonly CodeBlockHighlightLine[]
  /** 1-based lines removed in a review (red). */
  removedLines?: readonly CodeBlockHighlightLine[]
  className?: string
}

const sizeClass = {
  sm: "text-2xs py-3",
  md: "text-xs py-4",
} as const

const languages = new Set<LanguageName>([
  "javascript",
  "typescript",
  "css",
  "python",
  "c",
  "go",
  "java",
  "rust",
  "json",
  "diff",
  "shell",
  "cpp",
  "csharp",
  "sql",
  "html",
  "yaml",
  "markdown",
  "kotlin",
  "swift",
  "php",
  "toml",
  "powershell",
  "dockerfile",
  "graphql",
  "hcl",
])

const getHighlightLanguage = (lang: string): LanguageName => {
  const key = lang.toLowerCase()

  if (key === "tsx" || key === "ts") return "typescript"
  if (key === "jsx" || key === "js") return "javascript"
  if (languages.has(key as LanguageName)) return key as LanguageName

  return "typescript"
}

const toHighlightedLines = (
  lines?: readonly CodeBlockHighlightLine[],
): Set<number> => {
  const set = new Set<number>()
  if (!lines) return set

  for (const entry of lines) {
    if (typeof entry === "number") {
      set.add(entry)
      continue
    }

    const [start, end] = entry
    const from = Math.min(start, end)
    const to = Math.max(start, end)
    for (let line = from; line <= to; line += 1) set.add(line)
  }

  return set
}

export const CodeBlock = ({
  code: rawCode,
  lang = "tsx",
  size = "md",
  showHeader = true,
  bare = false,
  highlightLines,
  addedLines,
  removedLines,
  className = "",
}: CodeBlockProps) => {
  const [copied, setCopied] = useState(false)
  const code = rawCode.replace(/^\n/, "").replace(/\n$/, "")
  const focused = toHighlightedLines(highlightLines)
  const added = toHighlightedLines(addedLines)
  const removed = toHighlightedLines(removedLines)
  const html = highlight(code, {
    lang: getHighlightLanguage(lang),
    markLine: (line) => {
      const number = line.index + 1
      if (added.has(number)) {
        line.className += " sh__line--added"
        return
      }
      if (removed.has(number)) {
        line.className += " sh__line--removed"
        return
      }
      if (focused.has(number)) {
        line.className += " sh__line--highlighted"
      }
    },
  })
  const frameClass =
    !showHeader && !bare
      ? "rounded-lg border border-border-primary bg-surface"
      : ""

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1200)
    } catch {
      setCopied(false)
    }
  }

  const codeContent = (
    <pre
      className={cn(
        "sh-code overflow-x-auto font-mono",
        sizeClass[size],
        frameClass,
      )}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )

  if (!showHeader) {
    return <div className={className}>{codeContent}</div>
  }

  return (
    <div
      data-slot="code-block"
      className={cn(
        "overflow-hidden rounded-xl border border-border-primary bg-surface",
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-border-primary bg-background-secondary px-3 py-1.5 pl-4">
        <p className="text-xs font-mono text-fg-quaternary">{lang}</p>
        <Button
          type="button"
          variant="ghost"
          iconOnly
          size="sm"
          className="size-6 cursor-copy text-fg-quaternary hover:text-fg-primary"
          aria-label={copied ? "Copied" : "Copy code"}
          onClick={handleCopy}
        >
          {copied ? (
            <IconCheckmark1 size={14} aria-hidden />
          ) : (
            <IconSquareBehindSquare6 size={14} aria-hidden />
          )}
        </Button>
      </div>
      {codeContent}
    </div>
  )
}
