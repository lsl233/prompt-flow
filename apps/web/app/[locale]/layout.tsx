import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { routing } from "@/i18n/routing";
import "./globals.css";
import { Navbar } from "./_components/Navbar";
import Footer from "./_components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";

type Locale = (typeof routing.locales)[number];

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        "zh-CN": "/zh",
        "zh-TW": "/zh-Hant",
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      locale: locale === "zh" ? "zh_CN" : locale === "zh-Hant" ? "zh_TW" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Get messages for the current locale
  const messages = await getMessages();
  const t = await getTranslations("nav");

  return (
    <NextIntlClientProvider messages={messages}>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem={false}
        disableTransitionOnChange={false}
      >
        <Navbar
          t={{
            brand: t("brand"),
            features: t("features"),
            community: t("community"),
            install: t("install"),
            github: t("github"),
          }}
        />
        <main className="flex-grow">{children}</main>
        <Footer />
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
