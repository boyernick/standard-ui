"use client"

import { IconClipboard } from "@central-icons-react/round-outlined-radius-2-stroke-2/IconClipboard"
import type { ReactNode } from "react"
import { useEffect, useId, useRef, useState } from "react"
import {
  alphaRow,
  grayscaleRows,
  primaryHueScales,
  type ColorSwatch,
  type SwatchInvert,
} from "@/lib/color-palette"

const invertClass = (invert?: SwatchInvert) => {
  if (invert === "both") return "text-white dark:text-black"
  if (invert === "light") return "text-white"
  if (invert === "dark") return "dark:text-black"
  return undefined
}

const PaletteFrame = ({ children }: { children: ReactNode }) => (
  <div className="mt-4 overflow-hidden rounded-xl border border-border-primary">
    <div className="overflow-x-auto overscroll-x-contain">{children}</div>
  </div>
)

const CopyChip = ({
  label,
  value,
}: {
  label: string
  value: string
}) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value)
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
      className="text-xs inline-flex max-w-full items-center gap-1.5 rounded-md px-1.5 py-0.5 font-mono font-medium text-fg-inverted transition-colors hover:bg-elevated"
      aria-label={copied ? "Copied" : `Copy ${label}`}
    >
      <span className="truncate">{copied ? "Copied" : label}</span>
      <IconClipboard size={12} aria-hidden className="shrink-0 opacity-75" />
    </button>
  )
}

const ColorCell = ({
  family,
  swatch,
  className = "",
}: {
  family: string
  swatch: ColorSwatch
  className?: string
}) => {
  const token = `${family}-${swatch.weight}`
  const cssVar = `var(--${token})`
  const tooltipId = useId()
  const [open, setOpen] = useState(false)
  const closeTimer = useRef<number | null>(null)
  const openTimer = useRef<number | null>(null)

  const clearTimers = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current)
    if (openTimer.current) window.clearTimeout(openTimer.current)
    closeTimer.current = null
    openTimer.current = null
  }

  const handleOpen = () => {
    clearTimers()
    openTimer.current = window.setTimeout(() => setOpen(true), 300)
  }

  const handleClose = () => {
    clearTimers()
    closeTimer.current = window.setTimeout(() => setOpen(false), 100)
  }

  useEffect(() => () => clearTimers(), [])

  const swatchNode = (
    <div
      role="button"
      tabIndex={0}
      aria-describedby={open ? tooltipId : undefined}
      aria-label={`${token}, ${swatch.value}`}
      className={[
        "group relative h-16 w-full cursor-pointer sm:h-20",
        invertClass(swatch.invert),
        swatch.bordered
          ? "shadow-[inset_0_0_0_1px_var(--gray-50)] dark:shadow-none"
          : "",
      ].join(" ")}
      style={{ backgroundColor: cssVar }}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault()
          setOpen((value) => !value)
        }
        if (event.key === "Escape") setOpen(false)
      }}
    >
      <span
        aria-hidden
        className={[
          "pointer-events-none absolute inset-0.5 shadow-[inset_0_0_0_2px_currentColor] opacity-0 transition-opacity duration-150",
          open
            ? "opacity-100"
            : "group-hover:opacity-100 group-focus-visible:opacity-100",
        ].join(" ")}
      />
      <span className="text-xs absolute bottom-2 left-2 font-semibold sm:bottom-2.5 sm:left-2.5">
        {swatch.weight}
      </span>
    </div>
  )

  return (
    <div
      className={["relative min-w-12 flex-1 shrink-0", className].join(" ")}
      onMouseEnter={handleOpen}
      onMouseLeave={handleClose}
      onFocus={handleOpen}
      onBlur={handleClose}
    >
      {swatch.alpha ? (
        <div
          className="h-16 w-full sm:h-20"
          style={{
            backgroundImage: [
              "radial-gradient(circle, var(--surface) 0 1px, transparent 1.1px)",
              "radial-gradient(circle, var(--gray-100) 0 1px, transparent 1.1px)",
            ].join(", "),
            backgroundPosition: "0 0, 4px 4px",
            backgroundSize: "8px 8px",
          }}
        >
          {swatchNode}
        </div>
      ) : (
        swatchNode
      )}

      {open ? (
        <div
          id={tooltipId}
          role="tooltip"
          className="absolute bottom-[calc(100%-10px)] left-1/2 z-20 -translate-x-1/2 rounded-lg border border-border-primary bg-surface-inverted p-2 shadow-md"
          onMouseEnter={handleOpen}
          onMouseLeave={handleClose}
        >
          <div className="flex flex-col items-start gap-0.5">
            <CopyChip label={token} value={cssVar} />
            <div className="hidden md:block">
              <CopyChip label={swatch.value} value={swatch.value} />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

const SwatchRow = ({
  family,
  swatches,
  className = "",
  reverseInDark = false,
}: {
  family: string
  swatches: Array<ColorSwatch | null>
  className?: string
  reverseInDark?: boolean
}) => (
  <div
    className={[
      "flex w-max min-w-full",
      reverseInDark ? "dark:flex-row-reverse" : "",
      className,
    ].join(" ")}
  >
    {swatches.map((swatch, index) => {
      if (!swatch) {
        return (
          <div key={`pad-${index}`} className="min-w-12 flex-1 shrink-0" />
        )
      }

      return (
        <ColorCell
          key={`${family}-${swatch.weight}`}
          family={family}
          swatch={swatch}
        />
      )
    })}
  </div>
)

export const ColorsPalette = () => (
  <div className="flex flex-col gap-8 sm:gap-10">
    <section>
      <h2 id="grayscale" className="heading-sm text-fg-primary">
        Grayscale
      </h2>
      <PaletteFrame>
        <div className="text-black dark:text-white">
          <SwatchRow family="gray" swatches={grayscaleRows[0]} />
        </div>
        <div className="text-white dark:text-black">
          <SwatchRow family="gray" swatches={grayscaleRows[1]} />
        </div>
      </PaletteFrame>
    </section>

    <section>
      <h2 id="alphas" className="heading-sm text-fg-primary">
        Alphas
      </h2>
      <PaletteFrame>
        <div className="text-black dark:text-white">
          <SwatchRow family="alpha" swatches={alphaRow} />
        </div>
      </PaletteFrame>
    </section>

    <section>
      <h2 id="primary-colors" className="heading-sm text-fg-primary">
        Primary colors
      </h2>
      <div className="mt-4 flex flex-col gap-4 sm:gap-6">
        {primaryHueScales.map((scale) => {
          const pads = Array.from(
            { length: scale.solids.length - scale.alphas.length },
            () => null,
          )
          const label =
            scale.family.charAt(0).toUpperCase() + scale.family.slice(1)
          return (
            <div key={scale.id}>
              <h3 className="text-sm-strong text-fg-primary">{label}</h3>
              <div className="mt-2 overflow-hidden rounded-xl border border-border-primary">
                <div className="overflow-x-auto overscroll-x-contain">
                  <div className="text-black dark:text-white">
                    <SwatchRow family={scale.family} swatches={scale.solids} />
                  </div>
                  <div className="dark:text-white">
                    <SwatchRow
                      family={scale.family}
                      swatches={[...scale.alphas, ...pads]}
                      reverseInDark
                    />
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  </div>
)
