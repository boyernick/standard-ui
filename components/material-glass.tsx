import { MaterialBand } from "@/components/material-tokens"

export const MaterialGlass = () => (
  <MaterialBand
    first
    id="glass"
    title="Glass"
    description="Lit, translucent chrome that reads on any backdrop."
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
