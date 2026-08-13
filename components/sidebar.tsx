"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { foundations, upcomingComponents } from "@/lib/nav";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Sidebar() {
  const pathname = usePathname();
  const brandActive = pathname.startsWith("/brand");

  return (
    <aside className="flex h-full w-60 shrink-0 flex-col border-r border-line bg-surface">
      <div className="px-5 pt-5 pb-4">
        <Link href="/" className="text-heading-sm font-semibold tracking-tight text-fg">
          standardUI
        </Link>
        <div
          className="mt-4 flex rounded-full bg-subtle p-0.5"
          role="group"
          aria-label="Documentation set"
        >
          <Link
            href="/"
            className={`flex-1 rounded-full px-3 py-1.5 text-center text-caption font-medium transition-colors ${
              brandActive
                ? "text-muted hover:text-fg"
                : "bg-surface text-fg shadow-sm"
            }`}
          >
            UI
          </Link>
          <Link
            href="/brand"
            className={`flex-1 rounded-full px-3 py-1.5 text-center text-caption font-medium transition-colors ${
              brandActive
                ? "bg-surface text-fg shadow-sm"
                : "text-muted hover:text-fg"
            }`}
          >
            Brand
          </Link>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 pb-8">
        <p className="px-2 pt-2 pb-1 text-caption font-medium tracking-wide text-muted uppercase">
          Foundations
        </p>
        <ul className="flex flex-col gap-0.5">
          {foundations.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`block rounded-md px-2 py-1.5 text-body transition-colors ${
                    active
                      ? "bg-subtle font-medium text-fg"
                      : "text-muted hover:bg-subtle hover:text-fg"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <p className="mt-6 px-2 pt-2 pb-1 text-caption font-medium tracking-wide text-muted uppercase">
          Components
        </p>
        <ul className="flex flex-col gap-0.5">
          {upcomingComponents.map((name) => (
            <li
              key={name}
              className="rounded-md px-2 py-1.5 text-body text-muted/60"
            >
              {name}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
