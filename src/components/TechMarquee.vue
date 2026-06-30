<script setup>
const techs = [
  'C',
  'C++',
  'Python',
  'PyTorch',
  'FastAPI',
  'PostgreSQL',
  'Vue 3',
  'Vite',
  'Tailwind CSS',
  'Machine Learning',
  'Git',
  'Linux',
]
</script>

<template>
  <section class="relative overflow-hidden border-y border-white/5 py-7">
    <div
      class="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-ink to-transparent"
    />
    <div
      class="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-ink to-transparent"
    />

    <div class="marquee flex w-max gap-4">
      <div v-for="n in 2" :key="n" class="flex shrink-0 gap-4">
        <span
          v-for="t in techs"
          :key="t + n"
          class="flex items-center gap-4 whitespace-nowrap text-2xl font-medium text-white/30 transition-colors hover:text-white/70 sm:text-3xl"
        >
          {{ t }}
          <span class="text-accent-2/60">•</span>
        </span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.marquee {
  animation: scroll-x 32s linear infinite;
}
.marquee:hover {
  animation-play-state: paused;
}
@keyframes scroll-x {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}
@media (prefers-reduced-motion: reduce) {
  .marquee {
    animation: none;
  }
}
</style>
