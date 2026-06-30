<script setup>
// Mascotte cartoon (chibi) en SVG : un petit Pierre développeur, cheveux bruns,
// capuche aux couleurs du thème. Pose assise « sur le bord » : il respire,
// cligne des yeux et balance les jambes (animations CSS fluides).
defineProps({
  flip: { type: Boolean, default: false }, // regarde vers la gauche si true
  look: { type: Object, default: () => ({ x: 0, y: 0 }) }, // direction du regard
})
</script>

<template>
  <svg
    viewBox="0 0 120 175"
    class="h-full w-full overflow-visible"
    :style="flip ? { transform: 'scaleX(-1)' } : null"
  >
    <defs>
      <linearGradient id="m-hood" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#6366f1" />
        <stop offset="1" stop-color="#a855f7" />
      </linearGradient>
      <linearGradient id="m-skin" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#f6cfa6" />
        <stop offset="1" stop-color="#eab184" />
      </linearGradient>
    </defs>

    <!-- ombre portée douce -->
    <ellipse cx="60" cy="160" rx="26" ry="5" fill="#000" opacity="0.18" />

    <!-- JAMBES (se balancent) -->
    <g class="animate-leg-swing">
      <rect x="47" y="120" width="11" height="38" rx="5.5" fill="#211f3d" />
      <rect x="62" y="120" width="11" height="38" rx="5.5" fill="#211f3d" />
      <!-- chaussures -->
      <rect x="43" y="152" width="17" height="9" rx="4.5" fill="#a855f7" />
      <rect x="60" y="152" width="17" height="9" rx="4.5" fill="#a855f7" />
    </g>

    <!-- HAUT DU CORPS (respire) -->
    <g class="animate-breathe">
      <!-- bras / manches -->
      <path d="M40 86 Q28 102 36 118 L46 114 Q40 102 48 90 Z" fill="url(#m-hood)" />
      <path d="M80 86 Q92 102 84 118 L74 114 Q80 102 72 90 Z" fill="url(#m-hood)" />
      <!-- mains qui agrippent le bord -->
      <circle cx="40" cy="119" r="6.5" fill="url(#m-skin)" />
      <circle cx="80" cy="119" r="6.5" fill="url(#m-skin)" />

      <!-- torse capuche -->
      <path
        d="M39 84 Q60 75 81 84 L85 120 Q60 131 35 120 Z"
        fill="url(#m-hood)"
      />
      <!-- poche + cordons -->
      <path
        d="M47 104 Q60 111 73 104"
        fill="none"
        stroke="#000"
        stroke-opacity="0.18"
        stroke-width="2.4"
        stroke-linecap="round"
      />
      <path d="M55 88 v12" stroke="#fff" stroke-opacity="0.5" stroke-width="2" stroke-linecap="round" />
      <path d="M65 88 v12" stroke="#fff" stroke-opacity="0.5" stroke-width="2" stroke-linecap="round" />
      <!-- col de la capuche -->
      <path d="M49 82 Q60 90 71 82 L69 88 Q60 94 51 88 Z" fill="#000" opacity="0.18" />

      <!-- cou -->
      <rect x="54" y="68" width="12" height="12" rx="4" fill="url(#m-skin)" />

      <!-- oreilles -->
      <circle cx="33" cy="50" r="5" fill="url(#m-skin)" />
      <circle cx="87" cy="50" r="5" fill="url(#m-skin)" />

      <!-- tête -->
      <circle cx="60" cy="47" r="28" fill="url(#m-skin)" />

      <!-- cheveux bruns courts -->
      <path
        d="M33 50 C31 22 45 11 60 11 C75 11 89 22 87 50
           C83 39 77 35 77 35 C72 25 48 25 43 35
           C43 35 37 39 33 50 Z"
        fill="#3a2616"
      />
      <path d="M55 13 q6 -4 12 0 q-6 5 -12 0 Z" fill="#3a2616" />

      <!-- sourcils -->
      <path d="M44 39 q5 -3 10 -1" stroke="#2a1a0d" stroke-width="2.4" stroke-linecap="round" fill="none" />
      <path d="M66 38 q5 -2 10 1" stroke="#2a1a0d" stroke-width="2.4" stroke-linecap="round" fill="none" />

      <!-- joues -->
      <ellipse cx="43" cy="57" rx="5.5" ry="3.2" fill="#f29c8e" opacity="0.55" />
      <ellipse cx="77" cy="57" rx="5.5" ry="3.2" fill="#f29c8e" opacity="0.55" />

      <!-- yeux (clignent + suivent le regard) -->
      <g
        :style="{
          transform: `translate(${look.x}px, ${look.y}px)`,
          transition: 'transform 0.3s ease-out',
        }"
      >
        <g class="animate-blink">
          <ellipse cx="51" cy="49" rx="4.2" ry="5.4" fill="#2a1a12" />
          <ellipse cx="69" cy="49" rx="4.2" ry="5.4" fill="#2a1a12" />
          <circle cx="52.6" cy="47" r="1.5" fill="#fff" />
          <circle cx="70.6" cy="47" r="1.5" fill="#fff" />
        </g>
      </g>

      <!-- nez + sourire -->
      <circle cx="60" cy="55" r="1.6" fill="#d99b6c" />
      <path
        d="M52 60 Q60 67 68 60"
        fill="none"
        stroke="#b5654a"
        stroke-width="2.6"
        stroke-linecap="round"
      />
    </g>
  </svg>
</template>
