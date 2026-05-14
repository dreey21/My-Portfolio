<template>
  <section id="portfolio">
    <!-- Banner -->
    <div class="portfolio-banner">
      <img
        class="portfolio-hero-img"
        src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1400&q=60"
        alt="Portfolio banner"
      >
      <div class="portfolio-banner-title fade-up" :class="{ visible: bannerVisible }" ref="bannerRef">
        <div class="section-title-box">Portfolio</div>
      </div>
    </div>

    <!-- Tabs -->
    <div class="portfolio-tabs">
      <button
        v-for="tab in tabs" :key="tab.value"
        :class="['tab-btn', { active: activeTab === tab.value }]"
        @click="activeTab = tab.value"
      >{{ tab.label }}</button>
    </div>

    <!-- Grid -->
    <div class="portfolio-grid">
      <div
        v-for="(proj, i) in filteredProjects" :key="proj.title + i"
        :class="['portfolio-card', { 'portfolio-featured': proj.featured && activeTab === 'all', visible: cardVisible[i] }]"
        :ref="el => { if (el) cardEls[i] = el }"
      >
        <!-- Has video -->
        <template v-if="proj.hasVideo">
          <div class="video-wrapper">
            <iframe
              :src="`https://www.youtube.com/embed/${proj.youtubeId}?rel=0&modestbranding=1`"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            />
          </div>
          <div class="card-info">
            <div class="card-info-tag">{{ proj.tag }}</div>
            <div class="card-info-title">{{ proj.title }}</div>
            <div class="card-info-sub">{{ proj.subtitle }}</div>
          </div>
        </template>

        <!-- Coming soon placeholder -->
        <template v-else>
          <div class="placeholder">
            <div class="placeholder-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 8v4M12 16h.01"/>
              </svg>
            </div>
            <div class="placeholder-tag">{{ proj.tag }}</div>
            <div class="placeholder-title">Coming Soon</div>
            <div class="placeholder-desc">{{ proj.desc }}</div>
          </div>
        </template>
      </div>
    </div>

    <div class="portfolio-more">And many more to come.</div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import { tabs, projects } from '@/data/portfolio.js'
import { useFadeUpSingle } from '@/composables/useAnimate.js'

const activeTab = ref('all')
const filteredProjects = computed(() =>
  activeTab.value === 'all' ? projects : projects.filter(p => p.cat === activeTab.value)
)

const { elRef: bannerRef, visible: bannerVisible, observe: observeBanner } = useFadeUpSingle()

const cardEls     = ref([])
const cardVisible = ref(projects.map(() => false))

function observeCards() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const i = cardEls.value.indexOf(entry.target)
        if (i !== -1) setTimeout(() => { cardVisible.value[i] = true }, i * 60)
        obs.unobserve(entry.target)
      }
    })
  }, { threshold: 0.1 })
  nextTick(() => cardEls.value.forEach(el => el && obs.observe(el)))
}

onMounted(() => {
  observeBanner()
  observeCards()
})
</script>

<style scoped>
.fade-up { opacity: 0; transform: translateY(20px); transition: opacity 0.5s ease, transform 0.5s ease; }
.fade-up.visible { opacity: 1; transform: translateY(0); }

#portfolio { background: var(--black); padding-bottom: 60px; }

/* Banner */
.portfolio-banner { position: relative; width: 100%; height: 260px; }
.portfolio-hero-img { width: 100%; height: 100%; object-fit: cover; display: block; filter: brightness(0.35); }
.portfolio-banner-title { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; }
.section-title-box { display: inline-block; border: 1.5px solid var(--white); color: var(--white); padding: 14px 56px; font-family: var(--font-label); font-size: 0.85rem; letter-spacing: 6px; text-transform: uppercase; font-weight: 600; }

/* Tabs */
.portfolio-tabs { display: flex; justify-content: center; gap: 40px; padding: 20px 0; border-bottom: 1px solid #333; margin-bottom: 2px; }
.tab-btn { font-family: var(--font-label); font-size: 0.75rem; letter-spacing: 3px; text-transform: uppercase; color: #666; background: none; border: none; cursor: pointer; padding: 6px 0; transition: color 0.2s; position: relative; }
.tab-btn.active { color: var(--white); }
.tab-btn.active::after { content: ''; position: absolute; bottom: -2px; left: 0; right: 0; height: 2px; background: var(--white); }

/* Grid */
.portfolio-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 3px; }
.portfolio-card { position: relative; overflow: hidden; opacity: 0; transform: translateY(16px); transition: opacity 0.45s ease, transform 0.45s ease; background: #111; display: flex; flex-direction: column; }
.portfolio-card.visible { opacity: 1; transform: translateY(0); }
.portfolio-featured { grid-column: 2; grid-row: 1; }

/* Video */
.video-wrapper { position: relative; width: 100%; padding-top: 56.25%; /* 16:9 */ flex-shrink: 0; }
.video-wrapper iframe { position: absolute; inset: 0; width: 100%; height: 100%; }

/* Card info below video */
.card-info { padding: 14px 16px 18px; }
.card-info-tag { font-family: var(--font-label); font-size: 0.6rem; letter-spacing: 3px; color: #555; text-transform: uppercase; margin-bottom: 5px; }
.card-info-title { font-family: var(--font-display); font-size: 1.3rem; color: var(--white); font-weight: 400; margin-bottom: 3px; }
.card-info-sub { font-family: var(--font-body); font-size: 0.75rem; color: #666; }

/* Placeholder */
.placeholder { width: 100%; aspect-ratio: 4/3; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 24px; text-align: center; border: 1px dashed #222; gap: 10px; }
.placeholder-icon svg { width: 32px; height: 32px; color: #333; }
.placeholder-tag { font-family: var(--font-label); font-size: 0.6rem; letter-spacing: 3px; color: #333; text-transform: uppercase; }
.placeholder-title { font-family: var(--font-display); font-size: 1.2rem; color: #444; }
.placeholder-desc { font-size: 0.72rem; color: #333; line-height: 1.6; max-width: 200px; }

.portfolio-more { text-align: center; padding: 32px; font-family: var(--font-label); font-size: 0.72rem; letter-spacing: 4px; color: #555; text-transform: uppercase; }

@media (max-width: 768px) {
  .portfolio-tabs {
    gap: 20px;
    padding: 16px 20px;
    overflow-x: auto;
    justify-content: center;
    white-space: nowrap;
    scrollbar-width: none;
  }
  .portfolio-tabs::-webkit-scrollbar {
    display: none;
  }
  .tab-btn {
    font-size: 0.65rem;
    letter-spacing: 2px;
    flex-shrink: 0;
  }
  .portfolio-grid {
    grid-template-columns: 1fr;
  }
  .portfolio-featured {
    grid-column: 1;
    grid-row: auto;
  }
  .placeholder {
    aspect-ratio: 16/9;
  }
}
</style>