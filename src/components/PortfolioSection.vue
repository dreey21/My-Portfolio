<template>
  <section id="portfolio">
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

    <div
      v-if="!isCompact"
      class="portfolio-story"
      ref="storyRef"
      :style="{ '--detail-count': timeline.length }"
    >
      <div class="project-sticky">
        <div class="project-layout">
          <div class="project-sidebar">
            <div class="project-kicker">Featured Systems</div>
            <h2 class="project-headline">
              Management systems<br>for <span class="workflow-emphasis">real</span><br><span class="workflow-emphasis">workflows</span>
            </h2>

            <nav class="project-index" aria-label="Featured project selector">
              <button
                v-for="(project, navIndex) in projects"
                :key="project.title"
                type="button"
                :class="['project-choice', { active: activeProject === navIndex }]"
                :aria-current="activeProject === navIndex ? 'true' : undefined"
                @click="selectProject(navIndex)"
                @keydown="handleProjectKey($event)"
              >
                <span class="choice-heading">
                  <span class="choice-number">{{ projectNumber(navIndex) }}</span>
                  <span class="choice-title">{{ project.title }}</span>
                </span>
                <span class="choice-summary">
                  {{ project.context }}
                </span>
              </button>
            </nav>
          </div>

          <div class="project-stage">
            <div class="project-preview">
              <div class="preview-head">
                <span>{{ projectNumber(activeProject) }}</span>
                <span>{{ activeProjectData.label }} / {{ activeProjectData.year }}</span>
              </div>

              <div
                class="video-frame"
                :key="activeProjectData.title"
                :class="{ 'video-frame-empty': !activeProjectData.hasVideo }"
              >
                <iframe
                  v-if="activeProjectData.hasVideo"
                  :src="videoSrc(activeProjectData)"
                  :title="`${activeProjectData.title} project walkthrough`"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                />
                <div v-else class="video-placeholder">
                  <span class="placeholder-number">{{ projectNumber(activeProject) }}</span>
                  <span class="placeholder-label">Video Pending</span>
                  <span class="placeholder-title">{{ activeProjectData.title }}</span>
                </div>
              </div>

              <div class="project-details">
                <div class="detail-copy" aria-live="polite">
                  <Transition name="detail-shift" mode="out-in">
                    <article :key="`${activeProjectData.title}-${activeDetail}`">
                      <div class="project-tag">{{ activeProjectData.tag }}</div>
                      <div class="detail-count">
                        {{ projectNumber(activeDetail) }} / {{ projectNumber(activeDetailItems.length - 1) }}
                      </div>
                      <h3>{{ activeDetailData.title }}</h3>
                      <p>{{ activeDetailData.body }}</p>
                    </article>
                  </Transition>
                </div>

                <div class="detail-tools">
                  <div class="detail-steps" aria-label="System detail selector">
                    <button
                      v-for="(detail, detailIndex) in activeDetailItems"
                      :key="detail.title"
                      type="button"
                      :class="['detail-step', { active: activeDetail === detailIndex }]"
                      :aria-label="`Show ${detail.title}`"
                      @click="selectDetail(detailIndex)"
                    />
                  </div>
                  <ul class="project-stack" aria-label="Technology stack">
                    <li v-for="tech in activeProjectData.stack.slice(0, 4)" :key="tech">{{ tech }}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="portfolio-mobile">
      <div class="mobile-section-head">
        <div class="project-kicker">Featured Systems</div>
        <h2 class="project-headline">
          Management systems<br>for <span class="workflow-emphasis">real</span><br><span class="workflow-emphasis">workflows</span>
        </h2>
      </div>

      <div class="mobile-project-current" aria-live="polite">
        <span>{{ projectNumber(activeProject) }}</span>
        <strong>{{ activeProjectData.title }}</strong>
      </div>

      <article
        v-for="(project, projectIndex) in projects"
        :key="project.title"
        class="mobile-project"
        :ref="el => setMobileProjectRef(el, projectIndex)"
      >
        <div class="mobile-project-head">
          <span>{{ projectNumber(projectIndex) }}</span>
          <span>{{ project.label }} / {{ project.year }}</span>
        </div>

        <div
          class="video-frame mobile-media"
          :class="{ 'video-frame-empty': !project.hasVideo }"
        >
          <iframe
            v-if="project.hasVideo"
            :src="videoSrc(project)"
            :title="`${project.title} project walkthrough`"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          />
          <div v-else class="video-placeholder">
            <span class="placeholder-number">{{ projectNumber(projectIndex) }}</span>
            <span class="placeholder-label">Video Pending</span>
            <span class="placeholder-title">{{ project.title }}</span>
          </div>
        </div>

        <div class="mobile-project-copy">
          <div class="project-tag">{{ project.tag }}</div>
          <h3>{{ project.title }}</h3>
          <p>{{ project.context }}</p>
        </div>

        <div class="mobile-detail-list">
          <section
            v-for="(detail, detailIndex) in projectDetails(project)"
            :key="detail.title"
            class="mobile-detail mobile-reveal"
            :class="{ visible: mobileVisibleFlags[timelineIndexFor(projectIndex, detailIndex)] }"
            :ref="el => setMobileDetailRef(el, timelineIndexFor(projectIndex, detailIndex))"
          >
            <span>{{ projectNumber(detailIndex) }}</span>
            <div>
              <h4>{{ detail.title }}</h4>
              <p>{{ detail.body }}</p>
            </div>
          </section>
        </div>

        <ul class="project-stack mobile-stack" aria-label="Technology stack">
          <li v-for="tech in project.stack.slice(0, 4)" :key="tech">{{ tech }}</li>
        </ul>
      </article>
    </div>
  </section>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { projects } from '@/data/portfolio.js'
import { useFadeUpSingle } from '@/composables/useAnimate.js'

const { elRef: bannerRef, visible: bannerVisible, observe: observeBanner } = useFadeUpSingle()

const storyRef = ref(null)
const isCompact = ref(false)
const activeProject = ref(0)
const activeDetail = ref(0)
const mobileProjectRefs = ref([])
const mobileDetailRefs = ref([])
const mobileVisibleFlags = ref([])
const timeline = computed(() => projects.flatMap((project, projectIndex) =>
  projectDetails(project).map((detail, detailIndex) => ({
    projectIndex,
    detailIndex,
    detail,
  }))
))
const activeProjectData = computed(() => projects[activeProject.value] ?? projects[0])
const activeDetailItems = computed(() => projectDetails(activeProjectData.value))
const activeDetailData = computed(() => activeDetailItems.value[activeDetail.value] ?? activeDetailItems.value[0])
let scrollFrame = 0
let manualSelectionUntil = 0
let compactQuery
let mobileProjectObserver
let mobileRevealObserver

function projectDetails(project) {
  return project.details?.length
    ? project.details
    : project.notes.map((note, index) => ({ title: `Detail ${index + 1}`, body: note }))
}

function projectNumber(index) {
  return String(index + 1).padStart(2, '0')
}

function videoSrc(project) {
  return `https://www.youtube.com/embed/${project.youtubeId}?rel=0&modestbranding=1`
}

function timelineIndexFor(projectIndex, detailIndex = 0) {
  const index = timeline.value.findIndex((item) =>
    item.projectIndex === projectIndex && item.detailIndex === detailIndex
  )

  return index === -1 ? 0 : index
}

function setMobileProjectRef(el, index) {
  if (el) mobileProjectRefs.value[index] = el
}

function setMobileDetailRef(el, index) {
  if (el) mobileDetailRefs.value[index] = el
}

function setActiveFromTimelineIndex(index) {
  const item = timeline.value[index] ?? timeline.value[0]
  if (!item) return

  activeProject.value = item.projectIndex
  activeDetail.value = item.detailIndex
}

function scrollToTimelineIndex(index) {
  if (isCompact.value || !storyRef.value || timeline.value.length <= 1) return

  const storyTop = storyRef.value.getBoundingClientRect().top + window.scrollY
  const scrollRange = Math.max(1, storyRef.value.offsetHeight - window.innerHeight)
  const progress = index / (timeline.value.length - 1)

  window.scrollTo({
    top: storyTop + (scrollRange * progress),
    behavior: 'smooth',
  })
}

function selectProject(index) {
  activeProject.value = index
  activeDetail.value = 0
  manualSelectionUntil = Date.now() + 850
  scrollToTimelineIndex(timelineIndexFor(index, 0))
}

function selectDetail(index) {
  activeDetail.value = index
  manualSelectionUntil = Date.now() + 850
  scrollToTimelineIndex(timelineIndexFor(activeProject.value, index))
}

function handleProjectKey(event) {
  const keyOffset = {
    ArrowDown: 1,
    ArrowRight: 1,
    ArrowUp: -1,
    ArrowLeft: -1,
  }[event.key]

  if (!keyOffset) return

  event.preventDefault()
  const nextProject = (activeProject.value + keyOffset + projects.length) % projects.length
  activeProject.value = nextProject
  activeDetail.value = 0
  manualSelectionUntil = Date.now() + 850
  scrollToTimelineIndex(timelineIndexFor(nextProject, 0))
}

function updateActiveFromScroll() {
  scrollFrame = 0
  if (isCompact.value || !storyRef.value || Date.now() < manualSelectionUntil) return

  const storyTop = storyRef.value.getBoundingClientRect().top + window.scrollY
  const scrollRange = Math.max(1, storyRef.value.offsetHeight - window.innerHeight)
  const progress = Math.min(1, Math.max(0, (window.scrollY - storyTop) / scrollRange))
  const nextIndex = Math.round(progress * (timeline.value.length - 1))

  setActiveFromTimelineIndex(Math.min(timeline.value.length - 1, Math.max(0, nextIndex)))
}

function queueActiveUpdate() {
  if (scrollFrame) return
  scrollFrame = requestAnimationFrame(updateActiveFromScroll)
}

function disconnectMobileObservers() {
  mobileProjectObserver?.disconnect()
  mobileRevealObserver?.disconnect()
  mobileProjectObserver = null
  mobileRevealObserver = null
}

function observeMobileProjects() {
  disconnectMobileObservers()

  if (!isCompact.value || typeof IntersectionObserver === 'undefined') {
    mobileVisibleFlags.value = Array(timeline.value.length).fill(true)
    return
  }

  mobileVisibleFlags.value = Array(timeline.value.length).fill(false)

  mobileProjectObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return

      const index = mobileProjectRefs.value.indexOf(entry.target)
      if (index !== -1) {
        activeProject.value = index
        activeDetail.value = 0
      }
    })
  }, {
    rootMargin: '-24% 0px -54% 0px',
    threshold: 0.01,
  })

  mobileRevealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return

      const index = mobileDetailRefs.value.indexOf(entry.target)
      if (index !== -1) mobileVisibleFlags.value[index] = true
      mobileRevealObserver.unobserve(entry.target)
    })
  }, {
    rootMargin: '0px 0px -12% 0px',
    threshold: 0.12,
  })

  nextTick(() => {
    mobileProjectRefs.value.forEach(el => el && mobileProjectObserver.observe(el))
    mobileDetailRefs.value.forEach((el, index) => {
      if (!el) return

      if (el.getBoundingClientRect().top < window.innerHeight * 0.92) {
        mobileVisibleFlags.value[index] = true
        return
      }

      mobileRevealObserver.observe(el)
    })
  })
}

function updateCompactMode(event) {
  isCompact.value = event.matches
  if (event.matches) {
    nextTick(observeMobileProjects)
  } else {
    disconnectMobileObservers()
    nextTick(updateActiveFromScroll)
  }
}

onMounted(() => {
  observeBanner()
  compactQuery = window.matchMedia('(max-width: 980px)')
  updateCompactMode(compactQuery)
  if (compactQuery.addEventListener) {
    compactQuery.addEventListener('change', updateCompactMode)
  } else {
    compactQuery.addListener(updateCompactMode)
  }
  nextTick(updateActiveFromScroll)
  nextTick(observeMobileProjects)
  window.addEventListener('scroll', queueActiveUpdate, { passive: true })
  window.addEventListener('resize', queueActiveUpdate)
})

onBeforeUnmount(() => {
  disconnectMobileObservers()
  if (compactQuery?.removeEventListener) {
    compactQuery.removeEventListener('change', updateCompactMode)
  } else {
    compactQuery?.removeListener(updateCompactMode)
  }
  window.removeEventListener('scroll', queueActiveUpdate)
  window.removeEventListener('resize', queueActiveUpdate)
  cancelAnimationFrame(scrollFrame)
})
</script>

<style scoped>
.fade-up { opacity: 0; transform: translateY(20px); transition: opacity 0.5s ease, transform 0.5s ease; }
.fade-up.visible { opacity: 1; transform: translateY(0); }

#portfolio { background: var(--black); color: var(--white); }

.portfolio-banner { position: relative; width: 100%; height: 260px; border-bottom: 1px solid #222; }
.portfolio-hero-img { width: 100%; height: 100%; object-fit: cover; display: block; filter: brightness(0.35); }
.portfolio-banner-title { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; }
.section-title-box { display: inline-block; border: 1.5px solid var(--white); color: var(--white); padding: 14px 56px; font-family: var(--font-label); font-size: 0.85rem; letter-spacing: 6px; text-transform: uppercase; font-weight: 600; }

.portfolio-story {
  position: relative;
  min-height: calc((var(--detail-count) * 58vh) + 68vh);
  border-top: 1px solid #222;
  border-bottom: 1px solid #222;
}

.project-sticky {
  position: sticky;
  top: 60px;
  min-height: calc(100vh - 60px);
  display: flex;
  align-items: center;
  z-index: 2;
  background: var(--black);
}

.project-layout {
  width: 100%;
  max-width: min(1680px, calc(100vw - clamp(80px, 8vw, 150px)));
  margin: 0 auto;
  padding: clamp(54px, 7vw, 92px) clamp(24px, 3.6vw, 64px);
  display: grid;
  grid-template-columns: minmax(340px, 0.34fr) minmax(0, 0.66fr);
  gap: clamp(52px, 5.8vw, 104px);
  align-items: center;
}

.project-headline {
  font-family: var(--font-body);
  font-size: clamp(2.45rem, 4.55vw, 4.55rem);
  line-height: 0.96;
  font-weight: 700;
  letter-spacing: 0;
  margin-bottom: clamp(32px, 5vw, 58px);
}

.workflow-emphasis {
  position: relative;
  display: inline-block;
  color: #e4d7bc;
  font-family: inherit;
  font-weight: inherit;
  line-height: inherit;
  letter-spacing: 0;
}

.workflow-emphasis::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0.08em;
  height: 0.05em;
  background: linear-gradient(90deg, rgba(228, 215, 188, 0.66), rgba(245, 245, 245, 0.18));
  transform: skewX(-8deg);
  transform-origin: left center;
}

.project-kicker {
  font-family: var(--font-label);
  font-size: 0.72rem;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: #5b5b5b;
  margin-bottom: 18px;
}

.project-index {
  display: flex;
  flex-direction: column;
  border-top: 1px solid #242424;
}

.project-choice {
  width: 100%;
  background: transparent;
  border: 0;
  border-bottom: 1px solid #242424;
  color: #5d5d5d;
  cursor: pointer;
  padding: 18px 0 20px;
  text-align: left;
  transition: color 0.22s ease;
}

.choice-heading {
  display: grid;
  grid-template-columns: 34px minmax(0, 1fr);
  gap: 14px;
  align-items: baseline;
}

.choice-number,
.choice-title {
  font-family: var(--font-body);
  font-weight: 700;
  letter-spacing: 0;
}

.choice-number {
  font-size: 0.88rem;
  color: #474747;
}

.choice-title {
  font-size: clamp(1.35rem, 2vw, 1.75rem);
  line-height: 1.08;
}

.choice-summary {
  display: block;
  max-width: 500px;
  margin: 12px 0 0 48px;
  color: #9d9d9d;
  font-size: 0.92rem;
  line-height: 1.55;
  opacity: 0;
  max-height: 0;
  overflow: hidden;
  transform: translateY(-4px);
  transition: opacity 0.22s ease, max-height 0.22s ease, transform 0.22s ease;
}

.project-choice:hover,
.project-choice.active {
  color: var(--white);
}

.project-choice.active .choice-summary {
  opacity: 1;
  max-height: 150px;
  transform: translateY(0);
}

.project-choice:focus-visible {
  outline: 1px solid #777;
  outline-offset: 8px;
}

.project-stage {
  min-width: 0;
}

.detail-shift-enter-active,
.detail-shift-leave-active {
  transition: opacity 0.24s ease;
}

.detail-shift-enter-from,
.detail-shift-leave-to {
  opacity: 0;
}

.preview-head,
.project-tag {
  font-family: var(--font-label);
  text-transform: uppercase;
}

.project-preview {
  --preview-media-height: clamp(320px, 43vh, 440px);
  min-width: 0;
}

.project-preview > .preview-head,
.project-preview > .video-frame,
.project-preview > .project-details {
  width: min(100%, calc(var(--preview-media-height) * 16 / 9));
  margin-inline: auto;
}

.preview-head {
  display: flex;
  justify-content: space-between;
  gap: 18px;
  margin-bottom: 14px;
  font-size: 0.72rem;
  letter-spacing: 4px;
  color: #666;
}

.video-frame {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  background: #080808;
  border: 1px solid #242424;
  overflow: hidden;
}
.video-frame iframe { position: absolute; inset: 0; width: 100%; height: 100%; }
.video-frame::after {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  border: 1px solid rgba(255, 255, 255, 0.045);
}
.video-frame-empty {
  display: grid;
  place-items: center;
  background:
    linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px),
    linear-gradient(0deg, rgba(255,255,255,0.035) 1px, transparent 1px),
    #0b0b0b;
  background-size: 44px 44px;
}
.video-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 10px;
  padding: 28px;
}
.placeholder-number {
  width: 42px;
  height: 42px;
  border: 1px solid #333;
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-family: var(--font-display);
  color: #777;
}
.placeholder-label {
  font-family: var(--font-label);
  font-size: 0.64rem;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: #555;
}
.placeholder-title {
  font-family: var(--font-display);
  font-size: clamp(1.55rem, 3.8vw, 3.2rem);
  color: #d8d8d8;
}

.project-details {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(176px, 0.42fr);
  gap: clamp(22px, 3vw, 36px);
  align-items: stretch;
  height: clamp(240px, 25vh, 300px);
  padding-top: clamp(22px, 3vw, 34px);
}

.project-tag {
  font-size: 0.66rem;
  letter-spacing: 4px;
  color: #666;
  margin-bottom: 16px;
}

.detail-copy {
  min-width: 0;
  min-height: 0;
  padding-top: 2px;
}

.detail-count {
  font-family: var(--font-label);
  font-size: 0.68rem;
  letter-spacing: 3px;
  color: #5f5f5f;
  margin-bottom: 14px;
}

.detail-copy h3 {
  font-family: var(--font-body);
  font-size: clamp(1.85rem, 3.3vw, 3.4rem);
  line-height: 1;
  font-weight: 700;
  letter-spacing: 0;
  margin-bottom: 14px;
}

.detail-copy p {
  max-width: 680px;
  color: #b8b8b8;
  font-size: clamp(1rem, 1.55vw, 1.2rem);
  line-height: 1.68;
}

.detail-tools {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 22px;
  align-items: flex-end;
  padding-top: 10px;
}

.detail-steps {
  display: flex;
  gap: 9px;
}

.detail-step {
  width: 34px;
  height: 2px;
  border: 0;
  padding: 0;
  background: #343434;
  cursor: pointer;
  transition: background 0.22s ease, width 0.22s ease;
}

.detail-step.active {
  width: 54px;
  background: var(--white);
}

.detail-step:focus-visible {
  outline: 1px solid #777;
  outline-offset: 7px;
}

.project-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  list-style: none;
  justify-content: flex-end;
}
.project-stack li {
  border: 1px solid #2b2b2b;
  color: #878787;
  font-family: var(--font-label);
  font-size: 0.68rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  padding: 7px 10px;
}

.portfolio-mobile {
  padding: 42px 20px 56px;
  border-top: 1px solid #222;
}

.mobile-section-head {
  margin-bottom: 34px;
}

.mobile-section-head .project-headline {
  font-size: clamp(2.25rem, 12vw, 3.7rem);
  line-height: 0.98;
}

.mobile-project-current {
  position: sticky;
  top: 58px;
  z-index: 5;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  min-height: 46px;
  margin: 0 -20px 28px;
  padding: 12px 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(17, 17, 17, 0.88);
  backdrop-filter: blur(12px);
}

.mobile-project-current span,
.mobile-project-current strong {
  font-family: var(--font-label);
  text-transform: uppercase;
}

.mobile-project-current span {
  color: #696969;
  font-size: 0.68rem;
  letter-spacing: 3px;
}

.mobile-project-current strong {
  color: var(--white);
  font-size: 0.82rem;
  letter-spacing: 4px;
  font-weight: 600;
}

.mobile-project {
  padding: 0 0 42px;
  border-bottom: 1px solid #252525;
  margin-bottom: 42px;
}

.mobile-project:last-child {
  margin-bottom: 0;
}

.mobile-project-head {
  display: flex;
  justify-content: space-between;
  gap: 18px;
  margin-bottom: 12px;
  color: #666;
  font-family: var(--font-label);
  font-size: 0.68rem;
  letter-spacing: 3px;
  text-transform: uppercase;
}

.mobile-media {
  margin-bottom: 22px;
}

.mobile-project-copy {
  margin-bottom: 22px;
}

.mobile-project-copy h3 {
  font-family: var(--font-body);
  font-size: clamp(2rem, 11vw, 3.15rem);
  line-height: 1;
  font-weight: 700;
  letter-spacing: 0;
  margin-bottom: 10px;
}

.mobile-project-copy p {
  color: #b9b9b9;
  font-size: 1rem;
  line-height: 1.62;
}

.mobile-detail-list {
  border-top: 1px solid #252525;
  margin-top: 24px;
}

.mobile-detail {
  display: grid;
  grid-template-columns: 34px minmax(0, 1fr);
  gap: 14px;
  padding: 18px 0;
  border-bottom: 1px solid #252525;
}

.mobile-reveal {
  opacity: 0.18;
  transform: translateY(18px);
  transition: opacity 0.48s ease, transform 0.48s ease, border-color 0.48s ease;
}

.mobile-reveal.visible {
  opacity: 1;
  transform: translateY(0);
  border-bottom-color: #343434;
}

.mobile-detail > span {
  color: #555;
  font-family: var(--font-label);
  font-size: 0.7rem;
  letter-spacing: 2px;
}

.mobile-detail h4 {
  font-family: var(--font-body);
  font-size: 1.2rem;
  line-height: 1.15;
  font-weight: 700;
  letter-spacing: 0;
  margin-bottom: 8px;
}

.mobile-detail p {
  color: #a9a9a9;
  font-size: 0.96rem;
  line-height: 1.58;
}

.mobile-stack {
  justify-content: flex-start;
  margin-top: 22px;
}

@media (max-width: 980px) {
  .project-sticky {
    position: relative;
    top: 0;
    min-height: auto;
  }

  .project-layout {
    grid-template-columns: 1fr;
    gap: 28px;
  }

  .project-headline {
    margin-bottom: 36px;
  }

  .project-stage {
    grid-template-columns: 1fr;
  }

  .project-details {
    grid-template-columns: 1fr;
    height: auto;
    min-height: 250px;
  }

  .detail-tools {
    align-items: flex-start;
  }

  .project-stack {
    justify-content: flex-start;
  }
}

@media (max-width: 640px) {
  .portfolio-banner { height: 220px; }
  .section-title-box {
    padding: 12px 36px;
    font-size: 0.75rem;
    letter-spacing: 5px;
  }
  .project-layout { padding: 42px 20px 54px; }
  .project-headline { font-size: clamp(2.35rem, 13vw, 3.8rem); }
  .choice-heading { grid-template-columns: 28px minmax(0, 1fr); }
  .choice-summary { margin-left: 42px; }
  .preview-head { flex-direction: column; }
  .detail-copy h3 { font-size: clamp(2rem, 11vw, 3.3rem); }
  .project-stack li { font-size: 0.64rem; }
  .placeholder-title { font-size: clamp(1.8rem, 10vw, 2.8rem); }
  .mobile-project-head {
    flex-direction: column;
    gap: 5px;
  }
  .mobile-project-current {
    top: 54px;
  }
  .mobile-project-current strong {
    letter-spacing: 3px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .project-choice,
  .choice-summary,
  .detail-step,
  .mobile-reveal,
  .detail-shift-enter-active,
  .detail-shift-leave-active {
    transition-duration: 0.001ms !important;
  }
  .mobile-reveal {
    opacity: 1;
    transform: none;
  }
}
</style>
