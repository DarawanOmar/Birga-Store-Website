import { locales, type Locale } from "@/i18n/config";

export const BASE_URL = "https://birgastoresystem.vercel.app";

// These codes have to match the ones the next-intl middleware writes into its
// `Link: rel="alternate"` response headers, otherwise Google sees two
// conflicting hreflang annotations for the same page.
const hreflangCode: Record<Locale, string> = {
  en: "en",
  ar: "ar",
  ckb: "ckb",
};

const ogLocale: Record<Locale, string> = {
  en: "en_US",
  ar: "ar_IQ",
  ckb: "ckb_IQ",
};

export const localeUrl = (locale: Locale) => `${BASE_URL}/${locale}`;

export const openGraphLocale = (locale: Locale) => ogLocale[locale];

export const alternateOpenGraphLocales = (locale: Locale) =>
  locales.filter((l) => l !== locale).map((l) => ogLocale[l]);

// `x-default` points at the unprefixed root, which is the URL that negotiates
// the visitor's language and redirects to the matching locale.
export const languageAlternates: Record<string, string> = {
  ...Object.fromEntries(locales.map((l) => [hreflangCode[l], localeUrl(l)])),
  "x-default": BASE_URL,
};
