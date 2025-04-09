// src/routes/+layout.ts
import { PUBLIC_SUPABASE_URL } from '$env/static/public'
import { createSupabaseLoadClient } from '@supabase/auth-helpers-sveltekit'
export const prerender = false;

export const load = async ({ fetch, data, depends }) => {
  depends('supabase:auth')

  const supabase = createSupabaseLoadClient({
    supabaseUrl: PUBLIC_SUPABASE_URL,
    supabaseKey: PUBLIC_SUPABASE_ANON_KEY,    
    event: { fetch },
    serverSession: data.session,
    options: {
      db: {
        schema: 'ktomek'
      }
    }
  })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  return { supabase, session }
}
