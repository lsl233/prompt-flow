import React from "react";
import Link from "next/link";
import {
  Command,
  FolderSearch,
  Monitor,
  PenTool,
  Code2,
  BarChart3,
  Heart,
  ArrowRight,
  Chrome,
} from "lucide-react";
import { getTranslations } from "next-intl/server";
import { ImportButton } from "@/components/ImportButton";
import { LocaleImage } from "@/components/LocaleImage";
import { getAllPrompts } from "@/lib/community-prompts";

export default async function HomePage() {
  const t = await getTranslations("home");
  const communityT = await getTranslations("community");
  const prompts = getAllPrompts().slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen bg-[var(--color-bg-primary)]">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-20 lg:pt-32 lg:pb-28">
        {/* Grid Background */}
        <div className="absolute inset-0 grid-pattern opacity-50" />

        {/* Gradient Orbs */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-[var(--color-accent-primary)] opacity-5 blur-[128px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[var(--color-accent-secondary)] opacity-5 blur-[100px] rounded-full" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-bg-secondary)] border border-[var(--color-border-subtle)] mb-8 reveal">
              <span className="w-2 h-2 rounded-full bg-[var(--color-accent-primary)] animate-pulse" />
              <span className="text-sm text-[var(--color-text-secondary)]">
                {t("hero.badge")}
              </span>
            </div>

            {/* Title */}
            <h1 className="mx-auto max-w-4xl text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4 reveal reveal-delay-1">
              <span className="text-[var(--color-text-primary)]">
                {t("hero.title")}
              </span>
            </h1>

            {/* Subtitle with gradient */}
            <p className="text-xl sm:text-2xl font-medium gradient-text mb-6 reveal reveal-delay-2">
              {t("hero.subtitle")}
            </p>

            {/* Description */}
            <p className="mx-auto max-w-2xl text-base sm:text-lg text-[var(--color-text-secondary)] mb-10 reveal reveal-delay-3">
              {t("hero.description")}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 reveal reveal-delay-4">
              <a
                href="https://chromewebstore.google.com/detail/prompt-flow/hfifkmpkoiciamimifcahopbdefknnko"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold btn-glow"
              >
                <Chrome className="w-5 h-5" />
                {t("hero.install")}
              </a>
              <Link
                href="/community"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] border border-[var(--color-border-subtle)] hover:border-[var(--color-border-strong)] transition-all"
              >
                {t("hero.browseCommunity")}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Product Demo Window */}
            <div className="mt-16 mx-auto max-w-5xl reveal reveal-delay-4">
              <div className="relative rounded-2xl overflow-hidden border border-[var(--color-border-subtle)] bg-[var(--color-bg-secondary)] shadow-2xl">
                {/* Window Header */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--color-border-subtle)] bg-[var(--color-bg-tertiary)]">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <div className="flex-1 text-center">
                    <span className="text-xs text-[var(--color-text-tertiary)] font-mono">
                      promptflow.js — -zsh
                    </span>
                  </div>
                  <div className="w-16" />
                </div>

                {/* Demo Content - Product Screenshot */}
                <div className="aspect-[16/9] bg-[var(--color-bg-primary)] p-2">
                  <div className="relative aspect-[16/9]">
                    <LocaleImage
                      name="hero"
                      alt={t("hero.screenshotAlt")}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="section-divider" />

      {/* Features Section */}
      <section id="features" className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)] mb-4">
              {t("features.title")}
            </h2>
            <p className="text-lg text-[var(--color-text-secondary)]">
              {t("features.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="group spotlight-border rounded-2xl p-8 card-lift">
              <div className="w-12 h-12 rounded-xl bg-[var(--color-accent-primary)]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Command className="w-6 h-6 text-[var(--color-accent-primary)]" />
              </div>
              <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-3">
                {t("features.items.quickAccess.title")}
              </h3>
              <p className="text-[var(--color-text-secondary)] leading-relaxed">
                {t("features.items.quickAccess.description")}
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group spotlight-border rounded-2xl p-8 card-lift">
              <div className="w-12 h-12 rounded-xl bg-[var(--color-accent-secondary)]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <FolderSearch className="w-6 h-6 text-[var(--color-accent-secondary)]" />
              </div>
              <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-3">
                {t("features.items.smartOrg.title")}
              </h3>
              <p className="text-[var(--color-text-secondary)] leading-relaxed">
                {t("features.items.smartOrg.description")}
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group spotlight-border rounded-2xl p-8 card-lift">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Monitor className="w-6 h-6 text-purple-500" />
              </div>
              <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-3">
                {t("features.items.crossPlatform.title")}
              </h3>
              <p className="text-[var(--color-text-secondary)] leading-relaxed">
                {t("features.items.crossPlatform.description")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="section-divider" />

      {/* Community Section */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)] mb-4">
                {t("community.title")}
              </h2>
              <p className="text-lg text-[var(--color-text-secondary)]">
                {t("community.subtitle")}
              </p>
            </div>
            <Link
              href="/community"
              className="inline-flex items-center gap-2 text-[var(--color-accent-primary)] hover:text-[var(--color-accent-secondary)] font-medium transition-colors"
            >
              {t("community.browseAll")}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {prompts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {prompts.map((prompt) => (
                <div
                  key={prompt.id}
                  className="group spotlight-border rounded-2xl p-6 flex flex-col"
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-[var(--color-bg-tertiary)] text-[var(--color-text-tertiary)] border border-[var(--color-border-subtle)]">
                      {communityT(`categories.${prompt.category}`)}
                    </span>
                    <div className="flex items-center gap-1 text-[var(--color-text-tertiary)]">
                      <Heart className="w-4 h-4" />
                      <span className="text-sm">{prompt.likes}</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">
                    {prompt.title}
                  </h3>
                  <p className="text-sm text-[var(--color-text-tertiary)] line-clamp-2 mb-4 flex-grow">
                    {prompt.content}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-[var(--color-border-subtle)]">
                    <span className="text-sm text-[var(--color-text-tertiary)]">
                      {t("community.by")} {prompt.author}
                    </span>
                    <ImportButton
                      promptId={prompt.id}
                      t={{
                        import: t("community.import"),
                        importSuccess: t("community.importSuccess"),
                        installPrompt: t("community.installPrompt"),
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 border border-dashed border-[var(--color-border-subtle)] rounded-2xl">
              <p className="text-[var(--color-text-tertiary)]">
                {t("community.emptyState")}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Section Divider */}
      <div className="section-divider" />

      {/* Use Cases Section */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)] mb-4">
              {t("useCases.title")}
            </h2>
            <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto">
              {t("useCases.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Creator */}
            <div className="relative p-8 rounded-2xl bg-[var(--color-bg-secondary)] border border-[var(--color-border-subtle)] overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500/20 to-rose-500/20 flex items-center justify-center mb-6">
                  <PenTool className="w-7 h-7 text-pink-400" />
                </div>
                <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-3">
                  {t("useCases.cases.creator.title")}
                </h3>
                <p className="text-[var(--color-text-secondary)] leading-relaxed">
                  {t("useCases.cases.creator.description")}
                </p>
              </div>
            </div>

            {/* Developer */}
            <div className="relative p-8 rounded-2xl bg-[var(--color-bg-secondary)] border border-[var(--color-border-subtle)] overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center mb-6">
                  <Code2 className="w-7 h-7 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-3">
                  {t("useCases.cases.developer.title")}
                </h3>
                <p className="text-[var(--color-text-secondary)] leading-relaxed">
                  {t("useCases.cases.developer.description")}
                </p>
              </div>
            </div>

            {/* Operator */}
            <div className="relative p-8 rounded-2xl bg-[var(--color-bg-secondary)] border border-[var(--color-border-subtle)] overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center mb-6">
                  <BarChart3 className="w-7 h-7 text-amber-400" />
                </div>
                <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-3">
                  {t("useCases.cases.operator.title")}
                </h3>
                <p className="text-[var(--color-text-secondary)] leading-relaxed">
                  {t("useCases.cases.operator.description")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="py-24 lg:py-32 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-[var(--color-bg-secondary)]" />
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--color-accent-primary)] opacity-5 blur-[150px] rounded-full" />

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)] mb-4">
            {t("cta.title")}
          </h2>
          <p className="text-lg text-[var(--color-text-secondary)] mb-10">
            {t("cta.subtitle")}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://chromewebstore.google.com/detail/prompt-flow/hfifkmpkoiciamimifcahopbdefknnko"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold btn-glow w-full sm:w-auto justify-center"
            >
              <Chrome className="w-5 h-5" />
              {t("cta.chrome")}
            </a>
            <Link
              href="/community"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-medium text-[var(--color-text-primary)] bg-[var(--color-bg-tertiary)] border border-[var(--color-border-subtle)] hover:border-[var(--color-border-strong)] transition-all w-full sm:w-auto justify-center"
            >
              {t("cta.browseCommunity")}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
