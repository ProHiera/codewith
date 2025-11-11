export interface Note {
  id: string;
  user_id: string;
  mission_id?: string;
  title: string;
  content: string;
  tags: string[];
  is_ai_generated: boolean;
  created_at: string;
  updated_at: string;
}

export interface AIMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface AIConversation {
  id: string;
  user_id: string;
  messages: AIMessage[];
  context_type?: string;
  context_id?: string;
  created_at: string;
  updated_at: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  badge_icon: string;
  requirement_type: string;
  requirement_value: number;
  exp_reward: number;
  created_at: string;
}

export interface UserProfile {
  id: string;
  email: string;
  nickname?: string;
  level: number;
  exp: number;
  badges: string[];
  streak_days: number;
  last_activity_date?: string;
  created_at: string;
}
