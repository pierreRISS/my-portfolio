// 3D tilt + spotlight that follows the cursor (Apple-card feel).
// Usage: v-tilt  or  v-tilt="{ max: 8, scale: 1.02 }"
// Adds CSS vars --rx, --ry (rotation), --mx, --my (spotlight position %).
const supportsHover =
  typeof window !== 'undefined' &&
  window.matchMedia?.('(hover: hover)').matches &&
  !window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

export const tilt = {
  mounted(el, binding) {
    if (!supportsHover) return
    const max = binding.value?.max ?? 7
    const scale = binding.value?.scale ?? 1.015

    el.classList.add('tilt')

    let raf = null
    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      const px = (e.clientX - r.left) / r.width
      const py = (e.clientY - r.top) / r.height
      if (raf) cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        el.style.setProperty('--ry', `${(px - 0.5) * 2 * max}deg`)
        el.style.setProperty('--rx', `${(0.5 - py) * 2 * max}deg`)
        el.style.setProperty('--mx', `${px * 100}%`)
        el.style.setProperty('--my', `${py * 100}%`)
        el.style.setProperty('--tilt-scale', scale)
      })
    }
    const onLeave = () => {
      if (raf) cancelAnimationFrame(raf)
      el.style.setProperty('--ry', '0deg')
      el.style.setProperty('--rx', '0deg')
      el.style.setProperty('--tilt-scale', '1')
    }

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    el._tiltCleanup = () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  },
  unmounted(el) {
    el._tiltCleanup?.()
  },
}
