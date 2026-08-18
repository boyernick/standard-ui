"use client"

import {
  Button,
  IconCheckmark1,
  IconSquareBehindSquare6,
} from "@standard-ui/react"
import { useState } from "react"
import { highlight, type LanguageName } from "sugar-high"

type CodeBlockProps = {
  code: string
  /** Label shown in the header (e.g. tsx). Highlighting uses TypeScript for TSX. */
  lang?: string
  size?: "sm" | "md"
  showHeader?: boolean
  /** Skip border/radius chrome — for nesting inside another frame */
  bare?: boolean
  className?: string
}

const sizeClass = {
  sm: "text-2xs p-3",
  md: "text-xs p-4",
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

/** Map display labels to sugar-high canonical languages (TS includes TSX). */
const highlightLang = (lang: string): LanguageName => {
  const key = lang.toLowerCase()
  if (key === "tsx" || key === "ts") return "typescript"
  if (key === "jsx" || key === "js") return "javascript"
  if (languages.has(key as LanguageName)) return key as LanguageName
  return "typescript"
}

export const CodeBlock = ({
  code: raw,
  lang = "tsx",
  size = "md",
  showHeader = true,
  bare = false,
  className = "",
}: CodeBlockProps) => {
  const [copied, setCopied] = useState(false)
  const code = raw.replace(/^\n/, "").replace(/\n$/, "")
  const html = highlight(code, { lang: highlightLang(lang) })
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

  const pre = (
    <pre
      className={`sh-code overflow-x-auto font-mono ${sizeClass[size]} ${frameClass}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )

  if (!showHeader) {
    return <div className={className}>{pre}</div>
  }

  return (
    <div
      className={`overflow-hidden rounded-xl border border-border-primary bg-surface ${className}`}
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
      {pre}
    </div>
  )
}
