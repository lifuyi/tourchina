"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bold, Italic, Link, Image, Smile, Send } from "lucide-react";
import { useAppContext } from "@/contexts/app";
import SignIn from "@/components/sign/sign_in";

interface ReplyFormProps {
  topicSlug: string;
  parentReplyUuid?: string;
}

export default function ReplyForm({ topicSlug, parentReplyUuid }: ReplyFormProps) {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAppContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsSubmitting(true);
    
    try {
      const response = await fetch("/api/forum/replies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: content.trim(),
          topic_uuid: topicSlug, // Note: You'll need to pass the actual topic UUID
          parent_reply_uuid: parentReplyUuid,
        }),
      });

      const result = await response.json();
      
      if (result.code === 0) {
        setContent("");
        // Refresh the page to show new reply
        window.location.reload();
      } else {
        console.error("Failed to submit reply:", result.message);
        alert("Failed to submit reply. Please try again.");
      }
    } catch (error) {
      console.error("Failed to submit reply:", error);
      alert("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <Card className="p-6 text-center">
        <p className="text-gray-600 mb-4">Please sign in to join the discussion</p>
        <SignIn />
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex items-start gap-4">
        <Avatar className="h-10 w-10">
          <AvatarImage src={user.avatar_url} />
          <AvatarFallback>{user.nickname?.[0] || user.email?.[0]}</AvatarFallback>
        </Avatar>
        
        <div className="flex-1">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="font-medium text-gray-900">Reply as {user.nickname || user.email}</span>
              </div>
              
              {/* Formatting Toolbar */}
              <div className="flex items-center gap-1 mb-2 p-2 bg-gray-50 rounded-t-lg border border-b-0">
                <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Bold className="h-4 w-4" />
                </Button>
                <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Italic className="h-4 w-4" />
                </Button>
                <div className="w-px h-4 bg-gray-300 mx-1" />
                <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Link className="h-4 w-4" />
                </Button>
                <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Image className="h-4 w-4" />
                </Button>
                <div className="w-px h-4 bg-gray-300 mx-1" />
                <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Smile className="h-4 w-4" />
                </Button>
              </div>
              
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Share your thoughts, experiences, or advice..."
                className="min-h-[120px] rounded-t-none border-t-0 focus:ring-0 focus:border-blue-500"
                disabled={isSubmitting}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">
                <p>Be respectful and helpful to fellow travelers</p>
              </div>
              
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setContent("")}
                  disabled={isSubmitting || !content.trim()}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting || !content.trim()}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {isSubmitting ? (
                    "Posting..."
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Post Reply
                    </>
                  )}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Card>
  );
}