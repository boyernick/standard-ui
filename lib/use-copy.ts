"use client"

import { useCallback, useEffect, useRef, useState } from "react"

/**
 * Copy-to-clipboard with a self-resetting "copied" flag.
 *
 * This existed five times over — colors-palette, layout-preview,
 * materials-preview, type-scale-list and icons-demo each had their own
 * near-identical version, and each one leaked its reset timer on unmount.
 */
export const useCopy = ({ resetAfter = 1200 } = {}) => {
  const [copied, setCopied] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current)
    },
    [],
  )

  const copy = useCallback(
    async (value: string) => {
      try {
        await navigator.clipboard.writeText(value)
        setCopied(true)
        if (timer.current) clearTimeout(timer.current)
        timer.current = setTimeout(() => setCopied(false), resetAfter)
      } catch {
        // Clipboard access can be denied; leave the affordance in its
        // uncopied state rather than claiming success.
        setCopied(false)
      }
    },
    [resetAfter],
  )

  return { copied, copy }
}
