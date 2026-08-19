export type SpacingStep = {
  token: string
  rem: string
  px: string
  usage: string
}

/** 4px base unit — Tailwind spacing steps used across Standard UI */
export const spacingSteps: SpacingStep[] = [
  {
    token: "0.5",
    rem: "0.125rem",
    px: "2px",
    usage: "Hairline gaps, icon optical tweaks",
  },
  {
    token: "1",
    rem: "0.25rem",
    px: "4px",
    usage: "Tightest stack spacing, badge padding",
  },
  {
    token: "1.5",
    rem: "0.375rem",
    px: "6px",
    usage: "Compact control gaps",
  },
  {
    token: "2",
    rem: "0.5rem",
    px: "8px",
    usage: "Default inline gaps, small padding",
  },
  {
    token: "2.5",
    rem: "0.625rem",
    px: "10px",
    usage: "Dense list row padding",
  },
  {
    token: "3",
    rem: "0.75rem",
    px: "12px",
    usage: "Control padding, form field gaps",
  },
  {
    token: "4",
    rem: "1rem",
    px: "16px",
    usage: "Default section padding, card padding",
  },
  {
    token: "5",
    rem: "1.25rem",
    px: "20px",
    usage: "Comfortable panel padding",
  },
  {
    token: "6",
    rem: "1.5rem",
    px: "24px",
    usage: "Section gaps, spacious cards",
  },
  {
    token: "8",
    rem: "2rem",
    px: "32px",
    usage: "Large section spacing",
  },
  {
    token: "10",
    rem: "2.5rem",
    px: "40px",
    usage: "Page block gaps",
  },
  {
    token: "12",
    rem: "3rem",
    px: "48px",
    usage: "Major section separation",
  },
  {
    token: "16",
    rem: "4rem",
    px: "64px",
    usage: "Hero / page rhythm",
  },
]

export type LayoutMeasure = {
  name: string
  className: string
  value: string
  px: string
  usage: string
}

export const contentWidths: LayoutMeasure[] = [
  {
    name: "Prose",
    className: "max-w-3xl",
    value: "48rem",
    px: "768px",
    usage: "Guidelines, descriptions, and long-form copy",
  },
  {
    name: "Docs",
    className: "max-w-5xl",
    value: "64rem",
    px: "1024px",
    usage: "Default foundation and component pages",
  },
  {
    name: "Wide",
    className: "max-w-6xl",
    value: "72rem",
    px: "1152px",
    usage: "Optional wide layouts — docs shell stays max-w-5xl",
  },
]

export const shellMeasures: LayoutMeasure[] = [
  {
    name: "Sidebar",
    className: "w-60",
    value: "15rem",
    px: "240px",
    usage: "Docs navigation column",
  },
  {
    name: "Gutter (mobile)",
    className: "px-4",
    value: "1rem",
    px: "16px",
    usage: "Main content horizontal padding below md",
  },
  {
    name: "Gutter (md)",
    className: "md:px-10",
    value: "2.5rem",
    px: "40px",
    usage: "Main content padding from md",
  },
  {
    name: "Gutter (lg)",
    className: "lg:px-14",
    value: "3.5rem",
    px: "56px",
    usage: "Main content padding from lg",
  },
]

export type GridPattern = {
  name: string
  className: string
  usage: string
}

export const gridPatterns: GridPattern[] = [
  {
    name: "Two column",
    className: "grid gap-4 md:grid-cols-2",
    usage: "Intro cards, paired previews, split content",
  },
  {
    name: "Four column",
    className: "grid grid-cols-2 sm:grid-cols-4",
    usage: "Icon galleries and dense tile grids",
  },
  {
    name: "Auto fill",
    className: "grid gap-4 grid-cols-[repeat(auto-fill,minmax(12rem,1fr))]",
    usage: "Responsive card collections without fixed breakpoints",
  },
]

export type Breakpoint = {
  name: string
  cssVar: string
  rem: string
  px: string
  prefix: string
  usage: string
}

export const breakpoints: Breakpoint[] = [
  {
    name: "xs",
    cssVar: "--breakpoint-xs",
    rem: "23.75rem",
    px: "380px",
    prefix: "xs:",
    usage: "Large phones — earliest responsive step",
  },
  {
    name: "sm",
    cssVar: "--breakpoint-sm",
    rem: "36rem",
    px: "576px",
    prefix: "sm:",
    usage: "Small tablets / large phones landscape",
  },
  {
    name: "md",
    cssVar: "--breakpoint-md",
    rem: "48rem",
    px: "768px",
    prefix: "md:",
    usage: "Tablets — docs sidebar appears",
  },
  {
    name: "lg",
    cssVar: "--breakpoint-lg",
    rem: "64rem",
    px: "1024px",
    prefix: "lg:",
    usage: "Laptops — wider gutters and layouts",
  },
  {
    name: "xl",
    cssVar: "--breakpoint-xl",
    rem: "80rem",
    px: "1280px",
    prefix: "xl:",
    usage: "Desktops — roomy multi-column layouts",
  },
  {
    name: "2xl",
    cssVar: "--breakpoint-2xl",
    rem: "96rem",
    px: "1536px",
    prefix: "2xl:",
    usage: "Wide desktops — max canvas",
  },
]
