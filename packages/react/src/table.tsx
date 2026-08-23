import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "./lib/cn";

const tableVariants = cva(
  "group/table w-full text-sm text-fg-primary",
  {
    variants: {
      variant: {
        default: "border-collapse",
        grid: [
          "border-separate border-spacing-0",
          "[&_tr]:border-b-0",
          "[&_tr>*]:border-r [&_tr>*]:border-b [&_tr>*]:border-border-primary",
          "[&_tr>*:last-child]:border-r-0",
          "[&_tbody_tr:last-child>*]:border-b-0 [&_tfoot_tr:last-child>*]:border-b-0",
        ],
      },
      density: {
        default: "",
        compact: "[&_th]:h-8 [&_th]:px-3 [&_td]:px-3 [&_td]:py-2",
      },
      striped: {
        true: "[&_tbody_tr:nth-child(even)]:bg-background-secondary",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      density: "default",
      striped: false,
    },
  },
);

const tableHeaderVariants = cva(
  "bg-background-secondary [&_tr]:border-b [&_tr]:border-border-primary",
  {
    variants: {
      sticky: {
        true: "[&_th]:sticky [&_th]:top-0 [&_th]:z-10 [&_th]:bg-background-secondary [&_th]:py-2.5",
        false: "",
      },
    },
    defaultVariants: {
      sticky: false,
    },
  },
);

export type TableProps = ComponentProps<"table"> &
  VariantProps<typeof tableVariants> & {
    /** Classes for the bordered horizontal-scroll container. */
    containerClassName?: string;
  };
export type TableHeaderProps = ComponentProps<"thead"> &
  VariantProps<typeof tableHeaderVariants>;
export type TableBodyProps = ComponentProps<"tbody">;
export type TableFooterProps = ComponentProps<"tfoot">;
export type TableRowProps = ComponentProps<"tr">;
export type TableHeadProps = ComponentProps<"th">;
export type TableCellProps = ComponentProps<"td">;
export type TableCaptionProps = ComponentProps<"caption">;

export const Table = ({
  className,
  containerClassName,
  variant,
  density,
  striped,
  ...props
}: TableProps) => (
  <div
    className={cn(
      "w-full overflow-auto rounded-lg border border-border-primary bg-surface",
      containerClassName,
    )}
  >
    <table
      data-variant={variant ?? "default"}
      data-density={density ?? "default"}
      data-striped={striped || undefined}
      className={cn(tableVariants({ variant, density, striped }), className)}
      {...props}
    />
  </div>
);

export const TableHeader = ({
  className,
  sticky,
  ...props
}: TableHeaderProps) => (
  <thead
    className={cn(tableHeaderVariants({ sticky }), className)}
    {...props}
  />
);

export const TableBody = ({ className, ...props }: TableBodyProps) => (
  <tbody className={cn("[&_tr:last-child]:border-0", className)} {...props} />
);

export const TableFooter = ({ className, ...props }: TableFooterProps) => (
  <tfoot
    className={cn(
      "border-t border-border-primary bg-background-secondary font-medium [&_tr]:hover:bg-transparent",
      className,
    )}
    {...props}
  />
);

export const TableRow = ({ className, ...props }: TableRowProps) => (
  <tr
    className={cn(
      "border-b border-border-primary transition-colors duration-[var(--duration-sm)] ease-enter hover:bg-background-secondary aria-selected:bg-background-tertiary data-[selected]:bg-background-tertiary data-[state=selected]:bg-background-tertiary",
      className,
    )}
    {...props}
  />
);

export const TableHead = ({ className, ...props }: TableHeadProps) => (
  <th
    className={cn(
      "h-10 px-4 text-left text-xs-strong text-fg-secondary",
      className,
    )}
    {...props}
  />
);

export const TableCell = ({ className, ...props }: TableCellProps) => (
  <td className={cn("px-4 py-3 align-middle", className)} {...props} />
);

export const TableCaption = ({ className, ...props }: TableCaptionProps) => (
  <caption
    className={cn(
      "caption-bottom px-4 py-3 text-sm text-fg-secondary",
      className,
    )}
    {...props}
  />
);

export { tableHeaderVariants, tableVariants };
