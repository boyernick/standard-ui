"use client"

import { Button } from "@boyernick/standard-ui-react"
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
      className="text-fg-tertiary hover:text-fg-primary"
    >
      <IconCircleHalfFill size={16} aria-hidden />
    </Button>
  )
}
