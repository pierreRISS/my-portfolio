<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const progress = ref(0)
let ticking = false

const compute = () => {
  const h = document.documentElement
  const max = h.scrollHeight - h.clientHeight
  progress.value = max > 0 ? (h.scrollTop / max) * 100 : 0
  ticking = false
}
const onScroll = () => {
  if (!ticking) {
    ticking = true
    requestAnimationFrame(compute)
  }
}

onMounted(() => {
  compute()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll, { passive: true })
})
onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
})
</script>

<template>
  <div class="fixed inset-x-0 top-0 z-[60] h-0.5 bg-transparent">
    <div
      class="h-full origin-left bg-gradient-to-r from-accent via-accent-2 to-accent shadow-[0_0_12px] shadow-accent/50 transition-[width] duration-75 ease-out"
      :style="{ width: progress + '%' }"
    />
  </div>
</template>
