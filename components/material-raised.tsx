import { PAGE_INNER } from "@/lib/chrome"

/**
 * The same shapes the reference demo used — a round control, a pill, a bar with
 * a nested child — because the material only proves itself at those sizes. A
 * swatch cannot show a rim that varies around a perimeter.
 */
const Circle = ({ children }: { children: React.ReactNode }) => (
  <span className="raised inline-grid size-14 place-items-center rounded-full text-fg-primary">
    {children}
  </span>
)

export const MaterialRaised = () => (
  <section aria-labelledby="raised" className="border-t border-border-primary">
    <div className={`${PAGE_INNER} py-10`}>
      <h2 id="raised" className="heading-sm text-fg-primary">
        Raised
      </h2>
      <p className="text-sm mt-1 max-w-2xl text-fg-secondary">
        An opaque, lit material for floating controls. Where{" "}
        <code className="font-mono text-fg-primary">glass</code> borrows what is
        behind it, this carries its own light — a fill brighter at the top, a
        specular pool at the top edge, and a perimeter that is bright where the
        light lands and dim where it does not. That varying rim is what reads as
        a raised object rather than a bordered box, and it is why the material
        holds up on a flat backdrop.
      </p>

      <div className="mt-6 flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-4 rounded-xl border border-border-primary bg-background-primary p-8">
          <Circle>
            <svg viewBox="0 0 24 24" className="size-5" fill="none" aria-hidden>
              <path
                d="M15 18 9 12l6-6"
                stroke="currentColor"
                strokeWidth={2.2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Circle>
          <span className="raised inline-flex h-14 items-center gap-3 rounded-full px-5 text-sm-strong text-fg-primary">
            Share
            <span aria-hidden className="flex gap-1">
              <span className="size-1 rounded-full bg-current" />
              <span className="size-1 rounded-full bg-current" />
              <span className="size-1 rounded-full bg-current" />
            </span>
          </span>
          <span className="raised inline-flex h-14 items-center rounded-full px-1.5 text-sm text-fg-primary">
            <span className="px-4">Cut</span>
            <span aria-hidden className="h-7 w-px bg-border-secondary" />
            <span className="px-4">Copy</span>
            <span aria-hidden className="h-7 w-px bg-border-secondary" />
            <span className="px-4 text-destructive">Delete</span>
          </span>
        </div>
      </div>

      <p className="text-sm mt-4 max-w-2xl text-fg-tertiary">
        Light and dark are not a token flip. On a dark page the light lands on
        the top edge and the rim is white; on a light page a white top edge is
        invisible against the page, so what describes the shape is the shadowed
        underside and the rim darkens downwards instead.
      </p>
    </div>
  </section>
)
