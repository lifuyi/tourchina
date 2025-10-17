import { Suspense } from "react";
import { Metadata } from "next";
import ContentManagement from "@/components/blocks/content-management";

export const metadata: Metadata = {
  title: "Content Management | Admin Panel",
  description: "Manage website content, blog posts, destinations, and tours",
  keywords: "content management, CMS, admin panel, China tours"
};

export default function ContentManagementPage() {
  return (
    <div className="min-h-screen">
      <Suspense fallback={<div>Loading content management...</div>}>
        <ContentManagement />
      </Suspense>
    </div>
  );
}