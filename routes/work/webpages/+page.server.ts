import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals: { supabase, getSession } }) => {
    const session = await getSession()
    if (!session) {
        // the user is not signed in
        throw error(401, { message: 'Unauthorized' })
    }

    let logactionparm = 'Load'
    let logdescriptionparm = 'Ktomek Work Webpages Load'
    let loglocationparm = '/work/webpages'
    await supabase.rpc('insertlog', { logactionparm, logdescriptionparm, loglocationparm });

    const { data, error: errortwo } = await supabase.rpc('getmspwebpages')

    let columns = [{ "column_name": "Webpage", "column": "webpagename" },{ "column_name": "Path", "column": "webpagepath" },{ "column_name": "Label", "column": "webpagelabel" },{ "column_name": "Status", "column": "status" }]

    return {
        webpages: data,
        columns: columns
    };
}) satisfies PageServerLoad;

export const actions = {
    addWebpage: async ({ request, locals: { supabase, getSession } }) => {
        const session = await getSession()
        if (!session) {
            // the user is not signed in
            throw error(401, { message: 'Unauthorized' })
        }

        let logactionparm = 'Insert'
        let logdescriptionparm = 'Ktomek Work Webpage Added'
        let loglocationparm = '/work/webpages'
        await supabase.rpc('insertlog', { logactionparm, logdescriptionparm, loglocationparm });

        const formData = await request.formData();
        const webpagenameparm = formData.get('webpagename')?.toString();
        const webpagepathparm = formData.get('webpagepath')?.toString();
        const webpagelabelparm = formData.get('webpagelabel')?.toString();

        const { data, error: et } = await supabase.rpc('insertmspwebpage', {
            webpagenameparm,
            webpagepathparm,
            webpagelabelparm
        });

        return {
            
        }
    }
}