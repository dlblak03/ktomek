import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, locals: { supabase } }) => {
    const lead = await request.json()
    const AuthorizationGUID = await request.headers.get("AuthorizationGUID")
    const Domain = await request.headers.get("Domain")
    
    const { data, error } = await supabase.rpc("insertleadpublic", { lead: lead, authorizationguid: AuthorizationGUID, domain: Domain })
    
    if(error == null) {
        return new Response(JSON.stringify({ email_to: data.email_to, copy_to: data.copy_to, success: true }), { status: 200 });
    }
    else {
        return new Response(JSON.stringify({ email_to: '', copy_to: '', success: false }), { status: 401 });
    }
};