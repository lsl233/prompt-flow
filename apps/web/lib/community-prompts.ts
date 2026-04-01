import { cache } from "react";
import fs from "fs/promises";
import path from "path";
import type {
  CommunityPrompt,
  PromptCategory,
  PromptTag,
  PromptCategorySlug,
} from "@/types/prompt";

const CONTENT_DIR = path.join(process.cwd(), "content");

async function readJsonFile<T>(filename: string): Promise<T> {
  const filePath = path.join(CONTENT_DIR, filename);
  const content = await fs.readFile(filePath, "utf-8");
  return JSON.parse(content) as T;
}

const loadAllCategories = cache(async (): Promise<PromptCategory[]> => {
  return readJsonFile<PromptCategory[]>("categories.json");
});

const loadAllTags = cache(async (): Promise<PromptTag[]> => {
  return readJsonFile<PromptTag[]>("tags.json");
});

const loadAllPrompts = cache(async (): Promise<CommunityPrompt[]> => {
  const promptsDir = path.join(CONTENT_DIR, "prompts");
  const files = await fs.readdir(promptsDir);
  const jsonFiles = files.filter((f) => f.endsWith(".json"));

  const prompts = await Promise.all(
    jsonFiles.map((file) => readJsonFile<CommunityPrompt>(`prompts/${file}`))
  );

  // Sort by createdAt descending
  return prompts.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
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
