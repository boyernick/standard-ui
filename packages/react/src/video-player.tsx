"use client"

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ComponentProps,
} from "react"
import { Button } from "./button"
import { cn } from "./lib/cn"

const formatTime = (seconds: number) => {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00"
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, "0")}`
}

export type VideoPlayerProps = ComponentProps<"div"> & {
  src: string
  poster?: string
  title?: string
  /** Accessible name for the video. Defaults to title. */
  "aria-label"?: string
}

export const VideoPlayer = ({
  src,
  poster,
  title,
  className,
  "aria-label": ariaLabel,
  ...props
}: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const seekId = useId()
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)
  const [current, setCurrent] = useState(0)
  const [duration, setDuration] = useState(0)

  const handleTogglePlay = useCallback(() => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      void video.play()
    } else {
      video.pause()
    }
  }, [])

  const handleToggleMute = useCallback(() => {
    const video = videoRef.current
    if (!video) return
    video.muted = !video.muted
    setMuted(video.muted)
  }, [])

  const handleSeek = useCallback((value: number) => {
    const video = videoRef.current
    if (!video) return
    video.currentTime = value
    setCurrent(value)
  }, [])

  const handleFullscreen = useCallback(() => {
    const video = videoRef.current
    if (!video) return
    if (document.fullscreenElement) {
      void document.exitFullscreen()
      return
    }
    void video.requestFullscreen?.()
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handlePlay = () => setPlaying(true)
    const handlePause = () => setPlaying(false)
    const handleTime = () => setCurrent(video.currentTime)
    const handleMeta = () => setDuration(video.duration || 0)

    video.addEventListener("play", handlePlay)
    video.addEventListener("pause", handlePause)
    video.addEventListener("timeupdate", handleTime)
    video.addEventListener("loadedmetadata", handleMeta)

    return () => {
      video.removeEventListener("play", handlePlay)
      video.removeEventListener("pause", handlePause)
      video.removeEventListener("timeupdate", handleTime)
      video.removeEventListener("loadedmetadata", handleMeta)
    }
  }, [])

  const progress = duration > 0 ? (current / duration) * 100 : 0

  return (
    <div
      data-slot="video-player"
      className={cn(
        "overflow-hidden rounded-xl border border-border-primary bg-surface",
        className,
      )}
      {...props}
    >
      <div className="relative bg-gray-1000">
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          playsInline
          className="aspect-video w-full cursor-pointer object-cover"
          aria-label={ariaLabel ?? title ?? "Video"}
          onClick={handleTogglePlay}
        />
        {!playing ? (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/20">
            <span className="flex size-12 items-center justify-center rounded-full bg-surface/90 text-fg-primary shadow-md">
              <PlayIcon />
            </span>
          </div>
        ) : null}
      </div>

      <div className="flex flex-col gap-3 border-t border-border-primary bg-surface p-3">
        {title ? (
          <p className="text-sm-strong truncate text-fg-primary">{title}</p>
        ) : null}

        <div className="flex items-center gap-3">
          <label className="sr-only" htmlFor={seekId}>
            Seek
          </label>
          <input
            id={seekId}
            type="range"
            min={0}
            max={duration || 0}
            step={0.1}
            value={current}
            onChange={(event) => handleSeek(Number(event.target.value))}
            className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-background-quaternary accent-[var(--brand-primary)] [&::-webkit-slider-thumb]:size-3.5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-brand-primary"
            style={{
              background: `linear-gradient(to right, var(--brand-primary) ${progress}%, var(--background-quaternary) ${progress}%)`,
            }}
            aria-valuetext={`${formatTime(current)} of ${formatTime(duration)}`}
          />
        </div>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            iconOnly
            rounded
            aria-label={playing ? "Pause" : "Play"}
            onClick={handleTogglePlay}
          >
            {playing ? <PauseIcon /> : <PlayIcon />}
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            iconOnly
            rounded
            aria-label={muted ? "Unmute" : "Mute"}
            onClick={handleToggleMute}
          >
            {muted ? <MuteIcon /> : <VolumeIcon />}
          </Button>
          <span className="text-xs font-mono text-fg-tertiary">
            {formatTime(current)} / {formatTime(duration)}
          </span>
          <div className="ml-auto">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              iconOnly
              rounded
              aria-label="Fullscreen"
              onClick={handleFullscreen}
            >
              <FullscreenIcon />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="size-4" aria-hidden>
    <path d="M9 7.5v9l8-4.5-8-4.5Z" fill="currentColor" />
  </svg>
)

const PauseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="size-4" aria-hidden>
    <path d="M8 7h3v10H8V7Zm5 0h3v10h-3V7Z" fill="currentColor" />
  </svg>
)

const VolumeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="size-4" aria-hidden>
    <path
      d="M4 10v4h3l4 3V7L7 10H4Zm11.5 2a2.5 2.5 0 0 0-1.5-2.3v4.6A2.5 2.5 0 0 0 15.5 12Zm0-5.5v1.6a4 4 0 0 1 0 7.8v1.6a5.5 5.5 0 0 0 0-11Z"
      fill="currentColor"
    />
  </svg>
)

const MuteIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="size-4" aria-hidden>
    <path
      d="M4 10v4h3l4 3V7L7 10H4Zm11.2-.8 1.4-1.4 1.4 1.4 1.4-1.4 1.4 1.4-1.4 1.4 1.4 1.4-1.4 1.4-1.4-1.4-1.4 1.4-1.4-1.4 1.4-1.4-1.4-1.4Z"
      fill="currentColor"
    />
  </svg>
)

const FullscreenIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="size-4" aria-hidden>
    <path
      d="M7 9V7h3v2H7Zm7 0V7h3v2h-3ZM7 17v-2h3v2H7Zm7 0v-2h3v2h-3Z"
      fill="currentColor"
    />
    <path
      d="M5 5h5v2H7v3H5V5Zm9 0h5v5h-2V7h-3V5ZM5 14h2v3h3v2H5v-5Zm12 3h-3v2h5v-5h-2v3Z"
      fill="currentColor"
    />
  </svg>
)
