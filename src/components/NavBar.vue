<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { profile } from '../data/content.js'

const scrolled = ref(false)
const menuOpen = ref(false)

const links = [
  { label: 'Profil', href: '#about' },
  { label: 'Compétences', href: '#skills' },
  { label: 'Projets', href: '#projects' },
  { label: 'Parcours', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

const onScroll = () => (scrolled.value = window.scrollY > 24)
onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))

const go = (href) => {
  menuOpen.value = false
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-50 transition-all duration-500"
    :class="scrolled ? 'py-2' : 'py-4'"
  >
    <nav
      class="container-pr flex items-center justify-between rounded-full px-5 py-3 transition-all duration-500"
      :class="scrolled ? 'glass shadow-2xl shadow-black/40' : 'border border-transparent'"
    >
      <a
        href="#top"
        class="group flex items-center gap-2.5 font-semibold tracking-tight"
        @click.prevent="go('#top')"
      >
        <span
          class="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-accent to-accent-2 text-sm font-bold text-bg shadow-lg shadow-accent/30"
          >PR</span
        >
        <span class="hidden sm:block">Pierre Riss</span>
      </a>

      <div class="hidden items-center gap-1 md:flex">
        <a
          v-for="link in links"
          :key="link.href"
          :href="link.href"
          class="rounded-full px-4 py-2 text-sm text-ink/60 transition-colors hover:text-ink"
          @click.prevent="go(link.href)"
          >{{ link.label }}</a
        >
      </div>

      <a
        :href="`mailto:${profile.email}`"
        class="hidden rounded-full bg-ink px-4 py-2 text-sm font-medium text-bg transition-transform hover:scale-[1.03] active:scale-95 md:block"
        >Me contacter</a
      >

      <button
        class="grid h-9 w-9 place-items-center rounded-lg text-ink/80 md:hidden"
        aria-label="Menu"
        @click="menuOpen = !menuOpen"
      >
        <span class="i" :class="menuOpen ? 'rotate-45 translate-y-[3px]' : ''" />
      </button>
    </nav>

    <!-- Mobile menu -->
    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-3"
      leave-active-class="transition duration-200 ease-in"
      leave-to-class="opacity-0 -translate-y-3"
    >
      <div v-if="menuOpen" class="container-pr mt-2 md:hidden">
        <div class="glass flex flex-col gap-1 rounded-3xl p-3">
          <a
            v-for="link in links"
            :key="link.href"
            :href="link.href"
            class="rounded-2xl px-4 py-3 text-ink/80 transition-colors hover:bg-ink/5"
            @click.prevent="go(link.href)"
            >{{ link.label }}</a
          >
        </div>
      </div>
    </transition>
  </header>
</template>

<style scoped>
.i,
.i::before,
.i::after {
  content: '';
  display: block;
  width: 18px;
  height: 2px;
  background: currentColor;
  border-radius: 2px;
  transition: transform 0.3s ease;
}
.i::before {
  transform: translateY(-6px);
}
.i::after {
  transform: translateY(4px);
}
</style>
