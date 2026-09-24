"use client"

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
  type ComponentProps,
} from "react"
import { IconExclamationTriangle } from "@central-icons-react/round-filled-radius-2-stroke-2/IconExclamationTriangle"
import { IconFullScreen } from "@central-icons-react/round-filled-radius-2-stroke-2/IconFullScreen"
import { IconPause } from "@central-icons-react/round-filled-radius-2-stroke-2/IconPause"
import { IconPictureInPicture } from "@central-icons-react/round-filled-radius-2-stroke-2/IconPictureInPicture"
import { IconPlay } from "@central-icons-react/round-filled-radius-2-stroke-2/IconPlay"
import { IconVolumeFull } from "@central-icons-react/round-filled-radius-2-stroke-2/IconVolumeFull"
import { IconVolumeOff } from "@central-icons-react/round-filled-radius-2-stroke-2/IconVolumeOff"
import { cn } from "./lib/cn"
import { Glass, GlassButton, GlassRoot } from "./glass"
import { mediaGlass } from "./lib/media-glass"

/**
 * Picture-in-Picture support is a static browser capability, not React state.
 * Reading it through an external store keeps the server snapshot `false` so
 * hydration matches, without a post-mount setState that re-renders the player.
 */
const subscribePipSupport = () => () => { }
const getPipSupported = () => document.pictureInPictureEnabled
const getPipSupportedOnServer = () => false

const formatTime = (seconds: number) => {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00"
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, "0")}`
}

// All panes are direct children of the video root, sharing one WebGL context.


export type VideoPlayerProps = ComponentProps<"div"> & {
  src: string
  poster?: string
  title?: string
  /** Accessible name for the video. Defaults to title. */
  "aria-label"?: string
  /**
   * CORS mode for the video. The glass controls can only refract frames the
   * page may read, which needs the host to allow cross-origin reads. By
   * default the player asks with `anonymous` and, if the host refuses and the
   * video fails to load, loads it once more without CORS — the video plays
   * either way, and the controls fall back to the ground colour. Pass a mode
   * to fix it, or `null` never to ask.
   */
  crossOrigin?: "anonymous" | "use-credentials" | null
}

export const VideoPlayer = ({
  src,
  poster,
  title,
  className,
  "aria-label": ariaLabel,
  crossOrigin,
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
  // Automatic CORS: ask first, fall back once if the host refuses.
  const automaticCors = crossOrigin === undefined
  const [corsRefused, setCorsRefused] = useState(false)
  const corsRef = useRef({ automatic: automaticCors, refused: false })
  corsRef.current.automatic = automaticCors
  const videoCrossOrigin = automaticCors
    ? corsRefused ? undefined : "anonymous"
    : crossOrigin ?? undefined
  const [fullscreen, setFullscreen] = useState(false)
  const pipSupported = useSyncExternalStore(
    subscribePipSupport,
    getPipSupported,
    getPipSupportedOnServer,
  )
  const [pipActive, setPipActive] = useState(false)
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

  const handlePictureInPicture = useCallback(() => {
    const video = videoRef.current
    if (!video || !document.pictureInPictureEnabled) return
    if (document.pictureInPictureElement) {
      void document.exitPictureInPicture()
      return
    }
    void video.requestPictureInPicture()
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
      // Refused with CORS: try once more without it, rather than fail.
      if (corsRef.current.automatic && !corsRef.current.refused) {
        corsRef.current.refused = true
        setCorsRefused(true)
        return
      }
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

  // A new source gets a fresh CORS attempt.
  useEffect(() => {
    corsRef.current.refused = false
    setCorsRefused(false)
  }, [src])

  // Changing the crossorigin attribute alone does not refetch; reload so the
  // fallback takes effect.
  const appliedCrossOrigin = useRef(videoCrossOrigin)
  useEffect(() => {
    if (appliedCrossOrigin.current === videoCrossOrigin) return
    appliedCrossOrigin.current = videoCrossOrigin
    videoRef.current?.load()
  }, [videoCrossOrigin])

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

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleEnterPip = () => setPipActive(true)
    const handleLeavePip = () => setPipActive(false)
    video.addEventListener("enterpictureinpicture", handleEnterPip)
    video.addEventListener("leavepictureinpicture", handleLeavePip)
    return () => {
      video.removeEventListener("enterpictureinpicture", handleEnterPip)
      video.removeEventListener("leavepictureinpicture", handleLeavePip)
    }
  }, [])

  const played = duration > 0 ? (current / duration) * 100 : 0
  const loaded = duration > 0 ? (buffered / duration) * 100 : 0
  const remaining = Math.max(duration - current, 0)

  const controlVisibility = cn(
    "glass-optical glass-optical-media absolute bottom-2 transition-opacity duration-[var(--duration-md)] ease-enter group-data-[fullscreen]:bottom-5 motion-reduce:transition-none",
    "group-hover:opacity-100 group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:pointer-events-auto",
    "[@media(hover:none)]:opacity-100 [@media(hover:none)]:pointer-events-auto",
    playing ? "pointer-events-none opacity-0" : "opacity-100",
  )

  return (
    <GlassRoot
      interactiveLighting
      defaults={mediaGlass}
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
        // One edge: the 5% ring, with --shadow-300 alone for depth. shadow-lg
        // carries its own hairline ring and doubled the frame. Black only in
        // fullscreen, where letterboxing needs it: behind the rounded clip it
        // bled through the video's anti-aliased corners as a dark stroke.
        "group relative isolate overflow-hidden rounded-xl shadow-[var(--shadow-300)] ring-1 ring-border-primary data-[fullscreen]:h-screen data-[fullscreen]:w-screen data-[fullscreen]:rounded-none data-[fullscreen]:bg-black data-[fullscreen]:ring-0 fullscreen:h-screen fullscreen:w-screen fullscreen:rounded-none fullscreen:bg-black fullscreen:ring-0",
        className,
      )}
      aria-busy={loading || buffering || undefined}
      {...props}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        crossOrigin={videoCrossOrigin}
        preload="auto"
        playsInline
        className="aspect-video w-full cursor-pointer object-cover group-data-[fullscreen]:h-full group-data-[fullscreen]:w-full group-data-[fullscreen]:aspect-auto group-data-[fullscreen]:object-cover"
        aria-label={ariaLabel ?? title ?? "Video"}
        onClick={handleTogglePlay}
      />

      {/* The status pane stays mounted so startup owns a stable set of panes.
          It remains inert; clicking the video still toggles playback. */}
      <Glass
        data-glass-radius="css"
        className={cn(
          "glass-optical glass-optical-media pointer-events-none absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center text-fg-scrim",
          failed ? "max-w-sm flex-col gap-2 rounded-xl px-5 py-4 text-center" : ended ? "h-8 gap-1 rounded-full px-2.5" : "size-11 rounded-full",
          playing && !buffering && !loading && !failed && "invisible",
        )}
      >
        {failed ? (
          <div role="alert" className="flex flex-col items-center gap-2">
            <IconExclamationTriangle size={22} mode="raw" aria-hidden />
            <span className="text-sm-strong">Video unavailable</span>
            <span className="text-xs text-fg-scrim-secondary">Check the source and try again.</span>
          </div>
        ) : loading || buffering ? (
          <div role="status">
            <span className="block size-6 animate-spin rounded-full border-2 border-fg-scrim/30 border-t-fg-scrim motion-reduce:animate-none" />
            <span className="sr-only">{buffering ? "Buffering video" : "Loading video"}</span>
          </div>
        ) : (
          <>
            <IconPlay size={ended ? 12 : 18} mode="raw" className={ended ? "size-3" : "size-4.5"} aria-hidden />
            {ended ? <span className="text-xs-strong">Replay</span> : null}
          </>
        )}
      </Glass>

      <GlassButton
        type="button"
        rounded
        iconOnly
        config={mediaGlass}
        className={cn(controlVisibility, "left-2 group-data-[fullscreen]:left-5", (failed || loading) && "invisible")}
        aria-label={ended ? "Replay" : playing ? "Pause" : "Play"}
        onClick={handleTogglePlay}
      >
        {playing ? (
          <IconPause size={14} mode="raw" className="size-3.5" aria-hidden />
        ) : (
          <IconPlay size={14} mode="raw" className="size-3.5" aria-hidden />
        )}
      </GlassButton>
      <GlassButton
        type="button"
        rounded
        iconOnly
        config={mediaGlass}
        className={cn(controlVisibility, "left-13 group-data-[fullscreen]:left-16", (failed || loading) && "invisible")}
        aria-label={muted ? "Unmute" : "Mute"}
        onClick={handleToggleMute}
      >
        {muted ? (
          <IconVolumeOff
            size={14}
            mode="raw"
            className="size-3.5"
            aria-hidden
          />
        ) : (
          <IconVolumeFull
            size={14}
            mode="raw"
            className="size-3.5"
            aria-hidden
          />
        )}
      </GlassButton>
      <Glass
        data-glass-radius="css"
        className={cn(
          controlVisibility,
          "left-24 flex h-9 min-w-0 items-center gap-2 rounded-full px-3 group-data-[fullscreen]:left-27",
          pipSupported ? "right-24 group-data-[fullscreen]:right-27" : "right-13 group-data-[fullscreen]:right-16",
          (failed || loading) && "invisible",
        )}
      >
        <span className="text-xs min-w-9 shrink-0 tabular-nums text-white/85">
          {formatTime(current)}
        </span>

        <label className="sr-only" htmlFor={seekId}>
          Seek
        </label>
        <div className="group/seek relative flex h-5 min-w-0 flex-1 items-center">
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

        <span className="text-xs min-w-10 shrink-0 text-right tabular-nums text-white/85">
          -{formatTime(remaining)}
        </span>
      </Glass>


      <GlassButton
        type="button"
        rounded
        iconOnly
        config={mediaGlass}
        className={cn(controlVisibility, "right-13 group-data-[fullscreen]:right-16", (!pipSupported || failed || loading) && "invisible")}
        aria-label={
          pipActive
            ? "Exit picture in picture"
            : "Picture in picture"
        }
        aria-pressed={pipActive}
        onClick={handlePictureInPicture}
      >
        <IconPictureInPicture
          size={14}
          mode="raw"
          className="size-3.5"
          aria-hidden
        />
      </GlassButton>
      <GlassButton
        type="button"
        rounded
        iconOnly
        config={mediaGlass}
        className={cn(controlVisibility, "right-2 group-data-[fullscreen]:right-5", (failed || loading) && "invisible")}
        aria-label={fullscreen ? "Exit fullscreen" : "Fullscreen"}
        aria-pressed={fullscreen}
        onClick={handleFullscreen}
      >
        <IconFullScreen
          size={14}
          mode="raw"
          className="size-3.5"
          aria-hidden
        />
      </GlassButton>
    </GlassRoot>
  )
}
