<script setup>
import { onMounted, ref, useTemplateRef } from 'vue'

const props = defineProps({
  value: { type: Number, required: true },
  duration: { type: Number, default: 1600 },
  prefix: { type: String, default: '' },
  suffix: { type: String, default: '' },
})

const display = ref(0)
const root = useTemplateRef('root')

const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t))

const run = () => {
  const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  if (reduced) {
    display.value = props.value
    return
  }
  const start = performance.now()
  const tick = (now) => {
    const p = Math.min((now - start) / props.duration, 1)
    display.value = Math.round(easeOutExpo(p) * props.value)
    if (p < 1) requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)
}

onMounted(() => {
  const io = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        run()
        io.disconnect()
      }
    },
    { threshold: 0.5 }
  )
  if (root.value) io.observe(root.value)
})
</script>

<template>
  <span ref="root">{{ prefix }}{{ display.toLocaleString('fr-FR') }}{{ suffix }}</span>
</template>
