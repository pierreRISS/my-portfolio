<script setup>
// Avatar stylisé de Pierre : brun, cheveux courts, pas de lunettes, yeux
// marron, nez marqué, carrure haute. `look` déplace les pupilles (regard).
defineProps({
  look: { type: Object, default: () => ({ x: 0, y: 0 }) },
})
</script>

<template>
  <svg viewBox="0 0 220 280" fill="none" class="h-full w-full">
    <defs>
      <linearGradient id="av-skin" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#f0c19a" />
        <stop offset="1" stop-color="#e0a877" />
      </linearGradient>
      <linearGradient id="av-cloth" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#6366f1" />
        <stop offset="1" stop-color="#a855f7" />
      </linearGradient>
      <linearGradient id="av-hair" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#3a2616" />
        <stop offset="1" stop-color="#241509" />
      </linearGradient>
      <radialGradient id="av-glow" cx="0.5" cy="0.45" r="0.6">
        <stop offset="0" stop-color="rgba(99,102,241,0.45)" />
        <stop offset="1" stop-color="rgba(99,102,241,0)" />
      </radialGradient>
    </defs>

    <!-- halo -->
    <ellipse cx="110" cy="120" rx="120" ry="130" fill="url(#av-glow)" />

    <!-- épaules / haut du corps (carrure haute) -->
    <path
      d="M40 280 C44 226 74 206 110 206 C146 206 176 226 180 280 Z"
      fill="url(#av-cloth)"
    />
    <path
      d="M110 206 v74"
      stroke="rgba(255,255,255,0.18)"
      stroke-width="2"
    />
    <!-- col -->
    <path
      d="M92 206 C100 218 120 218 128 206 L124 230 H96 Z"
      fill="#0f0d1f"
      opacity="0.5"
    />

    <!-- cou -->
    <path d="M96 168 h28 v26 q-14 12 -28 0 Z" fill="url(#av-skin)" />
    <path d="M96 178 q14 10 28 0 v6 q-14 10 -28 0 Z" fill="#000" opacity="0.12" />

    <!-- oreilles -->
    <ellipse cx="60" cy="116" rx="9" ry="14" fill="url(#av-skin)" />
    <ellipse cx="160" cy="116" rx="9" ry="14" fill="url(#av-skin)" />

    <!-- tête -->
    <ellipse cx="110" cy="110" rx="54" ry="60" fill="url(#av-skin)" />
    <!-- ombre douce d'un côté (volume) -->
    <path
      d="M110 50 a54 60 0 0 1 0 120 a40 60 0 0 0 0 -120 Z"
      fill="#000"
      opacity="0.06"
    />

    <!-- cheveux courts bruns -->
    <path
      d="M58 104 C56 56 84 38 110 38 C136 38 164 56 162 104
         C158 90 148 84 148 84 Q142 70 110 70 Q78 70 72 84
         C72 84 62 90 58 104 Z"
      fill="url(#av-hair)"
    />
    <!-- pattes / tempes -->
    <path d="M58 104 q-2 14 4 22 q4 -16 2 -22 Z" fill="url(#av-hair)" />
    <path d="M162 104 q2 14 -4 22 q-4 -16 -2 -22 Z" fill="url(#av-hair)" />

    <!-- sourcils -->
    <path
      d="M76 92 q12 -6 24 -1"
      stroke="#2a1a0d"
      stroke-width="4"
      stroke-linecap="round"
    />
    <path
      d="M120 91 q12 -5 24 1"
      stroke="#2a1a0d"
      stroke-width="4"
      stroke-linecap="round"
    />

    <!-- yeux (clignent) -->
    <g class="animate-blink">
      <ellipse cx="88" cy="108" rx="11" ry="8" fill="#fff" />
      <ellipse cx="132" cy="108" rx="11" ry="8" fill="#fff" />
      <g
        :style="{
          transform: `translate(${look.x}px, ${look.y}px)`,
          transition: 'transform 0.25s ease-out',
        }"
      >
        <circle cx="88" cy="108" r="5.4" fill="#5b3a1f" />
        <circle cx="132" cy="108" r="5.4" fill="#5b3a1f" />
        <circle cx="88" cy="108" r="2.4" fill="#1a0f06" />
        <circle cx="132" cy="108" r="2.4" fill="#1a0f06" />
        <circle cx="86.4" cy="106" r="1.2" fill="#fff" />
        <circle cx="130.4" cy="106" r="1.2" fill="#fff" />
      </g>
    </g>

    <!-- nez marqué -->
    <path
      d="M106 104 C103 120 99 128 100 132 C102 137 118 137 120 132 C121 128 117 120 114 104"
      fill="url(#av-skin)"
      stroke="#c98b58"
      stroke-width="1.5"
      stroke-linejoin="round"
    />
    <path
      d="M101 131 q4 4 8 4 q4 0 8 -4"
      stroke="#b9794a"
      stroke-width="1.4"
      stroke-linecap="round"
    />

    <!-- bouche (léger sourire) -->
    <path
      d="M94 148 Q110 160 126 148"
      stroke="#a85b48"
      stroke-width="3.5"
      stroke-linecap="round"
    />
    <!-- joues -->
    <ellipse cx="76" cy="132" rx="7" ry="4" fill="#e98d6b" opacity="0.35" />
    <ellipse cx="144" cy="132" rx="7" ry="4" fill="#e98d6b" opacity="0.35" />
  </svg>
</template>
