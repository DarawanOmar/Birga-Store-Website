export type Locale = (typeof locales)[number];

export const locales = ["en", "ar", "ckb"] as const;
export const defaultLocale: Locale = "ckb";
