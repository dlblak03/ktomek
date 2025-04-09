import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals: { supabase, getSession } }) => {
    const session = await getSession()
    if (!session) {
        // the user is not signed in
        throw redirect(308, '/auth?type=work')
    }

    let logactionparm = 'Load'
    let logdescriptionparm = 'Ktomek Work Assets Load'
    let loglocationparm = '/work/assets'
    await supabase.rpc('insertlog', { logactionparm, logdescriptionparm, loglocationparm });

    const { data, error: et } = await supabase.rpc('getorganizationshortcodebyauthid');

    const { data: dt, error: ett } = await supabase.rpc('getassets');
    const { data: dtt, error: ef } = await supabase.rpc('getmspwebpageslabels');

    let columns = [{ "column_name": "Image Name", "column": "path_name" }, { "column_name": "Webpage Label", "column": "alt" }]

    return {
        images: dt,
        columns: columns,
        shortcode: data,
        labels: dtt.string_agg == null ? '' : dtt.string_agg,
        labelsarray: dtt.string_agg == null ? ['Default'] : dtt.string_agg.split(',')
    };
}) satisfies PageServerLoad;

export const actions = {
    updateImage: async ({ request, locals: { supabase, getSession } }) => {
        const session = await getSession()
        if (!session) {
            // the user is not signed in
            throw redirect(308, '/auth?type=work')
        }

        let logactionparm = 'Update';
        let logdescriptionparm = 'Ktomek Work Assets Label Updated';
        let loglocationparm = '/work/assets';
        await supabase.rpc('insertlog', {
            logactionparm,
            logdescriptionparm,
            loglocationparm
        });

        const formData = await request.formData();
        const pathname = formData?.get("pathname")?.toString().trim()
        const label = formData?.get("label")?.toString().trim()
        const idimage = formData?.get("idimage")?.toString().trim()

        const { error } = await supabase.rpc('updateimage', {
            path: pathname,
            labelparm: label,
            idimage: idimage
        });

        const { data: dt, error: ett } = await supabase.rpc('getassets');
        const { data: dtt, error: ef } = await supabase.rpc('getmspwebpageslabels');

        let columns = [{ "column_name": "Image Name", "column": "path_name" }, { "column_name": "Webpage Label", "column": "alt" }]
        
        return {
            images: dt,
            success: error == null ? true : false
        }
    }
}