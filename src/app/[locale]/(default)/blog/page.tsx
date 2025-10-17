import { Suspense } from "react";
import { Metadata } from "next";
import BlogIntegration from "@/components/blocks/blog-integration";

export const metadata: Metadata = {
  title: "China Travel Blog | Tips, Guides & Stories",
  description: "Discover expert travel tips, destination guides, and inspiring stories about traveling in China. Get insider knowledge from local experts.",
  keywords: "China travel blog, travel tips, destination guides, China stories, travel advice"
};

export default function BlogPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              China Travel Blog
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Expert tips, insider guides, and inspiring stories to help you discover the real China
            </p>
          </div>
        </div>
      </div>

      {/* Blog Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <Suspense fallback={<div>Loading blog posts...</div>}>
          <BlogIntegration />
        </Suspense>
      </div>
    </div>
  );
}