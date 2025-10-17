import { Suspense } from "react";
import { Metadata } from "next";
import UserDashboard from "@/components/blocks/user-dashboard";

export const metadata: Metadata = {
  title: "Dashboard | China Tours",
  description: "Manage your tours, bookings, and digital downloads",
  keywords: "user dashboard, tour bookings, digital downloads, travel management"
};

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Suspense fallback={<div>Loading dashboard...</div>}>
        <UserDashboard />
      </Suspense>
    </div>
  );
}