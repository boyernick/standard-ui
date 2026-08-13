"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
} from "react";

export type Theme = "system" | "light" | "dark";

const STORAGE_KEY = "standard-ui-theme";

type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function isTheme(value: string | null): value is Theme {
  return value === "light" || value === "dark" || value === "system";
}

function isDark(theme: Theme) {
  if (theme === "dark") return true;
  if (theme === "light") return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", isDark(theme));
}

const listeners = new Set<() => void>();
let current: Theme = "system";

function emit() {
  for (const listener of listeners) listener();
}

function readStored(): Theme {
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return isTheme(stored) ? stored : "system";
}

if (typeof window !== "undefined") {
  current = readStored();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const onMedia = () => {
    if (current === "system") applyTheme("system");
  };
  media.addEventListener("change", onMedia);
  return () => {
    listeners.delete(listener);
    media.removeEventListener("change", onMedia);
  };
}

function getSnapshot() {
  return current;
}

function getServerSnapshot(): Theme {
  return "system";
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
