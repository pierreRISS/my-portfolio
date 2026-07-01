<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import CountUp from './CountUp.vue'

const stats = [
  { value: 3, suffix: 'ᵉ', label: 'année à Epitech' },
  { value: 2000, suffix: '+', label: 'utilisateurs touchés en prod' },
  { value: 30, suffix: 'K+', label: "images dans un dataset IA" },
  { value: 2, suffix: '', label: 'apps déployées (prod & stores)' },
]

const root = ref(null)
const progress = ref(0)

const reduced =
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

let raf = null
const onScroll = () => {
  if (raf) return
  raf = requestAnimationFrame(() => {
    raf = null
    const el = root.value
    if (!el) return
    const rect = el.getBoundingClientRect()
    const total = rect.height - window.innerHeight
    if (total <= 0) {
      progress.value = 0
      return
    }
    const p = -rect.top / total
    progress.value = p < 0 ? 0 : p > 1 ? 1 : p
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

const clamp = (v, a, b) => (v < a ? a : v > b ? b : v)
const ramp = (p, a, b) => clamp((p - a) / (b - a), 0, 1)
const ease = (t) => 1 - Math.pow(1 - t, 3) // easeOutCubic

// Les stats, cœur de la section : entrée en cascade au fil du scroll
const statStyle = (i) => {
  if (reduced) return {}
  const p = progress.value
  const start = 0.12 + i * 0.1
  const enter = ease(ramp(p, start, start + 0.32))
  const exit = ease(ramp(p, 0.92, 1))
  const ty = (1 - enter) * 70 - exit * 30
  const scale = 0.88 + enter * 0.12
  return {
    opacity: enter * (1 - exit * 0.6),
    transform: `translate3d(0, ${ty}px, 0) scale(${scale})`,
  }
}
</script>

<template>
  <section
    id="about"
    ref="root"
    class="relative"
    :style="{ height: reduced ? 'auto' : '150vh' }"
  >
    <div
      class="flex flex-col justify-center overflow-hidden"
      :class="reduced ? 'py-28 sm:py-36' : 'sticky top-0 h-screen'"
    >
      <div class="container-pr relative">
        <div class="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <div
            v-for="(s, i) in stats"
            :key="s.label"
            :style="statStyle(i)"
            v-tilt="{ max: 6 }"
            class="relative overflow-hidden rounded-3xl border border-ink/5 bg-white p-7 text-center shadow-[0_10px_40px_-14px_rgba(22,22,29,0.15)]"
          >
            <div class="text-5xl font-semibold accent-gradient sm:text-6xl">
              <CountUp :value="s.value" :suffix="s.suffix" />
            </div>
            <div class="mt-3 text-sm leading-snug text-ink/55">
              {{ s.label }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
