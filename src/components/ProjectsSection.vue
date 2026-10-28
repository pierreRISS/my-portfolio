<script setup>
import { featuredProject as f, projects, otherProjects } from '../data/content.js'
import { assetUrl } from '../utils/asset.js'
import SectionHeading from './SectionHeading.vue'
import AppIcon from './AppIcon.vue'
</script>

<template>
  <section id="projects" class="scroll-mt-16 pb-20 lg:scroll-mt-24">
    <SectionHeading title="Projets" />

    <a
      :href="f.link"
      target="_blank"
      rel="noopener"
      class="group mb-14 block overflow-hidden rounded-lg border border-line bg-white transition-colors hover:border-line-strong"
    >
      <div class="aspect-[12/5] overflow-hidden border-b border-line">
        <img
          :src="assetUrl(f.image)"
          :alt="`Capture de ${f.name}`"
          class="h-full w-full object-cover object-left-top"
        />
      </div>
      <div class="p-5">
        <h3 class="flex flex-wrap items-baseline gap-x-3 font-medium text-ink">
          {{ f.name }}
          <span class="font-mono text-xs font-normal text-muted">{{ f.context }}</span>
          <span
            class="ml-auto inline-flex items-center gap-1 text-xs font-medium text-ink group-hover:text-accent"
            >{{ f.linkLabel }} <AppIcon name="external" class="h-3.5 w-3.5"
          /></span>
        </h3>
        <p class="mt-2 text-sm leading-relaxed text-ink/80">{{ f.blurb }}</p>
        <div class="mt-3 flex flex-wrap gap-1.5">
          <span
            v-for="t in f.tags"
            :key="t"
            class="rounded border border-line px-2 py-0.5 font-mono text-[11px] text-muted"
            >{{ t }}</span
          >
        </div>
      </div>
    </a>

    <ul class="space-y-10">
      <li
        v-for="p in projects"
        :key="p.name"
        class="grid gap-4 sm:grid-cols-[9rem_1fr] sm:gap-6"
      >
        <div
          class="aspect-[16/10] overflow-hidden rounded-md border border-line bg-surface sm:mt-1"
        >
          <img
            :src="assetUrl(p.image)"
            :alt="`Aperçu de ${p.name}`"
            loading="lazy"
            class="h-full w-full"
            :class="p.imageFit === 'contain' ? 'object-contain' : 'object-cover'"
          />
        </div>

        <div>
          <h3 class="flex flex-wrap items-baseline gap-x-3 font-medium text-ink">
            {{ p.name }}
            <span class="font-mono text-xs font-normal text-muted">{{ p.context }}</span>
          </h3>
          <p class="mt-2 text-sm leading-relaxed text-ink/80">{{ p.blurb }}</p>

          <div class="mt-3 flex flex-wrap items-center gap-1.5">
            <span
              v-for="t in p.tags"
              :key="t"
              class="rounded border border-line px-2 py-0.5 font-mono text-[11px] text-muted"
              >{{ t }}</span
            >
            <a
              v-if="p.link"
              :href="p.link"
              target="_blank"
              rel="noopener"
              class="ml-2 inline-flex items-center gap-1 text-xs font-medium text-ink hover:text-accent"
              >Voir <AppIcon name="external" class="h-3.5 w-3.5"
            /></a>
            <a
              v-if="p.repo"
              :href="p.repo"
              target="_blank"
              rel="noopener"
              class="ml-2 inline-flex items-center gap-1 text-xs font-medium text-ink hover:text-accent"
              ><AppIcon name="github" class="h-3.5 w-3.5" /> Code</a
            >
          </div>
        </div>
      </li>
    </ul>

    <h3 class="mt-14 mb-4 text-sm font-medium text-ink">Autres projets</h3>
    <ul class="divide-y divide-line border-y border-line">
      <li
        v-for="p in otherProjects"
        :key="p.name"
        class="grid gap-1 py-3.5 text-sm sm:grid-cols-[9rem_1fr] sm:gap-6"
      >
        <p class="font-medium text-ink">
          {{ p.name }}
          <span class="block font-mono text-[11px] font-normal text-muted">{{ p.meta }}</span>
        </p>
        <p class="leading-relaxed text-ink/80">{{ p.blurb }}</p>
      </li>
    </ul>
  </section>
</template>
