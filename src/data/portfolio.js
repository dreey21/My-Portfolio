// ─── Services ──────────────────────────────────────────────────────────────
export const services = [
  {
    title: 'System Design',
    desc: 'I plan system architecture before writing a single line of code, defining database schemas, entity relationships, and full data flow. Several of my systems were ideas I proposed, discussed, and scoped with clients myself.',
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
    desc: 'My systems are API-integrated with other platforms, one connecting to three external systems and another to two, built collaboratively across a BSIT cluster of teams.',
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
// Set hasVideo: false to show "Coming Soon" placeholder instead.
export const projects = [
  {
    title: 'OSAS',
    subtitle: 'Campus Safety and Operations Platform',
    tag: 'Capstone · Fullstack · Realtime · AI',
    cat: 'capstone',
    featured: true,
    hasVideo: true,
    youtubeId: 'kgC1ga-o0Og',
    desc: 'Full-stack school safety platform with incident reporting, role-based workflows, Gemini AI dashboard insights and chatbot, Pusher realtime updates, incident and floor-plan mapping, and modular clinic, prefect, and facility tools.',
    stack: ['Laravel 11', 'PHP 8.2', 'Pusher', 'Gemini AI', 'Alpine.js', 'Tailwind', 'MySQL'],
    label: 'Capstone Project',
  },
  {
    title: 'Core3HireUps',
    subtitle: 'Training and Development Management System',
    tag: 'Commissioned · Fullstack · AI',
    cat: 'commissioned',
    featured: false,
    hasVideo: false,
    youtubeId: null, // Replace with actual video ID
    desc: 'Full-stack LMS with skill gap analysis, MCQ assessments, AI course recommendations via Google Gemini, certificate generation, and integration with 3 external systems via RESTful API.',
    stack: ['Laravel 12', 'PHP 8.2', 'Vue.js', 'Gemini AI', 'MySQL', 'REST API'],
    label: 'Commissioned Project',
  },
  {
    title: 'FEMS',
    subtitle: 'Facility and Event Reservation Management System',
    tag: 'Commissioned · Fullstack',
    cat: 'commissioned',
    featured: false,
    hasVideo: false,
    youtubeId: null, // Replace with actual video ID
    desc: 'Facility and event booking platform for 24+ academic departments with real-time filtering, document management, post-event compliance monitoring, and integration with 2 external systems via RESTful API.',
    stack: ['Laravel', 'PHP', 'Blade', 'Alpine.js', 'MySQL', 'REST API'],
    label: 'Commissioned Project',
  },
  {
    title: 'Coming Soon',
    subtitle: 'Personal Project',
    tag: 'Personal',
    cat: 'personal',
    featured: false,
    hasVideo: false,
    youtubeId: null,
    desc: 'A personal project currently in development.',
    stack: [],
    label: 'Personal Project',
  },
  {
    title: 'Coming Soon',
    subtitle: 'Personal Project',
    tag: 'Personal',
    cat: 'personal',
    featured: false,
    hasVideo: false,
    youtubeId: null,
    desc: 'A personal project currently in development.',
    stack: [],
    label: 'Personal Project',
  },
  {
    title: 'Coming Soon',
    subtitle: 'Personal Project',
    tag: 'Personal',
    cat: 'personal',
    featured: false,
    hasVideo: false,
    youtubeId: null,
    desc: 'A personal project currently in development.',
    stack: [],
    label: 'Personal Project',
  },
]