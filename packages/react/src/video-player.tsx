"use client"

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ComponentProps,
} from "react"
import { IconExclamationTriangle } from "@central-icons-react/round-filled-radius-2-stroke-2/IconExclamationTriangle"
import { IconFullScreen } from "@central-icons-react/round-filled-radius-2-stroke-2/IconFullScreen"
import { IconPause } from "@central-icons-react/round-filled-radius-2-stroke-2/IconPause"
import { IconPlay } from "@central-icons-react/round-filled-radius-2-stroke-2/IconPlay"
import { IconVolumeFull } from "@central-icons-react/round-filled-radius-2-stroke-2/IconVolumeFull"
import { IconVolumeOff } from "@central-icons-react/round-filled-radius-2-stroke-2/IconVolumeOff"
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
  "inline-flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-lg text-white outline-none transition-[background-color,transform] duration-[var(--duration-sm)] ease-enter hover:bg-white/15 active:scale-95 focus-visible:bg-white/15 focus-visible:ring-2 focus-visible:ring-white/70 motion-reduce:transition-none motion-reduce:active:scale-100"

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
  const playerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const seekPreviewRef = useRef<HTMLSpanElement>(null)
  const seekId = useId()
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)
  const [loading, setLoading] = useState(true)
  const [buffering, setBuffering] = useState(false)
  const [ended, setEnded] = useState(false)
  const [failed, setFailed] = useState(false)
  const [fullscreen, setFullscreen] = useState(false)
  const [current, setCurrent] = useState(0)
  const [duration, setDuration] = useState(0)
  const [buffered, setBuffered] = useState(0)

  const handleTogglePlay = useCallback(() => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      if (video.ended) video.currentTime = 0
      setEnded(false)
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
    setEnded(false)
  }, [])

  const showSeekPreview = useCallback(
    (value: number) => {
      const preview = seekPreviewRef.current
      if (!preview || duration <= 0) return
      const boundedValue = Math.min(Math.max(value, 0), duration)
      preview.textContent = formatTime(boundedValue)
      preview.style.left = `${(boundedValue / duration) * 100}%`
      preview.dataset.visible = ""
    },
    [duration],
  )

  const hideSeekPreview = useCallback(() => {
    seekPreviewRef.current?.removeAttribute("data-visible")
  }, [])

  const handleFullscreen = useCallback(() => {
    const player = playerRef.current
    if (!player) return
    if (document.fullscreenElement) {
      void document.exitFullscreen()
      return
    }
    void player.requestFullscreen?.()
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const readBuffered = () => {
      if (video.buffered.length === 0) return
      setBuffered(video.buffered.end(video.buffered.length - 1))
    }
    const handleLoadStart = () => {
      setLoading(true)
      setBuffering(false)
      setFailed(false)
    }
    const handleReady = () => {
      setLoading(false)
      setBuffering(false)
      setFailed(false)
    }
    const handlePlay = () => {
      setPlaying(true)
      setEnded(false)
      setLoading(false)
      setBuffering(false)
    }
    const handlePause = () => setPlaying(false)
    const handleWaiting = () => {
      if (!video.paused) setBuffering(true)
    }
    const handleTime = () => {
      setCurrent(video.currentTime)
      if (video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
        setBuffering(false)
      }
    }
    const handleMeta = () => setDuration(video.duration || 0)
    const handleVolume = () => setMuted(video.muted)
    const handleEnded = () => {
      setPlaying(false)
      setBuffering(false)
      setEnded(true)
    }
    const handleError = () => {
      setPlaying(false)
      setLoading(false)
      setBuffering(false)
      setFailed(true)
    }

    // A cached video can be ready before this effect runs, in which case
    // `loadedmetadata` has already fired and the readout would sit at 0:00
    // forever. Seed from the element, then keep up with the events.
    handleMeta()
    handleTime()
    handleVolume()
    readBuffered()
    setPlaying(!video.paused)
    setLoading(video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA)
    setFailed(Boolean(video.error))

    video.addEventListener("loadstart", handleLoadStart)
    video.addEventListener("loadeddata", handleReady)
    video.addEventListener("canplay", handleReady)
    video.addEventListener("play", handlePlay)
    video.addEventListener("playing", handlePlay)
    video.addEventListener("pause", handlePause)
    video.addEventListener("waiting", handleWaiting)
    video.addEventListener("stalled", handleWaiting)
    video.addEventListener("timeupdate", handleTime)
    video.addEventListener("loadedmetadata", handleMeta)
    video.addEventListener("durationchange", handleMeta)
    video.addEventListener("volumechange", handleVolume)
    video.addEventListener("progress", readBuffered)
    video.addEventListener("ended", handleEnded)
    video.addEventListener("error", handleError)

    return () => {
      video.removeEventListener("loadstart", handleLoadStart)
      video.removeEventListener("loadeddata", handleReady)
      video.removeEventListener("canplay", handleReady)
      video.removeEventListener("play", handlePlay)
      video.removeEventListener("playing", handlePlay)
      video.removeEventListener("pause", handlePause)
      video.removeEventListener("waiting", handleWaiting)
      video.removeEventListener("stalled", handleWaiting)
      video.removeEventListener("timeupdate", handleTime)
      video.removeEventListener("loadedmetadata", handleMeta)
      video.removeEventListener("durationchange", handleMeta)
      video.removeEventListener("volumechange", handleVolume)
      video.removeEventListener("progress", readBuffered)
      video.removeEventListener("ended", handleEnded)
      video.removeEventListener("error", handleError)
    }
  }, [])

  useEffect(() => {
    const handleFullscreenChange = () => {
      setFullscreen(document.fullscreenElement === playerRef.current)
    }

    handleFullscreenChange()
    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [])

  const played = duration > 0 ? (current / duration) * 100 : 0
  const loaded = duration > 0 ? (buffered / duration) * 100 : 0

  return (
    <div
      ref={playerRef}
      data-slot="video-player"
      data-playing={playing || undefined}
      data-loading={loading || undefined}
      data-buffering={buffering || undefined}
      data-ended={ended || undefined}
      data-error={failed || undefined}
      data-fullscreen={fullscreen || undefined}
      // `group` drives the chrome: it hides while playing and comes back on
      // hover or when anything inside takes focus.
      className={cn(
        "group relative isolate overflow-hidden rounded-xl bg-black shadow-md ring-1 ring-border-primary data-[fullscreen]:h-screen data-[fullscreen]:w-screen data-[fullscreen]:rounded-none data-[fullscreen]:ring-0 fullscreen:h-screen fullscreen:w-screen fullscreen:rounded-none fullscreen:ring-0",
        className,
      )}
      aria-busy={loading || buffering || undefined}
      {...props}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        preload="auto"
        playsInline
        className="aspect-video w-full cursor-pointer object-cover group-data-[fullscreen]:h-full group-data-[fullscreen]:w-full group-data-[fullscreen]:aspect-auto group-data-[fullscreen]:object-cover"
        aria-label={ariaLabel ?? title ?? "Video"}
        onClick={handleTogglePlay}
      />

      {/* These centred states stay inert so the video remains the click target. */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        {failed ? (
          <div
            role="alert"
            className="mx-6 flex max-w-sm flex-col items-center gap-2 rounded-xl border border-white/15 bg-black/65 px-5 py-4 text-center text-white shadow-lg backdrop-blur-md"
          >
            <IconExclamationTriangle size={22} className="size-5.5" aria-hidden />
            <span className="text-sm-strong">Video unavailable</span>
            <span className="text-xs text-white/70">
              Check the source and try again.
            </span>
          </div>
        ) : loading || buffering ? (
          <div
            role="status"
            className="flex size-14 items-center justify-center rounded-full border border-white/15 bg-black/45 text-white shadow-lg backdrop-blur-md"
          >
            <span className="size-6 animate-spin rounded-full border-2 border-white/30 border-t-white motion-reduce:animate-none" />
            <span className="sr-only">
              {buffering ? "Buffering video" : "Loading video"}
            </span>
          </div>
        ) : !playing ? (
          <div
            className={cn(
              "flex items-center justify-center rounded-full border border-white/20 bg-black/45 text-white shadow-lg backdrop-blur-md",
              ended ? "h-12 gap-2 px-4" : "size-14",
            )}
          >
            <IconPlay
              size={ended ? 18 : 24}
              className={cn(ended ? "size-4.5" : "ml-0.5 size-6")}
              aria-hidden
            />
            {ended ? <span className="text-sm-strong">Replay</span> : null}
          </div>
        ) : null}
      </div>

      {!failed && !loading ? (
        <div
          className={cn(
            "absolute inset-x-0 bottom-0 flex translate-y-0 flex-col bg-gradient-to-t from-black/85 via-black/55 to-transparent px-4 pt-14 pb-3 transition-[opacity,transform] duration-[var(--duration-md)] ease-enter group-data-[fullscreen]:px-6 group-data-[fullscreen]:pb-6 motion-reduce:transition-none",
            "group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100",
            // Nothing hovers on a touch screen, so the chrome would never come
            // back once playback started. Keep it visible there instead.
            "[@media(hover:none)]:translate-y-0 [@media(hover:none)]:opacity-100",
            playing ? "translate-y-2 opacity-0" : "opacity-100",
          )}
        >
          {title ? (
            <p className="text-sm-strong mb-2 truncate text-white">{title}</p>
          ) : null}

          <label className="sr-only" htmlFor={seekId}>
            Seek
          </label>
          <div className="group/seek relative flex h-5 items-center">
            <span
              ref={seekPreviewRef}
              className="text-xs pointer-events-none absolute -top-8 z-10 -translate-x-1/2 rounded-md bg-black/80 px-1.5 py-1 text-white opacity-0 shadow-sm transition-opacity duration-[var(--duration-sm)] data-[visible]:opacity-100 motion-reduce:transition-none"
            />
            {/* Track, buffered fill and played fill sit under the input, which
                stays transparent so its thumb is the only thing it paints. */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-0 h-0.75 rounded-full bg-white/25 transition-[height] duration-[var(--duration-sm)] group-hover/seek:h-1.5 group-focus-within/seek:h-1.5 motion-reduce:transition-none"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute left-0 h-0.75 rounded-full bg-white/35 transition-[height] duration-[var(--duration-sm)] group-hover/seek:h-1.5 group-focus-within/seek:h-1.5 motion-reduce:transition-none"
              style={{ width: `${loaded}%` }}
            />
            <span
              aria-hidden
              className="pointer-events-none absolute left-0 h-0.75 rounded-full bg-white transition-[height] duration-[var(--duration-sm)] group-hover/seek:h-1.5 group-focus-within/seek:h-1.5 motion-reduce:transition-none"
              style={{ width: `${played}%` }}
            />
            <input
              id={seekId}
              type="range"
              min={0}
              max={duration || 0}
              step={0.01}
              value={current}
              onChange={(event) => {
                const value = Number(event.target.value)
                handleSeek(value)
                showSeekPreview(value)
              }}
              onPointerMove={(event) => {
                if (duration <= 0) return
                const rect = event.currentTarget.getBoundingClientRect()
                const ratio = Math.min(
                  Math.max((event.clientX - rect.left) / rect.width, 0),
                  1,
                )
                showSeekPreview(ratio * duration)
              }}
              onPointerLeave={(event) => {
                if (document.activeElement !== event.currentTarget) {
                  hideSeekPreview()
                }
              }}
              onFocus={() => showSeekPreview(current)}
              onBlur={hideSeekPreview}
              aria-valuetext={`${formatTime(current)} of ${formatTime(duration)}`}
              className={cn(
                "relative m-0 h-5 w-full cursor-pointer appearance-none bg-transparent outline-none",
                // Both vendor thumbs, or Firefox falls back to a default one.
                "[&::-webkit-slider-thumb]:size-3.5 [&::-webkit-slider-thumb]:scale-75 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:opacity-0 [&::-webkit-slider-thumb]:shadow-sm [&::-webkit-slider-thumb]:transition-[opacity,transform] [&:hover::-webkit-slider-thumb]:scale-100 [&:hover::-webkit-slider-thumb]:opacity-100",
                "[&::-moz-range-thumb]:size-3.5 [&::-moz-range-thumb]:scale-75 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:opacity-0 [&::-moz-range-thumb]:transition-[opacity,transform] [&:hover::-moz-range-thumb]:scale-100 [&:hover::-moz-range-thumb]:opacity-100",
                "focus-visible:[&::-webkit-slider-thumb]:ring-2 focus-visible:[&::-webkit-slider-thumb]:ring-white/70",
                "focus-visible:[&::-webkit-slider-thumb]:scale-100 focus-visible:[&::-webkit-slider-thumb]:opacity-100 focus-visible:[&::-moz-range-thumb]:scale-100 focus-visible:[&::-moz-range-thumb]:opacity-100",
              )}
            />
          </div>

          <div className="mt-0.5 flex items-center gap-2">
            <button
              type="button"
              className={overlayControl}
              aria-label={ended ? "Replay" : playing ? "Pause" : "Play"}
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
            <span className="text-xs text-white/85 tabular-nums">
              {formatTime(current)} <span className="text-white/45">/</span>{" "}
              {formatTime(duration)}
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
      ) : null}
    </div>
  )
}
