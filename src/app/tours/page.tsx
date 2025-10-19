import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tours",
  description: "Browse our available tours",
};

export default function ToursPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Tours</h1>
      <p>Tours listing page content goes here.</p>
    </div>
  );
}