<template>
  <section id="about">
    <div class="section-header fade-up" :class="{ visible: headerVisible }" ref="headerRef">
      <div class="section-title-box">About Me</div>
      <p class="section-desc">
        I'm a fullstack developer specializing in management systems for real workflows.
        From database design to frontend interface, I propose, build, and deliver systems
        that help teams organize requests, records, approvals, and operations.
      </p>
      <span class="explore-link" @click="emit('scroll-to', 'portfolio')">Explore</span>
      <AppOrnament />
    </div>

    <div class="services-grid">
      <div
        v-for="(svc, i) in services"
        :key="i"
        :class="['service-item', { 'service-center': svc.center, visible: visibleFlags[i] }]"
        :ref="el => { if (el) elRefs[i] = el }"
      >
        <div class="service-icon" v-html="svc.icon" />
        <div>
          <h3>{{ svc.title }}</h3>
          <p>{{ svc.desc }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import { services } from '@/data/portfolio.js'
import { useFadeUp, useFadeUpSingle } from '@/composables/useAnimate.js'
import AppOrnament from './AppOrnament.vue'

const emit = defineEmits(['scroll-to'])

const { elRef: headerRef, visible: headerVisible, observe: observeHeader } = useFadeUpSingle()
const { elRefs, visibleFlags, observe } = useFadeUp(services.length, 50)

onMounted(() => {
  observeHeader()
  observe()
})
</script>

<style scoped>
.fade-up { opacity: 0; transform: translateY(20px); transition: opacity 0.5s ease, transform 0.5s ease; }
.fade-up.visible { opacity: 1; transform: translateY(0); }

.section-header { text-align: center; padding: 90px 20px 60px; }
.section-title-box { display: inline-block; border: 1.5px solid var(--black); padding: 14px 56px; font-family: var(--font-label); font-size: 0.85rem; letter-spacing: 6px; text-transform: uppercase; font-weight: 600; margin-bottom: 32px; }
.section-desc { font-size: 0.9rem; color: var(--mid-gray); max-width: 540px; margin: 0 auto 28px; line-height: 1.8; text-align: center; }
.explore-link { font-family: var(--font-label); font-size: 0.72rem; letter-spacing: 3px; text-transform: uppercase; color: var(--black); text-decoration: none; border-left: 2px solid var(--black); border-right: 2px solid var(--black); padding: 8px 20px; display: inline-block; margin-bottom: 20px; transition: background 0.2s, color 0.2s; cursor: pointer; }
.explore-link:hover { background: var(--black); color: var(--white); }

.services-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 40px 60px; max-width: 780px; margin: 0 auto; padding: 40px 40px 40px; }
.service-item { display: flex; gap: 16px; align-items: flex-start; opacity: 0; transform: translateY(16px); transition: opacity 0.45s ease, transform 0.45s ease; }
.service-item.visible { opacity: 1; transform: translateY(0); }
.service-center { grid-column: 1 / -1; display: flex; justify-content: center; }
.service-center .service-item { max-width: 320px; }
.service-icon { flex-shrink: 0; color: #bbb; margin-top: 2px; }
.service-icon :deep(svg) { width: 22px; height: 22px; }
.service-item h3 { font-family: var(--font-label); font-size: 0.85rem; letter-spacing: 3px; font-weight: 600; margin-bottom: 10px; }
.service-item p { font-size: 0.82rem; color: var(--mid-gray); line-height: 1.7; }

@media (max-width: 768px) {
  .services-grid { grid-template-columns: 1fr; gap: 32px; padding: 20px 28px 40px; }
  .service-center { grid-column: 1; }
  .section-header { padding: 60px 20px 40px; }
  .section-title-box { padding: 12px 28px; }
}
</style>
