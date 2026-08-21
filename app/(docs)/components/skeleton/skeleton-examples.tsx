import { Skeleton } from "@boyernick/standard-ui-react"
import type { ReactNode } from "react"
import { DocBand } from "@/components/doc-band"

const BAND = "max-w-sm"

/** A specimen with its variant named underneath. */
const Shape = ({ name, children }: { name: string; children: ReactNode }) => (
  <div className="flex flex-col items-center gap-2">
    {children}
    <span className="text-xs text-fg-tertiary">{name}</span>
  </div>
)

/** One row of a loading list: a circle and two lines of text. */
const Row = () => (
  <div className="flex items-center gap-3">
    <Skeleton variant="circle" className="size-8 shrink-0" />
    <div className="flex flex-1 flex-col gap-2">
      <Skeleton variant="text" className="w-1/3" />
      <Skeleton variant="text" className="w-2/3" />
    </div>
  </div>
)

export const SkeletonExamples = () => (
  <div>
    <DocBand
      first
      id="shapes"
      title="Shapes"
      description="Three variants, each matching the outline of what replaces it."
      contentClassName={BAND}
    >
      <div className="flex items-end gap-6">
        <Shape name="block">
          <Skeleton className="h-12 w-20" />
        </Shape>
        <Shape name="text">
          <Skeleton variant="text" className="w-20" />
        </Shape>
        <Shape name="circle">
          <Skeleton variant="circle" className="size-12" />
        </Shape>
      </div>
    </DocBand>

    <DocBand
      id="card"
      title="Card"
      description="Standing in for a whole block of content while it loads."
      contentClassName={BAND}
    >
      <div className="flex gap-3">
        <Skeleton variant="circle" className="size-10 shrink-0" />
        <div className="flex flex-1 flex-col gap-2">
          <Skeleton variant="text" className="w-2/3" />
          <Skeleton variant="text" />
          <Skeleton className="mt-1 h-16" />
        </div>
      </div>
    </DocBand>

    <DocBand
      id="list"
      title="List"
      description="Repeating one row keeps the height stable as records arrive."
      contentClassName={BAND}
    >
      <div className="flex flex-col gap-4">
        <Row />
        <Row />
        <Row />
      </div>
    </DocBand>
  </div>
)
