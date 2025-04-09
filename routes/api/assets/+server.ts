import type { RequestHandler } from './$types';
import OpenAI from 'openai';

export const POST: RequestHandler = async ({ request, locals: { supabase, getSession } }) => {
    const session = await getSession()
    if (!session) {
        // the user is not signed in
        return new Response();
    }

    let logactionparm = 'Insert'
    let logdescriptionparm = 'Ktomek Work Asset Uploaded'
    let loglocationparm = '/work/assets'
    await supabase.rpc('insertlog', { logactionparm, logdescriptionparm, loglocationparm });

    var apinameparm = 'openAI'
    const apiObject = await supabase.rpc('getapikey', { apinameparm })
    var apikey = apiObject.data[0]?.apikey;

    const { data: shortcode, error: et } = await supabase.rpc('getorganizationshortcodebyauthid');

    let object = await request.json()

    let AIclient = new OpenAI({ apiKey: apikey });

		const completion = await AIclient.chat.completions.create({
			messages: [
				{
					role: 'user',
					content: [
						{
							type: 'text',
							text: 'Return a label for the image with only one value that best describes the image from this list: ' + object.labels
						},
						{
							type: 'image_url',
							image_url: {
								url: ' /ktomek/msp/' + shortcode + '/images/' + object.name
							}
						}
					]
				}
			],
			model: 'gpt-4-vision-preview',
            max_tokens: 500,
            temperature: 0.1
		});

        await supabase.rpc('insertimage', { path: object.name, labelparm: completion.choices[0].message.content });

    return new Response();
};

export const GET: RequestHandler = async ({ url, request, locals: { supabase, getSession } }) => {
	let searchParams: URLSearchParams = url.searchParams
	let authorizationguid: any = searchParams.get('authorizationguid')
	let domain: any = searchParams.get('domain')
    const { data: images, error: et } = await supabase.rpc('getmspimages', { authorizationguid: authorizationguid, domain: domain });
	
    return new Response(JSON.stringify({ images }));
};