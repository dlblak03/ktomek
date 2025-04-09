import { error, fail } from "@sveltejs/kit";

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals: { supabase, getSession } }) {
    const session = await getSession()
    if (!session) {
        // the user is not signed in
        throw error(401, { message: 'Unauthorized' })
    }

    let logactionparm = 'Load'
    let logdescriptionparm = 'Ktomek Work SEO Load'
    let loglocationparm = '/work/seo'
    await supabase.rpc('insertlog', { logactionparm, logdescriptionparm, loglocationparm });

    const { data, error: et } = await supabase.rpc('getorganizationshortcodebyauthid');

    const { data: dt, error: ett } = await supabase
        .storage
        .from('msp_private')
        .list(data + '/seo/weekly/', {
            limit: 100,
            offset: 0,
            sortBy: { column: 'name', order: 'asc' },
        })

    if (ett) {
        return fail(401, {})
    }
    
    let newDt = dt.map(m => {
        let newO = {
            name: m.name,
            created_at: m.created_at
        }

        return newO;
    })

    let columns = [{ "column_name": "Name", "column": "name" },{ "column_name": "Created", "column": "created_at" }]

    return {
        files: newDt,
        columns: columns,
        shortcode: data
    };
}