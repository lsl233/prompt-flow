import type { Metadata } from "next";
import { ArrowRight, FolderTree, Hash } from "lucide-react";
import {
  getAllCategories,
  getFeaturedPrompts,
  getFeaturedTags,
  getLatestPrompts,
  getPromptsByCategory,
} from "@/lib/community-prompts";
import { buildPageMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";
import {
  CategoryGrid,
  CommunityCTA,
  CommunityFAQ,
  CommunityHero,
  getCommunityDictionary,
  HotTagsRow,
  PromptGrid,
  SectionHeading,
} from "@/components/community/CommunityUI";
import { Link } from "@/i18n/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dictionary = getCommunityDictionary(locale);

  return buildPageMetadata({
    locale: locale as Locale,
    pathname: "/community",
    title: dictionary.meta.indexTitle,
    description: dictionary.meta.indexDescription,
  });
}

export default async function CommunityPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dictionary = getCommunityDictionary(locale);
  const categories = await getAllCategories();
  const featuredPrompts = (await getFeaturedPrompts()).slice(0, 3);
  const latestPrompts = await getLatestPrompts(6);
  const featuredTags = await getFeaturedTags();

  const promptsByCategory = Object.fromEntries(
    await Promise.all(
      categories.map(async (category) => [
        category.slug,
        await getPromptsByCategory(category.slug),
      ])
    )
  );

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      <CommunityHero
        eyebrow={dictionary.home.eyebrow}
        title={dictionary.home.title}
        description={dictionary.home.description}
        stats={dictionary.home.stats}
      />

      <div className="mx-auto max-w-7xl space-y-20 px-4 py-14 sm:px-6 lg:px-8 lg:py-18">
        <section>
          <SectionHeading
            title={locale === "zh" ? "浏览入口" : "Browse entry points"}
            description={
              locale === "zh"
                ? "先进入分类索引或标签索引，用户会更清楚社区内容的组织方式。"
                : "Give users explicit category and tag indexes so the information hierarchy is clear before they drill down."
            }
          />
          <div className="grid gap-5 lg:grid-cols-2">
            <Link
              href="/community/category"
              className="group rounded-[2rem] border border-[var(--color-border-subtle)] bg-[var(--color-bg-secondary)] p-6 transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-primary)] p-3 text-[var(--color-accent-primary)]">
                  <FolderTree className="h-6 w-6" />
                </div>
                <ArrowRight className="h-5 w-5 text-[var(--color-text-tertiary)] transition-transform group-hover:translate-x-1 group-hover:text-[var(--color-text-primary)]" />
              </div>
              <h3 className="mt-6 text-2xl font-semibold tracking-[-0.03em] text-[var(--color-text-primary)]">
                {locale === "zh" ? "进入分类索引" : "Open category index"}
              </h3>
              <p className="mt-3 text-sm leading-7 text-[var(--color-text-secondary)]">
                {locale === "zh"
                  ? "按主题浏览社区结构，先看写作、编程、图像和工作流四大分区。"
                  : "Browse the community by theme first: writing, coding, image, and workflow."}
              </p>
            </Link>

            <Link
              href="/community/tag"
              className="group rounded-[2rem] border border-[var(--color-border-subtle)] bg-[var(--color-bg-secondary)] p-6 transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-primary)] p-3 text-[var(--color-accent-primary)]">
                  <Hash className="h-6 w-6" />
                </div>
                <ArrowRight className="h-5 w-5 text-[var(--color-text-tertiary)] transition-transform group-hover:translate-x-1 group-hover:text-[var(--color-text-primary)]" />
              </div>
              <h3 className="mt-6 text-2xl font-semibold tracking-[-0.03em] text-[var(--color-text-primary)]">
                {locale === "zh" ? "进入标签索引" : "Open tag index"}
              </h3>
              <p className="mt-3 text-sm leading-7 text-[var(--color-text-secondary)]">
                {locale === "zh"
                  ? "按专题、平台和场景探索内容，用标签串联跨分类的 Prompt。"
                  : "Browse by topic, platform, and use case to connect prompts across categories."}
              </p>
            </Link>
          </div>
        </section>

        <section>
          <SectionHeading
            title={dictionary.meta.categories}
            description="用主题分区组织浏览路径，先让用户知道这里有什么，再决定点进哪类 Prompt。"
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
            description="标签页承担专题聚合和内链入口的角色，适合从用途、平台和场景出发继续深入。"
          />
          <HotTagsRow tags={featuredTags} />
        </section>

        <section>
          <SectionHeading
            title={dictionary.meta.featured}
            description="首页第一屏之后优先展示代表性 Prompt，让用户快速理解社区内容质量。"
          />
          <PromptGrid prompts={featuredPrompts} dictionary={dictionary} />
        </section>

        <section>
          <SectionHeading
            title={dictionary.meta.latest}
            description="保留最新收录区块，后续接入 JSON 内容源后可以自然过渡为真实更新流。"
          />
          <PromptGrid prompts={latestPrompts} dictionary={dictionary} />
        </section>

        <section>
          <SectionHeading
            title={dictionary.home.faqTitle}
            description="这版先解决结构和体验，不急着把动态能力全塞进来。"
          />
          <CommunityFAQ items={dictionary.faq} />
        </section>

        <section>
          <CommunityCTA
            title={dictionary.home.ctaTitle}
            description={dictionary.home.ctaDescription}
            dictionary={dictionary}
          />
        </section>
      </div>
    </div>
  );
}
