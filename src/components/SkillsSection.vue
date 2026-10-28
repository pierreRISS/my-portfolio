<script setup>
import { skills } from '../data/content.js'
import SectionHeading from './SectionHeading.vue'
</script>

<template>
  <section id="skills" class="scroll-mt-16 pb-20 lg:scroll-mt-24">
    <SectionHeading title="Compétences" />

    <dl class="space-y-4">
      <div
        v-for="g in skills"
        :key="g.label"
        class="grid gap-1 text-sm sm:grid-cols-[9rem_1fr] sm:gap-6"
      >
        <dt class="font-medium text-ink">{{ g.label }}</dt>
        <dd class="leading-relaxed text-ink/80">{{ g.items.join(' · ') }}</dd>
      </div>
    </dl>
  </section>
</template>
