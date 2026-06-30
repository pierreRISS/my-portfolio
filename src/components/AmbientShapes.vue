<script setup>
// Formes flottantes décoratives pour les fonds de section. Pur eye-candy.
// `pos` = ancrage (wrapper parallax) · `look` = forme/couleur (enfant qui flotte).
const shapes = [
  { pos: 'left-[6%] top-[18%]', look: 'h-3 w-3 rounded-full bg-accent/40', d: '0s', dur: '7s', speed: 0.25 },
  { pos: 'right-[10%] top-[12%]', look: 'h-2 w-2 rounded-full bg-accent-2/50', d: '-2s', dur: '9s', speed: -0.18 },
  { pos: 'left-[14%] bottom-[16%]', look: 'h-2.5 w-2.5 rotate-45 bg-accent-2/30', d: '-4s', dur: '8s', speed: 0.32 },
  { pos: 'right-[16%] bottom-[22%]', look: 'h-4 w-4 rounded-full border border-white/15', d: '-1s', dur: '11s', speed: -0.28 },
  { pos: 'left-[48%] top-[8%]', look: 'h-1.5 w-1.5 rounded-full bg-white/40', d: '-3s', dur: '6s', speed: 0.4 },
]
</script>

<template>
  <div class="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
    <span
      v-for="(s, i) in shapes"
      :key="i"
      v-parallax="{ speed: s.speed }"
      class="absolute"
      :class="s.pos"
    >
      <span
        class="block animate-float-slow"
        :class="s.look"
        :style="{ animationDelay: s.d, animationDuration: s.dur }"
      />
    </span>
  </div>
</template>
