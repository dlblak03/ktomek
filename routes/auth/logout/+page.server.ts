import type { PageServerLoad } from '../$types';

export const load = (async ({ locals: { supabase, getSession } }) => {
    await supabase.auth.signOut()
}) satisfies PageServerLoad;