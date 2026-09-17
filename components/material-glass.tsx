"use client"

import Image from "next/image"
import { Glass, GlassRoot } from "@boyernick/standard-ui-react/glass"
import { PAGE_INNER } from "@/lib/chrome"

export const MaterialGlass = () => (
  <section aria-labelledby="glass">
    <div className={`${PAGE_INNER} py-10`}>
      <h2 id="glass" className="heading-sm text-fg-primary">
        Glass
      </h2>
      <p className="text-sm mt-1 max-w-2xl text-fg-secondary">
        Refractive WebGL glass for floating controls and surfaces over visual
        content.
      </p>

      <GlassRoot className="mt-6 h-72 overflow-hidden rounded-xl bg-background-secondary">
        <Image
          src="/gallery/coast.jpg"
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 900px"
          className="object-cover"
        />
        <Glass
          config={{ cornerRadius: 28, zRadius: 28 }}
          className="absolute left-1/2 top-1/2 flex h-20 w-48 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[28px] text-sm-strong text-white"
        >
          Liquid Glass
        </Glass>
      </GlassRoot>

      <div className="mt-4 grid gap-1 text-xs text-fg-secondary sm:grid-cols-2">
        <code className="font-mono text-fg-primary">GlassRoot + Glass</code>
        <span className="sm:text-right">@ybouane/liquidglass · WebGL</span>
      </div>
    </div>
  </section>
)
