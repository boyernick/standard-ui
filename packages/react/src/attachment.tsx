"use client";

import type {
  ChangeEvent,
  ComponentProps,
  DragEvent,
  InputHTMLAttributes,
} from "react";
import { IconCrossSmall } from "./icons";
import { cn } from "./lib/cn";
import { focusRing, focusRingWithin } from "./lib/focus";
import { motion } from "./lib/motion";

export type AttachmentProps = Omit<ComponentProps<"label">, "onDrop"> & {
  accept?: InputHTMLAttributes<HTMLInputElement>["accept"];
  multiple?: boolean;
  disabled?: boolean;
  onFiles?: (files: File[]) => void;
};
export type AttachmentListProps = ComponentProps<"ul">;
export type AttachmentItemProps = ComponentProps<"li">;
export type AttachmentPreviewProps = ComponentProps<"div">;
export type AttachmentNameProps = ComponentProps<"span">;
export type AttachmentRemoveProps = ComponentProps<"button">;

export const Attachment = ({
  className,
  children,
  accept,
  multiple,
  disabled,
  onFiles,
  ...props
}: AttachmentProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.currentTarget.files ?? []);
    if (files.length > 0) onFiles?.(files);
    event.currentTarget.value = "";
  };

  const handleDrop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    if (disabled) return;

    const files = Array.from(event.dataTransfer.files);
    if (files.length > 0) onFiles?.(multiple ? files : files.slice(0, 1));
  };

  const handleDragOver = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
  };

  return (
    <label
      data-disabled={disabled || undefined}
      className={cn(
        "flex min-h-32 cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border-primary bg-surface p-6 text-center text-sm text-fg-secondary hover:bg-background-secondary data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
        focusRingWithin,
        motion.colors,
        className,
      )}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      {...props}
    >
      <input
        type="file"
        className="sr-only"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        onChange={handleChange}
      />
      {children}
    </label>
  );
};

export const AttachmentList = ({
  className,
  ...props
}: AttachmentListProps) => (
  <ul className={cn("flex flex-col gap-2", className)} {...props} />
);

export const AttachmentItem = ({
  className,
  ...props
}: AttachmentItemProps) => (
  <li
    className={cn(
      "flex items-center gap-3 rounded-lg border border-border-primary bg-surface p-2",
      className,
    )}
    {...props}
  />
);

export const AttachmentPreview = ({
  className,
  ...props
}: AttachmentPreviewProps) => (
  <div
    className={cn(
      // `>svg` rather than a descendant match: an icon handed straight to this
      // slot should be sized to 20, but a composed child that draws its own SVG
      // — a file illustration, say — already knows how big it wants to be, and
      // resizing its inner element letterboxes the drawing off-centre.
      "flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-md bg-background-tertiary text-fg-secondary [&_img]:size-full [&_img]:object-cover [&>svg]:size-5",
      className,
    )}
    {...props}
  />
);

export const AttachmentName = ({
  className,
  ...props
}: AttachmentNameProps) => (
  <span
    className={cn("min-w-0 flex-1 truncate text-sm text-fg-primary", className)}
    {...props}
  />
);

export const AttachmentRemove = ({
  className,
  children,
  type = "button",
  ...props
}: AttachmentRemoveProps) => (
  <button
    type={type}
    aria-label="Remove attachment"
    className={cn(
      "flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-md border border-transparent text-fg-tertiary hover:bg-background-tertiary hover:text-fg-primary disabled:cursor-not-allowed disabled:opacity-50",
      focusRing,
      motion.colors,
      className,
    )}
    {...props}
  >
    {children ?? <IconCrossSmall />}
  </button>
);
