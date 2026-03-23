import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getCanonicalPath, getLanguageAlternates, getSiteUrl } from "@/lib/seo";
import { getAllCategories, getAllPrompts, getAllTags } from "@/lib/community-prompts";

const STATIC_ROUTES = ["/", "/community"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const dynamicRoutes = [
    ...getAllPrompts().map((prompt) => `/community/${prompt.slug}`),
    ...getAllCategories().map((category) => `/community/category/${category.slug}`),
    ...getAllTags().map((tag) => `/community/tag/${tag.slug}`),
  ];
  const routes = [...STATIC_ROUTES, ...dynamicRoutes];

  return routes.flatMap((route) =>
    routing.locales.map((locale) => {
      const pathname = route === "/" ? "/" : route;
      const canonicalPath = getCanonicalPath(locale, pathname);
      const languages = getLanguageAlternates(pathname);

      return {
        url: `${siteUrl}${canonicalPath}`,
        lastModified: new Date(),
        alternates: {
          languages: Object.fromEntries(
            Object.entries(languages).map(([key, value]) => [key, `${siteUrl}${value}`])
          ),
        },
      };
    })
  );
}
