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
  const categories = await getAllCategories(locale);
  const featuredPrompts = (await getFeaturedPrompts(locale)).slice(0, 3);
  const latestPrompts = await getLatestPrompts(6, locale);
  const featuredTags = await getFeaturedTags(locale);

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
        eyebrow={dictionary.home.eyebrow}
        title={dictionary.home.title}
        description={dictionary.home.description}
        stats={dictionary.home.stats}
      />

      <div className="mx-auto max-w-7xl space-y-20 px-4 py-14 sm:px-6 lg:px-8 lg:py-18">
        <section>
          <SectionHeading
            title={dictionary.indexPage.browseEntry.title}
            description={dictionary.indexPage.browseEntry.description}
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
                {dictionary.indexPage.browseEntry.categoryLink}
              </h3>
              <p className="mt-3 text-sm leading-7 text-[var(--color-text-secondary)]">
                {dictionary.indexPage.categorySection.description}
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
                {dictionary.indexPage.browseEntry.tagLink}
              </h3>
              <p className="mt-3 text-sm leading-7 text-[var(--color-text-secondary)]">
                {dictionary.indexPage.tagSection.description}
              </p>
            </Link>
          </div>
        </section>

        <section>
          <SectionHeading
            title={dictionary.indexPage.categorySection.title}
            description={dictionary.indexPage.categorySection.description}
          />
          <CategoryGrid
            categories={categories}
            promptsByCategory={promptsByCategory}
            dictionary={dictionary}
          />
        </section>

        <section>
          <SectionHeading
            title={dictionary.indexPage.tagSection.title}
            description={dictionary.indexPage.tagSection.description}
          />
          <HotTagsRow tags={featuredTags} />
        </section>

        <section>
          <SectionHeading
            title={dictionary.indexPage.featuredSection.title}
            description={dictionary.indexPage.featuredSection.description}
          />
          <PromptGrid prompts={featuredPrompts} dictionary={dictionary} />
        </section>

        <section>
          <SectionHeading
            title={dictionary.indexPage.latestSection.title}
            description={dictionary.indexPage.latestSection.description}
          />
          <PromptGrid prompts={latestPrompts} dictionary={dictionary} />
        </section>

        <section>
          <SectionHeading
            title={dictionary.indexPage.faqSection.title}
            description={dictionary.indexPage.faqSection.description}
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
