"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Upload,
  Image,
  FileText,
  MapPin,
  Calendar,
  Settings,
  Save,
  X,
  Search,
  Filter,
  Globe,
  Languages,
  Palette,
  Layout,
  Type,
  Video,
  Camera
} from "lucide-react";
import { toast } from "sonner";

interface ContentItem {
  id: string;
  type: 'page' | 'blog' | 'destination' | 'tour' | 'media';
  title: string;
  slug: string;
  status: 'published' | 'draft' | 'archived';
  language: 'en' | 'zh';
  author: string;
  lastModified: string;
  content?: string;
  metadata?: {
    description?: string;
    keywords?: string;
    featuredImage?: string;
  };
}

const mockContent: ContentItem[] = [
  {
    id: "1",
    type: "page",
    title: "Homepage Hero Section",
    slug: "homepage-hero",
    status: "published",
    language: "en",
    author: "Admin",
    lastModified: "2024-01-25",
    content: "Discover the magic of China with our expertly crafted tours and authentic experiences.",
    metadata: {
      description: "Homepage hero section content",
      featuredImage: "/imgs/hero-bg.jpg"
    }
  },
  {
    id: "2",
    type: "blog",
    title: "Ultimate Guide to Beijing's Hidden Gems",
    slug: "beijing-hidden-gems-guide",
    status: "published",
    language: "en",
    author: "Li Wei",
    lastModified: "2024-01-20",
    content: "Discover the secret spots in Beijing that most tourists never see...",
    metadata: {
      description: "Hidden gems and secret spots in Beijing",
      keywords: "Beijing, hidden gems, local tips, culture",
      featuredImage: "/imgs/blog/beijing-hidden.jpg"
    }
  },
  {
    id: "3",
    type: "destination",
    title: "Beijing - China's Imperial Capital",
    slug: "beijing",
    status: "published",
    language: "en",
    author: "Content Team",
    lastModified: "2024-01-18",
    content: "China's capital city, home to the Forbidden City, Great Wall, and countless cultural treasures.",
    metadata: {
      description: "Complete guide to Beijing with attractions and travel tips",
      keywords: "Beijing, Forbidden City, Great Wall, China travel",
      featuredImage: "/imgs/destinations/beijing.jpg"
    }
  }
];

const contentTypes = [
  { value: 'page', label: 'Pages', icon: Layout },
  { value: 'blog', label: 'Blog Posts', icon: FileText },
  { value: 'destination', label: 'Destinations', icon: MapPin },
  { value: 'tour', label: 'Tours', icon: Calendar },
  { value: 'media', label: 'Media Library', icon: Image }
];

export default function ContentManagement() {
  const [activeTab, setActiveTab] = useState("content");
  const [selectedType, setSelectedType] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null);
  const [newContent, setNewContent] = useState<Partial<ContentItem>>({
    type: 'page',
    title: '',
    slug: '',
    status: 'draft',
    language: 'en',
    content: '',
    metadata: {}
  });

  // Filter content based on type and search
  const filteredContent = mockContent.filter(item => {
    const matchesType = selectedType === 'all' || item.type === selectedType;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.slug.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  const handleCreateContent = () => {
    toast.success("Content created successfully!");
    setIsCreateModalOpen(false);
    setNewContent({
      type: 'page',
      title: '',
      slug: '',
      status: 'draft',
      language: 'en',
      content: '',
      metadata: {}
    });
  };

  const handleEditContent = (content: ContentItem) => {
    setSelectedContent(content);
    setIsEditModalOpen(true);
  };

  const handleDeleteContent = (contentId: string) => {
    if (confirm("Are you sure you want to delete this content?")) {
      toast.success("Content deleted successfully!");
    }
  };

  const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800";
      case "draft":
        return "bg-yellow-100 text-yellow-800";
      case "archived":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeIcon = (type: string) => {
    const typeConfig = contentTypes.find(t => t.value === type);
    const IconComponent = typeConfig?.icon || FileText;
    return <IconComponent className="h-4 w-4" />;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Content Management</h1>
          <p className="text-gray-600 mt-2">Manage website content, blog posts, and media</p>
        </div>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Create Content
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
        {contentTypes.map((type) => {
          const IconComponent = type.icon;
          const count = mockContent.filter(item => item.type === type.value).length;
          return (
            <Card key={type.value}>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <IconComponent className="h-8 w-8 text-blue-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">{type.label}</p>
                    <p className="text-2xl font-bold">{count}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="media">Media Library</TabsTrigger>
          <TabsTrigger value="settings">Site Settings</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>All Content</CardTitle>
                <div className="flex space-x-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search content..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      {contentTypes.map(type => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Language</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Last Modified</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredContent.map((content) => (
                    <TableRow key={content.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{content.title}</p>
                          <p className="text-sm text-gray-500">/{content.slug}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          {getTypeIcon(content.type)}
                          <span className="ml-2 capitalize">{content.type}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(content.status)}>
                          {content.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Languages className="h-4 w-4 mr-1" />
                          {content.language.toUpperCase()}
                        </div>
                      </TableCell>
                      <TableCell>{content.author}</TableCell>
                      <TableCell>{content.lastModified}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleEditContent(content)}
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDeleteContent(content.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="media" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Media Library</CardTitle>
                <Button>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Media
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Drag & drop files here</p>
                  <Button variant="outline" className="mt-4">
                    Browse Files
                  </Button>
                </div>
                
                {/* Sample media items */}
                {[1, 2, 3, 4, 5].map((item) => (
                  <div key={item} className="border rounded-lg overflow-hidden">
                    <img 
                      src={`/imgs/features/${item}.png`} 
                      alt={`Media ${item}`}
                      className="w-full h-32 object-cover"
                    />
                    <div className="p-3">
                      <p className="font-medium text-sm">image-{item}.jpg</p>
                      <p className="text-xs text-gray-500">2.3 MB • 1920x1080</p>
                      <div className="flex space-x-2 mt-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="mr-2 h-5 w-5" />
                  Site Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="siteTitle">Site Title</Label>
                  <Input id="siteTitle" defaultValue="China Tours" />
                </div>
                <div>
                  <Label htmlFor="siteDescription">Site Description</Label>
                  <Textarea id="siteDescription" defaultValue="Discover authentic China with our expert-guided tours and travel experiences." />
                </div>
                <div>
                  <Label htmlFor="contactEmail">Contact Email</Label>
                  <Input id="contactEmail" type="email" defaultValue="hello@chinatours.com" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="maintenanceMode">Maintenance Mode</Label>
                  <Switch id="maintenanceMode" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Palette className="mr-2 h-5 w-5" />
                  Theme & Appearance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="primaryColor">Primary Color</Label>
                  <div className="flex items-center space-x-2">
                    <Input id="primaryColor" type="color" defaultValue="#3b82f6" className="w-16 h-10" />
                    <Input defaultValue="#3b82f6" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="logoUpload">Logo Upload</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Upload new logo</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="darkMode">Enable Dark Mode</Label>
                  <Switch id="darkMode" defaultChecked />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="templates" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['Landing Page', 'Tour Detail', 'Blog Post', 'Destination', 'Checkout', 'Dashboard'].map((template) => (
              <Card key={template} className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="bg-gray-100 rounded-lg h-32 mb-4 flex items-center justify-center">
                    <Layout className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="font-semibold mb-2">{template}</h3>
                  <p className="text-sm text-gray-600 mb-4">Customizable template for {template.toLowerCase()}</p>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-3 w-3 mr-1" />
                      Preview
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="h-3 w-3 mr-1" />
                      Customize
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Create Content Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Content</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="contentType">Content Type</Label>
                <Select 
                  value={newContent.type} 
                  onValueChange={(value: any) => setNewContent(prev => ({ ...prev, type: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {contentTypes.map(type => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="language">Language</Label>
                <Select 
                  value={newContent.language} 
                  onValueChange={(value: any) => setNewContent(prev => ({ ...prev, language: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="zh">中文</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="title">Title</Label>
              <Input 
                id="title" 
                value={newContent.title}
                onChange={(e) => {
                  const title = e.target.value;
                  setNewContent(prev => ({ 
                    ...prev, 
                    title, 
                    slug: generateSlug(title) 
                  }));
                }}
                placeholder="Enter content title" 
              />
            </div>
            <div>
              <Label htmlFor="slug">URL Slug</Label>
              <Input 
                id="slug" 
                value={newContent.slug}
                onChange={(e) => setNewContent(prev => ({ ...prev, slug: e.target.value }))}
                placeholder="url-slug" 
              />
            </div>
            <div>
              <Label htmlFor="content">Content</Label>
              <Textarea 
                id="content" 
                value={newContent.content}
                onChange={(e) => setNewContent(prev => ({ ...prev, content: e.target.value }))}
                placeholder="Enter content here..." 
                className="min-h-[150px]"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateContent}>
                <Save className="mr-2 h-4 w-4" />
                Create Content
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}