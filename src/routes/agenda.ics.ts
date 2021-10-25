import { fetchBackend } from "$lib/api/backend";

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function get({ params }) {
    const path = `agenda.ics`;
    const res = await fetchBackend(path);

    if (res.ok) {
        return {
            headers: {
                'content-type': 'text/calendar',
            },
            body: await res.text(),
        }
    }
}