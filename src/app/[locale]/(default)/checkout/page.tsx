import { Suspense } from "react";
import { Metadata } from "next";
import CheckoutFlow from "@/components/blocks/checkout-flow";

export const metadata: Metadata = {
  title: "Checkout | China Tours",
  description: "Complete your purchase for China travel guides and tour services",
  keywords: "checkout, payment, China tours, travel booking"
};

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Suspense fallback={<div>Loading checkout...</div>}>
        <CheckoutFlow />
      </Suspense>
    </div>
  );
}