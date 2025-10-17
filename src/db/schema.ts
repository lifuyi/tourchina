import {
  pgTable,
  serial,
  varchar,
  text,
  boolean,
  integer,
  timestamp,
  unique,
  uniqueIndex,
} from "drizzle-orm/pg-core";

// Users table
export const users = pgTable(
  "users",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    uuid: varchar({ length: 255 }).notNull().unique(),
    email: varchar({ length: 255 }).notNull(),
    created_at: timestamp({ withTimezone: true }),
    nickname: varchar({ length: 255 }),
    avatar_url: varchar({ length: 255 }),
    locale: varchar({ length: 50 }),
    signin_type: varchar({ length: 50 }),
    signin_ip: varchar({ length: 255 }),
    signin_provider: varchar({ length: 50 }),
    signin_openid: varchar({ length: 255 }),
    invite_code: varchar({ length: 255 }).notNull().default(""),
    updated_at: timestamp({ withTimezone: true }),
    invited_by: varchar({ length: 255 }).notNull().default(""),
    is_affiliate: boolean().notNull().default(false),
  },
  (table) => [
    uniqueIndex("email_provider_unique_idx").on(
      table.email,
      table.signin_provider
    ),
  ]
);

// Orders table
export const orders = pgTable("orders", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  order_no: varchar({ length: 255 }).notNull().unique(),
  created_at: timestamp({ withTimezone: true }),
  user_uuid: varchar({ length: 255 }).notNull().default(""),
  user_email: varchar({ length: 255 }).notNull().default(""),
  amount: integer().notNull(),
  interval: varchar({ length: 50 }),
  expired_at: timestamp({ withTimezone: true }),
  status: varchar({ length: 50 }).notNull(),
  stripe_session_id: varchar({ length: 255 }),
  credits: integer().notNull(),
  currency: varchar({ length: 50 }),
  sub_id: varchar({ length: 255 }),
  sub_interval_count: integer(),
  sub_cycle_anchor: integer(),
  sub_period_end: integer(),
  sub_period_start: integer(),
  sub_times: integer(),
  product_id: varchar({ length: 255 }),
  product_name: varchar({ length: 255 }),
  valid_months: integer(),
  order_detail: text(),
  paid_at: timestamp({ withTimezone: true }),
  paid_email: varchar({ length: 255 }),
  paid_detail: text(),
});

// API Keys table
export const apikeys = pgTable("apikeys", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  api_key: varchar({ length: 255 }).notNull().unique(),
  title: varchar({ length: 100 }),
  user_uuid: varchar({ length: 255 }).notNull(),
  created_at: timestamp({ withTimezone: true }),
  status: varchar({ length: 50 }),
});

// Credits table
export const credits = pgTable("credits", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  trans_no: varchar({ length: 255 }).notNull().unique(),
  created_at: timestamp({ withTimezone: true }),
  user_uuid: varchar({ length: 255 }).notNull(),
  trans_type: varchar({ length: 50 }).notNull(),
  credits: integer().notNull(),
  order_no: varchar({ length: 255 }),
  expired_at: timestamp({ withTimezone: true }),
});

// Posts table
export const posts = pgTable("posts", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  uuid: varchar({ length: 255 }).notNull().unique(),
  slug: varchar({ length: 255 }),
  title: varchar({ length: 255 }),
  description: text(),
  content: text(),
  created_at: timestamp({ withTimezone: true }),
  updated_at: timestamp({ withTimezone: true }),
  status: varchar({ length: 50 }),
  cover_url: varchar({ length: 255 }),
  author_name: varchar({ length: 255 }),
  author_avatar_url: varchar({ length: 255 }),
  locale: varchar({ length: 50 }),
});

// Affiliates table
export const affiliates = pgTable("affiliates", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  user_uuid: varchar({ length: 255 }).notNull(),
  created_at: timestamp({ withTimezone: true }),
  status: varchar({ length: 50 }).notNull().default(""),
  invited_by: varchar({ length: 255 }).notNull(),
  paid_order_no: varchar({ length: 255 }).notNull().default(""),
  paid_amount: integer().notNull().default(0),
  reward_percent: integer().notNull().default(0),
  reward_amount: integer().notNull().default(0),
});

// Feedbacks table
export const feedbacks = pgTable("feedbacks", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  created_at: timestamp({ withTimezone: true }),
  status: varchar({ length: 50 }),
  user_uuid: varchar({ length: 255 }),
  content: text(),
  rating: integer(),
});

// Tours/Products table - for both digital products and tour services
export const tours = pgTable("tours", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  uuid: varchar({ length: 255 }).notNull().unique(),
  title: varchar({ length: 255 }).notNull(),
  slug: varchar({ length: 255 }).notNull().unique(),
  description: text(),
  content: text(), // Full description/itinerary
  type: varchar({ length: 50 }).notNull(), // 'digital' or 'service'
  category: varchar({ length: 100 }), // 'city-guide', 'itinerary', 'custom-tour', etc.
  destinations: text(), // JSON array of destinations
  duration: integer(), // Duration in days
  price: integer(), // Price in cents (for digital products)
  price_from: integer(), // Starting price for services
  currency: varchar({ length: 10 }).default('USD'),
  featured: boolean().default(false),
  status: varchar({ length: 50 }).default('active'), // active, inactive, draft
  images: text(), // JSON array of image URLs
  features: text(), // JSON array of features/inclusions
  requirements: text(), // JSON array of requirements
  created_at: timestamp({ withTimezone: true }),
  updated_at: timestamp({ withTimezone: true }),
  locale: varchar({ length: 50 }).default('en'),
  rating: integer().default(0), // Average rating * 100 (e.g., 450 = 4.5 stars)
  review_count: integer().default(0),
  group_size_min: integer(),
  group_size_max: integer(),
  difficulty_level: varchar({ length: 50 }), // easy, moderate, challenging
  best_time: varchar({ length: 100 }), // Best time to visit
  file_url: varchar({ length: 500 }), // For digital products
  file_size: varchar({ length: 50 }), // File size for digital products
  file_format: varchar({ length: 20 }), // PDF, DOCX, etc.
});

// Tour bookings - for service requests and confirmed bookings
export const tour_bookings = pgTable("tour_bookings", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  booking_id: varchar({ length: 255 }).notNull().unique(),
  tour_uuid: varchar({ length: 255 }).notNull(),
  user_uuid: varchar({ length: 255 }).notNull(),
  user_email: varchar({ length: 255 }).notNull(),
  status: varchar({ length: 50 }).notNull(), // request, quoted, confirmed, cancelled, completed
  type: varchar({ length: 50 }).notNull(), // service_request, booking_confirmed
  travel_dates: text(), // JSON with start_date, end_date, flexible
  travelers: text(), // JSON with adults, children, ages
  budget_range: varchar({ length: 100 }),
  special_requirements: text(),
  custom_itinerary: text(), // JSON of custom itinerary details
  quoted_price: integer(), // Final quoted price in cents
  deposit_amount: integer(), // Deposit amount in cents
  deposit_paid: boolean().default(false),
  full_payment: boolean().default(false),
  coordinator_notes: text(),
  created_at: timestamp({ withTimezone: true }),
  updated_at: timestamp({ withTimezone: true }),
  travel_start_date: timestamp({ withTimezone: true }),
  travel_end_date: timestamp({ withTimezone: true }),
  coordinator_uuid: varchar({ length: 255 }), // Staff member assigned
});

// Digital product purchases
export const product_purchases = pgTable("product_purchases", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  purchase_id: varchar({ length: 255 }).notNull().unique(),
  tour_uuid: varchar({ length: 255 }).notNull(),
  user_uuid: varchar({ length: 255 }),
  user_email: varchar({ length: 255 }).notNull(),
  amount: integer().notNull(), // Price paid in cents
  currency: varchar({ length: 10 }).default('USD'),
  payment_status: varchar({ length: 50 }).notNull(), // pending, completed, failed, refunded
  payment_method: varchar({ length: 50 }),
  payment_session_id: varchar({ length: 255 }), // Creem or Stripe session ID
  download_token: varchar({ length: 255 }).unique(), // Secure download token
  download_expires_at: timestamp({ withTimezone: true }),
  download_count: integer().default(0),
  created_at: timestamp({ withTimezone: true }),
  downloaded_at: timestamp({ withTimezone: true }),
});

// Tour reviews
export const tour_reviews = pgTable("tour_reviews", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  review_id: varchar({ length: 255 }).notNull().unique(),
  tour_uuid: varchar({ length: 255 }).notNull(),
  user_uuid: varchar({ length: 255 }).notNull(),
  booking_id: varchar({ length: 255 }), // For service reviews
  purchase_id: varchar({ length: 255 }), // For product reviews
  rating: integer().notNull(), // 1-5 stars
  title: varchar({ length: 255 }),
  content: text(),
  photos: text(), // JSON array of photo URLs
  verified_purchase: boolean().default(false),
  helpful_count: integer().default(0),
  status: varchar({ length: 50 }).default('pending'), // pending, approved, rejected
  created_at: timestamp({ withTimezone: true }),
  updated_at: timestamp({ withTimezone: true }),
});

// Destinations - for organizing tours by location
export const destinations = pgTable("destinations", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  uuid: varchar({ length: 255 }).notNull().unique(),
  name: varchar({ length: 255 }).notNull(),
  slug: varchar({ length: 255 }).notNull().unique(),
  country: varchar({ length: 100 }).default('China'),
  province: varchar({ length: 100 }),
  description: text(),
  highlights: text(), // JSON array of highlights
  best_time_to_visit: varchar({ length: 200 }),
  weather_info: text(),
  featured_image: varchar({ length: 500 }),
  gallery: text(), // JSON array of image URLs
  latitude: varchar({ length: 50 }),
  longitude: varchar({ length: 50 }),
  featured: boolean().default(false),
  tour_count: integer().default(0), // Number of tours for this destination
  status: varchar({ length: 50 }).default('active'),
  created_at: timestamp({ withTimezone: true }),
  updated_at: timestamp({ withTimezone: true }),
  locale: varchar({ length: 50 }).default('en'),
});

// Shared itineraries for collaboration
export const shared_itineraries = pgTable("shared_itineraries", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  share_token: varchar({ length: 255 }).notNull().unique(),
  owner_uuid: varchar({ length: 255 }).notNull(),
  title: varchar({ length: 255 }).notNull(),
  itinerary_data: text().notNull(), // JSON of complete itinerary
  access_level: varchar({ length: 50 }).default('view'), // view, comment, edit
  password_protected: boolean().default(false),
  password_hash: varchar({ length: 255 }),
  expires_at: timestamp({ withTimezone: true }),
  view_count: integer().default(0),
  created_at: timestamp({ withTimezone: true }),
  updated_at: timestamp({ withTimezone: true }),
});

// Forum Categories
export const forum_categories = pgTable("forum_categories", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  uuid: varchar({ length: 255 }).notNull().unique(),
  name: varchar({ length: 255 }).notNull(),
  slug: varchar({ length: 255 }).notNull().unique(),
  description: text(),
  icon: varchar({ length: 100 }),
  color: varchar({ length: 20 }),
  topic_count: integer().default(0),
  post_count: integer().default(0),
  last_post_at: timestamp({ withTimezone: true }),
  last_post_by: varchar({ length: 255 }),
  sort_order: integer().default(0),
  status: varchar({ length: 50 }).default('active'),
  created_at: timestamp({ withTimezone: true }),
  updated_at: timestamp({ withTimezone: true }),
});

// Forum Topics
export const forum_topics = pgTable("forum_topics", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  uuid: varchar({ length: 255 }).notNull().unique(),
  title: varchar({ length: 255 }).notNull(),
  slug: varchar({ length: 255 }).notNull(),
  content: text().notNull(),
  category_uuid: varchar({ length: 255 }).notNull(),
  author_uuid: varchar({ length: 255 }).notNull(),
  reply_count: integer().default(0),
  view_count: integer().default(0),
  like_count: integer().default(0),
  is_pinned: boolean().default(false),
  is_locked: boolean().default(false),
  is_solved: boolean().default(false),
  tags: text(), // JSON array of tags
  last_reply_at: timestamp({ withTimezone: true }),
  last_reply_by: varchar({ length: 255 }),
  status: varchar({ length: 50 }).default('active'),
  created_at: timestamp({ withTimezone: true }),
  updated_at: timestamp({ withTimezone: true }),
});

// Forum Replies
export const forum_replies = pgTable("forum_replies", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  uuid: varchar({ length: 255 }).notNull().unique(),
  content: text().notNull(),
  topic_uuid: varchar({ length: 255 }).notNull(),
  author_uuid: varchar({ length: 255 }).notNull(),
  parent_reply_uuid: varchar({ length: 255 }), // For nested replies
  like_count: integer().default(0),
  is_solution: boolean().default(false),
  is_edited: boolean().default(false),
  edited_at: timestamp({ withTimezone: true }),
  status: varchar({ length: 50 }).default('active'),
  created_at: timestamp({ withTimezone: true }),
  updated_at: timestamp({ withTimezone: true }),
});

// Forum Likes
export const forum_likes = pgTable("forum_likes", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  user_uuid: varchar({ length: 255 }).notNull(),
  target_uuid: varchar({ length: 255 }).notNull(), // topic_uuid or reply_uuid
  target_type: varchar({ length: 50 }).notNull(), // 'topic' or 'reply'
  created_at: timestamp({ withTimezone: true }),
}, (table) => [
  unique("user_target_unique").on(table.user_uuid, table.target_uuid, table.target_type),
]);

// Forum User Stats
export const forum_user_stats = pgTable("forum_user_stats", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  user_uuid: varchar({ length: 255 }).notNull().unique(),
  topic_count: integer().default(0),
  reply_count: integer().default(0),
  like_count: integer().default(0),
  reputation_score: integer().default(0),
  badges: text(), // JSON array of badges
  created_at: timestamp({ withTimezone: true }),
  updated_at: timestamp({ withTimezone: true }),
});
