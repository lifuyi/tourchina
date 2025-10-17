import { Suspense } from "react";
import { Metadata } from "next";
import FavoritesSystem from "@/components/blocks/favorites-system";

export const metadata: Metadata = {
  title: "My Favorites | China Tours",
  description: "View and manage your saved tours, destinations, and travel guides",
  keywords: "favorites, saved tours, wishlist, China travel"
};

export default function FavoritesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <Suspense fallback={<div>Loading favorites...</div>}>
          <FavoritesSystem />
        </Suspense>
      </div>
    </div>
  );
}