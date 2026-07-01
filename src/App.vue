<script setup>
import ScrollProgress from './components/ScrollProgress.vue'
import ScrollDeco from './components/ScrollDeco.vue'
import NavBar from './components/NavBar.vue'
import HeroSection from './components/HeroSection.vue'
import AboutSection from './components/AboutSection.vue'
import SkillsSection from './components/SkillsSection.vue'
import ExperienceSection from './components/ExperienceSection.vue'
import ProjectsShowcase from './components/ProjectsShowcase.vue'
import EducationSection from './components/EducationSection.vue'
import ContactSection from './components/ContactSection.vue'
import SiteFooter from './components/SiteFooter.vue'
</script>

<template>
  <ScrollProgress />
  <ScrollDeco />
  <NavBar />
  <main>
    <HeroSection />
    <AboutSection />
    <SkillsSection />
    <ProjectsShowcase />
    <ExperienceSection />
    <EducationSection />
    <ContactSection />
  </main>
  <SiteFooter />
</template>
