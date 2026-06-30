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

// Fusée : grimpe au fil de la page + s'étire selon la vitesse de scroll
const rocketStyle = computed(() => {
  const climb = (1 - frac.value) * vh.value * 0.72 + vh.value * 0.1
  const sway = Math.sin(frac.value * Math.PI * 5) * 40
  const tilt = Math.sin(frac.value * Math.PI * 5) * 8 - vel.value * 0.25
  const stretch = 1 + Math.min(0.4, Math.abs(vel.value) * 0.006)
  return {
    transform: `translate3d(${sway}px, ${climb}px, 0) rotate(${tilt}deg) scaleY(${stretch})`,
  }
})
// la flamme s'allonge quand on scrolle vite
const flameLen = computed(() =>
  Math.min(7, 2.5 + Math.abs(vel.value) * 0.06),
)
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

    <!-- Fusée qui grimpe avec flamme -->
    <div
      class="absolute right-[8%] top-0 will-change-transform sm:right-[10%]"
      :style="rocketStyle"
    >
      <!-- flamme -->
      <div
        class="absolute left-1/2 top-[88%] -translate-x-1/2 animate-flame"
        :style="{ height: flameLen + 'rem' }"
      >
        <div
          class="mx-auto h-full w-3 rounded-b-full bg-gradient-to-b from-amber-300 via-orange-500 to-transparent blur-[1px]"
        />
      </div>
      <div
        class="absolute left-1/2 top-[90%] h-16 w-1 -translate-x-1/2 rounded-full bg-gradient-to-b from-accent-2/70 to-transparent blur-[2px]"
      />
      <!-- corps -->
      <svg
        viewBox="0 0 24 24"
        class="h-20 w-20 text-accent drop-shadow-[0_0_22px_rgba(99,102,241,0.7)]"
        fill="none"
        stroke="currentColor"
        stroke-width="1.4"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path
          d="M12 15l-3-3a22 22 0 0 1 9-12 8 8 0 0 1 3 3 22 22 0 0 1-12 9z"
          class="fill-accent/25"
        />
        <path d="M9 12H4s.5-2.8 2-4a4.6 4.6 0 0 1 4 0" class="fill-accent/20" />
        <path d="M12 15v5s2.8-.5 4-2a4.6 4.6 0 0 0 0-4" class="fill-accent/20" />
        <circle cx="15" cy="9" r="1.6" class="fill-white/70 stroke-none" />
      </svg>
    </div>
  </div>
</template>
