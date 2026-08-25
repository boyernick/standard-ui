import {
  IconBell,
  IconCalendar1,
  IconChainLink1,
  IconCheckmark1,
  IconChevronRightSmall,
  IconCircleCheck,
  IconCircleInfo,
  IconClipboard,
  IconCrossSmall,
  IconDotGrid1x3Horizontal,
  IconExclamationCircle,
  IconFullScreen,
  IconHome,
  IconMagnifyingGlass,
  IconMinus,
  IconMoon,
  IconPause,
  IconPeople,
  IconPlay,
  IconPlus,
  IconSettingsGear1,
  IconSquareBehindSquare6,
  IconStar,
  IconSun,
} from "@boyernick/standard-ui-react"
import Link from "next/link"
import type { ReactNode } from "react"
import { PAGE_INNER_LEFT, PAGE_INNER_RIGHT } from "@/lib/chrome"

/** Cell padding. The outer edge tracks the page measure so the text lines up
 *  with the header above it; the inner edge is a fixed gutter beside the
 *  divider. These are plain strings with no `cn` to resolve conflicts, so the
 *  inner edge deliberately stops at `md:` — adding the `lg:` step from
 *  `PAGE_INNER_*` would win the cascade and swallow the gutter. */
const CELL_LEFT = `${PAGE_INNER_LEFT} pr-4 md:pr-10`
const CELL_RIGHT = `pl-4 md:pl-10 ${PAGE_INNER_RIGHT}`

const cellClassName =
  "group flex min-w-0 flex-col py-8 outline-none transition-colors hover:bg-background-secondary focus-visible:bg-background-secondary"

/** One destination in the grid. The specimen is inert — the whole cell is a
 *  single link, so a control inside it must not take the press. */
const Cell = ({
  href,
  title,
  description,
  className,
  children,
}: {
  href: string
  title: string
  description: string
  className: string
  children: ReactNode
}) => (
  <Link href={href} className={`${cellClassName} ${className}`}>
    <div className="pointer-events-none flex h-44 w-full min-w-0 items-center justify-start select-none">
      {children}
    </div>
    <h2 className="heading-sm mt-6 text-fg-primary">{title}</h2>
    <p className="text-sm mt-1 max-w-2xl text-fg-secondary">{description}</p>
  </Link>
)

/** A row of the grid. The rule above is full-bleed like every band on the
 *  site; the divider between columns is interior to the row. */
const Row = ({ first, children }: { first?: boolean; children: ReactNode }) => (
  <div
    className={`grid md:grid-cols-2 md:divide-x md:divide-border-primary ${
      first ? "" : "border-t border-border-primary"
    }`}
  >
    {children}
  </div>
)

const TypographyPreview = () => (
  <div
    className="flex items-baseline text-fg-tertiary"
    aria-label="Signifier and Söhne typography specimen"
  >
    <span className="font-serif text-7xl leading-none font-normal">Aa</span>
    <span className="font-sans text-7xl leading-none font-normal">Aa</span>
  </div>
)

const colorGroups = [
  [
    "bg-background-secondary/60",
    "bg-background-secondary",
    "bg-background-tertiary",
  ],
  ["bg-background-tertiary", "bg-fg-tertiary", "bg-fg-primary"],
  ["bg-status-critical", "bg-status-success", "bg-status-info"],
] as const

const ColorsPreview = () => (
  <div
    className="flex w-full min-w-0 items-stretch gap-2 sm:gap-3"
    aria-label="Semantic color groups"
  >
    {colorGroups.map((group) => (
      <div
        key={group[0]}
        className="flex aspect-square w-full min-w-0 max-w-20 flex-1 gap-1 rounded-xl border border-dashed border-border-primary bg-surface p-1.5 sm:p-2"
      >
        {group.map((swatch) => (
          <span
            key={swatch}
            className={`min-w-0 flex-1 rounded-md shadow-hairline ${swatch}`}
          />
        ))}
      </div>
    ))}
  </div>
)

/** Listed here rather than taken from the package's `iconGallery`: that array
 *  lives in a `"use client"` module, so a server component importing it gets a
 *  client reference instead of the array itself. Icon *components* cross the
 *  boundary fine, which is what this maps over. */
const galleryIcons = [
  IconHome,
  IconMagnifyingGlass,
  IconSettingsGear1,
  IconBell,
  IconPeople,
  IconCalendar1,
  IconClipboard,
  IconStar,
  IconCheckmark1,
  IconPlus,
  IconMinus,
  IconPause,
  IconCircleCheck,
  IconCircleInfo,
  IconChevronRightSmall,
  IconSquareBehindSquare6,
  IconChainLink1,
  IconCrossSmall,
  IconDotGrid1x3Horizontal,
  IconExclamationCircle,
  IconFullScreen,
  IconMoon,
  IconPlay,
  IconSun,
]

const IconsPreview = () => (
  <div className="grid w-full min-w-0 grid-cols-8 gap-x-2 gap-y-3 text-fg-tertiary sm:gap-x-4">
    {galleryIcons.map((Icon, index) => (
      <Icon key={index} size={20} aria-hidden />
    ))}
  </div>
)

const MaterialsPreview = () => (
  <div className="flex w-full min-w-0 items-end gap-2 p-1 sm:gap-3">
    <span className="aspect-square w-full min-w-0 max-w-20 flex-1 rounded-xl bg-background-primary shadow-hairline" />
    <span className="aspect-square w-full min-w-0 max-w-20 flex-1 rounded-xl bg-background-primary shadow-md" />
    <span className="aspect-square w-full min-w-0 max-w-20 flex-1 rounded-xl bg-background-primary shadow-xl" />
  </div>
)

export const IntroCards = () => (
  <div>
    <Row first>
      <Cell
        href="/colors"
        title="Colors"
        description="Subtle, yet elevated color palette."
        className={CELL_LEFT}
      >
        <ColorsPreview />
      </Cell>
      <Cell
        href="/typography"
        title="Typography"
        description="Set in Signifier and Söhne."
        className={CELL_RIGHT}
      >
        <TypographyPreview />
      </Cell>
    </Row>

    <Row>
      <Cell
        href="/materials"
        title="Materials"
        description="Shape, depth, and movement for interface surfaces."
        className={CELL_LEFT}
      >
        <MaterialsPreview />
      </Cell>
      <Cell
        href="/icons"
        title="Icons"
        description="Library of all svg icons."
        className={CELL_RIGHT}
      >
        <IconsPreview />
      </Cell>
    </Row>
  </div>
)
