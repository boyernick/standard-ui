import type { ComponentProps } from "react";
import { cn } from "./lib/cn";

export type TableProps = ComponentProps<"table">;
export type TableHeaderProps = ComponentProps<"thead">;
export type TableBodyProps = ComponentProps<"tbody">;
export type TableFooterProps = ComponentProps<"tfoot">;
export type TableRowProps = ComponentProps<"tr">;
export type TableHeadProps = ComponentProps<"th">;
export type TableCellProps = ComponentProps<"td">;
export type TableCaptionProps = ComponentProps<"caption">;

export const Table = ({ className, ...props }: TableProps) => (
  <div className="w-full overflow-x-auto rounded-lg border border-border-primary bg-surface">
    <table
      className={cn(
        "w-full border-collapse text-sm text-fg-primary",
        className,
      )}
      {...props}
    />
  </div>
);

export const TableHeader = ({ className, ...props }: TableHeaderProps) => (
  <thead
    className={cn(
      "bg-background-secondary [&_tr]:border-b [&_tr]:border-border-primary",
      className,
    )}
    {...props}
  />
);

export const TableBody = ({ className, ...props }: TableBodyProps) => (
  <tbody className={cn("[&_tr:last-child]:border-0", className)} {...props} />
);

export const TableFooter = ({ className, ...props }: TableFooterProps) => (
  <tfoot
    className={cn(
      "border-t border-border-primary bg-background-secondary font-medium",
      className,
    )}
    {...props}
  />
);

export const TableRow = ({ className, ...props }: TableRowProps) => (
  <tr
    className={cn(
      "border-b border-border-primary hover:bg-background-secondary",
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
