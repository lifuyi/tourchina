"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, Eye, MessageCircle, Share2, Flag, Pin, Lock, CheckCircle } from "lucide-react";
import Link from "next/link";

interface TopicDetailProps {
  slug: string;
}

export default function TopicDetail({ slug }: TopicDetailProps) {
  // Mock data - in real app, fetch from API using slug
  const topic = {
    uuid: "t1",
    title: "First time visiting Beijing - need advice on 5-day itinerary",
    content: `Hi everyone! 👋

I'm planning my first trip to Beijing this spring (April 2024) and I'm feeling a bit overwhelmed with all the options. I have 5 full days and want to make the most of it. Here's what I'm thinking so far:

**Background:**
- First time in China
- Interested in history, culture, and food
- Medium budget (~$100-150/day including accommodation)
- Staying near Wangfujing area

**Questions:**
1. Is 5 days enough to see the main attractions?
2. Should I book tours or explore independently?
3. Any specific restaurants you'd recommend?
4. Best way to get around the city?

I've been reading about the Great Wall, Forbidden City, and Temple of Heaven. Are there any hidden gems I should know about?

Thanks in advance for any advice! 🙏`,
    author_name: "NewTraveler2024",
    author_avatar: "/imgs/users/7.png",
    category_name: "General Travel Discussion",
    category_slug: "general-travel",
    reply_count: 23,
    view_count: 445,
    like_count: 12,
    is_pinned: false,
    is_locked: false,
    is_solved: false,
    tags: ["beijing", "itinerary", "first-time", "spring-travel"],
    created_at: "2024-01-14T14:20:00Z",
    updated_at: "2024-01-14T14:20:00Z"
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500">
        <Link href="/forum" className="hover:text-blue-600">Forum</Link>
        <span className="mx-2">›</span>
        <Link href={`/forum/category/${topic.category_slug}`} className="hover:text-blue-600">
          {topic.category_name}
        </Link>
        <span className="mx-2">›</span>
        <span className="text-gray-900">{topic.title}</span>
      </nav>

      {/* Topic Header */}
      <Card className="p-6">
        <div className="flex items-start gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={topic.author_avatar} />
            <AvatarFallback>{topic.author_name[0]}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              {topic.is_pinned && <Pin className="h-4 w-4 text-blue-600" />}
              {topic.is_locked && <Lock className="h-4 w-4 text-gray-400" />}
              {topic.is_solved && <CheckCircle className="h-4 w-4 text-green-600" />}
              <h1 className="text-2xl font-bold text-gray-900">{topic.title}</h1>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
              <span className="font-medium text-gray-700">by {topic.author_name}</span>
              <Badge variant="outline">{topic.category_name}</Badge>
              <span>{formatTimeAgo(topic.created_at)}</span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {topic.tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  #{tag}
                </Badge>
              ))}
            </div>

            {/* Topic Stats */}
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                {topic.view_count} views
              </span>
              <span className="flex items-center gap-1">
                <MessageCircle className="h-4 w-4" />
                {topic.reply_count} replies
              </span>
              <span className="flex items-center gap-1">
                <Heart className="h-4 w-4" />
                {topic.like_count} likes
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Heart className="h-4 w-4 mr-1" />
              Like
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-1" />
              Share
            </Button>
            <Button variant="outline" size="sm">
              <Flag className="h-4 w-4 mr-1" />
              Report
            </Button>
          </div>
        </div>
      </Card>

      {/* Topic Content */}
      <Card className="p-6">
        <div className="prose max-w-none">
          <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
            {topic.content}
          </div>
        </div>
        
        {/* Author Signature */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={topic.author_avatar} />
              <AvatarFallback>{topic.author_name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium text-gray-900">{topic.author_name}</div>
              <div className="text-xs text-gray-500">Forum Member since 2024</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}