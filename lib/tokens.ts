export const scales = ["gray", "warm", "green"] as const;
export type Scale = (typeof scales)[number];

export const steps = [
  100, 200, 300, 400, 500, 600, 700, 800, 900, 1000,
] as const;
export type Step = (typeof steps)[number];

export const stepRoles: Record<Step, string> = {
  100: "Default background",
  200: "Hover background",
  300: "Active background",
  400: "Default border",
  500: "Hover border",
  600: "Active border",
  700: "High contrast background",
  800: "Hover high contrast",
  900: "Secondary text and icons",
  1000: "Primary text and icons",
};

export const scaleLabels: Record<Scale, string> = {
  gray: "Gray",
  warm: "Warm",
  green: "Green",
};

export const colors = {
  light: {
    gray: {
      100: "#f7f7f5",
      200: "#efefed",
      300: "#e5e5e2",
      400: "#d2d2ce",
      500: "#b4b4af",
      600: "#8c8c86",
      700: "#5e5e59",
      800: "#3c3c38",
      900: "#2c2c28",
      1000: "#181816",
    },
    warm: {
      100: "#f6f1ea",
      200: "#ede4d6",
      300: "#e0d0ba",
      400: "#c9b396",
      500: "#b08f6e",
      600: "#8c6e52",
      700: "#6a5340",
      800: "#4a3a2e",
      900: "#382c24",
      1000: "#261e18",
    },
    green: {
      100: "#e7f0ea",
      200: "#c8d9ce",
      300: "#a3c0ad",
      400: "#6f9a7c",
      500: "#4a7a58",
      600: "#3a6147",
      700: "#2c4d38",
      800: "#233c2c",
      900: "#1b2f23",
      1000: "#122018",
    },
  },
  dark: {
    gray: {
      100: "#1a1a18",
      200: "#222220",
      300: "#2c2c2a",
      400: "#3d3d3a",
      500: "#5a5a56",
      600: "#8a8a84",
      700: "#b4b4af",
      800: "#d2d2ce",
      900: "#e5e5e2",
      1000: "#f5f5f3",
    },
    warm: {
      100: "#1f1b17",
      200: "#2a241e",
      300: "#3a3229",
      400: "#5c4e40",
      500: "#8c6e52",
      600: "#b08f6e",
      700: "#c9b396",
      800: "#e0d0ba",
      900: "#ede4d6",
      1000: "#f6f1ea",
    },
    green: {
      100: "#142018",
      200: "#1b2f23",
      300: "#233c2c",
      400: "#2c4d38",
      500: "#3a6147",
      600: "#4a7a58",
      700: "#6f9a7c",
      800: "#a3c0ad",
      900: "#c8d9ce",
      1000: "#e7f0ea",
    },
  },
} as const;

export const semantics = {
  light: {
    bg: "#f7f7f5",
    "bg-subtle": "#efefed",
    surface: "#ffffff",
    border: "#e5e5e2",
    text: "#181816",
    "text-secondary": "#5e5e59",
    accent: "#2c4d38",
    "accent-foreground": "#f7f7f5",
  },
  dark: {
    bg: "#121211",
    "bg-subtle": "#1c1c1a",
    surface: "#1a1a18",
    border: "#2c2c2a",
    text: "#f5f5f3",
    "text-secondary": "#a8a8a2",
    accent: "#6f9a7c",
    "accent-foreground": "#121211",
  },
} as const;

export const radii = {
  sm: "6px",
  md: "10px",
  lg: "16px",
  xl: "24px",
  full: "9999px",
} as const;

export const shadows = {
  hairline: "0 0 0 1px rgb(24 24 22 / 0.06)",
  sm: "0 1px 2px rgb(24 24 22 / 0.04)",
  md: "0 4px 16px rgb(24 24 22 / 0.06)",
} as const;

export const typeScale = [
  {
    token: "display",
    family: "serif",
    size: "3.5rem",
    lineHeight: "1.1",
    letterSpacing: "-0.03em",
    sample: "Introduction",
  },
  {
    token: "heading-lg",
    family: "sans",
    size: "1.75rem",
    lineHeight: "1.25",
    letterSpacing: "-0.02em",
    sample: "Visual foundations",
  },
  {
    token: "heading-md",
    family: "sans",
    size: "1.25rem",
    lineHeight: "1.35",
    letterSpacing: "-0.015em",
    sample: "Shared language",
  },
  {
    token: "heading-sm",
    family: "sans",
    size: "1rem",
    lineHeight: "1.4",
    letterSpacing: "-0.01em",
    sample: "Section title",
  },
  {
    token: "body",
    family: "sans",
    size: "0.875rem",
    lineHeight: "1.5",
    letterSpacing: "0",
    sample:
      "The visual foundations and shared language behind Standard UI.",
  },
  {
    token: "caption",
    family: "sans",
    size: "0.75rem",
    lineHeight: "1.45",
    letterSpacing: "0",
    sample: "Secondary labels, meta, and hints",
  },
] as const;

export function cssVar(name: string) {
  return `var(--${name})`;
}
