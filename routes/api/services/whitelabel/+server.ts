import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from '../../../api/seo/weekly/$types';

export const POST: RequestHandler = async ({ request, locals: { supabase, getSession } }) => {
    const session = await getSession()
    if (!session) {
        // the user is not signed in
        return new Response();
    }

    let logactionparm = 'Service Change'
    let logdescriptionparm = 'Ktomek Work Services White Label Service Change'
    let loglocationparm = '/work/services'
    await supabase.rpc('insertlog', { logactionparm, logdescriptionparm, loglocationparm });

    let toggle = await request.text()

    const { error: et } = await supabase.rpc('setwhitelabelstatus', { whitelabelparm: toggle });

    if(et != null) {
        return json({
            success: false
        })
    }

    return json({
        success: true
    })
};