// src/hooks.server.ts
import { PUBLIC_SUPABASE_URL } from '$env/static/public'
import { createSupabaseServerClient } from '@supabase/auth-helpers-sveltekit'
import { redirect, type Handle } from '@sveltejs/kit'

export const handle: Handle = async ({ event, resolve }) => {
  event.locals.supabase = createSupabaseServerClient({
    supabaseUrl: PUBLIC_SUPABASE_URL,
    supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
    event,
    options: {
      db: {
        schema: "ktomek"
      }
    }
  })

  event.locals.getSession = async () => {
    const {
      data: { session },
    } = await event.locals.supabase.auth.getSession()
    return session
  }

  async function isUserInRole(rolenameparm: any) {
    const { data, error } = await event.locals.supabase.rpc("isuserinrole", { rolenameparm })
    
    if(data != undefined) {
      if(data?.length > 0) {
        return true
      }
      return false;
    }
    return false;
  }

  async function getEULAStatus() {
    const { data, error } = await event.locals.supabase.rpc("geteulastatus")
    
    if(data != undefined) {
      return data;
    }
    return false;
  }

  if (event.url.pathname.startsWith('/life')) {
    const session = await event.locals.getSession()
    
    if (!session) {
      // the user is not signed in
      throw redirect(303, '/auth')
    }

    if(!(await isUserInRole('ktomek_life'))) {
      throw redirect(303, '/')
    }
  }

  if (event.url.pathname.startsWith('/work')) {
    const session = await event.locals.getSession()
    if (!session) {
      // the user is not signed in
      throw redirect(303, '/auth')
    }

    if(!(event.url.pathname.startsWith('/work/eula'))) {
      if(!(await getEULAStatus())) {
        throw redirect(303, '/work/eula')
      }
    }

    if((event.url.pathname.startsWith('/work/eula'))) {
      if((await getEULAStatus())) {
        throw redirect(303, '/work')
      }
    }

    if((event.url.pathname.startsWith('/work/services'))) {
      if(!(await isUserInRole('ktomek_supa_msp_admin'))) {
        throw redirect(303, '/work')
      }
    }

    if(!(await isUserInRole('ktomek_work'))) {
      throw redirect(303, '/')
    }
  }

  if (event.url.pathname.startsWith('/api/seo/weekly')) {
    const session = await event.locals.getSession()
    if (!session) {
      // the user is not signed in
      throw redirect(303, '/auth')
    }

    if(!(await isUserInRole('ktomek_work'))) {
      throw redirect(303, '/')
    }
  }

  if (event.url.pathname.startsWith('/admin')) {
    const session = await event.locals.getSession()
    if (!session) {
      // the user is not signed in
      throw redirect(303, '/auth')
    }

    if(!(await isUserInRole('ktomek_admin'))) {
      throw redirect(303, '/')
    }
  }

  if (event.url.pathname.startsWith('/auth')) {
    if (event.url.pathname.startsWith('/auth/logout')) {
      return resolve(event, {
        filterSerializedResponseHeaders(name) {
          return name === 'content-range'
        },
      })
    }

    const session = await event.locals.getSession()
    if (session) {
      // the user is signed in
      throw redirect(303, '/work')
    }
  }

  return resolve(event, {
    filterSerializedResponseHeaders(name) {
      return name === 'content-range'
    },
  })
}
