import { GitHubCompleteData } from "./github.types";

export interface ShowcaseItem {
  avatar: string;
  slug: string;
  title: string;
  name: string;
  templateName: string;
  thumbnail: string | null;
  totalViews: number;
  createdAt: string;
  publishedAt: string | null;
}

export interface Portfolio {
  id: string;
  title: string;
  slug: string;
  userId: string;
  status: "private" | "public";
  isPrimary: boolean;
  hideFromShowcase: boolean;
  templateName: string;
  theme?: "light" | "dark";
  sections: Section[];
  githubData: GitHubCompleteData | null;
  extractedGithubData: any | null;
  aiEnhancedData: any | null;
  customData: Record<string, any>;
  createdAt: string;
  updatedAt: string;
  lastEditedAt?: string;
  thumbnail?: string;
  Template?: {
    id: string;
    name: string;
    displayName: string;
    description?: string;
  };
  user?: {
    id: string;
    name: string;
    email: string;
    plan?: "FREE" | "PRO";
  };
}

export interface Section {
  type:
    | "navbar"
    | "hero"
    | "about"
    | "skills"
    | "experience"
    | "projects"
    | "contact"
    | "education"
    | "certifications"
    | "testimonials"
    | "resume"
    | "achievements"
    | "blog"
    | "tools"
    | "awards"
    | "publications"
    | "interests"
    | "footer";
  componentName: string;
  visible: boolean;
  order: number;
}

// Request/Response Types
export interface CreatePortfolioRequest {
  title: string;
  slug?: string;
  status?: "private" | "public";
  templateName?: string;
  sections?: Section[];
  theme?: "light" | "dark";
  selectedRepositoryIds?: number[];
}

export interface UpdatePortfolioRequest {
  title?: string;
  templateName?: string;
  status?: "private" | "public";
  isPrimary?: boolean;
  theme?: "light" | "dark";
  sections?: Section[];
  customData?: Record<string, any>;
}

export interface DuplicatePortfolioRequest {
  newSlug?: string;
  newTitle?: string;
}

export interface PlanMeta {
  publicCount: number;
}

export type PortfolioListResponse = Portfolio[];
