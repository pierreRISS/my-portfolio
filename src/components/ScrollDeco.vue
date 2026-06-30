<script setup>
import { onMounted, onUnmounted, ref, computed } from 'vue'

// Couche décorative globale, version « à fond » : grosse fusée qui grimpe avec
// flamme, orbes colorés qui voyagent, glyphes bien visibles, le tout réagissant
// à la VITESSE de scroll (étirement / skew).
const reduced =
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

const scrollY = ref(0)
const vh = ref(typeof window !== 'undefined' ? window.innerHeight : 800)
const frac = ref(0)
const vel = ref(0) // vitesse de scroll lissée (px/frame)

let raf = null
let lastY = 0
let velImpulse = 0
const tick = () => {
  raf = null
  const y = window.scrollY || 0
  velImpulse = y - lastY
  lastY = y
  scrollY.value = y
  vh.value = window.innerHeight
  const max = document.documentElement.scrollHeight - window.innerHeight
  frac.value = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0
}
const onScroll = () => {
  if (raf) return
  raf = requestAnimationFrame(tick)
}

// boucle d'amortissement de la vitesse pour un rendu fluide
let loop = null
const animate = () => {
  vel.value += (velImpulse - vel.value) * 0.2
  velImpulse *= 0.9
  loop = requestAnimationFrame(animate)
}

onMounted(() => {
  if (reduced) return
  lastY = window.scrollY || 0
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll, { passive: true })
  onScroll()
  animate()
})
onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
  if (loop) cancelAnimationFrame(loop)
})

// Orbes colorés qui voyagent en diagonale avec le scroll
const orbs = computed(() => {
  const y = scrollY.value
  return [
    {
      cls: 'h-[26rem] w-[26rem] bg-accent/30',
      style: {
        left: '-8%',
        top: '10%',
        transform: `translate3d(${y * 0.05}px, ${y * 0.12}px, 0)`,
      },
    },
    {
      cls: 'h-[22rem] w-[22rem] bg-accent-2/30',
      style: {
        right: '-6%',
        top: '30%',
        transform: `translate3d(${y * -0.06}px, ${y * -0.1}px, 0)`,
      },
    },
    {
      cls: 'h-[20rem] w-[20rem] bg-fuchsia-500/20',
      style: {
        left: '20%',
        top: '70%',
        transform: `translate3d(${y * 0.04}px, ${y * -0.08}px, 0)`,
      },
    },
  ]
})

// Glyphes de code, gros et visibles, parallax + rotation + skew selon vitesse
const glyphs = [
  { t: '</>', cls: 'left-[4%] top-[16%] text-7xl text-accent/40', s: 0.12, r: 0.03 },
  { t: '{ }', cls: 'right-[6%] top-[24%] text-6xl text-accent-2/40', s: -0.1, r: -0.04 },
  { t: '( )', cls: 'left-[9%] top-[50%] text-5xl text-white/25', s: 0.15, r: 0.04 },
  { t: ';', cls: 'right-[11%] top-[60%] text-8xl text-accent/35', s: -0.13, r: 0 },
  { t: '#', cls: 'left-[6%] top-[82%] text-6xl text-accent-2/35', s: 0.1, r: -0.03 },
  { t: '[ ]', cls: 'right-[7%] top-[88%] text-5xl text-white/20', s: -0.12, r: 0.05 },
  { t: '=>', cls: 'left-[44%] top-[36%] text-5xl text-accent/30', s: 0.09, r: 0.02 },
]
const glyphStyle = (g) => ({
  transform: `translate3d(0, ${scrollY.value * g.s}px, 0) rotate(${
    scrollY.value * g.r
  }deg) skewY(${vel.value * 0.15}deg)`,
})
</script>

<template>
  <div
    v-if="!reduced"
    class="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    aria-hidden="true"
  >
    <!-- Orbes colorés -->
    <div
      v-for="(o, i) in orbs"
      :key="'o' + i"
      class="absolute rounded-full blur-[90px] will-change-transform"
      :class="o.cls"
      :style="o.style"
    />

    <!-- Glyphes de code -->
    <span
      v-for="(g, i) in glyphs"
      :key="'g' + i"
      class="absolute select-none font-mono font-bold will-change-transform"
      :class="g.cls"
      :style="glyphStyle(g)"
      >{{ g.t }}</span
    >
  </div>
</template>
