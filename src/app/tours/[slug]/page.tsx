import { Metadata } from "next";
import { notFound } from "next/navigation";
import TourDetail from "@/components/blocks/tour-detail";

// Mock function to get tour data
async function getTour(slug: string) {
  // This would typically fetch from your database
  const mockTours = {
    "complete-beijing-travel-guide": {
      id: "1",
      title: "Complete Beijing Travel Guide",
      slug: "complete-beijing-travel-guide",
      description: "The ultimate digital guide to Beijing with insider tips, detailed maps, and cultural insights",
      content: `
        <h2>What You'll Get</h2>
        <p>This comprehensive 120-page digital guide covers everything you need to know about Beijing:</p>
        <ul>
          <li>Interactive maps with GPS coordinates</li>
          <li>50+ restaurant recommendations with reviews</li>
          <li>Transportation guides including subway and bus systems</li>
          <li>Cultural tips and local customs</li>
          <li>Essential Mandarin phrases with pronunciation</li>
          <li>Emergency contacts and useful information</li>
        </ul>
        
        <h2>Sample Itineraries</h2>
        <p>The guide includes 3 sample itineraries:</p>
        <ul>
          <li>3-day highlights tour</li>
          <li>5-day comprehensive exploration</li>
          <li>7-day cultural immersion</li>
        </ul>
      `,
      type: "digital" as const,
      category: "city-guide",
      destinations: ["Beijing"],
      duration: 0,
      price: 1999, // $19.99
      currency: "USD",
      featured: true,
      images: [
        "/imgs/showcases/beijing-guide.jpg",
        "/imgs/destinations/beijing.jpg"
      ],
      rating: 480, // 4.8 stars
      reviewCount: 124,
      fileUrl: "/downloads/beijing-guide.pdf",
      fileSize: "45 MB",
      fileFormat: "PDF",
      features: [
        "120 pages of expert content",
        "Interactive maps with GPS",
        "50+ restaurant recommendations", 
        "Transportation guides",
        "Cultural tips & phrases",
        "Emergency contacts",
        "Offline access",
        "Regular updates included"
      ]
    },
    "classic-china-explorer": {
      id: "2",
      title: "Classic China Explorer",
      slug: "classic-china-explorer",
      description: "14-day guided tour covering Beijing, Xi'an, and Shanghai with expert local guides",
      content: `
        <h2>Tour Overview</h2>
        <p>Experience the best of China in 14 unforgettable days. This carefully crafted itinerary takes you through China's most iconic destinations with expert local guides.</p>
        
        <h2>What's Included</h2>
        <ul>
          <li>13 nights accommodation (4-star hotels)</li>
          <li>All transportation between cities</li>
          <li>Professional English-speaking guides</li>
          <li>All entrance fees to attractions</li>
          <li>Daily breakfast and select lunches/dinners</li>
          <li>24/7 local support</li>
        </ul>
        
        <h2>Sample Itinerary</h2>
        <h3>Days 1-5: Beijing</h3>
        <p>Explore the Great Wall, Forbidden City, Temple of Heaven, and Summer Palace</p>
        
        <h3>Days 6-9: Xi'an</h3>
        <p>Discover the Terracotta Warriors, Ancient City Wall, and Muslim Quarter</p>
        
        <h3>Days 10-14: Shanghai</h3>
        <p>Experience the Bund, Yu Garden, and modern Pudong district</p>
      `,
      type: "service" as const,
      category: "multi-city",
      destinations: ["Beijing", "Xi'an", "Shanghai"],
      duration: 14,
      priceFrom: 229900, // From $2,299
      currency: "USD",
      featured: true,
      images: [
        "/imgs/showcases/classic-china.jpg",
        "/imgs/destinations/beijing.jpg",
        "/imgs/destinations/xian.jpg",
        "/imgs/destinations/shanghai.jpg"
      ],
      rating: 490, // 4.9 stars
      reviewCount: 89,
      groupSizeMin: 2,
      groupSizeMax: 12,
      difficultyLevel: "easy",
      bestTime: "April-May, September-November"
    }
  };

  return mockTours[slug as keyof typeof mockTours] || null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tour = await getTour(slug);

  if (!tour) {
    return {
      title: "Tour Not Found",
    };
  }

  return {
    title: `${tour.title} | China Tours`,
    description: tour.description,
    keywords: `${tour.destinations.join(", ")}, China tour, travel guide`,
  };
}

export default async function TourDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tour = await getTour(slug);

  if (!tour) {
    notFound();
  }

  return <TourDetail tour={tour} />;
}