<template>
  <section id="skills">
    <div class="section-header">
      <AppOrnament style="margin-top:0;" />
      <div class="section-title-box fade-up" :class="{ visible: titleVisible }" ref="titleRef">Skills</div>
    </div>

    <p class="skills-group-label">Using Now:</p>
    <div class="skills-icons">
      <div
        v-for="(sk, i) in currentSkills" :key="sk.name"
        :class="['skill-item', { visible: currentVisible[i] }]"
        :ref="el => { if (el) currentEls[i] = el }"
      >
        <img :src="sk.icon" :alt="sk.name" @error="e => e.target.style.opacity = '0.3'">
        <span>{{ sk.name }}</span>
      </div>
    </div>

    <p class="skills-group-label">Learning:</p>
    <div class="skills-icons">
      <div
        v-for="(sk, i) in learningSkills" :key="sk.name"
        :class="['skill-item', { visible: learnVisible[i] }]"
        :ref="el => { if (el) learnEls[i] = el }"
      >
        <img :src="sk.icon" :alt="sk.name" @error="e => e.target.style.opacity = '0.3'">
        <span>{{ sk.name }}</span>
      </div>
    </div>

    <div style="height: 40px;" />
    <AppOrnament />
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import { currentSkills, learningSkills } from '@/data/portfolio.js'
import { useFadeUp, useFadeUpSingle } from '@/composables/useAnimate.js'
import AppOrnament from './AppOrnament.vue'

const { elRef: titleRef, visible: titleVisible, observe: observeTitle } = useFadeUpSingle()
const { elRefs: currentEls, visibleFlags: currentVisible, observe: observeCurrent } = useFadeUp(currentSkills.length, 50)
const { elRefs: learnEls,   visibleFlags: learnVisible,   observe: observeLearn   } = useFadeUp(learningSkills.length, 50)

onMounted(() => {
  observeTitle()
  observeCurrent()
  observeLearn()
})
</script>

<style scoped>
.fade-up { opacity: 0; transform: translateY(20px); transition: opacity 0.5s ease, transform 0.5s ease; }
.fade-up.visible { opacity: 1; transform: translateY(0); }

#skills { background: var(--light-bg); padding-bottom: 80px; }
.section-header { text-align: center; padding: 90px 20px 60px; }
.section-title-box { display: inline-block; border: 1.5px solid var(--black); padding: 14px 56px; font-family: var(--font-label); font-size: 0.85rem; letter-spacing: 6px; text-transform: uppercase; font-weight: 600; margin-bottom: 32px; }

.skills-group-label { font-family: var(--font-label); font-size: 0.72rem; font-weight: 600; letter-spacing: 4px; text-transform: uppercase; color: var(--black); max-width: 780px; margin: 0 auto 28px; padding: 0 40px; }
.skills-icons { display: flex; flex-wrap: wrap; gap: 36px 40px; max-width: 780px; margin: 0 auto 48px; padding: 0 40px; }
.skill-item { display: flex; flex-direction: column; align-items: center; gap: 10px; width: 70px; opacity: 0; transform: translateY(14px); transition: opacity 0.4s ease, transform 0.4s ease; }
.skill-item.visible { opacity: 1; transform: translateY(0); }
.skill-item img { width: 52px; height: 52px; object-fit: contain; filter: grayscale(20%); transition: filter 0.2s, transform 0.2s; }
.skill-item:hover img { filter: grayscale(0%); transform: translateY(-3px); }
.skill-item span { font-family: var(--font-label); font-size: 0.65rem; letter-spacing: 2px; text-transform: uppercase; color: var(--mid-gray); text-align: center; }

@media (max-width: 768px) {
  .skills-icons { gap: 28px 24px; padding: 0 28px; }
  .section-header { padding: 60px 20px 40px; }
}
</style>
