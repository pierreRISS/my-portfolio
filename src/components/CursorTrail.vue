<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

// Traînée de curseur facon comète : une série de points qui suivent la souris
// avec un délai dégressif. Desktop uniquement, coupé en reduced-motion.
const enabled =
  typeof window !== 'undefined' &&
  window.matchMedia?.('(hover: hover)').matches &&
  !window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

const COUNT = 14
const dots = ref(
  Array.from({ length: COUNT }, () => ({ x: -100, y: -100 })),
)
const visible = ref(false)

const target = { x: -100, y: -100 }
let loop = null

const onMove = (e) => {
  target.x = e.clientX
  target.y = e.clientY
  visible.value = true
}
const onLeave = () => (visible.value = false)

const animate = () => {
  const arr = dots.value
  // le 1er point suit la cible, chaque point suit le précédent
  let px = target.x
  let py = target.y
  for (let i = 0; i < arr.length; i++) {
    const d = arr[i]
    d.x += (px - d.x) * 0.35
    d.y += (py - d.y) * 0.35
    px = d.x
    py = d.y
  }
  loop = requestAnimationFrame(animate)
}

onMounted(() => {
  if (!enabled) return
  window.addEventListener('mousemove', onMove, { passive: true })
  document.addEventListener('mouseleave', onLeave)
  animate()
})
onUnmounted(() => {
  window.removeEventListener('mousemove', onMove)
  document.removeEventListener('mouseleave', onLeave)
  if (loop) cancelAnimationFrame(loop)
})
</script>

<template>
  <div
    v-if="enabled"
    class="pointer-events-none fixed inset-0 z-30 overflow-hidden transition-opacity duration-300"
    :class="visible ? 'opacity-100' : 'opacity-0'"
    aria-hidden="true"
  >
    <span
      v-for="(d, i) in dots"
      :key="i"
      class="absolute rounded-full mix-blend-screen"
      :style="{
        left: d.x + 'px',
        top: d.y + 'px',
        width: 14 - i * 0.8 + 'px',
        height: 14 - i * 0.8 + 'px',
        transform: 'translate(-50%, -50%)',
        background:
          i % 2
            ? 'radial-gradient(circle, rgba(168,85,247,0.9), transparent 70%)'
            : 'radial-gradient(circle, rgba(99,102,241,0.9), transparent 70%)',
        opacity: 1 - i / 16,
      }"
    />
  </div>
</template>
