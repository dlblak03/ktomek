import { error } from "@sveltejs/kit";

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals: { supabase, getSession } }) {
    const session = await getSession()
    if (!session) {
        // the user is not signed in
        throw error(401, { message: 'Unauthorized' })
    }

    let logactionparm = 'Load'
    let logdescriptionparm = 'Ktomek Work Leads Load'
    let loglocationparm = '/work/leads'
    await supabase.rpc('insertlog', { logactionparm, logdescriptionparm, loglocationparm });

    const { data, error: errortwo } = await supabase.rpc('getmspleads')
    var allLeads: any[] = []
    if(errortwo == null) {
      data.forEach((lead: any) => {
        lead.leaddata["date"] = lead.leaddate
        lead.leaddata["status"] = lead.leadstatus

        allLeads.push(lead.leaddata)
      })
    }

    const { data: datatwo, error: errorthree } = await supabase.rpc('getmspleadssettings')
    
    return {
        columns: datatwo[0].leadcolumns,
        leads: JSON.stringify(allLeads)
    };
}