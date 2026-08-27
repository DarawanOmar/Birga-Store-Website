import { NextIntlClientProvider } from "next-intl";
import "./globals.css";
import { fontSirwan } from "@/public/fonts";
import { ThemeProvider } from "@/providers/theme-providers";
import { Viewport, Metadata } from "next";
import { routing } from "@/i18n/routing";
import { StructuredData } from "@/components/seo/structured-data";
import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";
import { getTranslations } from "next-intl/server";
import { type Locale } from "@/i18n/config";
import {
  BASE_URL,
  alternateOpenGraphLocales,
  languageAlternates,
  localeUrl,
  openGraphLocale,
} from "@/lib/seo";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}>) {
  const { locale } = await params;
  return (
    <html
      dir={locale === "en" ? "ltr" : "rtl"}
      // `ckb`, not `ku`: the hreflang tags and the middleware's `Link` headers
      // both use `ckb`, and mismatched codes read as conflicting annotations.
      lang={locale}
      suppressHydrationWarning
    >
      <head>
        <meta
          name="google-site-verification"
          content={process.env.GOOGLE_SITE_VERIFICATION!}
        />
        <StructuredData type="organization" />
        <StructuredData type="website" />
      </head>
      <body
        className={cn(`${fontSirwan.variable} ${inter.variable}  font-medium`, {
          "font-inter ": locale === "en",
          "font-sirwan ": locale !== "en",
        })}
      >
        <NextIntlClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
          >
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "intro.seo" });

  const title = t("title");
  const description = t("description");

  return {
    title,
    description,
    keywords: [
      "Birga Store",
      "birgastore",
      "birga store",
      "E-commerce",
      "Store Management",
    ],
    authors: [
      {
        name: "Birga Soft",
        url: BASE_URL,
      },
    ],
    creator: "Birga Soft",
    publisher: "Birga Soft",
    referrer: "origin-when-cross-origin",
    generator: "Next.js",
    category: "Store Management",
    manifest: "/manifest.webmanifest",
    metadataBase: new URL(BASE_URL),
    robots: {
      index: true,
      follow: true,
      nocache: false,
      noimageindex: false,
      nosnippet: false,
      noarchive: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        "max-video-preview": -1,
        "max-image-preview": "standard",
        "max-snippet": -1,
      },
    },
    alternates: {
      // Each locale must point at itself. A single shared canonical told Google
      // that /en, /ar and /ckb were all the same page, so it collapsed them
      // into one cluster and dropped the rest as duplicates.
      canonical: localeUrl(locale),
      languages: languageAlternates,
    },
    openGraph: {
      type: "website",
      siteName: "Birga Store",
      url: localeUrl(locale),
      title,
      description,
      locale: openGraphLocale(locale),
      alternateLocale: alternateOpenGraphLocales(locale),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export const viewport: Viewport = {
  userScalable: false,
  maximumScale: 1,
  minimumScale: 1,
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  height: "device-height",
  interactiveWidget: "resizes-content",
};
