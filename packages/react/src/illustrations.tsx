import type { ComponentProps, ReactNode } from "react"
import { cn } from "./lib/cn"

/**
 * Small, composition-based illustrations for empty states.
 *
 * Built from divs and theme tokens rather than SVG paths, so they follow the
 * palette into dark mode instead of carrying baked-in colours. They are
 * deliberately abstract and monochrome — a miniature of the thing that is
 * missing, not a picture about it. Nothing here uses a brand colour: an empty
 * state is a quiet moment, and an accent turns it into an announcement.
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

/** A sheet. The hairline and radius are sub-pixel on purpose — at this size a
 *  1px border reads as a heavy outline rather than an edge. */
const Card = ({
  className,
  children,
}: {
  className?: string
  children?: ReactNode
}) => (
  <div
    className={cn(
      "relative flex shrink-0 flex-col overflow-hidden rounded-[3px] border-[0.5px] border-border-primary bg-surface p-1 shadow-hairline",
      className,
    )}
  >
    {children}
  </div>
)

/** A line of content. */
const Bar = ({ width }: { width: string }) => (
  <div
    className="h-[3px] shrink-0 rounded-[1px] bg-background-tertiary"
    style={{ width }}
  />
)

/** Nothing here yet — a sheet with no content on it. */
export const IllustrationEmpty = ({ className, ...props }: IllustrationProps) => (
  <Frame className={className} {...props}>
    <Card className="h-10 w-8" />
  </Frame>
)

/** Something to look through — a sheet behind a lens. */
export const IllustrationSearch = ({
  className,
  ...props
}: IllustrationProps) => (
  <Frame className={className} {...props}>
    <Card className="h-10 w-8 gap-[3px]">
      <Bar width="80%" />
      <Bar width="55%" />
      <Bar width="35%" />
    </Card>
    <div className="-ml-2.5 mt-4 size-4 rounded-full border-[1.5px] border-border-secondary bg-surface" />
  </Frame>
)

/** Something went wrong — the stack knocked out of true. */
export const IllustrationError = ({ className, ...props }: IllustrationProps) => (
  <Frame className={className} {...props}>
    <Card className="h-9 w-7 -rotate-6" />
    <Card className="-ml-3 h-10 w-8 rotate-[7deg] gap-[3px]">
      <Bar width="70%" />
      <Bar width="45%" />
    </Card>
  </Frame>
)

/** Somewhere to put a file — a sheet going into a folder.
 *
 *  Two earlier attempts failed for the same reason: an arrow stamped on a
 *  sheet, then a sheet on a plain grey slab, both read as a document with
 *  something next to it. A folder is its own silhouette — tab, body, a sheet
 *  tucked behind the front — so the arrangement carries the meaning and no
 *  symbol has to. It is also the one shape here that is not another sheet,
 *  which keeps it from reading as the error stack. */
export const IllustrationUpload = ({
  className,
  ...props
}: IllustrationProps) => (
  <Frame className={className} {...props}>
    <div className="relative h-11 w-12">
      {/* Tucked deep enough that the folder front cuts across it. */}
      <Card className="absolute inset-x-[13px] top-0 h-8 -rotate-6 gap-[3px]">
        <Bar width="70%" />
        <Bar width="45%" />
      </Card>
      {/* Laps 1px into the body so their borders read as one outline. */}
      <div className="absolute bottom-[21px] left-1 h-1.5 w-4 rounded-t-[2px] border-x-[0.5px] border-t-[0.5px] border-border-secondary bg-background-tertiary" />
      <div className="absolute inset-x-1 bottom-0 h-[22px] rounded-[3px] border-[0.5px] border-border-secondary bg-background-tertiary" />
    </div>
  </Frame>
)

/** Done — a sheet carrying a mark. */
export const IllustrationSuccess = ({
  className,
  ...props
}: IllustrationProps) => (
  <Frame className={className} {...props}>
    <Card className="h-10 w-8 items-center justify-center">
      {/* A check is cheaper as two borders on a rotated box than as a path. */}
      <span className="mb-0.5 h-3 w-1.5 rotate-45 border-r-[1.5px] border-b-[1.5px] border-fg-tertiary" />
    </Card>
  </Frame>
)

/* -------------------------------------------------------------------------
 * File types
 *
 * A second, smaller family. These sit inline — in an attachment row, a list,
 * a preview slot — so they are a bare sheet at 24×30 rather than a hero on a
 * 64×48 stage. Same grammar: a sheet, and marks on it standing in for whatever
 * the file holds.
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

/** A block of colour standing in for content rather than a line of it. */
const Block = ({ className }: { className?: string }) => (
  <div className={cn("rounded-[1px] bg-background-tertiary", className)} />
)

const marks: Record<FileIllustrationType, ReactNode> = {
  document: (
    <>
      <Bar width="100%" />
      <Bar width="100%" />
      <Bar width="60%" />
    </>
  ),
  // A horizon and a sun — the smallest arrangement that reads as a picture.
  image: (
    <div className="relative mt-auto h-3.5 w-full">
      <Block className="absolute top-0 right-1 size-1.5 rounded-full" />
      <Block className="absolute inset-x-0 bottom-0 h-2 [clip-path:polygon(0_100%,38%_28%,62%_100%)]" />
      <Block className="absolute right-0 bottom-0 h-1.5 w-1/2 [clip-path:polygon(0_100%,50%_20%,100%_100%)]" />
    </div>
  ),
  spreadsheet: (
    <div className="grid h-full w-full grid-cols-3 grid-rows-3 gap-[1.5px]">
      {Array.from({ length: 9 }, (_, i) => (
        <Block key={i} />
      ))}
    </div>
  ),
  presentation: (
    <>
      <Block className="h-2.5 w-full" />
      <Bar width="70%" />
    </>
  ),
  // A play triangle, cut from a block so it keeps the same fill as everything else.
  video: (
    <div className="m-auto size-3">
      <Block className="size-full [clip-path:polygon(22%_10%,90%_50%,22%_90%)]" />
    </div>
  ),
  audio: (
    <div className="m-auto flex h-3.5 items-center gap-[2px]">
      <Block className="h-1.5 w-[2px]" />
      <Block className="h-3.5 w-[2px]" />
      <Block className="h-2.5 w-[2px]" />
      <Block className="h-3.5 w-[2px]" />
      <Block className="h-1.5 w-[2px]" />
    </div>
  ),
  code: (
    <>
      <Bar width="55%" />
      <div className="flex w-full pl-1.5">
        <Bar width="70%" />
      </div>
      <div className="flex w-full pl-1.5">
        <Bar width="50%" />
      </div>
      <Bar width="40%" />
    </>
  ),
  // A stack, since an archive is other files in a coat.
  archive: (
    <div className="m-auto flex flex-col gap-[2px]">
      <Block className="h-1.5 w-2.5" />
      <Block className="h-1.5 w-2.5" />
      <Block className="h-1.5 w-2.5" />
    </div>
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
    className={cn(
      "relative flex h-[30px] w-6 shrink-0 flex-col gap-[3px] overflow-hidden rounded-[3px] border-[0.5px] border-border-primary bg-surface p-1 shadow-hairline",
      className,
    )}
    aria-hidden
    {...props}
  >
    {marks[type]}
  </div>
)
