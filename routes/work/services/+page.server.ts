import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals: { supabase, getSession } }) => {
    const session = await getSession()
    if (!session) {
        // the user is not signed in
        throw error(401, { message: 'Unauthorized' })
    }

    let logactionparm = 'Load'
    let logdescriptionparm = 'Ktomek Work Service Configuration Load'
    let loglocationparm = '/work/services'
    await supabase.rpc('insertlog', { logactionparm, logdescriptionparm, loglocationparm });

    const { data, error: et } = await supabase.rpc("getwhitelabelstatus")

    const { data: dt, error: ett } = await supabase.rpc('getorganizationshortcodebyauthid');

    const { data: dtt, error: ef } = await supabase.rpc('getwhitelabelcolors');

    if (et != null) {
        return {
            whitelabel: false,
            primarycolor: '#540000',
            secondarycolor: ''
        }
    }

    if (ef != null) {
        return {
            whitelabel: false,
            shortcode: dt,
            primarycolor: '#540000',
            secondarycolor: ''
        }
    }

    return {
        whitelabel: data,
        shortcode: dt,
        primarycolor: dtt.primarycolor,
        secondarycolor: dtt.secondarycolor
    };
}) satisfies PageServerLoad;

export const actions = {
    updatePrimaryColor: async ({ request, locals: { supabase, getSession } }) => {
        const session = await getSession()
        if (!session) {
            // the user is not signed in
            throw error(401, { message: 'Unauthorized' })
        }

        let logactionparm = 'Update'
        let logdescriptionparm = 'Ktomek Work Service Configuration White Label Primary Color Updated'
        let loglocationparm = '/work/services'
        await supabase.rpc('insertlog', { logactionparm, logdescriptionparm, loglocationparm });

        const formData = await request.formData();
        const primarycolor = formData.get('primarycolor')?.toString();

        const { data: dtt, error: ef } = await supabase.rpc('getwhitelabelcolors');

        await supabase.rpc('setwhitelabelprimarycolor', { whitelabelcolorparm: primarycolor });

        if (ef != null) {
            return {
                primarycolor: primarycolor,
                secondarycolor: ''
            }
        }

        return {
            primarycolor: primarycolor,
            secondarycolor: dtt.secondarycolor
        }
    },
    updateSecondaryColor: async ({ request, locals: { supabase, getSession } }) => {
        const session = await getSession()
        if (!session) {
            // the user is not signed in
            throw error(401, { message: 'Unauthorized' })
        }

        let logactionparm = 'Update'
        let logdescriptionparm = 'Ktomek Work Service Configuration White Label Secondary Color Updated'
        let loglocationparm = '/work/services'
        await supabase.rpc('insertlog', { logactionparm, logdescriptionparm, loglocationparm });

        const formData = await request.formData();
        const secondarycolor = formData.get('secondarycolor')?.toString();

        const { data: dtt, error: ef } = await supabase.rpc('getwhitelabelcolors');

        await supabase.rpc('setwhitelabelsecondarycolor', { whitelabelcolorparm: secondarycolor });

        if (ef != null) {
            return {
                primarycolor: '',
                secondarycolor: secondarycolor
            }
        }

        return {
            primarycolor: dtt.primarycolor,
            secondarycolor: secondarycolor
        }
    }
}
