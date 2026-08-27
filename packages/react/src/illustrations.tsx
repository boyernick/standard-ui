import type { ComponentProps, ReactNode } from "react"
import { cn } from "./lib/cn"

/**
 * Small illustrations for empty states.
 *
 * Drawn as SVG on one grid so the whole family shares a stroke weight, a corner
 * radius and an optical bounding box — a row of them lines up without ad-hoc
 * sizing. Colour still comes from theme tokens (`fill-*`/`stroke-*` utilities
 * resolve the same variables the rest of the library uses), so they follow the
 * palette into dark mode with nothing baked in.
 *
 * Deliberately abstract and monochrome — a miniature of the thing that is
 * missing, not a picture about it. Nothing here uses a brand colour: an empty
 * state is a quiet moment, and an accent turns it into an announcement.
 *
 * Three levels of ink, and no others:
 *   structure  `border-secondary`     the edge of a sheet or a folder
 *   content    `fg-quaternary/60`     marks standing in for what is on it
 *   subject    `fg-tertiary/70`       the one thing the illustration is about
 *
 * The opacity modifiers are the whole point of those last two: the foreground
 * tokens at full strength are text ink, and text ink inside a 32px sheet reads
 * as a document someone is expected to be able to *read*. Stepped back, the
 * marks stay legible but sit behind the silhouette, which is what carries the
 * meaning. They are still tokens, so both levels flip with the theme.
 */

export type IllustrationProps = ComponentProps<"div">

/** Fixed 64×48 stage, so a row of these lines up without ad-hoc sizing. */
const Frame = ({ className, children, ...props }: IllustrationProps) => (
  <div
    className={cn(
      "inline-flex h-12 w-16 shrink-0 items-center justify-center",
      className,
    )}
    aria-hidden
    {...props}
  >
    {children}
  </div>
)

/**
 * The grid every illustration is drawn on: 64×48 user units rendered at 64×48
 * CSS pixels, so one unit is one pixel. Geometry sits on half-unit coordinates
 * for that reason — a 1-wide stroke centred on x.5 covers exactly one pixel
 * instead of straddling two and rendering soft.
 */
const Stage = ({ children }: { children: ReactNode }) => (
  <svg
    viewBox="0 0 64 48"
    fill="none"
    strokeWidth={1}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn("size-full", SHADOW)}
  >
    {children}
  </svg>
)

/**
 * Lift off the page. `drop-shadow` rather than `shadow-*`: a box-shadow needs a
 * box, and these are paths — it would draw a rectangle behind a transparent
 * stage. This follows the silhouette instead, so the fold and the torn edge
 * cast a shadow of their own shape.
 *
 * Built from the same variables as the shadow scale, so the alpha steps up in
 * dark mode the way every other shadow in the library does. `overflow-visible`
 * on the stage keeps the blur from being clipped at the viewBox edge, which
 * the 24×30 sheet would otherwise do — it sits half a unit from the bottom.
 */
const SHADOW =
  "overflow-visible [filter:drop-shadow(0_1px_2px_rgb(var(--shadow-color)/var(--shadow-alpha-200)))]"

const SHEET = "fill-surface stroke-border-secondary"
const MARK = "fill-fg-quaternary/60"
const SUBJECT = "stroke-fg-tertiary/70"

/** Filled *and* stroked in the same ink. The stage sets `stroke-linejoin:
 *  round`, so the outline rounds the points of a triangle — a plain fill
 *  leaves them needle-sharp, which is the one thing in here that never looks
 *  drawn. The path is inset by half the stroke to keep the size honest. */
const MARK_SOLID = "fill-fg-quaternary/60 stroke-fg-quaternary/60"

/** The sheet, and the line that closes its folded corner.
 *
 *  The fold is what makes a rounded rectangle read as paper. Without it every
 *  illustration in the family opens on the same anonymous box. */
const SHEET_PATH =
  "M22.5 8.5h12l9 9v22a2 2 0 0 1-2 2h-19a2 2 0 0 1-2-2v-29a2 2 0 0 1 2-2z"
const FOLD_PATH = "M34.5 8.5v7a2 2 0 0 0 2 2h7"

const Sheet = () => (
  <>
    <path d={SHEET_PATH} className={SHEET} />
    <path d={FOLD_PATH} className="stroke-border-secondary" />
  </>
)

/** A line of content on a sheet, on its inner measure of x 25 → 39. */
const Mark = ({ x = 25, y, w }: { x?: number; y: number; w: number }) => (
  <rect x={x} y={y} width={w} height={1.5} rx={0.75} className={MARK} />
)

/** Nothing here yet — a sheet with no content on it. */
export const IllustrationEmpty = ({ className, ...props }: IllustrationProps) => (
  <Frame className={className} {...props}>
    <Stage>
      <Sheet />
    </Stage>
  </Frame>
)

/** Something to look through — a lens over the corner of a sheet.
 *
 *  The lens breaks the corner rather than the side. Sitting against the side it
 *  reads as the handle of a mug, which is what the previous drawing did. */
export const IllustrationSearch = ({
  className,
  ...props
}: IllustrationProps) => (
  <Frame className={className} {...props}>
    <Stage>
      <Sheet />
      <Mark y={25} w={10} />
      <Mark y={28.5} w={7.5} />
      <Mark y={32} w={5} />
      <circle
        cx={42.5}
        cy={34.5}
        r={5.5}
        className={cn("fill-surface", SUBJECT)}
        strokeWidth={1.25}
      />
      <path
        d="M46.5 38.5 49.5 41.5"
        className={SUBJECT}
        strokeWidth={1.25}
      />
    </Stage>
  </Frame>
)

/** Searched, and there was nothing to find — the same lens over a blank sheet.
 *
 *  The pair is the point: `IllustrationSearch` has content under the lens and
 *  means "there is something here to look through"; this one has none, and
 *  means the looking is already done. */
export const IllustrationNoResults = ({
  className,
  ...props
}: IllustrationProps) => (
  <Frame className={className} {...props}>
    <Stage>
      <Sheet />
      <circle
        cx={42.5}
        cy={34.5}
        r={5.5}
        className={cn("fill-surface", SUBJECT)}
        strokeWidth={1.25}
      />
      <path d="M46.5 38.5 49.5 41.5" className={SUBJECT} strokeWidth={1.25} />
    </Stage>
  </Frame>
)

/** Not yours to open — a sheet under a closed clasp.
 *
 *  The sheet is blank on purpose: the reader cannot see what is on it, so
 *  drawing content would promise something the state does not deliver. */
export const IllustrationLocked = ({
  className,
  ...props
}: IllustrationProps) => (
  <Frame className={className} {...props}>
    <Stage>
      <Sheet />
      <path
        d="M29.5 25.5v-2.5a2.5 2.5 0 0 1 5 0v2.5"
        className={SUBJECT}
        strokeWidth={1.25}
      />
      <rect
        x={27}
        y={25.5}
        width={10}
        height={8}
        rx={1.5}
        className={cn("fill-surface", SUBJECT)}
        strokeWidth={1.25}
      />
      <circle cx={32} cy={29.5} r={1} className={MARK} />
    </Stage>
  </Frame>
)

/** Nothing plotted yet — a sheet carrying an axis and no series.
 *
 *  Stubs on the baseline rather than a bare axis: an empty pair of lines reads
 *  as a drawing that failed to finish, while columns flattened to nothing read
 *  as a chart that ran and found no values. */
export const IllustrationNoData = ({
  className,
  ...props
}: IllustrationProps) => (
  <Frame className={className} {...props}>
    <Stage>
      <Sheet />
      <path d="M25.5 19.5v14h13" className="stroke-fg-quaternary/60" />
      <rect x={27.5} y={31.5} width={3} height={2} rx={0.75} className={MARK} />
      <rect x={31.5} y={31.5} width={3} height={2} rx={0.75} className={MARK} />
      <rect x={35.5} y={31.5} width={3} height={2} rx={0.75} className={MARK} />
    </Stage>
  </Frame>
)

/** Something went wrong — the sheet torn across, the lower half slipped.
 *
 *  Two tilted sheets read as "some documents"; a tear reads as damage without
 *  stamping a symbol on anything. */
export const IllustrationError = ({ className, ...props }: IllustrationProps) => (
  <Frame className={className} {...props}>
    <Stage>
      <path
        d="M20.5 10.5a2 2 0 0 1 2-2h12l9 9v11.5L39.5 31 35.5 28.5 31.5 31.5 27.5 28.5 23.5 31 20.5 28.5z"
        className={SHEET}
      />
      <path d={FOLD_PATH} className="stroke-border-secondary" />
      <Mark y={21} w={10} />
      <Mark y={24.5} w={6.5} />
      <path
        d="M23 30 26 32.5 30 29.5 34 32.5 38 30 42 32.5 46 30v9.5a2 2 0 0 1-2 2H25a2 2 0 0 1-2-2z"
        className={SHEET}
      />
    </Stage>
  </Frame>
)

/** Somewhere to put a file — a sheet going into a folder.
 *
 *  The folder is the one shape here that is not another sheet, which keeps it
 *  from reading as the torn stack. Its tab and body are a single outline, so
 *  they meet as one silhouette instead of two rectangles that nearly touch. */
export const IllustrationUpload = ({
  className,
  ...props
}: IllustrationProps) => (
  <Frame className={className} {...props}>
    <Stage>
      {/* One closed silhouette carries every outer edge of the folder — both
          sides, the tab, the bottom. Drawing the back and the front as two
          overlapping outlines painted `border-secondary` over itself wherever
          they shared an edge, and the token is an alpha, so a doubled edge
          composites to roughly twice the strength and reads as a darker line. */}
      <path
        d="M18.5 39.5V22.5a2 2 0 0 1 2-2H26l2.5 3h15a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-23a2 2 0 0 1-2-2z"
        className={SHEET}
      />
      {/* Open at the bottom: the front covers it, and a closed path would put a
          second stroke across the sheet where the two meet. */}
      <path d="M27.5 27V7.5a2 2 0 0 1 2-2h8l4 4V27" className={SHEET} />
      <path
        d="M37.5 5.5v2a2 2 0 0 0 2 2h2"
        className="stroke-border-secondary"
      />
      <Mark x={31} y={14.5} w={6} />
      <Mark x={31} y={18} w={4} />
      {/* The front of the folder: a fill inset to sit *inside* the silhouette's
          stroke, plus the one edge that is genuinely its own. */}
      <path
        d="M19 27h26v12.5a1.5 1.5 0 0 1-1.5 1.5h-23A1.5 1.5 0 0 1 19 39.5z"
        className="fill-background-tertiary"
      />
      <path d="M18.5 26.5h27" className="stroke-border-secondary" />
    </Stage>
  </Frame>
)

/** Done — a sheet carrying a mark. */
export const IllustrationSuccess = ({
  className,
  ...props
}: IllustrationProps) => (
  <Frame className={className} {...props}>
    <Stage>
      <Sheet />
      <path
        d="M28 29 31.5 32.5 37.5 25.5"
        className={SUBJECT}
        strokeWidth={1.75}
      />
    </Stage>
  </Frame>
)

/* -------------------------------------------------------------------------
 * File types
 *
 * A second family on the same grammar, drawn on its own 24×30 grid: these sit
 * inline — in an attachment row, a list, a preview slot — so they are a bare
 * sheet rather than a hero on a stage. Same sheet, same fold, same three
 * levels of ink; only the mark on the sheet changes.
 *
 * Presentational, like Kbd: they render the type you name. Mapping an
 * extension to a type is the consumer's job, since only the consumer knows
 * what it wants to do with the ones it does not recognise.
 * ---------------------------------------------------------------------- */

export type FileIllustrationType =
  | "document"
  | "image"
  | "spreadsheet"
  | "presentation"
  | "video"
  | "audio"
  | "code"
  | "archive"
  | "generic"

export type IllustrationFileProps = IllustrationProps & {
  type?: FileIllustrationType
}

/** 24×30 user units at 24×30 CSS pixels, so a unit is a pixel here too. */
const FileStage = ({ children }: { children: ReactNode }) => (
  <svg
    viewBox="0 0 24 30"
    fill="none"
    strokeWidth={1}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn("size-full", SHADOW)}
  >
    {children}
  </svg>
)

const FILE_SHEET_PATH =
  "M3.5 .5h12l7 7v20a2 2 0 0 1-2 2h-17a2 2 0 0 1-2-2V2.5a2 2 0 0 1 2-2z"
const FILE_FOLD_PATH = "M15.5 .5v5a2 2 0 0 0 2 2h5"

/** A line of content, on the sheet's inner measure of x 5 → 19. */
const FileMark = ({
  x = 6.5,
  y,
  w,
  h = 1.5,
}: {
  x?: number
  y: number
  w: number
  h?: number
}) => <rect x={x} y={y} width={w} height={h} rx={h / 2} className={MARK} />

/** Marks are centred in the space below the fold, y 9 → 27. */
const marks: Record<FileIllustrationType, ReactNode> = {
  document: (
    <>
      <FileMark y={14} w={10} />
      <FileMark y={17.5} w={10} />
      <FileMark y={21} w={6.5} />
    </>
  ),
  // A horizon and a sun — the smallest arrangement that reads as a picture.
  image: (
    <>
      <circle cx={15.5} cy={14} r={1.2} className={MARK} />
      <path
        d="M7 20.5l3-3.75 2 2.75 1.75-2L17 20.5z"
        className={MARK_SOLID}
      />
    </>
  ),
  spreadsheet: (
    <>
      {[14, 17.5, 21].map((y) =>
        [6.5, 10.5, 14.5].map((x) => (
          <rect
            key={`${x}-${y}`}
            x={x}
            y={y}
            width={3}
            height={2.5}
            rx={0.5}
            className={MARK}
          />
        )),
      )}
    </>
  ),
  presentation: (
    <>
      <rect x={7} y={13.5} width={10} height={6} rx={1} className={MARK} />
      <FileMark x={7} y={21.5} w={6} />
    </>
  ),
  video: <path d="M10 14.75 15.25 18 10 21.25z" className={MARK_SOLID} />,
  audio: (
    <>
      {[
        [6.875, 16.5, 3],
        [9.125, 15.25, 5.5],
        [11.375, 14, 8],
        [13.625, 15.25, 5.5],
        [15.875, 16.5, 3],
      ].map(([x, y, h]) => (
        <rect
          key={x}
          x={x}
          y={y}
          width={1.25}
          height={h}
          rx={0.625}
          className={MARK}
        />
      ))}
    </>
  ),
  // Chevrons rather than indented lines: at 24px the indents read as ragged
  // text, while the brackets say "code" on their own.
  code: (
    <>
      <path
        d="M10 14.5 7.5 18 10 21.5"
        className="stroke-fg-quaternary/60"
        strokeWidth={1.25}
      />
      <path
        d="M14 14.5 16.5 18 14 21.5"
        className="stroke-fg-quaternary/60"
        strokeWidth={1.25}
      />
    </>
  ),
  // Sheets inside a sheet, since an archive is other files in a coat. Bars in
  // any arrangement just read as a heavier `document`.
  archive: (
    <>
      <rect
        x={6.5}
        y={13.5}
        width={6}
        height={7.5}
        rx={1}
        className="fill-surface stroke-fg-quaternary/60"
      />
      <rect
        x={10.5}
        y={16}
        width={6}
        height={7.5}
        rx={1}
        className="fill-surface stroke-fg-quaternary/60"
      />
    </>
  ),
  generic: null,
}

/** One file, drawn as the kind of thing it holds. */
export const IllustrationFile = ({
  type = "generic",
  className,
  ...props
}: IllustrationFileProps) => (
  <div
    className={cn("inline-flex h-[30px] w-6 shrink-0", className)}
    aria-hidden
    {...props}
  >
    <FileStage>
      <path d={FILE_SHEET_PATH} className={SHEET} />
      <path d={FILE_FOLD_PATH} className="stroke-border-secondary" />
      {marks[type]}
    </FileStage>
  </div>
)
