import { Suspense } from "react";
import { Metadata } from "next";
import DestinationsListing from "@/components/blocks/destinations-listing";

export const metadata: Metadata = {
  title: "China Destinations | Explore Amazing Places",
  description: "Discover the most beautiful destinations in China. From Beijing's ancient wonders to Shanghai's modern skyline, find your perfect travel destination.",
  keywords: "China destinations, Beijing, Shanghai, Xi'an, Guilin, Chengdu, Chinese cities, travel destinations"
};

export default function DestinationsPage() {
  return (
    <div className="min-h-screen">
      <Suspense fallback={<div>Loading destinations...</div>}>
        <DestinationsListing />
      </Suspense>
    </div>
  );
}