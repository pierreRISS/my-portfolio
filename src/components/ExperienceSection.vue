<script setup>
import { experiences } from '../data/content.js'
import SectionHeading from './SectionHeading.vue'
import AppIcon from './AppIcon.vue'
</script>

<template>
  <section id="experience" class="scroll-mt-16 pb-20 lg:scroll-mt-24">
    <SectionHeading title="Expériences" />

    <ol class="space-y-12">
      <li
        v-for="e in experiences"
        :key="e.company"
        class="grid gap-2 sm:grid-cols-[9rem_1fr] sm:gap-6"
      >
        <p class="pt-1 font-mono text-xs text-muted">{{ e.period }}</p>

        <div>
          <h3 class="font-medium leading-snug text-ink">
            {{ e.role }} ·
            <a
              v-if="e.link"
              :href="e.link"
              target="_blank"
              rel="noopener"
              class="inline-flex items-center gap-0.5 underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-ink"
              >{{ e.company
              }}<AppIcon name="external" class="h-3.5 w-3.5" /></a>
            <span v-else>{{ e.company }}</span>
          </h3>

          <p class="mt-2 text-sm leading-relaxed text-muted">{{ e.summary }}</p>

          <ul class="mt-3 space-y-1.5 text-sm leading-relaxed text-ink/80">
            <li v-for="p in e.points" :key="p" class="flex gap-2.5">
              <span class="mt-[0.6rem] h-1 w-1 shrink-0 rounded-full bg-ink/40" />
              <span>{{ p }}</span>
            </li>
          </ul>

          <p
            v-if="e.metric"
            class="mt-3 inline-block rounded bg-accent-soft px-2 py-0.5 text-xs font-medium text-accent"
          >
            {{ e.metric }}
          </p>

          <p v-if="e.press" class="mt-2 text-sm italic text-muted">{{ e.press }}</p>

          <ul class="mt-3 flex flex-wrap gap-1.5">
            <li
              v-for="t in e.tags"
              :key="t"
              class="rounded border border-line px-2 py-0.5 font-mono text-[11px] text-muted"
            >
              {{ t }}
            </li>
          </ul>
        </div>
      </li>
    </ol>
  </section>
</template>
