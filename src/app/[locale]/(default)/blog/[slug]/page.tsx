import { notFound } from "next/navigation";
import { Metadata } from "next";
import BlogDetail from "@/components/blocks/blog-detail";

// Mock blog data (in real app, this would come from DB)
const blogPosts = [
  {
    id: "1",
    title: "Ultimate Guide to Beijing's Hidden Gems",
    slug: "beijing-hidden-gems-guide",
    excerpt: "Discover the secret spots in Beijing that most tourists never see. From hidden temples to local eateries, explore the authentic side of China's capital.",
    content: `
# Ultimate Guide to Beijing's Hidden Gems

Beijing is a city of contrasts where ancient traditions meet modern innovation. While millions of tourists flock to the Great Wall and Forbidden City each year, there's a whole other side of Beijing waiting to be discovered by adventurous travelers.

## Hidden Temples and Spiritual Sites

### 1. Baiyun Temple (White Cloud Temple)
Located in the heart of Beijing, this Taoist temple is one of the most important in China. Unlike the crowded tourist temples, Baiyun offers a peaceful retreat where you can observe local worshippers and traditional ceremonies.

### 2. Zhihua Temple
This Ming Dynasty temple houses some of the most exquisite wooden architecture in Beijing. The acoustic properties of the main hall are legendary among classical music enthusiasts.

## Secret Food Spots

### Ghost Street (Gui Jie)
While not exactly hidden, this night market transforms after dark into a culinary wonderland. Local favorites include:
- Spicy crawfish at Hu Da Restaurant
- Traditional Beijing noodles at small family establishments
- Late-night BBQ skewers from street vendors

### Panjiayuan Antique Market Food Stalls
Hidden among the antique vendors are some of Beijing's best traditional breakfast spots serving:
- Authentic jianbing (Chinese crepes)
- Fresh soymilk and youtiao (fried dough sticks)
- Regional specialties from across China

## Underground Culture

### 798 Art District Alternative Venues
Beyond the main galleries, explore:
- Small independent artist studios
- Underground music venues
- Experimental performance spaces
- Hidden cafes with local artists

## Transportation Tips

Getting around to these hidden gems requires some local knowledge:
- Use the Beijing Subway's lesser-known exits to avoid crowds
- Download Chinese map apps like Baidu Maps for accurate directions
- Learn basic Mandarin phrases for asking directions
- Consider hiring a local guide for deeper cultural insights

## Best Times to Visit

Early mornings (6-8 AM) and late evenings (after 7 PM) offer the most authentic experiences with fewer tourists and more local activity.

## Final Thoughts

Beijing's hidden gems reward those willing to venture beyond the typical tourist trail. These experiences offer genuine connections with local culture and create memories that last a lifetime.

Remember to be respectful of local customs, especially in religious sites, and always ask permission before photographing people or private spaces.
    `,
    featuredImage: "/imgs/blog/beijing-hidden.jpg",
    author: {
      name: "Li Wei",
      avatar: "/imgs/authors/li-wei.jpg",
      bio: "Local Beijing guide with 10+ years experience showing travelers the authentic side of China's capital.",
      social: {
        twitter: "@liwei_beijing",
        instagram: "@beijinginsider"
      }
    },
    category: "Destinations",
    tags: ["Beijing", "Hidden Gems", "Local Tips", "Culture"],
    publishedAt: "2024-01-20",
    readTime: 8,
    views: 2840,
    likes: 156,
    comments: 23,
    featured: true,
    relatedPosts: ["shanghai-street-food-guide", "great-wall-photography-tips"]
  },
  {
    id: "2",
    title: "Food Lover's Guide to Shanghai Street Food",
    slug: "shanghai-street-food-guide",
    excerpt: "Explore Shanghai's incredible street food scene. From xiaolongbao to jianbing, discover the best local flavors and where to find them.",
    content: `
# Food Lover's Guide to Shanghai Street Food

Shanghai's street food scene is a vibrant tapestry of flavors that reflects the city's rich culinary heritage and modern innovation. This guide will take you through the must-try dishes and the best places to find them.

## Essential Shanghai Street Foods

### Xiaolongbao (Soup Dumplings)
The crown jewel of Shanghai cuisine, these delicate dumplings filled with pork and rich broth are an art form.

**Best spots:**
- Din Tai Fung (modern interpretation)
- Jia Jia Tang Bao (traditional family recipe)
- Street vendors in Yu Garden area

### Shengjianbao (Pan-Fried Pork Buns)
Crispy bottom, soft top, and juicy filling make these a Shanghai breakfast staple.

### Jianbing (Chinese Crepe)
Watch skilled vendors create these crispy, savory crepes right before your eyes.

## Street Food Districts

### Yu Garden Area
Traditional atmosphere with tourist-friendly options

### Nanjing Road
Mix of street food and established restaurants

### Former French Concession
Upscale street food and fusion options

## Food Safety Tips

- Look for busy stalls with high turnover
- Observe locals - they know the best spots
- Carry hand sanitizer
- Start with smaller portions to test your tolerance

## Cultural Etiquette

- Don't be afraid to point at what you want
- Have small bills ready
- Eating while walking is acceptable for street food
- Learn basic Mandarin food terms

Street food in Shanghai is more than just sustenance - it's a window into the soul of this incredible city.
    `,
    featuredImage: "/imgs/blog/shanghai-food.jpg",
    author: {
      name: "Chen Ming",
      avatar: "/imgs/authors/chen-ming.jpg",
      bio: "Food blogger and Shanghai native passionate about preserving traditional culinary culture.",
      social: {
        instagram: "@shanghaifoodies",
        website: "shanghaistreetfood.com"
      }
    },
    category: "Food & Culture",
    tags: ["Shanghai", "Street Food", "Local Cuisine", "Food Tour"],
    publishedAt: "2024-01-18",
    readTime: 6,
    views: 1920,
    likes: 89,
    comments: 15,
    featured: true,
    relatedPosts: ["beijing-hidden-gems-guide", "best-time-visit-china-regions"]
  }
];

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find(p => p.slug === slug);
  
  if (!post) {
    return {
      title: "Blog Post Not Found"
    };
  }

  return {
    title: `${post.title} | China Travel Blog`,
    description: post.excerpt,
    keywords: post.tags.join(", "),
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.featuredImage],
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author.name]
    }
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <BlogDetail post={post} />
    </div>
  );
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}