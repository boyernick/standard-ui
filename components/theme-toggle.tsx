"use client"

import { Button, cn } from "@boyernick/standard-ui-react"
import { IconCircleHalfFill } from "@central-icons-react/round-outlined-radius-2-stroke-2/IconCircleHalfFill"
import { useTheme } from "./theme-provider"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const next = theme === "dark" ? "light" : "dark"

  const handleClick = () => {
    setTheme(next)
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="md"
      iconOnly
      rounded
      onClick={handleClick}
      aria-label={`Switch to ${next} theme`}
      className="group"
    >
      {/* The glyph is a half-filled circle, so half a turn swaps which side
          is filled — the icon ends up depicting the theme it just moved to
          rather than snapping to a different picture. */}
      <IconCircleHalfFill
        size={16}
        aria-hidden
        className={cn(
          // Not `motion.transform`: that token is 150ms on `ease-move`, tuned
          // for a chevron's quarter turn, where an out-curve reads as a flick.
          // Half a turn over the same time starts abruptly and arrives before
          // the eye tracks it. The long duration and the ease-in-out of
          // `ease-passive` give the rotation room to read as one movement.
          "text-fg-tertiary transition-[color,transform,rotate] duration-[var(--duration-lg)] ease-passive group-hover:text-fg-primary group-focus-visible:text-fg-primary",
          "motion-reduce:transition-none",
          theme === "dark" && "rotate-180",
        )}
      />
    </Button>
  )
}
