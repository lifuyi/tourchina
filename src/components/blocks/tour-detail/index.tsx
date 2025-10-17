"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Star, 
  Download, 
  Share2, 
  Heart, 
  MapPin, 
  Clock, 
  Users, 
  FileText,
  Shield,
  Calendar,
  Phone,
  MessageSquare
} from "lucide-react";
import { Link } from "@/i18n/navigation";

interface Tour {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  type: 'digital' | 'service';
  category: string;
  destinations: string[];
  duration: number;
  price?: number;
  priceFrom?: number;
  currency: string;
  featured: boolean;
  images: string[];
  rating: number;
  reviewCount: number;
  groupSizeMin?: number;
  groupSizeMax?: number;
  difficultyLevel?: string;
  bestTime?: string;
  fileUrl?: string;
  fileSize?: string;
  fileFormat?: string;
  features?: string[];
}

interface TourDetailProps {
  tour: Tour;
}

export default function TourDetail({ tour }: TourDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(price / 100);
  };

  const renderStars = (rating: number) => {
    const stars = rating / 100;
    const fullStars = Math.floor(stars);
    const hasHalfStar = stars % 1 >= 0.5;
    
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 ${
              i < fullStars
                ? "fill-yellow-400 text-yellow-400"
                : i === fullStars && hasHalfStar
                ? "fill-yellow-200 text-yellow-400"
                : "text-gray-300"
            }`}
          />
        ))}
        <span className="text-sm text-muted-foreground ml-2">
          {stars.toFixed(1)} ({tour.reviewCount} reviews)
        </span>
      </div>
    );
  };

  const DigitalProductLayout = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Content */}
      <div className="lg:col-span-2 space-y-6">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-video rounded-lg overflow-hidden">
            <img
              src={tour.images[selectedImage] || "/imgs/placeholder.png"}
              alt={tour.title}
              className="w-full h-full object-cover"
            />
          </div>
          {tour.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {tour.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 ${
                    selectedImage === index ? "border-primary" : "border-transparent"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${tour.title} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="default">Instant Download</Badge>
            {tour.featured && <Badge variant="destructive">Featured</Badge>}
          </div>
          <h1 className="text-3xl font-bold mb-2">{tour.title}</h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
            <span>{tour.fileSize}</span>
            <span>{tour.fileFormat}</span>
            <span>Last Updated: December 2024</span>
          </div>
          {renderStars(tour.rating)}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div dangerouslySetInnerHTML={{ __html: tour.content }} />
            
            {tour.features && (
              <div>
                <h3 className="text-lg font-semibold mb-3">What's Included</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {tour.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="preview">
            <div className="bg-muted rounded-lg p-6 text-center">
              <FileText className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">Preview pages would be embedded here</p>
            </div>
          </TabsContent>
          
          <TabsContent value="reviews">
            <div className="space-y-4">
              <p className="text-muted-foreground">Customer reviews would be displayed here</p>
            </div>
          </TabsContent>
          
          <TabsContent value="faq">
            <div className="space-y-4">
              <p className="text-muted-foreground">Frequently asked questions would be displayed here</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Sidebar - Purchase Card */}
      <div className="lg:col-span-1">
        <Card className="sticky top-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl">
                {tour.price && formatPrice(tour.price, tour.currency)}
              </CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsWishlisted(!isWishlisted)}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Download className="w-4 h-4 text-green-600" />
              <span className="text-sm text-green-600 font-medium">Instant Download</span>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <Button className="w-full" size="lg">
              Buy Now
            </Button>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Shield className="w-4 h-4 text-green-600" />
                <span>30-day money-back guarantee</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Download className="w-4 h-4 text-blue-600" />
                <span>Lifetime access</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <FileText className="w-4 h-4 text-purple-600" />
                <span>Mobile & desktop compatible</span>
              </div>
            </div>

            <div className="pt-4 border-t">
              <h4 className="font-medium mb-2">Need Help?</h4>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Live Chat
                </Button>
                <Button variant="outline" size="sm" className="w-full">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share This Guide
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const ServiceLayout = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Content */}
      <div className="lg:col-span-2 space-y-6">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-video rounded-lg overflow-hidden">
            <img
              src={tour.images[selectedImage] || "/imgs/placeholder.png"}
              alt={tour.title}
              className="w-full h-full object-cover"
            />
          </div>
          {tour.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {tour.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 ${
                    selectedImage === index ? "border-primary" : "border-transparent"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${tour.title} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Tour Info */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="secondary">Contact Required</Badge>
            {tour.featured && <Badge variant="destructive">Featured</Badge>}
          </div>
          <h1 className="text-3xl font-bold mb-2">{tour.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {tour.duration} days
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              {tour.groupSizeMin}-{tour.groupSizeMax} people
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {tour.destinations.join(" → ")}
            </div>
            {tour.difficultyLevel && (
              <Badge variant="outline">{tour.difficultyLevel}</Badge>
            )}
          </div>
          {renderStars(tour.rating)}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="booking">How It Works</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div dangerouslySetInnerHTML={{ __html: tour.content }} />
          </TabsContent>
          
          <TabsContent value="itinerary">
            <div className="space-y-4">
              <p className="text-muted-foreground">Detailed day-by-day itinerary would be displayed here</p>
            </div>
          </TabsContent>
          
          <TabsContent value="reviews">
            <div className="space-y-4">
              <p className="text-muted-foreground">Customer reviews would be displayed here</p>
            </div>
          </TabsContent>
          
          <TabsContent value="booking">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">How It Works</h3>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">1</div>
                  <div>
                    <h4 className="font-medium">Submit Request</h4>
                    <p className="text-sm text-muted-foreground">Tell us about your dream trip</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">2</div>
                  <div>
                    <h4 className="font-medium">We Contact You</h4>
                    <p className="text-sm text-muted-foreground">Within 24 hours to discuss details</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">3</div>
                  <div>
                    <h4 className="font-medium">Custom Quote</h4>
                    <p className="text-sm text-muted-foreground">Receive your personalized itinerary and pricing</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">4</div>
                  <div>
                    <h4 className="font-medium">Book & Travel</h4>
                    <p className="text-sm text-muted-foreground">Secure payment and start your adventure</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Sidebar - Request Card */}
      <div className="lg:col-span-1">
        <Card className="sticky top-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">
                {tour.priceFrom && `From ${formatPrice(tour.priceFrom, tour.currency)}`}
              </CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsWishlisted(!isWishlisted)}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">Custom service - contact required</p>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <Link href={`/request-service/${tour.slug}`}>
              <Button className="w-full" size="lg">
                Request Quote
              </Button>
            </Link>
            
            <div className="text-center text-sm text-muted-foreground">
              We'll contact you within 24 hours
            </div>

            <div className="space-y-3 pt-4 border-t">
              <h4 className="font-medium">Contact Options</h4>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full">
                  <Phone className="w-4 h-4 mr-2" />
                  WhatsApp
                </Button>
                <Button variant="outline" size="sm" className="w-full">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  WeChat
                </Button>
                <Button variant="outline" size="sm" className="w-full">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Tour
                </Button>
              </div>
            </div>

            {tour.bestTime && (
              <div className="pt-4 border-t">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-green-600" />
                  <span className="font-medium">Best Time:</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{tour.bestTime}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {tour.type === "digital" ? <DigitalProductLayout /> : <ServiceLayout />}
    </div>
  );
}