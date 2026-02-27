export const landingContent = {
  site: {
    name: "SerisLab",
    tagline: "The Portfolio That Evolves With You",
    description:
      "Career intelligence for tech professionals. Turn your GitHub or resume into a living portfolio that stays current through AI-powered content and auto-sync. Build once. Maintain forever.",
    url: "https://serislab.com",
  },

  navigation: {
    logo: {
      text: "SerisLab",
    },
    links: [
      { label: "How it Works", href: "#how-it-works" },
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#pricing" },
      { label: "FAQ", href: "#faq" },
    ],
    cta: {
      primary: {
        label: "Get Started",
        href: "/auth/signin",
        badge: "50% Off Forever — Beta Only",
      },
      secondary: {
        label: "Join Waitlist",
      },
    },
  },

  hero: {
    badge: {
      icon: "sparkles",
      highlight: true,
    },
    headline: {
      prefix: "The Portfolio That",
      main: "Evolves",
      suffix: "With You",
    },
    subheadline:
      "We turn your GitHub or resume into a living portfolio that grows with you. Build once. Sync forever. Edit anytime.",
    text: "Powered by AI — refined by you.",
    supportingPoint: "",
    cta: {
      inputLabel: "Enter your GitHub username",
      inputPlaceholder: "octocat",
      buttonText: "See AI Magic",
      buttonIcon: "sparkles",
      helperText: "Free beta access • No credit card • 50% off for life",
    },

    features: [
      {
        icon: "sparkles",
        text: "AI writes professional content",
        tooltip: "Turns your experience into compelling narratives",
      },
      {
        icon: "git-branch",
        text: "GitHub or Resume — your choice",
        tooltip: "Use code proof, career history, or both",
      },
      {
        icon: "zap",
        text: "Portfolio in minutes",
        tooltip: "Showcase impact, not just credentials",
      },
    ],
  },

  howItWorks: {
    sectionBadge: "How It Works",
    headline: "Your Professional Portfolio in 3 Steps",
    subheadline:
      "No coding. No design skills. No endless updates. Just connect or upload and launch.",
    cards: [
      {
        image: "/landing/new-github.jpg",
        badge: "10 seconds",
        title: "Connect GitHub or Upload Resume",
        description:
          "OAuth pulls your repos and contributions, or upload your resume (PDF/DOCX). We analyze your experience—code projects, work history, or both.",
      },
      {
        image: "/landing/story.jpg",
        badge: "90 seconds",
        title: "AI Tells Your Story",
        description:
          "Our AI reads your code, resume, or both. It generates professional descriptions that explain what you built, why it matters, and the business impact. Not just 'I built an app' but 'Reduced deployment time by 60% for 10,000 users.'",
      },
      {
        image: "/landing/launch.jpg",
        badge: "20 seconds",
        title: "Launch & Stay Current",
        description:
          "Pick a template, customize your style, publish instantly. GitHub portfolios auto-update with new commits. One setup, maintained forever.",
      },
    ],
  },

  features: {
    sectionBadge: "Features",
    headline: "Built for Evolution, Not Just Creation",
    subheadline:
      "Most portfolios die after launch. SerisLab creates living portfolios that stay current through auto-sync and AI intelligence. Your work evolves. Your portfolio should too—without constant manual updates.",

    bento: [
      {
        size: "large",
        title: "AI Content Generation",
        description:
          "Don't just say 'Built a React app.' Our AI turns it into: 'Built a real-time platform for 10K+ users, cutting project time by 35% with WebSockets.' Same work, much better story.",
        visual: {
          type: "illustration",
          image: "/landing/ai-content.jpg",
          badge: "AI-Powered",
          badgeColor: "bg-primary",
        },
        pro: false,
        free: true,
      },
      {
        size: "medium",
        title: "Dual-Source Portfolios",
        description:
          "Use GitHub for code proof, resume for career history, or combine both. Perfect for career switchers, bootcamp grads, or anyone bridging the gap between their resume and GitHub.",
        visual: {
          type: "illustration",
          image: "/landing/dual-source.jpg",
          badge: "GitHub + Resume",
          badgeColor: "bg-green-600 dark:bg-green-500",
        },
        pro: false,
        free: true,
      },
      {
        size: "medium",
        title: "Business Impact Translation",
        description:
          "AI extracts metrics from your code, README, or resume: users served, revenue impact, time saved. Shows recruiters the value you create, not just technologies you use.",
        visual: {
          type: "illustration",
          image: "/landing/business.jpg",
          badge: "Value-Focused",
          badgeColor: "bg-blue-600 dark:bg-blue-500",
        },
        pro: false,
        free: true,
      },
      {
        size: "medium",
        title: "Professional Templates",
        description:
          "Choose from 5 developer-focused templates. Clean, modern designs with fully editable content — no design skills needed.",
        visual: {
          type: "illustration",
          image: "/landing/template.jpg",
          badge: "5 Templates",
          badgeColor: "bg-pink-600 dark:bg-pink-500",
        },
        pro: true,
        proBadge: "Pro (coming soon)",
        comingSoon: true,
      },
      {
        size: "large",
        title: "Portfolio Analytics",
        description:
          "Track who views your portfolio. See which projects get recruiter attention. Optimize your narrative with real data. Know when companies check you out.",
        visual: {
          type: "dashboard",
          icon: "bar-chart-3",
          badge: "Live Analytics",
          badgeColor: "bg-teal-600 dark:bg-teal-500",
          stats: [
            { label: "Portfolio Views", value: "2,847", status: "up" },
            { label: "AI Content Quality", value: "94%", status: "up" },
            { label: "Interview Callbacks", value: "+23%", status: "up" },
          ],
        },
        pro: true,
        proBadge: "Pro (coming soon)",
        comingSoon: true,
      },
    ],
  },

  whyWeBuiltSerisLab: {
    sectionBadge: "Why We Built SerisLab",
    headline: "Easy to build. Hard to maintain.",
    subheadline:
      "GitHub and resumes tell different stories. Portfolios go stale in weeks. We built SerisLab to merge both sources, stay current with AI, and show your complete narrative.",
    problems: [
      {
        icon: "clock",
        title: "Maintenance Is a Time Drain",
        painPoint:
          "Your GitHub evolves, your resume updates, but your portfolio sits frozen. Keeping profiles in sync drains hours every month.",
        solution:
          "Auto-sync GitHub and refresh resume data anytime. One source of truth, zero manual updates.",
        image: "/landing/maintenance.jpg",
      },
      {
        icon: "trending-up",
        title: "Developers Struggle to Show Impact",
        painPoint:
          "Writing 'Built a React app' doesn't impress recruiters. Articulating business value and real-world impact feels unnatural.",
        solution:
          "AI generates professional descriptions: 'Reduced deployment time by 60% for 10K users' instead of just listing technologies.",
        image: "/landing/impact.jpg",
      },
      {
        icon: "git-branch",
        title: "GitHub + Resume = Disconnected Story",
        painPoint:
          "GitHub shows code. Resume shows experience. Recruiters see them separately. Career switchers struggle to bridge the gap.",
        solution:
          "Merge GitHub projects and resume into one portfolio. Show technical proof AND professional context together.",
        image: "/landing/dual-source.jpg",
      },
      {
        icon: "refresh-cw",
        title: "Portfolios Die After Launch",
        painPoint:
          "Build a portfolio, then it becomes outdated in weeks. New projects aren't reflected. Updating feels like starting over.",
        solution:
          "GitHub syncs automatically. Resume refreshes with one upload. Always current, no rebuilding required.",
        image: "/landing/launch.jpg",
      },
      {
        icon: "bar-chart-3",
        title: "No Feedback Loop Creates Uncertainty",
        painPoint:
          "Without data on views and engagement, you're flying blind—leading to doubt and abandoned portfolios.",
        solution:
          "See who views your work, which projects get clicked, and where traffic comes from. Optimize with real insights.",
        image: "/landing/business.jpg",
      },
      {
        icon: "trending-up",
        title: "Content Writing Takes Too Long",
        painPoint:
          "Staring at a blank page trying to describe your projects. Technical people aren't natural copywriters.",
        solution:
          "AI writes professional content from your code and commits. Focus on building, not writing marketing copy.",
        image: "/landing/ai-content.jpg",
      },
      {
        icon: "git-branch",
        title: "Portfolio Doesn't Show Team Skills",
        painPoint:
          "Solo GitHub repos don't show collaboration. Recruiters wonder if you can work in teams.",
        solution:
          "Import work history from resume to show team contributions. Merge company projects with personal code.",
        image: "/landing/story.jpg",
      },
      {
        icon: "clock",
        title: "Manual Updates Kill Momentum",
        painPoint:
          "Every new project means manually updating your portfolio. It never happens because it's tedious work.",
        solution:
          "Push to GitHub and your portfolio updates automatically. One commit, everywhere current.",
        image: "/landing/new-github.jpg",
      },
    ],
  },

  faq: {
    sectionBadge: "FAQ",
    headline: "Questions? We've got answers",
    subheadline:
      "Everything you need to know about AI-powered portfolios. Click any question to expand.",

    questions: [
      {
        id: "how-to-create",
        question: "How do I create a portfolio from my GitHub profile?",
        answer:
          "Connect your GitHub account via OAuth — it takes 10 seconds. SerisLab pulls your repositories, contributions, and README files, then AI generates professional descriptions for each project. You pick a template, customize your style, and publish. The whole process takes under 3 minutes.",
      },
      {
        id: "what-is-ai-portfolio",
        question: "What is an AI portfolio generator?",
        answer:
          "An AI portfolio generator automatically builds your professional portfolio from existing data — your GitHub profile or resume — instead of requiring you to write everything from scratch. SerisLab's AI reads your code, commit history, or resume and writes professional project descriptions, extracts business impact metrics, and structures your experience into a polished portfolio.",
      },
      {
        id: "no-coding-needed",
        question: "Can I build a portfolio without coding or design skills?",
        answer:
          "Yes, completely. SerisLab requires no coding, no design work, and no manual writing. You connect GitHub or upload a resume, choose from ready-made templates, and AI handles the rest. If you can use a website, you can build a portfolio with SerisLab.",
      },
      {
        id: "how-long",
        question: "How long does it take to create a developer portfolio?",
        answer:
          "Under 3 minutes for a complete portfolio. Connecting GitHub takes 10 seconds, AI generates all content in 90 seconds, and publishing takes 20 seconds. Compare that to 10–20+ hours building a portfolio manually from scratch.",
      },
      {
        id: "dual-source",
        question: "Can I use both my GitHub profile and resume together?",
        answer:
          "Yes — this is SerisLab's core feature. Connect your GitHub for code proof (real projects, commits, languages) and upload your resume for career history (job titles, companies, achievements). AI merges both into a single unified portfolio that shows the complete picture of your experience.",
      },
      {
        id: "no-github",
        question: "Does SerisLab work if I don't have a GitHub account?",
        answer:
          "Absolutely. Upload your resume (PDF or DOCX) instead. SerisLab parses your work experience, skills, and achievements, then AI writes professional portfolio content from that. GitHub is optional — resume-only works great for career switchers, bootcamp grads, or non-developer tech roles.",
      },
      {
        id: "ai-quality",
        question: "How does AI write the content for my portfolio?",
        answer:
          "Our AI reads your GitHub repositories (code, README files, commit messages) or resume to understand what you built and accomplished. It then generates professional descriptions that explain business impact — not just 'built a React app' but 'built a real-time platform for 10,000+ users, reducing deployment time by 60%.' You have full editing control to customize any output.",
      },
      {
        id: "templates",
        question: "What portfolio templates are available?",
        answer:
          "SerisLab offers four templates — Minimal, Modern, Editorial, and Creative — each with unique fonts, color palettes, and layouts. All templates are fully responsive and optimized for recruiters and hiring managers. You can switch templates anytime without losing your content.",
      },
      {
        id: "no-ai",
        question: "Can I edit the AI-generated content?",
        answer:
          "Yes, full control. AI generates a first draft to save you time, but you can edit every word, add custom projects, reorder sections, and write your own copy anywhere. The AI output is a starting point, not a constraint.",
      },
      {
        id: "github-safety",
        question: "Is my GitHub data safe?",
        answer:
          "Yes. We use OAuth authentication — we never see or store your GitHub password. We only read your public repository data with your explicit permission. You can revoke access anytime from your GitHub settings. Your code never leaves your repositories.",
      },
      {
        id: "auto-updates",
        question: "How does auto-sync work?",
        answer:
          "Free plan: manual sync once per day (one click). Pro plan: real-time automatic sync. When you push new commits, SerisLab's AI analyzes the changes, updates your project descriptions, and refreshes your portfolio — automatically, without any action from you.",
      },
      {
        id: "free-beta-timeline",
        question: "When does SerisLab become paid?",
        answer:
          "SerisLab is completely free during beta (until Q2 2026). You'll get 30 days notice before any charges. Early beta users automatically receive 50% off for life when Pro launches — no credit card required to sign up now.",
      },
    ],

    support: {
      name: "Sarah Chen",
      role: "Support Team",
      avatar: "https://avatars.githubusercontent.com/u/1?v=4",
    },
  },

  cta: {
    badge: "Limited Time: Early Adopter Benefits",
    headline: "Join Free Beta. Lock in 50% Off for Life.",
    subheadline:
      "Create your portfolio today, completely free. When Pro launches, you'll automatically get 50% off forever. No credit card needed. No surprise charges.",
    buttonText: "Get Started",

    highlights: [
      { word: "Free Beta" },
      { word: "50% off forever" },
      { word: "No credit card" },
    ],

    trustPoints: [
      "Free until Q2 2026",
      "Automatic 50% lifetime discount",
      "30 days notice before charges",
      "Cancel anytime, keep portfolio",
    ],
  },

  footer: {
    brand: {
      name: "SerisLab",
      description:
        "The portfolio that evolves with you. Career intelligence platform for tech professionals. Turn your GitHub or resume into a living portfolio through AI-powered content and auto-sync technology. Build once. Maintain forever.",
    },

    social: [
      {
        icon: "github",
        url: "https://github.com/yourusername",
        label: "GitHub",
      },
      {
        icon: "twitter",
        url: "https://twitter.com/yourusername",
        label: "Twitter",
      },
      {
        icon: "linkedin",
        url: "https://linkedin.com/in/yourusername",
        label: "LinkedIn",
      },
      {
        icon: "mail",
        url: "mailto:hello@serislab.com",
        label: "Email",
      },
    ],

    links: {
      product: {
        title: "Product",
        items: [
          { label: "AI Features", url: "#features" },
          { label: "Pricing", url: "/pricing" },
          { label: "Showcase", url: "/showcase" },
          { label: "About", url: "/about" },
        ],
      },
      legal: {
        title: "Legal",
        items: [
          { label: "Privacy Policy", url: "/privacy" },
          { label: "Terms of Service", url: "/terms" },
          { label: "Contact", url: "/contact" },
        ],
      },
    },

    copyright: "All rights reserved.",
  },
};

// Icon mapping for Lucide React
export const iconMap = {
  github: "Github",
  sparkles: "Sparkles",
  "arrow-right": "ArrowRight",
  "git-branch": "GitBranch",
  clock: "Clock",
  users: "Users",
  star: "Star",
  zap: "Zap",
  palette: "Palette",
  "trending-up": "TrendingUp",
  "shield-check": "ShieldCheck",
  "file-check": "FileCheck",
  heart: "Heart",
  "wand-sparkles": "Wand2",
  "refresh-cw": "RefreshCw",
  "bar-chart-3": "BarChart3",
  rocket: "Rocket",
  mail: "Mail",
  twitter: "Twitter",
  linkedin: "Linkedin",
} as const;

export type IconName = keyof typeof iconMap;
