import type { SupabaseClient } from '@supabase/supabase-js'

// src/routes/+layout.server.ts
export const load = async ({ locals: { supabase, getSession } }) => {
    return {
      session: await getSession()
    }
  }