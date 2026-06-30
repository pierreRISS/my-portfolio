<script setup>
import { computed } from 'vue'
import { projects } from '../data/content.js'
import SectionHeading from './SectionHeading.vue'
import ProjectPanel from './ProjectPanel.vue'
import AppIcon from './AppIcon.vue'
import AmbientShapes from './AmbientShapes.vue'

const featured = computed(() => projects.filter((p) => p.featured))
const others = computed(() => projects.filter((p) => !p.featured))
</script>

<template>
  <section id="projects" class="relative py-28 sm:py-36">
    <AmbientShapes />
    <div class="container-pr">
      <SectionHeading eyebrow="Projets" title="Ce que je construis.">
        <p class="text-lg text-white/55">
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
        class="mb-10 text-sm font-medium uppercase tracking-[0.2em] text-white/40"
      >
        Autres projets
      </p>

      <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="(p, i) in others"
          :key="p.name"
          v-reveal="{ variant: 'scale', delay: i * 70 }"
          v-tilt="{ max: 6, scale: 1.01 }"
          class="glass group relative flex flex-col overflow-hidden rounded-3xl p-6 hover:border-white/20"
        >
          <div
            class="relative mb-5 h-40 overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-br"
            :class="p.accent"
          >
            <img
              v-if="p.image"
              :src="p.image"
              :alt="`Aperçu de ${p.name}`"
              loading="lazy"
              class="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.05]"
            />
            <span
              class="absolute right-3 top-3 rounded-full bg-black/40 px-2.5 py-0.5 text-xs font-medium text-white/85 backdrop-blur"
              >{{ p.year }}</span
            >
          </div>

          <h3 class="text-xl font-semibold tracking-tight text-white">
            {{ p.name }}
          </h3>
          <p class="mt-2 text-sm leading-relaxed text-white/55">{{ p.blurb }}</p>

          <div class="mt-4 flex flex-wrap gap-1.5">
            <span
              v-for="t in p.tags"
              :key="t"
              class="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-0.5 text-xs text-white/60"
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
              class="inline-flex items-center gap-1.5 text-sm font-medium text-white/85 hover:text-white"
            >
              Découvrir <AppIcon name="arrow" class="h-4 w-4" />
            </a>
            <a
              v-if="p.repo"
              :href="p.repo"
              target="_blank"
              rel="noopener"
              class="inline-flex items-center gap-1.5 text-sm text-white/70 hover:text-white"
            >
              <AppIcon name="github" class="h-4 w-4" /> Code
            </a>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
