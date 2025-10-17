"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  MapPin, 
  Calendar as CalendarIcon, 
  Users, 
  DollarSign, 
  Clock, 
  Star,
  Plus,
  Minus,
  ChevronRight,
  ChevronLeft,
  Check,
  Heart,
  Camera,
  Utensils,
  Bed,
  Car
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface Destination {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  highlights: string[];
  minDays: number;
  avgCost: number;
  coordinates: [number, number];
}

interface TripData {
  destinations: string[];
  startDate: Date | undefined;
  endDate: Date | undefined;
  groupSize: number;
  budget: number[];
  interests: string[];
  accommodation: string;
  transportation: string;
  mealPreference: string;
  specialRequests: string;
  contactInfo: {
    name: string;
    email: string;
    phone: string;
  };
}

const destinations: Destination[] = [
  {
    id: "beijing",
    name: "Beijing",
    slug: "beijing",
    description: "Capital city with imperial palaces and the Great Wall",
    image: "/imgs/destinations/beijing.jpg",
    highlights: ["Forbidden City", "Great Wall", "Temple of Heaven"],
    minDays: 3,
    avgCost: 150,
    coordinates: [39.9042, 116.4074]
  },
  {
    id: "shanghai",
    name: "Shanghai",
    slug: "shanghai", 
    description: "Modern metropolis with stunning skylines",
    image: "/imgs/destinations/shanghai.jpg",
    highlights: ["The Bund", "Yu Garden", "Shanghai Tower"],
    minDays: 2,
    avgCost: 180,
    coordinates: [31.2304, 121.4737]
  },
  {
    id: "xian",
    name: "Xi'an",
    slug: "xian",
    description: "Ancient capital famous for Terracotta Warriors",
    image: "/imgs/destinations/xian.jpg",
    highlights: ["Terracotta Warriors", "City Wall", "Muslim Quarter"],
    minDays: 2,
    avgCost: 120,
    coordinates: [34.3416, 108.9398]
  },
  {
    id: "guilin",
    name: "Guilin",
    slug: "guilin",
    description: "Stunning karst landscapes and Li River",
    image: "/imgs/destinations/guilin.jpg",
    highlights: ["Li River", "Reed Flute Cave", "Elephant Trunk Hill"],
    minDays: 3,
    avgCost: 100,
    coordinates: [25.2736, 110.2906]
  },
  {
    id: "chengdu",
    name: "Chengdu",
    slug: "chengdu",
    description: "Home of giant pandas and spicy Sichuan cuisine",
    image: "/imgs/destinations/chengdu.jpg",
    highlights: ["Giant Panda Base", "Jinli Street", "Sichuan Opera"],
    minDays: 2,
    avgCost: 110,
    coordinates: [30.5728, 104.0668]
  }
];

const interests = [
  "Historical Sites", "Cultural Experiences", "Natural Landscapes", 
  "Food & Cuisine", "Adventure Activities", "Photography", 
  "Shopping", "Nightlife", "Architecture", "Museums"
];

export default function CustomTripBuilder() {
  const [currentStep, setCurrentStep] = useState(1);
  const [tripData, setTripData] = useState<TripData>({
    destinations: [],
    startDate: undefined,
    endDate: undefined,
    groupSize: 2,
    budget: [2000],
    interests: [],
    accommodation: "",
    transportation: "",
    mealPreference: "",
    specialRequests: "",
    contactInfo: {
      name: "",
      email: "",
      phone: ""
    }
  });

  const [estimatedCost, setEstimatedCost] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalSteps = 5;
  const progress = (currentStep / totalSteps) * 100;

  // Calculate estimated cost
  useEffect(() => {
    const selectedDests = destinations.filter(d => tripData.destinations.includes(d.id));
    const baseCost = selectedDests.reduce((sum, dest) => sum + (dest.avgCost * dest.minDays), 0);
    const groupMultiplier = tripData.groupSize;
    const budgetMultiplier = tripData.budget[0] / 2000; // Base budget is 2000
    
    setEstimatedCost(Math.round(baseCost * groupMultiplier * budgetMultiplier));
  }, [tripData.destinations, tripData.groupSize, tripData.budget]);

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const toggleDestination = (destId: string) => {
    setTripData(prev => ({
      ...prev,
      destinations: prev.destinations.includes(destId)
        ? prev.destinations.filter(id => id !== destId)
        : [...prev.destinations, destId]
    }));
  };

  const toggleInterest = (interest: string) => {
    setTripData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Here you would send the data to your API
      console.log("Submitting trip data:", tripData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Redirect to checkout or confirmation
      alert("Trip request submitted successfully! We'll contact you within 24 hours.");
    } catch (error) {
      console.error("Error submitting trip:", error);
      alert("Error submitting trip. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Where would you like to go?</h2>
              <p className="text-gray-600">Select one or more destinations for your China adventure</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {destinations.map((dest) => (
                <Card 
                  key={dest.id}
                  className={cn(
                    "cursor-pointer transition-all hover:shadow-lg",
                    tripData.destinations.includes(dest.id) && "ring-2 ring-blue-500 bg-blue-50"
                  )}
                  onClick={() => toggleDestination(dest.id)}
                >
                  <CardHeader className="p-0">
                    <div className="relative h-40">
                      <img 
                        src={dest.image} 
                        alt={dest.name}
                        className="w-full h-full object-cover rounded-t-lg"
                      />
                      {tripData.destinations.includes(dest.id) && (
                        <div className="absolute top-2 right-2 bg-blue-500 text-white rounded-full p-1">
                          <Check className="h-4 w-4" />
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-1">{dest.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{dest.description}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        {dest.minDays}+ days
                      </span>
                      <span className="flex items-center text-gray-500">
                        <DollarSign className="h-4 w-4 mr-1" />
                        ${dest.avgCost}/day
                      </span>
                    </div>
                    <div className="mt-2">
                      <div className="flex flex-wrap gap-1">
                        {dest.highlights.slice(0, 2).map((highlight) => (
                          <Badge key={highlight} variant="secondary" className="text-xs">
                            {highlight}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">When are you traveling?</h2>
              <p className="text-gray-600">Select your travel dates and group size</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Travel Dates</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Start Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !tripData.startDate && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {tripData.startDate ? format(tripData.startDate, "PPP") : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={tripData.startDate}
                            onSelect={(date) => setTripData(prev => ({ ...prev, startDate: date }))}
                            disabled={(date) => date < new Date()}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    
                    <div>
                      <Label>End Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !tripData.endDate && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {tripData.endDate ? format(tripData.endDate, "PPP") : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={tripData.endDate}
                            onSelect={(date) => setTripData(prev => ({ ...prev, endDate: date }))}
                            disabled={(date) => date < (tripData.startDate || new Date())}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Group Size</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setTripData(prev => ({ 
                        ...prev, 
                        groupSize: Math.max(1, prev.groupSize - 1) 
                      }))}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <div className="flex items-center space-x-2">
                      <Users className="h-5 w-5 text-gray-500" />
                      <span className="text-2xl font-semibold">{tripData.groupSize}</span>
                      <span className="text-gray-500">travelers</span>
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setTripData(prev => ({ 
                        ...prev, 
                        groupSize: Math.min(20, prev.groupSize + 1) 
                      }))}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Budget Range</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Slider
                    value={tripData.budget}
                    onValueChange={(value) => setTripData(prev => ({ ...prev, budget: value }))}
                    max={10000}
                    min={500}
                    step={100}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>$500</span>
                    <span className="font-semibold text-blue-600">
                      ${tripData.budget[0]} per person
                    </span>
                    <span>$10,000+</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">What interests you most?</h2>
              <p className="text-gray-600">Help us customize your perfect itinerary</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {interests.map((interest) => (
                <Card
                  key={interest}
                  className={cn(
                    "cursor-pointer transition-all hover:shadow-md",
                    tripData.interests.includes(interest) && "ring-2 ring-blue-500 bg-blue-50"
                  )}
                  onClick={() => toggleInterest(interest)}
                >
                  <CardContent className="p-4 text-center">
                    <div className="mb-2">
                      {interest === "Historical Sites" && <MapPin className="h-6 w-6 mx-auto" />}
                      {interest === "Cultural Experiences" && <Star className="h-6 w-6 mx-auto" />}
                      {interest === "Natural Landscapes" && <Heart className="h-6 w-6 mx-auto" />}
                      {interest === "Food & Cuisine" && <Utensils className="h-6 w-6 mx-auto" />}
                      {interest === "Adventure Activities" && <Camera className="h-6 w-6 mx-auto" />}
                      {interest === "Photography" && <Camera className="h-6 w-6 mx-auto" />}
                      {interest === "Shopping" && <MapPin className="h-6 w-6 mx-auto" />}
                      {interest === "Nightlife" && <Star className="h-6 w-6 mx-auto" />}
                      {interest === "Architecture" && <MapPin className="h-6 w-6 mx-auto" />}
                      {interest === "Museums" && <MapPin className="h-6 w-6 mx-auto" />}
                    </div>
                    <p className="text-sm font-medium">{interest}</p>
                    {tripData.interests.includes(interest) && (
                      <Check className="h-4 w-4 mx-auto mt-2 text-blue-500" />
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Travel Preferences</h2>
              <p className="text-gray-600">Tell us about your accommodation and transportation preferences</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Bed className="h-5 w-5 mr-2" />
                    Accommodation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Select 
                    value={tripData.accommodation} 
                    onValueChange={(value) => setTripData(prev => ({ ...prev, accommodation: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select accommodation type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="budget">Budget Hotels (2-3 stars)</SelectItem>
                      <SelectItem value="standard">Standard Hotels (3-4 stars)</SelectItem>
                      <SelectItem value="luxury">Luxury Hotels (4-5 stars)</SelectItem>
                      <SelectItem value="boutique">Boutique Hotels</SelectItem>
                      <SelectItem value="mixed">Mixed (Budget + Luxury)</SelectItem>
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Car className="h-5 w-5 mr-2" />
                    Transportation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Select 
                    value={tripData.transportation} 
                    onValueChange={(value) => setTripData(prev => ({ ...prev, transportation: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select transportation type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high-speed-train">High-Speed Train</SelectItem>
                      <SelectItem value="flights">Domestic Flights</SelectItem>
                      <SelectItem value="private-car">Private Car/Van</SelectItem>
                      <SelectItem value="public-transport">Public Transportation</SelectItem>
                      <SelectItem value="mixed">Mixed Transportation</SelectItem>
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Utensils className="h-5 w-5 mr-2" />
                    Meal Preference
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Select 
                    value={tripData.mealPreference} 
                    onValueChange={(value) => setTripData(prev => ({ ...prev, mealPreference: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select meal preference" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-included">All Meals Included</SelectItem>
                      <SelectItem value="breakfast-only">Breakfast Only</SelectItem>
                      <SelectItem value="breakfast-dinner">Breakfast + Dinner</SelectItem>
                      <SelectItem value="flexible">Flexible/Self-arranged</SelectItem>
                      <SelectItem value="vegetarian">Vegetarian Options</SelectItem>
                      <SelectItem value="dietary-restrictions">Special Dietary Needs</SelectItem>
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Special Requests</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Any special requests, accessibility needs, or additional information..."
                    value={tripData.specialRequests}
                    onChange={(e) => setTripData(prev => ({ ...prev, specialRequests: e.target.value }))}
                    className="min-h-[100px]"
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Contact Information</h2>
              <p className="text-gray-600">We'll use this information to send you a personalized quote</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Contact Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      placeholder="Your full name"
                      value={tripData.contactInfo.name}
                      onChange={(e) => setTripData(prev => ({
                        ...prev,
                        contactInfo: { ...prev.contactInfo, name: e.target.value }
                      }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={tripData.contactInfo.email}
                      onChange={(e) => setTripData(prev => ({
                        ...prev,
                        contactInfo: { ...prev.contactInfo, email: e.target.value }
                      }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      placeholder="+1 (555) 123-4567"
                      value={tripData.contactInfo.phone}
                      onChange={(e) => setTripData(prev => ({
                        ...prev,
                        contactInfo: { ...prev.contactInfo, phone: e.target.value }
                      }))}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Trip Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Destinations</h4>
                    <div className="flex flex-wrap gap-2">
                      {tripData.destinations.map(destId => {
                        const dest = destinations.find(d => d.id === destId);
                        return (
                          <Badge key={destId} variant="secondary">
                            {dest?.name}
                          </Badge>
                        );
                      })}
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Group Size:</span>
                      <p className="font-medium">{tripData.groupSize} travelers</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Budget:</span>
                      <p className="font-medium">${tripData.budget[0]} per person</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Dates:</span>
                      <p className="font-medium">
                        {tripData.startDate && tripData.endDate
                          ? `${format(tripData.startDate, "MMM dd")} - ${format(tripData.endDate, "MMM dd")}`
                          : "To be determined"
                        }
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-500">Estimated Cost:</span>
                      <p className="font-medium text-blue-600">${estimatedCost.toLocaleString()}</p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h4 className="font-medium mb-2">Interests</h4>
                    <div className="flex flex-wrap gap-1">
                      {tripData.interests.map(interest => (
                        <Badge key={interest} variant="outline" className="text-xs">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Create Your Perfect China Trip</h1>
        <p className="text-xl text-gray-600 mb-6">
          Our interactive trip builder helps you design a personalized China experience
        </p>
        
        {/* Progress Bar */}
        <div className="max-w-md mx-auto">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>Step {currentStep} of {totalSteps}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      {/* Step Content */}
      <div className="mb-8">
        {renderStep()}
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 1}
          className="flex items-center"
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>

        <div className="flex space-x-2">
          {Array.from({ length: totalSteps }, (_, i) => (
            <div
              key={i}
              className={cn(
                "w-3 h-3 rounded-full",
                i + 1 <= currentStep ? "bg-blue-500" : "bg-gray-300"
              )}
            />
          ))}
        </div>

        {currentStep < totalSteps ? (
          <Button
            onClick={nextStep}
            disabled={
              (currentStep === 1 && tripData.destinations.length === 0) ||
              (currentStep === 2 && (!tripData.startDate || !tripData.endDate)) ||
              (currentStep === 5 && (!tripData.contactInfo.name || !tripData.contactInfo.email))
            }
            className="flex items-center"
          >
            Next
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || !tripData.contactInfo.name || !tripData.contactInfo.email}
            className="flex items-center"
          >
            {isSubmitting ? "Submitting..." : "Get My Quote"}
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        )}
      </div>

      {/* Estimated Cost Display */}
      {estimatedCost > 0 && (
        <div className="fixed bottom-4 right-4 bg-white border border-gray-200 rounded-lg shadow-lg p-4">
          <div className="text-sm text-gray-500">Estimated Total Cost</div>
          <div className="text-2xl font-bold text-blue-600">${estimatedCost.toLocaleString()}</div>
          <div className="text-xs text-gray-400">For {tripData.groupSize} travelers</div>
        </div>
      )}
    </div>
  );
}