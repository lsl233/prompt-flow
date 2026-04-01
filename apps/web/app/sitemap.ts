import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getCanonicalPath, getLanguageAlternates, getSiteUrl } from "@/lib/seo";
import { getAllCategories, getAllPrompts } from "@/lib/community-prompts";

const STATIC_ROUTES = ["/", "/community", "/community/category"] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  const prompts = await getAllPrompts();
  const categories = await getAllCategories();
  const dynamicRoutes = [
    ...prompts.map((prompt) => `/community/${prompt.slug}`),
    ...categories.map((category) => `/community/category/${category.slug}`),
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
