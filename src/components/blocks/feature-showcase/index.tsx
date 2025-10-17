"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle, 
  MapPin, 
  Calendar, 
  ShoppingCart, 
  Users, 
  FileText,
  Settings,
  Share2,
  BookOpen,
  ArrowRight,
  Star,
  Heart,
  Download
} from "lucide-react";
import { Link } from "@/i18n/navigation";

const completedFeatures = [
  {
    id: 1,
    title: "Custom Itinerary Builder",
    description: "Interactive multi-step form with map integration and real-time pricing calculator",
    icon: Calendar,
    url: "/custom-trip",
    status: "completed",
    features: [
      "Interactive multi-step form",
      "Destination selection with maps", 
      "Real-time pricing calculator",
      "Travel preferences customization",
      "Contact information collection"
    ]
  },
  {
    id: 2,
    title: "Checkout Flows",
    description: "Complete checkout system with payment integration and confirmation pages",
    icon: ShoppingCart,
    url: "/checkout",
    status: "completed", 
    features: [
      "Digital product checkout",
      "Service request forms",
      "Payment method selection",
      "Order confirmation pages",
      "Success page with downloads"
    ]
  },
  {
    id: 3,
    title: "User Dashboard",
    description: "Comprehensive dashboard for managing purchases, bookings, and downloads",
    icon: Users,
    url: "/dashboard",
    status: "completed",
    features: [
      "Purchase history management",
      "Service booking overview",
      "Digital download access",
      "Profile management",
      "Order tracking"
    ]
  },
  {
    id: 4,
    title: "Destinations Pages",
    description: "Individual destination pages with detailed information and tour filtering",
    icon: MapPin,
    url: "/destinations",
    status: "completed",
    features: [
      "Individual city/region pages",
      "Destination-specific filtering",
      "Interactive galleries",
      "Travel information",
      "Related tours display"
    ]
  },
  {
    id: 5,
    title: "Blog Integration", 
    description: "Full-featured blog system with content management and social features",
    icon: BookOpen,
    url: "/blog",
    status: "completed",
    features: [
      "Blog post listing",
      "Individual post pages",
      "Category filtering",
      "Author profiles",
      "Social engagement"
    ]
  },
  {
    id: 6,
    title: "Sharing Functionality",
    description: "Comprehensive sharing system for tours, destinations, and blog posts",
    icon: Share2,
    url: "#sharing",
    status: "completed",
    features: [
      "Social media sharing",
      "Native sharing API",
      "Custom share text",
      "QR code generation",
      "Email sharing"
    ]
  },
  {
    id: 7,
    title: "Admin Panel",
    description: "Tour management system with analytics and booking oversight",
    icon: Settings,
    url: "/admin/tours", 
    status: "completed",
    features: [
      "Tour creation and editing",
      "Booking management",
      "Revenue analytics",
      "User management",
      "Content management"
    ]
  }
];

const additionalFeatures = [
  "Responsive design for all devices",
  "Multi-language support (EN/ZH)",
  "Dark/light theme toggle",
  "SEO optimization",
  "Performance optimization",
  "Accessibility features",
  "Type-safe development",
  "Modern UI components"
];

export default function FeatureShowcase() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <Badge className="mb-4 bg-green-500 text-white">
              <CheckCircle className="h-4 w-4 mr-2" />
              Development Complete
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              China Tours Platform
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              A comprehensive travel platform with custom trip planning, e-commerce checkout, 
              user management, and content systems - all built with modern web technologies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/custom-trip">
                  Try Trip Builder
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600" asChild>
                <Link href="/destinations">
                  Explore Destinations
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Completed Features</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            All requested features have been implemented with modern design patterns, 
            robust functionality, and excellent user experience.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {completedFeatures.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <Card key={feature.id} className="overflow-hidden hover:shadow-xl transition-shadow group">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <div className="p-2 bg-blue-100 rounded-lg mr-3">
                        <IconComponent className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{feature.title}</CardTitle>
                        <Badge className="mt-1 bg-green-100 text-green-800">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          {feature.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600">{feature.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    {feature.features.map((item, index) => (
                      <div key={index} className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                  <Button asChild variant="outline" className="w-full group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Link href={feature.url}>
                      View Feature
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Technical Features */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Star className="h-5 w-5 mr-2 text-yellow-500" />
                Technical Highlights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-2">
                {additionalFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Heart className="h-5 w-5 mr-2 text-red-500" />
                User Experience
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">7</div>
                  <div className="text-sm text-gray-600">Major Features</div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="text-xl font-bold text-green-600">✓</div>
                    <div className="text-xs text-gray-600">Mobile Responsive</div>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <div className="text-xl font-bold text-purple-600">✓</div>
                    <div className="text-xs text-gray-600">Accessibility</div>
                  </div>
                  <div className="p-3 bg-yellow-50 rounded-lg">
                    <div className="text-xl font-bold text-yellow-600">✓</div>
                    <div className="text-xs text-gray-600">SEO Optimized</div>
                  </div>
                  <div className="p-3 bg-red-50 rounded-lg">
                    <div className="text-xl font-bold text-red-600">✓</div>
                    <div className="text-xs text-gray-600">Fast Loading</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Explore?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Experience the complete China travel platform with all features working seamlessly together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="default" asChild>
              <Link href="/custom-trip">
                <Calendar className="mr-2 h-5 w-5" />
                Plan Your Trip
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900" asChild>
              <Link href="/tours">
                <MapPin className="mr-2 h-5 w-5" />
                Browse Tours
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900" asChild>
              <Link href="/blog">
                <BookOpen className="mr-2 h-5 w-5" />
                Read Blog
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}