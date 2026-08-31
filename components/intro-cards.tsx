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
 *  with the header above it; the inner edge is the gutter beside the divider.
 *
 *  The inner gutter is half the outer padding at every step, which makes the
 *  space *between* the two blocks equal the space from the page edge to the
 *  content — 224px either way at `3xl`. Held at a flat 40px it was 5.6× tighter
 *  than the outer edge on a wide screen, so the right-hand block hugged the
 *  divider while a quarter of the row sat empty beside it.
 *
 *  Written out rather than reusing `PAGE_INNER_*`: these are plain strings with
 *  no `cn` to resolve conflicts, and that constant carries both sides, so the
 *  outer edge would win the cascade and swallow the gutter. Each side's padding
 *  therefore comes from exactly one source. */
const CELL_LEFT = `${PAGE_INNER_LEFT} pr-4 md:pr-5 lg:pr-7 xl:pr-12 2xl:pr-20 3xl:pr-28`
const CELL_RIGHT = `pl-4 md:pl-5 lg:pl-7 xl:pl-12 2xl:pl-20 3xl:pl-28 ${PAGE_INNER_RIGHT}`

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
 *  site; the divider between columns is interior to the row.
 *
 *  `last` makes the row absorb the leftover height. The page's own height is
 *  only ~945px, so on any viewport taller than that the grid used to stop
 *  where its text stopped while the fixed footer stayed pinned to the bottom
 *  — leaving the column divider hanging in open space above the footer rule.
 *  Growing the row is what closes that gap; drawing a longer line would put a
 *  column boundary below the columns it divides. `flex-1` cannot shrink the
 *  row below its content (min-height stays `auto`), so shorter viewports keep
 *  scrolling exactly as before. Tied to `md:` because that is where the
 *  divider itself starts — below it the rows are a single column with no
 *  divider to strand, so there is nothing to close and no reason to grow a
 *  cell's tap target into empty space. */
const Row = ({
  first,
  last,
  children,
}: {
  first?: boolean
  last?: boolean
  children: ReactNode
}) => (
  <div
    className={`grid md:grid-cols-2 md:divide-x md:divide-border-primary ${
      first ? "" : "border-t border-border-primary"
    } ${last ? "md:flex-1" : ""}`}
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

/** Surfaces, then text, then status — each card one family.
 *
 *  The first two are ramps and are spaced to *read* as ramps: the surface steps
 *  are about 5.5% apart in luminance rather than the 0.4% the old
 *  `background-secondary/60` → `background-secondary` pair sat at, which made
 *  the card look blank on a white page. No token appears in two cards. */
const colorGroups = [
  [
    "bg-background-secondary",
    "bg-background-quaternary",
    "bg-background-active",
  ],
  ["bg-fg-quaternary", "bg-fg-secondary", "bg-fg-primary"],
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
        // Fixed 80 with one padding value, because the swatches divide it: 80
        // − 2 border − 16 padding − 8 gap = 54, and 54 / 3 = 18 exactly. Fluid
        // widths put the three `flex-1` children on thirds of a fractional
        // number, which snapped to 33/32/33 device pixels and read as uneven
        // spacing. Three 80px cards still fit a 320px viewport.
        className="flex aspect-square w-20 shrink-0 gap-1 rounded-xl border border-dashed border-border-primary bg-surface p-2"
      >
        {group.map((swatch) => (
          <span
            key={swatch}
            // Concentric with the card: inner radius = outer − padding, so
            // `rounded-xl` (12px) at `p-2` (8px) gives 4px.
            className={`min-w-0 flex-1 rounded-xs shadow-hairline ${swatch}`}
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
  <div className="grid w-max max-w-full grid-cols-8 gap-x-4 gap-y-3 text-fg-tertiary">
    {galleryIcons.map((Icon, index) => (
      <Icon key={index} size={20} aria-hidden />
    ))}
  </div>
)

/** Three ways a surface can sit on the page: a flat edge, an elevated one, and
 *  the glass material. The third takes no `bg-*` — the material paints its own
 *  fill, and a background under it would sit behind its translucency. */
const MATERIAL_BOX = "aspect-square w-full min-w-0 max-w-20 flex-1 rounded-xl"

const MaterialsPreview = () => (
  <div className="flex w-full min-w-0 items-end gap-2 p-1 sm:gap-3">
    <span
      className={`${MATERIAL_BOX} bg-background-primary shadow-hairline`}
    />
    <span className={`${MATERIAL_BOX} bg-background-primary shadow-lg`} />
    <span className={`${MATERIAL_BOX} glass`} />
  </div>
)

export const IntroCards = () => (
  <div className="flex flex-1 flex-col">
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

    <Row last>
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
