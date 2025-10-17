import { Suspense } from "react";
import { Metadata } from "next";
import FeatureShowcase from "@/components/blocks/feature-showcase";

export const metadata: Metadata = {
  title: "Platform Features | China Tours",
  description: "Comprehensive overview of all implemented features in the China Tours platform",
  keywords: "platform features, travel booking system, China tours, web development"
};

export default function FeaturesPage() {
  return (
    <div className="min-h-screen">
      <Suspense fallback={<div>Loading features...</div>}>
        <FeatureShowcase />
      </Suspense>
    </div>
  );
}