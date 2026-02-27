# SerisLab — AI Portfolio Generator for Developers

[![Live Demo](https://img.shields.io/badge/Live%20Demo-serislab.com-22c55e?style=flat-square)](https://serislab.com)
[![License: BSL 1.1](https://img.shields.io/badge/License-BSL%201.1-blue.svg?style=flat-square)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-ff0055?style=flat-square)](https://www.framer.com/motion/)

> **We turn your GitHub or resume into a living portfolio that grows with you. Build once. Sync forever. Edit anytime. Powered by AI — refined by you..

**[→ Try it free at serislab.com](https://serislab.com)** · [View Showcase](https://serislab.com/showcase) · [Pricing](https://serislab.com/pricing)

---

> [!NOTE]
> **This repository contains the public marketing site (landing page) for [serislab.com](https://serislab.com) only.**
> The full product — portfolio editor, AI generation engine, GitHub sync, resume parser, and template system — is proprietary and runs at [serislab.com](https://serislab.com). This repo exists to share the landing page code with the community and for transparency.

---

## What is SerisLab?

**SerisLab** is an AI-powered portfolio generator and career intelligence platform for tech professionals. It solves three real problems developers face:

1. **Writing great content is hard** — AI reads your GitHub repos or resume and generates professional project descriptions with business impact metrics automatically. No more staring at a blank page.
2. **Portfolios go stale** — GitHub auto-sync keeps your portfolio current with every new commit. No manual updates.
3. **GitHub and resume tell disconnected stories** — SerisLab merges both into one unified portfolio that shows technical proof AND professional context together.

**In 3 minutes:** Connect GitHub (10 sec) → AI generates content (90 sec) → Publish (20 sec).

**[→ Start for free — no credit card required](https://serislab.com)**

---

## Key Features

### AI Content Generation
Don't just say "Built a React app." SerisLab's AI reads your repositories, commit history, and README files, then generates professional descriptions like: *"Built a real-time platform for 10,000+ users, reducing deployment time by 60% using WebSockets and Redis."* Same work. A much better story.

### Dual-Source Portfolios
Use GitHub for code proof, your resume for career history, or combine both. Perfect for:
- Career switchers bridging old experience with new skills
- Bootcamp graduates with limited GitHub activity
- Senior developers wanting to show both technical depth and leadership
- Non-developer tech roles (PM, Designer, DevOps) with hybrid skill sets

### Business Impact Translation
AI automatically extracts metrics from your code, READMEs, and resume: users served, revenue impact, time saved. Shows recruiters the value you create — not just the technologies you use.

### 4 Professional Templates
- **Minimal** — Clean, typographic, recruiter-friendly
- **Modern** — Bold, contemporary, startup-ready
- **Editorial** — Classic serif, senior dev / academic
- **Creative** — Expressive, unique, design-forward

All templates are fully responsive, SEO-indexed, and editable without touching code.

### 15+ Portfolio Sections
About · Hero · Skills · Experience · Projects · Education · Certifications · Contact · Achievements · Testimonials · Resume · Blog · Tools · Awards · Publications · Interests

### GitHub Auto-Sync
Free plan: manual sync (once daily, one click). Pro: real-time automatic sync. Push a commit → portfolio updates. No rebuilding required.

### Portfolio Analytics *(Pro, coming soon)*
See who views your portfolio, which projects get recruiter attention, where traffic comes from, and when companies check you out. Optimize your narrative with real data.

### Instant Preview
Enter any GitHub username on the landing page to see a live AI-generated portfolio preview — before signing up.

### Free Hosting + Custom Slug
Every portfolio is hosted at `serislab.com/your-name`. No server setup, no deployment.

---

## Who It's For

| User | Pain Point | How SerisLab Helps |
|---|---|---|
| **Junior Developers (0–2 yrs)** | Resume thin, GitHub sparse | AI writes compelling narratives from limited data |
| **Career Switchers** | Old career + new GitHub skills look disconnected | Dual-source merges both into one story |
| **Experienced Devs (3–7 yrs)** | Too busy to maintain profiles | Auto-sync + AI handles updates |
| **Bootcamp Grads** | Projects don't "sound" professional | AI adds business context to every project |
| **Freelancers** | Need both technical proof + professional credibility | GitHub + Resume combined in one place |
| **Senior Devs / Tech Leads** | GitHub doesn't show leadership or team skills | Resume work history fills the gap |
| **Non-dev Tech Pros** | Don't have GitHub but need a tech portfolio | Resume-only mode works great |

---

## How It Works

### Step 1 — Connect (10 seconds)
Connect your GitHub account via OAuth, or upload your resume (PDF or DOCX). SerisLab reads your repositories, contributions, work history, and skills.

### Step 2 — AI Generates Content (90 seconds)
AI reads your code, commit messages, README files, or resume and writes:
- Professional project descriptions with business impact
- Skills summaries with context
- Work experience narratives
- A compelling bio

### Step 3 — Publish (20 seconds)
Pick a template, customize your style, publish instantly. Share your portfolio URL. GitHub portfolios auto-update with new commits — one setup, maintained forever.

---

## Pricing

### Free (Forever)
- 1 public portfolio (SEO-indexed)
- Unlimited private portfolios
- AI-powered content generation
- All 4 professional templates
- All 15+ portfolio sections
- GitHub + Resume data sources
- Basic analytics (views, traffic sources)
- Manual GitHub sync (once daily)
- Full editing control
- Free hosting with custom slug
- Export portfolio as JSON

### Pro (Coming Q2 2026)
Everything in Free, plus:
- Unlimited public portfolios
- Custom domain (`yourname.com`)
- Real-time GitHub auto-sync
- Advanced analytics (countries, engagement, conversions)
- Remove "Made with SerisLab" badge
- Export as PDF / Resume
- Social media card generator
- Google Analytics & Calendly integration
- Unlimited AI regenerations
- Priority email support

**Beta users get 50% off Pro forever.** [Join the waitlist →](https://serislab.com)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org) (App Router, React Server Components) |
| Language | [TypeScript 5](https://www.typescriptlang.org) |
| Styling | [Tailwind CSS 4](https://tailwindcss.com) |
| Animations | [Framer Motion 12](https://www.framer.com/motion/) |
| UI Components | [Radix UI](https://www.radix-ui.com) + [shadcn/ui](https://ui.shadcn.com) |
| Client State | [Zustand 5](https://zustand-demo.pmnd.rs) |
| Server State | [TanStack Query 5](https://tanstack.com/query) |
| Forms | [React Hook Form 7](https://react-hook-form.com) + [Zod 4](https://zod.dev) |
| Smooth Scroll | [Lenis](https://lenis.darkroom.engineering) |
| HTTP Client | [Axios](https://axios-http.com) |
| Carousel | [Embla Carousel](https://www.embla-carousel.com) |
| Theming | [next-themes](https://github.com/pacocoursey/next-themes) |

---

## Project Structure

```
serislab/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Landing page (main entry)
│   │   ├── layout.tsx            # Root layout (fonts, providers, SEO)
│   │   └── showcase/             # Community portfolio gallery
│   │
│   ├── components/
│   │   ├── landing-page/         # All landing page sections
│   │   │   ├── Navbar.tsx
│   │   │   ├── HeroSection.tsx       # GitHub/resume input + instant preview
│   │   │   ├── HowItWorksSection.tsx
│   │   │   ├── FeaturesSection.tsx   # Bento grid feature cards
│   │   │   ├── ShowcaseSection.tsx   # Live community portfolios
│   │   │   ├── BetaPricingSection.tsx
│   │   │   ├── FAQSection.tsx
│   │   │   ├── ContactSection.tsx
│   │   │   ├── FinalCTASection.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── instant-preview/      # Live preview components
│   │   │       ├── MacBookMockup.tsx
│   │   │       ├── PortfolioContent.tsx
│   │   │       ├── PreviewLoadingState.tsx
│   │   │       └── PreviewErrorState.tsx
│   │   ├── shared/               # Reusable cross-page components
│   │   └── ui/                   # shadcn/ui components
│   │
│   ├── hooks/                    # TanStack Query data fetching hooks
│   │   ├── useShowcase.ts        # Showcase portfolio infinite scroll
│   │   ├── usePortfolios.ts      # Portfolio preview (instant preview)
│   │   ├── useTemplates.ts       # Template metadata
│   │   └── useContact.ts         # Contact form submission
│   │
│   ├── services/                 # Axios API service layer
│   │   ├── common.service.ts     # Waitlist, general endpoints
│   │   └── contact.service.ts    # Contact form
│   │
│   ├── stores/
│   │   └── waitlist.store.ts     # Zustand store for waitlist modal
│   │
│   ├── providers/
│   │   ├── ThemeProvider.tsx     # Dark/light mode
│   │   └── ReactQueryProvider.tsx
│   │
│   ├── data/
│   │   ├── landing-content.ts    # All landing page copy and config
│   │   └── beta-pricing-data.ts  # Pricing plans config
│   │
│   ├── styles/
│   │   ├── globals.css           # Base CSS + Tailwind setup
│   │   └── app/landing.css       # Sage palette + typography tokens
│   │
│   └── types/                    # TypeScript type definitions
│
├── public/
│   ├── landing/                  # Landing page images
│   ├── og/                       # Open Graph images
│   └── logo.svg
│
├── .env.example                  # Environment variable template
└── README.md
```

---

## Getting Started

### Prerequisites
- Node.js 20+
- npm, pnpm, or yarn

### Run locally

```bash
git clone https://github.com/serislab/serislab.git
cd serislab
cp .env.example .env.local
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment Variables

```bash
# .env.example
NEXT_PUBLIC_API_URL=https://api.serislab.com   # Live API (showcase + preview work out of the box)
NEXT_PUBLIC_APP_URL=https://serislab.com
NEXT_PUBLIC_GA_ID=                              # Optional: your Google Analytics 4 ID
```

The live API powers the instant preview and portfolio showcase. Everything works out of the box pointing to the production API.

### Build

```bash
npm run build
npm run start
```

---

## Design System

### Typography
- **H1, H2:** Playfair Display (elegant serif — editorial, trustworthy)
- **H3–H6:** DM Sans (clean sans-serif — modern, readable)
- **Body:** Lora (readable serif — long-form content)

### Color Palette — Sage Green
```css
--color-primary:     hsl(150, 45%, 28%);  /* Deep emerald green */
--color-sage:        hsl(150, 25%, 48%);  /* Sage accent */
--color-sage-light:  hsl(150, 20%, 92%);  /* Sage background tint */
```
Full token set in [src/styles/app/landing.css](src/styles/app/landing.css).

### Animation Approach
- Framer Motion with `fadeInUp`, `staggerContainer`, `fadeInScale` variants
- Smooth easing: `[0.22, 1, 0.36, 1]` (custom cubic-bezier)
- Lenis for momentum-based smooth scroll
- All animations respect `prefers-reduced-motion`

---

## FAQ

**How do I create a portfolio from my GitHub profile?**
Connect via GitHub OAuth (10 seconds). SerisLab pulls your repos, contributions, and READMEs — AI generates professional descriptions. Pick a template, publish. Done in under 3 minutes.

**Does it work without a GitHub account?**
Yes. Upload your resume (PDF or DOCX). SerisLab parses your work history, skills, and achievements and generates portfolio content from that. GitHub is optional.

**Can I use both GitHub and my resume together?**
Yes — this is SerisLab's core feature (Dual-Source). GitHub provides code proof; your resume provides career history. AI merges both into a unified portfolio.

**Can I edit the AI-generated content?**
Full control. AI generates a first draft — you can edit every word, reorder sections, add custom projects, or write your own copy anywhere.

**Is my GitHub data safe?**
Yes. OAuth only — we never see your password. Read-only access to public repo data. Revoke access anytime from GitHub settings.

**How does auto-sync work?**
Free: manual sync once daily (one click). Pro: real-time sync — push a commit, portfolio updates automatically.

**When does the free beta end?**
Free until Q2 2026. 30 days notice before any charges. Beta users automatically get 50% off Pro forever.

---

## About This Repository

This is the **public marketing site** for [serislab.com](https://serislab.com). The repository contains the landing page, showcase gallery, and supporting components.

The full product — portfolio editor, AI generation pipeline, GitHub sync engine, resume parser, and template rendering system — is proprietary and runs at [serislab.com](https://serislab.com).

We open-sourced the marketing site because it's built with patterns we're proud of and wanted to share with the community. If you find something useful, give it a star.

---

## License

Business Source License 1.1 — see [LICENSE](LICENSE) for details.

The SerisLab name, logo, and brand identity are not covered by this license.

---

## Contributing

Found a bug in the landing page? UI improvements? PRs are welcome for the marketing site.

1. Fork the repo
2. Create a branch: `git checkout -b fix/your-fix`
3. Push and open a PR

For product feedback or feature requests, use [serislab.com/contact](https://serislab.com/contact).

---

<div align="center">

**[Try SerisLab Free →](https://serislab.com)**

*AI-powered portfolio generator · GitHub + Resume · No coding required*

</div>
