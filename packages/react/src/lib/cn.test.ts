/**
 * cn() resolves Tailwind conflicts so the last class wins. StandardUI's custom
 * theme values and `@utility` composites are invisible to Tailwind Merge's
 * default config, and a misfiled class is silently dropped rather than loudly
 * broken — so every custom value gets a case here.
 *
 * Run: node --test packages/react/src/lib/cn.test.ts
 */
import assert from "node:assert/strict"
import test from "node:test"
import { cn } from "./cn.ts"

test("a later class overrides an earlier conflicting one", () => {
  assert.equal(cn("bg-background-tertiary", "bg-brand-primary"), "bg-brand-primary")
  assert.equal(cn("h-9 px-3.5", "h-10"), "px-3.5 h-10")
  assert.equal(cn("rounded-md", "rounded-4xl"), "rounded-4xl")
})

test("unrelated utilities all survive", () => {
  assert.equal(cn("inline-flex items-center", "gap-2"), "inline-flex items-center gap-2")
  assert.equal(cn("text-2xs", "text-fg-primary"), "text-2xs text-fg-primary")
})

test("custom typography utilities are font sizes, not colors", () => {
  // Regression: Tailwind Merge files these under text-color by default, so a
  // following color silently dropped the typography.
  for (const utility of [
    "text-2xs-strong",
    "text-xs-strong",
    "text-sm-strong",
    "text-md",
    "text-md-strong",
    "text-lg-strong",
  ]) {
    assert.equal(
      cn(utility, "text-fg-primary"),
      `${utility} text-fg-primary`,
      `${utility} must survive alongside a text color`,
    )
  }
})

test("custom typography utilities conflict with each other and with sizes", () => {
  assert.equal(cn("text-sm-strong", "text-md"), "text-md")
  assert.equal(cn("text-sm", "text-sm-strong"), "text-sm-strong")
  assert.equal(cn("text-md-strong", "text-sm"), "text-sm")
})

test("custom shadow scale participates in shadow conflicts", () => {
  assert.equal(cn("shadow-hairline", "shadow-lg"), "shadow-lg")
  assert.equal(cn("shadow-sm", "shadow-hairline"), "shadow-hairline")
})

test("shadow size and shadow color do not conflict", () => {
  assert.equal(cn("shadow-hairline", "shadow-black/5"), "shadow-hairline shadow-black/5")
})
