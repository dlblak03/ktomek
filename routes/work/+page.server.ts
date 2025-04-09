import { error, redirect } from "@sveltejs/kit";

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ locals: { supabase, getSession } }) {
  const session = await getSession()
  if (!session) {
    throw redirect(308, '/auth?type=work')
  }

  let logactionparm = 'Load'
  let logdescriptionparm = 'Ktomek Work Dashboard Load'
  let loglocationparm = '/work'
  await supabase.rpc('insertlog', { logactionparm, logdescriptionparm, loglocationparm });
  
  var returnCount = 0
  const { data, error: et } = await supabase.rpc('getmspleads')
  if(et == null) {
    returnCount = data.length
  }

  return {
    leads_count: returnCount
  };
}