<script setup>
// Decorative floating shapes for section backgrounds. Pure eye-candy.
const shapes = [
  { cls: 'left-[6%] top-[18%] h-3 w-3 rounded-full bg-accent/40', d: '0s', dur: '7s' },
  { cls: 'right-[10%] top-[12%] h-2 w-2 rounded-full bg-accent-2/50', d: '-2s', dur: '9s' },
  { cls: 'left-[14%] bottom-[16%] h-2.5 w-2.5 rotate-45 bg-accent-2/30', d: '-4s', dur: '8s' },
  { cls: 'right-[16%] bottom-[22%] h-4 w-4 rounded-full border border-white/15', d: '-1s', dur: '11s' },
  { cls: 'left-[48%] top-[8%] h-1.5 w-1.5 rounded-full bg-white/40', d: '-3s', dur: '6s' },
]
</script>

<template>
  <div class="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
    <span
      v-for="(s, i) in shapes"
      :key="i"
      class="absolute animate-float-slow"
      :class="s.cls"
      :style="{ animationDelay: s.d, animationDuration: s.dur }"
    />
  </div>
</template>
