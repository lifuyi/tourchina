import { Suspense } from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import TopicDetail from "@/components/blocks/forum/topic-detail";
import TopicReplies from "@/components/blocks/forum/topic-replies";
import ReplyForm from "@/components/blocks/forum/reply-form";

interface Props {
  params: {
    slug: string;
    locale: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // In real app, fetch topic data
  const topic = {
    title: "First time visiting Beijing - need advice on 5-day itinerary",
    description: "Planning my first trip to Beijing and looking for advice on the best 5-day itinerary..."
  };

  return {
    title: `${topic.title} | China Travel Forum`,
    description: topic.description,
  };
}

export default function TopicPage({ params }: Props) {
  // Mock data - in real app, fetch from API using params.slug
  const topicExists = true;

  if (!topicExists) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Topic Detail */}
        <Suspense fallback={<div>Loading topic...</div>}>
          <TopicDetail slug={params.slug} />
        </Suspense>

        {/* Topic Replies */}
        <div className="mt-8">
          <Suspense fallback={<div>Loading replies...</div>}>
            <TopicReplies slug={params.slug} />
          </Suspense>
        </div>

        {/* Reply Form */}
        <div className="mt-8">
          <ReplyForm topicSlug={params.slug} />
        </div>
      </div>
    </div>
  );
}