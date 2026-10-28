<script setup>
defineProps({ title: { type: String, required: true } })
</script>

<template>
  <h2
    class="sticky top-0 z-10 -mx-6 mb-8 bg-bg/90 px-6 py-4 font-mono text-xs font-medium uppercase tracking-[0.18em] text-muted backdrop-blur sm:-mx-10 sm:px-10 lg:static lg:mx-0 lg:bg-transparent lg:px-0 lg:py-0 lg:backdrop-blur-none"
  >
    {{ title }}
  </h2>
</template>
