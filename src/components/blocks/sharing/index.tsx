"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Share2, 
  Copy, 
  Facebook, 
  Twitter, 
  Instagram, 
  Mail, 
  MessageSquare,
  QrCode,
  Check
} from "lucide-react";
import { toast } from "sonner";

interface SharingProps {
  title: string;
  description: string;
  url?: string;
  image?: string;
  type?: 'tour' | 'destination' | 'guide' | 'experience';
}

export default function SharingComponent({ 
  title, 
  description, 
  url = window?.location?.href || '',
  image,
  type = 'tour'
}: SharingProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareData = {
    title: `${title} | China Tours`,
    text: description,
    url: url,
  };

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);

  const socialLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}&hashtags=ChinaTravel,TravelGuide`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`,
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share(shareData);
        toast.success("Shared successfully!");
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          console.error('Error sharing:', err);
          toast.error("Sharing failed");
        }
      }
    } else {
      setIsOpen(true);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
      toast.error("Failed to copy link");
    }
  };

  const openSocialLink = (platform: keyof typeof socialLinks) => {
    window.open(socialLinks[platform], '_blank', 'width=600,height=400');
  };

  const generateShareText = () => {
    switch (type) {
      case 'destination':
        return `🏮 Discover amazing ${title}! ${description} Plan your China adventure today! #ChinaTravel #${title.replace(/\s+/g, '')}`;
      case 'guide':
        return `📚 Get the ultimate ${title}! ${description} Perfect for planning your China trip! #TravelGuide #ChinaTravel`;
      case 'experience':
        return `✨ Amazing experience: ${title}! ${description} #ChinaTravel #TravelExperience`;
      default:
        return `🇨🇳 Check out this amazing China tour: ${title}! ${description} #ChinaTravel #TourBooking`;
    }
  };

  return (
    <>
      <Button variant="outline" onClick={handleNativeShare} className="flex items-center">
        <Share2 className="h-4 w-4 mr-2" />
        Share
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Share2 className="h-5 w-5 mr-2" />
              Share This {type.charAt(0).toUpperCase() + type.slice(1)}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Preview Card */}
            <Card className="border-2">
              <CardContent className="p-4">
                {image && (
                  <img 
                    src={image} 
                    alt={title}
                    className="w-full h-32 object-cover rounded-lg mb-3"
                  />
                )}
                <h3 className="font-semibold text-lg mb-2">{title}</h3>
                <p className="text-sm text-gray-600 mb-3">{description}</p>
                <div className="text-xs text-blue-600">china-tours.com</div>
              </CardContent>
            </Card>

            {/* Copy Link */}
            <div>
              <label className="text-sm font-medium mb-2 block">Share Link</label>
              <div className="flex space-x-2">
                <Input 
                  value={url} 
                  readOnly 
                  className="flex-1"
                />
                <Button 
                  variant="outline" 
                  onClick={copyToClipboard}
                  className="px-3"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            {/* Social Media Options */}
            <div>
              <label className="text-sm font-medium mb-3 block">Share on Social Media</label>
              <div className="grid grid-cols-3 gap-3">
                <Button 
                  variant="outline" 
                  onClick={() => openSocialLink('facebook')}
                  className="flex flex-col items-center p-4 h-auto"
                >
                  <Facebook className="h-6 w-6 mb-2 text-blue-600" />
                  <span className="text-xs">Facebook</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={() => openSocialLink('twitter')}
                  className="flex flex-col items-center p-4 h-auto"
                >
                  <Twitter className="h-6 w-6 mb-2 text-blue-400" />
                  <span className="text-xs">Twitter</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={() => openSocialLink('whatsapp')}
                  className="flex flex-col items-center p-4 h-auto"
                >
                  <MessageSquare className="h-6 w-6 mb-2 text-green-500" />
                  <span className="text-xs">WhatsApp</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={() => openSocialLink('telegram')}
                  className="flex flex-col items-center p-4 h-auto"
                >
                  <MessageSquare className="h-6 w-6 mb-2 text-blue-500" />
                  <span className="text-xs">Telegram</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={() => openSocialLink('email')}
                  className="flex flex-col items-center p-4 h-auto"
                >
                  <Mail className="h-6 w-6 mb-2 text-gray-600" />
                  <span className="text-xs">Email</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={() => openSocialLink('linkedin')}
                  className="flex flex-col items-center p-4 h-auto"
                >
                  <div className="w-6 h-6 mb-2 bg-blue-700 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">in</span>
                  </div>
                  <span className="text-xs">LinkedIn</span>
                </Button>
              </div>
            </div>

            {/* Pre-written Share Text */}
            <div>
              <label className="text-sm font-medium mb-2 block">Suggested Share Text</label>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm">{generateShareText()}</p>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => {
                    navigator.clipboard.writeText(generateShareText());
                    toast.success("Share text copied!");
                  }}
                  className="mt-2 h-auto p-1 text-xs"
                >
                  <Copy className="h-3 w-3 mr-1" />
                  Copy Text
                </Button>
              </div>
            </div>

            {/* QR Code Option */}
            <div className="text-center">
              <Button variant="outline" className="w-full">
                <QrCode className="h-4 w-4 mr-2" />
                Generate QR Code
              </Button>
              <p className="text-xs text-gray-500 mt-2">
                Perfect for sharing in person or printing
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}