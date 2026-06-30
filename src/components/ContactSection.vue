<script setup>
import { profile, availability } from '../data/content.js'
import AppIcon from './AppIcon.vue'

const channels = [
  { icon: 'mail', label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
  { icon: 'phone', label: 'Téléphone', value: profile.phone, href: `tel:${profile.phoneHref}` },
  { icon: 'pin', label: 'Localisation', value: profile.location, href: null },
]
</script>

<template>
  <section id="contact" class="relative overflow-hidden py-28 sm:py-36">
    <div class="container-pr">
      <div
        v-reveal
        class="glass relative overflow-hidden rounded-[2.5rem] px-8 py-16 text-center sm:px-16 sm:py-24"
      >
        <div
          class="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-accent/30 blur-[100px]"
        />

        <p
          class="relative mb-4 text-sm font-medium uppercase tracking-[0.2em] accent-gradient"
        >
          Contact
        </p>
        <h2
          class="relative mx-auto max-w-3xl text-4xl font-semibold tracking-tight text-gradient sm:text-6xl"
        >
          Construisons quelque chose ensemble.
        </h2>
        <p class="relative mx-auto mt-6 max-w-xl text-lg text-white/55">
          {{ availability.detail }}
        </p>

        <div class="relative mt-10 flex flex-wrap justify-center gap-3">
          <a
            v-magnetic="{ strength: 0.4 }"
            :href="`mailto:${profile.email}`"
            class="rounded-full bg-white px-7 py-3.5 font-medium text-ink hover:scale-[1.03] active:scale-95"
            >Envoyer un email</a
          >
          <a
            v-magnetic="{ strength: 0.4 }"
            :href="`tel:${profile.phoneHref}`"
            class="rounded-full border border-white/15 px-7 py-3.5 font-medium text-white/90 transition-colors hover:bg-white/5"
            >Appeler</a
          >
        </div>

        <div
          class="relative mx-auto mt-14 grid max-w-2xl gap-4 sm:grid-cols-3"
        >
          <component
            :is="c.href ? 'a' : 'div'"
            v-for="c in channels"
            :key="c.label"
            :href="c.href || undefined"
            class="flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-colors"
            :class="c.href ? 'hover:border-white/20 hover:bg-white/[0.05]' : ''"
          >
            <AppIcon :name="c.icon" class="h-5 w-5 text-accent-2" />
            <span class="text-xs uppercase tracking-wider text-white/40">{{
              c.label
            }}</span>
            <span class="text-sm text-white/85">{{ c.value }}</span>
          </component>
        </div>
      </div>
    </div>
  </section>
</template>
