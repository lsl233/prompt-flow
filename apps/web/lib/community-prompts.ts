import { cache } from "react";
import path from "path";
import type {
  CommunityPrompt,
  PromptCategory,
  PromptTag,
  PromptCategorySlug,
  CategoryFrontmatter,
  TagFrontmatter,
  PromptFrontmatter,
  LocalizedField,
} from "@/types/prompt";
import {
  parseMarkdown,
  readMarkdownFiles,
  readMarkdownFile,
  getLocalizedField,
  getPromptContentByLocale,
} from "./content";

const CONTENT_DIR = path.join(process.cwd(), "content");

/**
 * 分类排序：维持原始顺序（writing, coding, image, other）
 */
const CATEGORY_ORDER: PromptCategorySlug[] = [
  "writing",
  "coding",
  "image",
  "other",
];

/**
 * 从 frontmatter 转换为 PromptCategory
 */
function parseCategory(
  data: CategoryFrontmatter,
  content: string
): PromptCategory {
  return {
    slug: data.slug,
    title: getLocalizedField(data.title, "zh"),
    description: getLocalizedField(data.description, "zh"),
    accent: data.accent,
    featuredTagSlugs: data.featuredTagSlugs,
    content: content || undefined,
  };
}

/**
 * 从 frontmatter 转换为 PromptTag
 */
function parseTag(
  data: TagFrontmatter,
  content: string
): PromptTag {
  return {
    slug: data.slug,
    title: getLocalizedField(data.title, "zh"),
    description: getLocalizedField(data.description, "zh"),
    categorySlugs: data.categorySlugs,
    relatedTagSlugs: data.relatedTagSlugs,
    featured: data.featured,
    content: content || undefined,
  };
}

/**
 * 从 frontmatter 和 content 转换为 CommunityPrompt
 */
function parsePrompt(
  data: PromptFrontmatter,
  rawContent: string,
  locale: string = "zh"
): CommunityPrompt {
  return {
    id: data.id,
    slug: data.slug,
    title: getLocalizedField(data.title, locale),
    summary: getLocalizedField(data.summary, locale),
    content: getPromptContentByLocale(rawContent, locale),
    author: data.author,
    category: data.category,
    tags: data.tags,
    targetModels: data.targetModels,
    language: "zh-CN", // Default language, original JSON had this but frontmatter doesn't
    variables: data.variables,
    promptType: data.promptType,
    difficulty: data.difficulty,
    featured: data.featured,
    verified: data.verified,
    useCase: getLocalizedField(data.useCase, locale),
    exampleInput: getLocalizedField(data.exampleInput, locale),
    exampleOutput: getLocalizedField(data.exampleOutput, locale),
    likes: data.likes,
    createdAt: data.createdAt,
  };
}

const loadAllCategories = cache(async (): Promise<PromptCategory[]> => {
  const categories = await readMarkdownFiles<CategoryFrontmatter>("categories");

  // Sort by CATEGORY_ORDER
  const sorted = categories.sort((a, b) => {
    const aIndex = CATEGORY_ORDER.indexOf(a.data.slug);
    const bIndex = CATEGORY_ORDER.indexOf(b.data.slug);
    return aIndex - bIndex;
  });

  return sorted.map((c) =>
    parseCategory(c.data, c.content)
  );
});

const loadAllTags = cache(async (): Promise<PromptTag[]> => {
  const tags = await readMarkdownFiles<TagFrontmatter>("tags");
  return tags.map((t) => parseTag(t.data, t.content));
});

const loadAllPrompts = cache(async (): Promise<CommunityPrompt[]> => {
  const prompts = await readMarkdownFiles<PromptFrontmatter>("prompts");

  // Sort by createdAt descending
  const sorted = prompts.sort((a, b) => {
    const dateA = new Date(a.data.createdAt).getTime();
    const dateB = new Date(b.data.createdAt).getTime();
    return dateB - dateA;
  });

  return sorted.map((p) => parsePrompt(p.data, p.content));
});

export async function getAllPrompts(): Promise<CommunityPrompt[]> {
  return loadAllPrompts();
}

export async function getPromptById(
  id: string
): Promise<CommunityPrompt | undefined> {
  return (await getAllPrompts()).find((prompt) => prompt.id === id);
}

export async function getPromptBySlug(
  slug: string
): Promise<CommunityPrompt | undefined> {
  return (await getAllPrompts()).find((prompt) => prompt.slug === slug);
}

export async function getFeaturedPrompts(): Promise<CommunityPrompt[]> {
  return (await getAllPrompts()).filter((prompt) => prompt.featured);
}

export async function getLatestPrompts(limit = 6): Promise<CommunityPrompt[]> {
  return (await getAllPrompts()).slice(0, limit);
}

export async function getPromptsByCategory(
  categorySlug: PromptCategorySlug
): Promise<CommunityPrompt[]> {
  return (await getAllPrompts()).filter(
    (prompt) => prompt.category === categorySlug
  );
}

export async function getPromptsByTag(
  tagSlug: string
): Promise<CommunityPrompt[]> {
  return (await getAllPrompts()).filter((prompt) =>
    prompt.tags.includes(tagSlug)
  );
}

export async function getAllCategories(): Promise<PromptCategory[]> {
  return loadAllCategories();
}

export async function getCategoryBySlug(
  slug: string
): Promise<PromptCategory | undefined> {
  return (await getAllCategories()).find((category) => category.slug === slug);
}

export async function getAllTags(): Promise<PromptTag[]> {
  return loadAllTags();
}

export async function getTagBySlug(
  slug: string
): Promise<PromptTag | undefined> {
  return (await getAllTags()).find((tag) => tag.slug === slug);
}

export async function getFeaturedTags(): Promise<PromptTag[]> {
  return (await getAllTags()).filter((tag) => tag.featured);
}

export async function getRelatedPrompts(
  prompt: CommunityPrompt,
  limit = 3
): Promise<CommunityPrompt[]> {
  return (await getAllPrompts())
    .filter((candidate) => candidate.slug !== prompt.slug)
    .map((candidate) => {
      const sharedTags = candidate.tags.filter((tag) =>
        prompt.tags.includes(tag)
      ).length;
      const sameCategory = candidate.category === prompt.category ? 2 : 0;
      return { candidate, score: sharedTags + sameCategory };
    })
    .filter((item) => item.score > 0)
    .sort(
      (left, right) =>
        right.score - left.score ||
        right.candidate.likes - left.candidate.likes
    )
    .slice(0, limit)
    .map((item) => item.candidate);
}

export async function searchPrompts(
  query: string
): Promise<CommunityPrompt[]> {
  const lowerQuery = query.toLowerCase();

  return (await getAllPrompts()).filter(
    (prompt) =>
      prompt.title.toLowerCase().includes(lowerQuery) ||
      prompt.summary.toLowerCase().includes(lowerQuery) ||
      prompt.content.toLowerCase().includes(lowerQuery) ||
      prompt.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
  );
}
