"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  CheckCircle, 
  Download, 
  Calendar, 
  Mail, 
  Phone,
  MessageSquare,
  Star,
  ArrowRight,
  Home,
  Share2
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import confetti from 'canvas-confetti';

interface OrderItem {
  id: string;
  type: 'digital' | 'service';
  title: string;
  price: number;
  downloadUrl?: string;
  serviceDetails?: {
    confirmationNumber: string;
    contactInfo: string;
  };
}

// Mock order data - in real app this would come from URL params or API
const mockOrder = {
  id: "ORD-2024-001234",
  customerName: "John Smith",
  customerEmail: "john.smith@email.com",
  total: 948,
  paymentMethod: "Stripe",
  orderDate: "2024-01-25",
  items: [
    {
      id: "1",
      type: "digital" as const,
      title: "Complete Beijing Travel Guide",
      price: 29,
      downloadUrl: "/downloads/beijing-guide.pdf"
    },
    {
      id: "2", 
      type: "service" as const,
      title: "5-Day Beijing Imperial Tour",
      price: 890,
      serviceDetails: {
        confirmationNumber: "BJ-2024-5678",
        contactInfo: "guide@chinatours.com"
      }
    }
  ] as OrderItem[]
};

export default function CheckoutSuccess() {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    // Trigger confetti animation
    const timer = setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      setShowConfetti(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const digitalItems = mockOrder.items.filter(item => item.type === 'digital');
  const serviceItems = mockOrder.items.filter(item => item.type === 'service');

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'I just booked my China tour!',
          text: 'Excited for my upcoming trip to China with China Tours',
          url: window.location.origin,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    }
  };

  const handleDownload = (downloadUrl: string, title: string) => {
    // In a real app, this would handle secure download with auth
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = `${title}.pdf`;
    link.click();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Success Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
          <CheckCircle className="h-10 w-10 text-green-600" />
        </div>
        <h1 className="text-4xl font-bold mb-4">Order Confirmed!</h1>
        <p className="text-xl text-gray-600 mb-2">
          Thank you for your purchase, {mockOrder.customerName}
        </p>
        <p className="text-gray-500">
          Order #{mockOrder.id} • Placed on {mockOrder.orderDate}
        </p>
      </div>

      {/* Order Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2 space-y-6">
          {/* Digital Downloads */}
          {digitalItems.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Download className="mr-2 h-5 w-5" />
                  Digital Downloads
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {digitalItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div>
                        <h3 className="font-medium">{item.title}</h3>
                        <p className="text-sm text-gray-600">Ready for download</p>
                      </div>
                      <Button 
                        onClick={() => handleDownload(item.downloadUrl!, item.title)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  ))}
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Note:</strong> Download links have also been sent to your email address. 
                      You can re-download these guides anytime from your dashboard.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Service Bookings */}
          {serviceItems.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5" />
                  Service Bookings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {serviceItems.map((item) => (
                    <div key={item.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-medium">{item.title}</h3>
                          <Badge className="mt-1 bg-blue-100 text-blue-800">
                            Confirmation: {item.serviceDetails?.confirmationNumber}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">${item.price}</p>
                        </div>
                      </div>
                      
                      <div className="bg-yellow-50 p-4 rounded-lg">
                        <h4 className="font-medium text-yellow-800 mb-2">What happens next?</h4>
                        <ul className="text-sm text-yellow-700 space-y-1">
                          <li>• Our team will contact you within 24 hours</li>
                          <li>• We'll confirm your travel dates and preferences</li>
                          <li>• Your dedicated guide will reach out before departure</li>
                          <li>• You'll receive a detailed itinerary 1 week prior</li>
                        </ul>
                      </div>
                      
                      <div className="flex items-center space-x-4 mt-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <Mail className="h-4 w-4 mr-1" />
                          {item.serviceDetails?.contactInfo}
                        </div>
                        <Button variant="outline" size="sm">
                          <MessageSquare className="mr-2 h-3 w-3" />
                          Contact Guide
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Next Steps */}
          <Card>
            <CardHeader>
              <CardTitle>What's Next?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Check Your Email</h4>
                  <p className="text-sm text-gray-600">
                    Order confirmation and download links sent to {mockOrder.customerEmail}
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Access Your Dashboard</h4>
                  <p className="text-sm text-gray-600">
                    Manage downloads and bookings from your account dashboard
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Prepare for Travel</h4>
                  <p className="text-sm text-gray-600">
                    Review your digital guides and prepare for your amazing China experience
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Share Your Experience</h4>
                  <p className="text-sm text-gray-600">
                    Share your excitement and leave reviews after your trip
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockOrder.items.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <div>
                      <p className="font-medium text-sm">{item.title}</p>
                      <Badge variant={item.type === 'digital' ? 'secondary' : 'default'} className="text-xs">
                        {item.type === 'digital' ? 'Digital' : 'Service'}
                      </Badge>
                    </div>
                    <p className="font-medium">${item.price}</p>
                  </div>
                ))}
                
                <Separator />
                
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${mockOrder.total}</span>
                </div>
                
                <div className="text-sm text-gray-500">
                  <p>Payment Method: {mockOrder.paymentMethod}</p>
                  <p>Order Date: {mockOrder.orderDate}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Need Help?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="text-sm">support@chinatours.com</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="text-sm">+1 (555) 123-4567</span>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  <MessageSquare className="mr-2 h-3 w-3" />
                  Live Chat Support
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <Button asChild size="lg">
          <Link href="/dashboard">
            <Calendar className="mr-2 h-5 w-5" />
            View Dashboard
          </Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/">
            <Home className="mr-2 h-5 w-5" />
            Back to Home
          </Link>
        </Button>
        <Button variant="outline" size="lg" onClick={handleShare}>
          <Share2 className="mr-2 h-5 w-5" />
          Share Experience
        </Button>
      </div>

      {/* Review Prompt */}
      <div className="mt-12 p-6 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg text-center">
        <Star className="h-8 w-8 text-yellow-500 mx-auto mb-4" />
        <h3 className="text-lg font-bold mb-2">Enjoying Your Experience?</h3>
        <p className="text-gray-600 mb-4">
          Help other travelers by sharing your thoughts about our guides and services
        </p>
        <Button variant="outline">
          <Star className="mr-2 h-4 w-4" />
          Leave a Review
        </Button>
      </div>
    </div>
  );
}