import FAQ from "@/components/blocks/faq";
import { getPage } from "@/services/page";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  let canonicalUrl = `${process.env.NEXT_PUBLIC_WEB_URL}/faq`;

  if (locale !== "en") {
    canonicalUrl = `${process.env.NEXT_PUBLIC_WEB_URL}/${locale}/faq`;
  }

  return {
    title: "FAQ - China Tour Guide",
    description: "Frequently asked questions about the China Tour Guide - your complete digital travel guide for China.",
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default async function FAQPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const page = await getPage("faq", locale);

  return <>{page.faq && <FAQ section={page.faq} />}</>;
}
