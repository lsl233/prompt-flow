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

export async function generateStaticParams() {
  return (await getAllTags("zh")).map((tag) => ({ slug: tag.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const tag = await getTagBySlug(slug, locale);
  const dictionary = getCommunityDictionary(locale);

  if (!tag) {
    return {
      ...buildPageMetadata({
        locale: locale as Locale,
        pathname: "/community",
        title: dictionary.meta.indexTitle,
        description: dictionary.meta.indexDescription,
      }),
      robots: {
        index: false,
        follow: true,
      },
    };
  }

  return {
    ...buildPageMetadata({
      locale: locale as Locale,
      pathname: `/community/tag/${tag.slug}`,
      title: `#${tag.slug} | PromptFlow`,
      description: tag.description,
    }),
    robots: {
      index: false,
      follow: true,
    },
  };
}

export default async function CommunityTagPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const dictionary = getCommunityDictionary(locale);
  const tag = await getTagBySlug(slug, locale);

  if (!tag) {
    notFound();
  }

  const prompts = await getPromptsByTag(tag.slug, locale);
  const relatedCategories = (await Promise.all(
    tag.categorySlugs.map((categorySlug) => getCategoryBySlug(categorySlug, locale))
  ))
    .filter((category): category is NonNullable<typeof category> => Boolean(category));
  const relatedTags = (await Promise.all(
    tag.relatedTagSlugs.map((tagSlug) => getTagBySlug(tagSlug, locale))
  ))
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
            title={dictionary.tagPage.relatedTitle}
            description={dictionary.tagPage.relatedDescription}
          />
          <PromptGrid prompts={prompts} dictionary={dictionary} />
        </section>

        <section>
          <SectionHeading
            title={dictionary.tagPage.relatedCategories}
            description={dictionary.tagPage.relatedCategoriesDescription}
          />
          <InlineCategoryLinks categories={relatedCategories} dictionary={dictionary} />
        </section>

        <section>
          <SectionHeading
            title={dictionary.tagPage.relatedTags}
            description={dictionary.tagPage.relatedTagsDescription}
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
