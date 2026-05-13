<template>
  <section id="contact">
    <div class="section-header fade-up" :class="{ visible: headerVisible }" ref="headerRef">
      <div class="section-title-box">Contact</div>
      <p class="section-desc">
        Have a project or opportunity in mind? I'd love to hear about it. Let's build something that works.
      </p>
      <AppOrnament />
    </div>

    <form class="contact-form" @submit.prevent="handleSubmit">
      <input v-model="form.name"    type="text"  class="form-input" placeholder="Enter your name*"  required>
      <input v-model="form.email"   type="email" class="form-input" placeholder="Enter your email*" required>
      <input v-model="form.phone"   type="tel"   class="form-input" placeholder="Phone number">
      <textarea v-model="form.message"           class="form-input" placeholder="Your message*" required />
      <button type="submit" class="submit-btn">{{ submitLabel }}</button>
    </form>
  </section>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useFadeUpSingle } from '@/composables/useAnimate.js'
import AppOrnament from './AppOrnament.vue'

const submitLabel = ref('Submit')
const form = reactive({ name: '', email: '', phone: '', message: '' })

function handleSubmit() {
  submitLabel.value = 'Message Sent!'
  Object.assign(form, { name: '', email: '', phone: '', message: '' })
  setTimeout(() => { submitLabel.value = 'Submit' }, 3000)
}

const { elRef: headerRef, visible: headerVisible, observe: observeHeader } = useFadeUpSingle()
onMounted(observeHeader)
</script>

<style scoped>
.fade-up { opacity: 0; transform: translateY(20px); transition: opacity 0.5s ease, transform 0.5s ease; }
.fade-up.visible { opacity: 1; transform: translateY(0); }

#contact { background: var(--light-bg); padding-bottom: 0; }
.section-header { text-align: center; padding: 90px 20px 60px; }
.section-title-box { display: inline-block; border: 1.5px solid var(--black); padding: 14px 56px; font-family: var(--font-label); font-size: 0.85rem; letter-spacing: 6px; text-transform: uppercase; font-weight: 600; margin-bottom: 32px; }
.section-desc { font-size: 0.9rem; color: var(--mid-gray); max-width: 540px; margin: 0 auto 28px; line-height: 1.8; text-align: center; }

.contact-form { max-width: 540px; margin: 0 auto; padding: 0 40px 80px; display: flex; flex-direction: column; gap: 20px; }
.form-input { width: 100%; background: transparent; border: none; border-bottom: 1.5px solid #bbb; padding: 12px 4px; font-family: var(--font-body); font-size: 0.82rem; letter-spacing: 1px; color: var(--black); outline: none; transition: border-color 0.2s; }
.form-input::placeholder { color: #999; text-transform: uppercase; font-size: 0.75rem; letter-spacing: 2px; }
.form-input:focus { border-color: var(--black); }
textarea.form-input { resize: vertical; min-height: 120px; }
.submit-btn { align-self: center; font-family: var(--font-label); font-size: 0.75rem; letter-spacing: 4px; text-transform: uppercase; background: none; border: none; cursor: pointer; color: var(--black); border-left: 2px solid var(--black); border-right: 2px solid var(--black); padding: 10px 32px; transition: background 0.2s, color 0.2s; margin-top: 8px; }
.submit-btn:hover { background: var(--black); color: var(--white); }

@media (max-width: 768px) {
  .contact-form { padding: 0 28px 60px; }
  .section-header { padding: 60px 20px 40px; }
}
</style>
