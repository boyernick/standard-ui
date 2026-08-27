"use client"

import {
  IllustrationEmpty,
  IllustrationError,
  IllustrationFile,
  IllustrationLocked,
  IllustrationNoData,
  IllustrationNoResults,
  IllustrationSearch,
  IllustrationSuccess,
  IllustrationUpload,
  type FileIllustrationType,
  type IllustrationProps,
} from "@boyernick/standard-ui-react"
import type { ComponentType, ReactNode } from "react"
import { DocBand } from "@/components/doc-band"
import { useCopy } from "@/lib/use-copy"

type Specimen = {
  name: string
  Illustration: ComponentType<IllustrationProps>
}

/** Source order, which runs from the quietest state to the loudest. */
const states: readonly Specimen[] = [
  { name: "IllustrationEmpty", Illustration: IllustrationEmpty },
  { name: "IllustrationSearch", Illustration: IllustrationSearch },
  { name: "IllustrationNoResults", Illustration: IllustrationNoResults },
  { name: "IllustrationError", Illustration: IllustrationError },
  { name: "IllustrationUpload", Illustration: IllustrationUpload },
  { name: "IllustrationSuccess", Illustration: IllustrationSuccess },
  { name: "IllustrationLocked", Illustration: IllustrationLocked },
  { name: "IllustrationNoData", Illustration: IllustrationNoData },
]

const fileTypes: readonly FileIllustrationType[] = [
  "document",
  "image",
  "spreadsheet",
  "presentation",
  "video",
  "audio",
  "code",
  "archive",
  "generic",
]

/** Hairlines come from the container's top/left plus each cell's right/bottom,
 *  which closes the grid at any column count — the file family is nine across
 *  five columns, so the last row is always ragged. */
const GRID =
  "grid grid-cols-2 border-t border-l border-border-primary-solid sm:grid-cols-3 md:grid-cols-5"

/** Cells are tinted rather than transparent: both families are `bg-surface`
 *  sheets, and `--surface` and `--background-primary` are the same value, so
 *  on the page background a sheet is only its own hairline. */
const CELL =
  "flex h-32 cursor-copy flex-col items-center justify-center gap-3 border-r border-b border-border-primary-solid bg-background-secondary px-2 outline-none transition-colors hover:bg-background-tertiary focus-visible:bg-background-tertiary focus-visible:ring-[3px] focus-visible:ring-inset focus-visible:ring-ring/20"

const CopyCell = ({
  label,
  value,
  children,
}: {
  label: string
  value: string
  children: ReactNode
}) => {
  const { copied, copy } = useCopy()

  return (
    <button
      type="button"
      onClick={() => copy(value)}
      title={`Copy ${value}`}
      className={CELL}
    >
      {children}
      <span className="text-xs max-w-full text-center break-all text-fg-secondary">
        {copied ? "Copied" : label}
      </span>
      <span className="sr-only">{copied ? "Copied" : value}</span>
    </button>
  )
}

/** The cast, not the compositions. Empty and File attachment already show these
 *  in place, down to the same "No projects yet" copy and the same attachment
 *  row — repeating either here would say the same thing twice. */
export const IllustrationsDemo = () => (
  <div>
    <DocBand
      first
      id="states"
      title="States"
      description="A miniature of the thing that is missing, not a picture about it, on a fixed 64×48 stage so a row of them lines up. No brand colour — an empty state is a quiet moment, and an accent turns it into an announcement."
      contentClassName=""
    >
      <div className={GRID}>
        {states.map(({ name, Illustration }) => (
          <CopyCell key={name} label={name} value={name}>
            <Illustration />
          </CopyCell>
        ))}
      </div>
    </DocBand>

    <DocBand
      id="file-types"
      title="File types"
      description="A second, smaller family, sized for an attachment row or a preview slot: a bare 24×30 sheet rather than a hero on a stage. They render the type you name — mapping an extension to a type is the consumer's job."
      contentClassName=""
    >
      <div className={GRID}>
        {fileTypes.map((type) => (
          <CopyCell
            key={type}
            label={type}
            value={`<IllustrationFile type="${type}" />`}
          >
            <IllustrationFile type={type} />
          </CopyCell>
        ))}
      </div>
    </DocBand>
  </div>
)
