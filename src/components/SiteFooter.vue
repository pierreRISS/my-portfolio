<script setup>
import { profile } from '../data/content.js'
const year = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-ink/5 py-10">
    <div
      class="container-pr flex flex-col items-center justify-between gap-4 text-sm text-ink/40 sm:flex-row"
    >
      <p>© {{ year }} Pierre Riss. Conçu avec Vue, Vite & Tailwind.</p>
      <div class="flex items-center gap-5">
        <a
          :href="`mailto:${profile.email}`"
          class="transition-colors hover:text-ink/80"
          >Email</a
        >
        <a
          v-if="profile.github"
          :href="profile.github"
          target="_blank"
          rel="noopener"
          class="transition-colors hover:text-ink/80"
          >GitHub</a
        >
        <a
          v-if="profile.linkedin"
          :href="profile.linkedin"
          target="_blank"
          rel="noopener"
          class="transition-colors hover:text-ink/80"
          >LinkedIn</a
        >
        <a href="#top" class="transition-colors hover:text-ink/80">Haut ↑</a>
      </div>
    </div>
  </footer>
</template>
