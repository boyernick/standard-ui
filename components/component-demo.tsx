import { CodeBlock } from "@/components/code-block"

export const ComponentDemo = ({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) => (
  <div
    className={`flex flex-wrap items-center gap-3 rounded-xl border border-border-primary bg-background-secondary p-6 ${className}`}
  >
    {children}
  </div>
)

export const ComponentMeta = ({
  importLine,
  note,
}: {
  importLine: string
  note?: string
}) => (
  <div className="mt-4 space-y-2">
    <CodeBlock code={importLine} lang="tsx" size="sm" showHeader={false} />
    {note ? <p className="text-sm text-fg-tertiary">{note}</p> : null}
  </div>
)
