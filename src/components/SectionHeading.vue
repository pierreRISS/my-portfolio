<script setup>
defineProps({
  eyebrow: String,
  title: String,
})
</script>

<template>
  <div v-reveal class="mb-14 max-w-2xl">
    <p
      v-if="eyebrow"
      class="mb-3 text-sm font-medium uppercase tracking-[0.2em] accent-gradient"
    >
      {{ eyebrow }}
    </p>
    <h2 class="text-4xl font-semibold tracking-tight text-gradient sm:text-5xl">
      {{ title }}
    </h2>
    <div class="heading-bar mt-5 h-1 w-20 rounded-full bg-gradient-to-r from-accent to-accent-2" />
    <div class="mt-6"><slot /></div>
  </div>
</template>
