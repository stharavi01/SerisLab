import { GitHubProfile, GitHubRepository } from "./github.types";

export interface LanguageStats {
  [language: string]: {
    bytes: number;
    percentage: number;
  };
}

export interface GitHubData {
  profile: GitHubProfile;
  repositories: GitHubRepository[];
  languages: LanguageStats;
}

// Flat enhanced data structure (no more nested original/enhanced)
export interface EnhancedData {
  hero?: {
    tagline: string;
    bio: string;
    availability: string;
    name?: string;
    title?: string;
    location?: string;
    yearsExperience?: number;
  };
  about?: {
    story: string;
    highlights: string[];
    bio?: string;
    interests?: string[];
  };
  projects?: Array<{
    name: string;
    description: string;
    enhancedDescription: string;
    impact: string;
    technologies?: string[];
  }>;
  skills?: {
    technical: string[];
    soft: string[];
    categories: object;
  };
  experience?: Array<{
    company: string;
    role: string;
    duration: string;
    description: string;
    highlights?: string[];
  }>;
  contact?: {
    email?: string;
    phone?: string;
    location?: string;
    social?: Record<string, string>;
  };
  education?: Array<{
    institution: string;
    degree: string;
    year: string;
    description?: string;
  }>;
  certifications?: Array<{
    name: string;
    issuer: string;
    date: string;
  }>;
  enhanced_at: string; // ISO date string
}

export interface UserGitHubDataResponse {
  success: boolean;
  data: {
    githubData: GitHubData;
    githubEnhancedData: EnhancedData;
    selectedRepoIds: number[];
    githubSyncedAt: string | null;
    githubEnhancedAt: string | null;
    isFresh: boolean;
  };
}

export interface GitHubSyncResponse {
  success: boolean;
  message: string;
  data: {
    updated: boolean;
    changes: {
      newRepos: string[];
      updatedStats: string[];
      newLanguages: string[];
      deletedRepos: string[];
    };
    githubData: GitHubData;
    githubEnhancedData: EnhancedData;
    githubSyncedAt: string;
  };
}

export interface UpdateRepoSelectionRequest {
  repoIds: number[];
}

export interface UpdateRepoSelectionResponse {
  success: boolean;
  message: string;
  data: {
    selectedRepoIds: number[];
  };
}
