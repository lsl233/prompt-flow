export type PromptCategorySlug = "writing" | "coding" | "image" | "other";

export interface PromptVariable {
  name: string;
  description: string;
  required: boolean;
  example?: string;
}

export interface PromptCategory {
  slug: PromptCategorySlug;
  title: string;
  description: string;
  accent: string;
  featuredTagSlugs: string[];
}

export interface PromptTag {
  slug: string;
  title: string;
  description: string;
  categorySlugs: PromptCategorySlug[];
  relatedTagSlugs: string[];
  featured?: boolean;
}

export interface CommunityPrompt {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  author: string;
  category: PromptCategorySlug;
  tags: string[];
  targetModels: string[];
  language: string;
  variables: PromptVariable[];
  promptType: "template" | "workflow" | "assistant" | "generator";
  difficulty: "beginner" | "intermediate" | "advanced";
  featured: boolean;
  verified: boolean;
  useCase: string;
  exampleInput: string;
  exampleOutput: string;
  likes: number;
  createdAt: string;
}
