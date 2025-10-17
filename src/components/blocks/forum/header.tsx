"use client";

import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function ForumHeader() {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            China Travel Forum
          </h1>
          <p className="text-xl md:text-2xl mb-6 max-w-3xl mx-auto opacity-90">
            Connect with fellow travelers, share experiences, and get expert advice for your China journey
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 items-center justify-center max-w-2xl mx-auto">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search discussions, topics, or users..."
              className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/70 focus:bg-white/20"
            />
          </div>
          <Link href="/forum/new-topic">
            <Button className="bg-white text-blue-600 hover:bg-gray-100 font-semibold">
              <Plus className="h-4 w-4 mr-2" />
              New Topic
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}