export type SwatchInvert = "light" | "dark" | "both" | "none"

export type ColorSwatch = {
  weight: string
  /** Human-readable value shown in the tooltip (matches Apps SDK docs). */
  value: string
  invert?: SwatchInvert
  /** Light border on near-white swatches */
  bordered?: boolean
  alpha?: boolean
}

const hueWeights = [
  "25",
  "50",
  "75",
  "100",
  "200",
  "300",
  "400",
  "500",
  "600",
  "700",
  "800",
  "900",
  "950",
  "1000",
] as const

const alphaWeights = ["a25", "a50", "a75", "a100", "a200", "a300"] as const

const hueHex: Record<
  string,
  Record<(typeof hueWeights)[number], string>
> = {
  red: {
    "25": "#fff0f0",
    "50": "#ffd9d9",
    "75": "#ffc6c5",
    "100": "#ffa4a2",
    "200": "#ff8583",
    "300": "#ff6764",
    "400": "#fa423e",
    "500": "#e02e2a",
    "600": "#ba2623",
    "700": "#911e1b",
    "800": "#6e1615",
    "900": "#4d100e",
    "950": "#280b0a",
    "1000": "#1f0909",
  },
  orange: {
    "25": "#fff5f0",
    "50": "#ffe7d9",
    "75": "#ffcfb4",
    "100": "#ffb790",
    "200": "#ff9e6c",
    "300": "#ff8549",
    "400": "#fb6a22",
    "500": "#e25507",
    "600": "#b9480d",
    "700": "#923b0f",
    "800": "#6d2e0f",
    "900": "#4a2206",
    "950": "#281105",
    "1000": "#211107",
  },
  yellow: {
    "25": "#fffbed",
    "50": "#fff6d9",
    "75": "#ffeeb8",
    "100": "#ffe48c",
    "200": "#ffdb66",
    "300": "#ffd240",
    "400": "#ffc300",
    "500": "#e0ac00",
    "600": "#ba8e00",
    "700": "#916f00",
    "800": "#6e5400",
    "900": "#4d3b00",
    "950": "#261d00",
    "1000": "#1a1400",
  },
  green: {
    "25": "#edfaf2",
    "50": "#d9f4e4",
    "75": "#b8ebcc",
    "100": "#8cdfad",
    "200": "#66d492",
    "300": "#40c977",
    "400": "#04b84c",
    "500": "#00a240",
    "600": "#008635",
    "700": "#00692a",
    "800": "#004f1f",
    "900": "#003716",
    "950": "#011c0b",
    "1000": "#001207",
  },
  blue: {
    "25": "#f5faff",
    "50": "#e5f3ff",
    "75": "#cce6ff",
    "100": "#99ceff",
    "200": "#66b5ff",
    "300": "#339cff",
    "400": "#0285ff",
    "500": "#0169cc",
    "600": "#004f99",
    "700": "#003f7a",
    "800": "#013566",
    "900": "#00284d",
    "950": "#000e1a",
    "1000": "#000d19",
  },
  purple: {
    "25": "#f9f5fe",
    "50": "#efe5fe",
    "75": "#e0cefd",
    "100": "#ceb0fb",
    "200": "#be95fa",
    "300": "#ad7bf9",
    "400": "#924ff7",
    "500": "#8046d9",
    "600": "#6b3ab4",
    "700": "#532d8d",
    "800": "#3f226a",
    "900": "#2c184a",
    "950": "#160c25",
    "1000": "#100a19",
  },
  pink: {
    "25": "#fff4f9",
    "50": "#ffe8f3",
    "75": "#ffd4e8",
    "100": "#ffbada",
    "200": "#ffa3ce",
    "300": "#ff8cc1",
    "400": "#ff66ad",
    "500": "#e04c91",
    "600": "#ba437a",
    "700": "#963c67",
    "800": "#6e2c4a",
    "900": "#4d1f34",
    "950": "#29101c",
    "1000": "#1a0a11",
  },
}

const hueAlphaPct: Record<
  string,
  Record<(typeof alphaWeights)[number], number>
> = {
  red: { a25: 8, a50: 16, a75: 30, a100: 48, a200: 64, a300: 79 },
  orange: { a25: 7, a50: 16, a75: 33, a100: 48, a200: 65, a300: 81 },
  yellow: { a25: 8, a50: 15, a75: 27, a100: 45, a200: 59, a300: 74 },
  green: { a25: 8, a50: 15, a75: 29, a100: 45, a200: 60, a300: 75 },
  blue: { a25: 4, a50: 13, a75: 25, a100: 40, a200: 60, a300: 80 },
  purple: { a25: 6, a50: 15, a75: 28, a100: 45, a200: 60, a300: 75 },
  pink: { a25: 8, a50: 16, a75: 28, a100: 45, a200: 60, a300: 76 },
}

/** Yellow keeps dark label longer (through 500) per Apps SDK Colors story. */
const invertCutoff: Record<string, number> = {
  red: 400,
  orange: 400,
  yellow: 600,
  green: 400,
  blue: 400,
  purple: 400,
  pink: 400,
}

export const grayscaleRows: ColorSwatch[][] = [
  [
    {
      weight: "0",
      value: "light-dark(#ffffff, #0d0d0d)",
      bordered: true,
    },
    { weight: "25", value: "light-dark(#fcfcfc, #101010)" },
    { weight: "50", value: "light-dark(#f9f9f9, #131313)" },
    { weight: "75", value: "light-dark(#f3f3f3, #161616)" },
    { weight: "100", value: "light-dark(#ededed, #181818)" },
    { weight: "150", value: "light-dark(#dfdfdf, #1c1c1c)" },
    { weight: "200", value: "light-dark(#c4c4c4, #212121)" },
    { weight: "250", value: "light-dark(#b9b9b9, #282828)" },
    { weight: "300", value: "light-dark(#afafaf, #303030)" },
    { weight: "350", value: "light-dark(#9f9f9f, #393939)" },
    {
      weight: "400",
      value: "light-dark(#8f8f8f, #414141)",
      invert: "light",
    },
    {
      weight: "450",
      value: "light-dark(#767676, #4f4f4f)",
      invert: "light",
    },
    { weight: "500", value: "#5d5d5d", invert: "light" },
  ],
  [
    {
      weight: "550",
      value: "light-dark(#4f4f4f, #767676)",
      invert: "both",
    },
    {
      weight: "600",
      value: "light-dark(#414141, #8f8f8f)",
      invert: "both",
    },
    {
      weight: "650",
      value: "light-dark(#393939, #9f9f9f)",
      invert: "both",
    },
    {
      weight: "700",
      value: "light-dark(#303030, #afafaf)",
      invert: "both",
    },
    {
      weight: "750",
      value: "light-dark(#282828, #b9b9b9)",
      invert: "both",
    },
    {
      weight: "800",
      value: "light-dark(#212121, #c4c4c4)",
      invert: "both",
    },
    {
      weight: "850",
      value: "light-dark(#1c1c1c, #dcdcdc)",
      invert: "both",
    },
    {
      weight: "900",
      value: "light-dark(#181818, #ededed)",
      invert: "both",
    },
    {
      weight: "925",
      value: "light-dark(#161616, #f3f3f3)",
      invert: "both",
    },
    {
      weight: "950",
      value: "light-dark(#131313, #f3f3f3)",
      invert: "both",
    },
    {
      weight: "975",
      value: "light-dark(#101010, #f9f9f9)",
      invert: "both",
    },
    {
      weight: "1000",
      value: "light-dark(#0d0d0d, #ffffff)",
      invert: "both",
    },
  ],
]

export const alphaRow: ColorSwatch[] = [
  {
    weight: "0",
    value: "alpha(var(--alpha-base), 0%)",
    bordered: true,
    alpha: true,
  },
  { weight: "02", value: "alpha(var(--alpha-base), 2%)", alpha: true },
  { weight: "04", value: "alpha(var(--alpha-base), 4%)", alpha: true },
  { weight: "05", value: "alpha(var(--alpha-base), 5%)", alpha: true },
  { weight: "06", value: "alpha(var(--alpha-base), 6%)", alpha: true },
  { weight: "08", value: "alpha(var(--alpha-base), 8%)", alpha: true },
  { weight: "10", value: "alpha(var(--alpha-base), 10%)", alpha: true },
  { weight: "12", value: "alpha(var(--alpha-base), 12%)", alpha: true },
  { weight: "15", value: "alpha(var(--alpha-base), 15%)", alpha: true },
  { weight: "16", value: "alpha(var(--alpha-base), 16%)", alpha: true },
  { weight: "20", value: "alpha(var(--alpha-base), 20%)", alpha: true },
  { weight: "25", value: "alpha(var(--alpha-base), 25%)", alpha: true },
  { weight: "30", value: "alpha(var(--alpha-base), 30%)", alpha: true },
  { weight: "35", value: "alpha(var(--alpha-base), 35%)", alpha: true },
  { weight: "40", value: "alpha(var(--alpha-base), 40%)", alpha: true },
  { weight: "50", value: "alpha(var(--alpha-base), 50%)", alpha: true },
]

export const primaryHueScales: Array<{
  id: string
  family: string
  solids: ColorSwatch[]
  alphas: ColorSwatch[]
}> = ["red", "orange", "yellow", "green", "blue", "purple", "pink"].map(
  (family) => {
    const solids: ColorSwatch[] = hueWeights.map((weight) => {
      const n = Number(weight)
      const cutoff = invertCutoff[family] ?? 400
      return {
        weight,
        value: hueHex[family][weight],
        invert: n < cutoff ? "dark" : "light",
      }
    })
    const alphas: ColorSwatch[] = alphaWeights.map((weight) => ({
      weight,
      value: `alpha(var(--${family}-400), ${hueAlphaPct[family][weight]}%)`,
      alpha: true,
    }))
    return { id: family, family, solids, alphas }
  },
)
