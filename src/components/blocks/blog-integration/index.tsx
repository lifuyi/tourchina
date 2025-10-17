"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Calendar, 
  Clock, 
  User, 
  Eye, 
  Heart, 
  MessageSquare, 
  Tag,
  Search,
  ArrowRight,
  Share2,
  Bookmark
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import SharingComponent from "@/components/blocks/sharing";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  author: {
    name: string;
    avatar: string;
    bio: string;
  };
  category: string;
  tags: string[];
  publishedAt: string;
  readTime: number;
  views: number;
  likes: number;
  comments: number;
  featured: boolean;
}

const mockPosts: BlogPost[] = [
  {
    id: "1",
    title: "Ultimate Guide to Beijing's Hidden Gems",
    slug: "beijing-hidden-gems-guide",
    excerpt: "Discover the secret spots in Beijing that most tourists never see. From hidden temples to local eateries, explore the authentic side of China's capital.",
    content: "Full blog content would go here...",
    featuredImage: "/imgs/blog/beijing-hidden.jpg",
    author: {
      name: "Li Wei",
      avatar: "/imgs/authors/li-wei.jpg",
      bio: "Local Beijing guide with 10+ years experience"
    },
    category: "Destinations",
    tags: ["Beijing", "Hidden Gems", "Local Tips", "Culture"],
    publishedAt: "2024-01-20",
    readTime: 8,
    views: 2840,
    likes: 156,
    comments: 23,
    featured: true
  },
  {
    id: "2",
    title: "Food Lover's Guide to Shanghai Street Food",
    slug: "shanghai-street-food-guide",
    excerpt: "Explore Shanghai's incredible street food scene. From xiaolongbao to jianbing, discover the best local flavors and where to find them.",
    content: "Full blog content would go here...",
    featuredImage: "/imgs/blog/shanghai-food.jpg",
    author: {
      name: "Chen Ming",
      avatar: "/imgs/authors/chen-ming.jpg",
      bio: "Food blogger and Shanghai native"
    },
    category: "Food & Culture",
    tags: ["Shanghai", "Street Food", "Local Cuisine", "Food Tour"],
    publishedAt: "2024-01-18",
    readTime: 6,
    views: 1920,
    likes: 89,
    comments: 15,
    featured: true
  },
  {
    id: "3",
    title: "Photography Tips for the Great Wall",
    slug: "great-wall-photography-tips",
    excerpt: "Capture stunning photos of the Great Wall with these expert tips. Learn about the best times, angles, and locations for breathtaking shots.",
    content: "Full blog content would go here...",
    featuredImage: "/imgs/blog/great-wall-photo.jpg",
    author: {
      name: "Sarah Johnson",
      avatar: "/imgs/authors/sarah-johnson.jpg",
      bio: "Travel photographer and China enthusiast"
    },
    category: "Photography",
    tags: ["Great Wall", "Photography", "Travel Tips", "Beijing"],
    publishedAt: "2024-01-15",
    readTime: 10,
    views: 3156,
    likes: 234,
    comments: 31,
    featured: false
  },
  {
    id: "4",
    title: "Best Time to Visit Different Regions of China",
    slug: "best-time-visit-china-regions",
    excerpt: "Planning when to visit China? This comprehensive guide covers the best times to visit different regions, from the tropical south to the northern cities.",
    content: "Full blog content would go here...",
    featuredImage: "/imgs/blog/china-seasons.jpg",
    author: {
      name: "Wang Xia",
      avatar: "/imgs/authors/wang-xia.jpg",
      bio: "Travel consultant specializing in China"
    },
    category: "Travel Planning",
    tags: ["Travel Planning", "Weather", "Seasons", "China Guide"],
    publishedAt: "2024-01-12",
    readTime: 12,
    views: 4231,
    likes: 187,
    comments: 42,
    featured: false
  }
];

const categories = ["All", "Destinations", "Food & Culture", "Photography", "Travel Planning", "Local Tips"];

interface BlogIntegrationProps {
  showFeatured?: boolean;
  limit?: number;
  category?: string;
}

export default function BlogIntegration({ 
  showFeatured = false, 
  limit,
  category 
}: BlogIntegrationProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(category || "All");
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const [bookmarkedPosts, setBookmarkedPosts] = useState<Set<string>>(new Set());

  // Filter posts
  let filteredPosts = mockPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesFeatured = !showFeatured || post.featured;
    
    return matchesSearch && matchesCategory && matchesFeatured;
  });

  if (limit) {
    filteredPosts = filteredPosts.slice(0, limit);
  }

  const toggleLike = (postId: string) => {
    const newLikedPosts = new Set(likedPosts);
    if (newLikedPosts.has(postId)) {
      newLikedPosts.delete(postId);
    } else {
      newLikedPosts.add(postId);
    }
    setLikedPosts(newLikedPosts);
  };

  const toggleBookmark = (postId: string) => {
    const newBookmarkedPosts = new Set(bookmarkedPosts);
    if (newBookmarkedPosts.has(postId)) {
      newBookmarkedPosts.delete(postId);
    } else {
      newBookmarkedPosts.add(postId);
    }
    setBookmarkedPosts(newBookmarkedPosts);
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      {!showFeatured && (
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search blog posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map(cat => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
            <div className="relative">
              <img 
                src={post.featuredImage} 
                alt={post.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {post.featured && (
                <Badge className="absolute top-3 left-3 bg-yellow-500 text-white">
                  Featured
                </Badge>
              )}
              <div className="absolute top-3 right-3 flex space-x-2">
                <Button
                  size="sm"
                  variant="secondary"
                  className="h-8 w-8 p-0 bg-white/90 hover:bg-white"
                  onClick={() => toggleBookmark(post.id)}
                >
                  <Bookmark 
                    className={`h-4 w-4 ${
                      bookmarkedPosts.has(post.id) ? 'fill-current text-blue-600' : ''
                    }`} 
                  />
                </Button>
              </div>
            </div>
            
            <CardContent className="p-4">
              <div className="flex items-center mb-2">
                <Badge variant="outline" className="text-xs">
                  {post.category}
                </Badge>
                <span className="mx-2 text-gray-300">•</span>
                <div className="flex items-center text-xs text-gray-500">
                  <Clock className="h-3 w-3 mr-1" />
                  {post.readTime} min read
                </div>
              </div>
              
              <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                <Link 
                  href={`/blog/${post.slug}`}
                  className="hover:text-blue-600 transition-colors"
                >
                  {post.title}
                </Link>
              </h3>
              
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {post.excerpt}
              </p>
              
              <div className="flex flex-wrap gap-1 mb-4">
                {post.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    <Tag className="h-2 w-2 mr-1" />
                    {tag}
                  </Badge>
                ))}
                {post.tags.length > 3 && (
                  <Badge variant="secondary" className="text-xs">
                    +{post.tags.length - 3}
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <img 
                    src={post.author.avatar} 
                    alt={post.author.name}
                    className="w-6 h-6 rounded-full mr-2"
                  />
                  <div>
                    <p className="text-xs font-medium">{post.author.name}</p>
                    <p className="text-xs text-gray-500">{post.publishedAt}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <div className="flex items-center">
                    <Eye className="h-3 w-3 mr-1" />
                    {post.views}
                  </div>
                  <button 
                    onClick={() => toggleLike(post.id)}
                    className={`flex items-center hover:text-red-500 transition-colors ${
                      likedPosts.has(post.id) ? 'text-red-500' : ''
                    }`}
                  >
                    <Heart 
                      className={`h-3 w-3 mr-1 ${likedPosts.has(post.id) ? 'fill-current' : ''}`} 
                    />
                    {post.likes + (likedPosts.has(post.id) ? 1 : 0)}
                  </button>
                  <div className="flex items-center">
                    <MessageSquare className="h-3 w-3 mr-1" />
                    {post.comments}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <SharingComponent
                    title={post.title}
                    description={post.excerpt}
                    url={`${window.location.origin}/blog/${post.slug}`}
                    image={post.featuredImage}
                    type="guide"
                  />
                  <Button asChild size="sm" variant="outline">
                    <Link href={`/blog/${post.slug}`}>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      {!limit && filteredPosts.length >= 6 && (
        <div className="text-center">
          <Button variant="outline" size="lg">
            Load More Posts
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}

      {/* No Results */}
      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <MessageSquare className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No blog posts found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
}