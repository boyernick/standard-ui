import type { ReactNode } from "react"

export const Token = ({ children }: { children: ReactNode }) => (
  <code className="text-sm rounded-md bg-background-tertiary px-1.5 py-0.5 font-mono text-fg-secondary">
    {children}
  </code>
)

export const DocTable = ({
  headers,
  children,
  minWidthClass = "min-w-[36rem]",
}: {
  headers: string[]
  children: ReactNode
  minWidthClass?: string
}) => (
  <div className="mt-4 overflow-x-auto rounded-xl border border-border-primary bg-surface">
    <table className={`w-full ${minWidthClass} border-collapse text-left`}>
      <thead>
        <tr className="border-b border-border-primary">
          {headers.map((header) => (
            <th
              key={header}
              scope="col"
              className="text-xs-strong px-4 py-3 text-fg-quaternary"
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-border-primary text-sm text-fg-secondary">
        {children}
      </tbody>
    </table>
  </div>
)

export const DocCell = ({
  children,
  mono = false,
}: {
  children: ReactNode
  mono?: boolean
}) => (
  <td
    className={`px-4 py-3 align-top ${mono ? "font-mono text-fg-primary" : ""}`}
  >
    {children}
  </td>
)
