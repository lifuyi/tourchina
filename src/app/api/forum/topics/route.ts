import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/db";
import { forum_topics, forum_categories, users } from "@/db/schema";
import { getUuid } from "@/lib/hash";
import { getIsoTimestr } from "@/lib/time";
import { eq, desc } from "drizzle-orm";

// Create new topic
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.uuid) {
      return NextResponse.json(
        { code: 401, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { title, category_uuid, content, tags } = body;

    if (!title || !category_uuid || !content) {
      return NextResponse.json(
        { code: 400, message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Generate slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-')
      .substring(0, 60);

    const topicUuid = getUuid();
    const now = getIsoTimestr();

    // Insert new topic
    const [newTopic] = await db.insert(forum_topics).values({
      uuid: topicUuid,
      title,
      slug,
      content,
      category_uuid,
      author_uuid: session.user.uuid,
      tags: tags ? JSON.stringify(tags) : null,
      created_at: now,
      updated_at: now,
    }).returning();

    // Update category counts (in real app, use triggers or background jobs)
    await db.update(forum_categories)
      .set({
        topic_count: forum_categories.topic_count + 1,
        post_count: forum_categories.post_count + 1,
        last_post_at: now,
        last_post_by: session.user.uuid,
      })
      .where(eq(forum_categories.uuid, category_uuid));

    return NextResponse.json({
      code: 0,
      message: "Topic created successfully",
      data: { ...newTopic, slug }
    });

  } catch (error) {
    console.error("Create topic error:", error);
    return NextResponse.json(
      { code: 500, message: "Internal server error" },
      { status: 500 }
    );
  }
}

// Get topics list
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categorySlug = searchParams.get("category");
    const limit = parseInt(searchParams.get("limit") || "10");
    const offset = parseInt(searchParams.get("offset") || "0");

    // Build query (simplified - in real app use proper joins)
    const topics = await db.select()
      .from(forum_topics)
      .where(eq(forum_topics.status, "active"))
      .orderBy(desc(forum_topics.created_at))
      .limit(limit)
      .offset(offset);

    return NextResponse.json({
      code: 0,
      message: "Success",
      data: topics
    });

  } catch (error) {
    console.error("Get topics error:", error);
    return NextResponse.json(
      { code: 500, message: "Internal server error" },
      { status: 500 }
    );
  }
}