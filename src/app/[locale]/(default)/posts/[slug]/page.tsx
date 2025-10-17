import { PostStatus, findPostBySlug } from "@/models/post";

import BlogDetail from "@/components/blocks/blog-detail";
import Empty from "@/components/blocks/empty";
import { Post } from "@/types/post";

// Define the BlogPost interface that matches the BlogDetail component
interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  author: {
    name: string;
    avatar: string;
    bio: string;
    social?: {
      twitter?: string;
      instagram?: string;
      website?: string;
    };
  };
  category: string;
  tags: string[];
  publishedAt: string;
  readTime: number;
  views: number;
  likes: number;
  comments: number;
  featured: boolean;
  relatedPosts?: string[];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  const post = await findPostBySlug(slug, locale);

  let canonicalUrl = `${process.env.NEXT_PUBLIC_WEB_URL}/posts/${slug}`;

  if (locale !== "en") {
    canonicalUrl = `${process.env.NEXT_PUBLIC_WEB_URL}/${locale}/posts/${slug}`;
  }

  return {
    title: post?.title,
    description: post?.description,
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default async function ({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const post = await findPostBySlug(slug, locale);

  if (!post || post.status !== PostStatus.Online) {
    return <Empty message="Post not found" />;
  }

  // Map the Post data to BlogPost interface
  const blogPost: BlogPost = {
    id: post.uuid || '',
    title: post.title || '',
    slug: post.slug || '',
    excerpt: post.description || '',
    content: post.content || '',
    featuredImage: post.cover_url || '',
    author: {
      name: post.author_name || '',
      avatar: post.author_avatar_url || '',
      bio: '',
    },
    category: '',
    tags: [],
    publishedAt: post.created_at?.toString() || '',
    readTime: 5, // Default value
    views: 0, // Default value
    likes: 0, // Default value
    comments: 0, // Default value
    featured: false, // Default value
  };

  return <BlogDetail post={blogPost} />;
}
