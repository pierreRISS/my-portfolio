<script setup>
import { profile } from '../data/content.js'

const stats = [
  { value: '3ᵉ', label: 'année à Epitech' },
  { value: '2000+', label: 'utilisateurs touchés en prod' },
  { value: '30K+', label: "images dans un dataset IA" },
  { value: '100K', label: 'vues pédagogiques cumulées' },
]
</script>

<template>
  <section id="about" class="py-28 sm:py-36">
    <div class="container-pr grid gap-14 lg:grid-cols-[1.2fr_1fr] lg:items-center">
      <div v-reveal>
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
          v-reveal="{ delay: i * 90 }"
          class="glass rounded-3xl p-6 transition-transform duration-300 hover:-translate-y-1"
        >
          <div class="text-4xl font-semibold accent-gradient">{{ s.value }}</div>
          <div class="mt-2 text-sm leading-snug text-white/55">{{ s.label }}</div>
        </div>
      </div>
    </div>
  </section>
</template>
