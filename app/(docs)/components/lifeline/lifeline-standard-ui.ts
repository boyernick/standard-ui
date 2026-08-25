import { defineLifeline } from "@boyernick/standard-ui-react"

/**
 * Specimen data for the Lifeline docs — the years a shared visual
 * language became StandardUI. Original to this site; not a port of
 * another product's biography.
 */
const record = defineLifeline({
  slug: "standard-ui",
  name: "StandardUI",
  birthYear: 2010,
  endYear: 2026,
  description:
    "The years a shared visual language became a component library.",
  legend: [
    { type: "mentor", label: "Collaborators" },
    { type: "met", label: "Visitors" },
  ],
  milestones: {
    2010: {
      id: "notes",
      events: ["Interface rules start as notes in the margin of a product."],
    },
    2012: {
      id: "named-color",
      events: ["Hex values give way to named color roles on a shipping site."],
      mentors: [
        {
          name: "Maya Ellison",
          role: "Type director",
          photo: "/lifeline/people/maya-ellison.svg",
        },
      ],
    },
    2014: {
      id: "type-ladder",
      events: ["A type ladder is written down so headings stop improvising."],
    },
    2016: {
      id: "shared-file",
      events: ["The first shared library file — still a pile of artboards."],
    },
    2017: {
      id: "dark-class",
      events: ["Dark mode becomes a class on the root, not a media query."],
      mentors: [
        {
          name: "Jordan Hale",
          role: "Engineer",
          photo: "/lifeline/people/jordan-hale.svg",
        },
      ],
    },
    2018: {
      id: "tokens",
      companies: [{ id: "foundry", name: "Foundry" }],
      events: ["Color, space, and type are extracted as tokens from live UI."],
    },
    2019: {
      id: "radius",
      events: ["Nested radii get a rule: inner equals outer minus padding."],
    },
    2020: {
      id: "primitives",
      events: ["The first React primitives wrap an accessible behavior kit."],
      met: [
        {
          name: "Priya Raman",
          photo: "/lifeline/people/priya-raman.svg",
        },
      ],
    },
    2021: {
      id: "semantic",
      events: [
        "Semantic color replaces primitives so a palette can move later.",
      ],
    },
    2022: {
      id: "named",
      companies: [{ id: "standard-ui", name: "StandardUI" }],
      events: [
        [
          { type: "text", value: "The system is named " },
          {
            type: "link",
            value: "StandardUI",
            href: "https://ui.nickboyer.com",
          },
          { type: "text", value: "." },
        ],
        "Docs and components start living in the same repository.",
      ],
      mentors: [
        {
          name: "Nick Boyer",
          role: "Designer",
          photo: "/avatar/nick-boyer.png",
        },
      ],
    },
    2023: {
      id: "cva",
      events: [
        "Variants become design decisions, not a passthrough for classes.",
      ],
      met: [
        {
          name: "Owen Briggs",
          photo: "/lifeline/people/owen-briggs.svg",
        },
      ],
    },
    2024: {
      id: "family",
      events: [
        "The component family grows: overlays, inputs, and data display.",
      ],
    },
    2025: {
      id: "release",
      events: [
        {
          text: "First public packages, with tokens and React shipped as a pair.",
          effect: "fireworks",
        },
      ],
    },
    2026: {
      id: "today",
      events: [
        "Timeline lands as a composable rail.",
        [
          { type: "text", value: "Lifeline ships as a year-axis for stories — " },
          {
            type: "link",
            value: "open source",
            href: "https://github.com/boyernick/standard-ui",
          },
          { type: "text", value: "." },
        ],
      ],
    },
  },
})

export const standardUiLifeline = record
