import assert from "node:assert/strict";
import { test } from "node:test";
import { intersect, objectFitRect, parseConfig, resolveGlass, samplePadding } from "./config.ts";

test("a large pane gets the reference material", () => {
  const glass = resolveGlass({ cornerRadius: 132 }, 400, 560, 0);
  assert.equal(glass.bezel, 48);
  assert.equal(glass.bend, 36);
  assert.equal(glass.power, 4.2);
  assert.equal(glass.rimWidth, 3.5);
  assert.deepEqual(
    [glass.dispersionRed, glass.dispersionBlue, glass.rim, glass.frost, glass.grain, glass.dim],
    [1.2, 0.8, 0.5, 3, 0.07, 0.8],
  );
});

test("round controls stay circles, and small panes scale the bezel down", () => {
  const button = resolveGlass({}, 36, 36, 9999);
  assert.equal(button.power, 2);
  assert.equal(button.radius, 18);
  assert.ok(Math.abs(button.bezel - 10.8) < 1e-9);
  assert.ok(button.rimWidth >= 1.25 && button.rimWidth < 3.5);

  // A pill is fully rounded on its short side.
  assert.equal(resolveGlass({}, 120, 40, 20).power, 2);
  // A rounded rectangle keeps the continuous corner unless told otherwise.
  assert.equal(resolveGlass({}, 200, 80, 16).power, 4.2);
  assert.equal(resolveGlass({ cornerPower: 2 }, 200, 80, 16).power, 2);
});

test("LiquidGlass options are accepted and ignored", () => {
  const legacy = resolveGlass({ refraction: 0.12, zRadius: 3, blurAmount: 0.08, brightness: -0.3 }, 40, 40, 20);
  assert.deepEqual(legacy, resolveGlass({}, 40, 40, 20));
});

test("out-of-range values are clamped and junk config is ignored", () => {
  const glass = resolveGlass({ bezel: 999, dim: -1, grain: Number.NaN }, 40, 40, 20);
  assert.equal(glass.bezel, 20);
  assert.equal(glass.dim, 0);
  assert.equal(glass.grain, 0.07);
  assert.deepEqual(parseConfig("[1,2]"), {});
  assert.deepEqual(parseConfig("{not json"), {});
  assert.deepEqual(parseConfig('{"rim":1}'), { rim: 1 });
});

test("the ground is sampled far enough out for the bend, dispersion and frost", () => {
  const glass = resolveGlass({}, 400, 560, 132);
  assert.ok(samplePadding(glass) >= glass.bend * glass.dispersionRed + glass.frost * 2);
});

test("object-fit places media as CSS does", () => {
  const box = { width: 400, height: 200 };
  const natural = { width: 1000, height: 1000 };
  assert.deepEqual(objectFitRect(box, natural, "cover", "50% 50%"), { x: 0, y: -100, width: 400, height: 400 });
  assert.deepEqual(objectFitRect(box, natural, "contain", "50% 50%"), { x: 100, y: 0, width: 200, height: 200 });
  assert.deepEqual(objectFitRect(box, natural, "contain", "left top"), { x: 0, y: 0, width: 200, height: 200 });
  assert.deepEqual(objectFitRect(box, natural, "fill", "50% 50%"), { x: 0, y: 0, width: 400, height: 200 });
  assert.deepEqual(objectFitRect(box, { width: 100, height: 50 }, "scale-down", "50% 50%"), { x: 150, y: 75, width: 100, height: 50 });
});

test("boxes intersect, or do not", () => {
  assert.deepEqual(intersect({ x: 0, y: 0, width: 10, height: 10 }, { x: 5, y: 5, width: 10, height: 10 }), { x: 5, y: 5, width: 5, height: 5 });
  assert.equal(intersect({ x: 0, y: 0, width: 10, height: 10 }, { x: 10, y: 0, width: 5, height: 5 }), null);
});

test("the ground is dimmed on a dark page and left alone on a light one", () => {
  assert.equal(resolveGlass({}, 84, 26, 13).dim, 0.8);
  assert.equal(resolveGlass({}, 84, 26, 13, { lightGround: false }).dim, 0.8);
  assert.equal(resolveGlass({}, 84, 26, 13, { lightGround: true }).dim, 1);
  // A pane that asks for a dim keeps it either way (media controls over photos).
  assert.equal(resolveGlass({ dim: 0.62 }, 36, 36, 18, { lightGround: true }).dim, 0.62);
});

test("a light ground gets a hairline edge; a dark one keeps its rim alone", () => {
  assert.equal(resolveGlass({}, 84, 26, 13).edge, 0);
  assert.equal(resolveGlass({}, 84, 26, 13, { lightGround: true }).edge, 0.22);
  assert.equal(resolveGlass({ edge: 0.3 }, 84, 26, 13).edge, 0.3);
});
