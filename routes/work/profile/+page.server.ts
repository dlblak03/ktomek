import { error, fail, redirect } from "@sveltejs/kit";

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ locals: { supabase, getSession } }) {
    const session = await getSession()
    if (!session) {
        // the user is not signed in
        throw error(401, { message: 'Unauthorized' })
    }

    let logactionparm = 'Load'
    let logdescriptionparm = 'Ktomek Work Profile Load'
    let loglocationparm = '/work/profile'
    await supabase.rpc('insertlog', { logactionparm, logdescriptionparm, loglocationparm });

    const { data, error: et } = await supabase.rpc('getuser');
    const { data: dt, error: etr } = await supabase.rpc('getorganizationsubscription');

    if (et) {
        return fail(401)
    }

    if (etr) {
        return fail(401)
    }

    return {
        firstname: data[0].first_name,
        lastname: data[0].last_name,
        phone: data[0].phone,
        existingPhone: data[0].phone,
        phone_verification: data[0].phone_verification,
        email: data[0].email,
        existingEmail: data[0].email,
        email_verification: data[0].email_verification,
        dob: data[0].dob,
        age: data[0].age,
        subscription: dt.subscription,
        developmenthours: dt.appdesigndevhours,
        seo: dt.seo,
        socialaccounts: dt.socialaccounts,
        socialmediaposts: dt.socialmediaposts,
        apphosting: dt.apphosting,
        ktomekworkeula: dt.ktomekworkeula,
        packageicon: dt.icon,
        titleimage: true,
        packagecost: dt.pricepermonth,
    };
}

export const actions = {
    saveProfileInformation: async ({ request, locals: { supabase, getSession } }) => {
        const session = await getSession()
        if (!session) {
            // the user is not signed in
            throw error(401, { message: 'Unauthorized' })
        }

        let logactionparm = 'Update'
        let logdescriptionparm = 'Ktomek Work Profile Saved'
        let loglocationparm = '/work/profile'
        await supabase.rpc('insertlog', { logactionparm, logdescriptionparm, loglocationparm });

        const formData = await request.formData();
        const firstnameparm = formData.get('firstname')?.toString();
        const lastnameparm = formData.get('lastname')?.toString();
        const dobparm = formData.get('dob')?.toString();

        const { data, error: et } = await supabase.rpc('updateuser', {
            firstnameparm,
            lastnameparm,
            dobparm
        });

        if (et) {
            return {
                scaleSnackbar: "1",
                message: "Unsuccessfully saved profile information",
                background: "var(--warn)"
            }
        }

        return {
            scaleSnackbar: "1",
            message: "Successfully saved profile information",
            background: "var(--success)"
        }
    }
}