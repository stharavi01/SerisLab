export interface DefaultSection {
  type: "hero" | "about" | "skills" | "experience" | "projects" | "contact";
  defaultComponentName: string;
  order: number;
}

export interface Template {
  id: string;
  name: string;
  displayName: string;
  description: string;
  thumbnail: string;
  defaultSections: DefaultSection[];
  isActive: boolean;
  createdAt: string;
}

// API Response Types
export type TemplateListResponse = Template[];
