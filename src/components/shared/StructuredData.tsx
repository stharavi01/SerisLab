import type { Portfolio } from "@/types/portfolio.types";

/**
 * Organization Schema for the main site
 * Use this in the root layout to represent the SerisLab organization
 */
export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "SerisLab",
    alternateName: "Serislab",
    url: "https://serislab.com",
    logo: "https://serislab.com/logo.png",
    description:
      "We turn your GitHub or resume into a living portfolio that grows with you. Build once. Sync forever. Edit anytime. Powered by AI — refined by you.",
    foundingDate: "2024",
    founder: {
      "@type": "Organization",
      name: "SerisLab",
    },
    sameAs: [
      "https://twitter.com/serislab",
      // Add more social media URLs when available
      // "https://github.com/serislab"
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Support",
      email: "hello@serislab.com",
      url: "https://serislab.com/contact",
    },
    potentialAction: {
      "@type": "CreateAction",
      name: "Create Portfolio",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://serislab.com",
        actionPlatform: [
          "http://schema.org/DesktopWebPlatform",
          "http://schema.org/MobileWebPlatform",
        ],
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * WebSite Schema with Sitelinks Search Box for the main site
 * Helps Google understand site search capability
 */
export function MainWebSiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "SerisLab",
    alternateName: "Serislab",
    url: "https://serislab.com",
    description:
      "We turn your GitHub or resume into a living portfolio that grows with you. Build once. Sync forever. Edit anytime. Powered by AI — refined by you.",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * Person Schema for portfolio pages
 * Represents the portfolio owner as a Person in schema.org format
 */
interface PersonSchemaProps {
  portfolio: Portfolio;
  url: string;
}

export function PersonSchema({ portfolio, url }: PersonSchemaProps) {
  const customData = portfolio.customData;
  const heroData = customData?.sections?.hero;
  const aboutData = customData?.sections?.about;
  const contactData = customData?.sections?.contact;

  // Extract social media profiles
  const socialProfiles: string[] = [];
  if (contactData?.social?.github) {
    socialProfiles.push(contactData.social.github);
  }
  if (contactData?.social?.linkedin) {
    socialProfiles.push(contactData.social.linkedin);
  }
  if (contactData?.social?.twitter) {
    socialProfiles.push(contactData.social.twitter);
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: heroData?.name || portfolio.title,
    jobTitle: heroData?.title || undefined,
    description: heroData?.bio || aboutData?.bio || undefined,
    image: heroData?.avatar || undefined,
    url: url,
    sameAs: socialProfiles.length > 0 ? socialProfiles : undefined,
    email: contactData?.email || undefined,
    telephone: contactData?.phone || undefined,
    address:
      contactData?.location || contactData?.timezone
        ? {
            "@type": "PostalAddress",
            addressLocality: contactData?.location || undefined,
          }
        : undefined,
    alumniOf:
      customData?.sections?.education?.map((edu: any) => ({
        "@type": "EducationalOrganization",
        name: edu.institution,
      })) || undefined,
    knowsAbout:
      customData?.sections?.skills?.map((skill: any) => skill.name) ||
      undefined,
  };

  // Remove undefined values
  const cleanedSchema = JSON.parse(JSON.stringify(schema));

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(cleanedSchema) }}
    />
  );
}

/**
 * WebSite Schema for portfolio pages
 * Represents the portfolio as a personal website
 */
interface WebSiteSchemaProps {
  portfolio: Portfolio;
  url: string;
}

export function WebSiteSchema({ portfolio, url }: WebSiteSchemaProps) {
  const customData = portfolio.customData;
  const heroData = customData?.sections?.hero;

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: portfolio.title,
    description:
      heroData?.bio ||
      customData?.sections?.about?.bio ||
      `Professional portfolio of ${portfolio.title}`,
    url: url,
    author: {
      "@type": "Person",
      name: heroData?.name || portfolio.title,
    },
    inLanguage: "en",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * ProfilePage Schema for portfolio pages
 * Represents the portfolio as a profile page
 */
interface ProfilePageSchemaProps {
  portfolio: Portfolio;
  url: string;
}

export function ProfilePageSchema({ portfolio, url }: ProfilePageSchemaProps) {
  const customData = portfolio.customData;
  const heroData = customData?.sections?.hero;
  const aboutData = customData?.sections?.about;

  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: portfolio.title,
    description:
      heroData?.bio ||
      aboutData?.bio ||
      `Professional portfolio of ${portfolio.title}`,
    url: url,
    mainEntity: {
      "@type": "Person",
      name: heroData?.name || portfolio.title,
      jobTitle: heroData?.title || undefined,
      description: heroData?.bio || aboutData?.bio || undefined,
      image: heroData?.avatar || undefined,
    },
  };

  // Remove undefined values
  const cleanedSchema = JSON.parse(JSON.stringify(schema));

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(cleanedSchema) }}
    />
  );
}

/**
 * BreadcrumbList Schema
 * Helps Google understand page hierarchy
 */
interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbListSchemaProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbListSchema({ items }: BreadcrumbListSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * SiteNavigationElement Schema
 * Helps Google understand main site navigation for sitelinks
 */
export function SiteNavigationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: [
      {
        "@type": "SiteNavigationElement",
        position: 1,
        name: "Home",
        description: "Create your portfolio from GitHub or Resume",
        url: "https://serislab.com",
      },
      {
        "@type": "SiteNavigationElement",
        position: 2,
        name: "How It Works",
        description:
          "Learn how SerisLab transforms your profile into a portfolio",
        url: "https://serislab.com/#how-it-works",
      },
      {
        "@type": "SiteNavigationElement",
        position: 3,
        name: "Features",
        description: "Explore SerisLab's portfolio builder features",
        url: "https://serislab.com/#features",
      },
      {
        "@type": "SiteNavigationElement",
        position: 4,
        name: "Pricing",
        description: "View SerisLab pricing plans and options",
        url: "https://serislab.com/#pricing",
      },
      {
        "@type": "SiteNavigationElement",
        position: 5,
        name: "FAQ",
        description: "Frequently asked questions about SerisLab",
        url: "https://serislab.com/#faq",
      },
      {
        "@type": "SiteNavigationElement",
        position: 6,
        name: "Contact",
        description: "Get in touch with the SerisLab team",
        url: "https://serislab.com/contact",
      },
      {
        "@type": "SiteNavigationElement",
        position: 7,
        name: "About",
        description: "Learn more about SerisLab",
        url: "https://serislab.com/about",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * FAQPage Schema
 * Helps Google display FAQ rich results in search
 */
interface FAQItem {
  question: string;
  answer: string;
}

interface FAQPageSchemaProps {
  faqs: FAQItem[];
}

export function FAQPageSchema({ faqs }: FAQPageSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * HowTo Schema for the "How It Works" section
 * Helps Google and AI engines surface step-by-step answers
 */
export function HowToSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Create a Developer Portfolio with SerisLab",
    description:
      "Generate a professional portfolio from your GitHub profile or resume in minutes using AI. No coding or design skills required.",
    totalTime: "PT3M",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Connect GitHub or Upload Resume",
        text: "Use OAuth to connect your GitHub account and pull your repositories and contributions, or upload your resume (PDF/DOCX). SerisLab analyzes your experience—code projects, work history, or both.",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "AI Generates Your Portfolio Content",
        text: "Our AI reads your code, resume, or both and generates professional descriptions that explain what you built, why it matters, and the business impact—turning raw data into compelling narratives.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Launch and Stay Current",
        text: "Pick a portfolio template, customize your style, and publish instantly. GitHub portfolios auto-update with new commits so your portfolio stays current without manual work.",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * SoftwareApplication Schema for the main site
 * Helps AI engines classify SerisLab as a tool when answering "what can build a portfolio"
 */
export function SoftwareApplicationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "SerisLab",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    url: "https://serislab.com",
    description:
      "AI-powered portfolio generator for developers. Turn your GitHub profile or resume into a professional portfolio in minutes. No coding or design skills required.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    featureList: [
      "AI-generated portfolio content",
      "GitHub profile integration",
      "Resume upload and parsing (PDF/DOCX)",
      "Dual-source GitHub + Resume portfolios",
      "Multiple portfolio templates",
      "Auto-sync with GitHub commits",
      "Custom domain support",
    ],
    screenshot: "https://serislab.com/og/home.png",
    creator: {
      "@type": "Organization",
      name: "SerisLab",
      url: "https://serislab.com",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
