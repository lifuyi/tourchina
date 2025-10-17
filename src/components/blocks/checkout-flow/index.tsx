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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { 
  ShoppingCart, 
  CreditCard, 
  Shield, 
  Check,
  ChevronLeft,
  ChevronRight,
  Download,
  Calendar,
  Users,
  MapPin,
  Clock,
  Star,
  Lock,
  AlertCircle
} from "lucide-react";
import { toast } from "sonner";

interface CartItem {
  id: string;
  type: 'digital' | 'service';
  title: string;
  description: string;
  price?: number;
  priceFrom?: number;
  image: string;
  quantity: number;
  customization?: {
    dates?: { start: string; end: string };
    groupSize?: number;
    requirements?: string;
  };
}

interface CheckoutData {
  items: CartItem[];
  customerInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  billingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  paymentMethod: 'stripe' | 'creem';
  specialRequests: string;
  agreeToTerms: boolean;
  subscribeNewsletter: boolean;
}

// Mock cart data
const mockCartItems: CartItem[] = [
  {
    id: "1",
    type: "digital",
    title: "Complete Beijing Travel Guide",
    description: "Comprehensive digital guide with maps and insider tips",
    price: 29,
    image: "/imgs/features/1.png",
    quantity: 1
  },
  {
    id: "2",
    type: "service", 
    title: "5-Day Beijing Imperial Tour",
    description: "Private guided tour with accommodation",
    priceFrom: 890,
    image: "/imgs/features/2.png",
    quantity: 1,
    customization: {
      dates: { start: "2024-03-15", end: "2024-03-20" },
      groupSize: 2,
      requirements: "Vegetarian meals preferred"
    }
  }
];

export default function CheckoutFlow() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [checkoutData, setCheckoutData] = useState<CheckoutData>({
    items: mockCartItems,
    customerInfo: {
      firstName: "",
      lastName: "",
      email: "",
      phone: ""
    },
    billingAddress: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "US"
    },
    paymentMethod: 'stripe',
    specialRequests: "",
    agreeToTerms: false,
    subscribeNewsletter: false
  });

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  // Calculate totals
  const subtotal = checkoutData.items.reduce((sum, item) => {
    const price = item.price || item.priceFrom || 0;
    return sum + (price * item.quantity);
  }, 0);
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax;

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

  const handleSubmit = async () => {
    setIsProcessing(true);
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Here you would integrate with your actual payment processor
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(checkoutData),
      });

      if (response.ok) {
        const data = await response.json();
        // Redirect to payment processor or confirmation page
        window.location.href = data.checkout_url || '/checkout/success';
      } else {
        throw new Error('Payment processing failed');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Review Your Order</h2>
            
            <div className="space-y-4">
              {checkoutData.items.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold">{item.title}</h3>
                            <p className="text-sm text-gray-600">{item.description}</p>
                            <Badge variant={item.type === 'digital' ? 'secondary' : 'default'} className="mt-1">
                              {item.type === 'digital' ? 'Digital Guide' : 'Service Tour'}
                            </Badge>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-lg">
                              ${item.price || item.priceFrom}
                              {item.priceFrom && <span className="text-sm font-normal text-gray-500"> from</span>}
                            </p>
                            <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                          </div>
                        </div>
                        
                        {item.customization && (
                          <div className="bg-gray-50 p-3 rounded-lg mt-3">
                            <h4 className="font-medium text-sm mb-2">Customization Details</h4>
                            {item.customization.dates && (
                              <div className="flex items-center text-sm text-gray-600 mb-1">
                                <Calendar className="h-4 w-4 mr-2" />
                                {item.customization.dates.start} - {item.customization.dates.end}
                              </div>
                            )}
                            {item.customization.groupSize && (
                              <div className="flex items-center text-sm text-gray-600 mb-1">
                                <Users className="h-4 w-4 mr-2" />
                                {item.customization.groupSize} travelers
                              </div>
                            )}
                            {item.customization.requirements && (
                              <p className="text-sm text-gray-600">{item.customization.requirements}</p>
                            )}
                          </div>
                        )}
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
            <h2 className="text-2xl font-bold">Customer Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={checkoutData.customerInfo.firstName}
                        onChange={(e) => setCheckoutData(prev => ({
                          ...prev,
                          customerInfo: { ...prev.customerInfo, firstName: e.target.value }
                        }))}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={checkoutData.customerInfo.lastName}
                        onChange={(e) => setCheckoutData(prev => ({
                          ...prev,
                          customerInfo: { ...prev.customerInfo, lastName: e.target.value }
                        }))}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={checkoutData.customerInfo.email}
                      onChange={(e) => setCheckoutData(prev => ({
                        ...prev,
                        customerInfo: { ...prev.customerInfo, email: e.target.value }
                      }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={checkoutData.customerInfo.phone}
                      onChange={(e) => setCheckoutData(prev => ({
                        ...prev,
                        customerInfo: { ...prev.customerInfo, phone: e.target.value }
                      }))}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Billing Address</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="street">Street Address</Label>
                    <Input
                      id="street"
                      value={checkoutData.billingAddress.street}
                      onChange={(e) => setCheckoutData(prev => ({
                        ...prev,
                        billingAddress: { ...prev.billingAddress, street: e.target.value }
                      }))}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={checkoutData.billingAddress.city}
                        onChange={(e) => setCheckoutData(prev => ({
                          ...prev,
                          billingAddress: { ...prev.billingAddress, city: e.target.value }
                        }))}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State/Province</Label>
                      <Input
                        id="state"
                        value={checkoutData.billingAddress.state}
                        onChange={(e) => setCheckoutData(prev => ({
                          ...prev,
                          billingAddress: { ...prev.billingAddress, state: e.target.value }
                        }))}
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="zipCode">ZIP/Postal Code</Label>
                      <Input
                        id="zipCode"
                        value={checkoutData.billingAddress.zipCode}
                        onChange={(e) => setCheckoutData(prev => ({
                          ...prev,
                          billingAddress: { ...prev.billingAddress, zipCode: e.target.value }
                        }))}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="country">Country</Label>
                      <Select 
                        value={checkoutData.billingAddress.country}
                        onValueChange={(value) => setCheckoutData(prev => ({
                          ...prev,
                          billingAddress: { ...prev.billingAddress, country: value }
                        }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="US">United States</SelectItem>
                          <SelectItem value="CA">Canada</SelectItem>
                          <SelectItem value="GB">United Kingdom</SelectItem>
                          <SelectItem value="AU">Australia</SelectItem>
                          <SelectItem value="DE">Germany</SelectItem>
                          <SelectItem value="FR">France</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Payment Method</h2>
            
            <Card>
              <CardHeader>
                <CardTitle>Select Payment Option</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup 
                  value={checkoutData.paymentMethod} 
                  onValueChange={(value: 'stripe' | 'creem') => setCheckoutData(prev => ({ ...prev, paymentMethod: value }))}
                  className="space-y-4"
                >
                  <div className="flex items-center space-x-3 p-4 border rounded-lg">
                    <RadioGroupItem value="stripe" id="stripe" />
                    <Label htmlFor="stripe" className="flex-1 cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Credit/Debit Card</h3>
                          <p className="text-sm text-gray-600">Secure payment via Stripe</p>
                        </div>
                        <div className="flex space-x-2">
                          <img src="/imgs/payment/visa.png" alt="Visa" className="h-6" />
                          <img src="/imgs/payment/mastercard.png" alt="Mastercard" className="h-6" />
                          <img src="/imgs/payment/amex.png" alt="American Express" className="h-6" />
                        </div>
                      </div>
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-4 border rounded-lg">
                    <RadioGroupItem value="creem" id="creem" />
                    <Label htmlFor="creem" className="flex-1 cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Creem Payment</h3>
                          <p className="text-sm text-gray-600">Fast and secure payment</p>
                        </div>
                        <div className="text-blue-600 font-bold">CREEM</div>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center">
                    <Shield className="h-5 w-5 text-blue-600 mr-2" />
                    <div>
                      <h4 className="font-medium text-blue-900">Secure Payment</h4>
                      <p className="text-sm text-blue-700">Your payment information is encrypted and secure</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Additional Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="specialRequests">Special Requests or Notes</Label>
                  <Textarea
                    id="specialRequests"
                    placeholder="Any special requirements, dietary restrictions, or other notes..."
                    value={checkoutData.specialRequests}
                    onChange={(e) => setCheckoutData(prev => ({ ...prev, specialRequests: e.target.value }))}
                    className="min-h-[100px]"
                  />
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="terms"
                      checked={checkoutData.agreeToTerms}
                      onCheckedChange={(checked) => setCheckoutData(prev => ({ ...prev, agreeToTerms: checked as boolean }))}
                    />
                    <Label htmlFor="terms" className="text-sm">
                      I agree to the <a href="/terms-of-service" className="text-blue-600 hover:underline">Terms of Service</a> and <a href="/privacy-policy" className="text-blue-600 hover:underline">Privacy Policy</a>
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="newsletter"
                      checked={checkoutData.subscribeNewsletter}
                      onCheckedChange={(checked) => setCheckoutData(prev => ({ ...prev, subscribeNewsletter: checked as boolean }))}
                    />
                    <Label htmlFor="newsletter" className="text-sm">
                      Subscribe to our newsletter for travel tips and special offers
                    </Label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Review & Confirm</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Customer Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <p><strong>Name:</strong> {checkoutData.customerInfo.firstName} {checkoutData.customerInfo.lastName}</p>
                      <p><strong>Email:</strong> {checkoutData.customerInfo.email}</p>
                      <p><strong>Phone:</strong> {checkoutData.customerInfo.phone}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Billing Address</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm">
                      <p>{checkoutData.billingAddress.street}</p>
                      <p>{checkoutData.billingAddress.city}, {checkoutData.billingAddress.state} {checkoutData.billingAddress.zipCode}</p>
                      <p>{checkoutData.billingAddress.country}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Payment Method</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center">
                      <CreditCard className="h-5 w-5 mr-2" />
                      <span className="capitalize">{checkoutData.paymentMethod}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {checkoutData.items.map((item) => (
                      <div key={item.id} className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{item.title}</p>
                          <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-medium">${(item.price || item.priceFrom || 0) * item.quantity}</p>
                      </div>
                    ))}
                    
                    <Separator />
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tax</span>
                        <span>${tax.toFixed(2)}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {!checkoutData.agreeToTerms && (
              <div className="flex items-center p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <AlertCircle className="h-5 w-5 text-yellow-600 mr-2" />
                <p className="text-sm text-yellow-800">
                  Please agree to the Terms of Service to complete your purchase.
                </p>
              </div>
            )}
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
        <h1 className="text-4xl font-bold mb-4">Secure Checkout</h1>
        <div className="max-w-md mx-auto">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>Step {currentStep} of {totalSteps}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3">
          {renderStep()}
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle className="flex items-center">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {checkoutData.items.map((item) => (
                  <div key={item.id} className="flex justify-between items-start text-sm">
                    <div className="flex-1">
                      <p className="font-medium">{item.title}</p>
                      <p className="text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-medium">${(item.price || item.priceFrom || 0) * item.quantity}</p>
                  </div>
                ))}
                
                <Separator />
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center mt-8">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 1}
          className="flex items-center"
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>

        {currentStep < totalSteps ? (
          <Button
            onClick={nextStep}
            disabled={
              (currentStep === 2 && (!checkoutData.customerInfo.firstName || !checkoutData.customerInfo.lastName || !checkoutData.customerInfo.email)) ||
              (currentStep === 3 && !checkoutData.paymentMethod)
            }
            className="flex items-center"
          >
            Next
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            disabled={isProcessing || !checkoutData.agreeToTerms}
            className="flex items-center"
          >
            {isProcessing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Processing...
              </>
            ) : (
              <>
                <Lock className="h-4 w-4 mr-2" />
                Complete Order
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  );
}