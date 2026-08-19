"use client"

import { useState, type ReactNode } from "react"
import { EdgeFade } from "@/components/edge-fade"
import { glass, radii, shadows } from "@/lib/tokens"

const radiusClassName = {
  "2xs": "rounded-2xs",
  xs: "rounded-xs",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
  "3xl": "rounded-3xl",
  "4xl": "rounded-4xl",
  full: "rounded-full",
} as const

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
      className="group flex w-full cursor-pointer items-center gap-4 border-b border-border-primary px-4 py-6 text-left transition-colors last:border-b-0 hover:bg-background-tertiary focus-visible:bg-background-tertiary outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-offset-1 focus-visible:ring-offset-background-primary focus-visible:ring-ring/20 sm:px-5"
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
      const className = radiusClassName[item.name]
      return (
        <CopyRow key={item.name} copyValue={className}>
          <div className="flex h-[100px] w-[7.5rem] shrink-0 items-center justify-center sm:w-[120px]">
            <div
              className={`size-16 bg-background-tertiary sm:size-20 ${className}`}
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

export const GlassPreview = () => (
  <div className="rounded-xl border border-border-primary bg-surface">
    {/* No overflow-hidden here — it breaks backdrop-filter sampling */}
    <div className="relative h-56 rounded-t-xl bg-background-secondary">
      <div className="absolute inset-0 overflow-y-auto px-4 pt-3 pb-10 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <ul className="space-y-2 text-sm text-fg-secondary">
          {[
            "Notes",
            "References",
            "Inspiration",
            "Screenshots",
            "Articles",
            "Voice memos",
            "PDFs",
            "Bookmarks",
            "Drafts",
            "Archives",
          ].map((item) => (
            <li
              key={item}
              className="rounded-md bg-surface px-3 py-2 text-fg-primary shadow-sm"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-12 rounded-t-xl">
        <EdgeFade edge="top" tone="background-primary" />
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-12">
        <EdgeFade edge="bottom" tone="background-primary" />
      </div>
    </div>
    <div className="rounded-b-xl border-t border-border-primary px-4 py-3 sm:px-5">
      <p className="text-sm text-fg-tertiary">
        Scroll the list — masked{" "}
        <span className="font-mono text-fg-quaternary">backdrop-blur-md</span>{" "}
        and tint share one fade so the edge reads as glass, not a milky wash.
      </p>
    </div>
  </div>
)

export const GlassTokenList = () => (
  <div className="overflow-hidden rounded-xl border border-border-primary bg-surface">
    <div className="flex items-center gap-4 border-b border-border-primary px-4 py-3 sm:px-5">
      <p className="text-xs-strong w-28 shrink-0 text-fg-tertiary sm:w-32">
        Name
      </p>
      <p className="text-xs-strong w-40 shrink-0 text-fg-tertiary sm:w-48">
        Recipe
      </p>
      <p className="text-xs-strong min-w-0 flex-1 text-fg-tertiary">Usage</p>
    </div>
    {glass.map((item) => (
      <CopyRow key={item.name} copyValue={item.className}>
        <div className="flex w-28 shrink-0 flex-col gap-1 sm:w-32">
          <p className="text-sm text-fg-secondary">{item.label}</p>
          <p className="text-xs font-mono text-fg-quaternary">{item.value}</p>
        </div>
        <p className="text-xs w-40 shrink-0 font-mono text-fg-quaternary sm:w-48">
          {item.className}
        </p>
        <p className="text-sm min-w-0 flex-1 text-fg-tertiary">{item.usage}</p>
      </CopyRow>
    ))}
  </div>
)
