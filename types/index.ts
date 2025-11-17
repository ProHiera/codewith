export interface User {
  id: string;
  email: string;
  nickname?: string;
}

export interface MissionSpec {
  description?: string;
  requirements?: string[];
  [key: string]: unknown;
}

export interface SubmissionResult {
  passed?: boolean;
  score?: number;
  feedback?: string;
  [key: string]: unknown;
}

export interface Mission {
  id: string;
  title: string;
  type: 'css' | 'javascript' | 'react' | 'error';
  spec_json: MissionSpec;
  created_at: string;
}

export interface Submission {
  id: string;
  user_id: string;
  mission_id: string;
  code: string;
  result_json: SubmissionResult;
  score: number;
  created_at: string;
}

export interface ErrorLog {
  id: string;
  user_id: string;
  log_text: string;
  root_cause?: string;
  fix_patch?: string;
  created_at: string;
}

export interface Project {
  id: string;
  user_id: string;
  title: string;
  stack: string[];
  repo_url?: string;
  demo_url?: string;
  summary?: string;
  created_at: string;
}
