"use client";

import { useState } from "react";

export function CopyToken({
  value,
  children,
  className = "",
}: {
  value: string;
  children: React.ReactNode;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={onCopy}
      title={`Copy ${value}`}
      className={`group relative text-left ${className}`}
    >
      {children}
      <span className="pointer-events-none absolute -top-7 left-1/2 z-10 -translate-x-1/2 rounded-md bg-gray-1000 px-1.5 py-0.5 font-mono text-caption whitespace-nowrap text-gray-100 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
        {copied ? "Copied" : value}
      </span>
    </button>
  );
}
