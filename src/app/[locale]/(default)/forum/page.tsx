import { Suspense } from "react";
import { Metadata } from "next";
import ForumCategories from "@/components/blocks/forum/categories";
import ForumStats from "@/components/blocks/forum/stats";
import ForumHeader from "@/components/blocks/forum/header";

export const metadata: Metadata = {
  title: "China Travel Forum | Community Discussions",
  description: "Join the China travel community. Share experiences, ask questions, and get advice from fellow travelers and local experts.",
  keywords: "China travel forum, travel community, travel discussions, China travel advice, travel tips"
};

export default function ForumPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Forum Header */}
      <ForumHeader />
      
      {/* Forum Stats */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Suspense fallback={<div>Loading forum stats...</div>}>
          <ForumStats />
        </Suspense>
      </div>

      {/* Forum Categories */}
      <div className="max-w-7xl mx-auto px-4 pb-12">
        <Suspense fallback={<div>Loading forum categories...</div>}>
          <ForumCategories />
        </Suspense>
      </div>
    </div>
  );
}