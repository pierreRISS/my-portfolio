<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { profile, availability, highlights } from '../data/content.js'
import AppIcon from './AppIcon.vue'
import { assetUrl } from '../utils/asset.js'

const links = [
  { id: 'experience', label: 'Expériences' },
  { id: 'projects', label: 'Projets' },
  { id: 'skills', label: 'Compétences' },
  { id: 'about', label: 'Parcours' },
]

// Section visible au centre de l'écran → lien actif dans la navigation
const active = ref('experience')
let observer = null

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      for (const e of entries) if (e.isIntersecting) active.value = e.target.id
    },
    { rootMargin: '-35% 0px -60% 0px' },
  )
  for (const l of links) {
    const el = document.getElementById(l.id)
    if (el) observer.observe(el)
  }
})
onUnmounted(() => observer?.disconnect())

const copied = ref(false)
let timer = null
const copyEmail = async () => {
  try {
    await navigator.clipboard.writeText(profile.email)
    copied.value = true
    clearTimeout(timer)
    timer = setTimeout(() => (copied.value = false), 1600)
  } catch {
    window.location.href = `mailto:${profile.email}`
  }
}
onUnmounted(() => clearTimeout(timer))
</script>

<template>
  <header
    class="flex flex-col pt-16 pb-12 lg:sticky lg:top-0 lg:h-screen lg:w-[42%] lg:shrink-0 lg:overflow-y-auto lg:border-r lg:border-line lg:py-16 lg:pr-14 [scrollbar-width:none]"
  >
    <div>
      <img
        v-if="profile.photo"
        :src="assetUrl(profile.photo)"
        :alt="profile.name"
        class="mb-6 h-20 w-20 rounded-full border border-line object-cover"
      />
      <h1 class="text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
        {{ profile.name }}
      </h1>
      <p class="mt-3 text-lg font-medium text-ink/80">{{ profile.title }}</p>
      <p class="mt-1 text-sm text-muted">
        {{ profile.school }} · {{ profile.location }}
      </p>
      <p class="mt-5 max-w-sm leading-relaxed text-muted">{{ profile.pitch }}</p>
      <p class="mt-3 max-w-sm text-sm leading-relaxed text-muted">{{ profile.aside }}</p>

      <div class="mt-6 max-w-sm rounded-lg border border-line bg-surface p-4">
        <p class="flex items-center gap-2 text-sm font-medium text-ink">
          <span class="h-2 w-2 rounded-full bg-emerald-500" />
          {{ availability.label }}
        </p>
        <p class="mt-1.5 text-sm text-ink/80">{{ availability.period }}</p>
        <p class="mt-0.5 text-sm text-muted">{{ availability.detail }}</p>
      </div>

      <dl class="mt-6 flex max-w-sm gap-6">
        <div v-for="h in highlights" :key="h.label">
          <dt class="sr-only">{{ h.label }}</dt>
          <dd class="text-xl font-semibold text-ink">{{ h.value }}</dd>
          <dd class="mt-0.5 text-xs leading-snug text-muted">{{ h.label }}</dd>
        </div>
      </dl>

      <div class="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm">
        <button
          type="button"
          class="inline-flex items-center gap-2 rounded-md bg-ink px-3.5 py-2 font-medium text-bg transition-opacity hover:opacity-85"
          :title="profile.email"
          @click="copyEmail"
        >
          <AppIcon :name="copied ? 'check' : 'mail'" class="h-4 w-4" />
          {{ copied ? 'Email copié' : 'Copier mon email' }}
        </button>
        <a
          :href="profile.github"
          target="_blank"
          rel="noopener"
          class="inline-flex items-center gap-1.5 text-muted transition-colors hover:text-ink"
        >
          <AppIcon name="github" class="h-4 w-4" /> GitHub
        </a>
        <a
          :href="profile.linkedin"
          target="_blank"
          rel="noopener"
          class="inline-flex items-center gap-1.5 text-muted transition-colors hover:text-ink"
        >
          <AppIcon name="linkedin" class="h-4 w-4" /> LinkedIn
        </a>
      </div>

      <nav class="mt-8 hidden lg:block" aria-label="Sections">
        <ul>
          <li v-for="l in links" :key="l.id">
            <a
              :href="`#${l.id}`"
              class="group flex items-center gap-3 py-1.5 text-sm transition-colors"
              :class="active === l.id ? 'text-ink' : 'text-muted hover:text-ink'"
            >
              <span
                class="h-px transition-all duration-300"
                :class="
                  active === l.id
                    ? 'w-12 bg-ink'
                    : 'w-6 bg-line-strong group-hover:w-12 group-hover:bg-ink'
                "
              />
              {{ l.label }}
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>
