"use client";

import { Spinner } from "@standard-ui/react";
import { ComponentCanvas } from "@/components/component-canvas";

export const SpinnerExamples = () => (
  <div className="mt-6">
    <ComponentCanvas
      label="Sizes"
      code={`<Spinner size="sm" />\n<Spinner size="md" />\n<Spinner size="lg" />`}
    >
      <div className="flex items-center gap-6 text-fg-primary">
        <Spinner size="sm" />
        <Spinner size="md" />
        <Spinner size="lg" />
      </div>
    </ComponentCanvas>
  </div>
);
