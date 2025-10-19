import Branding from "@/components/blocks/branding";
import CTA from "@/components/blocks/cta";
import FAQ from "@/components/blocks/faq";
import Feature from "@/components/blocks/feature";
import Feature1 from "@/components/blocks/feature1";
import Feature2 from "@/components/blocks/feature2";
import Feature3 from "@/components/blocks/feature3";
import Hero from "@/components/blocks/hero";
import Pricing from "@/components/blocks/pricing";
import Showcase from "@/components/blocks/showcase";
import Stats from "@/components/blocks/stats";
import Testimonial from "@/components/blocks/testimonial";
import { getLandingPage } from "@/services/page";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  let canonicalUrl = `${process.env.NEXT_PUBLIC_WEB_URL}`;

  if (locale !== "en") {
    canonicalUrl = `${process.env.NEXT_PUBLIC_WEB_URL}/${locale}`;
  }

  const isEnglish = locale === 'en';
  
  return {
    title: isEnglish 
      ? "China Travel Expert - Authentic China Tours & Cultural Experiences"
      : "中国旅游专家 - 正宗中国旅游和文化体验",
    description: isEnglish
      ? "Discover authentic China with expert-curated tours, local guides, and comprehensive travel resources. From the Great Wall to modern Shanghai - plan your perfect China adventure with personalized itineraries."
      : "通过专家策划的旅游、当地导游和全面的旅游资源发现真正的中国。从长城到现代上海 - 用个性化行程规划您完美的中国冒险之旅。",
    keywords: isEnglish
      ? "China travel, China tours, Beijing tours, Shanghai travel, Great Wall tours, China travel guide, Chinese culture, Asia travel, custom China tours, China vacation packages, Forbidden City, Terracotta Warriors, Li River cruise, Chinese food tours"
      : "中国旅游, 中国旅行团, 北京旅游, 上海旅行, 长城旅游, 中国旅游指南, 中国文化, 亚洲旅行, 定制中国旅游, 中国度假套餐",
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: isEnglish 
        ? "China Travel Expert - Authentic China Tours & Cultural Experiences"
        : "中国旅游专家 - 正宗中国旅游和文化体验",
      description: isEnglish
        ? "Discover authentic China with expert-curated tours, local guides, and comprehensive travel resources. Plan your perfect China adventure."
        : "通过专家策划的旅游和当地导游发现真正的中国。规划您完美的中国冒险之旅。",
      url: canonicalUrl,
      type: "website",
      images: [
        {
          url: "/imgs/showcases/classic-china.jpg",
          width: 1200,
          height: 630,
          alt: isEnglish ? "Beautiful China landscapes and cultural sites" : "美丽的中国风景和文化遗址",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: isEnglish 
        ? "China Travel Expert - Authentic China Tours & Cultural Experiences"
        : "中国旅游专家 - 正宗中国旅游和文化体验",
      description: isEnglish
        ? "Discover authentic China with expert tours and local guides. Plan your perfect adventure."
        : "通过专家旅游和当地导游发现真正的中国。规划您完美的冒险之旅。",
      images: ["/imgs/showcases/classic-china.jpg"],
    },
  };
}

export default async function LandingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const page = await getLandingPage(locale);

  return (
    <>
      {page.hero && <Hero hero={page.hero} />}
      {page.branding && <Branding section={page.branding} />}
      {page.introduce && <Feature1 section={page.introduce} />}
      {page.benefit && <Feature2 section={page.benefit} />}
      {page.usage && <Feature3 section={page.usage} />}
      {page.feature && <Feature section={page.feature} />}
      {page.showcase && <Showcase section={page.showcase} />}
      {page.stats && <Stats section={page.stats} />}
      {page.pricing && <Pricing pricing={page.pricing} />}
      {page.testimonial && <Testimonial section={page.testimonial} />}
      {page.faq && <FAQ section={page.faq} />}
      {page.cta && <CTA section={page.cta} />}
    </>
  );
}
