import Stripe from 'stripe'
import { PUBLIC_STRIPE_KEY } from '$env/static/public'

// src/routes/+layout.server.ts
export const load = async ({ locals: { getSession, supabase } }) => {
  const { data, error: et } = await supabase.rpc("getwhitelabelstatus")

  const { data: dt, error: ett } = await supabase.rpc('getorganizationshortcodebyauthid');

  const { data: dtt, error: ef } = await supabase.rpc('getwhitelabelcolors');

  return {
    session: await getSession(),
    whitelabel: data,
    shortcode: dt,
    primarycolor: dtt.primarycolor,
    secondarycolor: dtt.secondarycolor
  }
}