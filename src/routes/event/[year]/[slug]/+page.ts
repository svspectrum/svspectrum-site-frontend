import { error } from '@sveltejs/kit';

// EVENT PAGE
import { getEvent } from "$lib/api/event";

/**
 * @type {import('@sveltejs/kit').PageLoad}
 */
    export async function load({ params, session }) {
	const url = `/event/${params.year}/${params.slug}`
	let {res, event} = await getEvent(url, session.jwt);

	if (res.ok) {
		if (event) {
			return {
				event: event
			};
		}
	} else {
		throw error(500, `database error`);
	}
}
