export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      consents: {
        Row: {
          created_at: string
          granted: boolean
          id: string
          ip: unknown | null
          origin: string | null
          policy_text_b64: string | null
          policy_text_hash: string | null
          policy_url: string | null
          policy_version: string
          referer: string | null
          source: string
          user_agent: string | null
        }
        Insert: {
          created_at?: string
          granted?: boolean
          id?: string
          ip?: unknown | null
          origin?: string | null
          policy_text_b64?: string | null
          policy_text_hash?: string | null
          policy_url?: string | null
          policy_version: string
          referer?: string | null
          source: string
          user_agent?: string | null
        }
        Update: {
          created_at?: string
          granted?: boolean
          id?: string
          ip?: unknown | null
          origin?: string | null
          policy_text_b64?: string | null
          policy_text_hash?: string | null
          policy_url?: string | null
          policy_version?: string
          referer?: string | null
          source?: string
          user_agent?: string | null
        }
        Relationships: []
      }
      contact_messages: {
        Row: {
          consent_id: string | null
          created_at: string
          email: string | null
          id: string
          message: string | null
          name: string
          privacy_accepted: boolean
        }
        Insert: {
          consent_id?: string | null
          created_at?: string
          email?: string | null
          id?: string
          message?: string | null
          name: string
          privacy_accepted?: boolean
        }
        Update: {
          consent_id?: string | null
          created_at?: string
          email?: string | null
          id?: string
          message?: string | null
          name?: string
          privacy_accepted?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "contact_messages_consent_id_fkey"
            columns: ["consent_id"]
            isOneToOne: false
            referencedRelation: "consents"
            referencedColumns: ["id"]
          },
        ]
      }
      erasure_events: {
        Row: {
          actor: string
          anonymized_count: number
          created_at: string
          id: string
          reason: string
          source_ip: unknown | null
          target_contact_ids: string[] | null
          target_email: string | null
          user_agent: string | null
        }
        Insert: {
          actor: string
          anonymized_count?: number
          created_at?: string
          id?: string
          reason: string
          source_ip?: unknown | null
          target_contact_ids?: string[] | null
          target_email?: string | null
          user_agent?: string | null
        }
        Update: {
          actor?: string
          anonymized_count?: number
          created_at?: string
          id?: string
          reason?: string
          source_ip?: unknown | null
          target_contact_ids?: string[] | null
          target_email?: string | null
          user_agent?: string | null
        }
        Relationships: []
      }
      newsletter_subscribers: {
        Row: {
          consent_id: string | null
          created_at: string | null
          email: string
          email_norm: string | null
          id: string
          name: string | null
          unsubscribed: boolean | null
          unsubscribed_at: string | null
        }
        Insert: {
          consent_id?: string | null
          created_at?: string | null
          email: string
          email_norm?: string | null
          id?: string
          name?: string | null
          unsubscribed?: boolean | null
          unsubscribed_at?: string | null
        }
        Update: {
          consent_id?: string | null
          created_at?: string | null
          email?: string
          email_norm?: string | null
          id?: string
          name?: string | null
          unsubscribed?: boolean | null
          unsubscribed_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "newsletter_subscribers_consent_id_fkey"
            columns: ["consent_id"]
            isOneToOne: false
            referencedRelation: "consents"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      worker_logs: {
        Row: {
          created_at: string
          id: string
          text: string
        }
        Insert: {
          created_at?: string
          id?: string
          text: string
        }
        Update: {
          created_at?: string
          id?: string
          text?: string
        }
        Relationships: []
      }
    }
    Views: {
      v_contact_consents_audit: {
        Row: {
          consent_created_at: string | null
          consent_id: string | null
          contact_created_at: string | null
          contact_id: string | null
          email: string | null
          granted: boolean | null
          ip: unknown | null
          message: string | null
          name: string | null
          origin: string | null
          policy_text_b64: string | null
          policy_text_hash: string | null
          policy_url: string | null
          policy_version: string | null
          privacy_accepted: boolean | null
          referer: string | null
          source: string | null
          user_agent: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      get_contact_consents_audit: {
        Args: Record<PropertyKey, never>
        Returns: {
          consent_created_at: string
          consent_id: string
          contact_created_at: string
          contact_id: string
          email: string
          granted: boolean
          ip: unknown
          message: string
          name: string
          origin: string
          policy_text_b64: string
          policy_text_hash: string
          policy_url: string
          policy_version: string
          privacy_accepted: boolean
          referer: string
          source: string
          user_agent: string
        }[]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_admin: {
        Args: { _user_id?: string }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
