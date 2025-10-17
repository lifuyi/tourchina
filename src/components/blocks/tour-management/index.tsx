"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  MapPin, 
  Calendar, 
  Users, 
  DollarSign,
  Star,
  Download,
  Upload,
  Search,
  Filter,
  MoreVertical,
  CheckCircle,
  XCircle,
  Clock
} from "lucide-react";
import { toast } from "sonner";

interface Tour {
  id: string;
  title: string;
  slug: string;
  type: 'digital' | 'service';
  destination: string;
  price?: number;
  priceFrom?: number;
  duration: number;
  capacity?: number;
  description: string;
  status: 'active' | 'draft' | 'archived';
  featured: boolean;
  rating: number;
  reviewCount: number;
  bookingCount: number;
  revenue: number;
  createdAt: string;
  updatedAt: string;
}

interface Booking {
  id: string;
  tourId: string;
  tourTitle: string;
  customerName: string;
  customerEmail: string;
  groupSize: number;
  startDate: string;
  endDate: string;
  totalAmount: number;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
  paymentStatus: 'paid' | 'pending' | 'refunded';
  createdAt: string;
}

const mockTours: Tour[] = [
  {
    id: "1",
    title: "Complete Beijing Travel Guide",
    slug: "beijing-complete-guide",
    type: "digital",
    destination: "Beijing",
    price: 29,
    duration: 0,
    description: "Comprehensive digital guide with maps, attractions, and insider tips",
    status: "active",
    featured: true,
    rating: 4.8,
    reviewCount: 156,
    bookingCount: 1240,
    revenue: 35960,
    createdAt: "2024-01-15",
    updatedAt: "2024-01-20"
  },
  {
    id: "2",
    title: "5-Day Beijing Imperial Tour",
    slug: "beijing-imperial-tour",
    type: "service",
    destination: "Beijing",
    priceFrom: 890,
    duration: 5,
    capacity: 12,
    description: "Private guided tour of Beijing's imperial palaces and the Great Wall",
    status: "active",
    featured: true,
    rating: 4.9,
    reviewCount: 89,
    bookingCount: 156,
    revenue: 138840,
    createdAt: "2024-01-10",
    updatedAt: "2024-01-22"
  },
  {
    id: "3",
    title: "Shanghai Food Culture Guide",
    slug: "shanghai-food-guide",
    type: "digital",
    destination: "Shanghai",
    price: 19,
    duration: 0,
    description: "Discover authentic Shanghai cuisine with restaurant recommendations",
    status: "draft",
    featured: false,
    rating: 4.7,
    reviewCount: 203,
    bookingCount: 580,
    revenue: 11020,
    createdAt: "2024-01-05",
    updatedAt: "2024-01-18"
  }
];

const mockBookings: Booking[] = [
  {
    id: "1",
    tourId: "2",
    tourTitle: "5-Day Beijing Imperial Tour",
    customerName: "John Smith",
    customerEmail: "john.smith@email.com",
    groupSize: 2,
    startDate: "2024-03-15",
    endDate: "2024-03-20",
    totalAmount: 1780,
    status: "confirmed",
    paymentStatus: "paid",
    createdAt: "2024-01-25"
  },
  {
    id: "2",
    tourId: "2",
    tourTitle: "5-Day Beijing Imperial Tour",
    customerName: "Sarah Johnson",
    customerEmail: "sarah.j@email.com",
    groupSize: 4,
    startDate: "2024-04-10",
    endDate: "2024-04-15",
    totalAmount: 3560,
    status: "pending",
    paymentStatus: "pending",
    createdAt: "2024-01-24"
  }
];

export default function TourManagement() {
  const [activeTab, setActiveTab] = useState("tours");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Filter tours based on search and filters
  const filteredTours = mockTours.filter(tour => {
    const matchesSearch = tour.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tour.destination.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || tour.status === filterStatus;
    const matchesType = filterType === "all" || tour.type === filterType;
    return matchesSearch && matchesStatus && matchesType;
  });

  // Filter bookings based on search
  const filteredBookings = mockBookings.filter(booking => 
    booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.tourTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
      case "confirmed":
      case "paid":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "draft":
        return "bg-blue-100 text-blue-800";
      case "archived":
      case "cancelled":
      case "refunded":
        return "bg-red-100 text-red-800";
      case "completed":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
      case "confirmed":
      case "paid":
      case "completed":
        return <CheckCircle className="h-4 w-4" />;
      case "pending":
      case "draft":
        return <Clock className="h-4 w-4" />;
      case "archived":
      case "cancelled":
      case "refunded":
        return <XCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const handleCreateTour = () => {
    toast.success("Tour created successfully!");
    setIsCreateModalOpen(false);
  };

  const handleEditTour = (tour: Tour) => {
    setSelectedTour(tour);
    setIsEditModalOpen(true);
  };

  const handleDeleteTour = (tourId: string) => {
    if (confirm("Are you sure you want to delete this tour?")) {
      toast.success("Tour deleted successfully!");
    }
  };

  const handleUpdateBookingStatus = (bookingId: string, newStatus: string) => {
    toast.success(`Booking status updated to ${newStatus}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Tour Management</h1>
          <p className="text-gray-600 mt-2">Manage your tours, bookings, and revenue</p>
        </div>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Create Tour
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <MapPin className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Tours</p>
                <p className="text-2xl font-bold">{mockTours.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-green-600" />
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
              <DollarSign className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold">
                  ${mockTours.reduce((sum, tour) => sum + tour.revenue, 0).toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Star className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg Rating</p>
                <p className="text-2xl font-bold">
                  {(mockTours.reduce((sum, tour) => sum + tour.rating, 0) / mockTours.length).toFixed(1)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="tours">Tours</TabsTrigger>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="tours" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>All Tours</CardTitle>
                <div className="flex space-x-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search tours..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="digital">Digital</SelectItem>
                      <SelectItem value="service">Service</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tour</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Destination</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Bookings</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTours.map((tour) => (
                    <TableRow key={tour.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{tour.title}</p>
                          {tour.featured && (
                            <Badge variant="secondary" className="text-xs mt-1">Featured</Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={tour.type === 'digital' ? 'secondary' : 'default'}>
                          {tour.type}
                        </Badge>
                      </TableCell>
                      <TableCell>{tour.destination}</TableCell>
                      <TableCell>
                        {tour.price ? `$${tour.price}` : `From $${tour.priceFrom}`}
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(tour.status)}>
                          {getStatusIcon(tour.status)}
                          <span className="ml-1">{tour.status}</span>
                        </Badge>
                      </TableCell>
                      <TableCell>{tour.bookingCount}</TableCell>
                      <TableCell>${tour.revenue.toLocaleString()}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 mr-1" />
                          {tour.rating}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleEditTour(tour)}
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDeleteTour(tour.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bookings" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Recent Bookings</CardTitle>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search bookings..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Tour</TableHead>
                    <TableHead>Dates</TableHead>
                    <TableHead>Group Size</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Payment</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{booking.customerName}</p>
                          <p className="text-sm text-gray-600">{booking.customerEmail}</p>
                        </div>
                      </TableCell>
                      <TableCell>{booking.tourTitle}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p>{booking.startDate}</p>
                          <p className="text-gray-600">to {booking.endDate}</p>
                        </div>
                      </TableCell>
                      <TableCell>{booking.groupSize} travelers</TableCell>
                      <TableCell>${booking.totalAmount}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(booking.status)}>
                          {getStatusIcon(booking.status)}
                          <span className="ml-1">{booking.status}</span>
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(booking.paymentStatus)}>
                          {booking.paymentStatus}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Select onValueChange={(value) => handleUpdateBookingStatus(booking.id, value)}>
                            <SelectTrigger className="w-24 h-8">
                              <MoreVertical className="h-3 w-3" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="confirmed">Confirm</SelectItem>
                              <SelectItem value="cancelled">Cancel</SelectItem>
                              <SelectItem value="completed">Complete</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Digital Guides</span>
                    <span className="font-semibold">
                      ${mockTours.filter(t => t.type === 'digital').reduce((sum, t) => sum + t.revenue, 0).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Service Tours</span>
                    <span className="font-semibold">
                      ${mockTours.filter(t => t.type === 'service').reduce((sum, t) => sum + t.revenue, 0).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between font-bold text-lg border-t pt-2">
                    <span>Total</span>
                    <span>${mockTours.reduce((sum, t) => sum + t.revenue, 0).toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Performing Tours</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockTours
                    .sort((a, b) => b.revenue - a.revenue)
                    .slice(0, 3)
                    .map((tour, index) => (
                      <div key={tour.id} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-medium">
                            {index + 1}
                          </div>
                          <div className="ml-3">
                            <p className="font-medium text-sm">{tour.title}</p>
                            <p className="text-xs text-gray-600">{tour.bookingCount} bookings</p>
                          </div>
                        </div>
                        <span className="font-semibold">${tour.revenue.toLocaleString()}</span>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Create Tour Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Tour</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Tour Title</Label>
                <Input id="title" placeholder="Enter tour title" />
              </div>
              <div>
                <Label htmlFor="type">Tour Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="digital">Digital Guide</SelectItem>
                    <SelectItem value="service">Service Tour</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Tour description" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="destination">Destination</Label>
                <Input id="destination" placeholder="e.g., Beijing" />
              </div>
              <div>
                <Label htmlFor="price">Price ($)</Label>
                <Input id="price" type="number" placeholder="29" />
              </div>
              <div>
                <Label htmlFor="duration">Duration (days)</Label>
                <Input id="duration" type="number" placeholder="5" />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateTour}>
                Create Tour
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}