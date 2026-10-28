<script setup>
import { education, languages, involvement, interests } from '../data/content.js'
import SectionHeading from './SectionHeading.vue'
</script>

<template>
  <section id="about" class="scroll-mt-16 pb-20 lg:scroll-mt-24">
    <SectionHeading title="Parcours" />

    <dl class="space-y-8 text-sm">
      <div class="grid gap-2 sm:grid-cols-[9rem_1fr] sm:gap-6">
        <dt class="font-medium text-ink">Formation</dt>
        <dd class="space-y-3">
          <p v-for="e in education" :key="e.school" class="leading-relaxed">
            <span class="text-ink">{{ e.school }}</span>
            <span v-if="e.period" class="font-mono text-xs text-muted"> · {{ e.period }}</span>
            <span class="block text-ink/70">{{ e.detail }}</span>
          </p>
        </dd>
      </div>

      <div class="grid gap-2 sm:grid-cols-[9rem_1fr] sm:gap-6">
        <dt class="font-medium text-ink">Langues</dt>
        <dd class="space-y-1.5">
          <p v-for="l in languages" :key="l.name" class="leading-relaxed">
            <span class="text-ink">{{ l.name }}</span>
            <span class="text-ink/70"> · {{ l.level }}</span>
          </p>
        </dd>
      </div>

      <div class="grid gap-2 sm:grid-cols-[9rem_1fr] sm:gap-6">
        <dt class="font-medium text-ink">Engagement</dt>
        <dd class="space-y-3">
          <p v-for="i in involvement" :key="i.name" class="leading-relaxed">
            <span class="text-ink">{{ i.name }}</span>
            <span class="block text-ink/70">{{ i.detail }}</span>
          </p>
        </dd>
      </div>

      <div class="grid gap-2 sm:grid-cols-[9rem_1fr] sm:gap-6">
        <dt class="font-medium text-ink">Hors code</dt>
        <dd class="leading-relaxed text-ink/70">{{ interests.join(' · ') }}</dd>
      </div>
    </dl>
  </section>
</template>
