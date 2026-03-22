import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["en", "zh"],

  // Used when no locale matches
  defaultLocale: "en",
  localePrefix: "as-needed",
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];

export function getHtmlLang(locale: string) {
  switch (locale) {
    case "zh":
      return "zh-CN";
    default:
      return "en";
  }
}
