import type { Metadata } from "next";
import {
  getAllCategories,
  getAllPrompts,
  getFeaturedTags,
  getPromptsByCategory,
} from "@/lib/community-prompts";
import type { Locale } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo";
import {
  CategoryGrid,
  CommunityCTA,
  CommunityHero,
  getCommunityDictionary,
  HotTagsRow,
  SectionHeading,
} from "@/components/community/CommunityUI";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return buildPageMetadata({
    locale: locale as Locale,
    pathname: "/community/category",
    title: locale === "zh" ? "Prompt 分类 | PromptFlow" : "Prompt Categories | PromptFlow",
    description:
      locale === "zh"
        ? "查看 Prompt 社区所有分类入口，按主题浏览写作、编程、图像和工作流内容。"
        : "Browse all prompt community categories and explore writing, coding, image, and workflow collections.",
  });
}

export default async function CommunityCategoryIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dictionary = getCommunityDictionary(locale);
  const categories = getAllCategories();
  const featuredTags = getFeaturedTags();
  const promptsByCategory = Object.fromEntries(
    categories.map((category) => [category.slug, getPromptsByCategory(category.slug)])
  );

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      <CommunityHero
        eyebrow={locale === "zh" ? "Category Index" : "Category Index"}
        title={
          locale === "zh"
            ? "先按主题理解社区，再进入具体 Prompt"
            : "Start with themes before diving into individual prompts"
        }
        description={
          locale === "zh"
            ? "分类页是社区的信息骨架。先看清每个主题覆盖什么内容，再决定往哪个方向深入，会比在海量 Prompt 里直接搜索更高效。"
            : "Categories are the structural layer of the community. Start with the broad theme, then drill into the prompts that matter."
        }
        stats={[
          { label: locale === "zh" ? "分类数" : "Categories", value: String(categories.length).padStart(2, "0") },
          { label: locale === "zh" ? "Prompt 总量" : "Prompts", value: String(getAllPrompts().length).padStart(2, "0") },
          { label: locale === "zh" ? "热门标签" : "Hot tags", value: String(featuredTags.length).padStart(2, "0") },
        ]}
      />

      <div className="mx-auto max-w-7xl space-y-16 px-4 py-14 sm:px-6 lg:px-8 lg:py-18">
        <section>
          <SectionHeading
            title={locale === "zh" ? "全部分类" : "All categories"}
            description={
              locale === "zh"
                ? "每个分类页都应该是独立入口页，而不是只有详情页的附属导航。"
                : "Each category should work as a real entry page, not just a supporting navigation node."
            }
          />
          <CategoryGrid
            categories={categories}
            promptsByCategory={promptsByCategory}
            dictionary={dictionary}
          />
        </section>

        <section>
          <SectionHeading
            title={dictionary.meta.tags}
            description={
              locale === "zh"
                ? "如果用户想从专题而不是主题切入，可以继续进入标签索引。"
                : "If users prefer topic-based browsing instead of category-based browsing, the tag index is the next layer."
            }
          />
          <HotTagsRow tags={featuredTags} />
        </section>

        <section>
          <CommunityCTA
            title={locale === "zh" ? "继续进入具体分类页" : "Continue into a category page"}
            description={dictionary.home.ctaDescription}
            dictionary={dictionary}
          />
        </section>
      </div>
    </div>
  );
}
