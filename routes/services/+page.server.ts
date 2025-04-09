import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { PUBLIC_MSP_LEADS_DOMAIN, PUBLIC_MSP_LEADS_GUID } from '$env/static/public';
import Stripe from 'stripe'

export const load = (async () => {
    return {};
}) satisfies PageServerLoad;

export const actions = {
    requestPrice: async ({ request, locals: { supabase, getSession } }) => {
        const formData = await request.formData();
        const packageType = formData?.get("package")
        const email = formData?.get("email")
        const website = formData?.get("website")

        const response = await fetch("https://ktomek.com/api/contact", {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "no-cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "include", // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json",
                "AuthorizationGUID": PUBLIC_MSP_LEADS_GUID,
                "Domain": PUBLIC_MSP_LEADS_DOMAIN
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify({
                name: '',
                email: email,
                phone: '',
                message: packageType + '; ' + website
            }), // body data type must match "Content-Type" header
        }).then((response) => response.body)
            .then((rb) => {
                const reader = rb?.getReader();

                return new ReadableStream({
                    start(controller) {
                        // The following function handles each data chunk
                        function push() {
                            if (reader != undefined) {
                                reader.read().then(({ done, value }) => {
                                    // If there is no more data to read
                                    if (done) {
                                        controller.close();
                                        return;
                                    }
                                    // Get the data and send it to the browser via the controller
                                    controller.enqueue(value);
                                    // Check chunks by logging to the console
                                    push();
                                });
                            }
                            // "done" is a Boolean and value a "Uint8Array"
                        }
                        push();
                    },
                });
            })
            .then((stream) =>
                // Respond with our stream
                new Response(stream, { headers: { "Content-Type": "text/html" } }).text(),
            )

        if (JSON.parse(response).success) {
            const responseTwo = await fetch("zapier", {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                mode: "no-cors", // no-cors, *cors, same-origin
                cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                credentials: "include", // include, *same-origin, omit
                headers: {
                    "Content-Type": "application/json"
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                redirect: "follow", // manual, *follow, error
                referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                body: JSON.stringify({
                    name: '',
                    email: email,
                    phone: '',
                    message: packageType + '; ' + website,
                    email_to: JSON.parse(response).email_to,
                    copy_to: JSON.parse(response).copy_to,
                }), // body data type must match "Content-Type" header
            })

            return {
                success: true,
                error: '',
                name: '',
                email: '',
                phone: '',
                message: ''
            }
        }
    }
}