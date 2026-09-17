"use client";

import * as React from "react";
import type { GlassConfig } from "@ybouane/liquidglass";
import { cn } from "./lib/cn";

export type GlassState = "pending" | "live" | "off";

export interface GlassRootProps extends React.ComponentPropsWithoutRef<"div"> {
  /** Default LiquidGlass shader configuration shared by direct Glass children. */
  defaults?: Partial<GlassConfig>;
  /** Disable WebGL rendering while preserving the underlying DOM. */
  disabled?: boolean;
  /** Called when the LiquidGlass renderer changes state. */
  onGlassStateChange?: (state: GlassState) => void;
}

export interface GlassProps extends React.ComponentPropsWithoutRef<"div"> {
  /** Per-pane LiquidGlass shader configuration. */
  config?: Partial<GlassConfig>;
}

function setForwardedRef<T>(ref: React.ForwardedRef<T>, value: T | null) {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref) {
    ref.current = value;
  }
}

/**
 * A positioned rendering root for LiquidGlass.
 *
 * Glass panes must be direct children of this element. Background content must
 * also live inside the root because LiquidGlass samples the root's children,
 * not the root's own background.
 */
export const GlassRoot = React.forwardRef<HTMLDivElement, GlassRootProps>(
  function GlassRoot(
    {
      className,
      defaults,
      disabled = false,
      onGlassStateChange,
      children,
      ...props
    },
    forwardedRef,
  ) {
    const rootRef = React.useRef<HTMLDivElement | null>(null);
    const defaultsKey = JSON.stringify(defaults ?? {});

    const setRootRef = React.useCallback(
      (node: HTMLDivElement | null) => {
        rootRef.current = node;
        setForwardedRef(forwardedRef, node);
      },
      [forwardedRef],
    );

    React.useEffect(() => {
      const root = rootRef.current;
      if (!root || disabled) {
        if (root) root.dataset.glassState = "off";
        onGlassStateChange?.("off");
        return;
      }

      const glassElements = Array.from(root.children).filter(
        (element): element is HTMLElement =>
          element instanceof HTMLElement && element.dataset.slot === "glass",
      );

      if (glassElements.length === 0) {
        root.dataset.glassState = "off";
        onGlassStateChange?.("off");
        return;
      }

      let cancelled = false;
      let destroy: (() => void) | undefined;

      root.dataset.glassState = "pending";
      onGlassStateChange?.("pending");

      void import("@ybouane/liquidglass")
        .then(({ LiquidGlass }) =>
          LiquidGlass.init({
            root,
            glassElements,
            defaults: JSON.parse(defaultsKey) as Partial<GlassConfig>,
          }),
        )
        .then((instance) => {
          if (cancelled) {
            instance.destroy();
            return;
          }

          destroy = () => instance.destroy();
          root.dataset.glassState = "live";
          onGlassStateChange?.("live");
        })
        .catch(() => {
          if (cancelled) return;
          root.dataset.glassState = "off";
          onGlassStateChange?.("off");
        });

      return () => {
        cancelled = true;
        destroy?.();
      };
    }, [children, defaultsKey, disabled, onGlassStateChange]);

    return (
      <div
        ref={setRootRef}
        data-slot="glass-root"
        className={cn("relative", className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);

/**
 * A LiquidGlass pane. It must be rendered as a direct child of GlassRoot.
 */
export const Glass = React.forwardRef<HTMLDivElement, GlassProps>(function Glass(
  { className, config, children, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      data-slot="glass"
      data-config={config ? JSON.stringify(config) : undefined}
      className={cn("relative", className)}
      {...props}
    >
      {children}
    </div>
  );
});

GlassRoot.displayName = "GlassRoot";
Glass.displayName = "Glass";

export type { GlassConfig } from "@ybouane/liquidglass";
