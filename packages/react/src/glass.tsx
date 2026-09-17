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
    const stateCallbackRef = React.useRef(onGlassStateChange);
    stateCallbackRef.current = onGlassStateChange;

    // GlassConfig is a flat JSON-safe object. A serialized key means callers
    // can pass an inline object without tearing down WebGL on every render.
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
      const report = (state: GlassState) => {
        root?.setAttribute("data-glass-state", state);
        stateCallbackRef.current?.(state);
      };

      if (!root || disabled) {
        report("off");
        return;
      }

      const glassElements = Array.from(root.children).filter(
        (element): element is HTMLElement =>
          element instanceof HTMLElement && element.dataset.slot === "glass",
      );

      if (glassElements.length === 0) {
        report("off");
        return;
      }

      let cancelled = false;
      let destroy: (() => void) | undefined;

      report("pending");

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
          report("live");
        })
        .catch(() => {
          if (!cancelled) report("off");
        });

      return () => {
        cancelled = true;
        destroy?.();
      };
    }, [defaultsKey, disabled]);

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
 * `config` maps directly to LiquidGlass's per-element `data-config` JSON.
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
