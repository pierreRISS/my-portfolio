// Apple-style scroll reveal using IntersectionObserver.
// Usage:
//   v-reveal
//   v-reveal="{ delay: 120 }"
//   v-reveal="{ variant: 'left' | 'right' | 'scale' | 'blur', delay: 80 }"
const observer = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      }
    }
  },
  { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
)

export const reveal = {
  mounted(el, binding) {
    el.classList.add('reveal')
    const variant = binding.value?.variant
    if (variant) el.classList.add(`reveal-${variant}`)
    const delay = binding.value?.delay
    if (delay) el.style.transitionDelay = `${delay}ms`
    observer.observe(el)
  },
  unmounted(el) {
    observer.unobserve(el)
  },
}
