<script setup>
import { profile } from '../data/content.js'
</script>

<template>
  <footer id="contact" class="border-t border-line pt-10 text-sm">
    <p class="text-ink">Un stage, une mission, une question ?</p>
    <p class="mt-2 leading-relaxed text-muted">
      Écris-moi à
      <a
        :href="`mailto:${profile.email}`"
        class="text-ink underline decoration-line-strong underline-offset-4 hover:decoration-ink"
        >{{ profile.email }}</a
      >
      ou appelle le
      <a
        :href="`tel:${profile.phoneHref}`"
        class="whitespace-nowrap text-ink underline decoration-line-strong underline-offset-4 hover:decoration-ink"
        >{{ profile.phone }}</a
      >.
    </p>
    <p class="mt-10 font-mono text-xs text-muted">
      © {{ new Date().getFullYear() }} {{ profile.name }} · Vue 3, Vite, Tailwind CSS
    </p>
  </footer>
</template>
