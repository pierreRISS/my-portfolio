// Scroll-driven parallax. The element translates as it moves through the
// viewport. Usage: v-parallax="{ speed: 0.15 }"  (positive = slower than scroll)
const items = new Set()
let ticking = false

const update = () => {
  const vh = window.innerHeight
  for (const { el, speed } of items) {
    const r = el.getBoundingClientRect()
    // progress: -1 (below) → 0 (centered) → 1 (above)
    const progress = (r.top + r.height / 2 - vh / 2) / vh
    el.style.transform = `translate3d(0, ${progress * speed * -100}px, 0)`
  }
  ticking = false
}

const onScroll = () => {
  if (!ticking) {
    ticking = true
    requestAnimationFrame(update)
  }
}

const reduced =
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

export const parallax = {
  mounted(el, binding) {
    if (reduced) return
    const entry = { el, speed: binding.value?.speed ?? 0.2 }
    items.add(entry)
    el._parallax = entry
    if (items.size === 1) {
      window.addEventListener('scroll', onScroll, { passive: true })
      window.addEventListener('resize', onScroll, { passive: true })
    }
    update()
  },
  unmounted(el) {
    if (el._parallax) items.delete(el._parallax)
    if (items.size === 0) {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  },
}
