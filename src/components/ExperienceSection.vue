<template>
  <section id="experience">
    <div class="section-header fade-up" :class="{ visible: headerVisible }" ref="headerRef">
      <div class="section-title-box">Experience</div>
      <AppOrnament />
    </div>

    <div class="timeline">
      <div
        v-for="(item, i) in experience"
        :key="i"
        :class="['timeline-item', { visible: visibleFlags[i] }]"
        :ref="el => { if (el) elRefs[i] = el }"
      >
        <div class="timeline-marker">
          <div class="timeline-dot" />
          <div class="timeline-line" v-if="i < experience.length - 1" />
        </div>
        <div class="timeline-content">
          <div class="timeline-meta">
            <span class="timeline-date">{{ item.date }}</span>
            <span class="timeline-org">{{ item.org }}</span>
          </div>
          <h3 class="timeline-role">{{ item.role }}</h3>
          <p class="timeline-project" v-if="item.project">{{ item.project }}</p>
          <ul class="timeline-bullets">
            <li v-for="(b, j) in item.bullets" :key="j">{{ b }}</li>
          </ul>
          <div class="timeline-tags" v-if="item.tags">
            <span v-for="tag in item.tags" :key="tag" class="tag">{{ tag }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import { useFadeUp, useFadeUpSingle } from '@/composables/useAnimate.js'
import AppOrnament from './AppOrnament.vue'

const experience = [
  {
    date: '2026',
    org: 'Commissioned — Student Client',
    role: 'Fullstack Developer',
    project: 'Training and Development Management System (Core3HireUps)',
    bullets: [
      'Shipped a full-stack LMS on Laravel 12 and PHP 8.2 with Blade, Vite, Tailwind CSS, Alpine.js, and Axios; auth via Laravel Breeze and Sanctum with custom RBAC, API key validation, and 2FA.',
      'Owned core domains: skill catalogs, gap analysis, MCQ assessments, course lifecycle, training assignments, certificates, employee profiles, and in-app and email notifications with queue workers.',
      'Built reporting workflows with DomPDF and Excel, added Pest coverage for key flows, and connected to 3 external systems via RESTful API.',
    ],
    tags: ['Laravel 12', 'PHP 8.2', 'Vue.js', 'MySQL', 'REST API'],
  },
  {
    date: '2026',
    org: 'Bestlink College of the Philippines',
    role: 'Fullstack Developer',
    project: 'OSAS | Campus Safety and Operations Platform',
    bullets: [
      'Built a full-stack school safety platform centered on incident reporting and tracking with role-based access for students, teachers, staff, admins, officers, and prefects.',
      'Implemented guided incident reporting with image upload, session persistence, and clear tracking across each report status.',
      'Added realtime updates via Pusher and Laravel Echo, incident and floor-plan map views, and modular tools for clinic, prefect, student, and facility management.',
      'Added PDF and Excel export, Laravel Sanctum API for authenticated report access, and full incident lifecycle management with archiving.',
    ],
    tags: ['Laravel 11', 'PHP 8.2', 'Pusher', 'Alpine.js', 'Tailwind', 'MySQL'],
  },
  {
    date: '2025',
    org: 'Commissioned — Student Client',
    role: 'Fullstack Developer',
    project: 'Facility and Event Reservation Management System (FERMS)',
    bullets: [
      'Built a comprehensive facility and event management system streamlining venue booking for 24+ academic departments, improving resource allocation transparency.',
      'Engineered real-time filtering and search across bookings with automated status tracking, document management, and post-event compliance monitoring.',
      'Designed multi-step booking forms, committee assignment management, and administrative approval workflows; integrated with 2 external systems via RESTful API.',
    ],
    tags: ['Laravel', 'PHP', 'Blade', 'MySQL', 'REST API'],
  },
  {
    date: '2025 – 2026',
    org: 'Bestlink College of the Philippines',
    role: 'Lead Programmer — BSIT Capstone Cluster',
    project: null,
    bullets: [
      'Served as lead programmer for a cluster of 10 capstone groups (50 students), providing technical guidance on system architecture, debugging, and development throughout the academic year.',
      'Reviewed codebases and advised on database design, API structure, and Laravel best practices across multiple teams working on diverse web systems.',
    ],
    tags: ['Mentorship', 'Laravel', 'System Architecture'],
  },
  {
    date: 'May – July 2025',
    org: 'VXI Global Holdings B.V.',
    role: 'IT Desktop Support - Internship',
    project: null,
    bullets: [
      'Completed 250 hours of on-the-job training under the Information Technology Department.',
      'Performed IT desktop support tasks, rated outstanding in general behavior, attitude, and performance.',
    ],
    tags: ['IT Support', 'Desktop Support', 'OJT'],
  },
]

const { elRef: headerRef, visible: headerVisible, observe: observeHeader } = useFadeUpSingle()
const { elRefs, visibleFlags, observe } = useFadeUp(experience.length, 100)

onMounted(() => {
  observeHeader()
  observe()
})
</script>

<style scoped>
.fade-up { opacity: 0; transform: translateY(20px); transition: opacity 0.5s ease, transform 0.5s ease; }
.fade-up.visible { opacity: 1; transform: translateY(0); }

#experience { background: var(--black); padding-bottom: 60px; }

.section-header { text-align: center; padding: 90px 20px 60px; }
.section-title-box { display: inline-block; border: 1.5px solid var(--white); color: var(--white); padding: 14px 56px; font-family: var(--font-label); font-size: 0.85rem; letter-spacing: 6px; text-transform: uppercase; font-weight: 600; margin-bottom: 32px; }

.timeline { max-width: 780px; margin: 0 auto; padding: 0 40px 60px; }

.timeline-item { display: flex; gap: 24px; opacity: 0; transform: translateY(18px); transition: opacity 0.45s ease, transform 0.45s ease; }
.timeline-item.visible { opacity: 1; transform: translateY(0); }

.timeline-marker { display: flex; flex-direction: column; align-items: center; flex-shrink: 0; padding-top: 4px; }
.timeline-dot { width: 10px; height: 10px; border-radius: 50%; border: 1.5px solid var(--white); background: var(--black); flex-shrink: 0; }
.timeline-line { width: 1px; flex: 1; background: #333; margin-top: 6px; min-height: 40px; }

.timeline-content { padding-bottom: 56px; flex: 1; }
.timeline-meta { display: flex; gap: 12px; align-items: center; margin-bottom: 6px; flex-wrap: wrap; }
.timeline-date { font-family: var(--font-label); font-size: 0.68rem; letter-spacing: 3px; color: #888; text-transform: uppercase; }
.timeline-org { font-family: var(--font-label); font-size: 0.68rem; letter-spacing: 2px; color: #777; text-transform: uppercase; }
.timeline-org::before { content: '//'; margin-right: 10px; color: #444; }
.timeline-role { font-family: var(--font-label); font-size: 0.9rem; font-weight: 600; letter-spacing: 2px; color: var(--white); margin-bottom: 4px; }
.timeline-project { font-family: var(--font-display); font-size: 1.15rem; font-weight: 400; color: #ccc; margin-bottom: 16px; }

.timeline-bullets { list-style: none; padding: 0; margin: 0 0 14px; }
.timeline-bullets li { font-size: 0.84rem; color: #999; line-height: 1.8; padding-left: 14px; position: relative; margin-bottom: 10px; }
.timeline-bullets li::before { content: '—'; position: absolute; left: 0; color: #666; }

.tag { font-family: var(--font-label); font-size: 0.62rem; letter-spacing: 2px; text-transform: uppercase; color: #888; border: 1px solid #444; padding: 4px 12px; }
.timeline-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 16px; }

@media (max-width: 768px) {
  .timeline { padding: 0 20px 40px; }
  .section-header { padding: 60px 20px 40px; }
  .section-title-box { padding: 12px 28px; }
}
</style>
