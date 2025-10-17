import { Suspense } from "react";
import { Metadata } from "next";
import CheckoutSuccess from "@/components/blocks/checkout-success";

export const metadata: Metadata = {
  title: "Order Confirmed | China Tours",
  description: "Your order has been successfully processed",
  keywords: "order confirmation, payment success, China tours"
};

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Suspense fallback={<div>Loading confirmation...</div>}>
        <CheckoutSuccess />
      </Suspense>
    </div>
  );
}