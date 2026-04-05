export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      candidate_analytics_sessions: {
        Row: {
          created_at: string
          id: string
          job_role_id: string | null
          pulled_candidates: Json | null
          ranked_results: Json | null
          recruiter_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          job_role_id?: string | null
          pulled_candidates?: Json | null
          ranked_results?: Json | null
          recruiter_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          job_role_id?: string | null
          pulled_candidates?: Json | null
          ranked_results?: Json | null
          recruiter_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "candidate_analytics_sessions_job_role_id_fkey"
            columns: ["job_role_id"]
            isOneToOne: false
            referencedRelation: "job_roles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "candidate_analytics_sessions_recruiter_id_fkey"
            columns: ["recruiter_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      candidates: {
        Row: {
          ai_score: number | null
          email: string | null
          full_name: string
          id: string
          is_marketplace: boolean
          job_role_id: string | null
          notes: string | null
          parsed_data: Json | null
          phone: string | null
          resume_text: string | null
          resume_url: string | null
          score_breakdown: Json | null
          status: string | null
          updated_at: string
          upload_date: string
          uploaded_by: string | null
        }
        Insert: {
          ai_score?: number | null
          email?: string | null
          full_name?: string
          id?: string
          is_marketplace?: boolean
          job_role_id?: string | null
          notes?: string | null
          parsed_data?: Json | null
          phone?: string | null
          resume_text?: string | null
          resume_url?: string | null
          score_breakdown?: Json | null
          status?: string | null
          updated_at?: string
          upload_date?: string
          uploaded_by?: string | null
        }
        Update: {
          ai_score?: number | null
          email?: string | null
          full_name?: string
          id?: string
          is_marketplace?: boolean
          job_role_id?: string | null
          notes?: string | null
          parsed_data?: Json | null
          phone?: string | null
          resume_text?: string | null
          resume_url?: string | null
          score_breakdown?: Json | null
          status?: string | null
          updated_at?: string
          upload_date?: string
          uploaded_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "candidates_job_role_id_fkey"
            columns: ["job_role_id"]
            isOneToOne: false
            referencedRelation: "job_roles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "candidates_uploaded_by_fkey"
            columns: ["uploaded_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      job_roles: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          employment_type: string | null
          id: string
          location: string | null
          max_experience: number | null
          min_experience: number | null
          required_skills: string[] | null
          status: string | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          employment_type?: string | null
          id?: string
          location?: string | null
          max_experience?: number | null
          min_experience?: number | null
          required_skills?: string[] | null
          status?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          employment_type?: string | null
          id?: string
          location?: string | null
          max_experience?: number | null
          min_experience?: number | null
          required_skills?: string[] | null
          status?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "job_roles_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      leads: {
        Row: {
          budget_choice: string | null
          country_choice: string | null
          current_step: number
          full_name: string | null
          id: string
          is_paused: boolean
          phone_number: string
          status: string
          updated_at: string
        }
        Insert: {
          budget_choice?: string | null
          country_choice?: string | null
          current_step?: number
          full_name?: string | null
          id?: string
          is_paused?: boolean
          phone_number: string
          status?: string
          updated_at?: string
        }
        Update: {
          budget_choice?: string | null
          country_choice?: string | null
          current_step?: number
          full_name?: string | null
          id?: string
          is_paused?: boolean
          phone_number?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      whatsapp_accounts: {
        Row: {
          access_token: string
          budget_template: string | null
          country_template: string | null
          created_at: string
          id: string
          is_coexistence: boolean
          phone_number_id: string
          updated_at: string
          user_id: string
          waba_id: string
        }
        Insert: {
          access_token: string
          budget_template?: string | null
          country_template?: string | null
          created_at?: string
          id?: string
          is_coexistence?: boolean
          phone_number_id: string
          updated_at?: string
          user_id: string
          waba_id: string
        }
        Update: {
          access_token?: string
          budget_template?: string | null
          country_template?: string | null
          created_at?: string
          id?: string
          is_coexistence?: boolean
          phone_number_id?: string
          updated_at?: string
          user_id?: string
          waba_id?: string
        }
        Relationships: []
      }
      whatsapp_sync_messages: {
        Row: {
          created_at: string
          from_wa_id: string | null
          id: string
          is_echo: boolean
          message_type: string
          payload: Json | null
          phone_number_id: string | null
          text_body: string | null
          to_wa_id: string | null
          wa_message_id: string | null
        }
        Insert: {
          created_at?: string
          from_wa_id?: string | null
          id?: string
          is_echo?: boolean
          message_type: string
          payload?: Json | null
          phone_number_id?: string | null
          text_body?: string | null
          to_wa_id?: string | null
          wa_message_id?: string | null
        }
        Update: {
          created_at?: string
          from_wa_id?: string | null
          id?: string
          is_echo?: boolean
          message_type?: string
          payload?: Json | null
          phone_number_id?: string | null
          text_body?: string | null
          to_wa_id?: string | null
          wa_message_id?: string | null
        }
        Relationships: []
      }
      recruiter_selections: {
        Row: {
          candidate_id: string | null
          id: string
          job_role_id: string | null
          notes: string | null
          recruiter_id: string | null
          selected_at: string
          status: string | null
        }
        Insert: {
          candidate_id?: string | null
          id?: string
          job_role_id?: string | null
          notes?: string | null
          recruiter_id?: string | null
          selected_at?: string
          status?: string | null
        }
        Update: {
          candidate_id?: string | null
          id?: string
          job_role_id?: string | null
          notes?: string | null
          recruiter_id?: string | null
          selected_at?: string
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "recruiter_selections_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recruiter_selections_job_role_id_fkey"
            columns: ["job_role_id"]
            isOneToOne: false
            referencedRelation: "job_roles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recruiter_selections_recruiter_id_fkey"
            columns: ["recruiter_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string
          email: string
          full_name: string
          id: string
          is_active: boolean
          password_hash: string
          role: string
        }
        Insert: {
          created_at?: string
          email: string
          full_name: string
          id?: string
          is_active?: boolean
          password_hash: string
          role: string
        }
        Update: {
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          is_active?: boolean
          password_hash?: string
          role?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      _extract_skill_name: { Args: { input: string }; Returns: string }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

// ─── Convenience types for this app ──────────────────────────────────────────

/** A single row from the `leads` table */
export type Lead = Database["public"]["Tables"]["leads"]["Row"]

/** Insert payload for `leads` */
export type LeadInsert = Database["public"]["Tables"]["leads"]["Insert"]

/** Update payload for `leads` */
export type LeadUpdate = Database["public"]["Tables"]["leads"]["Update"]

/** A single row from the `whatsapp_accounts` table */
export type WhatsappAccount = Database["public"]["Tables"]["whatsapp_accounts"]["Row"]

/** Insert payload for `whatsapp_accounts` */
export type WhatsappAccountInsert =
  Database["public"]["Tables"]["whatsapp_accounts"]["Insert"]

/** Update payload for `whatsapp_accounts` */
export type WhatsappAccountUpdate =
  Database["public"]["Tables"]["whatsapp_accounts"]["Update"]
