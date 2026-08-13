import { ThemeToggle } from "./theme-toggle";

export function TopBar() {
  return (
    <header className="flex h-14 items-center gap-3 border-b border-line bg-page px-4 md:px-6">
      <div className="relative min-w-0 flex-1">
        <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted">
          <svg viewBox="0 0 16 16" className="size-4" aria-hidden>
            <circle cx="6.5" cy="6.5" r="4.2" fill="none" stroke="currentColor" strokeWidth="1.4" />
            <path d="m10 10 3.2 3.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </span>
        <input
          type="search"
          readOnly
          placeholder="Search…"
          aria-label="Search"
          className="h-9 w-full rounded-lg border border-line bg-surface pr-16 pl-9 text-body text-fg placeholder:text-muted"
        />
        <kbd className="pointer-events-none absolute top-1/2 right-2.5 -translate-y-1/2 rounded-md border border-line bg-subtle px-1.5 py-0.5 font-sans text-caption text-muted">
          ⌘K
        </kbd>
      </div>
      <ThemeToggle />
    </header>
  );
}
