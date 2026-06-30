<script setup>
import { education, languages, hobbies } from '../data/content.js'
import SectionHeading from './SectionHeading.vue'
import Mascot from './Mascot.vue'
</script>

<template>
  <section class="py-28 sm:py-36">
    <div class="container-pr grid gap-12 lg:grid-cols-2">
      <!-- Education -->
      <div>
        <SectionHeading eyebrow="Formations" title="Mon parcours." />
        <div class="relative space-y-4">
          <!-- Mascotte assise sur le coin -->
          <div
            class="pointer-events-none absolute right-6 top-0 z-20 hidden w-[4.2rem] aspect-[120/175] -translate-y-[64%] sm:block"
          >
            <Mascot flip />
          </div>
          <div
            v-for="(ed, i) in education"
            :key="ed.school"
            v-reveal="{ delay: i * 80 }"
            class="glass rounded-3xl p-6"
          >
            <div class="flex items-baseline justify-between gap-4">
              <h3 class="text-lg font-semibold text-white">{{ ed.school }}</h3>
              <span class="text-sm text-white/40">{{ ed.period }}</span>
            </div>
            <p class="mt-1 text-white/60">{{ ed.diploma }}</p>
          </div>
        </div>
      </div>

      <!-- Languages + hobbies -->
      <div>
        <SectionHeading eyebrow="À côté du code" title="Langues & passions." />

        <div v-reveal class="glass rounded-3xl p-6">
          <div
            v-for="lang in languages"
            :key="lang.name"
            class="mb-5 last:mb-0"
          >
            <div class="mb-2 flex items-baseline justify-between">
              <span class="font-medium text-white/90">{{ lang.name }}</span>
              <span class="text-sm text-white/45">{{ lang.level }}</span>
            </div>
            <div class="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
              <div
                class="h-full rounded-full bg-gradient-to-r from-accent to-accent-2"
                :style="{ width: lang.value + '%' }"
              />
            </div>
          </div>
        </div>

        <div v-reveal="{ delay: 120 }" class="mt-4 flex flex-wrap gap-3">
          <span
            v-for="h in hobbies"
            :key="h"
            class="glass rounded-2xl px-5 py-3 text-white/80"
            >{{ h }}</span
          >
        </div>
      </div>
    </div>
  </section>
</template>
