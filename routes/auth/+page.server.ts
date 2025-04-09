// src/routes/login/+page.server.js
import { fail, redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types';

export const load = (async () => {
  
  return {
  };
}) satisfies PageServerLoad;

export const actions = {
  handleSignInPhone: async ({ request, locals: { supabase } }) => {
    const formData = await request.formData();
    const country = formData.get('country')?.toString();
    const phone = formData.get('phone')?.toString().replace(/\s/g, '').replaceAll('-', '');
    const phoneWithCountry = (country ?? '+1') + formData.get('phone')?.toString().replace(/\s/g, '').replaceAll('-', '');
    
    if (phone == '') {
      return fail(400, { phone, description: 'Please type in a phone number.', error: true, esi: false })
    }

    if (phone != undefined) {
      var response = await supabase.auth
        .signInWithOtp({
          phone: phoneWithCountry,
          options: {
            shouldCreateUser: false
          }
        })
        .then((response) => {
          return response;
        })
        .catch((error) => {
          return error;
        });

      if (!response.error) {
        throw redirect(308, '/auth/verify?phone=' + encodeURIComponent(phoneWithCountry) + '&' + 'type=work');
      } else {
        if (response.error.toString().indexOf('Signups not allowed for otp') > 0) {
          return fail(400, { phone, description: 'Invalid account phone number.', error: true, esi: false })
        }

        return fail(400, { phone, description: 'System error, please try again.', error: true, esi: false })
      }
    }
  },
  handleSignInEmail: async ({ request, locals: { supabase } }) => {
    const formData = await request.formData();
    const email = formData.get('email')?.toString()

    if (email == '') {
      return fail(400, { email, description: 'Please type in an email.', error: true, esi: true })
    }

    if (email != undefined) {
      var response = await supabase.auth
        .signInWithOtp({
          email,
          options: {
            shouldCreateUser: false
          }
        })
        .then((response) => {
          return response;
        })
        .catch((error) => {
          return error;
        });

      if (!response.error) {
        throw redirect(308, '/auth/verify?email=' + encodeURIComponent(email) + '&' + 'type=work');
      } else {
        if (response.error.toString().indexOf('Signups not allowed for otp') > 0) {
          return fail(400, { email, description: 'Invalid account email.', error: true, esi: true })
        }

        return fail(400, { email, description: 'System error, please try again.', error: true, esi: true })
      }
    }
  },
}