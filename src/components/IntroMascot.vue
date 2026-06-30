<script setup>
import { onMounted, onUnmounted, ref, computed } from 'vue'
import Mascot from './Mascot.vue'
import AppIcon from './AppIcon.vue'

// Intro : le mascot est la vedette. Au scroll, des éléments du parcours se
// déploient un à un (il regarde vers chacun), puis le mascot descend pour
// laisser place à la suite. Progression lissée pour un mouvement fluide.
const items = [
  { icon: 'code', text: 'Epitech · 3ᵉ année', side: 'left', top: '24%' },
  { icon: 'brain', text: 'Full-stack · IA · Systèmes', side: 'right', top: '36%' },
  { icon: 'server', text: '2000+ utilisateurs en prod', side: 'left', top: '56%' },
  { icon: 'rocket', text: 'Apps publiées sur les stores', side: 'right', top: '66%' },
]
const N = items.length

const reduced =
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

const root = ref(null)
const rawP = ref(0)
const dispP = ref(0)
const wide = ref(true)
const interactive = computed(() => !reduced && wide.value)

const clamp = (v, a, b) => (v < a ? a : v > b ? b : v)
const ease = (t) => t * t * (3 - 2 * t)
const ramp = (p, a, b) => ease(clamp((p - a) / (b - a), 0, 1))

let loop = null
const measure = () => {
  const el = root.value
  if (!el) return
  const r = el.getBoundingClientRect()
  const total = r.height - window.innerHeight
  rawP.value = total > 0 ? clamp(-r.top / total, 0, 1) : 0
}
const frame = () => {
  measure()
  dispP.value += (rawP.value - dispP.value) * 0.09
  loop = requestAnimationFrame(frame)
}
const onResize = () => (wide.value = window.innerWidth >= 1024)

onMounted(() => {
  onResize()
  window.addEventListener('resize', onResize, { passive: true })
  if (reduced) return
  loop = requestAnimationFrame(frame)
})
onUnmounted(() => {
  window.removeEventListener('resize', onResize)
  if (loop) cancelAnimationFrame(loop)
})

// seuil d'apparition de chaque élément
const threshold = (i) => 0.1 + i * 0.12

// le mascot descend une fois les éléments déployés
const mascotStyle = computed(() => {
  if (!interactive.value) return {}
  const p = dispP.value
  const descend = ramp(p, 0.66, 1)
  const ty = descend * window.innerHeight * 0.6
  const sway = Math.sin(p * Math.PI * 4) * 10
  const scale = 1 - descend * 0.18
  return {
    transform: `translate(calc(-50% + ${sway}px), ${ty}px) scale(${scale})`,
    opacity: 1 - ramp(p, 0.9, 1),
  }
})

// le regard suit le dernier élément déployé
const look = computed(() => {
  if (!interactive.value) return { x: 0, y: 1 }
  const p = dispP.value
  let last = -1
  for (let i = 0; i < N; i++) if (p > threshold(i)) last = i
  if (last < 0) return { x: 0, y: 2 }
  return { x: items[last].side === 'left' ? -3.5 : 3.5, y: 1 }
})

const itemStyle = (i) => {
  if (!interactive.value) return {}
  const p = dispP.value
  const o = ramp(p, threshold(i), threshold(i) + 0.07)
  const exit = ramp(p, 0.8, 0.98)
  const dir = items[i].side === 'left' ? -1 : 1
  return {
    opacity: o * (1 - exit),
    transform: `translate3d(${(1 - o) * 45 * dir}px, ${(1 - o) * 16}px, 0)`,
  }
}

const introStyle = computed(() =>
  interactive.value ? { opacity: 1 - ramp(dispP.value, 0, 0.12) } : {},
)
</script>

<template>
  <section
    ref="root"
    id="intro"
    class="relative"
    :style="{ height: interactive ? '380vh' : 'auto' }"
  >
    <div
      class="overflow-hidden"
      :class="interactive ? 'sticky top-0 h-screen' : 'py-20'"
    >
      <div class="container-pr relative h-full">
        <!-- petite intro qui s'efface -->
        <p
          v-if="interactive"
          class="absolute left-1/2 top-[12%] -translate-x-1/2 text-center text-sm font-medium uppercase tracking-[0.25em] text-white/45"
          :style="introStyle"
        >
          Salut — moi c'est Pierre 👋
        </p>

        <!-- Mascot vedette -->
        <div
          class="absolute will-change-transform"
          :class="interactive ? 'left-1/2 top-[26%] w-[clamp(11rem,18vw,15rem)]' : 'relative mx-auto w-56'"
          :style="mascotStyle"
        >
          <div :class="interactive ? '' : 'animate-none'">
            <Mascot :look="look" class="aspect-[120/175]" />
          </div>
        </div>

        <!-- Éléments qui se déploient un à un -->
        <template v-if="interactive">
          <div
            v-for="(it, i) in items"
            :key="it.text"
            class="absolute flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2.5 text-sm text-white/85 backdrop-blur will-change-transform"
            :class="it.side === 'left' ? 'left-[6%]' : 'right-[6%]'"
            :style="[{ top: it.top }, itemStyle(i)]"
          >
            <span
              class="grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-accent/30 to-accent-2/25 text-white"
            >
              <AppIcon :name="it.icon" class="h-4 w-4" />
            </span>
            {{ it.text }}
          </div>
        </template>

        <!-- Repli mobile / reduced-motion -->
        <div
          v-else
          class="mx-auto mt-10 flex max-w-md flex-wrap justify-center gap-3"
        >
          <div
            v-for="it in items"
            :key="it.text"
            v-reveal
            class="flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2.5 text-sm text-white/85"
          >
            <span
              class="grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-accent/30 to-accent-2/25 text-white"
            >
              <AppIcon :name="it.icon" class="h-4 w-4" />
            </span>
            {{ it.text }}
          </div>
        </div>

        <!-- indice de scroll -->
        <div
          v-if="interactive"
          class="absolute inset-x-0 bottom-6 flex justify-center"
          :style="introStyle"
        >
          <span class="text-xs uppercase tracking-[0.2em] text-white/35"
            >Défile pour me découvrir ↓</span
          >
        </div>
      </div>
    </div>
  </section>
</template>
