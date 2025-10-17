"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Heart, 
  MapPin, 
  Calendar, 
  Star, 
  DollarSign,
  Search,
  Filter,
  Share2,
  Trash2,
  ArrowRight,
  Grid,
  List,
  Plus
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { toast } from "sonner";

interface FavoriteItem {
  id: string;
  type: 'tour' | 'destination' | 'blog';
  title: string;
  slug: string;
  description: string;
  image: string;
  price?: number;
  rating?: number;
  reviewCount?: number;
  category: string;
  dateAdded: string;
  tags: string[];
}

const mockFavorites: FavoriteItem[] = [
  {
    id: "1",
    type: "tour",
    title: "5-Day Beijing Imperial Tour",
    slug: "beijing-imperial-tour",
    description: "Explore Beijing's imperial palaces and the Great Wall with expert guides",
    image: "/imgs/features/1.png",
    price: 890,
    rating: 4.9,
    reviewCount: 89,
    category: "Cultural Tours",
    dateAdded: "2024-01-20",
    tags: ["Beijing", "History", "Culture", "Great Wall"]
  },
  {
    id: "2",
    type: "destination",
    title: "Shanghai",
    slug: "shanghai",
    description: "Modern metropolis where East meets West",
    image: "/imgs/destinations/shanghai.jpg",
    rating: 4.8,
    reviewCount: 156,
    category: "Cities",
    dateAdded: "2024-01-18",
    tags: ["Shanghai", "Modern", "Culture", "Food"]
  },
  {
    id: "3",
    type: "blog",
    title: "Ultimate Guide to Beijing's Hidden Gems",
    slug: "beijing-hidden-gems-guide",
    description: "Discover secret spots in Beijing that most tourists never see",
    image: "/imgs/blog/beijing-hidden.jpg",
    rating: 4.7,
    reviewCount: 203,
    category: "Travel Tips",
    dateAdded: "2024-01-15",
    tags: ["Beijing", "Hidden Gems", "Local Tips"]
  },
  {
    id: "4",
    type: "tour",
    title: "Shanghai Food Culture Tour",
    slug: "shanghai-food-tour",
    description: "Taste authentic Shanghai cuisine with local food experts",
    image: "/imgs/features/2.png",
    price: 120,
    rating: 4.8,
    reviewCount: 94,
    category: "Food Tours",
    dateAdded: "2024-01-12",
    tags: ["Shanghai", "Food", "Culture", "Local"]
  }
];

interface FavoritesSystemProps {
  showAddButton?: boolean;
  limit?: number;
  itemId?: string;
  itemType?: 'tour' | 'destination' | 'blog';
}

export default function FavoritesSystem({ 
  showAddButton = false, 
  limit, 
  itemId, 
  itemType 
}: FavoritesSystemProps) {
  const [favorites, setFavorites] = useState<FavoriteItem[]>(mockFavorites);
  const [isFavorited, setIsFavorited] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Check if current item is favorited
  useEffect(() => {
    if (itemId && itemType) {
      setIsFavorited(favorites.some(fav => fav.id === itemId && fav.type === itemType));
    }
  }, [itemId, itemType, favorites]);

  // Filter and sort favorites
  let filteredFavorites = favorites.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = filterType === "all" || item.type === filterType;
    return matchesSearch && matchesType;
  });

  // Sort favorites
  filteredFavorites.sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
      case "oldest":
        return new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime();
      case "rating":
        return (b.rating || 0) - (a.rating || 0);
      case "price":
        return (a.price || 0) - (b.price || 0);
      case "title":
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  if (limit) {
    filteredFavorites = filteredFavorites.slice(0, limit);
  }

  const handleToggleFavorite = () => {
    if (itemId && itemType) {
      setIsFavorited(!isFavorited);
      if (!isFavorited) {
        toast.success("Added to favorites!");
      } else {
        toast.success("Removed from favorites!");
      }
    }
  };

  const handleRemoveFavorite = (favoriteId: string) => {
    setFavorites(favorites.filter(fav => fav.id !== favoriteId));
    toast.success("Removed from favorites!");
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "tour":
        return <Calendar className="h-4 w-4" />;
      case "destination":
        return <MapPin className="h-4 w-4" />;
      case "blog":
        return <Star className="h-4 w-4" />;
      default:
        return <Heart className="h-4 w-4" />;
    }
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

  // If showing add button for specific item
  if (showAddButton && itemId && itemType) {
    return (
      <Button
        variant={isFavorited ? "default" : "outline"}
        onClick={handleToggleFavorite}
        className="flex items-center"
      >
        <Heart className={`h-4 w-4 mr-2 ${isFavorited ? "fill-current" : ""}`} />
        {isFavorited ? "Favorited" : "Add to Favorites"}
      </Button>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">My Favorites</h2>
          <p className="text-gray-600">{favorites.length} saved items</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("grid")}
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("list")}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-wrap gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search favorites..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="tour">Tours</SelectItem>
              <SelectItem value="destination">Destinations</SelectItem>
              <SelectItem value="blog">Blog Posts</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="oldest">Oldest First</SelectItem>
            <SelectItem value="rating">Highest Rated</SelectItem>
            <SelectItem value="price">Lowest Price</SelectItem>
            <SelectItem value="title">A-Z</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Favorites Grid/List */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFavorites.map((favorite) => (
            <Card key={favorite.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
              <div className="relative">
                <img 
                  src={favorite.image} 
                  alt={favorite.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3">
                  <Badge className={getTypeColor(favorite.type)}>
                    {getTypeIcon(favorite.type)}
                    <span className="ml-1 capitalize">{favorite.type}</span>
                  </Badge>
                </div>
                <div className="absolute top-3 right-3 flex space-x-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="h-8 w-8 p-0 bg-white/90"
                    onClick={() => handleRemoveFavorite(favorite.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
              
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2 line-clamp-1">{favorite.title}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{favorite.description}</p>
                
                <div className="flex items-center justify-between mb-3">
                  {favorite.rating && (
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      <span className="text-sm">{favorite.rating}</span>
                      <span className="text-xs text-gray-500 ml-1">({favorite.reviewCount})</span>
                    </div>
                  )}
                  {favorite.price && (
                    <div className="flex items-center text-blue-600 font-semibold">
                      <DollarSign className="h-4 w-4" />
                      {favorite.price}
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {favorite.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {favorite.tags.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{favorite.tags.length - 2}
                    </Badge>
                  )}
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    Added {new Date(favorite.dateAdded).toLocaleDateString()}
                  </span>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Share2 className="h-3 w-3" />
                    </Button>
                    <Button asChild size="sm">
                      <Link href={`/${favorite.type === 'blog' ? 'blog' : favorite.type === 'destination' ? 'destinations' : 'tours'}/${favorite.slug}`}>
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredFavorites.map((favorite) => (
            <Card key={favorite.id}>
              <CardContent className="p-4">
                <div className="flex items-start space-x-4">
                  <img 
                    src={favorite.image} 
                    alt={favorite.title}
                    className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold text-lg">{favorite.title}</h3>
                          <Badge className={getTypeColor(favorite.type)}>
                            {getTypeIcon(favorite.type)}
                            <span className="ml-1 capitalize">{favorite.type}</span>
                          </Badge>
                        </div>
                        <p className="text-gray-600 mb-2">{favorite.description}</p>
                        <div className="flex items-center space-x-4">
                          {favorite.rating && (
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-yellow-500 mr-1" />
                              <span className="text-sm">{favorite.rating} ({favorite.reviewCount})</span>
                            </div>
                          )}
                          {favorite.price && (
                            <div className="flex items-center text-blue-600 font-semibold">
                              <DollarSign className="h-4 w-4" />
                              {favorite.price}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRemoveFavorite(favorite.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Share2 className="h-4 w-4" />
                        </Button>
                        <Button asChild size="sm">
                          <Link href={`/${favorite.type === 'blog' ? 'blog' : favorite.type === 'destination' ? 'destinations' : 'tours'}/${favorite.slug}`}>
                            View Details
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {favorite.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <span className="text-xs text-gray-500">
                        Added {new Date(favorite.dateAdded).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Empty State */}
      {filteredFavorites.length === 0 && (
        <div className="text-center py-12">
          <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {searchTerm || filterType !== "all" ? "No favorites found" : "No favorites yet"}
          </h3>
          <p className="text-gray-500 mb-4">
            {searchTerm || filterType !== "all" 
              ? "Try adjusting your search or filter criteria" 
              : "Start exploring and save your favorite tours, destinations, and guides!"
            }
          </p>
          <Button asChild>
            <Link href="/tours">
              <Plus className="mr-2 h-4 w-4" />
              Explore Tours
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}