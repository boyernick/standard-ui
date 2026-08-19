import Link from "next/link"
import type { ReactNode } from "react"
import { BrandWordmark } from "@boyernick/standard-ui-react"
import { IconFormCircle } from "@central-icons-react/round-outlined-radius-2-stroke-2/IconFormCircle"

function Card({
  href,
  title,
  description,
  children,
}: {
  href?: string
  title: string
  description: string
  children: ReactNode
}) {
  const inner = (
    <>
      <div className="flex min-h-40 items-center justify-center rounded-xl bg-background-tertiary p-6">
        {children}
      </div>
      <div className="px-1 pt-4">
        <h2 className="heading-sm text-fg-primary">{title}</h2>
        <p className="text-sm mt-1 text-fg-secondary">{description}</p>
      </div>
    </>
  )

  const className = "rounded-2xl bg-surface p-3 shadow-hairline"

  if (href) {
    return (
      <Link href={href} className={`${className} block`}>
        {inner}
      </Link>
    )
  }

  return <div className={className}>{inner}</div>
}

function BrandPreview() {
  return <BrandWordmark markSize={28} className="text-fg-primary" />
}

function ComponentsPreview() {
  return (
    <div className="flex w-full max-w-xs flex-wrap items-center justify-center gap-2">
      <span className="h-8 w-24 rounded-md border border-border-primary bg-surface" />
      <span className="text-xs inline-flex h-8 items-center gap-1 rounded-md border border-border-primary bg-surface px-2 text-fg-primary">
        + Button
        <svg viewBox="0 0 12 12" className="size-3 text-fg-tertiary" aria-hidden>
          <path
            d="M3 4.5 6 8l3-3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.3"
          />
        </svg>
      </span>
      <span className="text-xs inline-flex h-8 items-center rounded-md bg-surface px-1">
        <span className="rounded-sm bg-background-tertiary px-2 py-1 text-fg-primary">
          Tab
        </span>
        <span className="px-2 py-1 text-fg-tertiary">Tab</span>
      </span>
      <span className="text-xs inline-flex h-8 items-center gap-1.5 rounded-md border border-border-primary bg-surface px-2 text-fg-primary">
        Alerts
        <span className="text-xs-strong inline-flex size-4 items-center justify-center rounded-full bg-surface-inverted text-fg-inverted">
          2
        </span>
      </span>
      <span className="relative inline-flex h-6 w-10 items-center rounded-full bg-brand-primary">
        <span className="absolute right-0.5 size-5 rounded-full bg-brand-foreground" />
      </span>
      <span className="text-xs inline-flex items-center gap-1.5 text-fg-primary">
        <span className="size-3.5 rounded-full border-[4px] border-fg-primary" />
        Label
      </span>
    </div>
  )
}

function ColorsPreview() {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      <div className="flex">
        {["--gray-0", "--gray-100", "--gray-300", "--gray-500", "--gray-1000"].map(
          (token) => (
            <span
              key={token}
              className="size-6 rounded-full ring-2 ring-background-tertiary first:ml-0 -ml-1.5"
              style={{ background: `var(${token})` }}
            />
          ),
        )}
      </div>
      <div className="flex">
        {[
          "--red-400",
          "--orange-400",
          "--yellow-400",
          "--green-400",
          "--blue-400",
          "--purple-400",
          "--pink-400",
        ].map((token) => (
          <span
            key={token}
            className="size-6 rounded-full ring-2 ring-background-tertiary first:ml-0 -ml-1.5"
            style={{ background: `var(${token})` }}
          />
        ))}
      </div>
    </div>
  )
}

function MaterialsPreview() {
  return (
    <div className="flex items-end gap-3">
      <span className="size-10 rounded-sm bg-surface shadow-sm" />
      <span className="size-12 rounded-md bg-surface shadow-md" />
      <span className="size-14 rounded-lg bg-surface shadow-lg" />
    </div>
  )
}

function StructurePreview() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-2">
      <div className="flex items-end gap-1">
        {[4, 8, 12, 16, 24].map((px) => (
          <span
            key={px}
            className="rounded-sm bg-fg-primary"
            style={{ width: px, height: 20 }}
            aria-hidden
          />
        ))}
      </div>
      <div className="flex overflow-hidden rounded-lg border border-border-primary bg-background-secondary">
        <span className="w-6 shrink-0 border-r border-border-primary bg-surface" />
        <span className="m-1.5 h-10 flex-1 rounded-xs border border-dashed border-border-secondary bg-surface" />
      </div>
    </div>
  )
}

function TypographyPreview() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-1 text-fg-primary">
      <p className="heading-xl-serif">Signifier</p>
      <p className="heading-md">Söhne heading</p>
      <p className="text-sm text-fg-secondary">Body text-sm · text-md</p>
    </div>
  )
}

export function IntroCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card
        href="/brand"
        title="Brand"
        description="Wordmark and foundational brand elements."
      >
        <BrandPreview />
      </Card>
      <Card
        href="/typography"
        title="Typography"
        description="Type scale from 2xl to 2xs, with serif and sans headings."
      >
        <TypographyPreview />
      </Card>
      <Card
        href="/colors"
        title="Colors"
        description="Gray, alpha, and hue scales. Primary actions use grayscale."
      >
        <ColorsPreview />
      </Card>
      <Card
        href="/components/button"
        title="Components"
        description="Form controls, overlays, data display, and layout primitives."
      >
        <ComponentsPreview />
      </Card>
      <Card
        href="/structure"
        title="Structure"
        description="Spacing, widths, grids, and breakpoints."
      >
        <StructurePreview />
      </Card>
      <Card
        href="/materials"
        title="Materials"
        description="Radius and elevation shadows for surfaces and overlays."
      >
        <MaterialsPreview />
      </Card>
      <Card
        href="/icons"
        title="Icons"
        description="Central Icons, round outlined, default 20px."
      >
        <span className="text-fg-primary">
          <IconFormCircle size={32} mode="raw" aria-hidden />
        </span>
      </Card>
      <Card
        href="/motion"
        title="Motion"
        description="Shared transitions for overlays, indicators, and color."
      >
        <div className="flex items-center gap-2">
          <span className="size-8 rounded-md bg-background-quaternary opacity-40" />
          <span className="size-10 rounded-md bg-background-tertiary opacity-70" />
          <span className="size-12 rounded-md border border-border-primary bg-surface shadow-md" />
        </div>
      </Card>
      <Card
        href="/illustrations"
        title="Illustrations"
        description="Empty, error, success, and search artwork for product states."
      >
        <span className="text-fg-tertiary">
          <IconFormCircle size={40} mode="raw" aria-hidden />
        </span>
      </Card>
    </div>
  )
}
