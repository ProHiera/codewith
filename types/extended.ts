// Extended Types for Learning Platform

// Learning Cards
export interface LearningCard {
  id: string;
  user_id: string;
  title: string;
  type: 'memorize' | 'reference' | 'practice';
  front_content: string;
  back_content?: string;
  tags: string[];
  difficulty?: 'easy' | 'medium' | 'hard';
  is_mastered: boolean;
  mastered_at?: string;
  category?: string;
  created_at: string;
  updated_at: string;
}

// Quiz
export interface QuizQuestion {
  id: string;
  mission_id?: string;
  question: string;
  options: string[];
  correct_answer: number;
  explanation?: string;
  related_topic?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  created_at: string;
}

export interface QuizResult {
  id: string;
  user_id: string;
  question_id: string;
  selected_answer: number;
  is_correct: boolean;
  time_spent?: number;
  created_at: string;
}

// Hints
export interface Hint {
  id: string;
  mission_id?: string;
  level: 1 | 2 | 3;
  content: string;
  created_at: string;
}

export interface HintUsage {
  id: string;
  user_id: string;
  hint_id: string;
  revealed_at: string;
}

// User Progress
export interface UserProgress {
  id: string;
  user_id: string;
  current_level: number;
  total_xp: number;
  streak_days: number;
  last_study_date?: string;
  created_at: string;
  updated_at: string;
}

// Badges
export interface Badge {
  id: string;
  name: string;
  emoji: string;
  description: string;
  requirement_type: string;
  requirement_value: number;
  created_at: string;
}

export interface UserBadge {
  id: string;
  user_id: string;
  badge_id: string;
  earned_at: string;
  badge?: Badge;
}

// Community
export interface CommunityPost {
  id: string;
  user_id: string;
  title: string;
  content: string;
  category?: 'note' | 'question' | 'discussion' | 'showcase';
  tags: string[];
  ai_summary?: string;
  likes_count: number;
  comments_count: number;
  views_count: number;
  is_pinned: boolean;
  created_at: string;
  updated_at: string;
  author?: {
    id: string;
    nickname?: string;
    email: string;
  };
}

export interface PostLike {
  id: string;
  user_id: string;
  post_id: string;
  created_at: string;
}

export interface PostComment {
  id: string;
  user_id: string;
  post_id: string;
  content: string;
  likes_count: number;
  created_at: string;
  updated_at: string;
  author?: {
    id: string;
    nickname?: string;
    email: string;
  };
}

export interface CommentLike {
  id: string;
  user_id: string;
  comment_id: string;
  created_at: string;
}

// AI Chat
export interface AIChatMessage {
  id: string;
  user_id: string;
  role: 'user' | 'assistant';
  content: string;
  context_type?: string;
  context_id?: string;
  created_at: string;
}

// Study Session
export interface StudySession {
  id: string;
  user_id: string;
  started_at: string;
  ended_at?: string;
  duration_seconds?: number;
  cards_reviewed: number;
  quizzes_completed: number;
  xp_earned: number;
}

// API Request/Response Types
export interface CreateLearningCardRequest {
  title: string;
  type: 'memorize' | 'reference' | 'practice';
  front_content: string;
  back_content?: string;
  tags?: string[];
  difficulty?: 'easy' | 'medium' | 'hard';
  category?: string;
}

export interface CreateQuizRequest {
  question: string;
  options: string[];
  correct_answer: number;
  explanation?: string;
  related_topic?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}

export interface SubmitQuizRequest {
  question_id: string;
  selected_answer: number;
  time_spent?: number;
}

export interface CreatePostRequest {
  title: string;
  content: string;
  category?: 'note' | 'question' | 'discussion' | 'showcase';
  tags?: string[];
  generate_ai_summary?: boolean;
}

export interface CreateCommentRequest {
  post_id: string;
  content: string;
}

export interface AIChatRequest {
  message: string;
  context_type?: string;
  context_id?: string;
}

export interface AIChatResponse {
  message: string;
  context?: Record<string, unknown>;
}
