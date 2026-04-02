export type PromptCategorySlug = "writing" | "coding" | "image" | "other";

/**
 * 多语言字段类型
 */
export interface LocalizedField {
  zh: string;
  en: string;
}

/**
 * 带多语言支持的变量定义
 */
export interface PromptVariable {
  name: string;
  description: string | LocalizedField;
  required: boolean;
  example?: string;
}

/**
 * 分类数据（从 Markdown 读取）
 */
export interface PromptCategory {
  slug: PromptCategorySlug;
  title: string;
  description: string;
  accent: string;
  featuredTagSlugs: string[];
  /** 分类页面可渲染的详细内容 */
  content?: string;
}

/**
 * 标签数据（从 Markdown 读取）
 */
export interface PromptTag {
  slug: string;
  title: string;
  description: string;
  categorySlugs: PromptCategorySlug[];
  relatedTagSlugs: string[];
  featured?: boolean;
  /** 标签页面可渲染的详细内容 */
  content?: string;
}

/**
 * 提示词数据（从 Markdown 读取）
 */
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

// ===== Markdown 原始数据类型 =====

/**
 * Category Markdown frontmatter 原始类型
 */
export interface CategoryFrontmatter {
  slug: PromptCategorySlug;
  accent: string;
  featuredTagSlugs: string[];
  title: LocalizedField;
  description: LocalizedField;
}

/**
 * Tag Markdown frontmatter 原始类型
 */
export interface TagFrontmatter {
  slug: string;
  categorySlugs: PromptCategorySlug[];
  relatedTagSlugs: string[];
  featured?: boolean;
  title: LocalizedField;
  description: LocalizedField;
}

/**
 * Prompt Markdown frontmatter 原始类型
 */
export interface PromptFrontmatter {
  id: string;
  slug: string;
  category: PromptCategorySlug;
  tags: string[];
  author: string;
  targetModels: string[];
  promptType: "template" | "workflow" | "assistant" | "generator";
  difficulty: "beginner" | "intermediate" | "advanced";
  featured: boolean;
  verified: boolean;
  likes: number;
  createdAt: string;
  useCase: string;
  exampleInput: string;
  exampleOutput: string;
  variables: PromptVariable[];
  title: LocalizedField;
  summary: LocalizedField;
}
