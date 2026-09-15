import { MaterialBand } from "@/components/material-tokens"

export const MaterialGlass = () => (
  <MaterialBand
    first
    id="glass"
    title="Glass"
    description="A clear lens with a soft, evenly lit rim."
    valueLabel="Surface"
    rows={[
      {
        className: "glass",
        usage: "Floating controls over any backdrop",
        value: "translucent",
        preview: (
          <span aria-hidden className="glass relative size-12 rounded-xl" />
        ),
      },
    ]}
  />
)
