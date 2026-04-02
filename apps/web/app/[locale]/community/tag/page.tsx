import type { Metadata } from "next";
import { Hash } from "lucide-react";
import {
  getAllCategories,
  getAllPrompts,
  getAllTags,
} from "@/lib/community-prompts";
import type { Locale } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo";
import { CommunityCTA, CommunityHero, getCommunityDictionary, SectionHeading } from "@/components/community/CommunityUI";
import { Link } from "@/i18n/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dictionary = getCommunityDictionary(locale);

  return {
    ...buildPageMetadata({
      locale: locale as Locale,
      pathname: "/community/tag",
      title: dictionary.tagIndexPage.metaTitle,
      description: dictionary.tagIndexPage.metaDescription,
    }),
    robots: {
      index: false,
      follow: true,
    },
  };
}

export default async function CommunityTagIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dictionary = getCommunityDictionary(locale);
  const tags = await getAllTags(locale);
  const categories = await getAllCategories(locale);
  const prompts = await getAllPrompts(locale);
  const categoryMap = new Map(categories.map((category) => [category.slug, category]));
  const promptsByTag = new Map(
    tags.map((tag) => [
      tag.slug,
      prompts.filter((prompt) => prompt.tags.includes(tag.slug)),
    ])
  );

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      <CommunityHero
        eyebrow={dictionary.tagIndexPage.eyebrow}
        title={dictionary.tagIndexPage.title}
        description={dictionary.tagIndexPage.description}
        stats={[
          { label: dictionary.tagIndexPage.statLabels.tags, value: String(tags.length).padStart(2, "0") },
          { label: dictionary.tagIndexPage.statLabels.featured, value: String(tags.filter((tag) => tag.featured).length).padStart(2, "0") },
          { label: dictionary.tagIndexPage.statLabels.categories, value: String(new Set(tags.flatMap((tag) => tag.categorySlugs)).size).padStart(2, "0") },
        ]}
      />

      <div className="mx-auto max-w-7xl space-y-16 px-4 py-14 sm:px-6 lg:px-8 lg:py-18">
        <section>
          <SectionHeading
            title={dictionary.tagIndexPage.allTagsTitle}
            description={dictionary.tagIndexPage.allTagsDescription}
          />
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {tags.map((tag) => {
              const promptCount = promptsByTag.get(tag.slug)?.length ?? 0;
              const relatedCategories = tag.categorySlugs
                .map((categorySlug) => categoryMap.get(categorySlug))
                .filter((category): category is NonNullable<typeof category> => Boolean(category));

              return (
                <div
                  key={tag.slug}
                  className="group rounded-[2rem] border border-[var(--color-border-subtle)] bg-[var(--color-bg-secondary)] p-6 transition-transform duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border-subtle)] bg-[var(--color-bg-primary)] px-3 py-1 text-xs uppercase tracking-[0.16em] text-[var(--color-accent-primary)]">
                      <Hash className="h-3.5 w-3.5" />
                      <span>{tag.slug}</span>
                    </div>
                    <span className="text-xs uppercase tracking-[0.16em] text-[var(--color-text-tertiary)]">
                      {promptCount} {dictionary.labels.prompts}
                    </span>
                  </div>

                  <h2 className="mt-5 text-2xl font-semibold tracking-[-0.03em] text-[var(--color-text-primary)]">
                    <Link href={`/community/tag/${tag.slug}`} className="transition-colors hover:text-[var(--color-accent-primary)]">
                      {tag.title}
                    </Link>
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-[var(--color-text-secondary)]">
                    {tag.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-3">
                    {relatedCategories.map((category) => (
                      <Link
                        key={category.slug}
                        href={`/community/category/${category.slug}`}
                        className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border-subtle)] bg-[var(--color-bg-primary)] px-4 py-2 text-sm text-[var(--color-text-secondary)] transition-all hover:border-[var(--color-accent-primary)]/40 hover:text-[var(--color-text-primary)]"
                      >
                        {dictionary.categoryNames[category.slug]}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section>
          <CommunityCTA
            title={dictionary.tagIndexPage.ctaTitle}
            description={dictionary.home.ctaDescription}
            dictionary={dictionary}
          />
        </section>
      </div>
    </div>
  );
}
