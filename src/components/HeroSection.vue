<template>
  <section id="home">
    <div class="hero-left">
      <div class="hero-logo-sm"></div>
      <p  class="hero-greeting fade-up"      :class="{ visible: show[0] }">Hi, I am</p>
      <h1 class="hero-name    fade-up-scale" :class="{ visible: show[1] }">Daniel Audrey Tresvalles</h1>
      <p  class="hero-title   fade-up"       :class="{ visible: show[2] }">Fullstack Developer / Web Systems Developer</p>

      <div class="hero-actions fade-up" :class="{ visible: show[3] }">
        <div class="hero-socials">
          <a href="mailto:danielaudrey21@gmail.com" class="social-btn" title="Email">
            <svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
          </a>
          <a href="https://github.com/dreey21" target="_blank" class="social-btn" title="GitHub">
            <svg viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
          </a>
          <a href="https://linkedin.com" target="_blank" class="social-btn" title="LinkedIn">
            <svg viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          </a>
        </div>
        <a href="/resume.pdf" download class="resume-btn">
          <svg viewBox="0 0 24 24"><path d="M19 9h-4V3H9v6H5l7 7 7-7zm-8 2V5h2v6h1.17L12 13.17 9.83 11H11zm-6 8h14v2H5v-2z"/></svg>
          Download CV
        </a>
      </div>
    </div>

    <div class="hero-right fade-up" :class="{ visible: show[4] }">
      <img :src="Portrait" alt="Developer portrait">
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Portrait from '@/assets/Portrait.png'

const show = ref([false, false, false, false, false])

onMounted(() => {
  const delays = [100, 250, 400, 550, 150]
  delays.forEach((d, i) => setTimeout(() => { show.value[i] = true }, d))
})
</script>

<style scoped>
.fade-up { opacity: 0; transform: translateY(20px); transition: opacity 0.5s ease, transform 0.5s ease; }
.fade-up.visible { opacity: 1; transform: translateY(0); }
.fade-up-scale { opacity: 0; transform: translateY(20px) scale(0.97); transition: opacity 0.55s ease, transform 0.55s ease; }
.fade-up-scale.visible { opacity: 1; transform: translateY(0) scale(1); }

#home { display: grid; grid-template-columns: 1fr 1fr; min-height: 100vh; padding-top: 60px; }
.hero-left { background: var(--light-bg); display: flex; flex-direction: column; justify-content: center; padding: 80px 60px; position: relative; }
.hero-logo-sm { position: absolute; top: 40px; left: 60px; font-family: var(--font-label); font-weight: 700; font-size: 1rem; letter-spacing: 3px; color: var(--black); }
.hero-greeting { font-family: var(--font-body); font-weight: 300; font-size: 1.1rem; color: var(--mid-gray); margin-bottom: 12px; }
.hero-name { font-family: var(--font-display); font-weight: 600; font-size: clamp(2.8rem, 5vw, 4.2rem); line-height: 1.05; color: var(--black); margin-bottom: 10px; }
.hero-title { font-family: var(--font-label); font-size: 0.85rem; font-weight: 400; letter-spacing: 2px; color: var(--mid-gray); margin-bottom: 48px; }

.hero-actions { display: flex; align-items: center; gap: 24px; flex-wrap: wrap; }
.hero-socials { display: flex; gap: 16px; }
.social-btn { width: 44px; height: 44px; border: 1.5px solid #999; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--black); text-decoration: none; transition: border-color 0.2s, background 0.2s, color 0.2s; }
.social-btn:hover { border-color: var(--black); background: var(--black); color: var(--white); }
.social-btn svg { width: 16px; height: 16px; fill: currentColor; }

.resume-btn { display: flex; align-items: center; gap: 8px; font-family: var(--font-label); font-size: 0.72rem; letter-spacing: 3px; text-transform: uppercase; color: var(--black); text-decoration: none; border-left: 2px solid var(--black); border-right: 2px solid var(--black); padding: 9px 18px; transition: background 0.2s, color 0.2s; }
.resume-btn:hover { background: var(--black); color: var(--white); }
.resume-btn svg { width: 14px; height: 14px; fill: currentColor; }

.hero-right { background: var(--black); position: relative; overflow: hidden; display: flex; align-items: flex-end; justify-content: center; }
.hero-right img { width: 100%; height: 100%; object-fit: cover; object-position: center top; opacity: 0.7; mix-blend-mode: luminosity; filter: grayscale(30%); }

@media (max-width: 768px) {
  #home { grid-template-columns: 1fr; grid-template-rows: 55vh auto; min-height: auto; }
  .hero-right { display: flex; grid-row: 1; height: 55vh; }
  .hero-right img { object-position: center top; }
  .hero-left { grid-row: 2; padding: 40px 28px 60px; min-height: auto; justify-content: flex-start; }
  .hero-logo-sm { left: 28px; }
  .hero-actions { gap: 16px; }
}
</style>
