import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Zap,
  Folder,
  Share2,
  Chrome,
} from "lucide-react";
import { Button } from "@/components/Button";
import { getTranslations } from "next-intl/server";

export default async function HomePage() {
  const t = await getTranslations("home");

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white pt-24 pb-32 sm:pt-32 sm:pb-40">
        <div className="absolute inset-x-0 top-0 h-96 bg-linear-to-b from-neutral-100 to-transparent" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center rounded-full border border-neutral-200 bg-white px-3 py-1 text-sm font-medium text-neutral-600 mb-8 shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 mr-2"></span>
            {t("badge")}
          </div>

          <h1 className="mx-auto max-w-4xl text-5xl font-bold tracking-tight text-neutral-900 sm:text-7xl mb-6">
            {t("title")}
          </h1>

          <p className="mx-auto max-w-2xl text-lg text-neutral-600 mb-10 leading-relaxed">
            {t("description")}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="w-full sm:w-auto gap-2">
              <Chrome className="h-5 w-5" />
              {t("installChrome")}
            </Button>
            <Link href="/prompts" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto gap-2"
              >
                {t("explorePrompts")}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          {/* Product Screenshot Placeholder */}
          <div className="mt-20 mx-auto max-w-5xl rounded-2xl border border-neutral-200 bg-white shadow-2xl overflow-hidden ring-1 ring-neutral-900/5">
            <div className="h-12 border-b border-neutral-200 bg-neutral-50 flex items-center px-4 gap-2">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-red-400"></div>
                <div className="h-3 w-3 rounded-full bg-amber-400"></div>
                <div className="h-3 w-3 rounded-full bg-emerald-400"></div>
              </div>
            </div>
            <div className="aspect-[16/9] bg-neutral-100 flex items-center justify-center p-8">
              <div className="w-full h-full border border-dashed border-neutral-300 rounded-xl bg-white/50 flex items-center justify-center text-neutral-400 font-mono text-sm">
                {t("screenshotPlaceholder")}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-neutral-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
              {t("features.title")}
            </h2>
            <p className="mt-4 text-lg text-neutral-600">
              {t("features.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<Zap className="h-6 w-6 text-amber-500" />}
              title={t("features.saveInstantly.title")}
              description={t("features.saveInstantly.description")}
            />
            <FeatureCard
              icon={<CheckCircle2 className="h-6 w-6 text-emerald-500" />}
              title={t("features.insertOneClick.title")}
              description={t("features.insertOneClick.description")}
            />
            <FeatureCard
              icon={<Folder className="h-6 w-6 text-blue-500" />}
              title={t("features.organize.title")}
              description={t("features.organize.description")}
            />
            <FeatureCard
              icon={<Share2 className="h-6 w-6 text-purple-500" />}
              title={t("features.share.title")}
              description={t("features.share.description")}
            />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 bg-white border-t border-neutral-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl mb-8">
                {t("howItWorks.title")}
              </h2>

              <div className="space-y-8">
                <Step
                  number="1"
                  title={t("howItWorks.step1.title")}
                  description={t("howItWorks.step1.description")}
                />
                <Step
                  number="2"
                  title={t("howItWorks.step2.title")}
                  description={t("howItWorks.step2.description")}
                />
                <Step
                  number="3"
                  title={t("howItWorks.step3.title")}
                  description={t("howItWorks.step3.description")}
                />
              </div>
            </div>

            <div className="bg-neutral-100 rounded-3xl p-8 aspect-square flex items-center justify-center border border-neutral-200">
              <div className="text-neutral-400 font-mono text-sm">
                {t("howItWorks.demoPlaceholder")}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-neutral-900 text-white text-center">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
            {t("cta.title")}
          </h2>
          <p className="text-lg text-neutral-400 mb-10">{t("cta.subtitle")}</p>
          <Button
            size="lg"
            className="bg-white text-neutral-900 hover:bg-neutral-100 gap-2"
          >
            <Chrome className="h-5 w-5" />
            {t("cta.button")}
          </Button>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm transition-all hover:shadow-md">
      <div className="h-12 w-12 rounded-xl bg-neutral-50 flex items-center justify-center border border-neutral-100 mb-6">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-neutral-900 mb-2">{title}</h3>
      <p className="text-neutral-500 text-sm leading-relaxed">{description}</p>
    </div>
  );
}

function Step({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-4">
      <div className="shrink-0 flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900 text-white font-semibold">
        {number}
      </div>
      <div>
        <h3 className="text-xl font-semibold text-neutral-900 mb-2">{title}</h3>
        <p className="text-neutral-500 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
