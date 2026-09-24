import assert from "node:assert/strict"
import test from "node:test"
import { zoomTranslate } from "./image-zoom.ts"

// A 400px image laid out at 300 in a 1000px frame, magnified to 800px.
const axis = { frameStart: 0, frameSize: 1000, layoutStart: 300, rendered: 800, ancestor: 1 }

test("a magnified image smaller than the frame stays centred", () => {
  for (const cursor of [0, 500, 1000]) {
    // Centred: starts at 100, 200px left of where it was laid out.
    assert.equal(zoomTranslate({ ...axis, cursor }), -200)
  }
})

// Magnified to 1600px: wider than the frame, so it pans.
const wide = { ...axis, rendered: 1600 }

test("the pointer at one edge of the frame shows that edge of the image", () => {
  // Left edge of the frame: the image's left edge sits at the frame's.
  assert.equal(zoomTranslate({ ...wide, cursor: 0 }), -300)
  // Right edge: the image's right edge sits at the frame's (1000 - 1600).
  assert.equal(zoomTranslate({ ...wide, cursor: 1000 }), -900)
  // Past the frame, it holds at the edge.
  assert.equal(zoomTranslate({ ...wide, cursor: 1400 }), -900)
})

test("the pointer in the middle shows the middle", () => {
  assert.equal(zoomTranslate({ ...wide, cursor: 500 }), -600)
})

test("an ancestor's scale converts client pixels to the image's own", () => {
  // The dialog is mid-open at half size: the same travel is twice as many
  // image pixels.
  assert.equal(zoomTranslate({ ...wide, cursor: 0, ancestor: 0.5 }), -600)
})
