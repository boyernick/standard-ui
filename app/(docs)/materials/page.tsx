import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { radii, shadows } from "@/lib/tokens";

export const metadata: Metadata = {
  title: "Materials",
};

const radiusOrder = ["sm", "md", "lg", "xl", "2xl", "full"] as const;

const shadowClass: Record<(typeof shadows)[number]["name"], string> = {
  "ring-xs": "shadow-ring-xs",
  "ring-sm": "shadow-ring-sm",
  "ring-md": "shadow-ring-md",
  "ring-lg": "shadow-ring-lg",
  "ring-xl": "shadow-ring-xl",
  "ring-2xl": "shadow-ring-2xl",
};

export default function MaterialsPage() {
  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader
        title="Materials"
        description="Radius scale and shadow-ring elevation. The hairline is baked into every shadow — do not add a border on the same element."
      />

      <section>
        <h2 className="type-title-5 text-fg-primary">Radius</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {radiusOrder.map((name) => (
            <div
              key={name}
              className="flex flex-col items-center gap-4 rounded-xl border border-border-primary bg-surface p-5"
            >
              <div
                className="size-20 bg-background-tertiary"
                style={{ borderRadius: `var(--sui-radius-${name})` }}
              />
              <div className="text-center">
                <p className="type-tiny-strong font-mono text-fg-primary">
                  --radius-{name}
                </p>
                <p className="type-tiny text-fg-tertiary">{radii[name]}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="type-title-5 text-fg-primary">Shadow ring</h2>
        <p className="type-small mt-1 text-fg-secondary">
          Use these for anything that floats. Flat layout chrome (sidebar, tables) uses a border instead.
        </p>
        <div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {shadows.map((item) => (
            <div
              key={item.name}
              className="flex flex-col items-center gap-4 rounded-xl bg-background-secondary p-8"
            >
              <div
                className={`h-24 w-full max-w-40 rounded-lg bg-surface ${shadowClass[item.name]}`}
              />
              <div className="text-center">
                <p className="type-tiny-strong font-mono text-fg-primary">
                  shadow-{item.name}
                </p>
                <p className="type-tiny text-fg-tertiary">{item.usage}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
