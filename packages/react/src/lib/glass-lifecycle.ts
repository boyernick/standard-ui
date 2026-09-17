/** Serialize renderer ownership of a root, including asynchronous startup. */
export function scheduleGlassRenderer<T extends { destroy(): void }>(
  previous: Promise<void>,
  initialize: () => Promise<T>,
  ready: (instance: T) => void,
  failed: (error: unknown) => void,
) {
  let cancelled = false;
  let instance: T | undefined;
  const settled = previous.then(async () => {
    if (cancelled) return;
    try {
      instance = await initialize();
      if (cancelled) {
        instance.destroy();
        instance = undefined;
      } else {
        ready(instance);
      }
    } catch (error) {
      if (!cancelled) failed(error);
    }
  });

  return {
    settled,
    dispose() {
      cancelled = true;
      instance?.destroy();
      instance = undefined;
    },
  };
}
