import { Metadata } from "next";
import DestinationsListing from "@/components/blocks/destinations-listing";

interface DestinationsPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: DestinationsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const isEnglish = locale === 'en';

  return {
    title: isEnglish 
      ? "China Destinations Guide - Top Places to Visit in China"
      : "中国目的地指南 - 中国最值得游览的地方",
    description: isEnglish
      ? "Explore China's top destinations from Beijing's historic sites to Shanghai's modern skyline. Get insider tips, travel guides, and expert recommendations for your China journey."
      : "探索中国的顶级目的地，从北京的历史遗迹到上海的现代天际线。获取内部小贴士、旅游指南和专家建议，规划您的中国之旅。",
    keywords: isEnglish
      ? "China destinations, places to visit China, Beijing attractions, Shanghai travel, Xi'an tourism, Guilin scenery, Chengdu pandas, China travel destinations, Chinese cities, China sightseeing"
      : "中国目的地, 中国旅游景点, 北京景点, 上海旅游, 西安旅游, 桂林风景, 成都大熊猫, 中国旅游目的地, 中国城市, 中国观光",
    openGraph: {
      title: isEnglish ? "China Destinations Guide - Top Places to Visit" : "中国目的地指南 - 最值得游览的地方",
      description: isEnglish
        ? "Explore China's top destinations with expert guides and insider tips for your perfect journey."
        : "通过专家指南和内部小贴士探索中国的顶级目的地，规划您的完美旅程。",
      images: [
        {
          url: "/imgs/destinations/beijing.jpg",
          width: 1200,
          height: 630,
          alt: isEnglish ? "Beautiful China destinations and landmarks" : "美丽的中国目的地和地标",
        },
      ],
    },
  };
}

export default async function DestinationsPage({ params }: DestinationsPageProps) {
  const { locale } = await params;
  
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {locale === 'en' ? 'China Destinations' : '中国目的地'}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {locale === 'en' 
              ? 'From ancient capitals to modern metropolises, natural wonders to cultural treasures. Discover the diverse beauty and rich heritage of China\'s most captivating destinations.'
              : '从古代首都到现代大都市，从自然奇观到文化宝藏。发现中国最迷人目的地的多样美景和丰富遗产。'
            }
          </p>
        </header>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">
            {locale === 'en' ? 'Explore by Category' : '按类别探索'}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-red-800">
                {locale === 'en' ? '🏛️ Historic Cities' : '🏛️ 历史名城'}
              </h3>
              <p className="text-red-700">
                {locale === 'en' ? 'Beijing, Xi\'an, Nanjing' : '北京、西安、南京'}
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-blue-800">
                {locale === 'en' ? '🌆 Modern Cities' : '🌆 现代都市'}
              </h3>
              <p className="text-blue-700">
                {locale === 'en' ? 'Shanghai, Shenzhen, Guangzhou' : '上海、深圳、广州'}
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-green-800">
                {locale === 'en' ? '🏔️ Natural Wonders' : '🏔️ 自然奇观'}
              </h3>
              <p className="text-green-700">
                {locale === 'en' ? 'Guilin, Zhangjiajie, Jiuzhaigou' : '桂林、张家界、九寨沟'}
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-purple-800">
                {locale === 'en' ? '🎋 Cultural Hubs' : '🎋 文化中心'}
              </h3>
              <p className="text-purple-700">
                {locale === 'en' ? 'Chengdu, Suzhou, Hangzhou' : '成都、苏州、杭州'}
              </p>
            </div>
          </div>
        </section>

        <DestinationsListing />
      </div>
    </div>
  );
}