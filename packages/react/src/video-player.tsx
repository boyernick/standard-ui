"use client"

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ComponentProps,
} from "react"
import {
  IconFullScreen,
  IconPause,
  IconPlay,
  IconVolumeFull,
  IconVolumeOff,
} from "./icons"
import { cn } from "./lib/cn"

const formatTime = (seconds: number) => {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00"
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, "0")}`
}

// The media surface is black in both themes, so everything sitting on it is
// light regardless of the theme — semantic foreground tokens would invert and
// disappear against the video. This is the same reasoning as the dialog
// backdrops, and the opposite of a keycap, which sits on a themed surface.
const overlayControl =
  "inline-flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-md text-white outline-none transition-colors duration-[var(--duration-sm)] ease-enter hover:bg-white/15 focus-visible:ring-2 focus-visible:ring-white/70 motion-reduce:transition-none"

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
  const [buffered, setBuffered] = useState(0)

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

    const readBuffered = () => {
      if (video.buffered.length === 0) return
      setBuffered(video.buffered.end(video.buffered.length - 1))
    }
    const handlePlay = () => setPlaying(true)
    const handlePause = () => setPlaying(false)
    const handleTime = () => setCurrent(video.currentTime)
    const handleMeta = () => setDuration(video.duration || 0)
    const handleVolume = () => setMuted(video.muted)

    // A cached video can be ready before this effect runs, in which case
    // `loadedmetadata` has already fired and the readout would sit at 0:00
    // forever. Seed from the element, then keep up with the events.
    handleMeta()
    handleTime()
    handleVolume()
    readBuffered()
    setPlaying(!video.paused)

    video.addEventListener("play", handlePlay)
    video.addEventListener("pause", handlePause)
    video.addEventListener("timeupdate", handleTime)
    video.addEventListener("loadedmetadata", handleMeta)
    video.addEventListener("durationchange", handleMeta)
    video.addEventListener("volumechange", handleVolume)
    video.addEventListener("progress", readBuffered)

    return () => {
      video.removeEventListener("play", handlePlay)
      video.removeEventListener("pause", handlePause)
      video.removeEventListener("timeupdate", handleTime)
      video.removeEventListener("loadedmetadata", handleMeta)
      video.removeEventListener("durationchange", handleMeta)
      video.removeEventListener("volumechange", handleVolume)
      video.removeEventListener("progress", readBuffered)
    }
  }, [])

  const played = duration > 0 ? (current / duration) * 100 : 0
  const loaded = duration > 0 ? (buffered / duration) * 100 : 0

  return (
    <div
      data-slot="video-player"
      data-playing={playing || undefined}
      // `group` drives the chrome: it hides while playing and comes back on
      // hover or when anything inside takes focus.
      className={cn(
        "group relative isolate overflow-hidden rounded-xl bg-black shadow-sm",
        className,
      )}
      {...props}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        playsInline
        className="aspect-video w-full cursor-pointer object-cover"
        aria-label={ariaLabel ?? title ?? "Video"}
        onClick={handleTogglePlay}
      />

      {/* Centred affordance while paused. It is the video's own click target
          underneath, so the badge itself stays inert. */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity duration-[var(--duration-md)] ease-enter motion-reduce:transition-none",
          playing ? "opacity-0" : "opacity-100",
        )}
      >
        <span className="flex size-14 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-sm">
          <IconPlay size={24} className="ml-0.5 size-6" aria-hidden />
        </span>
      </div>

      {title ? (
        <div
          className={cn(
            "pointer-events-none absolute inset-x-0 top-0 bg-gradient-to-b from-black/60 to-transparent px-4 pt-3 pb-8 transition-opacity duration-[var(--duration-md)] ease-enter motion-reduce:transition-none",
            "group-hover:opacity-100 group-focus-within:opacity-100",
          // Nothing hovers on a touch screen, so the chrome would never come
          // back once playback started. Keep it up there instead.
          "[@media(hover:none)]:opacity-100",
            playing ? "opacity-0" : "opacity-100",
          )}
        >
          <p className="text-sm-strong truncate text-white">{title}</p>
        </div>
      ) : null}

      <div
        className={cn(
          "absolute inset-x-0 bottom-0 flex flex-col gap-1 bg-gradient-to-t from-black/75 via-black/45 to-transparent px-3 pt-10 pb-2 transition-opacity duration-[var(--duration-md)] ease-enter motion-reduce:transition-none",
          "group-hover:opacity-100 group-focus-within:opacity-100",
          // Nothing hovers on a touch screen, so the chrome would never come
          // back once playback started. Keep it up there instead.
          "[@media(hover:none)]:opacity-100",
          playing ? "opacity-0" : "opacity-100",
        )}
      >
        <label className="sr-only" htmlFor={seekId}>
          Seek
        </label>
        <div className="relative flex h-4 items-center">
          {/* Track, buffered fill and played fill sit under the input, which
              stays transparent so its thumb is the only thing it paints. */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 h-1 rounded-full bg-white/25"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute left-0 h-1 rounded-full bg-white/35"
            style={{ width: `${loaded}%` }}
          />
          <span
            aria-hidden
            className="pointer-events-none absolute left-0 h-1 rounded-full bg-white"
            style={{ width: `${played}%` }}
          />
          <input
            id={seekId}
            type="range"
            min={0}
            max={duration || 0}
            step={0.01}
            value={current}
            onChange={(event) => handleSeek(Number(event.target.value))}
            aria-valuetext={`${formatTime(current)} of ${formatTime(duration)}`}
            className={cn(
              "relative m-0 h-4 w-full cursor-pointer appearance-none bg-transparent outline-none",
              // Both vendor thumbs, or Firefox falls back to a default one.
              "[&::-webkit-slider-thumb]:size-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-sm",
              "[&::-moz-range-thumb]:size-3 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-white",
              "focus-visible:[&::-webkit-slider-thumb]:ring-2 focus-visible:[&::-webkit-slider-thumb]:ring-white/70",
            )}
          />
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            className={overlayControl}
            aria-label={playing ? "Pause" : "Play"}
            onClick={handleTogglePlay}
          >
            {playing ? (
              <IconPause size={18} className="size-4.5" aria-hidden />
            ) : (
              <IconPlay size={18} className="size-4.5" aria-hidden />
            )}
          </button>
          <button
            type="button"
            className={overlayControl}
            aria-label={muted ? "Unmute" : "Mute"}
            onClick={handleToggleMute}
          >
            {muted ? (
              <IconVolumeOff size={18} className="size-4.5" aria-hidden />
            ) : (
              <IconVolumeFull size={18} className="size-4.5" aria-hidden />
            )}
          </button>
          <span className="text-xs ml-1 font-mono text-white/80 tabular-nums">
            {formatTime(current)} / {formatTime(duration)}
          </span>
          <button
            type="button"
            className={cn(overlayControl, "ml-auto")}
            aria-label="Fullscreen"
            onClick={handleFullscreen}
          >
            <IconFullScreen size={18} className="size-4.5" aria-hidden />
          </button>
        </div>
      </div>
    </div>
  )
}
