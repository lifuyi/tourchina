"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Star, 
  Heart, 
  Clock, 
  MapPin, 
  DollarSign,
  Users,
  TrendingUp,
  Sparkles,
  ArrowRight,
  RefreshCw
} from "lucide-react";
import { Link } from "@/i18n/navigation";

interface RecommendationItem {
  id: string;
  type: 'tour' | 'destination' | 'blog';
  title: string;
  slug: string;
  description: string;
  image: string;
  price?: number;
  rating: number;
  reviewCount: number;
  category: string;
  tags: string[];
  reason: string;
  matchScore: number;
  trending?: boolean;
  duration?: number;
}

const mockRecommendations: RecommendationItem[] = [
  {
    id: "1",
    type: "tour",
    title: "7-Day Classic China Journey",
    slug: "classic-china-journey",
    description: "Experience the highlights of China from Beijing to Shanghai",
    image: "/imgs/features/1.png",
    price: 1290,
    rating: 4.9,
    reviewCount: 234,
    category: "Multi-City Tours",
    tags: ["Beijing", "Xi'an", "Shanghai", "Culture"],
    reason: "Based on your interest in Beijing tours",
    matchScore: 95,
    trending: true,
    duration: 7
  },
  {
    id: "2", 
    type: "destination",
    title: "Xi'an",
    slug: "xian",
    description: "Ancient capital famous for Terracotta Warriors",
    image: "/imgs/destinations/xian.jpg",
    rating: 4.8,
    reviewCount: 187,
    category: "Historical Cities",
    tags: ["History", "Culture", "Terracotta Warriors"],
    reason: "Perfect complement to your Beijing trip",
    matchScore: 92
  },
  {
    id: "3",
    type: "blog", 
    title: "Best Photography Spots in China",
    slug: "china-photography-spots",
    description: "Capture stunning photos across China's most photogenic locations",
    image: "/imgs/blog/photography.jpg",
    rating: 4.7,
    reviewCount: 156,
    category: "Photography",
    tags: ["Photography", "Travel Tips", "Landscapes"],
    reason: "Matches your photography interests",
    matchScore: 88
  },
  {
    id: "4",
    type: "tour",
    title: "Guilin Photography Workshop",
    slug: "guilin-photography-workshop", 
    description: "Professional photography tour through Guilin's karst landscapes",
    image: "/imgs/features/3.png",
    price: 680,
    rating: 4.9,
    reviewCount: 78,
    category: "Photography Tours",
    tags: ["Guilin", "Photography", "Landscapes", "Workshop"],
    reason: "Popular with Beijing tour travelers",
    matchScore: 85,
    duration: 4
  },
  {
    id: "5",
    type: "destination",
    title: "Chengdu",
    slug: "chengdu",
    description: "Home of giant pandas and authentic Sichuan cuisine", 
    image: "/imgs/destinations/chengdu.jpg",
    rating: 4.6,
    reviewCount: 203,
    category: "Cultural Cities",
    tags: ["Pandas", "Food", "Culture", "Sichuan"],
    reason: "Trending destination for culture lovers",
    matchScore: 82,
    trending: true
  },
  {
    id: "6",
    type: "blog",
    title: "Ultimate China Food Guide",
    slug: "china-food-guide",
    description: "Navigate China's incredible culinary landscape like a local",
    image: "/imgs/blog/food-guide.jpg", 
    rating: 4.8,
    reviewCount: 298,
    category: "Food & Culture",
    tags: ["Food", "Culture", "Local Tips", "Cuisine"],
    reason: "Essential reading for China travelers",
    matchScore: 80
  }
];

interface RecommendationsProps {
  title?: string;
  subtitle?: string;
  basedOn?: 'user-interests' | 'current-item' | 'trending' | 'personalized';
  limit?: number;
  showReason?: boolean;
  currentItemId?: string;
}

export default function Recommendations({ 
  title = "Recommended for You",
  subtitle = "Personalized suggestions based on your interests",
  basedOn = 'personalized',
  limit = 6,
  showReason = true,
  currentItemId
}: RecommendationsProps) {
  const [recommendations, setRecommendations] = useState<RecommendationItem[]>(mockRecommendations);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Filter out current item if specified
  const filteredRecommendations = recommendations
    .filter(item => !currentItemId || item.id !== currentItemId)
    .slice(0, limit);

  const refreshRecommendations = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    // In real app, this would fetch new recommendations
    setRecommendations([...recommendations].sort(() => Math.random() - 0.5));
    setIsRefreshing(false);
  };

  const getReasonIcon = (reason: string) => {
    if (reason.includes('interest')) return <Heart className="h-3 w-3" />;
    if (reason.includes('popular') || reason.includes('trending')) return <TrendingUp className="h-3 w-3" />;
    if (reason.includes('complement') || reason.includes('perfect')) return <Sparkles className="h-3 w-3" />;
    return <Star className="h-3 w-3" />;
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "tour":
        return "bg-blue-100 text-blue-800";
      case "destination":
        return "bg-green-100 text-green-800";
      case "blog":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">{title}</h2>
          <p className="text-gray-600">{subtitle}</p>
        </div>
        <Button 
          variant="outline" 
          onClick={refreshRecommendations}
          disabled={isRefreshing}
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* Recommendations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecommendations.map((item, index) => (
          <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-all group">
            <div className="relative">
              <img 
                src={item.image} 
                alt={item.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              
              {/* Badges */}
              <div className="absolute top-3 left-3 flex flex-col space-y-2">
                <Badge className={getTypeColor(item.type)}>
                  {item.type === 'tour' && <MapPin className="h-3 w-3 mr-1" />}
                  {item.type === 'destination' && <MapPin className="h-3 w-3 mr-1" />}
                  {item.type === 'blog' && <Star className="h-3 w-3 mr-1" />}
                  <span className="capitalize">{item.type}</span>
                </Badge>
                
                {item.trending && (
                  <Badge className="bg-orange-100 text-orange-800">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    Trending
                  </Badge>
                )}
              </div>

              {/* Match Score */}
              <div className="absolute top-3 right-3">
                <div className="bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
                  <span className="text-xs font-medium text-green-600">
                    {item.matchScore}% match
                  </span>
                </div>
              </div>

              {/* Recommendation Rank */}
              <div className="absolute bottom-3 left-3">
                <div className="bg-black/70 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                  {index + 1}
                </div>
              </div>
            </div>
            
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-2 line-clamp-1">{item.title}</h3>
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>
              
              {/* Metadata */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-500 mr-1" />
                  <span className="text-sm font-medium">{item.rating}</span>
                  <span className="text-xs text-gray-500 ml-1">({item.reviewCount})</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  {item.duration && (
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="h-3 w-3 mr-1" />
                      {item.duration}d
                    </div>
                  )}
                  {item.price && (
                    <div className="flex items-center text-blue-600 font-semibold">
                      <DollarSign className="h-4 w-4" />
                      {item.price}
                    </div>
                  )}
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-3">
                {item.tags.slice(0, 2).map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {item.tags.length > 2 && (
                  <Badge variant="outline" className="text-xs">
                    +{item.tags.length - 2}
                  </Badge>
                )}
              </div>

              {/* Recommendation Reason */}
              {showReason && (
                <div className="flex items-center text-xs text-gray-500 mb-3 p-2 bg-gray-50 rounded-lg">
                  {getReasonIcon(item.reason)}
                  <span className="ml-1">{item.reason}</span>
                </div>
              )}
              
              {/* Action Button */}
              <Button asChild className="w-full group-hover:bg-blue-600 transition-colors">
                <Link href={`/${item.type === 'blog' ? 'blog' : item.type === 'destination' ? 'destinations' : 'tours'}/${item.slug}`}>
                  {item.type === 'tour' ? 'View Tour' : item.type === 'destination' ? 'Explore' : 'Read More'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Why These Recommendations */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Sparkles className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold mb-2">Why these recommendations?</h3>
              <p className="text-sm text-gray-600 mb-3">
                Our AI analyzes your browsing history, saved favorites, and preferences to suggest 
                tours and destinations that match your interests. We also consider trending destinations 
                and what other travelers with similar tastes have enjoyed.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="text-xs">
                  <Heart className="h-3 w-3 mr-1" />
                  Your Interests
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  Trending Now
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  <Users className="h-3 w-3 mr-1" />
                  Similar Travelers
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}