import { PAGE_INNER } from "@/lib/chrome"

/**
 * Glass cannot be shown in the swatch column the other bands use — a 48px
 * square of translucency over a plain page shows nothing. Each row here floats
 * the surface over a band of colour instead, which is the only way the blur and
 * the tint are visible at all.
 */
const SAMPLES = [
  {
    className: "glass",
    usage: "Chrome over the page",
    label: "text-fg-primary",
  },
  {
    className: "glass [--glass-opacity:95%] [--glass-blur:8px]",
    usage: "Docked bar, nearly opaque",
    label: "text-fg-primary",
  },
  {
    className: "glass [--glass-tint:var(--black)] [--glass-opacity:45%]",
    usage: "Control over photography or video",
    label: "text-white",
  },
]

const HUES = [
  "bg-chart-1",
  "bg-chart-2",
  "bg-chart-3",
  "bg-chart-4",
  "bg-chart-5",
  "bg-chart-6",
  "bg-chart-7",
]

export const MaterialGlass = () => (
  <section aria-labelledby="glass" className="border-t border-border-primary">
    <div className={`${PAGE_INNER} py-10`}>
      <h2 id="glass" className="heading-sm text-fg-primary">
        Glass
      </h2>
      <p className="text-sm mt-1 max-w-2xl text-fg-secondary">
        A translucent surface that takes its colour from whatever sits behind
        it. One utility with three parameters — set{" "}
        <code className="font-mono text-fg-primary">--glass-tint</code>,{" "}
        <code className="font-mono text-fg-primary">--glass-opacity</code> and{" "}
        <code className="font-mono text-fg-primary">--glass-blur</code> at the
        call site — because the tint belongs to the context, not the material.
      </p>

      <div className="mt-6 flex flex-col gap-3">
        {SAMPLES.map((sample) => (
          <div
            key={sample.className}
            className="relative isolate overflow-hidden rounded-xl shadow-sm"
          >
            <div aria-hidden className="flex h-24">
              {HUES.map((hue) => (
                <span key={hue} className={`flex-1 ${hue}`} />
              ))}
            </div>
            <div
              className={`absolute inset-x-0 bottom-0 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 px-4 py-3 ${sample.className}`}
            >
              <code className={`text-xs font-mono ${sample.label}`}>
                {sample.className}
              </code>
              <span className={`text-xs ${sample.label} opacity-70`}>
                {sample.usage}
              </span>
            </div>
          </div>
        ))}
      </div>

      <p className="text-sm mt-4 max-w-2xl text-fg-tertiary">
        Blur is among the most expensive things a browser paints, so this
        belongs on floating chrome — bars, badges, controls — and not on
        ordinary surfaces. Where a reader has asked for reduced transparency,
        every glass surface falls back to its opaque tint with the blur removed.
      </p>
    </div>
  </section>
)
