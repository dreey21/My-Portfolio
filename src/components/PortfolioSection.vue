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
      :style="projectStoryStyle"
    >
      <div class="project-sticky">
        <div class="project-flow-backdrop" aria-hidden="true">
          <span
            v-for="segment in flowSegments"
            :key="segment.id"
            class="flow-segment"
            :class="{
              active: activeTimelineIndex >= segment.step,
              current: activeTimelineIndex === segment.step,
            }"
            :style="{
              '--segment-x': segment.x,
              '--segment-y': segment.y,
              '--segment-w': segment.w,
              '--segment-h': segment.h,
            }"
          />
          <span
            v-for="branch in flowBranches"
            :key="branch.id"
            class="flow-branch"
            :style="{
              '--branch-x': branch.x,
              '--branch-y': branch.y,
              '--branch-w': branch.w,
              '--branch-h': branch.h,
            }"
          />
          <span
            v-for="module in flowModules"
            :key="module.id"
            class="flow-module"
            :style="{
              '--module-x': module.x,
              '--module-y': module.y,
              '--module-w': module.w,
              '--module-h': module.h,
            }"
          />
          <span
            v-for="ticket in flowTickets"
            :key="ticket.id"
            class="flow-ticket"
            :class="[
              `flow-ticket-${ticket.tone}`,
              {
                active: activeTimelineIndex === ticket.step,
                nearby: Math.abs(activeTimelineIndex - ticket.step) <= 1,
              },
            ]"
            :style="{
              '--ticket-x': ticket.x,
              '--ticket-y': ticket.y,
              '--ticket-w': ticket.w,
            }"
          >
            <span class="ticket-dot" />
            <span class="ticket-line ticket-line-primary" />
            <span class="ticket-line ticket-line-long" />
            <span class="ticket-line ticket-line-short" />
            <span class="ticket-cell ticket-cell-one" />
            <span class="ticket-cell ticket-cell-two" />
          </span>
        </div>

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
                  <span class="placeholder-label">Pending</span>
                  <span class="placeholder-title">Video Coming Soon</span>
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

      <article
        v-for="(project, projectIndex) in projects"
        :key="project.title"
        class="mobile-project"
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
            <span class="placeholder-label">Pending</span>
            <span class="placeholder-title">Video Coming Soon</span>
          </div>
        </div>

        <div class="mobile-project-copy">
          <div class="project-tag">{{ project.tag }}</div>
          <h3>{{ project.title }}</h3>
          <p>{{ project.context }}</p>
        </div>

        <div class="mobile-detail-carousel">
          <div
            class="mobile-detail-track"
            :ref="el => setDetailTrackRef(el, projectIndex)"
          >
            <article
              v-for="(detail, detailIndex) in projectDetails(project)"
              :key="detail.title"
              class="mobile-detail-card"
              :class="`tone-${cardTone(detailIndex)}`"
              :ref="el => setDetailCardRef(el, projectIndex, detailIndex)"
            >
              <!-- FERMS icon: Calendar + Map Pin -->
              <svg
                v-if="project.title === 'FERMS'"
                class="mobile-detail-mark"
                viewBox="0 0 140 120"
                aria-hidden="true"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <!-- Calendar shadow -->
                <rect x="5" y="26" width="88" height="76" rx="9" fill="#000" opacity="0.3"/>
                <!-- Calendar body -->
                <rect x="1" y="22" width="88" height="76" rx="9" fill="#1e1810"/>
                <!-- Calendar header -->
                <rect x="1" y="22" width="88" height="26" rx="9" fill="#b8912a"/>
                <rect x="1" y="38" width="88" height="10" fill="#b8912a"/>
                <!-- Rings -->
                <rect x="19" y="14" width="8" height="20" rx="4" fill="#e4d7bc"/>
                <rect x="59" y="14" width="8" height="20" rx="4" fill="#e4d7bc"/>
                <!-- Ring holes -->
                <circle cx="23" cy="26" r="3" fill="#1e1810"/>
                <circle cx="63" cy="26" r="3" fill="#1e1810"/>
                <!-- Day dots row 1 -->
                <circle cx="15" cy="60" r="4.5" fill="#3a2e1a"/>
                <circle cx="30" cy="60" r="4.5" fill="#3a2e1a"/>
                <circle cx="45" cy="60" r="4.5" fill="#c9a96b"/>
                <circle cx="60" cy="60" r="4.5" fill="#3a2e1a"/>
                <circle cx="75" cy="60" r="4.5" fill="#3a2e1a"/>
                <!-- Day dots row 2 -->
                <circle cx="15" cy="76" r="4.5" fill="#3a2e1a"/>
                <circle cx="30" cy="76" r="4.5" fill="#3a2e1a"/>
                <circle cx="45" cy="76" r="4.5" fill="#3a2e1a"/>
                <circle cx="60" cy="76" r="4.5" fill="#3a2e1a"/>
                <!-- Pin drop shadow -->
                <ellipse cx="108" cy="114" rx="10" ry="4" fill="#000" opacity="0.28"/>
                <!-- Pin body -->
                <path d="M108 46 C92 46 80 58 80 72 C80 90 108 116 108 116 C108 116 136 90 136 72 C136 58 124 46 108 46Z" fill="#c0392b"/>
                <!-- Pin highlight -->
                <path d="M108 46 C95 46 86 55 84 67 C86 56 95 50 108 50 C121 50 130 56 132 67 C130 55 121 46 108 46Z" fill="#e05a4a" opacity="0.55"/>
                <!-- Pin inner ring -->
                <circle cx="108" cy="74" r="13" fill="#fff" opacity="0.92"/>
                <circle cx="108" cy="74" r="8" fill="#c0392b"/>
              </svg>

              <!-- OSAS icon: Person + Alert Badge -->
              <svg
                v-else-if="project.title === 'OSAS'"
                class="mobile-detail-mark"
                viewBox="0 0 140 120"
                aria-hidden="true"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <!-- Person shadow -->
                <ellipse cx="48" cy="112" rx="32" ry="5" fill="#000" opacity="0.22"/>
                <!-- Torso / uniform -->
                <path d="M16 82 C16 70 80 70 80 82 L84 110 C84 114 12 114 12 110Z" fill="#1a3a50"/>
                <!-- Collar shadow -->
                <path d="M38 70 L48 84 L58 70" fill="#16303f"/>
                <!-- Badge / tie detail -->
                <rect x="45" y="74" width="6" height="22" rx="2" fill="#2a5a78" opacity="0.8"/>
                <!-- Neck -->
                <rect x="38" y="52" width="20" height="22" rx="7" fill="#d4956a"/>
                <!-- Head -->
                <ellipse cx="48" cy="46" rx="22" ry="24" fill="#e8a87c"/>
                <!-- Hair -->
                <path d="M26 38 C26 20 70 20 70 38 C70 29 62 20 48 20 C34 20 26 29 26 38Z" fill="#2c1f10"/>
                <!-- Ears -->
                <ellipse cx="26" cy="46" rx="4" ry="6" fill="#d4956a"/>
                <ellipse cx="70" cy="46" rx="4" ry="6" fill="#d4956a"/>
                <!-- Eyes -->
                <ellipse cx="41" cy="46" rx="3.5" ry="3.5" fill="#1a0e06"/>
                <ellipse cx="55" cy="46" rx="3.5" ry="3.5" fill="#1a0e06"/>
                <circle cx="42.2" cy="45" r="1.3" fill="#fff" opacity="0.7"/>
                <circle cx="56.2" cy="45" r="1.3" fill="#fff" opacity="0.7"/>
                <!-- Nose -->
                <path d="M46 52 Q48 55 50 52" stroke="#c0845a" stroke-width="1.2" stroke-linecap="round"/>
                <!-- Mouth -->
                <path d="M43 59 Q48 63 53 59" stroke="#c0845a" stroke-width="1.4" stroke-linecap="round"/>
                <!-- Chest shield -->
                <path d="M40 78 L48 74 L56 78 L56 94 C56 98 48 102 48 102 C48 102 40 98 40 94Z" fill="#2a6a9a" opacity="0.65"/>
                <!-- Shield checkmark -->
                <path d="M44 86 L47 90 L54 82" stroke="#7ab8d8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <!-- Alert badge circle -->
                <circle cx="108" cy="24" r="22" fill="#c0392b"/>
                <circle cx="108" cy="24" r="18" fill="#e04040"/>
                <!-- Exclamation body -->
                <rect x="106" y="12" width="4" height="11" rx="2" fill="#fff"/>
                <!-- Exclamation dot -->
                <circle cx="108" cy="29.5" r="2.8" fill="#fff"/>
              </svg>

              <!-- Core3HireUps icon: Briefcase + Teal Chart -->
              <svg
                v-else-if="project.title === 'Core3HireUps'"
                class="mobile-detail-mark"
                viewBox="0 0 140 120"
                aria-hidden="true"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <!-- Briefcase shadow -->
                <rect x="8" y="50" width="90" height="64" rx="9" fill="#000" opacity="0.28"/>
                <!-- Briefcase body -->
                <rect x="4" y="46" width="90" height="64" rx="9" fill="#0f2a38"/>
                <!-- Briefcase lid -->
                <rect x="4" y="46" width="90" height="28" rx="9" fill="#163344"/>
                <rect x="4" y="60" width="90" height="14" fill="#163344"/>
                <!-- Handle outer -->
                <path d="M30 46 L30 35 C30 27 68 27 68 35 L68 46" stroke="#1e4a60" stroke-width="7" stroke-linecap="round"/>
                <!-- Handle inner highlight -->
                <path d="M30 46 L30 35 C30 27 68 27 68 35 L68 46" stroke="#2a6a88" stroke-width="3" stroke-linecap="round"/>
                <!-- Clasp plate -->
                <rect x="38" y="58" width="22" height="13" rx="4" fill="#1a3d52"/>
                <!-- Clasp lock body -->
                <rect x="42" y="61" width="14" height="7" rx="3" fill="#2a7a8a"/>
                <!-- Clasp lock dot -->
                <circle cx="49" cy="64.5" r="2.2" fill="#3a9aaa"/>
                <!-- Chart bars -->
                <rect x="14" y="78" width="12" height="26" rx="2" fill="#1e5568" opacity="0.8"/>
                <rect x="30" y="67" width="12" height="37" rx="2" fill="#2a7a8a" opacity="0.9"/>
                <rect x="46" y="57" width="12" height="47" rx="2" fill="#3a9aaa"/>
                <rect x="62" y="65" width="12" height="39" rx="2" fill="#2a7a8a" opacity="0.9"/>
                <!-- Trend line -->
                <polyline points="20,102 36,84 52,64 68,76" stroke="#7adce8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                <!-- Trend dots -->
                <circle cx="20" cy="102" r="3.5" fill="#7adce8"/>
                <circle cx="36" cy="84" r="3.5" fill="#7adce8"/>
                <circle cx="52" cy="64" r="3.5" fill="#7adce8"/>
                <circle cx="68" cy="76" r="3.5" fill="#7adce8"/>
                <!-- Person silhouette -->
                <circle cx="116" cy="54" r="10" fill="#1e4a60"/>
                <circle cx="116" cy="50" r="7" fill="#d4a882"/>
                <path d="M104 70 C104 62 128 62 128 70" fill="#163344"/>
                <path d="M106 70 C106 64 126 64 126 70" fill="#1e5568"/>
              </svg>

              <span class="mobile-detail-number">{{ projectNumber(detailIndex) }}</span>
              <h4>{{ detail.title }}</h4>
              <p>{{ detail.body }}</p>
            </article>
          </div>

          <div class="mobile-detail-dots" aria-label="Project detail selector">
            <button
              v-for="(detail, detailIndex) in projectDetails(project)"
              :key="detail.title"
              type="button"
              :class="['detail-step', `tone-${cardTone(detailIndex)}`, { active: mobileDetailIndex[projectIndex] === detailIndex }]"
              :aria-label="`Show ${detail.title}`"
              @click="scrollToDetail(projectIndex, detailIndex)"
            />
          </div>
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
const scrollProgress = ref(0)
const detailTrackRefs = ref([])
const detailCardRefs = ref([])
const mobileDetailIndex = ref(projects.map(() => 0))
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
const activeTimelineIndex = computed(() => timelineIndexFor(activeProject.value, activeDetail.value))
const projectStoryStyle = computed(() => ({
  '--detail-count': timeline.value.length,
  '--story-progress': scrollProgress.value.toFixed(4),
  '--story-grid-shift': `${scrollProgress.value * -220}px`,
}))
const flowSegments = [
  { id: 'segment-01', x: '21%', y: '-6%', w: '1px', h: '19%', step: 0 },
  { id: 'segment-02', x: '21%', y: '13%', w: '16%', h: '1px', step: 1 },
  { id: 'segment-03', x: '37%', y: '13%', w: '1px', h: '10%', step: 2 },
  { id: 'segment-04', x: '28%', y: '23%', w: '9%', h: '1px', step: 3 },
  { id: 'segment-05', x: '28%', y: '23%', w: '1px', h: '10%', step: 4 },
  { id: 'segment-06', x: '28%', y: '33%', w: '24%', h: '1px', step: 5 },
  { id: 'segment-07', x: '52%', y: '33%', w: '1px', h: '11%', step: 6 },
  { id: 'segment-08', x: '36%', y: '44%', w: '16%', h: '1px', step: 7 },
  { id: 'segment-09', x: '36%', y: '44%', w: '1px', h: '11%', step: 8 },
  { id: 'segment-10', x: '24%', y: '55%', w: '12%', h: '1px', step: 9 },
  { id: 'segment-11', x: '24%', y: '55%', w: '1px', h: '13%', step: 10 },
  { id: 'segment-12', x: '24%', y: '68%', w: '18%', h: '1px', step: 11 },
  { id: 'segment-13', x: '42%', y: '68%', w: '1px', h: '26%', step: 11 },
]
const flowBranches = [
  { id: 'branch-01', x: '11%', y: '16%', w: '10%', h: '9%' },
  { id: 'branch-02', x: '37%', y: '24%', w: '20%', h: '7%' },
  { id: 'branch-03', x: '52%', y: '39%', w: '16%', h: '8%' },
  { id: 'branch-04', x: '18%', y: '48%', w: '18%', h: '10%' },
  { id: 'branch-05', x: '7%', y: '61%', w: '17%', h: '8%' },
  { id: 'branch-06', x: '42%', y: '72%', w: '22%', h: '9%' },
]
const flowModules = [
  { id: 'module-01', x: '7%', y: '9%', w: '18%', h: '15%' },
  { id: 'module-02', x: '59%', y: '36%', w: '17%', h: '13%' },
  { id: 'module-03', x: '12%', y: '70%', w: '21%', h: '14%' },
]
const flowTickets = [
  { id: 'ticket-01', x: '17%', y: '-4%', w: '34%', tone: 'warm', step: 0 },
  { id: 'ticket-02', x: '34%', y: '8%', w: '31%', tone: 'dim', step: 1 },
  { id: 'ticket-03', x: '9%', y: '18%', w: '39%', tone: 'amber', step: 2 },
  { id: 'ticket-04', x: '46%', y: '27%', w: '33%', tone: 'cool', step: 3 },
  { id: 'ticket-05', x: '21%', y: '38%', w: '28%', tone: 'warm', step: 4 },
  { id: 'ticket-06', x: '4%', y: '49%', w: '36%', tone: 'dim', step: 5 },
  { id: 'ticket-07', x: '39%', y: '58%', w: '31%', tone: 'amber', step: 6 },
  { id: 'ticket-08', x: '15%', y: '67%', w: '38%', tone: 'cool', step: 7 },
  { id: 'ticket-09', x: '30%', y: '78%', w: '33%', tone: 'warm', step: 8 },
  { id: 'ticket-10', x: '3%', y: '88%', w: '36%', tone: 'dim', step: 9 },
  { id: 'ticket-11', x: '38%', y: '98%', w: '34%', tone: 'amber', step: 10 },
  { id: 'ticket-12', x: '20%', y: '109%', w: '39%', tone: 'cool', step: 11 },
]
let scrollFrame = 0
let manualSelectionUntil = 0
let compactQuery
let detailObservers = []

function projectDetails(project) {
  return project.details?.length
    ? project.details
    : project.notes.map((note, index) => ({ title: `Detail ${index + 1}`, body: note }))
}

function projectNumber(index) {
  return String(index + 1).padStart(2, '0')
}

const cardTones = ['warm', 'dim', 'amber', 'cool']
function cardTone(index) {
  return cardTones[index % cardTones.length]
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

function setDetailTrackRef(el, projectIndex) {
  if (el) detailTrackRefs.value[projectIndex] = el
}

function setDetailCardRef(el, projectIndex, detailIndex) {
  if (!el) return
  if (!detailCardRefs.value[projectIndex]) detailCardRefs.value[projectIndex] = []
  detailCardRefs.value[projectIndex][detailIndex] = el
}

function scrollToDetail(projectIndex, detailIndex) {
  const card = detailCardRefs.value[projectIndex]?.[detailIndex]
  card?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
}

function disconnectDetailObservers() {
  detailObservers.forEach(observer => observer.disconnect())
  detailObservers = []
}

function observeDetailCarousels() {
  disconnectDetailObservers()
  if (typeof IntersectionObserver === 'undefined') return

  detailTrackRefs.value.forEach((track, projectIndex) => {
    if (!track) return

    const observer = new IntersectionObserver((entries) => {
      let bestEntry = null
      entries.forEach((entry) => {
        if (!bestEntry || entry.intersectionRatio > bestEntry.intersectionRatio) {
          bestEntry = entry
        }
      })
      if (bestEntry && bestEntry.intersectionRatio > 0.55) {
        const cards = detailCardRefs.value[projectIndex] || []
        const index = cards.indexOf(bestEntry.target)
        if (index !== -1) mobileDetailIndex.value[projectIndex] = index
      }
    }, {
      root: track,
      threshold: [0.55, 0.75, 0.95],
    })

    ;(detailCardRefs.value[projectIndex] || []).forEach(card => card && observer.observe(card))
    detailObservers.push(observer)
  })
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
  if (isCompact.value || !storyRef.value) return

  const storyTop = storyRef.value.getBoundingClientRect().top + window.scrollY
  const scrollRange = Math.max(1, storyRef.value.offsetHeight - window.innerHeight)
  const progress = Math.min(1, Math.max(0, (window.scrollY - storyTop) / scrollRange))
  scrollProgress.value = progress

  if (Date.now() < manualSelectionUntil) return

  const nextIndex = Math.round(progress * (timeline.value.length - 1))

  setActiveFromTimelineIndex(Math.min(timeline.value.length - 1, Math.max(0, nextIndex)))
}

function queueActiveUpdate() {
  if (scrollFrame) return
  scrollFrame = requestAnimationFrame(updateActiveFromScroll)
}

function disconnectMobileObservers() {
  disconnectDetailObservers()
}

function observeMobileProjects() {
  disconnectMobileObservers()

  if (!isCompact.value) return

  nextTick(observeDetailCarousels)
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
  overflow: hidden;
}

.project-sticky::before {
  content: '';
  position: absolute;
  inset: -12% -8%;
  z-index: 0;
  pointer-events: none;
  background:
    linear-gradient(90deg, rgba(255,255,255,0.032) 1px, transparent 1px),
    linear-gradient(0deg, rgba(255,255,255,0.026) 1px, transparent 1px);
  background-size: 72px 72px;
  background-position: center var(--story-grid-shift);
  opacity: 0.48;
  transform: translateY(calc(var(--story-progress) * -18px));
  will-change: transform, background-position;
}

.project-sticky::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
  background:
    linear-gradient(115deg, rgba(228, 215, 188, 0.045), transparent 34%),
    linear-gradient(90deg, rgba(17, 17, 17, 0.94) 0%, rgba(17, 17, 17, 0.66) 52%, rgba(17, 17, 17, 0.93) 100%);
  opacity: 0.9;
}

.project-flow-backdrop {
  position: absolute;
  top: -30%;
  bottom: -54%;
  left: 34%;
  right: -2%;
  z-index: 1;
  pointer-events: none;
  opacity: 0.86;
  transform: translate3d(0, calc(var(--story-progress) * -880px), 0);
  transform-origin: center;
  will-change: transform;
}

.project-flow-backdrop::before,
.project-flow-backdrop::after {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.project-flow-backdrop::before {
  background:
    radial-gradient(circle at 42% 43%, rgba(228, 215, 188, 0.08), transparent 34%),
    linear-gradient(90deg, transparent 0%, rgba(17, 17, 17, 0.28) 78%, rgba(17, 17, 17, 0.82) 100%);
}

.project-flow-backdrop::after {
  background: linear-gradient(180deg, rgba(17, 17, 17, 0.96) 0%, transparent 14%, transparent 82%, rgba(17, 17, 17, 0.96) 100%);
}

.flow-ticket,
.flow-module,
.flow-segment,
.flow-branch {
  position: absolute;
  display: block;
}

.flow-segment {
  left: var(--segment-x);
  top: var(--segment-y);
  width: var(--segment-w);
  height: var(--segment-h);
  border-radius: 999px;
  background: rgba(216, 209, 189, 0.22);
  box-shadow: 0 0 0 1px rgba(216, 209, 189, 0.02);
  transition: background 0.42s ease, box-shadow 0.42s ease, opacity 0.42s ease;
}

.flow-segment.active {
  background: rgba(239, 228, 202, 0.4);
  box-shadow: 0 0 18px rgba(239, 228, 202, 0.06);
}

.flow-segment.current {
  background: rgba(239, 228, 202, 0.72);
  box-shadow: 0 0 24px rgba(239, 228, 202, 0.14);
}

.flow-branch {
  left: var(--branch-x);
  top: var(--branch-y);
  width: var(--branch-w);
  height: var(--branch-h);
  border-top: 1px solid rgba(216, 209, 189, 0.17);
  border-left: 1px solid rgba(216, 209, 189, 0.17);
  opacity: 0.78;
}

.flow-module {
  left: var(--module-x);
  top: var(--module-y);
  width: var(--module-w);
  height: var(--module-h);
  border: 1px solid rgba(239, 228, 202, 0.07);
  background: rgba(239, 228, 202, 0.018);
}

.flow-ticket {
  left: var(--ticket-x);
  top: var(--ticket-y);
  width: var(--ticket-w);
  height: 72px;
  border: 1px solid rgba(216, 209, 189, 0.09);
  border-radius: 7px;
  background: rgba(216, 209, 189, 0.035);
  opacity: 0.56;
  transform: translateX(calc(var(--story-progress) * -58px));
  transition: border-color 0.42s ease, background 0.42s ease, opacity 0.42s ease, transform 0.42s ease;
}

.flow-ticket.nearby {
  opacity: 0.8;
}

.flow-ticket.active {
  border-color: rgba(239, 228, 202, 0.32);
  background: rgba(239, 228, 202, 0.095);
  opacity: 0.96;
  transform: translateX(calc(var(--story-progress) * -58px)) translateY(-4px);
}

.ticket-dot,
.ticket-line,
.ticket-cell {
  position: absolute;
  display: block;
}

.ticket-dot {
  left: 22px;
  top: 28px;
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background: rgba(239, 228, 202, 0.68);
}

.flow-ticket-dim .ticket-dot { background: rgba(216, 209, 189, 0.34); }
.flow-ticket-amber .ticket-dot { background: rgba(201, 169, 107, 0.58); }
.flow-ticket-cool .ticket-dot { background: rgba(158, 183, 179, 0.48); }

.ticket-line {
  height: 3px;
  background: rgba(216, 209, 189, 0.14);
}

.ticket-line-primary {
  left: 50px;
  top: 22px;
  width: min(34%, 130px);
  background: rgba(239, 228, 202, 0.24);
}

.ticket-line-long {
  left: 50px;
  top: 41px;
  width: 56%;
}

.ticket-line-short {
  right: 30px;
  top: 24px;
  width: 46px;
}

.ticket-cell {
  right: 106px;
  width: 12px;
  height: 12px;
  border: 1px solid rgba(239, 228, 202, 0.13);
}

.ticket-cell-one {
  top: 21px;
}

.ticket-cell-two {
  top: 40px;
}

.project-layout {
  position: relative;
  z-index: 3;
  width: 100%;
  max-width: min(1680px, calc(100vw - clamp(48px, 5vw, 110px)));
  margin: 0 auto;
  padding: clamp(42px, 5vw, 64px) clamp(20px, 2.8vw, 46px);
  display: grid;
  grid-template-columns: minmax(300px, 0.34fr) minmax(0, 0.66fr);
  gap: clamp(44px, 6vw, 112px);
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
  position: relative;
  width: 100%;
  background: transparent;
  border: 0;
  border-bottom: 1px solid #242424;
  color: #5d5d5d;
  cursor: pointer;
  padding: 18px 0 20px 0;
  text-align: left;
  transition: border-color 0.28s ease, color 0.28s ease, opacity 0.28s ease, padding 0.28s ease;
}

.project-choice::before {
  content: '';
  position: absolute;
  left: -18px;
  top: 18px;
  bottom: 20px;
  width: 2px;
  background: linear-gradient(180deg, #e4d7bc, rgba(228, 215, 188, 0));
  opacity: 0;
  transform: scaleY(0.42);
  transform-origin: top center;
  transition: opacity 0.28s ease, transform 0.28s ease;
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
  transition: color 0.28s ease;
}

.choice-title {
  font-size: clamp(1.35rem, 2vw, 1.75rem);
  line-height: 1.08;
  transition: transform 0.28s ease;
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
  transition: opacity 0.28s ease, max-height 0.32s ease, transform 0.28s ease;
}

.project-choice:hover,
.project-choice.active {
  color: var(--white);
}

.project-choice.active {
  border-bottom-color: #393939;
  padding-left: 10px;
}

.project-choice.active::before {
  opacity: 1;
  transform: scaleY(1);
}

.project-choice.active .choice-number {
  color: #e4d7bc;
}

.project-choice.active .choice-title {
  transform: translateX(2px);
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
  --preview-media-height: clamp(280px, 40vh, 420px);
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
  height: clamp(210px, 22vh, 270px);
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

.mobile-detail-carousel {
  margin-top: 24px;
}

.mobile-detail-track {
  display: flex;
  gap: 14px;
  overflow-x: auto;
  overflow-y: visible;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  padding-top: 36px;
  padding-bottom: 2px;
  margin-top: -36px;
}

.mobile-detail-track::-webkit-scrollbar {
  display: none;
}

.mobile-detail-card {
  position: relative;
  flex: 0 0 86%;
  scroll-snap-align: start;
  border: 1px solid #242424;
  background: rgba(255, 255, 255, 0.015);
  padding: 30px 22px 24px;
  min-height: 168px;
  overflow: visible;
}

/* ── Per-project icon replacing the old generic ticket mark ── */
.mobile-detail-mark {
  position: absolute;
  top: -28px;
  right: -22px;
  width: 110px;
  height: auto;
  opacity: 0.92;
  transform: rotate(7deg);
  pointer-events: none;
  filter: drop-shadow(0 8px 18px rgba(0, 0, 0, 0.55));
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.mobile-detail-card:hover .mobile-detail-mark,
.mobile-detail-card:focus-within .mobile-detail-mark {
  opacity: 1;
  transform: rotate(9deg) translateY(-3px);
}

.mobile-detail-card::after {
  content: '';
  position: absolute;
  left: 22px;
  top: 0;
  width: 24px;
  height: 3px;
  background: var(--card-accent-solid, #e4d7bc);
  opacity: 0.75;
  transform: skewX(-10deg);
  transform-origin: left center;
}

.mobile-detail-card.tone-warm  { --card-accent-ghost: rgba(228, 215, 188, 0.18); --card-accent-solid: #e4d7bc; }
.mobile-detail-card.tone-dim   { --card-accent-ghost: rgba(216, 209, 189, 0.16); --card-accent-solid: #d8d1bd; }
.mobile-detail-card.tone-amber { --card-accent-ghost: rgba(201, 169, 107, 0.22); --card-accent-solid: #c9a96b; }
.mobile-detail-card.tone-cool  { --card-accent-ghost: rgba(158, 183, 179, 0.2);  --card-accent-solid: #9eb7b3; }

.mobile-detail-card .mobile-detail-number {
  position: relative;
  z-index: 1;
  display: block;
  color: var(--card-accent-solid, #888);
  font-family: var(--font-label);
  font-size: 0.7rem;
  letter-spacing: 2px;
  margin-bottom: 12px;
}

.mobile-detail-card h4 {
  position: relative;
  z-index: 1;
  font-family: var(--font-body);
  font-size: 1.2rem;
  line-height: 1.15;
  font-weight: 700;
  letter-spacing: 0;
  margin-bottom: 8px;
}

.mobile-detail-card p {
  position: relative;
  z-index: 1;
  color: #a9a9a9;
  font-size: 0.96rem;
  line-height: 1.58;
}

.mobile-detail-dots .detail-step.tone-warm.active  { background: #e4d7bc; }
.mobile-detail-dots .detail-step.tone-dim.active   { background: #d8d1bd; }
.mobile-detail-dots .detail-step.tone-amber.active { background: #c9a96b; }
.mobile-detail-dots .detail-step.tone-cool.active  { background: #9eb7b3; }

.mobile-detail-dots {
  display: flex;
  gap: 9px;
  margin-top: 16px;
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
}

@media (prefers-reduced-motion: reduce) {
  .project-choice,
  .choice-summary,
  .detail-step,
  .flow-segment,
  .flow-ticket,
  .detail-shift-enter-active,
  .detail-shift-leave-active {
    transition-duration: 0.001ms !important;
  }
  .project-sticky::before {
    transform: none;
  }
  .mobile-detail-track {
    scroll-behavior: auto;
  }
}
</style>