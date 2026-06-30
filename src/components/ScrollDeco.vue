<script setup>
import { onMounted, onUnmounted, ref, computed } from 'vue'

// Couche décorative globale qui réagit au scroll : une fusée qui grimpe au fil
// de la page, des glyphes de code et des formes qui dérivent en parallax.
const reduced =
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

const scrollY = ref(0)
const vh = ref(typeof window !== 'undefined' ? window.innerHeight : 800)
const frac = ref(0) // progression globale 0 → 1

let raf = null
const onScroll = () => {
  if (raf) return
  raf = requestAnimationFrame(() => {
    raf = null
    const y = window.scrollY || 0
    scrollY.value = y
    vh.value = window.innerHeight
    const max = document.documentElement.scrollHeight - window.innerHeight
    frac.value = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0
  })
}

onMounted(() => {
  if (reduced) return
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll, { passive: true })
  onScroll()
})
onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
})

// Glyphes de code flottants — parallax + rotation lente liés au scroll
const glyphs = [
  { t: '</>', cls: 'left-[5%] top-[14%] text-5xl text-accent/25', s: 0.06, r: 0.02 },
  { t: '{ }', cls: 'right-[7%] top-[26%] text-4xl text-accent-2/25', s: -0.05, r: -0.03 },
  { t: '( )', cls: 'left-[11%] top-[52%] text-3xl text-white/15', s: 0.08, r: 0.025 },
  { t: ';', cls: 'right-[14%] top-[64%] text-6xl text-accent/20', s: -0.07, r: 0 },
  { t: '#', cls: 'left-[8%] top-[80%] text-4xl text-accent-2/20', s: 0.05, r: -0.02 },
  { t: '[ ]', cls: 'right-[9%] top-[88%] text-3xl text-white/12', s: -0.06, r: 0.03 },
]
const glyphStyle = (g) => ({
  transform: `translate3d(0, ${scrollY.value * g.s}px, 0) rotate(${
    scrollY.value * g.r
  }deg)`,
})

// Formes géométriques en outline qui dérivent
const shapes = computed(() => [
  {
    cls: 'left-[3%] top-[40%] h-24 w-24 rounded-full border border-accent/20',
    style: { transform: `translate3d(0, ${scrollY.value * -0.04}px, 0)` },
  },
  {
    cls: 'right-[4%] top-[46%] h-16 w-16 rotate-12 rounded-2xl border border-accent-2/20',
    style: {
      transform: `translate3d(0, ${scrollY.value * 0.06}px, 0) rotate(${
        12 + scrollY.value * 0.02
      }deg)`,
    },
  },
])

// Fusée qui grimpe : bas de page → haut au fil du scroll, avec léger balancement
const rocketStyle = computed(() => {
  const climb = (1 - frac.value) * vh.value * 0.7 + vh.value * 0.12
  const sway = Math.sin(frac.value * Math.PI * 4) * 26
  const tilt = Math.sin(frac.value * Math.PI * 4) * 6
  return {
    transform: `translate3d(${sway}px, ${climb}px, 0) rotate(${tilt}deg)`,
  }
})
const trailStyle = computed(() => ({
  opacity: 0.25 + Math.abs(Math.sin(frac.value * Math.PI * 8)) * 0.35,
}))
</script>

<template>
  <div
    v-if="!reduced"
    class="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    aria-hidden="true"
  >
    <!-- Glyphes de code -->
    <span
      v-for="(g, i) in glyphs"
      :key="i"
      class="absolute select-none font-mono font-semibold will-change-transform"
      :class="g.cls"
      :style="glyphStyle(g)"
      >{{ g.t }}</span
    >

    <!-- Formes -->
    <span
      v-for="(s, i) in shapes"
      :key="'s' + i"
      class="absolute will-change-transform"
      :class="s.cls"
      :style="s.style"
    />

    <!-- Fusée qui grimpe -->
    <div
      class="absolute right-[12%] top-0 will-change-transform"
      :style="rocketStyle"
    >
      <!-- traînée -->
      <div
        class="absolute left-1/2 top-full h-24 w-1.5 -translate-x-1/2 rounded-full bg-gradient-to-b from-accent-2/60 to-transparent blur-[2px]"
        :style="trailStyle"
      />
      <svg
        viewBox="0 0 24 24"
        class="h-14 w-14 text-accent drop-shadow-[0_0_12px_rgba(99,102,241,0.5)]"
        fill="none"
        stroke="currentColor"
        stroke-width="1.4"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M4.5 16.5c-1.5 1.3-2 5-2 5s3.7-.5 5-2a2.1 2.1 0 0 0-3-3z" />
        <path
          d="M12 15l-3-3a22 22 0 0 1 9-12 8 8 0 0 1 3 3 22 22 0 0 1-12 9z"
          class="fill-accent/15"
        />
        <path d="M9 12H4s.5-2.8 2-4a4.6 4.6 0 0 1 4 0" />
        <path d="M12 15v5s2.8-.5 4-2a4.6 4.6 0 0 0 0-4" />
        <circle cx="15" cy="9" r="1.4" class="fill-accent-2/40" />
      </svg>
    </div>
  </div>
</template>
