"use client"

import { IconCircleHalfFill } from "@central-icons-react/round-outlined-radius-2-stroke-2/IconCircleHalfFill"
import { useTheme } from "./theme-provider"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const next = theme === "dark" ? "light" : "dark"

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      aria-label={`Switch to ${next} theme`}
      className="flex size-9 items-center justify-center rounded-full text-fg-tertiary transition-colors hover:bg-background-tertiary hover:text-fg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background-primary"
    >
      <IconCircleHalfFill size={16} aria-hidden />
    </button>
  )
}
