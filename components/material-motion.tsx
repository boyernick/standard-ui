"use client"

import { useState } from "react"
import { PAGE_INNER } from "@/lib/chrome"
import {
  easings,
  motionGroups,
  type EasingToken,
  type MotionToken,
} from "@/lib/motion-tokens"

const EASE_CLASS: Record<string, string> = {
  "ease-passive": "ease-passive",
  "ease-enter": "ease-enter",
  "ease-move": "ease-move",
  "ease-snap": "ease-snap",
}

const EasingTrack = ({ className, value, onset, usage }: EasingToken) => (
  <div className="group">
    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
      <code className="text-sm font-mono text-fg-primary">{className}</code>
      <span className="text-xs text-fg-tertiary">Hover the track</span>
    </div>
    <div className="relative mt-3 h-10 rounded-xl bg-background-tertiary">
      <span
        aria-hidden
        className={`absolute top-1 left-1 size-8 rounded-lg bg-brand-primary transition-[left] duration-500 motion-reduce:transition-none group-hover:left-[calc(100%-2.25rem)] ${EASE_CLASS[className]}`}
      />
    </div>
    <p className="text-xs mt-2 font-mono text-fg-secondary">
      {value} · onset {onset} · {usage}
    </p>
  </div>
)

const BAND =
  "mt-6 sm:grid sm:grid-cols-[minmax(max-content,2fr)_minmax(max-content,2fr)_minmax(max-content,1fr)_minmax(max-content,1fr)] sm:gap-x-6"

const SUBGRID = "sm:col-span-4 sm:grid sm:grid-cols-subgrid sm:gap-x-6"
const HEAD = "text-xs-strong text-fg-tertiary"
const METRIC =
  "text-xs hidden font-mono text-fg-secondary tabular-nums sm:block sm:text-right"

const TokenRow = ({
  token,
  category,
}: {
  token: MotionToken
  category: string
}) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(token.name)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1200)
    } catch {
      // Clipboard unavailable — nothing useful to show.
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      title={`Copy ${token.name}`}
      className={`grid grid-cols-1 items-center gap-2 ${SUBGRID} w-full cursor-copy border-b border-border-primary-solid py-3 text-left outline-none transition-colors last:border-b-0 hover:bg-background-secondary focus-visible:bg-background-secondary focus-visible:ring-[3px] focus-visible:ring-inset focus-visible:ring-ring/20 sm:items-center`}
    >
      <span className="text-sm min-w-0 truncate font-mono text-fg-primary">
        {token.name}
      </span>
      <span className="text-sm hidden min-w-0 text-fg-secondary sm:block">
        {copied ? "Copied" : `${category} · ${token.usage}`}
      </span>
      <span className={METRIC}>{token.duration}</span>
      <span className={METRIC}>{token.easing}</span>
      <span className="sr-only">{copied ? "Copied" : token.name}</span>
    </button>
  )
}

export const MaterialMotion = () => (
  <div>
    <section
      id="motion"
      aria-labelledby="motion-heading"
      className="scroll-mt-14 border-t border-border-primary"
    >
      <div className={`${PAGE_INNER} py-10`}>
        <h2 id="motion-heading" className="heading-sm text-fg-primary">
          Motion
        </h2>
        <p className="text-sm mt-1 max-w-2xl text-fg-secondary">
          Shared timing and easing bring material changes to life.
        </p>

        <div className="mt-6 grid gap-8 md:grid-cols-2">
          {easings.map((easing) => (
            <EasingTrack key={easing.className} {...easing} />
          ))}
        </div>
      </div>
    </section>

    <section
      id="transition-tokens"
      aria-labelledby="transition-tokens-heading"
      className="scroll-mt-14 border-t border-border-primary"
    >
      <div className={`${PAGE_INNER} py-10`}>
        <h2
          id="transition-tokens-heading"
          className="heading-sm text-fg-primary"
        >
          Transition tokens
        </h2>
        <p className="text-sm mt-1 max-w-2xl text-fg-secondary">
          Purpose-built durations and curves for surfaces, indicators, and
          properties.
        </p>

        <div className={BAND}>
          <div
            className={`${SUBGRID} hidden border-b border-border-primary pb-2 sm:grid`}
          >
            <span className={HEAD}>Token</span>
            <span className={HEAD}>Usage</span>
            <span className={`${HEAD} sm:text-right`}>Duration</span>
            <span className={`${HEAD} sm:text-right`}>Easing</span>
          </div>
          {motionGroups.flatMap((group) =>
            group.tokens.map((token) => (
              <TokenRow
                key={token.name}
                token={token}
                category={group.title}
              />
            )),
          )}
        </div>
      </div>
    </section>

  </div>
)
