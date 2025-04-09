// src/routes/login/+page.server.js
import { error, fail } from '@sveltejs/kit'
import { PUBLIC_SUPABASE_URL } from '$env/static/public'
import { createClient } from '@supabase/supabase-js'

export const actions = {
  inviteUser: async ({ request, url, locals: { supabase, getSession } }) => {
    const session = await getSession()
    if (!session) {
      // the user is not signed in
      throw error(401, { message: 'Unauthorized' })
    }

    var apinameparm = 'Auth Admin'
    const apiObject = await supabase.rpc('getapikey', { apinameparm })
    var apikey = apiObject.data[0]?.apikey;

    const adminAuthClient = createClient(PUBLIC_SUPABASE_URL, apikey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })
    const formData = await request.formData();
    const email = formData.get('inviteemail')?.toString()
    if (email != undefined) {
      const { data } = await adminAuthClient.auth.admin.inviteUserByEmail(email);
      if (data.user) {
        var userid = data.user.id;
        await addUser(supabase, userid, email);
      }
    }
    return {
    }
  },
  saveUser: async ({ request, url, locals: { supabase, getSession } }) => {
    const session = await getSession()
    if (!session) {
      // the user is not signed in
      throw error(401, { message: 'Unauthorized' })
    }

    var apinameparm = 'Auth Admin'
    const apiObject = await supabase.rpc('getapikey', { apinameparm })
    var apikey = apiObject.data[0]?.apikey;
    console.log(apikey)

    const adminAuthClient = await createClient(PUBLIC_SUPABASE_URL, apikey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })

    const formData = await request.formData();
    const userid = formData.get('userid')?.toString()
    const userfirstname = formData.get('userfirstname')?.toString()
    const userlastname = formData.get('userlastname')?.toString()
    const useremail = formData.get('useremail')?.toString()
    const newPhone = formData.get('userphonenumber')?.toString()

    const { data, error: errorone } = await supabase.rpc('updateuseradmin', {
      firstnameparm: userfirstname,
      lastnameparm: userlastname,
      idparm: userid
    });

    return {
      displayVar: '1',
      messageVar: 'Successfully saved user information',
      usersDialog: '0'
    }
  },
  updatePhone: async ({ request, url, locals: { supabase, getSession } }) => {
    const session = await getSession()
    if (!session) {
      // the user is not signed in
      throw error(401, { message: 'Unauthorized' })
    }

    var apinameparm = 'Auth Admin'
    const apiObject = await supabase.rpc('getapikey', { apinameparm })
    var apikey = apiObject.data[0]?.apikey;

    const adminAuthClient = createClient(PUBLIC_SUPABASE_URL, apikey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })
    const formData = await request.formData();
    const userid = formData.get('userid')?.toString()
    const phone = formData.get('userphonenumber')?.toString()
    if (phone != undefined && userid != undefined) {

      const { data: user, error } = await adminAuthClient.auth.admin.updateUserById(
        userid,
        { phone: '+1' + phone, phone_confirm: true }
      )

      const { error: et } = await supabase.rpc('updateuserphoneadmin', { idparm: userid, phoneparm: phone })

      console.log(error)
      console.log(et)
    }

    return {
    }
  },
}

const addUser = async (supabase: any, id: any, email: any) => {
  const { data, error } = await supabase
    .from('users')
    .insert({ id: id, email_verification: true, email: email }, { onConflict: 'id' })
}