"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Star, 
  ThumbsUp, 
  ThumbsDown, 
  MessageSquare, 
  User,
  Calendar,
  Filter,
  Search,
  Flag,
  CheckCircle,
  Camera,
  Plus
} from "lucide-react";
import { toast } from "sonner";

interface Review {
  id: string;
  tourId: string;
  tourTitle: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  title: string;
  content: string;
  photos: string[];
  travelDate: string;
  reviewDate: string;
  verified: boolean;
  helpful: number;
  notHelpful: number;
  userHelpful?: boolean;
  response?: {
    content: string;
    author: string;
    date: string;
  };
}

const mockReviews: Review[] = [
  {
    id: "1",
    tourId: "beijing-imperial",
    tourTitle: "5-Day Beijing Imperial Tour",
    userId: "user1",
    userName: "Sarah Johnson",
    userAvatar: "/imgs/users/1.png",
    rating: 5,
    title: "Absolutely Amazing Experience!",
    content: "This tour exceeded all my expectations. Our guide Li Wei was incredibly knowledgeable and passionate about Beijing's history. The Forbidden City tour was breathtaking, and the Great Wall visit was the highlight of my trip. Highly recommend!",
    photos: ["/imgs/reviews/1-1.jpg", "/imgs/reviews/1-2.jpg"],
    travelDate: "2024-01-15",
    reviewDate: "2024-01-20",
    verified: true,
    helpful: 24,
    notHelpful: 1,
    response: {
      content: "Thank you so much for your wonderful review, Sarah! We're thrilled you had such an amazing experience with Li Wei. We'll make sure to pass along your kind words to him.",
      author: "China Tours Team",
      date: "2024-01-21"
    }
  },
  {
    id: "2",
    tourId: "beijing-imperial",
    tourTitle: "5-Day Beijing Imperial Tour",
    userId: "user2",
    userName: "Michael Chen",
    userAvatar: "/imgs/users/2.png",
    rating: 4,
    title: "Great tour with minor issues",
    content: "Overall a fantastic experience. The historical sites were incredible and our guide was very informative. Only minor complaint was that the lunch on day 3 wasn't great, but everything else was perfect. Would definitely book again!",
    photos: ["/imgs/reviews/2-1.jpg"],
    travelDate: "2024-01-10",
    reviewDate: "2024-01-18",
    verified: true,
    helpful: 18,
    notHelpful: 2
  },
  {
    id: "3",
    tourId: "shanghai-food",
    tourTitle: "Shanghai Food Culture Tour",
    userId: "user3",
    userName: "Emma Williams",
    userAvatar: "/imgs/users/3.png",
    rating: 5,
    title: "Food lover's paradise!",
    content: "As a foodie, this tour was absolutely perfect. We tried so many authentic dishes I never would have found on my own. The local markets were fascinating and the xiaolongbao cooking class was incredible!",
    photos: ["/imgs/reviews/3-1.jpg", "/imgs/reviews/3-2.jpg", "/imgs/reviews/3-3.jpg"],
    travelDate: "2024-01-08",
    reviewDate: "2024-01-16",
    verified: true,
    helpful: 31,
    notHelpful: 0
  }
];

interface ReviewsSystemProps {
  tourId?: string;
  showWriteReview?: boolean;
  limit?: number;
}

export default function ReviewsSystem({ tourId, showWriteReview = true, limit }: ReviewsSystemProps) {
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [filterRating, setFilterRating] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [searchTerm, setSearchTerm] = useState("");
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [userHelpfulVotes, setUserHelpfulVotes] = useState<Set<string>>(new Set());
  const [userNotHelpfulVotes, setUserNotHelpfulVotes] = useState<Set<string>>(new Set());

  // Filter reviews
  let filteredReviews = reviews.filter(review => {
    const matchesTour = !tourId || review.tourId === tourId;
    const matchesRating = filterRating === "all" || review.rating.toString() === filterRating;
    const matchesSearch = review.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.userName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTour && matchesRating && matchesSearch;
  });

  // Sort reviews
  filteredReviews.sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.reviewDate).getTime() - new Date(a.reviewDate).getTime();
      case "oldest":
        return new Date(a.reviewDate).getTime() - new Date(b.reviewDate).getTime();
      case "highest":
        return b.rating - a.rating;
      case "lowest":
        return a.rating - b.rating;
      case "helpful":
        return b.helpful - a.helpful;
      default:
        return 0;
    }
  });

  if (limit) {
    filteredReviews = filteredReviews.slice(0, limit);
  }

  // Calculate stats
  const avgRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;
  
  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    stars: rating,
    count: reviews.filter(r => r.rating === rating).length,
    percentage: reviews.length > 0 ? (reviews.filter(r => r.rating === rating).length / reviews.length) * 100 : 0
  }));

  const handleHelpfulVote = (reviewId: string, helpful: boolean) => {
    const newHelpfulVotes = new Set(userHelpfulVotes);
    const newNotHelpfulVotes = new Set(userNotHelpfulVotes);

    if (helpful) {
      if (newHelpfulVotes.has(reviewId)) {
        newHelpfulVotes.delete(reviewId);
      } else {
        newHelpfulVotes.add(reviewId);
        newNotHelpfulVotes.delete(reviewId);
      }
    } else {
      if (newNotHelpfulVotes.has(reviewId)) {
        newNotHelpfulVotes.delete(reviewId);
      } else {
        newNotHelpfulVotes.add(reviewId);
        newHelpfulVotes.delete(reviewId);
      }
    }

    setUserHelpfulVotes(newHelpfulVotes);
    setUserNotHelpfulVotes(newNotHelpfulVotes);
  };

  const renderStars = (rating: number, size: "sm" | "md" | "lg" = "md") => {
    const starSize = size === "sm" ? "h-3 w-3" : size === "md" ? "h-4 w-4" : "h-5 w-5";
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${starSize} ${
              star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Reviews Summary */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="flex items-center">
                <Star className="h-5 w-5 mr-2 text-yellow-500" />
                Reviews & Ratings
              </CardTitle>
              <p className="text-gray-600 mt-1">{reviews.length} total reviews</p>
            </div>
            {showWriteReview && (
              <Button onClick={() => setIsWriteModalOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Write Review
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Overall Rating */}
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">{avgRating.toFixed(1)}</div>
              <div className="flex justify-center mb-2">
                {renderStars(Math.round(avgRating), "lg")}
              </div>
              <p className="text-gray-600">Based on {reviews.length} reviews</p>
            </div>

            {/* Rating Distribution */}
            <div className="space-y-2">
              {ratingDistribution.map((dist) => (
                <div key={dist.stars} className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1 w-12">
                    <span className="text-sm">{dist.stars}</span>
                    <Star className="h-3 w-3 text-yellow-400 fill-current" />
                  </div>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-yellow-400 h-2 rounded-full" 
                      style={{ width: `${dist.percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 w-8">{dist.count}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-wrap gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search reviews..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          
          <select 
            value={filterRating}
            onChange={(e) => setFilterRating(e.target.value)}
            className="px-3 py-2 border rounded-md"
          >
            <option value="all">All Ratings</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>
        </div>
        
        <select 
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-3 py-2 border rounded-md"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="highest">Highest Rated</option>
          <option value="lowest">Lowest Rated</option>
          <option value="helpful">Most Helpful</option>
        </select>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {filteredReviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="p-6">
              {/* Review Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4">
                  <img 
                    src={review.userAvatar} 
                    alt={review.userName}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-semibold">{review.userName}</h4>
                      {review.verified && (
                        <Badge className="bg-green-100 text-green-800 text-xs">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 mb-1">
                      {renderStars(review.rating)}
                      <span className="text-sm text-gray-600">
                        Traveled {new Date(review.travelDate).toLocaleDateString()}
                      </span>
                    </div>
                    {!tourId && (
                      <p className="text-sm text-gray-600">{review.tourTitle}</p>
                    )}
                  </div>
                </div>
                <div className="text-right text-sm text-gray-500">
                  <p>{new Date(review.reviewDate).toLocaleDateString()}</p>
                  <Button variant="ghost" size="sm">
                    <Flag className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              {/* Review Content */}
              <div className="mb-4">
                <h5 className="font-medium mb-2">{review.title}</h5>
                <p className="text-gray-700 leading-relaxed">{review.content}</p>
              </div>

              {/* Review Photos */}
              {review.photos.length > 0 && (
                <div className="flex space-x-2 mb-4 overflow-x-auto">
                  {review.photos.map((photo, index) => (
                    <img 
                      key={index}
                      src={photo} 
                      alt={`Review photo ${index + 1}`}
                      className="w-20 h-20 object-cover rounded-lg flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
                    />
                  ))}
                </div>
              )}

              {/* Review Actions */}
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center space-x-4">
                  <button 
                    onClick={() => handleHelpfulVote(review.id, true)}
                    className={`flex items-center space-x-1 text-sm transition-colors ${
                      userHelpfulVotes.has(review.id) 
                        ? 'text-green-600' 
                        : 'text-gray-600 hover:text-green-600'
                    }`}
                  >
                    <ThumbsUp className="h-4 w-4" />
                    <span>Helpful ({review.helpful + (userHelpfulVotes.has(review.id) ? 1 : 0)})</span>
                  </button>
                  
                  <button 
                    onClick={() => handleHelpfulVote(review.id, false)}
                    className={`flex items-center space-x-1 text-sm transition-colors ${
                      userNotHelpfulVotes.has(review.id) 
                        ? 'text-red-600' 
                        : 'text-gray-600 hover:text-red-600'
                    }`}
                  >
                    <ThumbsDown className="h-4 w-4" />
                    <span>({review.notHelpful + (userNotHelpfulVotes.has(review.id) ? 1 : 0)})</span>
                  </button>
                </div>
                
                <Button variant="ghost" size="sm">
                  <MessageSquare className="h-4 w-4 mr-1" />
                  Reply
                </Button>
              </div>

              {/* Business Response */}
              {review.response && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-white" />
                    </div>
                    <div className="ml-3">
                      <p className="font-medium text-sm">{review.response.author}</p>
                      <p className="text-xs text-gray-600">{review.response.date}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">{review.response.content}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      {!limit && filteredReviews.length >= 5 && (
        <div className="text-center">
          <Button variant="outline">
            Load More Reviews
          </Button>
        </div>
      )}

      {/* No Reviews */}
      {filteredReviews.length === 0 && (
        <div className="text-center py-12">
          <MessageSquare className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews found</h3>
          <p className="text-gray-500 mb-4">
            {searchTerm || filterRating !== "all" 
              ? "Try adjusting your search or filter criteria" 
              : "Be the first to write a review!"
            }
          </p>
          {showWriteReview && (
            <Button onClick={() => setIsWriteModalOpen(true)}>
              Write First Review
            </Button>
          )}
        </div>
      )}

      {/* Write Review Modal */}
      <Dialog open={isWriteModalOpen} onOpenChange={setIsWriteModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Write a Review</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Overall Rating</Label>
              <div className="flex space-x-1 mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star}
                    className="h-6 w-6 cursor-pointer text-gray-300 hover:text-yellow-400"
                  />
                ))}
              </div>
            </div>
            <div>
              <Label htmlFor="reviewTitle">Review Title</Label>
              <Input id="reviewTitle" placeholder="Summarize your experience" />
            </div>
            <div>
              <Label htmlFor="reviewContent">Your Review</Label>
              <Textarea 
                id="reviewContent" 
                placeholder="Share your experience with other travelers..."
                className="min-h-[120px]"
              />
            </div>
            <div>
              <Label>Add Photos (Optional)</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Camera className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Upload photos from your trip</p>
                <Button variant="outline" className="mt-2">
                  Choose Photos
                </Button>
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsWriteModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => {
                toast.success("Review submitted successfully!");
                setIsWriteModalOpen(false);
              }}>
                Submit Review
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}