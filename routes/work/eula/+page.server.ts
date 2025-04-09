
import { error, redirect } from "@sveltejs/kit";

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals: { supabase, getSession } }) {
    const session = await getSession()
    if (!session) {
        // the user is not signed in
        throw error(401, { message: 'Unauthorized' })
    }

    let logactionparm = 'Load'
    let logdescriptionparm = 'Ktomek Work EULA Load'
    let loglocationparm = '/work/eula'
    await supabase.rpc('insertlog', { logactionparm, logdescriptionparm, loglocationparm });

    return {
    };
}

export const actions = {
    acceptEULA: async ({ locals: { supabase, getSession } }) => {
        const session = await getSession()
        if (!session) {
            // the user is not signed in
            throw error(401, { message: 'Unauthorized' })
        }

        let logactionparm = 'Accept'
        let logdescriptionparm = 'Ktomek Work EULA Accepted'
        let loglocationparm = '/work/eula'
        await supabase.rpc('insertlog', { logactionparm, logdescriptionparm, loglocationparm });

        const { error: et } = await supabase.rpc('accepteula');

        if(et == null) {
            throw redirect(303, '/work')
        }
    }
}