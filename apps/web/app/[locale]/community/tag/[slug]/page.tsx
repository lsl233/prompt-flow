import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllTags,
  getCategoryBySlug,
  getPromptsByTag,
  getTagBySlug,
} from "@/lib/community-prompts";
import type { Locale } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo";
import {
  CommunityCTA,
  CommunityHero,
  getCommunityDictionary,
  InlineCategoryLinks,
  InlineTagLinks,
  PromptGrid,
  SectionHeading,
} from "@/components/community/CommunityUI";

export function generateStaticParams() {
  return getAllTags().map((tag) => ({ slug: tag.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const tag = getTagBySlug(slug);
  const dictionary = getCommunityDictionary(locale);

  if (!tag) {
    return buildPageMetadata({
      locale: locale as Locale,
      pathname: "/community",
      title: dictionary.meta.indexTitle,
      description: dictionary.meta.indexDescription,
    });
  }

  return buildPageMetadata({
    locale: locale as Locale,
    pathname: `/community/tag/${tag.slug}`,
    title: `#${tag.slug} | PromptFlow`,
    description: tag.description,
  });
}

export default async function CommunityTagPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const dictionary = getCommunityDictionary(locale);
  const tag = getTagBySlug(slug);

  if (!tag) {
    notFound();
  }

  const prompts = getPromptsByTag(tag.slug);
  const relatedCategories = tag.categorySlugs
    .map((categorySlug) => getCategoryBySlug(categorySlug))
    .filter((category): category is NonNullable<typeof category> => Boolean(category));
  const relatedTags = tag.relatedTagSlugs
    .map((tagSlug) => getTagBySlug(tagSlug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      <CommunityHero
        eyebrow={dictionary.tagPage.eyebrow}
        title={`#${tag.slug}`}
        description={tag.description}
        stats={[
          { label: dictionary.labels.prompts, value: String(prompts.length).padStart(2, "0") },
          { label: dictionary.tagPage.relatedCategories, value: String(relatedCategories.length).padStart(2, "0") },
          { label: dictionary.tagPage.relatedTags, value: String(relatedTags.length).padStart(2, "0") },
        ]}
      />

      <div className="mx-auto max-w-7xl space-y-16 px-4 py-14 sm:px-6 lg:px-8 lg:py-18">
        <section>
          <SectionHeading
            title={dictionary.meta.related}
            description="标签页承担专题页角色，用一个具体主题把分散在不同分类中的 Prompt 串起来。"
          />
          <PromptGrid prompts={prompts} dictionary={dictionary} />
        </section>

        <section>
          <SectionHeading
            title={dictionary.tagPage.relatedCategories}
            description="如果用户是从专题切入，分类链接可以帮助他们回到更稳定的浏览结构。"
          />
          <InlineCategoryLinks categories={relatedCategories} dictionary={dictionary} />
        </section>

        <section>
          <SectionHeading
            title={dictionary.tagPage.relatedTags}
            description="相近标签让标签页之间形成图状关系，这也是后续 SEO 和内链扩展的基础。"
          />
          <InlineTagLinks tags={relatedTags} />
        </section>

        <section>
          <CommunityCTA
            title={dictionary.tagPage.ctaTitle}
            description={dictionary.home.ctaDescription}
            dictionary={dictionary}
          />
        </section>
      </div>
    </div>
  );
}
