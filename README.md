# Portfolio — Vue.js Project

A clean, modular Vue 3 + Vite portfolio site for a backend software engineer.

## Project Structure

```
portfolio-vue/
├── index.html                        # HTML entry point (loads Google Fonts + mounts #app)
├── vite.config.js                    # Vite config with @ alias
├── package.json
└── src/
    ├── main.js                       # createApp + global CSS
    ├── App.vue                       # Root: imports all sections, owns scrollTo()
    ├── assets/
    │   └── main.css                  # CSS variables, reset, base styles
    ├── composables/
    │   └── useScrollReveal.js        # IntersectionObserver scroll-reveal hook
    ├── data/
    │   └── portfolio.js              # All static data (services, skills, projects, tabs)
    └── components/
        ├── AppNav.vue                # Fixed navigation bar + hamburger menu
        ├── AppOrnament.vue           # Shared "— ✦ —" divider
        ├── HeroSection.vue           # Full-viewport hero (left text + right portrait)
        ├── DarkIntro.vue             # Dark two-column intro block
        ├── AboutSection.vue          # About + services grid with scroll reveal
        ├── SkillsSection.vue         # Current skills + learning skills with scroll reveal
        ├── PortfolioSection.vue      # Tabbed portfolio grid
        ├── ContactSection.vue        # Contact form
        └── AppFooter.vue             # Footer with social links + back-to-top
```

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Build for production
npm run build

# 4. Preview production build
npm run preview
```

## Customization

- **Personal info** (name, title, socials): `HeroSection.vue`
- **Bio / intro text**: `DarkIntro.vue`, `AboutSection.vue`
- **Services**: `src/data/portfolio.js` → `services` array
- **Skills**: `src/data/portfolio.js` → `currentSkills` / `learningSkills`
- **Projects**: `src/data/portfolio.js` → `projects` array
- **Colors / fonts**: `src/assets/main.css` CSS variables
