// ─── Services ──────────────────────────────────────────────────────────────
export const services = [
  {
    title: 'System Design',
    desc: 'I plan management system architecture before writing a single line of code, defining database schemas, entity relationships, and full workflow logic. Several of my systems were ideas I proposed, discussed, and scoped with clients myself.',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>`,
    center: false,
  },
  {
    title: 'Backend Development',
    desc: 'Using Laravel and PHP, I build and consume RESTful APIs, handle authentication, and write server-side logic with a focus on clean, maintainable code.',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M4 17l6-6-6-6M12 19h8"/></svg>`,
    center: false,
  },
  {
    title: 'Database Architecture',
    desc: 'I design normalized MySQL schemas from scratch, writing queries and structuring data as the foundation of every system I build.',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3"/></svg>`,
    center: false,
  },
  {
    title: 'API Development',
    desc: 'My management systems are API-integrated with other platforms, one connecting to three external systems and another to two, built collaboratively across a BSIT cluster of teams.',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><circle cx="12" cy="12" r="3"/><path d="M12 2v3m0 14v3m10-10h-3M5 12H2m15.07-7.07l-2.12 2.12M9.05 14.95l-2.12 2.12m14.14 0l-2.12-2.12M9.05 9.05L6.93 6.93"/></svg>`,
    center: false,
  },
  {
    title: 'Frontend Integration',
    desc: 'Primarily built with Laravel Blade, with a current transition into Vue.js SPAs. I connect frontends to backends and handle the full request cycle end to end.',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5M2 12l10 5 10-5"/></svg>`,
    center: true,
  },
]

// ─── Skills ────────────────────────────────────────────────────────────────
export const currentSkills = [
  { name: 'Laravel',    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg' },
  { name: 'PHP',        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-plain.svg' },
  { name: 'Vue.js',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg' },
  { name: 'MySQL',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
  { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'HTML5',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
  { name: 'CSS3',       icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
  { name: 'Tailwind',   icon: 'https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg' },
  { name: 'Git',        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
]

export const learningSkills = [
  { name: 'Docker',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
  { name: 'Linux',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg' },
  { name: 'Redis',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg' },
  { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
]

// ─── Portfolio Tabs ─────────────────────────────────────────────────────────
export const tabs = [
  { label: 'All',              value: 'all' },
  { label: 'Commissioned',     value: 'commissioned' },
  { label: 'Capstone',         value: 'capstone' },
  { label: 'Personal Projects', value: 'personal' },
]

// ─── Projects with YouTube embeds ───────────────────────────────────────────
// Replace youtubeId with your actual video IDs when ready.
// Set hasVideo: false to show a reserved video frame instead.
export const projects = [
  {
    title: 'FERMS',
    subtitle: 'Facility and Event Reservation Management System',
    tag: 'Commissioned / Fullstack',
    cat: 'commissioned',
    featured: true,
    hasVideo: true,
    youtubeId: 'I2tpe4FgIb0',
    desc: 'Facility and event booking platform for 24+ academic departments with real-time filtering, document management, post-event compliance monitoring, and integration with 2 external systems via RESTful API.',
    stack: ['Laravel', 'PHP', 'Blade', 'Alpine.js', 'MySQL', 'REST API'],
    label: 'Commissioned Project',
    year: '2026',
    role: 'Full-stack developer',
    summary: 'A booking and compliance system designed for academic facility reservations, documentation, and external service coordination.',
    context: 'Created for academic departments that needed a clearer reservation process from request submission through approval and post-event requirements.',
    details: [
      {
        title: 'Reservation Requests',
        body: 'Departments can submit facility and event requests with schedule details, documents, and the information staff need for review.',
      },
      {
        title: 'Availability Review',
        body: 'Filtering and status views help administrators compare requests, check venue availability, and avoid losing context across many departments.',
      },
      {
        title: 'Approval Workflow',
        body: 'Committee assignment and administrative review steps keep the booking process traceable from submission to decision.',
      },
      {
        title: 'Post-event Compliance',
        body: 'The system continues after approval by tracking required post-event documents and completion requirements.',
      },
    ],
    notes: [
      'The booking flow is structured around availability, documents, committee review, and status visibility.',
      'Post-event compliance is included so the system does not stop at reservation approval.',
      'Filtering and department-level views help staff manage many venue requests without losing context.',
    ],
  },
  {
    title: 'OSAS',
    subtitle: 'Campus Safety and Operations Platform',
    tag: 'Capstone / Fullstack / Realtime',
    cat: 'capstone',
    featured: true,
    hasVideo: true,
    youtubeId: 'kgC1ga-o0Og',
    desc: 'Full-stack school safety platform with incident reporting, role-based workflows, Pusher realtime updates, incident and floor-plan mapping, and modular clinic, prefect, and facility tools.',
    stack: ['Laravel 11', 'PHP 8.2', 'Pusher', 'Alpine.js', 'Tailwind', 'MySQL'],
    label: 'Capstone Project',
    year: '2025',
    role: 'Full-stack developer',
    summary: 'A campus operations system built around incident response, reporting workflows, realtime alerts, and administrative coordination.',
    context: 'Designed as the main capstone system for campus safety operations, with the demo centered on how different offices move from report intake to resolution.',
    details: [
      {
        title: 'Report Intake',
        body: 'Students and staff can submit campus safety concerns with structured details, supporting information, and a clear path into the response workflow.',
      },
      {
        title: 'Office Routing',
        body: 'Reports move through role-based dashboards so the right office can review, assign, update, and coordinate the next action.',
      },
      {
        title: 'Resolution Tracking',
        body: 'Each incident keeps its status history visible from intake to closure, making unresolved cases easier to monitor and follow up.',
      },
      {
        title: 'Operational Tools',
        body: 'Realtime updates, floor-plan mapping, and office-specific modules support day-to-day coordination beyond a basic report database.',
      },
    ],
    notes: [
      'Incident reports move through role-based dashboards instead of a single admin queue.',
      'Guided reporting and status tracking keep each incident understandable from intake to resolution.',
      'Realtime updates, floor-plan mapping, and office-specific modules make the system feel operational rather than just CRUD-based.',
    ],
  },
   {
    title: 'Core3HireUps',
    subtitle: 'Training and Development Management System',
    tag: 'Commissioned / Fullstack',
    cat: 'commissioned',
    featured: false,
    hasVideo: false,
    youtubeId: null, // Replace with actual video ID
    desc: 'Full-stack LMS with skill gap analysis, MCQ assessments, course management, certificate generation, and integration with 3 external systems via RESTful API.',
    stack: ['Laravel 12', 'PHP 8.2', 'Vue.js', 'MySQL', 'REST API'],
    label: 'Commissioned Project',
    year: '2026',
    role: 'Full-stack developer',
    summary: 'A training management platform for assessment, course assignment, certification, and connected enterprise data.',
    context: 'Built for a commissioned client that needed training, assessment, and course assignment flows gathered into one internal LMS.',
    details: [
      {
        title: 'Skill Assessment',
        body: 'Employees can take assessments that identify skill gaps and connect those gaps to measurable training needs.',
      },
      {
        title: 'Course Assignment',
        body: 'Admins can manage courses, assign learning paths, and track completion without separating assessment data from training records.',
      },
      {
        title: 'Certification Flow',
        body: 'Completed training can produce certificates and reporting outputs that stay connected to the learner profile.',
      },
      {
        title: 'Connected Records',
        body: 'REST API integrations keep employee, training, and surrounding system data aligned instead of duplicating work across platforms.',
      },
    ],
    notes: [
      'The core story is employee skill gaps turning into assigned courses and measurable training progress.',
      'Certificates, assessments, and reporting are treated as part of the same learning record.',
      'External API connections keep the LMS aligned with the surrounding systems instead of becoming isolated data.',
    ],
  },
]
