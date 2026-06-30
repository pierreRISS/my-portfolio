// Apple-style scroll reveal using IntersectionObserver.
// Usage: v-reveal  or  v-reveal="{ delay: 120 }"
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
    const delay = binding.value?.delay
    if (delay) el.style.transitionDelay = `${delay}ms`
    observer.observe(el)
  },
  unmounted(el) {
    observer.unobserve(el)
  },
}
