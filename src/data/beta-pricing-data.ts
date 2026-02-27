export type BetaFeature = {
  key: string;
  label: string;
  included: boolean;
  comingSoon?: boolean;
  highlight?: boolean;
};

export type BetaPlan = {
  id: "free" | "pro";
  name: string;
  tagline: string;
  description: string;
  priceDisplay: string;
  priceSubtext?: string;
  badge?: {
    text: string;
    color: "blue" | "green" | "purple" | "yellow";
  };
  recommended?: boolean;
  cta: {
    label: string;
    action: "signup" | "waitlist";
    variant: "primary" | "secondary";
    href?: string;
  };
  features: BetaFeature[];
  highlight?: boolean;
};

export const BETA_PRICING_PLANS: BetaPlan[] = [
  {
    id: "free",
    name: "Free Forever",
    tagline: "Perfect for getting started",
    description:
      "Everything you need to create a professional portfolio. No tricks, no trials—actually free forever.",
    priceDisplay: "$0",
    priceSubtext: "Always free • No credit card",
    badge: {
      text: "Always Free",
      color: "blue",
    },
    recommended: false,
    cta: {
      label: "Get Started Free",
      action: "signup",
      variant: "secondary",
      href: "/auth/signin",
    },
    features: [
      {
        key: "portfolio-public",
        label: "1 public portfolio (SEO-indexed)",
        included: true,
        highlight: true,
      },
      {
        key: "portfolio-unlimited-draft",
        label: "Unlimited private portfolios",
        included: true,
      },
      {
        key: "ai-content",
        label: "AI-powered content generation",
        included: true,
        highlight: true,
      },
      {
        key: "templates-basic",
        label: "All 4 professional templates",
        included: true,
      },
      {
        key: "sections-all",
        label:
          "All 15+ sections (About, Projects, Skills, Experience, Education, etc.)",
        included: true,
      },
      {
        key: "github-resume",
        label: "GitHub + Resume data sources",
        included: true,
      },
      {
        key: "analytics-basic",
        label: "Basic analytics (views, traffic sources)",
        included: true,
      },
      {
        key: "github-sync",
        label: "Manual GitHub sync (once daily)",
        included: true,
      },
      {
        key: "editing",
        label: "Full manual editing control",
        included: true,
      },
      {
        key: "hosting",
        label: "Free hosting with custom slug",
        included: true,
      },
      {
        key: "export-json",
        label: "Export portfolio as JSON",
        included: true,
      },
      {
        key: "support-community",
        label: "Community support",
        included: true,
      },
    ],
    highlight: false,
  },
  {
    id: "pro",
    name: "Pro",
    tagline: "For serious professionals",
    description:
      "Everything in Free, plus unlimited portfolios, custom domains, real-time sync, and advanced analytics. Coming Q2 2026.",
    priceDisplay: "Coming Soon",
    priceSubtext:
      "First 200 beta users lock in 50% off forever. Price reveals at launch.",
    badge: {
      text: "50% OFF for Beta Users",
      color: "green",
    },
    recommended: true,
    cta: {
      label: "Join Waitlist — Lock 50% Off Forever",
      action: "waitlist",
      variant: "primary",
    },
    features: [
      {
        key: "free-features",
        label: "Everything in Free, plus:",
        included: true,
        highlight: true,
      },
      {
        key: "portfolio-unlimited",
        label: "Unlimited public portfolios",
        included: true,
        comingSoon: true,
        highlight: true,
      },
      {
        key: "custom-domain",
        label: "Custom domain (yourname.com)",
        included: true,
        comingSoon: true,
        highlight: true,
      },
      {
        key: "github-sync-realtime",
        label: "Real-time GitHub auto-sync",
        included: true,
        comingSoon: true,
      },
      {
        key: "analytics-advanced",
        label: "Advanced analytics (countries, engagement, conversions)",
        included: true,
        comingSoon: true,
      },
      {
        key: "remove-branding",
        label: "Remove 'Made with Serislab' badge",
        included: true,
        comingSoon: true,
      },
      {
        key: "pdf-export",
        label: "Export as PDF/Resume",
        included: true,
        comingSoon: true,
      },
      {
        key: "social-cards",
        label: "Social media card generator",
        included: true,
        comingSoon: true,
      },
      {
        key: "integrations",
        label: "Google Analytics & Calendly integration",
        included: true,
        comingSoon: true,
      },
      {
        key: "ai-unlimited",
        label: "Unlimited AI regenerations",
        included: true,
        comingSoon: true,
      },
      {
        key: "priority-support",
        label: "Priority email support",
        included: true,
        comingSoon: true,
      },
      {
        key: "early-access",
        label: "Early access to new features",
        included: true,
        comingSoon: true,
      },
    ],
    highlight: true,
  },
];
