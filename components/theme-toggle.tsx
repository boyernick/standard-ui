"use client";

import { useTheme, type Theme } from "./theme-provider";

const options: { value: Theme; label: string; icon: React.ReactNode }[] = [
  {
    value: "system",
    label: "System",
    icon: (
      <svg viewBox="0 0 16 16" className="size-4" aria-hidden>
        <circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <path d="M8 2a6 6 0 0 0 0 12Z" fill="currentColor" />
      </svg>
    ),
  },
  {
    value: "light",
    label: "Light",
    icon: (
      <svg viewBox="0 0 16 16" className="size-4" aria-hidden>
        <circle cx="8" cy="8" r="2.4" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <path
          d="M8 1.5v1.6M8 12.9v1.6M1.5 8h1.6M12.9 8h1.6M3.4 3.4l1.1 1.1M11.5 11.5l1.1 1.1M3.4 12.6l1.1-1.1M11.5 4.5l1.1-1.1"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    value: "dark",
    label: "Dark",
    icon: (
      <svg viewBox="0 0 16 16" className="size-4" aria-hidden>
        <path
          d="M13 10.2A5.6 5.6 0 1 1 5.8 3 4.4 4.4 0 0 0 13 10.2Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div
      className="flex items-center gap-0.5 rounded-full bg-subtle p-0.5"
      role="group"
      aria-label="Theme"
    >
      {options.map((option) => {
        const active = theme === option.value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => setTheme(option.value)}
            aria-pressed={active}
            aria-label={option.label}
            className={`flex size-8 items-center justify-center rounded-full transition-colors ${
              active
                ? "bg-surface text-fg shadow-sm"
                : "text-muted hover:text-fg"
            }`}
          >
            {option.icon}
          </button>
        );
      })}
    </div>
  );
}
