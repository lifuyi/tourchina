"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Star, Clock, Camera, Users, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";

interface Destination {
  id: string;
  name: string;
  slug: string;
  description: string;
  featuredImage: string;
  highlights: string[];
  bestTimeToVisit: string;
  tourCount: number;
  featured: boolean;
  province: string;
}

const destinations: Destination[] = [
  {
    id: "beijing",
    name: "Beijing",
    slug: "beijing", 
    description: "China's capital city, home to the Forbidden City, Great Wall, and countless cultural treasures.",
    featuredImage: "/imgs/destinations/beijing.jpg",
    highlights: ["Forbidden City", "Great Wall", "Temple of Heaven", "Summer Palace"],
    bestTimeToVisit: "Spring & Autumn",
    tourCount: 24,
    featured: true,
    province: "Beijing"
  },
  {
    id: "shanghai",
    name: "Shanghai",
    slug: "shanghai",
    description: "Modern metropolis where East meets West, featuring stunning skylines and rich cultural heritage.",
    featuredImage: "/imgs/destinations/shanghai.jpg",
    highlights: ["The Bund", "Yu Garden", "Shanghai Tower", "French Concession"],
    bestTimeToVisit: "Spring & Autumn", 
    tourCount: 18,
    featured: true,
    province: "Shanghai"
  },
  {
    id: "xian",
    name: "Xi'an",
    slug: "xian",
    description: "Ancient capital of China, famous for the Terracotta Warriors and Silk Road history.",
    featuredImage: "/imgs/destinations/xian.jpg",
    highlights: ["Terracotta Warriors", "Ancient City Wall", "Big Wild Goose Pagoda", "Muslim Quarter"],
    bestTimeToVisit: "Spring & Autumn",
    tourCount: 15,
    featured: true,
    province: "Shaanxi"
  },
  {
    id: "guilin",
    name: "Guilin",
    slug: "guilin",
    description: "Stunning karst landscapes and Li River cruises in picturesque southern China.",
    featuredImage: "/imgs/destinations/guilin.jpg",
    highlights: ["Li River", "Reed Flute Cave", "Elephant Trunk Hill", "Yangshuo"],
    bestTimeToVisit: "April-October",
    tourCount: 12,
    featured: false,
    province: "Guangxi"
  },
  {
    id: "chengdu", 
    name: "Chengdu",
    slug: "chengdu",
    description: "Home of giant pandas and authentic Sichuan cuisine in western China.",
    featuredImage: "/imgs/destinations/chengdu.jpg",
    highlights: ["Giant Panda Base", "Jinli Street", "Sichuan Opera", "Leshan Buddha"],
    bestTimeToVisit: "March-June & Sep-Nov",
    tourCount: 10,
    featured: false,
    province: "Sichuan"
  },
  {
    id: "chongqing",
    name: "Chongqing", 
    slug: "chongqing",
    description: "Mountain city famous for hotpot cuisine and Yangtze River cruises.",
    featuredImage: "/imgs/destinations/chongqing.jpg",
    highlights: ["Hongya Cave", "Yangtze River", "Ciqikou Ancient Town", "Hotpot Culture"],
    bestTimeToVisit: "March-May & Sep-Nov",
    tourCount: 8,
    featured: false,
    province: "Chongqing"
  }
];

export default function DestinationsListing() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("popular");
  const [filterProvince, setFilterProvince] = useState("all");

  // Get unique provinces
  const provinces = Array.from(new Set(destinations.map(d => d.province)));

  // Filter and sort destinations
  const filteredDestinations = destinations
    .filter(dest => {
      const matchesSearch = dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           dest.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           dest.highlights.some(h => h.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesProvince = filterProvince === "all" || dest.province === filterProvince;
      return matchesSearch && matchesProvince;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "popular":
          return b.tourCount - a.tourCount;
        case "name":
          return a.name.localeCompare(b.name);
        case "featured":
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
        default:
          return 0;
      }
    });

  const featuredDestinations = destinations.filter(d => d.featured);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Discover China's Amazing Destinations
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              From ancient capitals to modern metropolises, explore the diverse beauty and rich culture of China
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/custom-trip">
                Plan Your Custom Trip
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Featured Destinations */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Featured Destinations</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our most popular destinations with carefully curated tours and experiences
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {featuredDestinations.map((dest) => (
            <Card key={dest.id} className="overflow-hidden hover:shadow-xl transition-shadow group">
              <div className="relative h-64">
                <img 
                  src={dest.featuredImage} 
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-blue-600 text-white">Featured</Badge>
                </div>
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                  <span className="text-sm font-medium">{dest.tourCount} tours</span>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">{dest.name}</h3>
                <p className="text-gray-600 mb-4">{dest.description}</p>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <Clock className="h-4 w-4 mr-1" />
                  Best time: {dest.bestTimeToVisit}
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {dest.highlights.slice(0, 3).map((highlight) => (
                    <Badge key={highlight} variant="secondary" className="text-xs">
                      {highlight}
                    </Badge>
                  ))}
                </div>
                <Button asChild className="w-full">
                  <Link href={`/destinations/${dest.slug}`}>
                    Explore {dest.name}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* All Destinations */}
      <div className="max-w-7xl mx-auto px-4 pb-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Filter Destinations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Search</label>
                  <Input
                    placeholder="Search destinations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Province</label>
                  <Select value={filterProvince} onValueChange={setFilterProvince}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Provinces</SelectItem>
                      {provinces.map(province => (
                        <SelectItem key={province} value={province}>
                          {province}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Sort by</label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="popular">Most Popular</SelectItem>
                      <SelectItem value="name">Name A-Z</SelectItem>
                      <SelectItem value="featured">Featured First</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Destinations Grid */}
          <div className="lg:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">All Destinations</h2>
              <p className="text-gray-600">{filteredDestinations.length} destinations found</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredDestinations.map((dest) => (
                <Card key={dest.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                  <div className="relative h-48">
                    <img 
                      src={dest.featuredImage} 
                      alt={dest.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {dest.featured && (
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-yellow-500 text-white">
                          <Star className="h-3 w-3 mr-1" />
                          Featured
                        </Badge>
                      </div>
                    )}
                    <div className="absolute bottom-3 right-3 bg-black/70 text-white rounded-full px-2 py-1">
                      <span className="text-xs">{dest.tourCount} tours</span>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold">{dest.name}</h3>
                      <span className="text-sm text-gray-500">{dest.province}</span>
                    </div>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{dest.description}</p>
                    <div className="flex items-center text-xs text-gray-500 mb-3">
                      <Clock className="h-3 w-3 mr-1" />
                      {dest.bestTimeToVisit}
                    </div>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {dest.highlights.slice(0, 2).map((highlight) => (
                        <Badge key={highlight} variant="outline" className="text-xs">
                          {highlight}
                        </Badge>
                      ))}
                      {dest.highlights.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{dest.highlights.length - 2} more
                        </Badge>
                      )}
                    </div>
                    <Button asChild variant="outline" className="w-full">
                      <Link href={`/destinations/${dest.slug}`}>
                        View Details
                        <ArrowRight className="ml-2 h-3 w-3" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredDestinations.length === 0 && (
              <div className="text-center py-12">
                <MapPin className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No destinations found</h3>
                <p className="text-gray-500">Try adjusting your search criteria</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Explore China?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Let us create a personalized itinerary that combines multiple destinations for your perfect China adventure
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="default" asChild>
              <Link href="/custom-trip">
                Build Custom Trip
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/tours">
                Browse Tours
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}