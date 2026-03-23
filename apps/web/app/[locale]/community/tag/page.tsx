import type { Metadata } from "next";
import { Hash } from "lucide-react";
import {
  getAllTags,
  getCategoryBySlug,
  getPromptsByTag,
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

  return {
    ...buildPageMetadata({
      locale: locale as Locale,
      pathname: "/community/tag",
      title: locale === "zh" ? "Prompt 标签 | PromptFlow" : "Prompt Tags | PromptFlow",
      description:
        locale === "zh"
          ? "浏览 Prompt 社区全部标签入口，按专题、平台和场景继续探索内容。"
          : "Browse all prompt community tags and explore prompts by topic, platform, and scenario.",
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
  const tags = getAllTags();

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      <CommunityHero
        eyebrow={locale === "zh" ? "Tag Index" : "Tag Index"}
        title={
          locale === "zh"
            ? "按专题、平台和场景串联 Prompt"
            : "Connect prompts through topics, platforms, and scenarios"
        }
        description={
          locale === "zh"
            ? "标签页负责把横向关系串起来。它不是分类的替代品，而是帮助用户从一个语境跳到另一个语境的索引层。"
            : "Tags connect prompts across categories. They are not a replacement for categories, but the cross-topic layer that keeps browsing fluid."
        }
        stats={[
          { label: locale === "zh" ? "标签数" : "Tags", value: String(tags.length).padStart(2, "0") },
          { label: locale === "zh" ? "精选标签" : "Featured", value: String(tags.filter((tag) => tag.featured).length).padStart(2, "0") },
          { label: locale === "zh" ? "覆盖分类" : "Categories", value: String(new Set(tags.flatMap((tag) => tag.categorySlugs)).size).padStart(2, "0") },
        ]}
      />

      <div className="mx-auto max-w-7xl space-y-16 px-4 py-14 sm:px-6 lg:px-8 lg:py-18">
        <section>
          <SectionHeading
            title={locale === "zh" ? "全部标签" : "All tags"}
            description={
              locale === "zh"
                ? "标签入口页让 `/community/tag` 成为真实目录，而不只是一个动态 slug 容器。"
                : "This index makes `/community/tag` a real directory page instead of just a dynamic slug container."
            }
          />
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {tags.map((tag) => {
              const promptCount = getPromptsByTag(tag.slug).length;
              const relatedCategories = tag.categorySlugs
                .map((categorySlug) => getCategoryBySlug(categorySlug))
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
            title={locale === "zh" ? "继续按标签深入浏览" : "Keep exploring through tags"}
            description={dictionary.home.ctaDescription}
            dictionary={dictionary}
          />
        </section>
      </div>
    </div>
  );
}
