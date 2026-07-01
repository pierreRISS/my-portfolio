<script setup>
import { ref, onUnmounted } from 'vue'
import { profile, availability } from '../data/content.js'
import AppIcon from './AppIcon.vue'

const channels = [
  { icon: 'mail', label: 'Email', value: profile.email, copy: true },
  { icon: 'phone', label: 'Téléphone', value: profile.phone, copy: true },
  { icon: 'pin', label: 'Localisation', value: profile.location, copy: false },
]

const copied = ref(null)
let timer = null

const copy = async (c) => {
  if (!c.copy) return
  try {
    await navigator.clipboard.writeText(c.value)
  } catch {
    // Fallback pour les navigateurs sans Clipboard API (ou hors HTTPS)
    const ta = document.createElement('textarea')
    ta.value = c.value
    ta.style.position = 'fixed'
    ta.style.opacity = '0'
    document.body.appendChild(ta)
    ta.select()
    try {
      document.execCommand('copy')
    } catch {
      /* ignore */
    }
    document.body.removeChild(ta)
  }
  copied.value = c.label
  clearTimeout(timer)
  timer = setTimeout(() => (copied.value = null), 1600)
}

onUnmounted(() => clearTimeout(timer))
</script>

<template>
  <section id="contact" class="py-28 sm:py-36">
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
        <p class="relative mx-auto mt-6 max-w-xl text-lg text-ink/55">
          {{ availability.detail }}
        </p>

        <div class="relative mt-10 flex flex-wrap justify-center gap-3">
          <a
            v-magnetic="{ strength: 0.4 }"
            :href="`mailto:${profile.email}`"
            class="rounded-full bg-ink px-7 py-3.5 font-medium text-bg hover:scale-[1.03] active:scale-95"
            >Envoyer un email</a
          >
          <a
            v-magnetic="{ strength: 0.4 }"
            :href="`tel:${profile.phoneHref}`"
            class="rounded-full border border-ink/15 px-7 py-3.5 font-medium text-ink/90 transition-colors hover:bg-ink/5"
            >Appeler</a
          >
        </div>

        <div
          class="relative mx-auto mt-14 grid max-w-2xl gap-4 sm:grid-cols-3"
        >
          <component
            :is="c.copy ? 'button' : 'div'"
            v-for="c in channels"
            :key="c.label"
            :type="c.copy ? 'button' : undefined"
            :title="c.copy ? 'Cliquer pour copier' : undefined"
            class="flex flex-col items-center gap-2 rounded-2xl border border-ink/10 bg-ink/[0.03] p-5 transition-colors"
            :class="
              c.copy ? 'cursor-pointer hover:border-ink/20 hover:bg-ink/[0.05]' : ''
            "
            @click="copy(c)"
          >
            <AppIcon
              :name="copied === c.label ? 'check' : c.icon"
              class="h-5 w-5"
              :class="copied === c.label ? 'text-emerald-500' : 'text-accent-2'"
            />
            <span class="text-xs uppercase tracking-wider text-ink/40">{{
              c.label
            }}</span>
            <span
              class="text-sm transition-colors"
              :class="copied === c.label ? 'font-medium text-emerald-600' : 'text-ink/85'"
              >{{ copied === c.label ? 'Copié !' : c.value }}</span
            >
          </component>
        </div>
      </div>
    </div>
  </section>
</template>
