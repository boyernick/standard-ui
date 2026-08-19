"use client";

import { Orb } from "@standard-ui/react";
import { ComponentCanvas } from "@/components/component-canvas";

export const OrbExamples = () => (
  <div className="mt-6">
    <ComponentCanvas
      label="Sizes"
      code={`<Orb size="sm" />\n<Orb size="md" />\n<Orb size="lg" />`}
    >
      <div className="flex items-center gap-6">
        <Orb size="sm" />
        <Orb size="md" />
        <Orb size="lg" />
      </div>
    </ComponentCanvas>
  </div>
);
