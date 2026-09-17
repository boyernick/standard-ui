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
          blurAmount: 0,
          refraction: 0.12,
          zRadius: 3,
          chromAberration: 0,
          brightness: theme === "light" ? -0.055 : 0,
          tintStrength: 0,
          edgeHighlight: 0.045,
          specular: 0.02,
          fresnel: 1,
          shadowOpacity: 0.065,
          shadowSpread: 12,
          shadowOffsetY: 3,
          button,
        }}
        className="glass-optical absolute inset-0 rounded-xl"
      />
    </GlassRoot>
  )
}
