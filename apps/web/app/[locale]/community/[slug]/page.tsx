import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllPrompts,
  getCategoryBySlug,
  getPromptBySlug,
  getRelatedPrompts,
} from "@/lib/community-prompts";
import type { Locale } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo";
import {
  CommunityCTA,
  getCommunityDictionary,
  PromptDetailLayout,
  PromptGrid,
  SectionHeading,
} from "@/components/community/CommunityUI";

export function generateStaticParams() {
  return getAllPrompts().map((prompt) => ({ slug: prompt.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const prompt = getPromptBySlug(slug);
  const dictionary = getCommunityDictionary(locale);

  if (!prompt) {
    return buildPageMetadata({
      locale: locale as Locale,
      pathname: "/community",
      title: dictionary.meta.indexTitle,
      description: dictionary.meta.indexDescription,
    });
  }

  return buildPageMetadata({
    locale: locale as Locale,
    pathname: `/community/${prompt.slug}`,
    title: `${prompt.title} | PromptFlow`,
    description: prompt.summary,
  });
}

export default async function CommunityPromptDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const prompt = getPromptBySlug(slug);

  if (!prompt) {
    notFound();
  }

  const dictionary = getCommunityDictionary(locale);
  const category = getCategoryBySlug(prompt.category);

  if (!category) {
    notFound();
  }

  const relatedPrompts = getRelatedPrompts(prompt);

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      <PromptDetailLayout prompt={prompt} category={category} dictionary={dictionary} />

      <div className="mx-auto max-w-7xl space-y-16 px-4 py-14 sm:px-6 lg:px-8 lg:py-18">
        <section>
          <SectionHeading
            title={dictionary.detail.relatedTitle}
            description="相关 Prompt 先按分类和标签相似度做静态推荐，后续再替换成真实的相关推荐策略。"
          />
          <PromptGrid prompts={relatedPrompts} dictionary={dictionary} />
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
