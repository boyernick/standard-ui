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
    <pre className="type-tiny overflow-x-auto rounded-lg border border-border-primary bg-surface p-3 font-mono text-fg-secondary">
      {importLine}
    </pre>
    {note ? <p className="type-small text-fg-tertiary">{note}</p> : null}
  </div>
)
