"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { 
  MapPin, 
  Clock, 
  Star, 
  Camera, 
  Calendar,
  Users,
  ArrowRight,
  Heart,
  Share2,
  Download,
  DollarSign
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import ReviewsSystem from "@/components/blocks/reviews-system";
import FavoritesSystem from "@/components/blocks/favorites-system";
import Recommendations from "@/components/blocks/recommendations";

interface Destination {
  slug: string;
  name: string;
  description: string;
  featuredImage: string;
  highlights: string[];
  bestTimeToVisit: string;
  weatherInfo: string;
}

interface Tour {
  id: string;
  title: string;
  slug: string;
  type: 'digital' | 'service';
  price?: number;
  priceFrom?: number;
  duration: number;
  rating: number;
  reviewCount: number;
  image: string;
  description: string;
}

interface DestinationDetailProps {
  destination: Destination;
}

// Mock tours for this destination
const mockTours: Tour[] = [
  {
    id: "1",
    title: "Complete Beijing Travel Guide",
    slug: "beijing-complete-guide",
    type: "digital",
    price: 29,
    duration: 0,
    rating: 4.8,
    reviewCount: 156,
    image: "/imgs/features/1.png",
    description: "Comprehensive digital guide with maps, attractions, and insider tips"
  },
  {
    id: "2", 
    title: "5-Day Beijing Imperial Tour",
    slug: "beijing-imperial-tour",
    type: "service",
    priceFrom: 890,
    duration: 5,
    rating: 4.9,
    reviewCount: 89,
    image: "/imgs/features/2.png",
    description: "Private guided tour of Beijing's imperial palaces and the Great Wall"
  },
  {
    id: "3",
    title: "Beijing Food Culture Guide",
    slug: "beijing-food-guide", 
    type: "digital",
    price: 19,
    duration: 0,
    rating: 4.7,
    reviewCount: 203,
    image: "/imgs/features/3.png",
    description: "Discover authentic Beijing cuisine with restaurant recommendations"
  }
];

export default function DestinationDetail({ destination }: DestinationDetailProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [isLiked, setIsLiked] = useState(false);

  const digitalTours = mockTours.filter(tour => tour.type === 'digital');
  const serviceTours = mockTours.filter(tour => tour.type === 'service');

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${destination.name} - China Tours`,
          text: destination.description,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href);
      alert('URL copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden">
        <img 
          src={destination.featuredImage} 
          alt={destination.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-4 pb-12 text-white w-full">
            <div className="flex justify-between items-end">
              <div>
                <h1 className="text-4xl md:text-6xl font-bold mb-4">{destination.name}</h1>
                <p className="text-xl md:text-2xl max-w-2xl">{destination.description}</p>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={() => setIsLiked(!isLiked)}
                  className={isLiked ? "text-red-500" : ""}
                >
                  <Heart className={`h-5 w-5 ${isLiked ? "fill-current" : ""}`} />
                </Button>
                <Button variant="secondary" size="icon" onClick={handleShare}>
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="tours">Tours & Guides</TabsTrigger>
            <TabsTrigger value="travel-info">Travel Info</TabsTrigger>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>About {destination.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 leading-relaxed mb-6">
                      {destination.description} Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                      Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim 
                      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <MapPin className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                        <div className="font-medium">Location</div>
                        <div className="text-sm text-gray-600">Northern China</div>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <Clock className="h-8 w-8 text-green-600 mx-auto mb-2" />
                        <div className="font-medium">Best Time</div>
                        <div className="text-sm text-gray-600">{destination.bestTimeToVisit}</div>
                      </div>
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <Star className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                        <div className="font-medium">Rating</div>
                        <div className="text-sm text-gray-600">4.8/5</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Top Highlights</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {destination.highlights.map((highlight, index) => (
                        <div key={highlight} className="flex items-center space-x-3 p-3 border rounded-lg">
                          <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 font-medium text-sm">{index + 1}</span>
                          </div>
                          <div>
                            <h4 className="font-medium">{highlight}</h4>
                            <p className="text-sm text-gray-600">Must-see attraction</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button asChild className="w-full mb-3">
                      <Link href="/custom-trip">
                        <Calendar className="mr-2 h-4 w-4" />
                        Plan Trip to {destination.name}
                      </Link>
                    </Button>
                    <FavoritesSystem 
                      showAddButton={true}
                      itemId={destination.slug}
                      itemType="destination"
                    />
                    <Button asChild variant="outline" className="w-full">
                      <Link href="#tours">
                        <Users className="mr-2 h-4 w-4" />
                        View Tours
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Download className="mr-2 h-4 w-4" />
                      Download Guide
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Weather & Climate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">{destination.weatherInfo}</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Spring (Mar-May)</span>
                        <span className="text-green-600">Excellent</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Summer (Jun-Aug)</span>
                        <span className="text-yellow-600">Hot</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Autumn (Sep-Nov)</span>
                        <span className="text-green-600">Excellent</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Winter (Dec-Feb)</span>
                        <span className="text-blue-600">Cold</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="tours" className="mt-6" id="tours">
            <div className="space-y-8">
              {/* Digital Guides */}
              <div>
                <h3 className="text-2xl font-bold mb-6">Digital Travel Guides</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {digitalTours.map((tour) => (
                    <Card key={tour.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative h-48">
                        <img src={tour.image} alt={tour.title} className="w-full h-full object-cover" />
                        <Badge className="absolute top-3 left-3 bg-green-600">Digital Guide</Badge>
                      </div>
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-2">{tour.title}</h4>
                        <p className="text-sm text-gray-600 mb-3">{tour.description}</p>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-500 mr-1" />
                            <span className="text-sm">{tour.rating} ({tour.reviewCount})</span>
                          </div>
                          <div className="flex items-center text-blue-600 font-semibold">
                            <DollarSign className="h-4 w-4" />
                            {tour.price}
                          </div>
                        </div>
                        <Button asChild className="w-full">
                          <Link href={`/tours/${tour.slug}`}>
                            View Details
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Service Tours */}
              <div>
                <h3 className="text-2xl font-bold mb-6">Guided Tours & Services</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {serviceTours.map((tour) => (
                    <Card key={tour.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative h-48">
                        <img src={tour.image} alt={tour.title} className="w-full h-full object-cover" />
                        <Badge className="absolute top-3 left-3 bg-blue-600">Guided Tour</Badge>
                      </div>
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-2">{tour.title}</h4>
                        <p className="text-sm text-gray-600 mb-3">{tour.description}</p>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-500 mr-1" />
                            <span className="text-sm">{tour.rating} ({tour.reviewCount})</span>
                          </div>
                          <div className="flex items-center text-blue-600 font-semibold">
                            <span className="text-xs">from</span>
                            <DollarSign className="h-4 w-4 ml-1" />
                            {tour.priceFrom}
                          </div>
                        </div>
                        <div className="flex items-center text-sm text-gray-500 mb-3">
                          <Clock className="h-4 w-4 mr-1" />
                          {tour.duration} days
                        </div>
                        <Button asChild className="w-full">
                          <Link href={`/tours/${tour.slug}`}>
                            View Details
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="travel-info" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Getting There</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">By Air</h4>
                    <p className="text-sm text-gray-600">
                      Beijing Capital International Airport (PEK) is the main international gateway, 
                      with connections to major cities worldwide.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">By Train</h4>
                    <p className="text-sm text-gray-600">
                      High-speed rail connections from Shanghai (4.5 hours), Xi'an (5 hours), 
                      and other major Chinese cities.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Getting Around</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Metro System</h4>
                    <p className="text-sm text-gray-600">
                      Extensive subway network covering most tourist attractions. 
                      Buy a rechargeable transit card for convenience.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Taxis & Ride-sharing</h4>
                    <p className="text-sm text-gray-600">
                      Taxis are widely available. Use DiDi app for ride-sharing services.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Local Tips</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Download translation apps like Google Translate</li>
                    <li>• Carry cash as some places don't accept cards</li>
                    <li>• Book popular attractions in advance</li>
                    <li>• Respect local customs and dress codes</li>
                    <li>• Learn basic Mandarin phrases</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Essential Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span>Currency:</span>
                      <span>Chinese Yuan (CNY)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Language:</span>
                      <span>Mandarin Chinese</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Time Zone:</span>
                      <span>GMT+8</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Emergency:</span>
                      <span>110 (Police), 120 (Medical)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="gallery" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((index) => (
                <div key={index} className="relative aspect-[4/3] rounded-lg overflow-hidden group">
                  <img 
                    src={`/imgs/showcases/${index}.png`} 
                    alt={`${destination.name} ${index}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <Camera className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Reviews Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <ReviewsSystem tourId={destination.slug} />
      </div>

      {/* Recommendations Section */}
      <div className="max-w-7xl mx-auto px-4 py-12 bg-gray-50">
        <Recommendations 
          title="Explore More Destinations"
          subtitle="Other amazing places you might want to visit"
          currentItemId={destination.slug}
          limit={3}
        />
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Visit {destination.name}?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Start planning your perfect trip with our custom itinerary builder or browse our curated tours
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/custom-trip">
                Build Custom Trip
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600" asChild>
              <Link href="/tours">
                Browse All Tours
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}