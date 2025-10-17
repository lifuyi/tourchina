"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Star, MapPin, Clock, Users, Download, Heart } from "lucide-react";
import { Link } from "@/i18n/navigation";

interface Tour {
  id: string;
  title: string;
  slug: string;
  description: string;
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
}

// Mock data for demonstration
const mockTours: Tour[] = [
  {
    id: "1",
    title: "Complete Beijing Travel Guide",
    slug: "complete-beijing-travel-guide",
    description: "Comprehensive digital guide with maps, attractions, restaurants, and cultural insights for Beijing",
    type: "digital",
    category: "city-guide",
    destinations: ["Beijing"],
    duration: 0,
    price: 1999, // $19.99
    currency: "USD",
    featured: true,
    images: ["/imgs/showcases/beijing-guide.jpg"],
    rating: 480, // 4.8 stars
    reviewCount: 124
  },
  {
    id: "2", 
    title: "Classic China Explorer",
    slug: "classic-china-explorer",
    description: "14-day guided tour covering Beijing, Xi'an, and Shanghai with all accommodations and transportation",
    type: "service",
    category: "multi-city",
    destinations: ["Beijing", "Xi'an", "Shanghai"],
    duration: 14,
    priceFrom: 229900, // From $2,299
    currency: "USD",
    featured: true,
    images: ["/imgs/showcases/classic-china.jpg"],
    rating: 490, // 4.9 stars
    reviewCount: 89,
    groupSizeMin: 2,
    groupSizeMax: 12
  },
  {
    id: "3",
    title: "Shanghai Modern City Guide",
    slug: "shanghai-modern-city-guide", 
    description: "Digital guide focusing on Shanghai's modern attractions, dining, and nightlife",
    type: "digital",
    category: "city-guide",
    destinations: ["Shanghai"],
    duration: 0,
    price: 1599, // $15.99
    currency: "USD",
    featured: false,
    images: ["/imgs/showcases/shanghai-guide.jpg"],
    rating: 460, // 4.6 stars
    reviewCount: 76
  },
  {
    id: "4",
    title: "Yangtze River Cruise Adventure",
    slug: "yangtze-river-cruise",
    description: "8-day luxury cruise experience from Chongqing to Shanghai with guided shore excursions",
    type: "service",
    category: "cruise",
    destinations: ["Chongqing", "Wuhan", "Shanghai"],
    duration: 8,
    priceFrom: 189900, // From $1,899
    currency: "USD", 
    featured: true,
    images: ["/imgs/showcases/yangtze-cruise.jpg"],
    rating: 470, // 4.7 stars
    reviewCount: 54,
    groupSizeMin: 1,
    groupSizeMax: 20
  }
];

export default function TourListing() {
  const [tours, setTours] = useState<Tour[]>(mockTours);
  const [filteredTours, setFilteredTours] = useState<Tour[]>(mockTours);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [sortBy, setSortBy] = useState("popularity");

  // Get unique destinations
  const allDestinations = Array.from(
    new Set(tours.flatMap(tour => tour.destinations))
  ).sort();

  useEffect(() => {
    let filtered = tours;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(tour =>
        tour.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tour.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tour.destinations.some(dest => 
          dest.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    // Filter by type
    if (selectedType !== "all") {
      filtered = filtered.filter(tour => tour.type === selectedType);
    }

    // Filter by destinations
    if (selectedDestinations.length > 0) {
      filtered = filtered.filter(tour =>
        tour.destinations.some(dest => selectedDestinations.includes(dest))
      );
    }

    // Filter by price range
    filtered = filtered.filter(tour => {
      const price = tour.price || tour.priceFrom || 0;
      const priceInDollars = price / 100;
      return priceInDollars >= priceRange[0] && priceInDollars <= priceRange[1];
    });

    // Sort tours
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => {
          const priceA = a.price || a.priceFrom || 0;
          const priceB = b.price || b.priceFrom || 0;
          return priceA - priceB;
        });
        break;
      case "price-high":
        filtered.sort((a, b) => {
          const priceA = a.price || a.priceFrom || 0;
          const priceB = b.price || b.priceFrom || 0;
          return priceB - priceA;
        });
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "duration":
        filtered.sort((a, b) => a.duration - b.duration);
        break;
      default: // popularity
        filtered.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return b.reviewCount - a.reviewCount;
        });
    }

    setFilteredTours(filtered);
  }, [tours, searchQuery, selectedType, selectedDestinations, priceRange, sortBy]);

  const handleDestinationFilter = (destination: string, checked: boolean) => {
    if (checked) {
      setSelectedDestinations([...selectedDestinations, destination]);
    } else {
      setSelectedDestinations(selectedDestinations.filter(d => d !== destination));
    }
  };

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(price / 100);
  };

  const renderStars = (rating: number) => {
    const stars = rating / 100; // Convert from stored format
    const fullStars = Math.floor(stars);
    const hasHalfStar = stars % 1 >= 0.5;
    
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < fullStars
                ? "fill-yellow-400 text-yellow-400"
                : i === fullStars && hasHalfStar
                ? "fill-yellow-200 text-yellow-400"
                : "text-gray-300"
            }`}
          />
        ))}
        <span className="text-sm text-muted-foreground ml-1">
          {stars.toFixed(1)} ({filteredTours.find(t => t.rating === rating)?.reviewCount || 0})
        </span>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold">China Tours & Travel Guides</h1>
            <p className="text-muted-foreground mt-2">
              Discover amazing tours and digital guides for your China adventure
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Heart className="w-4 h-4 mr-2" />
              Wishlist
            </Button>
          </div>
        </div>
        
        {/* Product Type Toggle */}
        <div className="flex gap-4 mb-6">
          <Button
            variant={selectedType === "all" ? "default" : "outline"}
            onClick={() => setSelectedType("all")}
          >
            All Products
          </Button>
          <Button
            variant={selectedType === "digital" ? "default" : "outline"}
            onClick={() => setSelectedType("digital")}
          >
            <Download className="w-4 h-4 mr-2" />
            Digital Guides
          </Button>
          <Button
            variant={selectedType === "service" ? "default" : "outline"}
            onClick={() => setSelectedType("service")}
          >
            <Users className="w-4 h-4 mr-2" />
            Tour Services
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Filters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Search */}
              <div>
                <label className="text-sm font-medium mb-2 block">Search</label>
                <Input
                  placeholder="Search tours, destinations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Destinations */}
              <div>
                <label className="text-sm font-medium mb-3 block">Destinations</label>
                <div className="space-y-2">
                  {allDestinations.map((destination) => (
                    <div key={destination} className="flex items-center space-x-2">
                      <Checkbox
                        id={destination}
                        checked={selectedDestinations.includes(destination)}
                        onCheckedChange={(checked) =>
                          handleDestinationFilter(destination, checked as boolean)
                        }
                      />
                      <label htmlFor={destination} className="text-sm">
                        {destination}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <label className="text-sm font-medium mb-3 block">
                  Price Range: ${priceRange[0]} - ${priceRange[1]}
                </label>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={5000}
                  step={50}
                  className="w-full"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results */}
        <div className="lg:col-span-3">
          {/* Results Header */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-muted-foreground">
              {filteredTours.length} tour{filteredTours.length !== 1 ? 's' : ''} found
            </p>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popularity">Most Popular</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="duration">Duration</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Tour Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredTours.map((tour) => (
              <Card key={tour.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={tour.images[0] || "/imgs/placeholder.png"}
                    alt={tour.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge variant={tour.type === "digital" ? "default" : "secondary"}>
                      {tour.type === "digital" ? "Instant Download" : "Contact Required"}
                    </Badge>
                  </div>
                  {tour.featured && (
                    <div className="absolute top-3 right-3">
                      <Badge variant="destructive">Featured</Badge>
                    </div>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute bottom-3 right-3 bg-white/80 hover:bg-white"
                  >
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>
                
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-semibold text-lg leading-tight mb-1">
                        {tour.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {tour.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {tour.destinations.join(", ")}
                      </div>
                      {tour.duration > 0 && (
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {tour.duration} days
                        </div>
                      )}
                      {tour.groupSizeMax && (
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {tour.groupSizeMin}-{tour.groupSizeMax}
                        </div>
                      )}
                    </div>

                    {renderStars(tour.rating)}

                    <div className="flex items-center justify-between pt-2">
                      <div>
                        {tour.price ? (
                          <span className="text-lg font-semibold">
                            {formatPrice(tour.price, tour.currency)}
                          </span>
                        ) : (
                          <span className="text-lg font-semibold">
                            From {formatPrice(tour.priceFrom!, tour.currency)}
                          </span>
                        )}
                      </div>
                      <Link href={`/tours/${tour.slug}`}>
                        <Button size="sm">
                          {tour.type === "digital" ? "Buy Now" : "View Details"}
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredTours.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No tours found matching your criteria.</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedType("all");
                  setSelectedDestinations([]);
                  setPriceRange([0, 5000]);
                }}
              >
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}