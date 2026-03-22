import React from "react";
import { Search, Heart, ArrowLeft, Sparkles } from "lucide-react";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { ImportButton } from "@/components/ImportButton";
import { getAllPrompts } from "@/lib/community-prompts";
import type { CommunityPrompt } from "@/types/prompt";
import type { Locale } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo";
import { Link } from "@/i18n/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "community.metadata",
  });

  return buildPageMetadata({
    locale: locale as Locale,
    pathname: "/community",
    title: t("title"),
    description: t("description"),
  });
}

export default async function CommunityPage() {
  const t = await getTranslations("community");
  const navT = await getTranslations("nav");
  const prompts = getAllPrompts();

  const categories: (CommunityPrompt["category"] | "all")[] = ["all", "writing", "coding", "image", "other"];

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      {/* Header */}
      <div className="relative overflow-hidden border-b border-[var(--color-border-subtle)]">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--color-accent-primary)] opacity-5 blur-[128px] rounded-full" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          {/* Back Link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("backToHome")}
          </Link>

          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-accent-primary)]/10 border border-[var(--color-accent-primary)]/20 mb-6">
              <Sparkles className="w-4 h-4 text-[var(--color-accent-primary)]" />
              <span className="text-sm font-medium text-[var(--color-accent-primary)]">{navT("community")}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--color-text-primary)] mb-4">
              {t("title")}
            </h1>
            <p className="text-lg text-[var(--color-text-secondary)]">{t("subtitle")}</p>
          </div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="border-b border-[var(--color-border-subtle)] bg-[var(--color-bg-secondary)]/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-grow max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-text-tertiary)]" />
              <input
                type="text"
                placeholder={t("search")}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[var(--color-bg-tertiary)] border border-[var(--color-border-subtle)]
                         text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)]
                         focus:outline-none focus:border-[var(--color-accent-primary)]/50 transition-colors"
              />
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
              {categories.map((category) => (
                <button
                  key={category}
                  className="px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap
                           bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)]
                           border border-[var(--color-border-subtle)]
                           hover:border-[var(--color-accent-primary)]/50 hover:text-[var(--color-text-primary)]
                           transition-all"
                >
                  {t(`categories.${category}`)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Prompts Grid */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {prompts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {prompts.map((prompt) => (
              <PromptCard key={prompt.id} prompt={prompt} t={t} />
            ))}
          </div>
        ) : (
          <EmptyState t={t} />
        )}
      </div>
    </div>
  );
}

function PromptCard({
  prompt,
  t,
}: {
  prompt: CommunityPrompt;
  t: (key: string) => string;
}) {
  return (
    <div className="group spotlight-border rounded-2xl p-6 flex flex-col bg-[var(--color-bg-secondary)]">
      <div className="flex items-start justify-between mb-4">
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-[var(--color-bg-tertiary)] text-[var(--color-text-tertiary)] border border-[var(--color-border-subtle)]">
          {t(`categories.${prompt.category}`)}
        </span>
        <div className="flex items-center gap-1.5 text-[var(--color-text-tertiary)]">
          <Heart className="w-4 h-4" />
          <span className="text-sm font-mono">{prompt.likes}</span>
        </div>
      </div>

      <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">
        {prompt.title}
      </h3>

      <p className="text-sm text-[var(--color-text-tertiary)] line-clamp-3 mb-4 flex-grow font-mono">
        {prompt.content}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {prompt.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="text-xs px-2 py-1 rounded bg-[var(--color-bg-tertiary)] text-[var(--color-text-tertiary)]"
          >
            #{tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-[var(--color-border-subtle)]">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)] flex items-center justify-center text-[10px] font-bold text-[var(--color-bg-primary)]">
            {prompt.author[0].toUpperCase()}
          </div>
          <span className="text-sm text-[var(--color-text-tertiary)]">{prompt.author}</span>
        </div>
        <ImportButton
          promptId={prompt.id}
          t={{
            import: t("import"),
            importSuccess: t("importSuccess"),
            installPrompt: t("installPrompt"),
          }}
        />
      </div>
    </div>
  );
}

function EmptyState({ t }: { t: (key: string) => string }) {
  return (
    <div className="text-center py-20 border border-dashed border-[var(--color-border-subtle)] rounded-2xl bg-[var(--color-bg-secondary)]/50">
      <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[var(--color-bg-tertiary)] flex items-center justify-center">
        <Sparkles className="w-8 h-8 text-[var(--color-text-tertiary)]" />
      </div>
      <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">
        {t("emptyState.title")}
      </h3>
      <p className="text-[var(--color-text-secondary)]">{t("emptyState.description")}</p>
    </div>
  );
}
