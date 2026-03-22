import type { Metadata } from "next";
import type { Locale } from "@/i18n/routing";

const DEFAULT_SITE_URL = "https://promptflow.io";
const DEFAULT_OG_IMAGE = "/screen-short/hero.light.webp";

export function getSiteUrl() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    DEFAULT_SITE_URL;

  return siteUrl.endsWith("/") ? siteUrl.slice(0, -1) : siteUrl;
}

export function getMetadataBase() {
  return new URL(getSiteUrl());
}

export function getLocalePath(locale: Locale, pathname = "") {
  const normalizedPath = pathname.startsWith("/") ? pathname : `/${pathname}`;

  if (locale === "en") {
    return normalizedPath === "/" ? "/" : normalizedPath;
  }

  return normalizedPath === "/" ? `/${locale}` : `/${locale}${normalizedPath}`;
}

export function getCanonicalPath(locale: Locale, pathname = "") {
  return getLocalePath(locale, pathname || "/");
}

export function getLanguageAlternates(pathname = "") {
  return {
    en: getLocalePath("en", pathname),
    "zh-CN": getLocalePath("zh", pathname),
    "x-default": getLocalePath("en", pathname),
  };
}

export function getOpenGraphLocale(locale: Locale) {
  switch (locale) {
    case "zh":
      return "zh_CN";
    default:
      return "en_US";
  }
}

export function buildPageMetadata({
  locale,
  pathname = "/",
  title,
  description,
  image = DEFAULT_OG_IMAGE,
}: {
  locale: Locale;
  pathname?: string;
  title: string;
  description: string;
  image?: string;
}): Metadata {
  const canonical = getCanonicalPath(locale, pathname);

  return {
    metadataBase: getMetadataBase(),
    title,
    description,
    alternates: {
      canonical,
      languages: getLanguageAlternates(pathname),
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: canonical,
      siteName: "PromptFlow",
      locale: getOpenGraphLocale(locale),
      images: [
        {
          url: image,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
