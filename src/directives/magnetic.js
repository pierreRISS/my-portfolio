// Magnetic hover: the element is gently pulled toward the cursor.
// Usage: v-magnetic  or  v-magnetic="{ strength: 0.4 }"
const supportsHover =
  typeof window !== 'undefined' &&
  window.matchMedia?.('(hover: hover)').matches &&
  !window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

export const magnetic = {
  mounted(el, binding) {
    if (!supportsHover) return
    const strength = binding.value?.strength ?? 0.35
    el.style.transition = 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
    el.style.willChange = 'transform'

    let raf = null
    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      const dx = e.clientX - (r.left + r.width / 2)
      const dy = e.clientY - (r.top + r.height / 2)
      if (raf) cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`
      })
    }
    const onLeave = () => {
      if (raf) cancelAnimationFrame(raf)
      el.style.transform = 'translate(0, 0)'
    }

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    el._magCleanup = () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  },
  unmounted(el) {
    el._magCleanup?.()
  },
}
