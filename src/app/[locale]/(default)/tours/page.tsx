import { Suspense } from "react";
import { Metadata } from "next";
import TourListing from "@/components/blocks/tour-listing";

interface ToursPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: ToursPageProps): Promise<Metadata> {
  const { locale } = await params;
  const isEnglish = locale === 'en';

  return {
    title: isEnglish 
      ? "China Tours & Travel Packages - Expert Curated Adventures"
      : "中国旅游团和旅行套餐 - 专家策划的冒险之旅",
    description: isEnglish
      ? "Explore our comprehensive collection of China tours. From classic Great Wall adventures to cultural immersion experiences. Small groups, expert guides, authentic experiences."
      : "探索我们全面的中国旅游团收藏。从经典的长城冒险到文化沉浸体验。小团体，专家导游，真正的体验。",
    keywords: isEnglish
      ? "China tours, China travel packages, Great Wall tours, Beijing tours, Shanghai tours, Xi'an tours, Guilin tours, China group tours, private China tours, China vacation packages"
      : "中国旅游团, 中国旅行套餐, 长城旅游, 北京旅游, 上海旅游, 西安旅游, 桂林旅游, 中国团体旅游, 中国私人旅游",
    openGraph: {
      title: isEnglish ? "China Tours & Travel Packages" : "中国旅游团和旅行套餐",
      description: isEnglish
        ? "Explore our comprehensive collection of China tours with expert guides and authentic experiences."
        : "探索我们全面的中国旅游团收藏，配有专家导游和真正的体验。",
      images: [
        {
          url: "/imgs/showcases/classic-china.jpg",
          width: 1200,
          height: 630,
          alt: isEnglish ? "China tour packages and destinations" : "中国旅游套餐和目的地",
        },
      ],
    },
  };
}

export default async function ToursPage({ params }: ToursPageProps) {
  const { locale } = await params;
  
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {locale === 'en' ? 'China Tours & Travel Packages' : '中国旅游团和旅行套餐'}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {locale === 'en' 
              ? 'Discover authentic China with our expert-curated tours. From ancient wonders to modern marvels, experience the best of China with local guides and personalized itineraries.'
              : '通过我们专家策划的旅游团发现真正的中国。从古代奇迹到现代奇观，与当地导游和个性化行程体验中国的精华。'
            }
          </p>
        </header>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">
            {locale === 'en' ? 'Popular Tour Categories' : '热门旅游类别'}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2">
                {locale === 'en' ? 'Classic China Tours' : '经典中国旅游'}
              </h3>
              <p className="text-gray-600">
                {locale === 'en' 
                  ? 'Beijing, Xi\'an, Shanghai - The golden triangle of China travel'
                  : '北京、西安、上海 - 中国旅行的黄金三角'
                }
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2">
                {locale === 'en' ? 'Cultural Heritage Tours' : '文化遗产旅游'}
              </h3>
              <p className="text-gray-600">
                {locale === 'en' 
                  ? 'UNESCO sites, ancient temples, and traditional experiences'
                  : '联合国教科文组织遗址、古代寺庙和传统体验'
                }
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2">
                {locale === 'en' ? 'Natural Wonders' : '自然奇观'}
              </h3>
              <p className="text-gray-600">
                {locale === 'en' 
                  ? 'Guilin landscapes, Zhangjiajie mountains, and scenic cruises'
                  : '桂林风景、张家界山脉和风景游船'
                }
              </p>
            </div>
          </div>
        </section>

        <Suspense fallback={<div>Loading tours...</div>}>
          <TourListing />
        </Suspense>
      </div>
    </div>
  );
}