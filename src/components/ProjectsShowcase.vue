<script setup>
import { computed } from 'vue'
import { projects } from '../data/content.js'
import { assetUrl } from '../utils/asset.js'
import SectionHeading from './SectionHeading.vue'
import ProjectPanel from './ProjectPanel.vue'
import AppIcon from './AppIcon.vue'

const featured = computed(() => projects.filter((p) => p.featured))
const others = computed(() => projects.filter((p) => !p.featured))
</script>

<template>
  <section id="projects" class="relative py-28 sm:py-36">
    <div class="container-pr">
      <SectionHeading eyebrow="Projets" title="Ce que je construis.">
        <p class="text-lg text-ink/55">
          Des produits réels mis en ligne, des missions freelance et des projets
          d'école — de l'IA aux systèmes bas niveau.
        </p>
      </SectionHeading>
    </div>

    <!-- Panneaux cinématiques épinglés -->
    <div class="relative">
      <ProjectPanel
        v-for="(p, i) in featured"
        :key="p.name"
        :project="p"
        :index="i"
      />
    </div>

    <!-- Autres projets -->
    <div class="container-pr mt-24">
      <p
        v-reveal
        class="mb-10 text-sm font-medium uppercase tracking-[0.2em] text-ink/40"
      >
        Autres projets
      </p>

      <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="(p, i) in others"
          :key="p.name"
          v-reveal="{ variant: 'scale', delay: i * 70 }"
          v-tilt="{ max: 6, scale: 1.01 }"
          class="glass group relative flex flex-col overflow-hidden rounded-3xl p-6 hover:border-ink/20"
        >
          <div
            class="relative mb-5 h-40 overflow-hidden rounded-2xl border border-ink/5 bg-gradient-to-br"
            :class="p.accent"
          >
            <img
              v-if="p.image"
              :src="assetUrl(p.image)"
              :alt="`Aperçu de ${p.name}`"
              loading="lazy"
              class="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.05]"
            />
            <span
              class="absolute right-3 top-3 rounded-full bg-black/40 px-2.5 py-0.5 text-xs font-medium text-bg/90 backdrop-blur"
              >{{ p.year }}</span
            >
          </div>

          <h3 class="text-xl font-semibold tracking-tight text-ink">
            {{ p.name }}
          </h3>
          <p class="mt-2 text-sm leading-relaxed text-ink/55">{{ p.blurb }}</p>

          <div class="mt-4 flex flex-wrap gap-1.5">
            <span
              v-for="t in p.tags"
              :key="t"
              class="rounded-full border border-ink/10 bg-ink/[0.03] px-2.5 py-0.5 text-xs text-ink/60"
              >{{ t }}</span
            >
          </div>

          <div
            v-if="p.link || p.repo"
            class="mt-5 flex items-center gap-3"
          >
            <a
              v-if="p.link"
              :href="p.link"
              target="_blank"
              rel="noopener"
              class="inline-flex items-center gap-1.5 text-sm font-medium text-ink/85 hover:text-ink"
            >
              Découvrir <AppIcon name="arrow" class="h-4 w-4" />
            </a>
            <a
              v-if="p.repo"
              :href="p.repo"
              target="_blank"
              rel="noopener"
              class="inline-flex items-center gap-1.5 text-sm text-ink/70 hover:text-ink"
            >
              <AppIcon name="github" class="h-4 w-4" /> Code
            </a>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
