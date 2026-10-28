<script setup>
import SidePanel from './components/SidePanel.vue'
import ExperienceSection from './components/ExperienceSection.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import SkillsSection from './components/SkillsSection.vue'
import AboutSection from './components/AboutSection.vue'
import SiteFooter from './components/SiteFooter.vue'
</script>

<template>
  <div class="mx-auto max-w-6xl px-6 sm:px-10 lg:flex lg:px-12">
    <SidePanel />
    <main class="pb-16 lg:w-[58%] lg:py-16 lg:pl-14">
      <ExperienceSection />
      <ProjectsSection />
      <SkillsSection />
      <AboutSection />
      <SiteFooter />
    </main>
  </div>
</template>
