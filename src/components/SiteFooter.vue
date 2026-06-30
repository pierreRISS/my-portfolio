<script setup>
import { profile } from '../data/content.js'
import Mascot from './Mascot.vue'
const year = new Date().getFullYear()
</script>

<template>
  <footer class="relative border-t border-white/5 py-10">
    <!-- Mascotte assise sur la bordure -->
    <div
      class="pointer-events-none absolute left-1/2 top-0 z-20 hidden w-[4.2rem] aspect-[120/175] -translate-x-1/2 -translate-y-[70%] sm:block"
    >
      <Mascot />
    </div>
    <div
      class="container-pr flex flex-col items-center justify-between gap-4 text-sm text-white/40 sm:flex-row"
    >
      <p>© {{ year }} Pierre Riss. Conçu avec Vue, Vite & Tailwind.</p>
      <div class="flex items-center gap-5">
        <a
          :href="`mailto:${profile.email}`"
          class="transition-colors hover:text-white/80"
          >Email</a
        >
        <a
          v-if="profile.github"
          :href="profile.github"
          target="_blank"
          rel="noopener"
          class="transition-colors hover:text-white/80"
          >GitHub</a
        >
        <a
          v-if="profile.linkedin"
          :href="profile.linkedin"
          target="_blank"
          rel="noopener"
          class="transition-colors hover:text-white/80"
          >LinkedIn</a
        >
        <a href="#top" class="transition-colors hover:text-white/80">Haut ↑</a>
      </div>
    </div>
  </footer>
</template>
