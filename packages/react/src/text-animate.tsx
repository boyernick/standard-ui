"use client"

import {
  useEffect,
  useMemo,
  useState,
  type HTMLAttributes,
} from "react"
import { cn } from "./lib/cn"

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
    let frame = 0
    let timeoutId: ReturnType<typeof setTimeout> | undefined

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

      // decode
      setOutput(
        chars.map(() => DECODE_GLYPHS[Math.floor(Math.random() * DECODE_GLYPHS.length)]).join(""),
      )
      let revealed = 0
      const tick = () => {
        if (cancelled) return
        revealed += 1
        const next = chars
          .map((char, index) => {
            if (char === " ") return " "
            if (index < revealed) return char
            return DECODE_GLYPHS[Math.floor(Math.random() * DECODE_GLYPHS.length)]
          })
          .join("")
        setOutput(next)
        if (revealed < chars.length) {
          timeoutId = setTimeout(tick, speed)
        } else {
          setOutput(text)
          setDone(true)
        }
      }
      timeoutId = setTimeout(tick, speed)
    }

    timeoutId = setTimeout(start, delay)

    return () => {
      cancelled = true
      if (timeoutId) clearTimeout(timeoutId)
      cancelAnimationFrame(frame)
    }
  }, [chars, delay, effect, replay, speed, text])

  if (effect === "fade" || effect === "blur") {
    return (
      <Tag
        className={cn(
          "inline-block text-fg-primary",
          effect === "fade" &&
            "animate-[text-fade-in_0.6s_ease-out_both] motion-reduce:animate-none",
          effect === "blur" &&
            "animate-[text-blur-in_0.7s_ease-out_both] motion-reduce:animate-none",
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
        effect === "typewriter" && !done && "after:ml-0.5 after:inline-block after:h-[1em] after:w-px after:translate-y-[0.1em] after:bg-current after:align-baseline after:content-[''] after:animate-pulse",
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
