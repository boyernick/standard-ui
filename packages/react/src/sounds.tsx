"use client"

import { IconPlay } from "@central-icons-react/round-filled-radius-2-stroke-2/IconPlay"
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ComponentProps,
  type ReactNode,
} from "react"
import { Button } from "./button"
import { cn } from "./lib/cn"
import { motion } from "./lib/motion"

export type SoundId = "click" | "success" | "error" | "notify"

type SoundPreset = {
  id: SoundId
  label: string
  description: string
  play: (ctx: AudioContext, when: number, destination: AudioNode) => void
}

const SOUND_PRESETS: SoundPreset[] = [
  {
    id: "click",
    label: "Click",
    description: "Confirmation for toggles and secondary actions.",
    play: (ctx, when, destination) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = "triangle"
      osc.frequency.setValueAtTime(880, when)
      gain.gain.setValueAtTime(0.0001, when)
      gain.gain.exponentialRampToValueAtTime(0.08, when + 0.01)
      gain.gain.exponentialRampToValueAtTime(0.0001, when + 0.08)
      osc.connect(gain)
      gain.connect(destination)
      osc.start(when)
      osc.stop(when + 0.09)
    },
  },
  {
    id: "success",
    label: "Success",
    description: "Positive completion for saves and confirmations.",
    play: (ctx, when, destination) => {
      const notes = [523.25, 659.25, 783.99]
      notes.forEach((frequency, index) => {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        const start = when + index * 0.08
        osc.type = "sine"
        osc.frequency.setValueAtTime(frequency, start)
        gain.gain.setValueAtTime(0.0001, start)
        gain.gain.exponentialRampToValueAtTime(0.09, start + 0.02)
        gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.22)
        osc.connect(gain)
        gain.connect(destination)
        osc.start(start)
        osc.stop(start + 0.24)
      })
    },
  },
  {
    id: "error",
    label: "Error",
    description: "Attention for failed actions and validation.",
    play: (ctx, when, destination) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = "sawtooth"
      osc.frequency.setValueAtTime(220, when)
      osc.frequency.exponentialRampToValueAtTime(140, when + 0.18)
      gain.gain.setValueAtTime(0.0001, when)
      gain.gain.exponentialRampToValueAtTime(0.07, when + 0.02)
      gain.gain.exponentialRampToValueAtTime(0.0001, when + 0.22)
      osc.connect(gain)
      gain.connect(destination)
      osc.start(when)
      osc.stop(when + 0.24)
    },
  },
  {
    id: "notify",
    label: "Notify",
    description: "Soft cue for toasts and background updates.",
    play: (ctx, when, destination) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = "sine"
      osc.frequency.setValueAtTime(660, when)
      osc.frequency.setValueAtTime(880, when + 0.12)
      gain.gain.setValueAtTime(0.0001, when)
      gain.gain.exponentialRampToValueAtTime(0.06, when + 0.02)
      gain.gain.exponentialRampToValueAtTime(0.0001, when + 0.28)
      osc.connect(gain)
      gain.connect(destination)
      osc.start(when)
      osc.stop(when + 0.3)
    },
  },
]

type SoundsContextValue = {
  muted: boolean
  setMuted: (muted: boolean) => void
  volume: number
  setVolume: (volume: number) => void
  play: (id: SoundId) => void
  presets: SoundPreset[]
}

const SoundsContext = createContext<SoundsContextValue | null>(null)

export type SoundsProviderProps = {
  children: ReactNode
  defaultMuted?: boolean
  defaultVolume?: number
}

export const SoundsProvider = ({
  children,
  defaultMuted = false,
  defaultVolume = 0.8,
}: SoundsProviderProps) => {
  const [muted, setMuted] = useState(defaultMuted)
  const [volume, setVolume] = useState(defaultVolume)
  const audioContextRef = useRef<AudioContext | null>(null)

  const getContext = useCallback(() => {
    if (typeof window === "undefined") return null
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext()
    }
    return audioContextRef.current
  }, [])

  useEffect(() => {
    return () => {
      void audioContextRef.current?.close()
    }
  }, [])

  const play = useCallback(
    (id: SoundId) => {
      if (muted) return
      const preset = SOUND_PRESETS.find((item) => item.id === id)
      if (!preset) return
      const ctx = getContext()
      if (!ctx) return
      void ctx.resume()
      const master = ctx.createGain()
      master.gain.value = Math.min(1, Math.max(0, volume))
      master.connect(ctx.destination)
      preset.play(ctx, ctx.currentTime, master)
    },
    [getContext, muted, volume],
  )

  const value = useMemo(
    () => ({
      muted,
      setMuted,
      volume,
      setVolume,
      play,
      presets: SOUND_PRESETS,
    }),
    [muted, play, volume],
  )

  return (
    <SoundsContext.Provider value={value}>{children}</SoundsContext.Provider>
  )
}

export const useSounds = () => {
  const context = useContext(SoundsContext)
  if (!context) {
    throw new Error("useSounds must be used within <SoundsProvider>")
  }
  return context
}

export type SoundProps = ComponentProps<"div"> & {
  id: SoundId
  label?: string
  description?: string
}

export const Sound = ({
  id,
  label,
  description,
  className,
  ...props
}: SoundProps) => {
  const { play, presets } = useSounds()
  const preset = presets.find((item) => item.id === id)
  const resolvedLabel = label ?? preset?.label ?? id
  const resolvedDescription = description ?? preset?.description

  const handlePlay = () => {
    play(id)
  }

  return (
    <div
      data-slot="sound"
      className={cn(
        "flex items-center gap-3 rounded-xl border border-border-primary bg-surface p-3",
        className,
      )}
      {...props}
    >
      <Button
        type="button"
        variant="secondary"
        size="md"
        iconOnly
        rounded
        className="shrink-0 hover:scale-[1.04] active:scale-95"
        aria-label={`Play ${resolvedLabel}`}
        onClick={handlePlay}
      >
        <IconPlay size={12} mode="raw" className="size-3" aria-hidden />
      </Button>
      <div className="min-w-0 flex-1">
        <p className="text-sm-strong text-fg-primary">{resolvedLabel}</p>
        {resolvedDescription ? (
          <p className="text-sm mt-0.5 text-fg-tertiary">{resolvedDescription}</p>
        ) : null}
      </div>
      <span className="text-xs font-mono text-fg-quaternary">{id}</span>
    </div>
  )
}

export type SoundToggleProps = ComponentProps<typeof Button>

export const SoundToggle = ({
  className,
  children,
  ...props
}: SoundToggleProps) => {
  const { muted, setMuted } = useSounds()

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      aria-pressed={!muted}
      className={cn(motion.colors, className)}
      onClick={() => setMuted(!muted)}
      {...props}
    >
      {children ?? (muted ? "Unmute sounds" : "Mute sounds")}
    </Button>
  )
}
