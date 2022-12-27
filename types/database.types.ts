export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: number
          created_at: string | null
          name: string
          expiry_date: string
          user_id: string
          icon: Database["public"]["Enums"]["icon"]
        }
        Insert: {
          id?: number
          created_at?: string | null
          name: string
          expiry_date: string
          user_id?: string
          icon: Database["public"]["Enums"]["icon"]
        }
        Update: {
          id?: number
          created_at?: string | null
          name?: string
          expiry_date?: string
          user_id?: string
          icon?: Database["public"]["Enums"]["icon"]
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      install_available_extensions_and_test: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      icon: "pill" | "pills" | "food"
    }
  }
}
