import { Suspense } from "react";
import { Metadata } from "next";
import TourManagement from "@/components/blocks/tour-management";

export const metadata: Metadata = {
  title: "Tour Management | Admin Panel",
  description: "Manage tours, itineraries, and bookings",
  keywords: "admin, tour management, China tours, travel admin"
};

export default function TourManagementPage() {
  return (
    <div className="min-h-screen">
      <Suspense fallback={<div>Loading tour management...</div>}>
        <TourManagement />
      </Suspense>
    </div>
  );
}