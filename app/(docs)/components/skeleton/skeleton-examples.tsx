"use client";

import { Skeleton } from "@boyernick/standard-ui-react";
import { ComponentCanvas } from "@/components/component-canvas";

export const SkeletonExamples = () => (
  <div className="mt-6">
    <ComponentCanvas
      label="Content placeholder"
      contentClassName="w-full max-w-sm"
    >
      <div className="flex w-full max-w-sm gap-3">
        <Skeleton variant="circle" className="size-10 shrink-0" />
        <div className="flex flex-1 flex-col gap-2">
          <Skeleton variant="text" className="w-2/3" />
          <Skeleton variant="text" className="w-full" />
          <Skeleton className="mt-1 h-16 w-full" />
        </div>
      </div>
    </ComponentCanvas>
  </div>
);
