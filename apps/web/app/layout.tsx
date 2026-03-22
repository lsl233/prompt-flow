import type { Metadata } from "next";
import { headers } from "next/headers";
import { getMetadataBase } from "@/lib/seo";
import { getHtmlLang, routing } from "@/i18n/routing";
import "./[locale]/globals.css";

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: {
    default: "PromptFlow - Access Your Prompts in Any AI Tool",
    template: "%s | PromptFlow",
  },
  description:
    "PromptFlow helps you organize and access your prompt library across ChatGPT, Claude, DeepSeek, and other AI tools.",
  applicationName: "PromptFlow",
  category: "productivity",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/icon-128.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const requestHeaders = await headers();
  const requestLocale =
    requestHeaders.get("X-NEXT-INTL-LOCALE") ?? routing.defaultLocale;

  return (
    <html lang={getHtmlLang(requestLocale)} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
