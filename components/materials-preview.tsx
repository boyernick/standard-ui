"use client"

import { useState, type ReactNode } from "react"
import { radii, shadows } from "@/lib/tokens"

const CopyRow = ({
  copyValue,
  children,
}: {
  copyValue: string
  children: ReactNode
}) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(copyValue)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1200)
    } catch {
      setCopied(false)
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? "Copied" : `Copy ${copyValue}`}
      title={copied ? "Copied" : `Copy ${copyValue}`}
      className="group flex w-full cursor-pointer items-center gap-4 border-b border-border-primary px-4 py-6 text-left transition-colors last:border-b-0 hover:bg-background-tertiary focus-visible:bg-background-tertiary focus-visible:outline-none sm:px-5"
    >
      {children}
      <span className="sr-only">{copied ? "Copied" : copyValue}</span>
    </button>
  )
}

export const ShadowPreviewList = () => (
  <div className="overflow-hidden rounded-xl border border-border-primary bg-surface">
    <div className="flex items-center gap-4 border-b border-border-primary px-4 py-3 sm:px-5">
      <p className="text-xs-strong w-[7.5rem] shrink-0 text-fg-tertiary sm:w-[120px]">
        Preview
      </p>
      <p className="text-xs-strong w-28 shrink-0 text-fg-tertiary sm:w-32">
        Name
      </p>
      <p className="text-xs-strong min-w-0 flex-1 text-fg-tertiary">Usage</p>
    </div>
    {shadows.map((item) => (
      <CopyRow key={item.name} copyValue={item.className}>
        <div className="flex h-[100px] w-[7.5rem] shrink-0 items-center justify-center sm:w-[120px]">
          <div
            className={`h-full w-full rounded-2xl bg-surface ${item.className}`}
          />
        </div>
        <div className="flex w-28 shrink-0 flex-col gap-1 sm:w-32">
          <p className="text-sm text-fg-secondary">{item.label}</p>
          <p className="text-xs font-mono text-fg-quaternary">{item.className}</p>
        </div>
        <p className="text-sm min-w-0 flex-1 text-fg-tertiary">{item.usage}</p>
      </CopyRow>
    ))}
  </div>
)

export const RadiusPreviewList = () => (
  <div className="overflow-hidden rounded-xl border border-border-primary bg-surface">
    <div className="flex items-center gap-4 border-b border-border-primary px-4 py-3 sm:px-5">
      <p className="text-xs-strong w-[7.5rem] shrink-0 text-fg-tertiary sm:w-[120px]">
        Preview
      </p>
      <p className="text-xs-strong w-28 shrink-0 text-fg-tertiary sm:w-32">
        Name
      </p>
      <p className="text-xs-strong min-w-0 flex-1 text-fg-tertiary">Usage</p>
    </div>
    {radii.map((item) => {
      const className = `rounded-${item.name}`
      return (
        <CopyRow key={item.name} copyValue={className}>
          <div className="flex h-[100px] w-[7.5rem] shrink-0 items-center justify-center sm:w-[120px]">
            <div
              className="size-16 bg-background-tertiary sm:size-20"
              style={{ borderRadius: `var(--radius-${item.name})` }}
            />
          </div>
          <div className="flex w-28 shrink-0 flex-col gap-1 sm:w-32">
            <p className="text-sm text-fg-secondary">{item.name}</p>
            <p className="text-xs font-mono text-fg-quaternary">{className}</p>
          </div>
          <div className="text-sm min-w-0 flex-1 text-fg-tertiary">
            <p>{item.usage}</p>
            <p className="text-xs mt-1 font-mono text-fg-quaternary">
              {item.value} · {item.px}
            </p>
          </div>
        </CopyRow>
      )
    })}
  </div>
)
