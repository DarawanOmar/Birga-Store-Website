import { NextIntlClientProvider } from "next-intl";
import "./globals.css";
import { fontSirwan } from "@/public/fonts";
import { ThemeProvider } from "@/providers/theme-providers";
import { Viewport, Metadata } from "next";
import { routing } from "@/i18n/routing";
import { StructuredData } from "@/components/seo/structured-data";
import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  return (
    <html
      dir={locale === "en" ? "ltr" : "rtl"}
      lang={locale === "ckb" ? "ku" : locale}
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

export const metadata: Metadata = {
  title: "Birga Store",
  description:
    "Birga Store is a store management for your business and products",
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
      url: "https://birgastoresystem.vercel.app",
    },
  ],
  creator: "Birga Soft",
  publisher: "Birga Soft",
  referrer: "origin-when-cross-origin",
  generator: "Next.js",
  category: "Store Management",
  manifest: "/manifest.webmanifest",
  metadataBase: new URL("https://birgastoresystem.vercel.app"),
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
};

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
