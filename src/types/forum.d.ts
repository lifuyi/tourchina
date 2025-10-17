export interface ForumCategory {
  id: number;
  uuid: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  color?: string;
  topic_count: number;
  post_count: number;
  last_post_at?: string;
  last_post_by?: string;
  sort_order: number;
  status: 'active' | 'inactive';
  created_at: string;
  updated_at: string;
}

export interface ForumTopic {
  id: number;
  uuid: string;
  title: string;
  slug: string;
  content: string;
  category_uuid: string;
  category_name?: string;
  author_uuid: string;
  author_name?: string;
  author_avatar?: string;
  reply_count: number;
  view_count: number;
  like_count: number;
  is_pinned: boolean;
  is_locked: boolean;
  is_solved: boolean;
  tags?: string[];
  last_reply_at?: string;
  last_reply_by?: string;
  last_reply_by_avatar?: string;
  status: 'active' | 'hidden' | 'deleted';
  created_at: string;
  updated_at: string;
}

export interface ForumReply {
  id: number;
  uuid: string;
  content: string;
  topic_uuid: string;
  author_uuid: string;
  author_name?: string;
  author_avatar?: string;
  parent_reply_uuid?: string;
  like_count: number;
  is_solution: boolean;
  is_edited: boolean;
  edited_at?: string;
  status: 'active' | 'hidden' | 'deleted';
  created_at: string;
  updated_at: string;
}

export interface ForumUserStats {
  user_uuid: string;
  topic_count: number;
  reply_count: number;
  like_count: number;
  reputation_score: number;
  badges: string[];
  join_date: string;
  last_active: string;
}

export interface ForumLike {
  id: number;
  user_uuid: string;
  target_uuid: string; // topic_uuid or reply_uuid
  target_type: 'topic' | 'reply';
  created_at: string;
}