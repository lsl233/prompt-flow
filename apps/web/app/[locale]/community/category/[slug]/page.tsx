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

export async function generateStaticParams() {
  return (await getAllCategories("zh")).map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const category = await getCategoryBySlug(slug, locale);
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
  const category = await getCategoryBySlug(slug, locale);

  if (!category) {
    notFound();
  }

  const prompts = await getPromptsByCategory(category.slug, locale);
  const resolvedRelatedTags = (
    await Promise.all(category.featuredTagSlugs.map((tagSlug) => getTagBySlug(tagSlug, locale)))
  )
    .filter((tag): tag is NonNullable<typeof tag> => Boolean(tag));

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      <CommunityHero
        eyebrow={dictionary.categoryPage.eyebrow}
        title={category.title}
        description={category.description}
        stats={[
          { label: dictionary.labels.prompts, value: String(prompts.length).padStart(2, "0") },
          { label: dictionary.meta.tags, value: String(resolvedRelatedTags.length).padStart(2, "0") },
          { label: dictionary.labels.featured, value: String(prompts.filter((item) => item.featured).length).padStart(2, "0") },
        ]}
      />

      <div className="mx-auto max-w-7xl space-y-16 px-4 py-14 sm:px-6 lg:px-8 lg:py-18">
        <section>
          <SectionHeading
            title={dictionary.categoryPage.featuredTitle}
            description={dictionary.categoryPage.featuredDescription}
          />
          <PromptGrid prompts={prompts} dictionary={dictionary} />
        </section>

        <section>
          <SectionHeading
            title={dictionary.categoryPage.tagsTitle}
            description={dictionary.categoryPage.tagsDescription}
          />
          <InlineTagLinks tags={resolvedRelatedTags} />
        </section>

        <section>
          <SectionHeading
            title={dictionary.categoryPage.faqTitle}
            description={dictionary.categoryPage.faqDescription}
          />
          <CommunityFAQ
            items={dictionary.categoryPage.faqItems.map((item) => ({
              ...item,
              answer: item.answer.replace(
                "{CATEGORY}",
                dictionary.categoryNames[category.slug]
              ),
            }))}
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
