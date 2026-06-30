<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const x = ref(-500)
const y = ref(-500)
const visible = ref(false)
const enabled =
  typeof window !== 'undefined' &&
  window.matchMedia?.('(hover: hover)').matches &&
  !window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

let raf = null
const onMove = (e) => {
  if (raf) return
  raf = requestAnimationFrame(() => {
    x.value = e.clientX
    y.value = e.clientY
    visible.value = true
    raf = null
  })
}
const onLeave = () => (visible.value = false)

onMounted(() => {
  if (!enabled) return
  window.addEventListener('mousemove', onMove, { passive: true })
  document.addEventListener('mouseleave', onLeave)
})
onUnmounted(() => {
  window.removeEventListener('mousemove', onMove)
  document.removeEventListener('mouseleave', onLeave)
})
</script>

<template>
  <div
    v-if="enabled"
    class="pointer-events-none fixed z-20 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full transition-opacity duration-500"
    :class="visible ? 'opacity-100' : 'opacity-0'"
    :style="{
      left: x + 'px',
      top: y + 'px',
      background:
        'radial-gradient(circle, rgba(99,102,241,0.10), rgba(168,85,247,0.06) 40%, transparent 70%)',
    }"
  />
</template>
