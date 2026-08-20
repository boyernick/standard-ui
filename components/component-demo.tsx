import { CodeBlock } from "@/components/code-block"

export { ComponentCanvas } from "@/components/component-canvas"

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
