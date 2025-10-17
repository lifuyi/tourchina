"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { 
  Download, 
  Calendar, 
  MapPin, 
  Clock, 
  Star,
  FileText,
  CreditCard,
  User,
  Settings,
  ShoppingCart,
  Eye,
  MessageSquare,
  CheckCircle,
  XCircle,
  AlertCircle
} from "lucide-react";
import { Link } from "@/i18n/navigation";

interface Purchase {
  id: string;
  type: 'digital' | 'service';
  title: string;
  price: number;
  purchaseDate: string;
  status: 'completed' | 'pending' | 'cancelled';
  downloadUrl?: string;
  serviceDetails?: {
    startDate: string;
    endDate: string;
    status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
    guide?: string;
  };
}

interface ServiceBooking {
  id: string;
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
  groupSize: number;
  totalCost: number;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
  guide: string;
  itinerary: string[];
}

const mockPurchases: Purchase[] = [
  {
    id: "1",
    type: "digital",
    title: "Complete Beijing Travel Guide",
    price: 29,
    purchaseDate: "2024-01-15",
    status: "completed",
    downloadUrl: "/downloads/beijing-guide.pdf"
  },
  {
    id: "2", 
    type: "service",
    title: "5-Day Beijing Imperial Tour",
    price: 890,
    purchaseDate: "2024-01-10",
    status: "completed",
    serviceDetails: {
      startDate: "2024-02-15",
      endDate: "2024-02-20",
      status: "completed",
      guide: "Li Wei"
    }
  },
  {
    id: "3",
    type: "digital",
    title: "Shanghai Food Culture Guide", 
    price: 19,
    purchaseDate: "2024-01-20",
    status: "completed",
    downloadUrl: "/downloads/shanghai-food-guide.pdf"
  }
];

const mockBookings: ServiceBooking[] = [
  {
    id: "1",
    title: "7-Day Classic China Tour",
    destination: "Beijing → Xi'an → Shanghai",
    startDate: "2024-03-15",
    endDate: "2024-03-22",
    groupSize: 4,
    totalCost: 2890,
    status: "confirmed",
    guide: "Wang Ming",
    itinerary: ["Forbidden City", "Great Wall", "Terracotta Warriors", "The Bund"]
  },
  {
    id: "2",
    title: "Guilin Photography Tour",
    destination: "Guilin → Yangshuo",
    startDate: "2024-04-10",
    endDate: "2024-04-14",
    groupSize: 2,
    totalCost: 1200,
    status: "pending",
    guide: "Chen Li",
    itinerary: ["Li River Cruise", "Reed Flute Cave", "Elephant Trunk Hill"]
  }
];

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
      case "confirmed":
        return <CheckCircle className="h-4 w-4" />;
      case "pending":
        return <AlertCircle className="h-4 w-4" />;
      case "cancelled":
        return <XCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your tours, bookings, and downloads</p>
        </div>
        <Button asChild>
          <Link href="/tours">
            <ShoppingCart className="mr-2 h-4 w-4" />
            Browse Tours
          </Link>
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Download className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Digital Guides</p>
                <p className="text-2xl font-bold">
                  {mockPurchases.filter(p => p.type === 'digital').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Bookings</p>
                <p className="text-2xl font-bold">
                  {mockBookings.filter(b => b.status === 'confirmed').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <MapPin className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Destinations Visited</p>
                <p className="text-2xl font-bold">5</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Star className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Reviews Written</p>
                <p className="text-2xl font-bold">3</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="purchases">Purchases</TabsTrigger>
          <TabsTrigger value="bookings">Service Bookings</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Purchases */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Download className="mr-2 h-5 w-5" />
                  Recent Purchases
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockPurchases.slice(0, 3).map((purchase) => (
                    <div key={purchase.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium">{purchase.title}</h4>
                        <p className="text-sm text-gray-500">{purchase.purchaseDate}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(purchase.status)}>
                          {purchase.status}
                        </Badge>
                        {purchase.type === 'digital' && purchase.downloadUrl && (
                          <Button size="sm" variant="outline">
                            <Download className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Bookings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5" />
                  Upcoming Bookings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockBookings.filter(b => b.status === 'confirmed').slice(0, 2).map((booking) => (
                    <div key={booking.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium">{booking.title}</h4>
                        <Badge className={getStatusColor(booking.status)}>
                          {getStatusIcon(booking.status)}
                          <span className="ml-1">{booking.status}</span>
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{booking.destination}</p>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        {booking.startDate} - {booking.endDate}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="purchases" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Purchase History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockPurchases.map((purchase) => (
                  <div key={purchase.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <h4 className="font-medium mr-3">{purchase.title}</h4>
                        <Badge variant={purchase.type === 'digital' ? 'secondary' : 'default'}>
                          {purchase.type === 'digital' ? 'Digital Guide' : 'Service Tour'}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-500 space-y-1">
                        <p>Purchased: {purchase.purchaseDate}</p>
                        <p>Price: ${purchase.price}</p>
                        {purchase.serviceDetails && (
                          <p>Service Date: {purchase.serviceDetails.startDate} - {purchase.serviceDetails.endDate}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge className={getStatusColor(purchase.status)}>
                        {getStatusIcon(purchase.status)}
                        <span className="ml-1">{purchase.status}</span>
                      </Badge>
                      {purchase.type === 'digital' && purchase.downloadUrl && (
                        <Button size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      )}
                      {purchase.type === 'service' && (
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bookings" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Service Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {mockBookings.map((booking) => (
                  <div key={booking.id} className="p-6 border rounded-lg">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold mb-2">{booking.title}</h3>
                        <div className="flex items-center text-gray-600 mb-2">
                          <MapPin className="h-4 w-4 mr-2" />
                          {booking.destination}
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Calendar className="h-4 w-4 mr-2" />
                          {booking.startDate} - {booking.endDate}
                        </div>
                      </div>
                      <Badge className={getStatusColor(booking.status)}>
                        {getStatusIcon(booking.status)}
                        <span className="ml-2">{booking.status}</span>
                      </Badge>
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-500">Group Size</p>
                        <p className="font-medium">{booking.groupSize} travelers</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Guide</p>
                        <p className="font-medium">{booking.guide}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Total Cost</p>
                        <p className="font-medium">${booking.totalCost}</p>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-sm text-gray-500 mb-2">Itinerary Highlights</p>
                      <div className="flex flex-wrap gap-2">
                        {booking.itinerary.map((item, index) => (
                          <Badge key={index} variant="outline">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <FileText className="h-4 w-4 mr-2" />
                        View Itinerary
                      </Button>
                      <Button size="sm" variant="outline">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Contact Guide
                      </Button>
                      {booking.status === 'completed' && (
                        <Button size="sm" variant="outline">
                          <Star className="h-4 w-4 mr-2" />
                          Write Review
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profile" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="mr-2 h-5 w-5" />
                  Profile Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Full Name</label>
                  <p className="mt-1">John Smith</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <p className="mt-1">john.smith@email.com</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Phone</label>
                  <p className="mt-1">+1 (555) 123-4567</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Member Since</label>
                  <p className="mt-1">January 2024</p>
                </div>
                <Button>
                  <Settings className="mr-2 h-4 w-4" />
                  Edit Profile
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="mr-2 h-5 w-5" />
                  Account Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Total Spent</span>
                  <span className="font-semibold">$938</span>
                </div>
                <div className="flex justify-between">
                  <span>Active Bookings</span>
                  <span className="font-semibold">1</span>
                </div>
                <div className="flex justify-between">
                  <span>Digital Downloads</span>
                  <span className="font-semibold">2</span>
                </div>
                <div className="flex justify-between">
                  <span>Loyalty Points</span>
                  <span className="font-semibold">2,890</span>
                </div>
                <Separator />
                <Button variant="outline" className="w-full">
                  View Payment Methods
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}