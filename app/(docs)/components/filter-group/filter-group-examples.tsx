import {
  FilterCount,
  FilterGroup,
  FilterItem,
} from "@boyernick/standard-ui-react"
import { DocBand } from "@/components/doc-band"

const BAND = "max-w-xl"

export const FilterGroupExamples = () => (
  <div>
    <DocBand
      first
      id="pill"
      title="Pill"
      description="Detached choices filter one result set without changing the surrounding view."
      contentClassName={BAND}
    >
      <FilterGroup aria-label="Project status" defaultValue={["all"]}>
        <FilterItem value="all">All</FilterItem>
        <FilterItem value="active">Active</FilterItem>
        <FilterItem value="archived">Archived</FilterItem>
      </FilterGroup>
    </DocBand>

    <DocBand
      id="segmented"
      title="Segmented"
      description="An inset enclosure gives a small, exclusive set more visual structure."
      contentClassName={BAND}
    >
      <FilterGroup
        aria-label="Date range"
        defaultValue={["week"]}
        variant="segmented"
      >
        <FilterItem value="day">Day</FilterItem>
        <FilterItem value="week">Week</FilterItem>
        <FilterItem value="month">Month</FilterItem>
      </FilterGroup>
    </DocBand>

    <DocBand
      id="multiple"
      title="Multiple"
      description="Multiple selection combines independent constraints in the same group."
      contentClassName={BAND}
    >
      <FilterGroup
        multiple
        aria-label="Content type"
        defaultValue={["documents", "images"]}
      >
        <FilterItem value="documents">Documents</FilterItem>
        <FilterItem value="images">Images</FilterItem>
        <FilterItem value="video">Video</FilterItem>
      </FilterGroup>
    </DocBand>

    <DocBand
      id="counts"
      title="Counts"
      description="Compact totals preview how much content each filter will reveal."
      contentClassName={BAND}
    >
      <FilterGroup aria-label="Request status" defaultValue={["open"]}>
        <FilterItem value="open">
          Open
          <FilterCount>8</FilterCount>
        </FilterItem>
        <FilterItem value="closed">
          Closed
          <FilterCount>142</FilterCount>
        </FilterItem>
        <FilterItem value="drafts">
          Drafts
          <FilterCount>3</FilterCount>
        </FilterItem>
      </FilterGroup>
    </DocBand>

    <DocBand
      id="sizes"
      title="Sizes"
      description="Small, medium, and large options cover dense toolbars and touch-friendly surfaces."
      contentClassName={BAND}
    >
      <div className="flex flex-col items-start gap-5">
        {(["sm", "md", "lg"] as const).map((size) => (
          <FilterGroup
            key={size}
            aria-label={`${size} filter size`}
            defaultValue={["all"]}
            size={size}
          >
            <FilterItem value="all">All</FilterItem>
            <FilterItem value="active">Active</FilterItem>
            <FilterItem value="archived">Archived</FilterItem>
          </FilterGroup>
        ))}
      </div>
    </DocBand>

    <DocBand
      id="disabled"
      title="Disabled"
      description="Unavailable filters remain visible without participating in selection."
      contentClassName={BAND}
    >
      <FilterGroup aria-label="Availability" defaultValue={["available"]}>
        <FilterItem value="available">Available</FilterItem>
        <FilterItem value="scheduled">Scheduled</FilterItem>
        <FilterItem value="unavailable" disabled>
          Unavailable
        </FilterItem>
      </FilterGroup>
    </DocBand>
  </div>
)
