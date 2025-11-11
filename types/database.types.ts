export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          password_hash: string
          nickname: string | null
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          password_hash: string
          nickname?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          password_hash?: string
          nickname?: string | null
          created_at?: string
        }
      }
      missions: {
        Row: {
          id: string
          title: string
          type: string
          spec_json: Json
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          type: string
          spec_json: Json
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          type?: string
          spec_json?: Json
          created_at?: string
        }
      }
      submissions: {
        Row: {
          id: string
          user_id: string
          mission_id: string
          code: string
          result_json: Json
          score: number
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          mission_id: string
          code: string
          result_json: Json
          score: number
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          mission_id?: string
          code?: string
          result_json?: Json
          score?: number
          created_at?: string
        }
      }
      errors: {
        Row: {
          id: string
          user_id: string
          log_text: string
          root_cause: string | null
          fix_patch: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          log_text: string
          root_cause?: string | null
          fix_patch?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          log_text?: string
          root_cause?: string | null
          fix_patch?: string | null
          created_at?: string
        }
      }
      projects: {
        Row: {
          id: string
          user_id: string
          title: string
          stack: string[]
          repo_url: string | null
          demo_url: string | null
          summary: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          stack: string[]
          repo_url?: string | null
          demo_url?: string | null
          summary?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          stack?: string[]
          repo_url?: string | null
          demo_url?: string | null
          summary?: string | null
          created_at?: string
        }
      }
    }
  }
}
