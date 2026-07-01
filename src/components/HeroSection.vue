<script setup>
import { profile, availability } from '../data/content.js'

const scrollTo = (href) =>
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
</script>

<template>
  <section
    id="top"
    class="relative flex min-h-screen items-center overflow-hidden pt-28"
  >
    <!-- Parallax dotted grid -->
    <div
      v-parallax="{ speed: 0.3 }"
      class="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:radial-gradient(circle_at_1px_1px,#16161d_1px,transparent_0)] [background-size:32px_32px]"
    />

    <div v-parallax="{ speed: 0.12 }" class="container-pr relative">
      <div
        v-reveal
        class="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-ink/[0.04] px-4 py-1.5 text-sm text-ink/70 backdrop-blur"
      >
        <span class="relative flex h-2 w-2">
          <span
            class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"
          />
          <span class="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
        </span>
        {{ availability.badge }}
      </div>

      <h1
        v-reveal="{ variant: 'blur', delay: 80 }"
        class="mt-8 text-6xl font-semibold leading-[0.95] tracking-tight sm:text-7xl md:text-8xl"
      >
        <span class="text-gradient">{{ profile.firstName }}</span
        ><br />
        <span class="accent-gradient">{{ profile.lastName }}</span>
      </h1>

      <p
        v-reveal="{ delay: 160 }"
        class="mt-7 max-w-2xl text-xl text-ink/70 sm:text-2xl"
      >
        {{ profile.title }}.
        <span class="text-ink/90">{{ profile.tagline }}</span>
      </p>

      <div
        v-reveal="{ delay: 240 }"
        class="mt-10 flex flex-wrap items-center gap-4"
      >
        <button
          v-magnetic="{ strength: 0.4 }"
          class="group rounded-full bg-ink px-7 py-3.5 font-medium text-bg hover:scale-[1.03] active:scale-95"
          @click="scrollTo('#projects')"
        >
          Voir mes projets
          <span class="ml-1 inline-block transition-transform group-hover:translate-x-1"
            >→</span
          >
        </button>
        <a
          v-magnetic="{ strength: 0.4 }"
          :href="`mailto:${profile.email}`"
          class="rounded-full border border-ink/15 px-7 py-3.5 font-medium text-ink/90 transition-colors hover:bg-ink/5"
          >Me contacter</a
        >
      </div>

      <p
        v-reveal="{ delay: 320 }"
        class="mt-10 max-w-xl text-sm leading-relaxed text-ink/45"
      >
        {{ availability.detail }}
      </p>
    </div>

    <!-- Scroll cue -->
    <div
      class="pointer-events-none absolute inset-x-0 bottom-8 flex justify-center"
    >
      <div
        class="flex h-9 w-5 items-start justify-center rounded-full border border-ink/20 p-1"
      >
        <span class="h-2 w-1 animate-bounce rounded-full bg-ink/50" />
      </div>
    </div>
  </section>
</template>
