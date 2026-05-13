<template>
  <section id="education">
    <div class="section-header fade-up" :class="{ visible: headerVisible }" ref="headerRef">
      <div class="section-title-box">Education</div>
      <AppOrnament />
    </div>

    <div class="education-block fade-up" :class="{ visible: eduVisible }" ref="eduRef">
      <div class="edu-left">
        <span class="edu-year">2026</span>
      </div>
      <div class="edu-right">
        <h3 class="edu-degree">Bachelor of Science in Information Technology</h3>
        <p class="edu-school">Bestlink College of the Philippines</p>
        <p class="edu-detail">Quezon City, Philippines</p>
      </div>
    </div>

    <div class="cert-block fade-up" :class="{ visible: certVisible }" ref="certRef">
      <h4 class="cert-label">Certifications</h4>
      <div class="cert-item">
        <span class="cert-name">Certificate of Completion  |  IT Desktop Support Intern</span>
        <span class="cert-org">VXI Global Holdings B.V. - July 2025</span>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import { useFadeUpSingle } from '@/composables/useAnimate.js'
import AppOrnament from './AppOrnament.vue'

const { elRef: headerRef, visible: headerVisible, observe: observeHeader } = useFadeUpSingle()
const { elRef: eduRef,    visible: eduVisible,    observe: observeEdu    } = useFadeUpSingle()

onMounted(() => {
  observeHeader()
  observeEdu()
})

const { elRef: certRef, visible: certVisible, observe: observeCert } = useFadeUpSingle()
onMounted(() => {
  observeHeader()
  observeEdu()
  observeCert()
})

</script>

<style scoped>
.fade-up { opacity: 0; transform: translateY(20px); transition: opacity 0.5s ease, transform 0.5s ease; }
.fade-up.visible { opacity: 1; transform: translateY(0); }

#education { background: var(--light-bg); padding-bottom: 80px; }

.section-header { text-align: center; padding: 90px 20px 60px; }
.section-title-box { display: inline-block; border: 1.5px solid var(--black); color: var(--black); padding: 14px 56px; font-family: var(--font-label); font-size: 0.85rem; letter-spacing: 6px; text-transform: uppercase; font-weight: 600; margin-bottom: 32px; }

.education-block { max-width: 780px; margin: 0 auto; padding: 0 40px; display: flex; gap: 40px; align-items: flex-start; }

.edu-left { flex-shrink: 0; }
.edu-year { font-family: var(--font-display); font-size: 3rem; font-weight: 300; color: #ccc; line-height: 1; }

.edu-right { border-left: 1.5px solid #ccc; padding-left: 32px; }
.edu-degree { font-family: var(--font-label); font-size: 0.95rem; font-weight: 600; letter-spacing: 2px; color: var(--black); margin-bottom: 8px; }
.edu-school { font-family: var(--font-body); font-size: 0.88rem; color: var(--mid-gray); margin-bottom: 4px; }
.edu-detail { font-family: var(--font-label); font-size: 0.7rem; letter-spacing: 2px; text-transform: uppercase; color: #bbb; }

.cert-block { max-width: 780px; margin: 48px auto 0; padding: 0 40px; }
.cert-label { font-family: var(--font-label); font-size: 0.72rem; letter-spacing: 4px; text-transform: uppercase; color: var(--black); margin-bottom: 16px; }
.cert-item { border-left: 1.5px solid #ccc; padding-left: 32px; display: flex; flex-direction: column; gap: 4px; }
.cert-name { font-family: var(--font-label); font-size: 0.85rem; font-weight: 600; letter-spacing: 1px; color: var(--black); }
.cert-org { font-family: var(--font-body); font-size: 0.82rem; color: var(--mid-gray); }

@media (max-width: 768px) {
  .education-block { padding: 0 28px; gap: 24px; }
  .edu-year { font-size: 2.2rem; }
  .section-header { padding: 60px 20px 40px; }
  .section-title-box { padding: 12px 28px; }
}
</style>
