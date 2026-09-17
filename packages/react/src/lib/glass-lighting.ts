/** Update CSS-only reflections without re-rendering React or the WebGL scene. */
export function attachGlassLighting(root: HTMLElement) {
  const target = root.closest("a, button") ?? root
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
  let frame = 0
  const reset = () => {
    cancelAnimationFrame(frame)
    root.style.removeProperty("--glass-light-angle")
    root.style.removeProperty("--glass-light-x")
    root.style.removeProperty("--glass-light-y")
  }
  const move = (event: Event) => {
    if (!(event instanceof PointerEvent) || reducedMotion.matches) return
    const bounds = target.getBoundingClientRect()
    const x = Math.min(1, Math.max(0, (event.clientX - bounds.left) / bounds.width))
    const y = Math.min(1, Math.max(0, (event.clientY - bounds.top) / bounds.height))
    cancelAnimationFrame(frame)
    frame = requestAnimationFrame(() => {
      root.style.setProperty("--glass-light-angle", `${125 + x * 35 + y * 10}deg`)
      root.style.setProperty("--glass-light-x", `${20 + x * 40}%`)
      root.style.setProperty("--glass-light-y", `${y * 35}%`)
    })
  }
  target.addEventListener("pointermove", move)
  target.addEventListener("pointerleave", reset)
  reducedMotion.addEventListener("change", reset)
  return () => {
    reset()
    target.removeEventListener("pointermove", move)
    target.removeEventListener("pointerleave", reset)
    reducedMotion.removeEventListener("change", reset)
  }
}
