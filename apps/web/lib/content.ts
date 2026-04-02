import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

// Re-export localized utilities
export { getLocalizedField, type LocalizedField } from "./localized";

const CONTENT_DIR = path.join(process.cwd(), "content");

/**
 * 解析 Markdown 文件，提取 frontmatter 和 content
 */
export async function parseMarkdown<T>(
  filePath: string
): Promise<{ data: T; content: string }> {
  const fullPath = path.isAbsolute(filePath)
    ? filePath
    : path.join(CONTENT_DIR, filePath);
  const fileContent = await fs.readFile(fullPath, "utf-8");
  const parsed = matter(fileContent);
  return {
    data: parsed.data as T,
    content: parsed.content,
  };
}

/**
 * 从 Markdown 内容中提取指定语言的内容块
 * 内容格式示例：
 * zh:
 * 中文内容...
 *
 * en:
 * English content...
 */
export function getPromptContentByLocale(
  content: string,
  locale: string
): string {
  // 匹配语言块：locale: 开头，到下一个语言块或文件结束
  const regex = new RegExp(
    `^${locale}:\\s*\\n?([\\s\\S]*?)(?=\\n\\w+:|\\n---|$)`,
    "m"
  );
  const match = content.match(regex);

  if (match) {
    return match[1].trim();
  }

  // 如果没有匹配到当前语言，尝试返回中文或英文
  const fallbackLocales = ["zh", "en"];
  for (const fallbackLocale of fallbackLocales) {
    if (fallbackLocale === locale) continue;
    const fallbackRegex = new RegExp(
      `^${fallbackLocale}:\\s*\\n?([\\s\\S]*?)(?=\\n\\w+:|\\n---|$)`,
      "m"
    );
    const fallbackMatch = content.match(fallbackRegex);
    if (fallbackMatch) {
      return fallbackMatch[1].trim();
    }
  }

  // 如果没有匹配到任何语言块，返回整个内容
  return content.trim();
}

/**
 * 读取目录下所有 Markdown 文件
 */
export async function readMarkdownFiles<T>(
  dirPath: string
): Promise<Array<{ data: T; content: string; slug: string }>> {
  const fullPath = path.isAbsolute(dirPath)
    ? dirPath
    : path.join(CONTENT_DIR, dirPath);

  try {
    const files = await fs.readdir(fullPath);
    const mdFiles = files.filter((f) => f.endsWith(".md"));

    const results = await Promise.all(
      mdFiles.map(async (file) => {
        const filePath = path.join(fullPath, file);
        const { data, content } = await parseMarkdown<T>(filePath);
        const slug = path.basename(file, ".md");
        return { data, content, slug };
      })
    );

    return results;
  } catch {
    return [];
  }
}

/**
 * 读取单个 Markdown 文件
 */
export async function readMarkdownFile<T>(
  filePath: string
): Promise<{ data: T; content: string; slug: string } | null> {
  try {
    const fullPath = path.isAbsolute(filePath)
      ? filePath
      : path.join(CONTENT_DIR, filePath);
    const { data, content } = await parseMarkdown<T>(fullPath);
    const slug = path.basename(filePath, ".md");
    return { data, content, slug };
  } catch {
    return null;
  }
}
