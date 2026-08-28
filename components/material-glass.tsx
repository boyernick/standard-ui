import { PAGE_INNER } from "@/lib/chrome"

/**
 * The first specimen sits on a flat surface on purpose. Glass over a busy
 * backdrop flatters itself — the blur has something to chew on and any material
 * looks convincing. Flat is the honest test: blurring a uniform field returns
 * the same field, so whatever is still visible there is the fill and the rim
 * doing the work, which is the whole reason the floating idiom exists.
 */
const HUES = [
  "bg-chart-1",
  "bg-chart-2",
  "bg-chart-3",
  "bg-chart-4",
  "bg-chart-5",
  "bg-chart-6",
  "bg-chart-7",
]

const Stripes = () => (
  <div aria-hidden className="flex h-28">
    {HUES.map((hue) => (
      <span key={hue} className={`flex-1 ${hue}`} />
    ))}
  </div>
)

const Pill = ({ className = "" }: { className?: string }) => (
  <span
    className={`glass inline-flex h-9 items-center rounded-full border px-4 text-xs-strong text-fg-primary shadow-md ${className}`}
  >
    Floating
  </span>
)

export const MaterialGlass = () => (
  <section aria-labelledby="glass" className="border-t border-border-primary">
    <div className={`${PAGE_INNER} py-10`}>
      <h2 id="glass" className="heading-sm text-fg-primary">
        Glass
      </h2>
      <p className="text-sm mt-1 max-w-2xl text-fg-secondary">
        Two idioms. <code className="font-mono text-fg-primary">glass</code> is a
        floating object — a control that has to read on any backdrop, including
        a flat one. Its fill and rim default to{" "}
        <code className="font-mono text-fg-primary">--alpha-base</code>, so it
        lightens over dark and darkens over light without being told which.{" "}
        <code className="font-mono text-fg-primary">glass-panel</code> is a bar:
        page-tinted and nearly opaque, meant to read as the page rather than as
        an object on it.
      </p>

      <div className="mt-6 flex flex-col gap-3">
        <div className="flex items-center justify-between gap-4 rounded-xl border border-border-primary bg-background-primary px-6 py-8">
          <Pill />
          <span className="text-xs text-fg-tertiary">
            On a flat surface — no backdrop for the blur to work on
          </span>
        </div>

        <div className="relative isolate overflow-hidden rounded-xl shadow-sm">
          <Stripes />
          <div className="absolute inset-0 flex items-center justify-between gap-4 px-6">
            <Pill />
            <span className="text-xs-strong text-white">Over content</span>
          </div>
        </div>

        <div className="relative isolate overflow-hidden rounded-xl shadow-sm">
          <Stripes />
          <div className="glass-panel absolute inset-x-0 bottom-0 flex flex-wrap items-baseline justify-between gap-x-4 px-4 py-3">
            <code className="text-xs font-mono text-fg-primary">
              glass-panel
            </code>
            <span className="text-xs text-fg-secondary">
              Docked bar — reads as the page
            </span>
          </div>
        </div>
      </div>

      <p className="text-sm mt-4 max-w-2xl text-fg-tertiary">
        Chrome that must stay dark whatever the theme — controls over video or
        photography — sets its tint and rim explicitly instead of inheriting the
        adaptive default. Blur is among the most expensive things a browser
        paints, so both idioms belong on floating chrome and not on ordinary
        surfaces. Where a reader has asked for reduced transparency, the blur is
        dropped and the surface fills solid.
      </p>
    </div>
  </section>
)
