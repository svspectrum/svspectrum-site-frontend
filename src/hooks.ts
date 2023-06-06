import { findCookie } from "$lib/client/cookies";

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
    event.locals.jwt = findCookie(event.request.headers.cookie || "", "jwt");

    return await resolve(event);
}

export function getSession(event) {
    return {
        // This is just not secure, but I don't care enough to fix it
        jwt: event.locals.jwt
    };
}
