import { Portfolio, Section } from "./portfolio.types";

export const ALL_SECTION_TYPES: Section["type"][] = [
  "navbar",
  "hero",
  "about",
  "skills",
  "experience",
  "projects",
  "contact",
  "education",
  "certifications",
  "testimonials",
  "resume",
  "achievements",
  "blog",
  "tools",
  "awards",
  "publications",
  "interests",
  "footer",
];

export interface NavbarData {
  brandText: string;
  navItems: Array<{
    id: string;
    label: string;
    href: string;
  }>;
  avatar?: string | null;
  resumeUrl?: string;
  resumeFileName?: string;
}

/**
 * Hero Section Data
 * Used by all Hero component variants
 */
export interface HeroData {
  githubUsername: string;
  name: string;
  avatar?: string | null;
  title?: string;
  bio?: string;
  location?: string;
  website?: string | null;
  yearsExperience?: number | null;
  availability: "available" | "open" | "unavailable";
  highlights?: string[];
  resumeUrl?: string;
  resumeFileName?: string;
}

/**
 * About Section Data
 * Used by all About component variants
 */
export interface AboutData {
  bio: string;
  story?: string;
  interests?: string[];
  hobbies?: string[];
  values?: string[];
  goals?: string[];
  funFacts?: string[];
  quote?: string;
  quoteAuthor?: string;
}

/**
 * Single Project Data
 */
export interface ProjectData {
  id: number | string;
  _id?: string;
  name: string;
  description?: string;
  longDescription?: string;
  htmlUrl: string;
  homepage?: string | null;
  language?: string | null;
  languages?: Record<string, number>;
  topics: string[];
  stargazersCount: number;
  forksCount: number;
  isPrivate: boolean;
  isFork: boolean;
  createdAt?: string | null;
  updatedAt?: string | null;
  pushedAt?: string | null;
  size: number;
  defaultBranch: string;
  hasReadme: boolean;
  hasDemo: boolean;
  demoUrl?: string | null;
  screenshots?: string[];
  techStack?: string[];
  features?: string[];
  impact?: string;
  priority: number;
  avatar?: string;
  _edited?: string[];
  _source?: string;
  _visible?: boolean;
  _githubId?: number;
}

export interface Skill {
  name: string;
  percentage?: number;
}

export type SkillsData = Skill[];

/**
 * Single Experience Item
 */
export interface ExperienceData {
  id?: string;
  _id?: string;
  company: string;
  position: string;
  type: "full-time" | "part-time" | "contract" | "freelance" | "internship";
  location?: string;
  remote: boolean;
  startDate: string | null;
  endDate?: string | null;
  current: boolean;
  description?: string;
  achievements?: string[];
  technologies?: string[];
  projects?: string[];
  companyWebsite?: string;
  companyLogo?: string;
  _edited?: string[];
  _source?: string;
  _visible?: boolean;
  _githubId?: number | null;
}

/**
 * Single Education Item
 */
export interface EducationData {
  id?: string;
  institution: string;
  degree: string;
  field?: string;
  grade?: string;
  startDate: string;
  endDate?: string | null;
  current: boolean;
  description?: string;
  achievements?: string[];
  coursework?: string[];
  activities?: string[];
  website?: string;
  logo?: string;
}

/**
 * Contact Section Data
 * Used by all Contact component variants
 */
export interface ContactData {
  _id?: string;
  email?: string;
  phone?: string | null;
  website?: string | null;
  location?: string;
  timezone?: string;
  availability: "available" | "open-to-opportunities" | "not-looking";
  preferredContact: "email" | "phone" | "linkedin" | "website";
  social?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    portfolio?: string;
    blog?: string;
    youtube?: string;
    dribbble?: string;
    behance?: string;
  };
  message?: string; // max 200 chars
  tagline?: string; // max 80 chars
  _edited?: string[];
  _source?: string;
}

/**
 * Single Certification Item
 */
export interface CertificationData {
  id?: string;
  name: string;
  issuer: string;
  issueDate: string;
  expirationDate?: string | null;
  credentialId?: string;
  credentialUrl?: string;
  description?: string;
  skills?: string[];
  logo?: string;
}

/**
 * Single Achievement Item
 */
export interface AchievementData {
  id?: string;
  title: string;
  description?: string;
  date: string;
  issuer?: string;
  category:
    | "award"
    | "recognition"
    | "competition"
    | "publication"
    | "speaking"
    | "other";
  url?: string;
  image?: string;
}

/**
 * Single Testimonial Item
 */
export interface TestimonialData {
  id?: string;
  name: string;
  position?: string;
  company?: string;
  content: string;
  rating?: number;
  date?: string | null;
  avatar?: string;
  linkedin?: string;
}

export interface SectionRendererProps {
  section: Section;
  index: number;
  isSelected: boolean;
  portfolioData: Portfolio;
  isPublic?: boolean;
  id?: string;
}
