import Link from "next/link";

function Card({
  href,
  title,
  description,
  children,
}: {
  href?: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  const inner = (
    <>
      <div className="flex min-h-40 items-center justify-center rounded-[20px] bg-subtle p-6">
        {children}
      </div>
      <div className="px-1 pt-4">
        <h2 className="text-heading-sm font-medium text-fg">{title}</h2>
        <p className="mt-1 text-body text-muted">{description}</p>
      </div>
    </>
  );

  const className =
    "rounded-xl bg-surface p-3 shadow-hairline transition-shadow hover:shadow-sm";

  if (href) {
    return (
      <Link href={href} className={`${className} block`}>
        {inner}
      </Link>
    );
  }

  return <div className={className}>{inner}</div>;
}

function BrandPreview() {
  return (
    <p className="font-serif text-heading-lg tracking-tight text-fg">standardUI</p>
  );
}

function ComponentsPreview() {
  return (
    <div className="flex w-full max-w-xs flex-wrap items-center justify-center gap-2">
      <span className="h-8 w-24 rounded-md border border-line bg-surface" />
      <span className="inline-flex h-8 items-center gap-1 rounded-md border border-line bg-surface px-2 text-caption text-fg">
        + Button
        <svg viewBox="0 0 12 12" className="size-3 text-muted" aria-hidden>
          <path d="M3 4.5 6 8l3-3.5" fill="none" stroke="currentColor" strokeWidth="1.3" />
        </svg>
      </span>
      <span className="inline-flex h-8 items-center rounded-md bg-surface px-1 text-caption">
        <span className="rounded-sm bg-subtle px-2 py-1 text-fg">Tab</span>
        <span className="px-2 py-1 text-muted">Tab</span>
      </span>
      <span className="inline-flex h-8 items-center gap-1.5 rounded-md border border-line bg-surface px-2 text-caption text-fg">
        Alerts
        <span className="inline-flex size-4 items-center justify-center rounded-full bg-gray-1000 text-[10px] text-gray-100">
          2
        </span>
      </span>
      <span className="relative inline-flex h-6 w-10 items-center rounded-full bg-accent">
        <span className="absolute right-0.5 size-5 rounded-full bg-accent-foreground" />
      </span>
      <span className="inline-flex items-center gap-1.5 text-caption text-fg">
        <span className="size-3.5 rounded-full border-[4px] border-fg" />
        Label
      </span>
    </div>
  );
}

function ColorsPreview() {
  return (
    <div className="flex gap-3">
      <div className="flex">
        {["#f7f7f5", "#d2d2ce", "#8c8c86", "#3c3c38", "#181816"].map((hex) => (
          <span
            key={hex}
            className="size-6 rounded-full ring-2 ring-subtle first:ml-0 -ml-1.5"
            style={{ background: hex }}
          />
        ))}
      </div>
      <div className="flex">
        {["#f6f1ea", "#c9b396", "#8c6e52", "#4a3a2e"].map((hex) => (
          <span
            key={hex}
            className="size-6 rounded-full ring-2 ring-subtle first:ml-0 -ml-1.5"
            style={{ background: hex }}
          />
        ))}
      </div>
      <div className="flex">
        {["#e7f0ea", "#6f9a7c", "#2c4d38", "#122018"].map((hex) => (
          <span
            key={hex}
            className="size-6 rounded-full ring-2 ring-subtle first:ml-0 -ml-1.5"
            style={{ background: hex }}
          />
        ))}
      </div>
    </div>
  );
}

function MaterialsPreview() {
  return (
    <div className="flex items-end gap-3">
      <span className="size-10 rounded-sm bg-surface shadow-hairline" />
      <span className="size-12 rounded-md bg-surface shadow-sm" />
      <span className="size-14 rounded-lg bg-surface shadow-md" />
    </div>
  );
}

export function IntroCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card
        href="/brand"
        title="Brand Assets"
        description="Foundational elements for the Standard UI brand."
      >
        <BrandPreview />
      </Card>
      <Card
        title="Components"
        description="Building blocks for the Standard UI interface. Coming next."
      >
        <ComponentsPreview />
      </Card>
      <Card
        href="/colors"
        title="Colors"
        description="A subtle, elevated palette of gray, warm, and green."
      >
        <ColorsPreview />
      </Card>
      <Card
        href="/materials"
        title="Materials"
        description="Radii, fills, strokes, and shadows used across the system."
      >
        <MaterialsPreview />
      </Card>
    </div>
  );
}
