import { error } from "@sveltejs/kit";

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals: { supabase, getSession } }) {
    const session = await getSession()
    if (!session) {
        // the user is not signed in
        throw error(401, { message: 'Unauthorized' })
    }

    let logactionparm = 'Load'
    let logdescriptionparm = 'Ktomek Work Social Load'
    let loglocationparm = '/work/social'
    await supabase.rpc('insertlog', { logactionparm, logdescriptionparm, loglocationparm });
    
    return {};
}