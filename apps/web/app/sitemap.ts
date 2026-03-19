import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getCanonicalPath, getLanguageAlternates, getSiteUrl } from "@/lib/seo";

const ROUTES = ["/", "/community"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();

  return ROUTES.flatMap((route) =>
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
