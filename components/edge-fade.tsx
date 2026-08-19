type EdgeFadeTone = "surface" | "background-primary"

type EdgeFadeProps = {
  edge: "top" | "bottom"
  tone?: EdgeFadeTone
}

const toneGradient = {
  surface: "from-surface/80 via-surface/40",
  "background-primary":
    "from-background-primary/80 via-background-primary/40",
} as const

const maskTop =
  "linear-gradient(to bottom, black 0%, black 35%, transparent 100%)"
const maskBottom =
  "linear-gradient(to bottom, transparent 0%, black 65%, black 100%)"

/**
 * Soft blur + tint for scroll edges (Resurf-style).
 * Blur and tint share one mask so they fade together — mismatched curves
 * read as a muddy wash instead of glass.
 * Position/size the parent; this fills it.
 *
 * Avoid `overflow: hidden` on ancestors of this fade when possible —
 * it can prevent backdrop-filter from sampling the scrolling content.
 */
export const EdgeFade = ({
  edge,
  tone = "surface",
}: EdgeFadeProps) => {
  const isTop = edge === "top"
  const gradient = toneGradient[tone]
  const mask = isTop ? maskTop : maskBottom

  return (
    <>
      <div
        aria-hidden
        className="absolute inset-0 backdrop-blur-md backdrop-saturate-150"
        style={{
          maskImage: mask,
          WebkitMaskImage: mask,
        }}
      />
      <div
        aria-hidden
        className={`absolute inset-0 to-transparent ${gradient} ${
          isTop ? "bg-gradient-to-b" : "bg-gradient-to-t"
        }`}
        style={{
          maskImage: mask,
          WebkitMaskImage: mask,
        }}
      />
    </>
  )
}
