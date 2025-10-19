import { Metadata } from "next";

interface TourPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const metadata: Metadata = {
  title: "Tour Details",
  description: "Tour details page",
};

export default async function TourPage({ params }: TourPageProps) {
  const { slug } = await params;
  
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Tour: {slug}</h1>
      <p>Tour details for {slug} go here.</p>
    </div>
  );
}