
import { error, redirect } from "@sveltejs/kit";

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals: { supabase, getSession } }) {
    const session = await getSession()
    if (!session) {
        // the user is not signed in
        throw error(401, { message: 'Unauthorized' })
    }

    let logactionparm = 'Load'
    let logdescriptionparm = 'Ktomek Work Rockets Load'
    let loglocationparm = '/work/rockets'
    await supabase.rpc('insertlog', { logactionparm, logdescriptionparm, loglocationparm });

    const {data, error: et} = await supabase.rpc('getmsprockets');
    
    return {
        rockets: data
    };
}

export const actions = {
    submitRocket: async ({ request, locals: { supabase, getSession } }) => {
        const session = await getSession()
        if (!session) {
            // the user is not signed in
            throw error(401, { message: 'Unauthorized' })
        }

        let logactionparm = 'Insert'
        let logdescriptionparm = 'Ktomek Work Rocket Added'
        let loglocationparm = '/work/rockets'
        await supabase.rpc('insertlog', { logactionparm, logdescriptionparm, loglocationparm });

        const formData = await request.formData();
        const problem = formData.get('problem')?.toString();
        const requestParm = formData.get('request')?.toString();

        const { data, error: et } = await supabase.rpc('insertrocket', {
            problem,
            request: requestParm
        });

        return {
            
        }
    },
    updateRocketName: async ({ request, locals: { supabase, getSession } }) => {
        const session = await getSession()
        if (!session) {
            // the user is not signed in
            throw error(401, { message: 'Unauthorized' })
        }

        let logactionparm = 'Update'
        let logdescriptionparm = 'Ktomek Work Rocket Name Update'
        let loglocationparm = '/work/rockets'
        await supabase.rpc('insertlog', { logactionparm, logdescriptionparm, loglocationparm });

        const formData = await request.formData();
        const rocketidparm = formData.get('rocketid')?.toString();
        const rocketnameparm = formData.get('rocketname')?.toString();
        
        const { data, error: et } = await supabase.rpc('updaterocketname', {
            rocketidparm, 
            rocketnameparm
        });
        
        return {
            
        }
    },
    updateRocketDescription: async ({ request, locals: { supabase, getSession } }) => {
        const session = await getSession()
        if (!session) {
            // the user is not signed in
            throw error(401, { message: 'Unauthorized' })
        }

        let logactionparm = 'Update'
        let logdescriptionparm = 'Ktomek Work Rocket Description Update'
        let loglocationparm = '/work/rockets'
        await supabase.rpc('insertlog', { logactionparm, logdescriptionparm, loglocationparm });

        const formData = await request.formData();
        const rocketidparm = formData.get('rocketid')?.toString();
        const rocketdescriptionparm = formData.get('rocketdescription')?.toString();
        
        const { data, error: et } = await supabase.rpc('updaterocketdescription', {
            rocketidparm, 
            rocketdescriptionparm
        });
        
        return {
            
        }
    },
    addChat: async ({ request, locals: { supabase, getSession } }) => {
        const session = await getSession()
        if (!session) {
            // the user is not signed in
            throw error(401, { message: 'Unauthorized' })
        }

        let logactionparm = 'Insert'
        let logdescriptionparm = 'Ktomek Work Rocket Chat Added'
        let loglocationparm = '/work/rockets'
        await supabase.rpc('insertlog', { logactionparm, logdescriptionparm, loglocationparm });

        const formData = await request.formData();
        const rocketidparm = formData.get('rocketid')?.toString();
        const rocketchatinput = formData.get('rocketchatinput')?.toString();
        console.log(rocketidparm)
        console.log(rocketchatinput)
        const { data, error: et } = await supabase.rpc('insertrocketchat', {
            rocketidparm, 
            messageparm: rocketchatinput
        });

        console.log(et)
        
        return {
            
        }
    }
}