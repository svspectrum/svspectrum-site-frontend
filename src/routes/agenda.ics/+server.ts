import { fetchBackend } from "$lib/api/backend";

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function GET({ }) {
    const path = `agenda.ics`;
    const res = await fetchBackend(path, "");

    if (res.ok) {
        throw new Error("@migration task: Migrate this return statement (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292701)");
        // Suggestion (check for correctness before using):
        // return new Response(await res.text(), {
        //     headers: {
        //         'content-type': 'text/calendar',
        //     }
        // });
        return {
            headers: {
                'content-type': 'text/calendar',
            },
            body: await res.text(),
        }
    }
}