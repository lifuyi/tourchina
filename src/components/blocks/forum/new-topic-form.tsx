"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Bold, Italic, Link, Image, X, Tag } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/contexts/app";
import SignIn from "@/components/sign/sign_in";

export default function NewTopicForm() {
  const router = useRouter();
  const { user } = useAppContext();
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    content: "",
    tags: [] as string[]
  });
  const [tagInput, setTagInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Check if user is authenticated
  if (!user) {
    return (
      <Card className="p-8 text-center">
        <h2 className="text-xl font-semibold mb-4">Sign in to create topics</h2>
        <p className="text-gray-600 mb-6">
          You need to be signed in to start new discussions in the forum.
        </p>
        <SignIn />
      </Card>
    );
  }

  // Mock categories - in real app, fetch from API
  const categories = [
    { uuid: "1", name: "General Travel Discussion", slug: "general-travel" },
    { uuid: "2", name: "Destination Guides", slug: "destination-guides" },
    { uuid: "3", name: "Travel Tips & Hacks", slug: "travel-tips" },
    { uuid: "4", name: "Food & Culture", slug: "food-culture" },
    { uuid: "5", name: "Transportation", slug: "transportation" },
    { uuid: "6", name: "Trip Reports", slug: "trip-reports" }
  ];

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim().toLowerCase())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim().toLowerCase()]
      }));
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.category || !formData.content.trim()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await fetch("/api/forum/topics", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title.trim(),
          category_uuid: formData.category,
          content: formData.content.trim(),
          tags: formData.tags,
        }),
      });

      const result = await response.json();
      
      if (result.code === 0) {
        // Success - redirect to new topic
        router.push(`/forum/topic/${result.data.slug}`);
      } else {
        console.error("Failed to create topic:", result.message);
        alert("Failed to create topic. Please try again.");
      }
    } catch (error) {
      console.error("Failed to create topic:", error);
      alert("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Topic Title */}
      <div className="space-y-2">
        <Label htmlFor="title" className="text-sm font-medium">
          Topic Title *
        </Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
          placeholder="What would you like to discuss?"
          className="text-lg"
          maxLength={200}
          disabled={isSubmitting}
        />
        <p className="text-xs text-gray-500">
          {formData.title.length}/200 characters
        </p>
      </div>

      {/* Category Selection */}
      <div className="space-y-2">
        <Label htmlFor="category" className="text-sm font-medium">
          Category *
        </Label>
        <Select 
          value={formData.category} 
          onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
          disabled={isSubmitting}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.uuid} value={category.slug}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Tags */}
      <div className="space-y-2">
        <Label htmlFor="tags" className="text-sm font-medium">
          Tags (optional)
        </Label>
        <div className="space-y-2">
          <div className="flex gap-2">
            <Input
              id="tags"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Add tags to help others find your topic"
              className="flex-1"
              disabled={isSubmitting}
            />
            <Button
              type="button"
              variant="outline"
              onClick={handleAddTag}
              disabled={!tagInput.trim() || isSubmitting}
            >
              <Tag className="h-4 w-4 mr-1" />
              Add
            </Button>
          </div>
          
          {formData.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  #{tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-1 hover:text-red-500"
                    disabled={isSubmitting}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </div>
        <p className="text-xs text-gray-500">
          Examples: beijing, first-time, budget-travel, food
        </p>
      </div>

      {/* Content */}
      <div className="space-y-2">
        <Label htmlFor="content" className="text-sm font-medium">
          Content *
        </Label>
        
        {/* Formatting Toolbar */}
        <div className="flex items-center gap-1 p-2 bg-gray-50 rounded-t-lg border border-b-0">
          <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0" disabled={isSubmitting}>
            <Bold className="h-4 w-4" />
          </Button>
          <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0" disabled={isSubmitting}>
            <Italic className="h-4 w-4" />
          </Button>
          <div className="w-px h-4 bg-gray-300 mx-1" />
          <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0" disabled={isSubmitting}>
            <Link className="h-4 w-4" />
          </Button>
          <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0" disabled={isSubmitting}>
            <Image className="h-4 w-4" />
          </Button>
        </div>
        
        <Textarea
          id="content"
          value={formData.content}
          onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
          placeholder="Share your question, experience, or start a discussion..."
          className="min-h-[200px] rounded-t-none border-t-0"
          disabled={isSubmitting}
        />
        <p className="text-xs text-gray-500">
          Be detailed and specific to get the best responses from the community
        </p>
      </div>

      {/* Guidelines */}
      <Card className="p-4 bg-blue-50 border-blue-200">
        <h4 className="font-medium text-blue-900 mb-2">Community Guidelines</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Be respectful and helpful to fellow travelers</li>
          <li>• Stay on topic and provide valuable information</li>
          <li>• Search existing topics before creating new ones</li>
          <li>• Use clear, descriptive titles</li>
        </ul>
      </Card>

      {/* Submit Buttons */}
      <div className="flex gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting || !formData.title.trim() || !formData.category || !formData.content.trim()}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {isSubmitting ? "Creating Topic..." : "Create Topic"}
        </Button>
      </div>
    </form>
  );
}