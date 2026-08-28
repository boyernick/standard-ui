import { MaterialBand } from "@/components/material-tokens"

export const MaterialGlass = () => (
  <MaterialBand
    first
    id="glass"
    title="Glass"
    description="A translucent, lit surface whose rim is bright where the light lands and dim where it does not, so it reads as a raised object rather than a bordered box. It lets less through on a dark page than a light one, and falls back to solid where a reader has asked for reduced transparency."
    valueLabel="Surface"
    rows={[
      {
        className: "glass",
        usage: "Floating controls that carry their own light",
        value: "translucent",
        preview: (
          <span aria-hidden className="glass relative size-12 rounded-xl" />
        ),
      },
    ]}
  />
)
