-- Forum Categories
CREATE TABLE IF NOT EXISTS "forum_categories" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "forum_categories_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"uuid" varchar(255) NOT NULL,
	"name" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL,
	"description" text,
	"icon" varchar(100),
	"color" varchar(20),
	"topic_count" integer DEFAULT 0,
	"post_count" integer DEFAULT 0,
	"last_post_at" timestamp with time zone,
	"last_post_by" varchar(255),
	"sort_order" integer DEFAULT 0,
	"status" varchar(50) DEFAULT 'active',
	"created_at" timestamp with time zone,
	"updated_at" timestamp with time zone,
	CONSTRAINT "forum_categories_uuid_unique" UNIQUE("uuid"),
	CONSTRAINT "forum_categories_slug_unique" UNIQUE("slug")
);

-- Forum Topics
CREATE TABLE IF NOT EXISTS "forum_topics" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "forum_topics_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"uuid" varchar(255) NOT NULL,
	"title" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL,
	"content" text NOT NULL,
	"category_uuid" varchar(255) NOT NULL,
	"author_uuid" varchar(255) NOT NULL,
	"reply_count" integer DEFAULT 0,
	"view_count" integer DEFAULT 0,
	"like_count" integer DEFAULT 0,
	"is_pinned" boolean DEFAULT false,
	"is_locked" boolean DEFAULT false,
	"is_solved" boolean DEFAULT false,
	"tags" text,
	"last_reply_at" timestamp with time zone,
	"last_reply_by" varchar(255),
	"status" varchar(50) DEFAULT 'active',
	"created_at" timestamp with time zone,
	"updated_at" timestamp with time zone,
	CONSTRAINT "forum_topics_uuid_unique" UNIQUE("uuid")
);

-- Forum Replies
CREATE TABLE IF NOT EXISTS "forum_replies" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "forum_replies_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"uuid" varchar(255) NOT NULL,
	"content" text NOT NULL,
	"topic_uuid" varchar(255) NOT NULL,
	"author_uuid" varchar(255) NOT NULL,
	"parent_reply_uuid" varchar(255),
	"like_count" integer DEFAULT 0,
	"is_solution" boolean DEFAULT false,
	"is_edited" boolean DEFAULT false,
	"edited_at" timestamp with time zone,
	"status" varchar(50) DEFAULT 'active',
	"created_at" timestamp with time zone,
	"updated_at" timestamp with time zone,
	CONSTRAINT "forum_replies_uuid_unique" UNIQUE("uuid")
);

-- Forum Likes
CREATE TABLE IF NOT EXISTS "forum_likes" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "forum_likes_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"user_uuid" varchar(255) NOT NULL,
	"target_uuid" varchar(255) NOT NULL,
	"target_type" varchar(50) NOT NULL,
	"created_at" timestamp with time zone,
	CONSTRAINT "user_target_unique" UNIQUE("user_uuid","target_uuid","target_type")
);

-- Forum User Stats
CREATE TABLE IF NOT EXISTS "forum_user_stats" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "forum_user_stats_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"user_uuid" varchar(255) NOT NULL,
	"topic_count" integer DEFAULT 0,
	"reply_count" integer DEFAULT 0,
	"like_count" integer DEFAULT 0,
	"reputation_score" integer DEFAULT 0,
	"badges" text,
	"created_at" timestamp with time zone,
	"updated_at" timestamp with time zone,
	CONSTRAINT "forum_user_stats_user_uuid_unique" UNIQUE("user_uuid")
);

-- Insert default forum categories
INSERT INTO "forum_categories" ("uuid", "name", "slug", "description", "icon", "color", "sort_order", "created_at", "updated_at")
VALUES 
	('cat-1', 'General Travel Discussion', 'general-travel', 'General questions and discussions about traveling in China', '🗣️', 'bg-blue-100 text-blue-800', 1, NOW(), NOW()),
	('cat-2', 'Destination Guides', 'destination-guides', 'Share and discover detailed guides for Chinese cities and attractions', '🏛️', 'bg-green-100 text-green-800', 2, NOW(), NOW()),
	('cat-3', 'Travel Tips & Hacks', 'travel-tips', 'Money-saving tips, travel hacks, and insider knowledge', '💡', 'bg-yellow-100 text-yellow-800', 3, NOW(), NOW()),
	('cat-4', 'Food & Culture', 'food-culture', 'Discuss Chinese cuisine, cultural experiences, and local customs', '🥢', 'bg-red-100 text-red-800', 4, NOW(), NOW()),
	('cat-5', 'Transportation', 'transportation', 'Flights, trains, buses, and getting around in China', '🚅', 'bg-purple-100 text-purple-800', 5, NOW(), NOW()),
	('cat-6', 'Trip Reports', 'trip-reports', 'Share your travel experiences and photos from China', '📸', 'bg-indigo-100 text-indigo-800', 6, NOW(), NOW());