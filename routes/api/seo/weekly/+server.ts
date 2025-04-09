import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from '../../../api/seo/weekly/$types';

export const POST: RequestHandler = async ({ request, locals: { supabase, getSession } }) => {
    const session = await getSession()
    if (!session) {
        // the user is not signed in
        return new Response();
    }

    let logactionparm = 'Download'
    let logdescriptionparm = 'Ktomek Work SEO Weekly Report Download'
    let loglocationparm = '/work/seo'
    await supabase.rpc('insertlog', { logactionparm, logdescriptionparm, loglocationparm });

    let name = await request.text()

    const { data, error: et } = await supabase.rpc('getorganizationshortcodebyauthid');

    const { data: dt } = await supabase
        .storage
        .from('msp_private')
        .createSignedUrl(data + '/seo/weekly/' + name, 60, {
            download: true,
        })

    if (dt == null) {
        return new Response();
    }

    return json({
        url: dt.signedUrl.toString()
    })
};