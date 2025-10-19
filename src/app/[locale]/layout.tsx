import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import { AppContextProvider } from "@/contexts/app";
import { Metadata } from "next";
import { NextAuthSessionProvider } from "@/auth/session";
import { NextIntlClientProvider } from "next-intl";
import { ThemeProvider } from "@/providers/theme";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations();

  const title = t("metadata.title") || "China Travel Expert - Authentic China Tours & Travel Guides";
  const description = t("metadata.description") || "Discover authentic China with expert-curated tours, local guides, and comprehensive travel resources. From the Great Wall to modern Shanghai - plan your perfect China adventure.";
  const keywords = t("metadata.keywords") || "China travel, China tours, Beijing tours, Shanghai travel, Great Wall tours, China travel guide, Chinese culture, Asia travel, custom China tours, China vacation packages";

  return {
    title: {
      template: `%s | China Travel Expert`,
      default: title,
    },
    description,
    keywords,
    authors: [{ name: "China Travel Expert Team" }],
    creator: "China Travel Expert",
    publisher: "China Travel Expert",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(process.env.NEXT_PUBLIC_WEB_URL || 'https://chinatravelexpert.com'),
    alternates: {
      canonical: locale === 'en' ? '/' : `/${locale}`,
      languages: {
        'en': '/',
        'zh': '/zh',
      },
    },
    openGraph: {
      title,
      description,
      url: process.env.NEXT_PUBLIC_WEB_URL,
      siteName: "China Travel Expert",
      images: [
        {
          url: "/preview.png",
          width: 1200,
          height: 630,
          alt: "China Travel Expert - Discover Authentic China",
        },
      ],
      locale: locale === 'zh' ? 'zh_CN' : 'en_US',
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/preview.png"],
      creator: "@chinatravelexp",
      site: "@chinatravelexp",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: "your-google-verification-code",
      yandex: "your-yandex-verification-code",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <NextAuthSessionProvider>
        <AppContextProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </AppContextProvider>
      </NextAuthSessionProvider>
    </NextIntlClientProvider>
  );
}
