import assert from "node:assert/strict";
import { test } from "node:test";
import { scheduleGlassRenderer } from "./glass-lifecycle.ts";

test("Strict Mode cleanup skips startup before it acquires the root", async () => {
  let starts = 0;
  const run = scheduleGlassRenderer(Promise.resolve(), async () => {
    starts++;
    return { destroy() {} };
  }, () => assert.fail("cancelled renderer became live"), (error) => { throw error; });
  run.dispose();
  await run.settled;
  assert.equal(starts, 0);
});

test("replacement waits for pending startup to finish and be destroyed", async () => {
  const events: string[] = [];
  let resolve!: (value: { destroy(): void }) => void;
  const pending = new Promise<{ destroy(): void }>((done) => { resolve = done; });
  const first = scheduleGlassRenderer(Promise.resolve(), () => pending,
    () => assert.fail("cancelled renderer became live"), (error) => { throw error; });
  await Promise.resolve();
  first.dispose();
  const second = scheduleGlassRenderer(first.settled, async () => {
    events.push("start replacement");
    return { destroy() { events.push("destroy replacement"); } };
  }, () => { events.push("live"); }, (error) => { throw error; });
  resolve({ destroy() { events.push("destroy original"); } });
  await second.settled;
  assert.deepEqual(events, ["destroy original", "start replacement", "live"]);
  second.dispose();
  second.dispose();
  assert.equal(events.filter((event) => event === "destroy replacement").length, 1);
});

test("failed initialization does not block a replacement", async () => {
  const error = new Error("WebGL unavailable");
  const failures: unknown[] = [];
  const first = scheduleGlassRenderer(Promise.resolve(), async () => { throw error; },
    () => assert.fail("failed renderer became live"), (reason) => { failures.push(reason); });
  let live = false;
  const second = scheduleGlassRenderer(first.settled, async () => ({ destroy() {} }),
    () => { live = true; }, (error) => { throw error; });
  await second.settled;
  assert.deepEqual(failures, [error]);
  assert.equal(live, true);
  second.dispose();
});
