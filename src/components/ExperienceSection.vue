<script setup>
import { experiences } from '../data/content.js'
import SectionHeading from './SectionHeading.vue'
import AmbientShapes from './AmbientShapes.vue'
import Mascot from './Mascot.vue'
</script>

<template>
  <section id="experience" class="relative overflow-hidden py-28 sm:py-36">
    <AmbientShapes />
    <div class="container-pr">
      <SectionHeading eyebrow="Parcours" title="Expériences." />

      <div class="relative">
        <!-- vertical line -->
        <div
          class="absolute left-0 top-2 hidden h-full w-px bg-gradient-to-b from-accent/50 via-white/10 to-transparent sm:left-[7.5rem] sm:block"
        />
        <!-- Mascotte assise sur le coin -->
        <div
          class="pointer-events-none absolute right-6 top-0 z-20 hidden w-[4.5rem] aspect-[120/175] -translate-y-[66%] sm:block"
        >
          <Mascot />
        </div>

        <div class="space-y-4">
          <article
            v-for="(exp, i) in experiences"
            :key="exp.role"
            v-reveal="{ delay: i * 80 }"
            class="relative sm:pl-44"
          >
            <div
              class="absolute left-[7.5rem] top-7 hidden h-3 w-3 -translate-x-1/2 rounded-full border-2 border-accent bg-ink sm:block"
            />
            <div
              class="absolute left-0 top-6 hidden text-sm text-white/40 sm:block sm:w-28 sm:text-right"
            >
              {{ exp.period }}
            </div>

            <div
              class="glass rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 sm:p-7"
            >
              <div class="flex flex-wrap items-center gap-3">
                <h3 class="text-xl font-semibold text-white">{{ exp.role }}</h3>
                <span
                  class="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs text-white/60"
                  >{{ exp.type }}</span
                >
              </div>
              <p class="mt-1 accent-gradient font-medium">{{ exp.company }}</p>
              <p class="mt-1 text-sm text-white/40 sm:hidden">{{ exp.period }}</p>

              <ul class="mt-4 space-y-2.5">
                <li
                  v-for="pt in exp.points"
                  :key="pt"
                  class="flex gap-2.5 text-white/60"
                >
                  <span class="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent-2" />
                  {{ pt }}
                </li>
              </ul>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>
