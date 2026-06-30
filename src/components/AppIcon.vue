<script setup>
defineProps({ name: { type: String, required: true } })

// Minimal inline icon set (stroke-based, 24x24)
const paths = {
  code: ['M8 6 2 12l6 6', 'M16 6l6 6-6 6', 'M14 4l-4 16'],
  server: [
    'M3 5h18v6H3z',
    'M3 13h18v6H3z',
    'M7 8h.01',
    'M7 16h.01',
  ],
  layout: ['M3 4h18v16H3z', 'M3 9h18', 'M9 9v11'],
  brain: [
    'M12 5a3 3 0 0 0-6 0 3 3 0 0 0-1 5.8A3 3 0 0 0 8 16a3 3 0 0 0 4 1.5',
    'M12 5a3 3 0 0 1 6 0 3 3 0 0 1 1 5.8A3 3 0 0 1 16 16a3 3 0 0 1-4 1.5',
    'M12 5v14',
  ],
  tool: [
    'M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.5-.7-.7-2.5z',
  ],
  arrow: ['M5 12h14', 'M13 6l6 6-6 6'],
  github: [
    'M9 19c-5 1.5-5-2.5-7-3m14 6v-3.9a3.4 3.4 0 0 0-1-2.6c3-.3 6.2-1.5 6.2-6.8a5.3 5.3 0 0 0-1.5-3.7 5 5 0 0 0-.1-3.7s-1.2-.4-3.9 1.5a13.4 13.4 0 0 0-7 0C6 1.2 4.8 1.6 4.8 1.6a5 5 0 0 0-.1 3.7A5.3 5.3 0 0 0 3.2 9c0 5.3 3.2 6.5 6.2 6.8a3.4 3.4 0 0 0-1 2.6V22',
  ],
  mail: ['M3 5h18v14H3z', 'M3 7l9 6 9-6'],
  phone: [
    'M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.7a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.4-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.5 2.7.6a2 2 0 0 1 1.7 2z',
  ],
  pin: ['M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z', 'M12 10.5h.01'],
}
</script>

<template>
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.6"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path v-for="(d, i) in paths[name] || []" :key="i" :d="d" />
  </svg>
</template>
