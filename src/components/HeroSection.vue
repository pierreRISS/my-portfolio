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
    <!-- Ambient orbs -->
    <div
      class="pointer-events-none absolute -right-32 top-10 h-[34rem] w-[34rem] rounded-full bg-accent/25 blur-[120px] animate-float-slow"
    />
    <div
      class="pointer-events-none absolute -left-32 bottom-0 h-[28rem] w-[28rem] rounded-full bg-accent-2/20 blur-[120px] animate-float-slow"
      style="animation-delay: -4s"
    />

    <!-- Parallax dotted grid -->
    <div
      v-parallax="{ speed: 0.3 }"
      class="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:32px_32px]"
    />

    <div v-parallax="{ speed: 0.12 }" class="container-pr relative">
      <div
        v-reveal
        class="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-sm text-white/70 backdrop-blur"
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
        class="mt-7 max-w-2xl text-xl text-white/70 sm:text-2xl"
      >
        {{ profile.title }}.
        <span class="text-white/90">{{ profile.tagline }}</span>
      </p>

      <div
        v-reveal="{ delay: 240 }"
        class="mt-10 flex flex-wrap items-center gap-4"
      >
        <button
          class="group rounded-full bg-white px-7 py-3.5 font-medium text-ink transition-transform hover:scale-[1.03] active:scale-95"
          @click="scrollTo('#projects')"
        >
          Voir mes projets
          <span class="ml-1 inline-block transition-transform group-hover:translate-x-1"
            >→</span
          >
        </button>
        <a
          :href="`mailto:${profile.email}`"
          class="rounded-full border border-white/15 px-7 py-3.5 font-medium text-white/90 transition-colors hover:bg-white/5"
          >Me contacter</a
        >
      </div>

      <p
        v-reveal="{ delay: 320 }"
        class="mt-10 max-w-xl text-sm leading-relaxed text-white/45"
      >
        {{ availability.detail }}
      </p>
    </div>

    <!-- Scroll cue -->
    <div
      class="pointer-events-none absolute inset-x-0 bottom-8 flex justify-center"
    >
      <div
        class="flex h-9 w-5 items-start justify-center rounded-full border border-white/20 p-1"
      >
        <span class="h-2 w-1 animate-bounce rounded-full bg-white/50" />
      </div>
    </div>
  </section>
</template>
