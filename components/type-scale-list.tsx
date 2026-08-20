"use client"

import { typeScale, type TypeSpecimen } from "@/lib/type-scale"
import { useCopy } from "@/lib/use-copy"

const SpecKbd = ({ children }: { children: string }) => (
  <kbd className="text-xs inline-flex w-fit rounded-md border border-border-primary bg-background-tertiary px-1.5 py-0.5 font-mono text-fg-secondary tabular-nums">
    {children}
  </kbd>
)

const styleLabel = (item: TypeSpecimen) =>
  item.family === "Signifier" ? "Serif" : "Sans"

const TypeSpecimenRow = ({ item }: { item: TypeSpecimen }) => {
  const { copied, copy } = useCopy()

  const handleCopy = () => copy(item.token)

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? "Copied" : `Copy ${item.token}`}
      title={copied ? "Copied" : `Copy ${item.token}`}
      className="flex cursor-pointer flex-col gap-3 px-4 py-5 text-left transition-colors hover:bg-background-tertiary focus-visible:bg-background-tertiary outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-offset-1 focus-visible:ring-offset-background-primary focus-visible:ring-ring/20 md:col-span-5 md:grid md:grid-cols-subgrid md:items-center md:gap-x-6 md:px-5 md:py-6"
    >
      <span className={`${item.className} min-w-0 text-fg-primary`}>
        {copied ? "Copied" : item.sample}
      </span>
      <div className="flex flex-wrap gap-2 md:contents">
        <SpecKbd>{styleLabel(item)}</SpecKbd>
        <SpecKbd>{item.size}</SpecKbd>
        <SpecKbd>{item.weight}</SpecKbd>
        <SpecKbd>{item.lineHeight}</SpecKbd>
      </div>
    </button>
  )
}

export const TypeScaleList = () => (
  <div className="overflow-hidden rounded-xl border border-border-primary bg-surface">
    <div className="grid grid-cols-1 divide-y divide-border-primary md:grid-cols-[minmax(12rem,1fr)_auto_auto_auto_auto] md:gap-x-6">
      <div className="hidden md:col-span-5 md:grid md:grid-cols-subgrid md:items-center md:px-5 md:py-3">
        <p className="text-xs-strong text-fg-tertiary">Example</p>
        <p className="text-xs-strong text-fg-tertiary">Style</p>
        <p className="text-xs-strong text-fg-tertiary">Size</p>
        <p className="text-xs-strong text-fg-tertiary">Weight</p>
        <p className="text-xs-strong text-fg-tertiary">Line</p>
      </div>
      {typeScale.map((item) => (
        <TypeSpecimenRow key={item.token} item={item} />
      ))}
    </div>
  </div>
)
