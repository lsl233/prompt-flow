import type { Metadata } from "next";
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
  const categories = getAllCategories();
  const featuredPrompts = getFeaturedPrompts().slice(0, 3);
  const latestPrompts = getLatestPrompts(6);
  const featuredTags = getFeaturedTags();

  const promptsByCategory = Object.fromEntries(
    categories.map((category) => [category.slug, getPromptsByCategory(category.slug)])
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
