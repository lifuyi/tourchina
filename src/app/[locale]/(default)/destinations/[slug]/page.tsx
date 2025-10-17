import { notFound } from "next/navigation";
import { Metadata } from "next";
import DestinationDetail from "@/components/blocks/destination-detail";

// Mock destination data (in real app, this would come from DB)
const destinations = [
  {
    slug: "beijing",
    name: "Beijing",
    description: "China's capital city, home to the Forbidden City, Great Wall, and countless cultural treasures.",
    featuredImage: "/imgs/destinations/beijing.jpg",
    highlights: ["Forbidden City", "Great Wall", "Temple of Heaven", "Summer Palace"],
    bestTimeToVisit: "Spring (Apr-May) and Autumn (Sep-Oct)",
    weatherInfo: "Continental climate with hot summers and cold winters"
  },
  {
    slug: "shanghai",
    name: "Shanghai",
    description: "Modern metropolis where East meets West, featuring stunning skylines and rich cultural heritage.",
    featuredImage: "/imgs/destinations/shanghai.jpg",
    highlights: ["The Bund", "Yu Garden", "Shanghai Tower", "French Concession"],
    bestTimeToVisit: "Spring (Mar-May) and Autumn (Sep-Nov)",
    weatherInfo: "Subtropical climate with mild winters and hot, humid summers"
  },
  {
    slug: "xian",
    name: "Xi'an",
    description: "Ancient capital of China, famous for the Terracotta Warriors and Silk Road history.",
    featuredImage: "/imgs/destinations/xian.jpg",
    highlights: ["Terracotta Warriors", "Ancient City Wall", "Big Wild Goose Pagoda", "Muslim Quarter"],
    bestTimeToVisit: "Spring (Apr-May) and Autumn (Sep-Oct)",
    weatherInfo: "Continental climate with distinct four seasons"
  }
];

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const destination = destinations.find(d => d.slug === slug);
  
  if (!destination) {
    return {
      title: "Destination Not Found"
    };
  }

  return {
    title: `${destination.name} Travel Guide | China Tours`,
    description: destination.description,
    keywords: `${destination.name}, China travel, ${destination.highlights.join(", ")}`
  };
}

export default async function DestinationPage({ params }: Props) {
  const { slug } = await params;
  const destination = destinations.find(d => d.slug === slug);

  if (!destination) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <DestinationDetail destination={destination} />
    </div>
  );
}

export async function generateStaticParams() {
  return destinations.map((destination) => ({
    slug: destination.slug,
  }));
}