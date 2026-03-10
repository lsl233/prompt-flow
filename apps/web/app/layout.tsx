import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import "./[locale]/globals.css";
import Navbar from "./[locale]/_components/Navbar";
import Footer from "./[locale]/_components/Footer";

export const metadata: Metadata = {
  title: "Quick Prompt - Save, reuse, and share AI prompts instantly",
  description: "The fastest way to manage prompts for ChatGPT, Claude, and AI tools. Built for developers, marketers, and prompt engineers to boost productivity.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Set default locale for root path
  setRequestLocale('en');

  // Get messages for default locale
  const messages = await getMessages();

  return (
    <html lang="en">
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
