<script setup>
import { skills } from '../data/content.js'
import SectionHeading from './SectionHeading.vue'
import AppIcon from './AppIcon.vue'
</script>

<template>
  <section id="skills" class="relative py-28 sm:py-36">
    <div class="container-pr">
      <SectionHeading eyebrow="Compétences" title="La boîte à outils.">
        <p class="text-lg text-ink/55">
          Un éventail qui va du système au front-end, avec un fort intérêt pour
          l'IA et la donnée.
        </p>
      </SectionHeading>

      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="(group, i) in skills"
          :key="group.label"
          v-reveal="{ variant: 'cine', delay: i * 120 }"
          v-tilt="{ max: 8 }"
          class="group relative rounded-3xl border border-ink/5 bg-white p-6 shadow-[0_10px_40px_-14px_rgba(22,22,29,0.15)] transition-all duration-500 ease-out hover:-translate-y-1.5 hover:border-ink/10 hover:shadow-[0_24px_55px_-14px_rgba(22,22,29,0.22)]"
        >
          <div
            class="mb-5 grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-accent/25 to-accent-2/20 text-ink"
          >
            <AppIcon :name="group.icon" class="h-5 w-5" />
          </div>
          <h3 class="text-lg font-medium text-ink/90">{{ group.label }}</h3>
          <div class="mt-4 flex flex-wrap gap-2">
            <span
              v-for="item in group.items"
              :key="item"
              class="rounded-full border border-ink/10 bg-ink/[0.04] px-3 py-1.5 text-sm text-ink/70 transition-colors group-hover:border-ink/15"
              >{{ item }}</span
            >
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
