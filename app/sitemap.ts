import { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { languageAlternates, localeUrl } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const currentDate = new Date();

  // Each entry repeats the full hreflang set so Google reads the three locales
  // as translations of one another rather than as duplicate pages.
  return locales.map((locale) => ({
    url: localeUrl(locale),
    lastModified: currentDate,
    changeFrequency: "monthly",
    priority: 1,
    alternates: {
      languages: languageAlternates,
    },
  }));
}
