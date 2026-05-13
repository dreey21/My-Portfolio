<template>
  <div class="dark-section">
    <div ref="leftRef" class="fade-up" :class="{ visible: leftVisible }">
      <div class="dark-label">Commissioned Work</div>
      <h2>Proposed. Built. Delivered.</h2>
      <p>
        Commissioned web systems designed from scratch, covering the
        full stack from Laravel backend to Vue.js frontend. Fresh
        graduate, with real end-to-end project experience.
      </p>
      <span class="read-more-btn" @click="emit('scroll-to', 'about')">Read More</span>
    </div>
    <div>
      <p class="dark-sub">
        Commissioned by students as capstone projects, built on Laravel,
        Laravel Blade, and MySQL with Vue.js frontends. One includes an
        experimental AI-powered input feature, with refinement ongoing.
      </p>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useFadeUpSingle } from '@/composables/useAnimate.js'

const emit = defineEmits(['scroll-to'])
const { elRef: leftRef, visible: leftVisible, observe: observeLeft } = useFadeUpSingle()

onMounted(observeLeft)
</script>

<style scoped>
.fade-up { opacity: 0; transform: translateY(20px); transition: opacity 0.5s ease, transform 0.5s ease; }
.fade-up.visible { opacity: 1; transform: translateY(0); }

.dark-section { background: var(--black); color: var(--white); padding: 80px 60px; display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: center; }
.dark-label { font-family: var(--font-label); font-size: 0.7rem; letter-spacing: 4px; text-transform: uppercase; color: #888; margin-bottom: 16px; }
.dark-section h2 { font-family: var(--font-display); font-weight: 300; font-size: 2.4rem; color: var(--white); margin-bottom: 20px; }
.dark-section p { font-size: 0.9rem; line-height: 1.8; color: #888; max-width: 440px; }
.dark-sub { color: #888 !important; font-size: 0.85rem !important; line-height: 1.9 !important; margin-top: 20px; }
.read-more-btn { display: inline-block; margin-top: 28px; font-family: var(--font-label); font-size: 0.72rem; letter-spacing: 3px; text-transform: uppercase; color: var(--white); text-decoration: none; border-left: 2px solid var(--white); border-right: 2px solid var(--white); padding: 8px 20px; transition: background 0.2s, color 0.2s; cursor: pointer; }
.read-more-btn:hover { background: var(--white); color: var(--black); }

@media (max-width: 768px) {
  .dark-section { grid-template-columns: 1fr; padding: 60px 28px; }
}
</style>
