import { Suspense } from "react";
import { Metadata } from "next";
import CustomTripBuilder from "@/components/blocks/custom-trip-builder";

export const metadata: Metadata = {
  title: "Custom Trip Builder | China Tours",
  description: "Create your personalized China tour with our interactive trip builder. Select destinations, customize your itinerary, and get real-time pricing.",
  keywords: "custom China tour, trip builder, personalized itinerary, China travel planner"
};

export default function CustomTripPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Suspense fallback={<div>Loading trip builder...</div>}>
        <CustomTripBuilder />
      </Suspense>
    </div>
  );
}