"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Calendar, 
  Clock, 
  Eye, 
  Heart, 
  MessageSquare, 
  Share2, 
  Bookmark,
  User,
  Tag,
  ArrowLeft,
  ArrowRight,
  Twitter,
  Instagram,
  Globe
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import SharingComponent from "@/components/blocks/sharing";
import BlogIntegration from "@/components/blocks/blog-integration";

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
    social?: {
      twitter?: string;
      instagram?: string;
      website?: string;
    };
  };
  category: string;
  tags: string[];
  publishedAt: string;
  readTime: number;
  views: number;
  likes: number;
  comments: number;
  featured: boolean;
  relatedPosts?: string[];
}

interface BlogDetailProps {
  post: BlogPost;
}

export default function BlogDetail({ post }: BlogDetailProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [currentLikes, setCurrentLikes] = useState(post.likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setCurrentLikes(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  // Convert markdown-like content to HTML (simplified)
  const formatContent = (content: string) => {
    return content
      .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mb-6 mt-8">$1</h1>')
      .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-semibold mb-4 mt-6">$1</h2>')
      .replace(/^### (.*$)/gim, '<h3 class="text-xl font-medium mb-3 mt-5">$1</h3>')
      .replace(/^\*\*(.*)\*\*/gim, '<strong>$1</strong>')
      .replace(/^\*(.*)\*/gim, '<em>$1</em>')
      .replace(/^- (.*$)/gim, '<li class="ml-4">$1</li>')
      .replace(/\n\n/g, '</p><p class="mb-4">')
      .replace(/^\n/, '<p class="mb-4">')
      .replace(/\n$/, '</p>');
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden">
        <img 
          src={post.featuredImage} 
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-4xl mx-auto px-4 pb-12 text-white w-full">
            <div className="mb-4">
              <Link 
                href="/blog" 
                className="inline-flex items-center text-white/80 hover:text-white transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Blog
              </Link>
            </div>
            <Badge className="mb-4 bg-blue-600 text-white">
              {post.category}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
            <p className="text-xl text-white/90 max-w-3xl">{post.excerpt}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Post Meta */}
            <div className="flex flex-wrap items-center gap-4 mb-8 text-sm text-gray-600">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long', 
                  day: 'numeric'
                })}
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                {post.readTime} min read
              </div>
              <div className="flex items-center">
                <Eye className="h-4 w-4 mr-2" />
                {post.views} views
              </div>
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none mb-8">
              <div 
                dangerouslySetInnerHTML={{ 
                  __html: formatContent(post.content) 
                }}
                className="leading-relaxed text-gray-800"
              />
            </div>

            {/* Tags */}
            <div className="mb-8">
              <h3 className="font-semibold mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="cursor-pointer hover:bg-gray-100">
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Engagement Actions */}
            <div className="flex items-center justify-between py-6 border-t border-b">
              <div className="flex items-center space-x-4">
                <button 
                  onClick={handleLike}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    isLiked 
                      ? 'bg-red-50 text-red-600 border border-red-200' 
                      : 'bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
                  <span>{currentLikes}</span>
                </button>
                
                <button 
                  onClick={handleBookmark}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    isBookmarked 
                      ? 'bg-blue-50 text-blue-600 border border-blue-200' 
                      : 'bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  <Bookmark className={`h-5 w-5 ${isBookmarked ? 'fill-current' : ''}`} />
                  <span>Save</span>
                </button>
                
                <div className="flex items-center space-x-2 px-4 py-2 bg-gray-50 text-gray-600 border border-gray-200 rounded-lg">
                  <MessageSquare className="h-5 w-5" />
                  <span>{post.comments}</span>
                </div>
              </div>
              
              <SharingComponent
                title={post.title}
                description={post.excerpt}
                url={typeof window !== 'undefined' ? window.location.href : ''}
                image={post.featuredImage}
                type="guide"
              />
            </div>

            {/* Author Bio */}
            <div className="my-12">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <img 
                      src={post.author.avatar} 
                      alt={post.author.name}
                      className="w-16 h-16 rounded-full"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">{post.author.name}</h3>
                      <p className="text-gray-600 mb-4">{post.author.bio}</p>
                      {post.author.social && (
                        <div className="flex space-x-3">
                          {post.author.social.twitter && (
                            <a 
                              href={`https://twitter.com/${post.author.social.twitter.replace('@', '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 hover:text-blue-600"
                            >
                              <Twitter className="h-5 w-5" />
                            </a>
                          )}
                          {post.author.social.instagram && (
                            <a 
                              href={`https://instagram.com/${post.author.social.instagram.replace('@', '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-pink-500 hover:text-pink-600"
                            >
                              <Instagram className="h-5 w-5" />
                            </a>
                          )}
                          {post.author.social.website && (
                            <a 
                              href={`https://${post.author.social.website}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-500 hover:text-gray-600"
                            >
                              <Globe className="h-5 w-5" />
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 space-y-6">
              {/* Newsletter Signup */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Stay Updated</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Get the latest travel tips and destination guides delivered to your inbox.
                  </p>
                  <Button className="w-full">
                    Subscribe to Newsletter
                  </Button>
                </CardContent>
              </Card>

              {/* Popular Posts */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Popular Posts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex space-x-3">
                      <img 
                        src="/imgs/blog/shanghai-food.jpg" 
                        alt="Shanghai Food Guide"
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div>
                        <h4 className="font-medium text-sm mb-1">
                          <Link href="/blog/shanghai-street-food-guide" className="hover:text-blue-600">
                            Shanghai Street Food Guide
                          </Link>
                        </h4>
                        <p className="text-xs text-gray-500">6 min read</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Related Posts */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8">Related Posts</h2>
          <BlogIntegration 
            showFeatured={true} 
            limit={3}
            category={post.category}
          />
        </div>
      </div>
    </div>
  );
}