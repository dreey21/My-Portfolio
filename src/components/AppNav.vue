<template>
  <nav>
    <img
      class="nav-logo"
      :src="logo"
      alt="DA Logo"
      @click="emit('scroll-to', 'home')"
    />

    <ul class="nav-links" :class="{ open: menuOpen }">
      <li><a @click="nav('about')">About</a></li>
      <li><a @click="nav('experience')">Experience</a></li>
      <li><a @click="nav('skills')">Skills</a></li>
      <li><a @click="nav('portfolio')">Portfolio</a></li>
      <li><a @click="nav('education')">Education</a></li>
      <li><a @click="nav('contact')" class="nav-cta">Contact Me</a></li>
    </ul>

    <button class="hamburger" :class="{ active: menuOpen }" @click="menuOpen = !menuOpen" aria-label="Menu">
      <span /><span /><span />
    </button>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import logo from '@/assets/Logo.png'

const emit = defineEmits(['scroll-to'])
const menuOpen = ref(false)

function nav(id) {
  emit('scroll-to', id)
  menuOpen.value = false
}
</script>

<style scoped>
nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 100;
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 40px; height: 60px; background: var(--black);
}
.nav-logo { height: 56px; width: auto; cursor: pointer; filter: invert(1); mix-blend-mode: screen; }
.nav-links { display: flex; align-items: center; gap: 28px; list-style: none; }
.nav-links a { font-family: var(--font-label); font-size: 0.78rem; font-weight: 500; letter-spacing: 2px; text-transform: uppercase; color: var(--gray); text-decoration: none; transition: color 0.2s; cursor: pointer; }
.nav-links a:hover { color: var(--white); }
.nav-cta { border: 1px solid var(--white) !important; border-radius: 999px; padding: 7px 22px; color: var(--white) !important; font-size: 0.75rem !important; transition: background 0.2s, color 0.2s !important; }
.nav-cta:hover { background: var(--white) !important; color: var(--black) !important; }
.hamburger { display: none; flex-direction: column; gap: 5px; cursor: pointer; background: none; border: none; padding: 4px; z-index: 200; }
.hamburger span { display: block; width: 24px; height: 2px; background: var(--white); transition: all 0.3s; }

/* Hamburger to X animation */
.hamburger.active span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.hamburger.active span:nth-child(2) { opacity: 0; }
.hamburger.active span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

@media (max-width: 768px) {
  nav { padding: 0 20px; }
  .hamburger { display: flex; }

  /* Full screen overlay */
  .nav-links {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 36px;
    position: fixed;
    inset: 0;
    background: var(--black);
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease;
    z-index: 100;
  }
  .nav-links.open {
    opacity: 1;
    pointer-events: all;
  }
  .nav-links a {
    font-size: 1.1rem;
    letter-spacing: 4px;
    color: var(--white);
  }
  .nav-cta {
    font-size: 1rem !important;
    padding: 12px 36px !important;
  }
}
</style>