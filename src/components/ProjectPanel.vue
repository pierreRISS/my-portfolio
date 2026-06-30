<script setup>
import { onMounted, onUnmounted, ref, computed } from 'vue'
import AppIcon from './AppIcon.vue'

const props = defineProps({
  project: { type: Object, required: true },
  index: { type: Number, required: true },
})

const root = ref(null)
const progress = ref(0)

const reduced =
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

const flip = computed(() => props.index % 2 === 1)

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
    let p = -rect.top / total
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
// ramp from a→b mapped to 0→1
const ramp = (p, a, b) => clamp((p - a) / (b - a), 0, 1)
const ease = (t) => 1 - Math.pow(1 - t, 3) // easeOutCubic

// Image : zoom continu + léger parallax vertical
const imgStyle = computed(() => {
  if (reduced) return {}
  const p = progress.value
  const scale = 1.08 + p * 0.16
  const ty = (p - 0.5) * 36
  return { transform: `scale(${scale}) translate3d(0, ${ty}px, 0)` }
})

// Cadre : entre / sort en douceur
const frameStyle = computed(() => {
  if (reduced) return {}
  const p = progress.value
  const enter = ease(ramp(p, 0, 0.2))
  const exit = ease(ramp(p, 0.82, 1))
  const opacity = enter * (1 - exit)
  const ty = (1 - enter) * 60 - exit * 40
  const scale = 0.94 + enter * 0.06
  return {
    opacity,
    transform: `translate3d(0, ${ty}px, 0) scale(${scale})`,
  }
})

// Texte : révélation décalée
const contentStyle = computed(() => {
  if (reduced) return {}
  const p = progress.value
  const enter = ease(ramp(p, 0.08, 0.32))
  const exit = ease(ramp(p, 0.82, 1))
  const opacity = enter * (1 - exit)
  const ty = (1 - enter) * 50 - exit * 30
  return { opacity, transform: `translate3d(0, ${ty}px, 0)` }
})

// Numéro fantôme géant
const numStyle = computed(() => {
  if (reduced) return {}
  const p = progress.value
  const ty = (0.5 - p) * 120
  const opacity = 0.04 + ease(ramp(p, 0, 0.25)) * 0.05
  return { transform: `translate3d(0, ${ty}px, 0)`, opacity }
})
</script>

<template>
  <section
    ref="root"
    class="relative"
    :style="{ height: reduced ? 'auto' : '220vh' }"
  >
    <div
      class="flex flex-col justify-center overflow-hidden"
      :class="reduced ? 'py-20' : 'sticky top-0 h-screen'"
    >
      <!-- Numéro fantôme -->
      <span
        class="pointer-events-none absolute -top-4 left-2 select-none text-[26vw] font-bold leading-none text-white sm:left-6"
        :style="numStyle"
        aria-hidden="true"
        >{{ String(index + 1).padStart(2, '0') }}</span
      >

      <div class="container-pr relative">
        <div
          class="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
          :class="flip ? 'lg:[direction:rtl]' : ''"
        >
          <!-- Visuel -->
          <div
            class="relative [direction:ltr]"
            :style="frameStyle"
          >
            <div
              class="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br shadow-2xl shadow-black/40"
              :class="
                project.imageFit === 'contain'
                  ? 'aspect-[4/3] from-white/[0.06] to-black/40'
                  : `aspect-[4/3] ${project.accent}`
              "
            >
              <img
                v-if="project.image"
                :src="project.image"
                :alt="`Aperçu de ${project.name}`"
                class="h-full w-full will-change-transform"
                :class="
                  project.imageFit === 'contain'
                    ? 'object-contain p-4'
                    : 'object-cover object-top'
                "
                :style="imgStyle"
              />
              <div
                class="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10"
              />
              <span
                v-if="project.status"
                class="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-black/50 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur"
              >
                <span class="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                {{ project.status }}
              </span>
            </div>
          </div>

          <!-- Texte -->
          <div class="relative [direction:ltr]" :style="contentStyle">
            <p
              class="mb-4 text-sm font-medium uppercase tracking-[0.2em] accent-gradient"
            >
              {{ project.year }}
            </p>
            <h3
              class="text-4xl font-semibold tracking-tight text-gradient sm:text-5xl lg:text-6xl"
            >
              {{ project.name }}
            </h3>
            <p class="mt-6 max-w-xl text-lg text-white/65">
              {{ project.blurb }}
            </p>

            <ul class="mt-6 space-y-2.5">
              <li
                v-for="d in project.details"
                :key="d"
                class="flex gap-2.5 text-white/55"
              >
                <span class="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent-2" />
                {{ d }}
              </li>
            </ul>

            <div class="mt-7 flex flex-wrap gap-2">
              <span
                v-for="t in project.tags"
                :key="t"
                class="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/65"
                >{{ t }}</span
              >
            </div>

            <div class="mt-8 flex items-center gap-3">
              <a
                v-if="project.link"
                :href="project.link"
                target="_blank"
                rel="noopener"
                class="inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-ink transition-transform hover:scale-[1.03]"
              >
                Découvrir <AppIcon name="arrow" class="h-4 w-4" />
              </a>
              <a
                v-if="project.repo"
                :href="project.repo"
                target="_blank"
                rel="noopener"
                class="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-5 py-2.5 text-sm text-white/80 transition-colors hover:bg-white/5"
              >
                <AppIcon name="github" class="h-4 w-4" /> Code
              </a>
              <span
                v-if="!project.link && !project.repo"
                class="text-sm text-white/35"
                >Lien à venir</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
