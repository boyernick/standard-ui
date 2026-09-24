"use client";

import * as React from "react";
import type { GlassConfig } from "./lib/lens-glass/config";
import { cn } from "./lib/cn";
import { scheduleGlassRenderer } from "./lib/glass-lifecycle";
import { attachGlassLighting } from "./lib/glass-lighting";
import { Button, type ButtonProps } from "./button";

export type GlassState = "pending" | "live" | "off";

export interface GlassRootProps extends React.ComponentPropsWithoutRef<"div"> {
  /** Default glass material configuration shared by direct Glass children. */
  defaults?: GlassConfig;
  /** Disable WebGL rendering while preserving the underlying DOM. */
  disabled?: boolean;
  /** Move glass-optical reflections with the pointer; respects reduced motion. */
  interactiveLighting?: boolean;
  /** Called when the glass renderer changes state. */
  onGlassStateChange?: (state: GlassState) => void;
}

export interface GlassProps extends React.ComponentPropsWithoutRef<"div"> {
  /** Per-pane glass material configuration. */
  config?: GlassConfig;
}

function setForwardedRef<T>(ref: React.ForwardedRef<T>, value: T | null) {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref) {
    ref.current = value;
  }
}

/**
 * A positioned rendering root for the glass material.
 *
 * Glass panes must be direct children of this element. Each pane refracts the
 * images, video and canvases inside the root that are behind it, drawn where
 * they are each frame, over the root's children's backgrounds and a ground
 * colour: `--glass-ground` on the root, else the nearest opaque ancestor
 * background.
 */
export const GlassRoot = React.forwardRef<HTMLDivElement, GlassRootProps>(
  function GlassRoot(
    {
      className,
      defaults,
      disabled = false,
      interactiveLighting = false,
      onGlassStateChange,
      children,
      ...props
    },
    forwardedRef,
  ) {
    const rootRef = React.useRef<HTMLDivElement | null>(null);
    const startupRef = React.useRef<Promise<void>>(Promise.resolve());
    const stateCallbackRef = React.useRef(onGlassStateChange);
    React.useEffect(() => {
      stateCallbackRef.current = onGlassStateChange;
    }, [onGlassStateChange]);

    // GlassConfig is a flat JSON-safe object. A serialized key means callers
    // can pass an inline object without tearing down WebGL on every render.
    const defaultsKey = JSON.stringify(defaults ?? {});

    React.useEffect(() => {
      if (interactiveLighting && rootRef.current && !disabled) {
        return attachGlassLighting(rootRef.current);
      }
    }, [interactiveLighting, disabled]);

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

      report("pending");

      const lifecycle = scheduleGlassRenderer(
        startupRef.current,
        async () => {
          const { createLensGlass } = await import("./lib/lens-glass/renderer");
          return createLensGlass({
            root,
            glassElements,
            defaults: JSON.parse(defaultsKey) as GlassConfig,
          });
        },
        () => report("live"),
        (error) => {
          console.warn("GlassRoot: renderer initialization failed.", error);
          report("off");
        },
      );
      startupRef.current = lifecycle.settled;

      return () => lifecycle.dispose();
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
 * A glass pane. It must be rendered as a direct child of GlassRoot.
 * `config` is serialized to the pane's `data-config` attribute.
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
      className={cn("relative isolate", className)}
      {...props}
    >
      {children}
    </div>
  );
});

GlassRoot.displayName = "GlassRoot";
Glass.displayName = "Glass";

export interface GlassButtonProps extends Omit<ButtonProps, "variant"> {
  config?: GlassConfig;
}

/** A native StandardUI button, rendered as a direct child of GlassRoot. */
export function GlassButton({ config, ...props }: GlassButtonProps) {
  return (
    <Button
      {...props}
      variant="glass"
      data-slot="glass"
      data-glass-radius="css"
      data-config={JSON.stringify({ ...config, button: true })}
    />
  );
}

export type { GlassConfig } from "./lib/lens-glass/config";
