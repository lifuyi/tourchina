import { Suspense } from "react";
import { Metadata } from "next";
import TourListing from "@/components/blocks/tour-listing";

export const metadata: Metadata = {
  title: "China Tours & Travel Guides | Browse All Tours",
  description: "Discover amazing China tours and digital travel guides. Choose from custom tour services or instant download guides for Beijing, Shanghai, Xi'an and more.",
  keywords: "China tours, China travel guides, Beijing tours, Shanghai tours, digital guides, custom tours"
};

export default function ToursPage() {
  return (
    <div className="min-h-screen">
      <Suspense fallback={<div>Loading tours...</div>}>
        <TourListing />
      </Suspense>
    </div>
  );
}