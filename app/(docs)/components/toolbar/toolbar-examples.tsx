"use client"

import {
  IconHome,
  IconMinus,
  IconPlus,
  IconSettingsGear1,
  Toolbar,
  ToolbarButton,
  ToolbarGroup,
  ToolbarInput,
  ToolbarLink,
  ToolbarSeparator,
} from "@standard-ui/react"
import { ComponentCanvas } from "@/components/component-canvas"

export const ToolbarExamples = () => (
  <div className="mt-6 flex flex-col gap-8">
    <ComponentCanvas
      label="Editor"
      code={`<Toolbar aria-label="Formatting">
  <ToolbarGroup>
    <ToolbarButton aria-label="Bold">B</ToolbarButton>
    <ToolbarButton aria-label="Italic">I</ToolbarButton>
    <ToolbarButton aria-label="Underline">U</ToolbarButton>
  </ToolbarGroup>
  <ToolbarSeparator />
  <ToolbarGroup>
    <ToolbarButton aria-label="Decrease">
      <IconMinus size={14} />
    </ToolbarButton>
    <ToolbarButton aria-label="Increase">
      <IconPlus size={14} />
    </ToolbarButton>
  </ToolbarGroup>
  <ToolbarSeparator />
  <ToolbarLink href="#">Docs</ToolbarLink>
</Toolbar>`}
    >
      <Toolbar aria-label="Formatting">
        <ToolbarGroup>
          <ToolbarButton aria-label="Bold" className="font-semibold">
            B
          </ToolbarButton>
          <ToolbarButton aria-label="Italic" className="italic">
            I
          </ToolbarButton>
          <ToolbarButton aria-label="Underline" className="underline">
            U
          </ToolbarButton>
        </ToolbarGroup>
        <ToolbarSeparator />
        <ToolbarGroup>
          <ToolbarButton aria-label="Decrease">
            <IconMinus size={14} className="size-3.5" aria-hidden />
          </ToolbarButton>
          <ToolbarButton aria-label="Increase">
            <IconPlus size={14} className="size-3.5" aria-hidden />
          </ToolbarButton>
        </ToolbarGroup>
        <ToolbarSeparator />
        <ToolbarLink href="#">Docs</ToolbarLink>
      </Toolbar>
    </ComponentCanvas>

    <ComponentCanvas
      label="With input"
      code={`<Toolbar aria-label="Search tools">
  <ToolbarButton aria-label="Home">
    <IconHome size={16} />
  </ToolbarButton>
  <ToolbarButton aria-label="Settings">
    <IconSettingsGear1 size={16} />
  </ToolbarButton>
  <ToolbarSeparator />
  <ToolbarInput placeholder="Filter…" aria-label="Filter" />
</Toolbar>`}
    >
      <Toolbar aria-label="Search tools">
        <ToolbarButton aria-label="Home">
          <IconHome size={16} className="size-4" aria-hidden />
        </ToolbarButton>
        <ToolbarButton aria-label="Settings">
          <IconSettingsGear1 size={16} className="size-4" aria-hidden />
        </ToolbarButton>
        <ToolbarSeparator />
        <ToolbarInput placeholder="Filter…" aria-label="Filter" />
      </Toolbar>
    </ComponentCanvas>
  </div>
)
