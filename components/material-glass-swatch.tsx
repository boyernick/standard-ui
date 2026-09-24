"use client"

import { Glass, GlassRoot } from "@boyernick/standard-ui-react/glass"
import { useTheme } from "@/components/theme-provider"

/** Neutral lighting makes the material legible without photographic scenery. */
export const MaterialGlassSwatch = ({
  button = false,
  className = "size-12",
}: {
  button?: boolean
  className?: string
}) => {
  const { theme } = useTheme()

  return (
    <GlassRoot
      key={theme}
      interactiveLighting
      aria-hidden
      className={`pointer-events-none rounded-xl ${className}`}
    >
      <span className="absolute inset-0 rounded-xl bg-background-secondary" />
      <Glass
        data-glass-radius="css"
        config={{
          // Over a flat swatch there is nothing to refract; a light page
          // needs less dimming for the rim to read.
          dim: theme === "light" ? 0.94 : 0.8,
          shadow: 0.06,
          button,
        }}
        className="glass-optical absolute inset-0 rounded-xl"
      />
    </GlassRoot>
  )
}
