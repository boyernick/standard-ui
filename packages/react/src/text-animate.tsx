"use client"

import {
  useEffect,
  useMemo,
  useState,
  type HTMLAttributes,
} from "react"
import { cn } from "./lib/cn"

/** How many glyphs are scrambling at once. The window travels the line; behind
 *  it the text is settled, ahead of it nothing is drawn yet. 8 is the reference
 *  default from baffle.js, which this effect follows. */
const DECODE_WINDOW = 8

const DECODE_GLYPHS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789#@$%&*"

export type TextAnimateEffect =
  | "typewriter"
  | "decode"
  | "fade"
  | "blur"

export type TextAnimateProps = HTMLAttributes<HTMLSpanElement> & {
  text: string
  effect?: TextAnimateEffect
  /** Milliseconds per character (typewriter / decode). */
  speed?: number
  /** Delay before animation starts. */
  delay?: number
  /** Replay when `text` changes. Default true. */
  replay?: boolean
  as?: "span" | "p" | "h1" | "h2" | "h3"
}

export const TextAnimate = ({
  text,
  effect = "typewriter",
  speed = 40,
  delay = 0,
  replay = true,
  as: Tag = "span",
  className,
  ...props
}: TextAnimateProps) => {
  const [output, setOutput] = useState(effect === "typewriter" || effect === "decode" ? "" : text)
  const [done, setDone] = useState(effect === "fade" || effect === "blur")
  const chars = useMemo(() => [...text], [text])

  useEffect(() => {
    let cancelled = false
    let timeoutId: ReturnType<typeof setTimeout> | undefined
    let frameId: number | undefined

    const start = () => {
      if (
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        setOutput(text)
        setDone(true)
        return
      }

      if (effect === "fade" || effect === "blur") {
        setOutput(text)
        setDone(true)
        return
      }

      setDone(false)

      if (effect === "typewriter") {
        setOutput("")
        let i = 0
        const tick = () => {
          if (cancelled) return
          i += 1
          setOutput(text.slice(0, i))
          if (i < text.length) {
            timeoutId = setTimeout(tick, speed)
          } else {
            setDone(true)
          }
        }
        timeoutId = setTimeout(tick, speed)
        return
      }

      // Decode follows baffle.js's `reveal`, which is the reference for this
      // effect: a fixed-width window of scrambled glyphs travels left to
      // right, the real text sits behind it, and nothing at all is drawn ahead
      // of it — so the line grows in with a churning leading edge rather than
      // resolving out of a full-width block of noise.
      //
      // It runs on rAF with a time accumulator rather than `setTimeout(speed)`.
      // A 28ms timer does not divide into a ~16.7ms frame, so steps land on
      // uneven frames and the text visibly stutters; accumulating elapsed time
      // keeps the reference's cadence while landing each step on a real frame.
      const slots = chars.reduce<number[]>((acc, char, index) => {
        if (char !== " ") acc.push(index)
        return acc
      }, [])

      // The window starts off the front of the line so the first glyph is
      // already scrambling as it arrives.
      let position = -DECODE_WINDOW
      let previousStep = -Infinity
      const startedAt = performance.now()

      const frame = (now: number) => {
        if (cancelled) return

        const step = Math.floor((now - startedAt) / speed) - DECODE_WINDOW
        if (step !== previousStep) {
          previousStep = step
          position = step

          if (position > slots.length) {
            setOutput(text)
            setDone(true)
            return
          }

          const next = [...chars]
          for (let p = Math.max(position, 0); p < slots.length; p += 1) {
            next[slots[p]] =
              p < position + DECODE_WINDOW
                ? DECODE_GLYPHS[
                    Math.floor(Math.random() * DECODE_GLYPHS.length)
                  ]
                : ""
          }
          setOutput(next.join(""))
        }

        frameId = requestAnimationFrame(frame)
      }

      setOutput("")
      frameId = requestAnimationFrame(frame)
      return
    }

    timeoutId = setTimeout(start, delay)

    return () => {
      cancelled = true
      if (timeoutId) clearTimeout(timeoutId)
      if (frameId) cancelAnimationFrame(frameId)
    }
  }, [chars, delay, effect, replay, speed, text])

  if (effect === "fade" || effect === "blur") {
    return (
      <Tag
        className={cn(
          "inline-block text-fg-primary",
          effect === "fade" &&
            "animate-[text-fade-in_0.6s_var(--ease-enter)_both] motion-reduce:animate-none",
          effect === "blur" &&
            "animate-[text-blur-in_0.7s_var(--ease-enter)_both] motion-reduce:animate-none",
          className,
        )}
        style={{ animationDelay: `${delay}ms` }}
        data-done={done || undefined}
        {...props}
      >
        {text}
      </Tag>
    )
  }

  return (
    <Tag
      className={cn(
        "inline-block text-fg-primary",
        effect === "typewriter" && !done && "after:ml-0.5 after:inline-block after:h-[1em] after:w-px after:translate-y-[0.1em] after:bg-current after:align-baseline after:content-[''] after:animate-pulse motion-reduce:after:animate-none",
        className,
      )}
      aria-label={text}
      data-done={done || undefined}
      {...props}
    >
      <span aria-hidden>{output || "\u00A0"}</span>
    </Tag>
  )
}
