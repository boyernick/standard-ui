"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
} from "react";

export type Theme = "light" | "dark";

const STORAGE_KEY = "standard-ui-theme";
const FAVICON_LIGHT = "/favicon.svg?v=6";
const FAVICON_DARK = "/favicon-dark.svg?v=6";

type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function prefersDark() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function readStored(): Theme {
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "dark" || stored === "light") return stored;
  return prefersDark() ? "dark" : "light";
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.style.colorScheme = theme;

  const favicon = document.querySelector<HTMLLinkElement>(
    'link[rel="icon"][href*="favicon"]',
  );
  favicon?.setAttribute(
    "href",
    theme === "dark" ? FAVICON_DARK : FAVICON_LIGHT,
  );
}

const listeners = new Set<() => void>();
let current: Theme = "light";

function emit() {
  for (const listener of listeners) listener();
}

if (typeof window !== "undefined") {
  current = readStored();
}

function subscribe(listener: () => void) {
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const handleSystemChange = (event: MediaQueryListEvent) => {
    current = event.matches ? "dark" : "light";
    window.localStorage.removeItem(STORAGE_KEY);
    applyTheme(current);
    emit();
  };

  listeners.add(listener);
  mediaQuery.addEventListener("change", handleSystemChange);
  return () => {
    listeners.delete(listener);
    mediaQuery.removeEventListener("change", handleSystemChange);
  };
}

function getSnapshot() {
  return current;
}

function getServerSnapshot(): Theme {
  return "light";
}

function writeTheme(next: Theme) {
  current = next;
  window.localStorage.setItem(STORAGE_KEY, next);
  applyTheme(next);
  emit();
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const setTheme = useCallback((next: Theme) => {
    writeTheme(next);
  }, []);
  const value = useMemo(() => ({ theme, setTheme }), [theme, setTheme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
}
