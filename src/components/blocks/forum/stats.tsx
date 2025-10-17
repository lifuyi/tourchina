"use client";

import { Card } from "@/components/ui/card";
import { MessageCircle, Users, Eye, TrendingUp } from "lucide-react";

export default function ForumStats() {
  // Mock data - in real app, fetch from API
  const stats = {
    totalTopics: 2847,
    totalReplies: 12436,
    totalUsers: 8923,
    onlineUsers: 234,
    todaysPosts: 127,
    weeklyGrowth: 8.4
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
      <Card className="p-4 text-center">
        <MessageCircle className="h-8 w-8 mx-auto mb-2 text-blue-600" />
        <div className="text-2xl font-bold text-gray-900">{stats.totalTopics.toLocaleString()}</div>
        <div className="text-sm text-gray-600">Topics</div>
      </Card>
      
      <Card className="p-4 text-center">
        <MessageCircle className="h-8 w-8 mx-auto mb-2 text-green-600" />
        <div className="text-2xl font-bold text-gray-900">{stats.totalReplies.toLocaleString()}</div>
        <div className="text-sm text-gray-600">Replies</div>
      </Card>
      
      <Card className="p-4 text-center">
        <Users className="h-8 w-8 mx-auto mb-2 text-purple-600" />
        <div className="text-2xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</div>
        <div className="text-sm text-gray-600">Members</div>
      </Card>
      
      <Card className="p-4 text-center">
        <Eye className="h-8 w-8 mx-auto mb-2 text-orange-600" />
        <div className="text-2xl font-bold text-gray-900">{stats.onlineUsers}</div>
        <div className="text-sm text-gray-600">Online</div>
      </Card>
      
      <Card className="p-4 text-center">
        <TrendingUp className="h-8 w-8 mx-auto mb-2 text-red-600" />
        <div className="text-2xl font-bold text-gray-900">{stats.todaysPosts}</div>
        <div className="text-sm text-gray-600">Today</div>
      </Card>
      
      <Card className="p-4 text-center">
        <TrendingUp className="h-8 w-8 mx-auto mb-2 text-indigo-600" />
        <div className="text-2xl font-bold text-gray-900">+{stats.weeklyGrowth}%</div>
        <div className="text-sm text-gray-600">Growth</div>
      </Card>
    </div>
  );
}