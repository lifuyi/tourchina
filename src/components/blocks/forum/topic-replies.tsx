"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, Reply, Flag, CheckCircle, MoreHorizontal } from "lucide-react";

interface TopicRepliesProps {
  slug: string;
}

export default function TopicReplies({ slug }: TopicRepliesProps) {
  // Mock data - in real app, fetch from API using slug
  const replies = [
    {
      uuid: "r1",
      content: `Welcome to the forum! Beijing is an amazing city for first-time visitors. Here are my recommendations:

**Day 1-2: Historical Sites**
- Forbidden City (book in advance!)
- Tiananmen Square
- Temple of Heaven

**Day 3: Great Wall**
- I recommend Mutianyu section - less crowded than Badaling
- Take the cable car up, walk down for great photos

**Day 4-5: Culture & Food**
- Summer Palace
- Hutong tour (try Nanluoguxiang)
- Peking Duck at Quanjude or Dadong

**Transportation:**
- Get a Beijing Subway Card
- Use Didi for taxis (Chinese Uber)
- Download offline maps

Hope this helps! Feel free to ask if you need more specific advice. 😊`,
      author_name: "BeijingLocal",
      author_avatar: "/imgs/users/2.png",
      like_count: 15,
      is_solution: true,
      is_edited: false,
      created_at: "2024-01-14T15:30:00Z",
      author_badges: ["Local Expert", "Verified Guide"]
    },
    {
      uuid: "r2", 
      content: `Great advice from @BeijingLocal! I'd also add:

- Book your Forbidden City tickets online in advance (they sell out!)
- Try the street food at Wangfujing Night Market
- Don't miss the hutongs - they're disappearing fast
- Learn a few basic Mandarin phrases, locals appreciate the effort

For restaurants, besides Peking Duck, try:
- Jianbing (Chinese crepes) for breakfast
- Hot pot at Haidilao
- Dumplings at Din Tai Fung

Have an amazing trip! 🇨🇳`,
      author_name: "TravelExpert88",
      author_avatar: "/imgs/users/1.png",
      like_count: 8,
      is_solution: false,
      is_edited: false,
      created_at: "2024-01-14T16:45:00Z",
      author_badges: ["Top Contributor"]
    },
    {
      uuid: "r3",
      content: `Just got back from Beijing last month! Here's what I wish I knew:

**Practical Tips:**
- Download VPN app before you go (Google, Facebook blocked)
- Bring cash - many places don't accept foreign cards
- Weather in April is perfect - pack layers
- Pollution can be bad some days, bring a mask

**Hidden Gems:**
- 798 Art District (modern art scene)
- Jingshan Park (best Forbidden City views)
- Lama Temple (beautiful Tibetan Buddhist temple)

The Great Wall is absolutely worth it - go early to beat the crowds!`,
      author_name: "RecentVisitor",
      author_avatar: "/imgs/users/8.png",
      like_count: 12,
      is_solution: false,
      is_edited: true,
      edited_at: "2024-01-14T17:15:00Z",
      created_at: "2024-01-14T17:00:00Z",
      author_badges: []
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">
          {replies.length} Replies
        </h2>
        <Button variant="outline" size="sm">
          Sort by: Most Helpful
        </Button>
      </div>

      <div className="space-y-4">
        {replies.map((reply, index) => (
          <Card key={reply.uuid} className="p-6">
            <div className="flex items-start gap-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src={reply.author_avatar} />
                <AvatarFallback>{reply.author_name[0]}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-medium text-gray-900">{reply.author_name}</span>
                  {reply.author_badges.map((badge, badgeIndex) => (
                    <Badge key={badgeIndex} variant="secondary" className="text-xs">
                      {badge}
                    </Badge>
                  ))}
                  {reply.is_solution && (
                    <Badge className="bg-green-100 text-green-800 text-xs">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Solution
                    </Badge>
                  )}
                  <span className="text-sm text-gray-500">
                    {formatTimeAgo(reply.created_at)}
                  </span>
                  {reply.is_edited && (
                    <span className="text-xs text-gray-400">
                      (edited {formatTimeAgo(reply.edited_at!)})
                    </span>
                  )}
                </div>

                <div className="prose max-w-none mb-4">
                  <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                    {reply.content}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Button variant="ghost" size="sm" className="text-gray-500 hover:text-red-500">
                    <Heart className="h-4 w-4 mr-1" />
                    {reply.like_count}
                  </Button>
                  <Button variant="ghost" size="sm" className="text-gray-500">
                    <Reply className="h-4 w-4 mr-1" />
                    Reply
                  </Button>
                  <Button variant="ghost" size="sm" className="text-gray-500">
                    <Flag className="h-4 w-4 mr-1" />
                    Report
                  </Button>
                  <Button variant="ghost" size="sm" className="text-gray-500 ml-auto">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <Button variant="outline">
          Load More Replies
        </Button>
      </div>
    </div>
  );
}