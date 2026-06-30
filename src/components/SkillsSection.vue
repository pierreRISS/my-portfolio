<script setup>
import { skills } from '../data/content.js'
import SectionHeading from './SectionHeading.vue'
import AppIcon from './AppIcon.vue'
import AmbientShapes from './AmbientShapes.vue'
</script>

<template>
  <section id="skills" class="relative overflow-hidden py-28 sm:py-36">
    <AmbientShapes />
    <div class="container-pr">
      <SectionHeading eyebrow="Compétences" title="La boîte à outils.">
        <p class="text-lg text-white/55">
          Un éventail qui va du système au front-end, avec un fort intérêt pour
          l'IA et la donnée.
        </p>
      </SectionHeading>

      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="(group, i) in skills"
          :key="group.label"
          v-reveal="{ variant: 'scale', delay: i * 70 }"
          v-tilt="{ max: 8 }"
          class="glass group relative rounded-3xl p-6 hover:border-white/20"
        >
          <div
            class="mb-5 grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-accent/25 to-accent-2/20 text-white"
          >
            <AppIcon :name="group.icon" class="h-5 w-5" />
          </div>
          <h3 class="text-lg font-medium text-white/90">{{ group.label }}</h3>
          <div class="mt-4 flex flex-wrap gap-2">
            <span
              v-for="item in group.items"
              :key="item"
              class="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-sm text-white/70 transition-colors group-hover:border-white/15"
              >{{ item }}</span
            >
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
