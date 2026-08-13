import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { typeScale } from "@/lib/tokens";

export const metadata: Metadata = {
  title: "Typography",
};

const families = [
  {
    name: "Instrument Serif",
    role: "Display",
    token: "--font-serif",
    className: "font-serif text-heading-lg",
    sample: "Introduction",
  },
  {
    name: "Geist Sans",
    role: "UI and body",
    token: "--font-geist-sans",
    className: "font-sans text-heading-lg",
    sample: "Standard UI",
  },
  {
    name: "Geist Mono",
    role: "Code and tokens",
    token: "--font-geist-mono",
    className: "font-mono text-heading-md",
    sample: "var(--gray-500)",
  },
];

const sizeClass: Record<string, string> = {
  display: "text-display",
  "heading-lg": "text-heading-lg",
  "heading-md": "text-heading-md",
  "heading-sm": "text-heading-sm",
  body: "text-body",
  caption: "text-caption",
};

export default function TypographyPage() {
  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader
        title="Typography"
        description="Serif for page titles. Geist Sans for interface. Geist Mono for tokens and code."
      />

      <section>
        <h2 className="text-heading-sm font-medium text-fg">Families</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {families.map((family) => (
            <div
              key={family.name}
              className="rounded-xl border border-line bg-surface p-5"
            >
              <p className={family.className}>{family.sample}</p>
              <p className="mt-4 text-body font-medium text-fg">{family.name}</p>
              <p className="text-caption text-muted">{family.role}</p>
              <p className="mt-1 font-mono text-caption text-muted">
                {family.token}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-heading-sm font-medium text-fg">Scale</h2>
        <div className="mt-4 divide-y divide-line overflow-hidden rounded-xl border border-line bg-surface">
          {typeScale.map((item) => (
            <div key={item.token} className="grid gap-4 p-5 md:grid-cols-[11rem_1fr]">
              <div className="text-caption text-muted">
                <p className="font-mono text-fg">{item.token}</p>
                <p className="mt-1">
                  {item.size} / {item.lineHeight}
                </p>
                <p>{item.family}</p>
              </div>
              <p
                className={`${sizeClass[item.token]} text-fg ${
                  item.family === "serif" ? "font-serif" : "font-sans"
                }`}
              >
                {item.sample}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
