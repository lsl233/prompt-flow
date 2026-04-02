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
  const dictionary = getCommunityDictionary(locale);

  return buildPageMetadata({
    locale: locale as Locale,
    pathname: "/community/category",
    title: dictionary.categoryIndexPage.metaTitle,
    description: dictionary.categoryIndexPage.metaDescription,
  });
}

export default async function CommunityCategoryIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dictionary = getCommunityDictionary(locale);
  const categories = await getAllCategories(locale);
  const featuredTags = await getFeaturedTags(locale);
  const allPrompts = await getAllPrompts(locale);
  const promptsByCategory = Object.fromEntries(
    await Promise.all(
      categories.map(async (category) => [
        category.slug,
        await getPromptsByCategory(category.slug, locale),
      ])
    )
  );

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      <CommunityHero
        eyebrow={dictionary.categoryIndexPage.eyebrow}
        title={dictionary.categoryIndexPage.title}
        description={dictionary.categoryIndexPage.description}
        stats={[
          { label: dictionary.categoryIndexPage.statLabels.categories, value: String(categories.length).padStart(2, "0") },
          { label: dictionary.categoryIndexPage.statLabels.prompts, value: String(allPrompts.length).padStart(2, "0") },
          { label: dictionary.categoryIndexPage.statLabels.tags, value: String(featuredTags.length).padStart(2, "0") },
        ]}
      />

      <div className="mx-auto max-w-7xl space-y-16 px-4 py-14 sm:px-6 lg:px-8 lg:py-18">
        <section>
          <SectionHeading
            title={dictionary.categoryIndexPage.allCategoriesTitle}
            description={dictionary.categoryIndexPage.allCategoriesDescription}
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
            description={dictionary.categoryIndexPage.tagsDescription}
          />
          <HotTagsRow tags={featuredTags} />
        </section>

        <section>
          <CommunityCTA
            title={dictionary.categoryIndexPage.ctaTitle}
            description={dictionary.home.ctaDescription}
            dictionary={dictionary}
          />
        </section>
      </div>
    </div>
  );
}
