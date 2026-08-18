import { highlight, type LanguageName } from "sugar-high"

type CodeBlockProps = {
  code: string
  /** Label shown in the header (e.g. tsx). Highlighting uses TypeScript for TSX. */
  lang?: string
  size?: "sm" | "md"
  showHeader?: boolean
  className?: string
}

const sizeClass = {
  sm: "text-xs p-3",
  md: "text-sm p-4",
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
  className = "",
}: CodeBlockProps) => {
  const code = raw.replace(/^\n/, "").replace(/\n$/, "")
  const html = highlight(code, { lang: highlightLang(lang) })

  const pre = (
    <pre
      className={`sh-code overflow-x-auto font-mono leading-relaxed ${sizeClass[size]} ${
        showHeader ? "" : "rounded-lg border border-border-primary bg-surface"
      }`}
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
      <div className="flex items-center justify-between border-b border-border-primary bg-background-secondary px-4 py-2">
        <p className="text-xs font-mono text-fg-quaternary">{lang}</p>
      </div>
      {pre}
    </div>
  )
}
