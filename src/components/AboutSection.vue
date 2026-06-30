<script setup>
import { profile } from '../data/content.js'
import CountUp from './CountUp.vue'

const stats = [
  { value: 3, suffix: 'ᵉ', label: 'année à Epitech' },
  { value: 2000, suffix: '+', label: 'utilisateurs touchés en prod' },
  { value: 30, suffix: 'K+', label: "images dans un dataset IA" },
  { value: 100, suffix: 'K', label: 'vues pédagogiques cumulées' },
]
</script>

<template>
  <section id="about" class="py-28 sm:py-36">
    <div class="container-pr grid gap-14 lg:grid-cols-[1.2fr_1fr] lg:items-center">
      <div v-reveal="{ variant: 'left' }">
        <p
          class="mb-4 text-sm font-medium uppercase tracking-[0.2em] accent-gradient"
        >
          Profil
        </p>
        <p class="text-3xl font-medium leading-snug text-white/90 sm:text-4xl">
          {{ profile.intro }}
        </p>
        <p class="mt-8 max-w-xl text-lg leading-relaxed text-white/55">
          De l'algorithme bas niveau en C/C++ aux modèles de deep learning en
          PyTorch, jusqu'aux interfaces web modernes : j'aime construire des
          choses qui marchent vraiment, et qui sont agréables à utiliser.
        </p>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div
          v-for="(s, i) in stats"
          :key="s.label"
          v-reveal="{ variant: 'scale', delay: i * 90 }"
          v-tilt="{ max: 6 }"
          class="glass relative overflow-hidden rounded-3xl p-6"
        >
          <div class="text-4xl font-semibold accent-gradient sm:text-5xl">
            <CountUp :value="s.value" :suffix="s.suffix" />
          </div>
          <div class="mt-2 text-sm leading-snug text-white/55">{{ s.label }}</div>
        </div>
      </div>
    </div>
  </section>
</template>
