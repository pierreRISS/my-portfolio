<script setup>
import { projects } from '../data/content.js'
import SectionHeading from './SectionHeading.vue'
import AppIcon from './AppIcon.vue'
</script>

<template>
  <section id="projects" class="py-28 sm:py-36">
    <div class="container-pr">
      <SectionHeading eyebrow="Projets" title="Ce que je construis.">
        <p class="text-lg text-white/55">
          Des produits réels mis en ligne, des missions freelance et des projets
          d'école — de l'IA aux systèmes bas niveau.
        </p>
      </SectionHeading>

      <div class="grid gap-5 lg:grid-cols-2">
        <article
          v-for="(p, i) in projects"
          :key="p.name"
          v-reveal="{ variant: i % 2 ? 'right' : 'left', delay: 60 }"
          v-tilt="{ max: 6, scale: 1.01 }"
          class="glass group relative flex flex-col overflow-hidden rounded-4xl p-7 hover:border-white/20"
        >
          <!-- Visual header : image réelle ou placeholder -->
          <div
            class="relative mb-6 overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-br"
            :class="[
              p.image && p.imageFit === 'contain'
                ? 'h-72 from-white/[0.06] to-black/30'
                : `h-48 ${p.accent}`,
            ]"
          >
            <!-- Image -->
            <img
              v-if="p.image"
              :src="p.image"
              :alt="`Aperçu de ${p.name}`"
              loading="lazy"
              class="h-full w-full transition-transform duration-700 group-hover:scale-[1.04]"
              :class="
                p.imageFit === 'contain'
                  ? 'object-contain p-3'
                  : 'object-cover object-top'
              "
            />
            <!-- Placeholder si pas d'image -->
            <template v-else>
              <div
                class="absolute inset-0 grid place-items-center opacity-40 [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:22px_22px]"
              />
              <span
                class="absolute inset-0 grid place-items-center text-sm font-medium uppercase tracking-widest text-white/50"
                >Aperçu à venir</span
              >
            </template>

            <!-- Année -->
            <span
              class="absolute right-4 top-4 rounded-full bg-black/40 px-3 py-1 text-xs font-medium text-white/85 backdrop-blur"
              >{{ p.year }}</span
            >
            <!-- Statut -->
            <span
              v-if="p.status"
              class="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-black/45 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur"
            >
              <span class="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              {{ p.status }}
            </span>
          </div>

          <h3 class="text-2xl font-semibold tracking-tight text-white">
            {{ p.name }}
          </h3>
          <p class="mt-3 text-white/65">{{ p.blurb }}</p>

          <ul class="mt-4 space-y-2">
            <li
              v-for="d in p.details"
              :key="d"
              class="flex gap-2.5 text-sm leading-relaxed text-white/50"
            >
              <span class="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-2" />
              {{ d }}
            </li>
          </ul>

          <div class="mt-6 flex flex-wrap gap-2">
            <span
              v-for="t in p.tags"
              :key="t"
              class="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/65"
              >{{ t }}</span
            >
          </div>

          <div class="mt-7 flex items-center gap-3 pt-1">
            <a
              v-if="p.link"
              :href="p.link"
              target="_blank"
              rel="noopener"
              class="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-medium text-ink transition-transform hover:scale-[1.03]"
            >
              Découvrir <AppIcon name="arrow" class="h-4 w-4" />
            </a>
            <a
              v-if="p.repo"
              :href="p.repo"
              target="_blank"
              rel="noopener"
              class="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-2 text-sm text-white/80 transition-colors hover:bg-white/5"
            >
              <AppIcon name="github" class="h-4 w-4" /> Code
            </a>
            <span
              v-if="!p.link && !p.repo"
              class="text-sm text-white/35"
              >Liens à venir</span
            >
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
