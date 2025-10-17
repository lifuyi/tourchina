import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/db";
import { forum_replies, forum_topics } from "@/db/schema";
import { getUuid } from "@/lib/hash";
import { getIsoTimestr } from "@/lib/time";
import { eq, desc } from "drizzle-orm";

// Create new reply
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
    const { content, topic_uuid, parent_reply_uuid } = body;

    if (!content || !topic_uuid) {
      return NextResponse.json(
        { code: 400, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const replyUuid = getUuid();
    const now = getIsoTimestr();

    // Insert new reply
    const [newReply] = await db.insert(forum_replies).values({
      uuid: replyUuid,
      content,
      topic_uuid,
      author_uuid: session.user.uuid,
      parent_reply_uuid: parent_reply_uuid || null,
      created_at: now,
      updated_at: now,
    }).returning();

    // Update topic reply count and last reply info
    await db.update(forum_topics)
      .set({
        reply_count: forum_topics.reply_count + 1,
        last_reply_at: now,
        last_reply_by: session.user.uuid,
        updated_at: now,
      })
      .where(eq(forum_topics.uuid, topic_uuid));

    return NextResponse.json({
      code: 0,
      message: "Reply created successfully",
      data: newReply
    });

  } catch (error) {
    console.error("Create reply error:", error);
    return NextResponse.json(
      { code: 500, message: "Internal server error" },
      { status: 500 }
    );
  }
}

// Get replies for a topic
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const topicUuid = searchParams.get("topic_uuid");
    const limit = parseInt(searchParams.get("limit") || "20");
    const offset = parseInt(searchParams.get("offset") || "0");

    if (!topicUuid) {
      return NextResponse.json(
        { code: 400, message: "topic_uuid is required" },
        { status: 400 }
      );
    }

    const replies = await db.select()
      .from(forum_replies)
      .where(eq(forum_replies.topic_uuid, topicUuid))
      .orderBy(desc(forum_replies.created_at))
      .limit(limit)
      .offset(offset);

    return NextResponse.json({
      code: 0,
      message: "Success",
      data: replies
    });

  } catch (error) {
    console.error("Get replies error:", error);
    return NextResponse.json(
      { code: 500, message: "Internal server error" },
      { status: 500 }
    );
  }
}