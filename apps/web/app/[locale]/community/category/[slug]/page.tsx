import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllCategories,
  getCategoryBySlug,
  getPromptsByCategory,
  getTagBySlug,
} from "@/lib/community-prompts";
import type { Locale } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo";
import {
  CommunityCTA,
  CommunityFAQ,
  CommunityHero,
  getCommunityDictionary,
  InlineTagLinks,
  PromptGrid,
  SectionHeading,
} from "@/components/community/CommunityUI";

export function generateStaticParams() {
  return getAllCategories().map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const category = getCategoryBySlug(slug);
  const dictionary = getCommunityDictionary(locale);

  if (!category) {
    return buildPageMetadata({
      locale: locale as Locale,
      pathname: "/community",
      title: dictionary.meta.indexTitle,
      description: dictionary.meta.indexDescription,
    });
  }

  return buildPageMetadata({
    locale: locale as Locale,
    pathname: `/community/category/${category.slug}`,
    title: `${dictionary.categoryNames[category.slug]} | PromptFlow`,
    description: category.description,
  });
}

export default async function CommunityCategoryPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const dictionary = getCommunityDictionary(locale);
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const prompts = getPromptsByCategory(category.slug);
  const relatedTags = category.featuredTagSlugs
    .map((tagSlug) => getTagBySlug(tagSlug))
    .filter((tag): tag is NonNullable<typeof tag> => Boolean(tag));

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      <CommunityHero
        eyebrow={dictionary.categoryPage.eyebrow}
        title={category.title}
        description={category.description}
        stats={[
          { label: dictionary.labels.prompts, value: String(prompts.length).padStart(2, "0") },
          { label: dictionary.meta.tags, value: String(relatedTags.length).padStart(2, "0") },
          { label: dictionary.labels.featured, value: String(prompts.filter((item) => item.featured).length).padStart(2, "0") },
        ]}
      />

      <div className="mx-auto max-w-7xl space-y-16 px-4 py-14 sm:px-6 lg:px-8 lg:py-18">
        <section>
          <SectionHeading
            title={dictionary.meta.featured}
            description="分类页负责把同一主题下的 Prompt 放到一个明确的上下文里，用户不需要回到首页再理解内容范围。"
          />
          <PromptGrid prompts={prompts} dictionary={dictionary} />
        </section>

        <section>
          <SectionHeading
            title={dictionary.meta.tags}
            description="相关标签用于继续收窄或扩展内容视角，承担分类页的内链角色。"
          />
          <InlineTagLinks tags={relatedTags} />
        </section>

        <section>
          <SectionHeading
            title={dictionary.categoryPage.faqTitle}
            description="分类页也要有解释能力，而不是只堆列表。"
          />
          <CommunityFAQ
            items={[
              {
                question: locale === "zh" ? "这个分类适合谁看？" : "Who should browse this lane?",
                answer:
                  locale === "zh"
                    ? `如果你主要在做${dictionary.categoryNames[category.slug]}相关工作，这一页就是最短路径。`
                    : `If your workflow centers on ${dictionary.categoryNames[category.slug]}, this is the fastest entry point.`,
              },
              {
                question: locale === "zh" ? "为什么还要展示标签？" : "Why show tags here?",
                answer:
                  locale === "zh"
                    ? "因为分类负责大方向，标签负责专题和语境，两者一起才能形成可浏览的内链结构。"
                    : "Categories set the lane, while tags expose the context and subtopics needed for internal linking.",
              },
              {
                question: locale === "zh" ? "后续可以接什么？" : "What can plug in later?",
                answer:
                  locale === "zh"
                    ? "后续可以直接接入 JSON 内容源、静态参数、ItemList JSON-LD 和搜索过滤。"
                    : "Later this page can plug into JSON content, static params, ItemList JSON-LD, and search filters.",
              },
            ]}
          />
        </section>

        <section>
          <CommunityCTA
            title={dictionary.categoryPage.ctaTitle}
            description={dictionary.home.ctaDescription}
            dictionary={dictionary}
          />
        </section>
      </div>
    </div>
  );
}
