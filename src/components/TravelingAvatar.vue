<script setup>
import { onMounted, onUnmounted, ref, computed, defineAsyncComponent } from 'vue'
import { avatar3d } from '../data/content.js'

// Avatar 3D unique qui « voyage » en haut de l'écran sur tout le site : il
// zigzague horizontalement et se tourne au fil du scroll. Fixe, au-dessus du
// contenu (sous la navbar), sans bloquer les clics.
const Avatar3D = defineAsyncComponent(() => import('./Avatar3D.vue'))

const reduced =
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

const enabled = ref(true)
const leftPct = ref(50)
const ty = ref(0)
const spin = ref(0)
const failed = ref(false)

let raf = null
const onScroll = () => {
  if (raf) return
  raf = requestAnimationFrame(() => {
    raf = null
    const max = document.documentElement.scrollHeight - window.innerHeight
    const f = max > 0 ? Math.min(1, Math.max(0, (window.scrollY || 0) / max)) : 0
    // trajet sinusoïdal gauche ↔ droite (3 allers-retours sur la page)
    const wave = Math.sin(f * Math.PI * 3 - Math.PI / 2)
    leftPct.value = 50 + wave * 38
    ty.value = Math.sin(f * Math.PI * 6) * 10
    // se tourne dans le sens du déplacement
    spin.value = Math.cos(f * Math.PI * 3 - Math.PI / 2) * 1.1
  })
}
const onResize = () => {
  enabled.value = window.innerWidth >= 768
}

onMounted(() => {
  if (reduced || !avatar3d.url) {
    enabled.value = false
    return
  }
  onResize()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onResize, { passive: true })
  onScroll()
})
onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onResize)
  if (raf) cancelAnimationFrame(raf)
})

const boxStyle = computed(() => ({
  left: leftPct.value + '%',
  transform: `translate(-50%, ${ty.value}px)`,
}))
</script>

<template>
  <div
    v-if="enabled && !failed"
    class="pointer-events-none fixed inset-x-0 top-[4.5rem] z-40 hidden h-[13rem] md:block"
    aria-hidden="true"
  >
    <div
      class="absolute h-[13rem] w-[10rem] will-change-transform"
      :style="boxStyle"
    >
      <Avatar3D :src="avatar3d.url" :spin="spin" clip="Idle" @error="failed = true" />
    </div>
  </div>
</template>
