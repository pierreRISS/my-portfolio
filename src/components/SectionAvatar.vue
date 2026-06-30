<script setup>
import { ref, onMounted, onUnmounted, defineAsyncComponent } from 'vue'
import { avatar3d } from '../data/content.js'

// Grand avatar 3D décoratif posé dans une section, avec une pose (clip) propre.
// Monté uniquement quand la section approche de l'écran (IntersectionObserver)
// pour limiter le nombre de contextes WebGL actifs. Desktop large uniquement.
const Avatar3D = defineAsyncComponent(() => import('./Avatar3D.vue'))

const props = defineProps({
  clip: { type: String, default: 'Idle' },
  side: { type: String, default: 'right' }, // 'left' | 'right'
})

const reduced =
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

const root = ref(null)
const active = ref(false)
const spin = ref(0)
let io = null
let raf = null

const onScroll = () => {
  if (raf) return
  raf = requestAnimationFrame(() => {
    raf = null
    const el = root.value
    if (!el) return
    const r = el.getBoundingClientRect()
    const vh = window.innerHeight
    const prog = (r.top + r.height / 2 - vh / 2) / vh // -1 → 1
    spin.value = -prog * Math.PI * 0.7
  })
}

onMounted(() => {
  if (reduced || window.innerWidth < 1024 || !avatar3d.url) return
  io = new IntersectionObserver(
    ([e]) => (active.value = e.isIntersecting),
    { rootMargin: '300px' },
  )
  io.observe(root.value)
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})
onUnmounted(() => {
  io?.disconnect()
  window.removeEventListener('scroll', onScroll)
  if (raf) cancelAnimationFrame(raf)
})
</script>

<template>
  <div
    ref="root"
    class="pointer-events-none absolute bottom-0 -z-10 hidden aspect-[3/4] w-[22rem] opacity-90 lg:block"
    :class="side === 'left' ? 'left-0' : 'right-0'"
    aria-hidden="true"
  >
    <Avatar3D
      v-if="active"
      :src="avatar3d.url"
      :clip="clip"
      :spin="spin"
    />
  </div>
</template>
