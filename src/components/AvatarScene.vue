<script setup>
import { onMounted, onUnmounted, ref, computed } from 'vue'
import AvatarFigure from './AvatarFigure.vue'

// Intro produit : un avatar de Pierre qui s'anime en fluide au scroll et
// révèle, une à une, des cartes de son parcours. Façon page produit Apple.
const cards = [
  {
    eyebrow: 'Formation',
    title: 'Epitech — 3ᵉ année',
    text: 'Master en ingénierie logicielle, en cours.',
    side: 'left',
    top: '16%',
  },
  {
    eyebrow: 'Ce que je fais',
    title: 'Full-stack · IA · Systèmes',
    text: 'Du C/C++ bas niveau au front Vue 3 + IA.',
    side: 'right',
    top: '23%',
  },
  {
    eyebrow: 'Impact',
    title: '2000+ utilisateurs en prod',
    text: 'Fonctionnalités déployées en entreprise.',
    side: 'left',
    top: '57%',
  },
  {
    eyebrow: 'Déploiement',
    title: 'Publié sur App Store & Play Store',
    text: 'Des apps livrées jusque sur les stores.',
    side: 'right',
    top: '64%',
  },
]
const N = cards.length

const reduced =
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

const root = ref(null)
const rawP = ref(0)
const dispP = ref(0)
const wide = ref(true)
const interactive = computed(() => !reduced && wide.value)

const clamp = (v, a, b) => (v < a ? a : v > b ? b : v)
const ease = (t) => t * t * (3 - 2 * t) // smoothstep

let loop = null
const measure = () => {
  const el = root.value
  if (!el) return
  const rect = el.getBoundingClientRect()
  const total = rect.height - window.innerHeight
  rawP.value = total > 0 ? clamp(-rect.top / total, 0, 1) : 0
}
const frame = () => {
  measure()
  // lissage façon « beurre » vers la valeur cible
  dispP.value += (rawP.value - dispP.value) * 0.09
  loop = requestAnimationFrame(frame)
}
const onResize = () => {
  wide.value = window.innerWidth >= 1024
}

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

// Transform de l'avatar : il tourne dans tous les sens + scale au fil du scroll
const avatarStyle = computed(() => {
  if (!interactive.value) return {}
  const p = dispP.value
  const rotY = Math.sin(p * Math.PI * 2) * 26
  const rotX = Math.sin(p * Math.PI) * -5
  const scale = 1.12 - p * 0.16
  const tx = Math.sin(p * Math.PI * 2) * -12
  return {
    transform: `perspective(900px) translateX(${tx}px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(${scale})`,
  }
})

// Le regard suit la carte active
const look = computed(() => {
  if (!interactive.value) return { x: 0, y: 1 }
  const idx = clamp(Math.floor(dispP.value * N), 0, N - 1)
  return { x: cards[idx].side === 'left' ? -4 : 4, y: 2 }
})

// Apparition séquentielle des cartes
const cardStyle = (i) => {
  if (!interactive.value) return {}
  const t = 0.12 + i * 0.16
  const o = ease(clamp((dispP.value - t) / 0.1, 0, 1))
  const dir = cards[i].side === 'left' ? -1 : 1
  return {
    opacity: o,
    transform: `translate3d(${(1 - o) * 50 * dir}px, ${(1 - o) * 22}px, 0)`,
  }
}

const introStyle = computed(() => {
  if (!interactive.value) return {}
  return { opacity: 1 - ease(clamp(dispP.value / 0.12, 0, 1)) }
})
</script>

<template>
  <section
    ref="root"
    id="intro"
    class="relative"
    :style="{ height: interactive ? '360vh' : 'auto' }"
  >
    <div
      class="overflow-hidden"
      :class="interactive ? 'sticky top-0 flex h-screen items-center' : 'py-24'"
    >
      <div class="container-pr relative w-full">
        <!-- Ligne d'intro qui s'efface -->
        <p
          v-if="interactive"
          class="absolute left-1/2 top-6 -translate-x-1/2 text-center text-sm font-medium uppercase tracking-[0.25em] text-white/45"
          :style="introStyle"
        >
          Enchanté — moi c'est Pierre
        </p>

        <!-- Avatar central -->
        <div
          class="relative mx-auto"
          :class="interactive ? 'w-[clamp(18rem,30vw,26rem)]' : 'w-72'"
        >
          <div class="will-change-transform" :style="avatarStyle">
            <div class="animate-avatar-bob">
              <AvatarFigure :look="look" class="aspect-[220/280]" />
            </div>
          </div>
        </div>

        <!-- Cartes de parcours révélées -->
        <template v-if="interactive">
          <article
            v-for="(c, i) in cards"
            :key="c.title"
            class="glass absolute w-72 rounded-3xl p-5 will-change-transform"
            :class="c.side === 'left' ? 'left-[3%]' : 'right-[3%]'"
            :style="[{ top: c.top }, cardStyle(i)]"
          >
            <p
              class="mb-1 text-xs font-medium uppercase tracking-[0.2em] accent-gradient"
            >
              {{ c.eyebrow }}
            </p>
            <h3 class="text-lg font-semibold text-white">{{ c.title }}</h3>
            <p class="mt-1 text-sm text-white/55">{{ c.text }}</p>
          </article>
        </template>

        <!-- Fallback mobile / reduced-motion : cartes empilées -->
        <div
          v-else
          class="mx-auto mt-12 grid max-w-2xl gap-4 sm:grid-cols-2"
        >
          <article
            v-for="c in cards"
            :key="c.title"
            v-reveal="{ variant: 'scale' }"
            class="glass rounded-3xl p-5"
          >
            <p
              class="mb-1 text-xs font-medium uppercase tracking-[0.2em] accent-gradient"
            >
              {{ c.eyebrow }}
            </p>
            <h3 class="text-lg font-semibold text-white">{{ c.title }}</h3>
            <p class="mt-1 text-sm text-white/55">{{ c.text }}</p>
          </article>
        </div>

        <!-- indice de scroll -->
        <div
          v-if="interactive"
          class="absolute inset-x-0 bottom-4 flex justify-center"
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
