"use client"

import { MaterialBand } from "@/components/material-tokens"
import { MaterialGlassSwatch } from "@/components/material-glass-swatch"

export const MaterialGlass = () => (
  <MaterialBand
    first
    id="glass"
    title="Glass"
    description="Refractive glass for floating controls and surfaces over visual content."
    nameLabel="Component"
    valueLabel="Type"
    rows={[
      {
        className: "Glass",
        usage: "Floating panels and surfaces",
        value: "Surface",
        preview: <MaterialGlassSwatch />,
      },
      {
        className: "GlassButton",
        usage: "Interactive controls over imagery or video",
        value: "Button",
        preview: <MaterialGlassSwatch button />,
      },
    ]}
  />
)
