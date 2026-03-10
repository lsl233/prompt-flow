import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { routing } from "@/i18n/routing";
import "./globals.css";
import Navbar from "./_components/Navbar";
import Footer from "./_components/Footer";

type Locale = typeof routing.locales[number];

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
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

  return (
    <html lang={locale === 'zh' ? 'zh-CN' : 'en'}>
      <body className="min-h-screen bg-neutral-50 flex flex-col font-sans text-neutral-900 selection:bg-emerald-200 selection:text-emerald-900">
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
