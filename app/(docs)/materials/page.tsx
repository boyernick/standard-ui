import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { radii, shadows } from "@/lib/tokens";

export const metadata: Metadata = {
  title: "Materials",
};

const radiusOrder = ["sm", "md", "lg", "xl", "full"] as const;
const shadowOrder = ["hairline", "sm", "md"] as const;

export default function MaterialsPage() {
  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader
        title="Materials"
        description="Radius and shadow presets. Most chrome uses fill and a hairline stroke, not heavy drop shadows."
      />

      <section>
        <h2 className="text-heading-sm font-medium text-fg">Radius</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {radiusOrder.map((name) => (
            <div
              key={name}
              className="flex flex-col items-center gap-4 rounded-xl border border-line bg-surface p-5"
            >
              <div
                className="size-20 bg-subtle"
                style={{ borderRadius: `var(--radius-${name})` }}
              />
              <div className="text-center">
                <p className="font-mono text-caption text-fg">--radius-{name}</p>
                <p className="text-caption text-muted">{radii[name]}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-heading-sm font-medium text-fg">Shadow</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {shadowOrder.map((name) => (
            <div
              key={name}
              className="flex flex-col items-center gap-4 rounded-xl bg-subtle p-8"
            >
              <div
                className="h-24 w-full max-w-40 rounded-lg bg-surface"
                style={{ boxShadow: `var(--shadow-${name})` }}
              />
              <div className="text-center">
                <p className="font-mono text-caption text-fg">--shadow-{name}</p>
                <p className="max-w-[16rem] font-mono text-[11px] break-all text-muted">
                  {shadows[name]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
