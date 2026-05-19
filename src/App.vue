<template>
  <AppNav         @scroll-to="scrollTo" />
  <HeroSection />
  <DarkIntro      @scroll-to="scrollTo" />
  <AboutSection   @scroll-to="scrollTo" />
  <ExperienceSection />
  <SkillsSection />
  <PortfolioSection />
  <EducationSection />
  <ContactSection />
  <AppFooter      @scroll-to="scrollTo" />
  <Analytics />
</template>

<script setup>
import AppNav            from '@/components/AppNav.vue'
import HeroSection       from '@/components/HeroSection.vue'
import DarkIntro         from '@/components/DarkIntro.vue'
import AboutSection      from '@/components/AboutSection.vue'
import ExperienceSection from '@/components/ExperienceSection.vue'
import SkillsSection     from '@/components/SkillsSection.vue'
import PortfolioSection  from '@/components/PortfolioSection.vue'
import EducationSection  from '@/components/EducationSection.vue'
import ContactSection    from '@/components/ContactSection.vue'
import AppFooter         from '@/components/AppFooter.vue'
import { Analytics }     from '@vercel/analytics/vue'

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}
</script>
