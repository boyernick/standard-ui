"use client"

import { Button, IconChevronRightSmall } from "@standard-ui/react"
import { useId, useState, type ReactNode } from "react"
import { CodeBlock } from "@/components/code-block"

type ComponentCanvasProps = {
  children: ReactNode
  /** Caption above the frame (e.g. Variants, Sizes) */
  label?: string
  /** Optional code toggled under the preview */
  code?: string
  lang?: string
  /** Start with the code panel open */
  defaultCodeOpen?: boolean
  /** Minimum height of the preview area */
  minHeightClass?: string
  className?: string
  /** Classes for the inner flex row */
  contentClassName?: string
}

export const ComponentCanvas = ({
  children,
  label,
  code,
  lang = "tsx",
  defaultCodeOpen = false,
  minHeightClass = "min-h-40",
  className = "",
  contentClassName = "",
}: ComponentCanvasProps) => {
  const [codeOpen, setCodeOpen] = useState(defaultCodeOpen)
  const codeId = useId()

  const handleToggleCode = () => {
    setCodeOpen((open) => !open)
  }

  return (
    <div className={className}>
      {label ? (
        <p className="text-xs mb-2 text-fg-tertiary">{label}</p>
      ) : null}
      <div className="rounded-xl border border-border-primary bg-background-secondary">
        <div
          className={`flex flex-wrap items-center justify-center gap-3 overflow-hidden rounded-t-xl p-8 ${
            code ? "" : "rounded-b-xl"
          } ${minHeightClass} ${contentClassName}`}
        >
          {children}
        </div>
        {code ? (
          <>
            <div
              className={`flex items-center border-t border-border-primary bg-background-secondary px-1 py-1 ${
                codeOpen ? "" : "rounded-b-xl"
              }`}
            >
              <Button
                type="button"
                variant="ghost"
                size="sm"
                aria-expanded={codeOpen}
                aria-controls={codeId}
                onClick={handleToggleCode}
                className="gap-1 text-xs text-fg-tertiary hover:bg-background-tertiary hover:text-fg-primary"
                suffix={
                  <IconChevronRightSmall
                    size={14}
                    aria-hidden
                    className={`transition-transform ${codeOpen ? "rotate-90" : ""}`}
                  />
                }
              >
                Code
              </Button>
            </div>
            {codeOpen ? (
              <div
                id={codeId}
                className="overflow-hidden rounded-b-xl border-t border-border-primary bg-surface"
              >
                <CodeBlock
                  bare={true}
                  code={code}
                  lang={lang}
                  size="sm"
                  showHeader={false}
                />
              </div>
            ) : null}
          </>
        ) : null}
      </div>
    </div>
  )
}
