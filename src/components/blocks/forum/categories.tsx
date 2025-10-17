"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageCircle, Pin, Lock, Users } from "lucide-react";
import Link from "next/link";

export default function ForumCategories() {
  // Mock data - in real app, fetch from API
  const categories = [
    {
      uuid: "1",
      name: "General Travel Discussion",
      slug: "general-travel",
      description: "General questions and discussions about traveling in China",
      icon: "🗣️",
      color: "bg-blue-100 text-blue-800",
      topic_count: 1247,
      post_count: 5632,
      last_post_at: "2024-01-15T10:30:00Z",
      last_post_by: "TravelExpert88",
      last_post_avatar: "/imgs/users/1.png"
    },
    {
      uuid: "2", 
      name: "Destination Guides",
      slug: "destination-guides",
      description: "Share and discover detailed guides for Chinese cities and attractions",
      icon: "🏛️",
      color: "bg-green-100 text-green-800",
      topic_count: 892,
      post_count: 3421,
      last_post_at: "2024-01-15T09:15:00Z",
      last_post_by: "BeijingLocal",
      last_post_avatar: "/imgs/users/2.png"
    },
    {
      uuid: "3",
      name: "Travel Tips & Hacks",
      slug: "travel-tips",
      description: "Money-saving tips, travel hacks, and insider knowledge",
      icon: "💡",
      color: "bg-yellow-100 text-yellow-800",
      topic_count: 634,
      post_count: 2847,
      last_post_at: "2024-01-15T08:45:00Z",
      last_post_by: "BudgetTraveler",
      last_post_avatar: "/imgs/users/3.png"
    },
    {
      uuid: "4",
      name: "Food & Culture",
      slug: "food-culture",
      description: "Discuss Chinese cuisine, cultural experiences, and local customs",
      icon: "🥢",
      color: "bg-red-100 text-red-800",
      topic_count: 456,
      post_count: 1923,
      last_post_at: "2024-01-15T07:20:00Z",
      last_post_by: "FoodieAdventurer",
      last_post_avatar: "/imgs/users/4.png"
    },
    {
      uuid: "5",
      name: "Transportation",
      slug: "transportation",
      description: "Flights, trains, buses, and getting around in China",
      icon: "🚅",
      color: "bg-purple-100 text-purple-800",
      topic_count: 387,
      post_count: 1654,
      last_post_at: "2024-01-15T06:55:00Z",
      last_post_by: "TrainMaster",
      last_post_avatar: "/imgs/users/5.png"
    },
    {
      uuid: "6",
      name: "Trip Reports",
      slug: "trip-reports",
      description: "Share your travel experiences and photos from China",
      icon: "📸",
      color: "bg-indigo-100 text-indigo-800",
      topic_count: 298,
      post_count: 1432,
      last_post_at: "2024-01-15T05:30:00Z",
      last_post_by: "PhotoTraveler",
      last_post_avatar: "/imgs/users/6.png"
    }
  ];

  const recentTopics = [
    {
      uuid: "t1",
      title: "First time visiting Beijing - need advice on 5-day itinerary",
      slug: "first-time-beijing-5-day-itinerary",
      author_name: "NewTraveler2024",
      author_avatar: "/imgs/users/7.png",
      category_name: "General Travel Discussion",
      reply_count: 23,
      view_count: 445,
      like_count: 12,
      is_pinned: false,
      is_locked: false,
      last_reply_at: "2024-01-15T10:30:00Z",
      created_at: "2024-01-14T14:20:00Z"
    },
    {
      uuid: "t2",
      title: "Best authentic Peking Duck restaurants in Beijing 2024",
      slug: "best-peking-duck-beijing-2024",
      author_name: "FoodieGuide",
      author_avatar: "/imgs/users/8.png",
      category_name: "Food & Culture",
      reply_count: 18,
      view_count: 332,
      like_count: 25,
      is_pinned: true,
      is_locked: false,
      last_reply_at: "2024-01-15T09:15:00Z",
      created_at: "2024-01-13T11:30:00Z"
    },
    {
      uuid: "t3",
      title: "High-speed train booking tips and tricks",
      slug: "high-speed-train-booking-tips",
      author_name: "RailwayExpert",
      author_avatar: "/imgs/users/9.png",
      category_name: "Transportation",
      reply_count: 15,
      view_count: 289,
      like_count: 19,
      is_pinned: false,
      is_locked: false,
      last_reply_at: "2024-01-15T08:45:00Z",
      created_at: "2024-01-12T16:45:00Z"
    }
  ];

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  return (
    <div className="space-y-8">
      {/* Categories Section */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Forum Categories</h2>
        <div className="grid gap-4">
          {categories.map((category) => (
            <Card key={category.uuid} className="p-6 hover:shadow-md transition-shadow">
              <Link href={`/forum/category/${category.slug}`}>
                <div className="flex items-start gap-4">
                  <div className="text-3xl">{category.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                        {category.name}
                      </h3>
                      <Badge variant="secondary" className={category.color}>
                        {category.topic_count} topics
                      </Badge>
                    </div>
                    <p className="text-gray-600 mb-3">{category.description}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <MessageCircle className="h-4 w-4" />
                          {category.post_count} posts
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          Active community
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={category.last_post_avatar} />
                          <AvatarFallback>{category.last_post_by?.[0]}</AvatarFallback>
                        </Avatar>
                        <span>by {category.last_post_by}</span>
                        <span>{formatTimeAgo(category.last_post_at)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Topics Section */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Discussions</h2>
        <div className="space-y-4">
          {recentTopics.map((topic) => (
            <Card key={topic.uuid} className="p-4 hover:shadow-md transition-shadow">
              <Link href={`/forum/topic/${topic.slug}`}>
                <div className="flex items-start gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={topic.author_avatar} />
                    <AvatarFallback>{topic.author_name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {topic.is_pinned && <Pin className="h-4 w-4 text-blue-600" />}
                      {topic.is_locked && <Lock className="h-4 w-4 text-gray-400" />}
                      <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                        {topic.title}
                      </h3>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                      <span>by {topic.author_name}</span>
                      <Badge variant="outline" className="text-xs">
                        {topic.category_name}
                      </Badge>
                      <span>{formatTimeAgo(topic.created_at)}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <MessageCircle className="h-4 w-4" />
                        {topic.reply_count} replies
                      </span>
                      <span>{topic.view_count} views</span>
                      <span>❤️ {topic.like_count}</span>
                      <span className="ml-auto">Last reply {formatTimeAgo(topic.last_reply_at)}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-6">
          <Link href="/forum/topics">
            <Button variant="outline" className="px-8">
              View All Topics
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}